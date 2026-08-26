"""
Amortization Service
====================
Encapsulates all loan amortization computation logic following the DRY principle.

Amortization formula used:
    M = P * [r(1+r)^n] / [(1+r)^n - 1]

Where:
    M = Monthly payment
    P = Principal amount
    r = Periodic (monthly) interest rate  = annual_rate / 12
    n = Total number of payments (loan_term_months)

Each period breakdown:
    Interest   = Remaining Balance * periodic_rate
    Principal  = Monthly Payment - Interest
    GPER       = Guarantee / Processing fee per period (if applicable)
    Balance    = Previous Balance - Principal Paid
"""

from __future__ import annotations

import math
from dataclasses import dataclass, field
from datetime import date
from dateutil.relativedelta import relativedelta
from decimal import Decimal, ROUND_HALF_UP
from typing import List, Optional


# ---------------------------------------------------------------------------
# Data Transfer Objects (DTOs)
# ---------------------------------------------------------------------------

@dataclass(frozen=True)
class LoanParameters:
    """Immutable value object holding the raw inputs from the user."""
    principal: Decimal
    annual_interest_rate: Decimal          # e.g. 0.39 for 39%
    loan_term_months: int
    start_date: date                        # first disbursement / loan date
    gper_rate: Decimal = Decimal("0")      # optional guarantee/processing fee rate
    gper2_rate: Decimal = Decimal("0")     # optional secondary fee rate

    def validate(self) -> None:
        errors: dict[str, str] = {}

        if self.principal <= 0:
            errors["principal"] = "Principal must be greater than zero."
        if not (0 < self.annual_interest_rate < 100):
            errors["annual_interest_rate"] = (
                "Annual interest rate must be between 0 and 100 (exclusive). "
                "Provide the rate as a decimal, e.g. 0.39 for 39%."
            )
        if self.loan_term_months <= 0:
            errors["loan_term_months"] = "Loan term must be at least 1 month."
        if self.gper_rate < 0:
            errors["gper_rate"] = "GPER rate cannot be negative."
        if self.gper2_rate < 0:
            errors["gper2_rate"] = "GPER2 rate cannot be negative."

        if errors:
            raise LoanValidationError(errors)


@dataclass
class AmortizationTerm:
    """Represents a single row in the amortization schedule."""
    term: int
    due_date: date
    balance: Decimal
    amortization: Decimal          # total payment for the period
    principal: Decimal             # principal component
    interest: Decimal              # interest component
    gper: Decimal                  # guarantee / processing fee
    gper2: Decimal                 # secondary fee
    principal_realized: Decimal = Decimal("0")
    ui_realized: Decimal = Decimal("0")       # unearned interest realized
    gper_realized: Decimal = Decimal("0")
    gper2_realized: Decimal = Decimal("0")
    soa: Optional[str] = None              # Statement of Account reference


@dataclass
class AmortizationSchedule:
    """Full schedule result including summary and per-term breakdown."""
    remaining_principal: Decimal
    remaining_interest: Decimal
    remaining_gper: Decimal
    remaining_gper2: Decimal
    loan_paid_amount: Decimal
    other_receivables: Decimal
    terms: List[AmortizationTerm] = field(default_factory=list)

    # Computed totals (populated by service after building terms)
    total_principal: Decimal = Decimal("0")
    total_interest: Decimal = Decimal("0")
    total_gper: Decimal = Decimal("0")
    total_gper2: Decimal = Decimal("0")
    total_amortization: Decimal = Decimal("0")


# ---------------------------------------------------------------------------
# Custom Exceptions
# ---------------------------------------------------------------------------

class LoanValidationError(Exception):
    """Raised when loan parameters fail business-rule validation."""
    def __init__(self, errors: dict[str, str]):
        self.errors = errors
        super().__init__(str(errors))


# ---------------------------------------------------------------------------
# Amortization Service
# ---------------------------------------------------------------------------

TWO_PLACES = Decimal("0.01")
FOUR_PLACES = Decimal("0.0001")


class AmortizationService:
    """
    Stateless service that computes a full amortization schedule.

    Usage::

        service = AmortizationService()
        schedule = service.compute(loan_params)
    """

    def compute(self, params: LoanParameters) -> AmortizationSchedule:
        """
        Entry point.  Validates parameters, runs the amortization engine,
        and returns a fully-populated AmortizationSchedule.
        """
        params.validate()

        monthly_rate = self._monthly_rate(params.annual_interest_rate)
        monthly_payment = self._monthly_payment(
            params.principal, monthly_rate, params.loan_term_months
        )

        terms = self._build_terms(params, monthly_rate, monthly_payment)
        return self._build_schedule(params, terms)

    # ------------------------------------------------------------------
    # Private helpers
    # ------------------------------------------------------------------

    @staticmethod
    def _monthly_rate(annual_rate: Decimal) -> Decimal:
        """Convert annual interest rate to a monthly periodic rate."""
        return annual_rate / Decimal("12")

    @staticmethod
    def _monthly_payment(
        principal: Decimal,
        monthly_rate: Decimal,
        n: int,
    ) -> Decimal:
        """
        Compute the fixed monthly payment using the standard annuity formula.

            M = P * r / (1 - (1+r)^-n)

        For zero-interest loans, M = P / n.
        """
        if monthly_rate == 0:
            return (principal / n).quantize(TWO_PLACES, rounding=ROUND_HALF_UP)

        r = float(monthly_rate)
        p = float(principal)
        payment = p * r / (1 - math.pow(1 + r, -n))
        return Decimal(str(payment)).quantize(TWO_PLACES, rounding=ROUND_HALF_UP)

    def _build_terms(
        self,
        params: LoanParameters,
        monthly_rate: Decimal,
        monthly_payment: Decimal,
    ) -> List[AmortizationTerm]:
        """Generate the list of AmortizationTerm rows (term 0 … term n)."""
        terms: List[AmortizationTerm] = []

        # Term 0 — the disbursement row (no payment, just the opening balance)
        terms.append(AmortizationTerm(
            term=0,
            due_date=params.start_date,
            balance=self._round2(params.principal),
            amortization=Decimal("0"),
            principal=Decimal("0"),
            interest=Decimal("0"),
            gper=Decimal("0"),
            gper2=Decimal("0"),
        ))

        remaining_balance = params.principal

        for term_number in range(1, params.loan_term_months + 1):
            due_date = params.start_date + relativedelta(months=term_number)

            interest = self._round2(remaining_balance * monthly_rate)

            # For the final term, pay whatever is left to avoid rounding drift
            if term_number == params.loan_term_months:
                principal_paid = remaining_balance
                amortization = self._round2(principal_paid + interest)
            else:
                principal_paid = self._round2(monthly_payment - interest)
                amortization = monthly_payment

            gper = self._round2(remaining_balance * params.gper_rate / Decimal("12")) \
                if params.gper_rate else Decimal("0")
            gper2 = self._round4(remaining_balance * params.gper2_rate / Decimal("12")) \
                if params.gper2_rate else Decimal("0")

            remaining_balance = self._round2(remaining_balance - principal_paid)

            terms.append(AmortizationTerm(
                term=term_number,
                due_date=due_date,
                balance=remaining_balance,
                amortization=amortization,
                principal=principal_paid,
                interest=interest,
                gper=gper,
                gper2=gper2,
            ))

        return terms

    @staticmethod
    def _build_schedule(
        params: LoanParameters,
        terms: List[AmortizationTerm],
    ) -> AmortizationSchedule:
        """Aggregate totals and construct the final AmortizationSchedule."""
        total_principal = sum((t.principal for t in terms), Decimal("0"))
        total_interest = sum((t.interest for t in terms), Decimal("0"))
        total_gper = sum((t.gper for t in terms), Decimal("0"))
        total_gper2 = sum((t.gper2 for t in terms), Decimal("0"))
        total_amortization = sum((t.amortization for t in terms), Decimal("0"))

        return AmortizationSchedule(
            remaining_principal=total_principal,
            remaining_interest=total_interest,
            remaining_gper=total_gper,
            remaining_gper2=total_gper2,
            loan_paid_amount=Decimal("0"),
            other_receivables=Decimal("0"),
            terms=terms,
            total_principal=total_principal,
            total_interest=total_interest,
            total_gper=total_gper,
            total_gper2=total_gper2,
            total_amortization=total_amortization,
        )

    # ------------------------------------------------------------------
    # Rounding helpers
    # ------------------------------------------------------------------

    @staticmethod
    def _round2(value: Decimal) -> Decimal:
        return value.quantize(TWO_PLACES, rounding=ROUND_HALF_UP)

    @staticmethod
    def _round4(value: Decimal) -> Decimal:
        return value.quantize(FOUR_PLACES, rounding=ROUND_HALF_UP)
