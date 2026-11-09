import {
  isValidEmail,
  isValidPhone,
  isValidSSNLast4,
  isValidZipCode,
  validateLoanForm,
} from '@/utils/validation';

describe('validation utilities', () => {
  describe('isValidEmail', () => {
    it('validates standard email formats', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.org')).toBe(true);
      expect(isValidEmail('user+tag@example.co.uk')).toBe(true);
      expect(isValidEmail('user123@test-domain.com')).toBe(true);
    });

    it('validates emails with subdomains', () => {
      expect(isValidEmail('test@mail.example.com')).toBe(true);
      expect(isValidEmail('user@sub.domain.org')).toBe(true);
    });

    it('rejects invalid email formats', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('test.example.com')).toBe(false);
      expect(isValidEmail('test@.com')).toBe(false);
      expect(isValidEmail('test@com')).toBe(false);
    });

    it('handles emails with spaces', () => {
      // Current implementation trims then validates with regex
      // Spaces at start/end are trimmed; internal spaces are not allowed by regex
      expect(isValidEmail(' test@example.com')).toBe(true); // trimmed
      expect(isValidEmail('test@example.com ')).toBe(true); // trimmed
      expect(isValidEmail('test @example.com')).toBe(false); // internal space
    });

    it('handles trimmed emails', () => {
      expect(isValidEmail('  test@example.com  ')).toBe(true);
    });

    it('handles emails with consecutive dots', () => {
      // Current regex [a-zA-Z0-9._%+-]+ allows consecutive dots
      // This is a known limitation of simple email regex
      expect(isValidEmail('test.user@example.com')).toBe(true);
      expect(isValidEmail('test..user@example.com')).toBe(true);
    });

    it('handles emails starting or ending with dot in local part', () => {
      // Current regex allows dots at start/end of local part
      // This is a known limitation of simple email regex
      expect(isValidEmail('.test@example.com')).toBe(true);
      expect(isValidEmail('test.@example.com')).toBe(true);
    });
  });

  describe('isValidPhone', () => {
    it('validates 10-digit phone numbers', () => {
      expect(isValidPhone('1234567890')).toBe(true);
      expect(isValidPhone('5551234567')).toBe(true);
    });

    it('validates phone numbers with formatting', () => {
      expect(isValidPhone('(555) 123-4567')).toBe(true);
      expect(isValidPhone('555-123-4567')).toBe(true);
      expect(isValidPhone('555 123 4567')).toBe(true);
      expect(isValidPhone('+1 555 123 4567')).toBe(true);
    });

    it('rejects phone numbers with less than 10 digits', () => {
      expect(isValidPhone('123456789')).toBe(false);
      expect(isValidPhone('555-1234')).toBe(false);
      expect(isValidPhone('123')).toBe(false);
      expect(isValidPhone('')).toBe(false);
    });

    it('rejects phone numbers with only non-digits', () => {
      expect(isValidPhone('abc-def-ghij')).toBe(false);
      expect(isValidPhone('() - ')).toBe(false);
    });
  });

  describe('isValidSSNLast4', () => {
    it('validates 4-digit SSN', () => {
      expect(isValidSSNLast4('1234')).toBe(true);
      expect(isValidSSNLast4('0000')).toBe(true);
      expect(isValidSSNLast4('9999')).toBe(true);
    });

    it('validates SSN with formatting', () => {
      expect(isValidSSNLast4('12-34')).toBe(true);
      expect(isValidSSNLast4('1 2 3 4')).toBe(true);
    });

    it('rejects non-4-digit SSN', () => {
      expect(isValidSSNLast4('123')).toBe(false);
      expect(isValidSSNLast4('12345')).toBe(false);
      expect(isValidSSNLast4('')).toBe(false);
      expect(isValidSSNLast4('abcd')).toBe(false);
    });
  });

  describe('isValidZipCode', () => {
    it('validates 5-digit ZIP codes', () => {
      expect(isValidZipCode('12345')).toBe(true);
      expect(isValidZipCode('90210')).toBe(true);
      expect(isValidZipCode('00000')).toBe(true);
    });

    it('validates ZIP codes with formatting', () => {
      expect(isValidZipCode('12-345')).toBe(true);
      expect(isValidZipCode('1 2 3 4 5')).toBe(true);
    });

    it('rejects non-5-digit ZIP codes', () => {
      expect(isValidZipCode('1234')).toBe(false);
      expect(isValidZipCode('123456')).toBe(false);
      expect(isValidZipCode('')).toBe(false);
      expect(isValidZipCode('abcde')).toBe(false);
    });
  });

  describe('validateLoanForm', () => {
    const validData = {
      amount: 50000,
      tenureMonths: 24,
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '5551234567',
      annualIncome: 75000,
    };

    it('returns empty errors for valid data', () => {
      const errors = validateLoanForm(validData);
      expect(errors).toEqual({});
    });

    it('validates fullName is required', () => {
      const errors = validateLoanForm({ ...validData, fullName: '' });
      expect(errors.fullName).toBe('Full legal name is required');
      
      const errors2 = validateLoanForm({ ...validData, fullName: '   ' });
      expect(errors2.fullName).toBe('Full legal name is required');
    });

    it('validates email format', () => {
      const errors = validateLoanForm({ ...validData, email: 'invalid' });
      expect(errors.email).toBe('Please provide a valid email address');
      
      const errors2 = validateLoanForm({ ...validData, email: 'test@' });
      expect(errors2.email).toBe('Please provide a valid email address');
    });

    it('validates phone number', () => {
      const errors = validateLoanForm({ ...validData, phone: '123' });
      expect(errors.phone).toBe('Please provide a 10-digit phone number');
      
      const errors2 = validateLoanForm({ ...validData, phone: 'abcdefghij' });
      expect(errors2.phone).toBe('Please provide a 10-digit phone number');
    });

    it('validates minimum loan amount', () => {
      const errors = validateLoanForm({ ...validData, amount: 500 });
      expect(errors.amount).toBe('Minimum loan amount is $1,000');
      
      const errors2 = validateLoanForm({ ...validData, amount: 999 });
      expect(errors2.amount).toBe('Minimum loan amount is $1,000');
    });

    it('allows exact minimum loan amount', () => {
      const errors = validateLoanForm({ ...validData, amount: 1000 });
      expect(errors.amount).toBeUndefined();
    });

    it('validates minimum annual income', () => {
      const errors = validateLoanForm({ ...validData, annualIncome: 10000 });
      expect(errors.annualIncome).toBe('Minimum annual income requirement is $15,000');
      
      const errors2 = validateLoanForm({ ...validData, annualIncome: 14999 });
      expect(errors2.annualIncome).toBe('Minimum annual income requirement is $15,000');
    });

    it('allows exact minimum annual income', () => {
      const errors = validateLoanForm({ ...validData, annualIncome: 15000 });
      expect(errors.annualIncome).toBeUndefined();
    });

    it('returns multiple errors for multiple invalid fields', () => {
      const errors = validateLoanForm({
        ...validData,
        fullName: '',
        email: 'invalid',
        phone: '123',
        amount: 500,
        annualIncome: 10000,
      });
      
      expect(errors.fullName).toBe('Full legal name is required');
      expect(errors.email).toBe('Please provide a valid email address');
      expect(errors.phone).toBe('Please provide a 10-digit phone number');
      expect(errors.amount).toBe('Minimum loan amount is $1,000');
      expect(errors.annualIncome).toBe('Minimum annual income requirement is $15,000');
    });

    it('does not add error for valid phone with formatting', () => {
      const errors = validateLoanForm({ ...validData, phone: '(555) 123-4567' });
      expect(errors.phone).toBeUndefined();
    });

    it('does not add error for valid email with subdomain', () => {
      const errors = validateLoanForm({ ...validData, email: 'user@mail.example.com' });
      expect(errors.email).toBeUndefined();
    });
  });
});