"""
Serializers for the Amortization API.

Input  → LoanAmortizationInputSerializer
Output → AmortizationTermSerializer, AmortizationScheduleSerializer
"""

from __future__ import annotations

from datetime import date
from decimal import Decimal

from rest_framework import serializers

from .services import AmortizationSchedule, AmortizationTerm


# ---------------------------------------------------------------------------
# Input Serializer
# ---------------------------------------------------------------------------

class LoanAmortizationInputSerializer(serializers.Serializer):
    """
    Validates and deserializes the POST body for the amortization endpoint.

    Fields
    ------
    principal_amount : float
        The total amount borrowed (e.g. 98838.00).
    annual_interest_rate : float
        Annual rate expressed as a **decimal fraction** (e.g. 0.39 for 39%).
        The API will reject values ≥ 1 to prevent the common mistake of
        passing 39 instead of 0.39.
    loan_term_months : int
        Number of monthly payment periods (e.g. 18).
    start_date : date (optional)
        Loan disbursement date.  Defaults to today when omitted.
    gper_rate : float (optional)
        Annual GPER (guarantee/processing) fee rate as a decimal fraction.
        Defaults to 0.
    gper2_rate : float (optional)
        Annual secondary GPER fee rate as a decimal fraction.
        Defaults to 0.
    """

    principal_amount = serializers.DecimalField(
        max_digits=15,
        decimal_places=2,
        min_value=Decimal("0.01"),
        help_text="Total loan amount borrowed (e.g. 98838.00).",
    )
    annual_interest_rate = serializers.DecimalField(
        max_digits=10,
        decimal_places=6,
        min_value=Decimal("0.000001"),
        help_text=(
            "Annual interest rate as a decimal fraction.  "
            "Pass 0.39 for a 39% annual rate."
        ),
    )
    loan_term_months = serializers.IntegerField(
        min_value=1,
        max_value=600,
        help_text="Number of monthly payments (e.g. 18 for an 18-month loan).",
    )
    start_date = serializers.DateField(
        required=False,
        help_text="Loan start / disbursement date (ISO-8601). Defaults to today.",
    )
    gper_rate = serializers.DecimalField(
        max_digits=10,
        decimal_places=6,
        min_value=Decimal("0"),
        default=Decimal("0"),
        required=False,
        help_text="Annual GPER fee rate as a decimal fraction. Defaults to 0.",
    )
    gper2_rate = serializers.DecimalField(
        max_digits=10,
        decimal_places=6,
        min_value=Decimal("0"),
        default=Decimal("0"),
        required=False,
        help_text="Annual secondary GPER fee rate as a decimal fraction. Defaults to 0.",
    )

    def validate_annual_interest_rate(self, value: Decimal) -> Decimal:
        if value >= 1:
            raise serializers.ValidationError(
                "annual_interest_rate must be provided as a decimal fraction "
                "(e.g. 0.39 for 39%).  Values ≥ 1.0 are not accepted."
            )
        return value

    def validate(self, attrs):
        if "start_date" not in attrs or attrs.get("start_date") is None:
            attrs["start_date"] = date.today()
        return attrs


# ---------------------------------------------------------------------------
# Output Serializers
# ---------------------------------------------------------------------------

class AmortizationTermSerializer(serializers.Serializer):
    """Serializes a single amortization term row."""
    term = serializers.IntegerField()
    due_date = serializers.DateField()
    balance = serializers.DecimalField(max_digits=15, decimal_places=2)
    amortization = serializers.DecimalField(max_digits=15, decimal_places=2)
    principal = serializers.DecimalField(max_digits=15, decimal_places=2)
    interest = serializers.DecimalField(max_digits=15, decimal_places=2)
    gper = serializers.DecimalField(max_digits=15, decimal_places=2)
    gper2 = serializers.DecimalField(max_digits=15, decimal_places=4)
    principal_realized = serializers.DecimalField(max_digits=15, decimal_places=2)
    ui_realized = serializers.DecimalField(max_digits=15, decimal_places=2)
    gper_realized = serializers.DecimalField(max_digits=15, decimal_places=2)
    gper2_realized = serializers.DecimalField(max_digits=15, decimal_places=2)
    soa = serializers.CharField(allow_null=True, default=None)


class AmortizationSummarySerializer(serializers.Serializer):
    """Serializes the summary block (remaining amounts)."""
    remaining_principal = serializers.DecimalField(max_digits=15, decimal_places=2)
    remaining_interest = serializers.DecimalField(max_digits=15, decimal_places=2)
    remaining_gper = serializers.DecimalField(max_digits=15, decimal_places=2)
    remaining_gper2 = serializers.DecimalField(max_digits=15, decimal_places=4)
    loan_paid_amount = serializers.DecimalField(max_digits=15, decimal_places=2)
    other_receivables = serializers.DecimalField(max_digits=15, decimal_places=2)


class AmortizationTotalsSerializer(serializers.Serializer):
    """Serializes the footer totals row."""
    total_principal = serializers.DecimalField(max_digits=15, decimal_places=2)
    total_interest = serializers.DecimalField(max_digits=15, decimal_places=2)
    total_gper = serializers.DecimalField(max_digits=15, decimal_places=2)
    total_gper2 = serializers.DecimalField(max_digits=15, decimal_places=4)
    total_amortization = serializers.DecimalField(max_digits=15, decimal_places=2)


class AmortizationScheduleSerializer(serializers.Serializer):
    """Top-level response serializer composing summary, totals, and schedule rows."""
    summary = serializers.SerializerMethodField()
    totals = serializers.SerializerMethodField()
    schedule = serializers.SerializerMethodField()

    def get_summary(self, obj: AmortizationSchedule) -> dict:
        return AmortizationSummarySerializer(obj).data

    def get_totals(self, obj: AmortizationSchedule) -> dict:
        return AmortizationTotalsSerializer(obj).data

    def get_schedule(self, obj: AmortizationSchedule) -> list:
        return AmortizationTermSerializer(obj.terms, many=True).data
