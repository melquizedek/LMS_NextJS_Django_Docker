import {
  calculateLoan,
  formatCurrency,
  clampLoanAmount,
  parseLoanAmount,
  LOAN_CONSTANTS,
  type LoanCalculationResult,
  type AmortizationRow,
} from './loan-calculator';

describe('loan-calculator', () => {
  describe('LOAN_CONSTANTS', () => {
    it('has correct min and max loan amounts', () => {
      expect(LOAN_CONSTANTS.MIN_LOAN_AMOUNT).toBe(30000);
      expect(LOAN_CONSTANTS.MAX_LOAN_AMOUNT).toBe(2000000);
    });

    it('has correct term options', () => {
      expect(LOAN_CONSTANTS.TERM_OPTIONS).toEqual([12, 18, 24, 36]);
    });

    it('has correct interest rate options', () => {
      expect(LOAN_CONSTANTS.INTEREST_RATE_OPTIONS).toEqual([2, 3.5, 5]);
    });
  });

  describe('parseLoanAmount', () => {
    it('parses plain numbers', () => {
      expect(parseLoanAmount('100000')).toBe(100000);
      expect(parseLoanAmount('50000.50')).toBe(50000.5);
    });

    it('parses formatted currency strings', () => {
      expect(parseLoanAmount('₱100,000')).toBe(100000);
      expect(parseLoanAmount('₱100,000.00')).toBe(100000);
      expect(parseLoanAmount('₱ 100,000.00')).toBe(100000);
    });

    it('handles invalid input', () => {
      expect(parseLoanAmount('')).toBe(0);
      expect(parseLoanAmount('abc')).toBe(0);
      expect(parseLoanAmount('₱abc')).toBe(0);
    });

    it('handles decimal numbers', () => {
      expect(parseLoanAmount('123456.78')).toBe(123456.78);
      expect(parseLoanAmount('0.99')).toBe(0.99);
    });
  });

  describe('clampLoanAmount', () => {
    it('returns value within bounds', () => {
      expect(clampLoanAmount(500000)).toBe(500000);
      expect(clampLoanAmount(100000)).toBe(100000);
      expect(clampLoanAmount(1500000)).toBe(1500000);
    });

    it('clamps below minimum', () => {
      expect(clampLoanAmount(10000)).toBe(30000);
      expect(clampLoanAmount(0)).toBe(30000);
      expect(clampLoanAmount(-1000)).toBe(30000);
    });

    it('clamps above maximum', () => {
      expect(clampLoanAmount(5000000)).toBe(2000000);
      expect(clampLoanAmount(2000001)).toBe(2000000);
    });

    it('handles boundary values', () => {
      expect(clampLoanAmount(30000)).toBe(30000);
      expect(clampLoanAmount(2000000)).toBe(2000000);
    });
  });

  describe('formatCurrency', () => {
    it('formats positive numbers with peso sign', () => {
      expect(formatCurrency(100000)).toBe('₱ 100,000.00');
      expect(formatCurrency(1234567.89)).toBe('₱ 1,234,567.89');
    });

    it('handles zero', () => {
      expect(formatCurrency(0)).toBe('₱ 0.00');
    });

    it('handles decimal values', () => {
      expect(formatCurrency(100.5)).toBe('₱ 100.50');
      expect(formatCurrency(0.99)).toBe('₱ 0.99');
    });
  });

  describe('calculateLoan', () => {
    it('returns null for principal below minimum', () => {
      const result = calculateLoan(10000, 2, 12);
      expect(result).toBeNull();
    });

    it('returns null for principal above maximum', () => {
      const result = calculateLoan(5000000, 2, 12);
      expect(result).toBeNull();
    });

    it('returns null for zero or negative interest rate', () => {
      const result1 = calculateLoan(100000, 0, 12);
      expect(result1).toBeNull();

      const result2 = calculateLoan(100000, -1, 12);
      expect(result2).toBeNull();
    });

    it('returns null for zero or negative term', () => {
      const result1 = calculateLoan(100000, 2, 0);
      expect(result1).toBeNull();

      const result2 = calculateLoan(100000, 2, -1);
      expect(result2).toBeNull();
    });

    it('calculates correct monthly payment for standard loan', () => {
      const result = calculateLoan(100000, 2, 12);
      
      expect(result).not.toBeNull();
      if (result) {
        // Monthly payment = P * r * (1+r)^n / ((1+r)^n - 1)
        // P = 100000, r = 0.02, n = 12
        // Expected: ~9,456.00
        expect(result.monthlyPayment).toBeCloseTo(9456.00, 1);
        
        // Total payment = monthly * 12
        expect(result.totalPayment).toBeCloseTo(result.monthlyPayment * 12, 1);
        
        // Total interest = total - principal
        expect(result.totalInterest).toBeCloseTo(result.totalPayment - 100000, 1);
      }
    });

    it('calculates correct amortization schedule length', () => {
      const result = calculateLoan(100000, 2, 12);
      
      expect(result).not.toBeNull();
      if (result) {
        expect(result.amortizationSchedule).toHaveLength(12);
      }
    });

    it('calculates correct amortization for 24 months', () => {
      const result = calculateLoan(200000, 3.5, 24);
      
      expect(result).not.toBeNull();
      if (result) {
        expect(result.amortizationSchedule).toHaveLength(24);
        expect(result.monthlyPayment).toBeGreaterThan(0);
        expect(result.totalInterest).toBeGreaterThan(0);
      }
    });

    it('calculates correct amortization for 36 months at 5%', () => {
      const result = calculateLoan(500000, 5, 36);
      
      expect(result).not.toBeNull();
      if (result) {
        expect(result.amortizationSchedule).toHaveLength(36);
        expect(result.monthlyPayment).toBeGreaterThan(0);
      }
    });

    it('amortization schedule: first payment has correct beginning balance', () => {
      const result = calculateLoan(100000, 2, 12);
      
      expect(result).not.toBeNull();
      if (result) {
        expect(result.amortizationSchedule[0].beginningBalance).toBe(100000);
        expect(result.amortizationSchedule[0].month).toBe(1);
      }
    });

    it('amortization schedule: last payment ends at zero (or near zero)', () => {
      const result = calculateLoan(100000, 2, 12);
      
      expect(result).not.toBeNull();
      if (result) {
        const lastPayment = result.amortizationSchedule[11];
        expect(lastPayment.month).toBe(12);
        // Ending balance should be very close to 0 (floating point precision)
        expect(Math.abs(lastPayment.endingBalance)).toBeLessThan(1);
      }
    });

    it('amortization schedule: each month reduces balance', () => {
      const result = calculateLoan(100000, 2, 12);
      
      expect(result).not.toBeNull();
      if (result) {
        for (let i = 1; i < result.amortizationSchedule.length; i++) {
          const prev = result.amortizationSchedule[i - 1];
          const curr = result.amortizationSchedule[i];
          expect(curr.beginningBalance).toBeLessThan(prev.beginningBalance);
          expect(curr.endingBalance).toBeLessThan(prev.endingBalance);
        }
      }
    });

    it('amortization schedule: principal + interest = monthly payment', () => {
      const result = calculateLoan(100000, 2, 12);
      
      expect(result).not.toBeNull();
      if (result) {
        result.amortizationSchedule.forEach((row) => {
          expect(row.principal + row.interest).toBeCloseTo(row.monthlyPayment, 5);
        });
      }
    });

    it('handles edge case: minimum loan amount', () => {
      const result = calculateLoan(30000, 2, 12);
      
      expect(result).not.toBeNull();
      if (result) {
        expect(result.monthlyPayment).toBeGreaterThan(0);
        expect(result.amortizationSchedule).toHaveLength(12);
      }
    });

    it('handles edge case: maximum loan amount', () => {
      const result = calculateLoan(2000000, 5, 36);
      
      expect(result).not.toBeNull();
      if (result) {
        expect(result.monthlyPayment).toBeGreaterThan(0);
        expect(result.amortizationSchedule).toHaveLength(36);
      }
    });

    it('verifies total interest matches sum of individual interests', () => {
      const result = calculateLoan(150000, 3.5, 18);
      
      expect(result).not.toBeNull();
      if (result) {
        const sumOfInterests = result.amortizationSchedule.reduce((sum, row) => sum + row.interest, 0);
        expect(result.totalInterest).toBeCloseTo(sumOfInterests, 2);
      }
    });

    it('verifies total principal paid equals loan amount', () => {
      const result = calculateLoan(150000, 3.5, 18);
      
      expect(result).not.toBeNull();
      if (result) {
        const sumOfPrincipal = result.amortizationSchedule.reduce((sum, row) => sum + row.principal, 0);
        expect(sumOfPrincipal).toBeCloseTo(150000, 2);
      }
    });
  });
});