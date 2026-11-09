export interface AmortizationRow {
  month: number;
  beginningBalance: number;
  monthlyPayment: number;
  principal: number;
  interest: number;
  endingBalance: number;
}

export interface LoanCalculationResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: AmortizationRow[];
}

export const LOAN_CONSTANTS = {
  MIN_LOAN_AMOUNT: 30000,
  MAX_LOAN_AMOUNT: 2000000,
  TERM_OPTIONS: [12, 18, 24, 36] as const,
  INTEREST_RATE_OPTIONS: [2, 3.5, 5] as const,
} as const;

export function calculateLoan(
  principal: number,
  monthlyInterestRatePercent: number,
  numberOfPayments: number
): LoanCalculationResult | null {
  const monthlyInterestRate = monthlyInterestRatePercent / 100;

  if (
    principal < LOAN_CONSTANTS.MIN_LOAN_AMOUNT ||
    principal > LOAN_CONSTANTS.MAX_LOAN_AMOUNT ||
    monthlyInterestRate <= 0 ||
    numberOfPayments <= 0
  ) {
    return null;
  }

  const monthlyPayment =
    (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - principal;

  let schedule: AmortizationRow[] = [];
  let beginningBalance = principal;

  for (let i = 1; i <= numberOfPayments; i++) {
    const interest = beginningBalance * monthlyInterestRate;
    const principalPaid = monthlyPayment - interest;
    const endingBalance = beginningBalance - principalPaid;

    schedule.push({
      month: i,
      beginningBalance: beginningBalance,
      monthlyPayment: monthlyPayment,
      principal: principalPaid,
      interest: interest,
      endingBalance: endingBalance,
    });

    beginningBalance = endingBalance;
  }

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    amortizationSchedule: schedule,
  };
}

export function formatCurrency(value: number): string {
  return `₱ ${new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)}`;
}

export function clampLoanAmount(amount: number): number {
  return Math.min(LOAN_CONSTANTS.MAX_LOAN_AMOUNT, Math.max(LOAN_CONSTANTS.MIN_LOAN_AMOUNT, amount));
}

export function parseLoanAmount(text: string): number {
  return Number.parseFloat(text.replace(/[^0-9.]/g, '')) || 0;
}