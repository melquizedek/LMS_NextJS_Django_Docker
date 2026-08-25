export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
};

export const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10;
};

export const isValidSSNLast4 = (ssn: string): boolean => {
  const cleaned = ssn.replace(/\D/g, '');
  return cleaned.length === 4;
};

export const isValidZipCode = (zip: string): boolean => {
  const cleaned = zip.replace(/\D/g, '');
  return cleaned.length === 5;
};

export const validateLoanForm = (data: {
  amount: number;
  tenureMonths: number;
  fullName: string;
  email: string;
  phone: string;
  annualIncome: number;
}): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.fullName.trim()) {
    errors.fullName = 'Full legal name is required';
  }

  if (!isValidEmail(data.email)) {
    errors.email = 'Please provide a valid email address';
  }

  if (!isValidPhone(data.phone)) {
    errors.phone = 'Please provide a 10-digit phone number';
  }

  if (data.amount < 1000) {
    errors.amount = 'Minimum loan amount is $1,000';
  }

  if (data.annualIncome < 15000) {
    errors.annualIncome = 'Minimum annual income requirement is $15,000';
  }

  return errors;
};
