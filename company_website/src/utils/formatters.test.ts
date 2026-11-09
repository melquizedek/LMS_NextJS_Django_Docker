import { formatCurrency, formatNumber, formatPercent } from '@/utils/formatters';

describe('formatters utility', () => {
  describe('formatCurrency', () => {
    it('formats positive numbers correctly', () => {
      expect(formatCurrency(1234)).toBe('₱1,234');
      expect(formatCurrency(1234.56, true)).toBe('₱1,234.56');
    });

    it('handles zero', () => {
      expect(formatCurrency(0)).toBe('₱0');
    });

    it('handles NaN', () => {
      expect(formatCurrency(NaN)).toBe('₱0');
    });
  });

  describe('formatNumber', () => {
    it('formats numbers with commas', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1000000)).toBe('1,000,000');
    });

    it('handles zero', () => {
      expect(formatNumber(0)).toBe('0');
    });

    it('handles NaN', () => {
      expect(formatNumber(NaN)).toBe('0');
    });
  });

  describe('formatPercent', () => {
    it('formats percentages correctly', () => {
      expect(formatPercent(5.5)).toBe('5.50%');
      expect(formatPercent(100)).toBe('100.00%');
    });

    it('handles NaN', () => {
      expect(formatPercent(NaN)).toBe('0%');
    });
  });
});