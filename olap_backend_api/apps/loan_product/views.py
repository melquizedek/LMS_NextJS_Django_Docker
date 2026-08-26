from __future__ import annotations

from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import LoanProduct
from .serializers import LoanProductSerializer


class LoanProductListView(APIView):
    """
    GET  /api/loan-products/  - List all loan products
    POST /api/loan-products/  - Create a new loan product
    """

    def get(self, request: Request) -> Response:
        products = LoanProduct.objects.all()
        serializer = LoanProductSerializer(products, many=True)
        return Response(
            {"success": True, "data": serializer.data},
            status=status.HTTP_200_OK,
        )

    def post(self, request: Request) -> Response:
        serializer = LoanProductSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "error": {
                        "code": "VALIDATION_ERROR",
                        "message": "Invalid request data.",
                        "details": serializer.errors,
                    },
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        loan_product = serializer.save()
        return Response(
            {"success": True, "data": LoanProductSerializer(loan_product).data},
            status=status.HTTP_201_CREATED,
        )


class LoanProductDetailView(APIView):
    """
    GET    /api/loan-products/<pk>/  - Retrieve a loan product
    PUT    /api/loan-products/<pk>/  - Full update
    PATCH  /api/loan-products/<pk>/  - Partial update
    DELETE /api/loan-products/<pk>/  - Delete
    """

    def _get_object(self, pk: int) -> LoanProduct | None:
        try:
            return LoanProduct.objects.get(pk=pk)
        except LoanProduct.DoesNotExist:
            return None

    def _not_found(self, pk: int) -> Response:
        return Response(
            {
                "success": False,
                "error": {
                    "code": "NOT_FOUND",
                    "message": f"Loan product with id {pk} does not exist.",
                },
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    def _validation_error(self, errors) -> Response:
        return Response(
            {
                "success": False,
                "error": {
                    "code": "VALIDATION_ERROR",
                    "message": "Invalid request data.",
                    "details": errors,
                },
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    def get(self, request: Request, pk: int) -> Response:
        loan_product = self._get_object(pk)
        if loan_product is None:
            return self._not_found(pk)
        return Response(
            {"success": True, "data": LoanProductSerializer(loan_product).data},
            status=status.HTTP_200_OK,
        )

    def put(self, request: Request, pk: int) -> Response:
        loan_product = self._get_object(pk)
        if loan_product is None:
            return self._not_found(pk)
        serializer = LoanProductSerializer(loan_product, data=request.data)
        if not serializer.is_valid():
            return self._validation_error(serializer.errors)
        updated = serializer.save()
        return Response(
            {"success": True, "data": LoanProductSerializer(updated).data},
            status=status.HTTP_200_OK,
        )

    def patch(self, request: Request, pk: int) -> Response:
        loan_product = self._get_object(pk)
        if loan_product is None:
            return self._not_found(pk)
        serializer = LoanProductSerializer(loan_product, data=request.data, partial=True)
        if not serializer.is_valid():
            return self._validation_error(serializer.errors)
        updated = serializer.save()
        return Response(
            {"success": True, "data": LoanProductSerializer(updated).data},
            status=status.HTTP_200_OK,
        )

    def delete(self, request: Request, pk: int) -> Response:
        loan_product = self._get_object(pk)
        if loan_product is None:
            return self._not_found(pk)
        loan_product.delete()
        return Response(
            {"success": True, "message": "Loan product deleted successfully."},
            status=status.HTTP_200_OK,
        )
