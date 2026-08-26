"""
Views for the Amortization API.

Endpoints
---------
POST /api/amortization/schedule/
    Compute and return a full loan amortization schedule.
"""

from __future__ import annotations

from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import (
    AmortizationScheduleSerializer,
    LoanAmortizationInputSerializer,
)
from .services import AmortizationService, LoanParameters, LoanValidationError


class AmortizationScheduleView(APIView):
    """
    POST /api/amortization/schedule/

    Compute a full loan amortization schedule.

    Request body (JSON)
    -------------------
    {
        "principal_amount": 98838.00,
        "annual_interest_rate": 0.39,
        "loan_term_months": 18,
        "start_date": "2025-02-16",      // optional, defaults to today
        "gper_rate": 0.02175,            // optional, defaults to 0
        "gper2_rate": 0.0                // optional, defaults to 0
    }

    Response (JSON)
    ---------------
    {
        "success": true,
        "data": {
            "summary": { ... },
            "totals":  { ... },
            "schedule": [ { term row } ... ]
        }
    }
    """

    _service = AmortizationService()  # shared, stateless singleton

    def post(self, request: Request) -> Response:
        # 1. Validate input
        input_serializer = LoanAmortizationInputSerializer(data=request.data)
        if not input_serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "error": {
                        "code": "VALIDATION_ERROR",
                        "message": "Invalid request parameters.",
                        "details": input_serializer.errors,
                    },
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        validated = input_serializer.validated_data

        # 2. Build domain object
        loan_params = LoanParameters(
            principal=validated["principal_amount"],
            annual_interest_rate=validated["annual_interest_rate"],
            loan_term_months=validated["loan_term_months"],
            start_date=validated["start_date"],
            gper_rate=validated.get("gper_rate", 0),
            gper2_rate=validated.get("gper2_rate", 0),
        )

        # 3. Compute schedule (service may raise LoanValidationError)
        try:
            schedule = self._service.compute(loan_params)
        except LoanValidationError as exc:
            return Response(
                {
                    "success": False,
                    "error": {
                        "code": "BUSINESS_RULE_VIOLATION",
                        "message": "Loan parameters failed business validation.",
                        "details": exc.errors,
                    },
                },
                status=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )

        # 4. Serialize and return
        output_serializer = AmortizationScheduleSerializer(schedule)
        return Response(
            {"success": True, "data": output_serializer.data},
            status=status.HTTP_200_OK,
        )
