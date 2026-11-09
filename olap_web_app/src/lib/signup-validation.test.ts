import {
  signupSchema,
  months,
  years,
  days,
  isValidDateOfBirth,
  validatePasswordMatch,
  type SignupFormValues,
} from './signup-validation';

describe('signup-validation', () => {
  describe('months', () => {
    it('has 12 months', () => {
      expect(months).toHaveLength(12);
    });

    it('has correct month values and labels', () => {
      expect(months[0]).toEqual({ value: '1', label: 'January' });
      expect(months[11]).toEqual({ value: '12', label: 'December' });
    });

    it('all months have value and label', () => {
      months.forEach((month) => {
        expect(month.value).toBeDefined();
        expect(month.label).toBeDefined();
      });
    });
  });

  describe('years', () => {
    it('has 120 years', () => {
      expect(years).toHaveLength(120);
    });

    it('starts with current year', () => {
      expect(years[0]).toBe(String(new Date().getFullYear()));
    });

    it('ends with year 120 years ago', () => {
      expect(years[119]).toBe(String(new Date().getFullYear() - 119));
    });

    it('all years are strings', () => {
      years.forEach((year) => {
        expect(typeof year).toBe('string');
      });
    });
  });

  describe('days', () => {
    it('has 31 days', () => {
      expect(days).toHaveLength(31);
    });

    it('has values from 1 to 31', () => {
      expect(days[0]).toBe('1');
      expect(days[30]).toBe('31');
    });

    it('all days are strings', () => {
      days.forEach((day) => {
        expect(typeof day).toBe('string');
      });
    });
  });

  describe('isValidDateOfBirth', () => {
    it('returns false for empty values', () => {
      expect(isValidDateOfBirth('', '', '')).toBe(false);
      expect(isValidDateOfBirth('2000', '', '')).toBe(false);
      expect(isValidDateOfBirth('2000', '1', '')).toBe(false);
    });

    it('returns false for future dates', () => {
      const nextYear = String(new Date().getFullYear() + 1);
      expect(isValidDateOfBirth(nextYear, '1', '1')).toBe(false);
    });

    it('returns false for dates before 1900', () => {
      expect(isValidDateOfBirth('1899', '1', '1')).toBe(false);
    });

    it('returns true for valid dates', () => {
      expect(isValidDateOfBirth('1990', '1', '1')).toBe(true);
      expect(isValidDateOfBirth('2000', '12', '31')).toBe(true);
      expect(isValidDateOfBirth('1950', '6', '15')).toBe(true);
    });

    it('returns false for invalid dates (Feb 30)', () => {
      expect(isValidDateOfBirth('2000', '2', '30')).toBe(false);
    });

    it('returns false for invalid dates (April 31)', () => {
      expect(isValidDateOfBirth('2000', '4', '31')).toBe(false);
    });

    it('handles leap years correctly', () => {
      expect(isValidDateOfBirth('2000', '2', '29')).toBe(true); // leap year
      expect(isValidDateOfBirth('1900', '2', '29')).toBe(false); // not leap year
      expect(isValidDateOfBirth('2004', '2', '29')).toBe(true); // leap year
    });
  });

  describe('validatePasswordMatch', () => {
    it('returns true for matching passwords', () => {
      expect(validatePasswordMatch('password123', 'password123')).toBe(true);
      expect(validatePasswordMatch('', '')).toBe(true);
    });

    it('returns false for non-matching passwords', () => {
      expect(validatePasswordMatch('password123', 'password456')).toBe(false);
      expect(validatePasswordMatch('password', '')).toBe(false);
    });
  });

  describe('signupSchema', () => {
    const validData: SignupFormValues = {
      firstName: 'John',
      middleName: 'Michael',
      lastName: 'Doe',
      email: 'john@example.com',
      countryCode: 'US',
      mobileNumber: '1234567890',
      birthMonth: '1',
      birthDay: '15',
      birthYear: '1990',
      password: 'password123',
      confirmPassword: 'password123',
    };

    it('validates correct data', () => {
      const result = signupSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('requires firstName', () => {
      const data = { ...validData, firstName: '' };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors.some((e) => e.path.includes('firstName'))).toBe(true);
      }
    });

    it('requires middleName', () => {
      const data = { ...validData, middleName: '' };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors.some((e) => e.path.includes('middleName'))).toBe(true);
      }
    });

    it('requires lastName', () => {
      const data = { ...validData, lastName: '' };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors.some((e) => e.path.includes('lastName'))).toBe(true);
      }
    });

    it('validates email format', () => {
      const data = { ...validData, email: 'invalid-email' };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors.some((e) => e.path.includes('email'))).toBe(true);
      }
    });

    it('requires countryCode', () => {
      const data = { ...validData, countryCode: '' };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors.some((e) => e.path.includes('countryCode'))).toBe(true);
      }
    });

    it('requires mobileNumber', () => {
      const data = { ...validData, mobileNumber: '' };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors.some((e) => e.path.includes('mobileNumber'))).toBe(true);
      }
    });

    it('validates mobileNumber contains only digits', () => {
      const data = { ...validData, mobileNumber: '123abc456' };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors.some((e) => e.path.includes('mobileNumber'))).toBe(true);
      }
    });

    it('validates mobileNumber max length', () => {
      const data = { ...validData, mobileNumber: '1'.repeat(16) };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors.some((e) => e.path.includes('mobileNumber'))).toBe(true);
      }
    });

    it('requires birthMonth', () => {
      const data = { ...validData, birthMonth: '' };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors.some((e) => e.path.includes('birthMonth'))).toBe(true);
      }
    });

    it('requires birthDay', () => {
      const data = { ...validData, birthDay: '' };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors.some((e) => e.path.includes('birthDay'))).toBe(true);
      }
    });

    it('requires birthYear', () => {
      const data = { ...validData, birthYear: '' };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors.some((e) => e.path.includes('birthYear'))).toBe(true);
      }
    });

    it('validates date of birth is valid', () => {
      const data = { ...validData, birthYear: '2000', birthMonth: '2', birthDay: '30' };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors.some((e) => e.path.includes('birthDay'))).toBe(true);
      }
    });

    it('validates date of birth is not in future', () => {
      const nextYear = String(new Date().getFullYear() + 1);
      const data = { ...validData, birthYear: nextYear, birthMonth: '1', birthDay: '1' };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors.some((e) => e.path.includes('birthDay'))).toBe(true);
      }
    });

    it('validates date of birth is not before 1900', () => {
      const data = { ...validData, birthYear: '1899', birthMonth: '1', birthDay: '1' };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors.some((e) => e.path.includes('birthDay'))).toBe(true);
      }
    });

    it('validates password minimum length', () => {
      const data = { ...validData, password: 'short', confirmPassword: 'short' };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors.some((e) => e.path.includes('password'))).toBe(true);
      }
    });

    it('validates password and confirmPassword match', () => {
      const data = { ...validData, confirmPassword: 'different123' };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors.some((e) => e.path.includes('confirmPassword'))).toBe(true);
      }
    });

    it('accepts exactly 8 character password', () => {
      const data = { ...validData, password: '12345678', confirmPassword: '12345678' };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('accepts valid mobile numbers with max 15 digits', () => {
      const data = { ...validData, mobileNumber: '1'.repeat(15) };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });
});