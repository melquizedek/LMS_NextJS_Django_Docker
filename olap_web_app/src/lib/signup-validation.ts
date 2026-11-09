import { z } from 'zod';

export const months = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1),
  label: new Date(0, i).toLocaleString('default', { month: 'long' }),
}));

export const years = Array.from({ length: 120 }, (_, i) => String(new Date().getFullYear() - i));

export const days = Array.from({ length: 31 }, (_, i) => String(i + 1));

export const signupSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required.' }),
    middleName: z.string().min(1, { message: 'Middle name is required.' }),
    lastName: z.string().min(1, { message: 'Last name is required.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    countryCode: z.string().min(1, { message: 'Please select a country.' }),
    mobileNumber: z
      .string()
      .min(1, { message: 'Mobile number is required.' })
      .max(15, { message: 'Mobile number cannot be more than 15 digits.' })
      .regex(/^\d+$/, { message: 'Mobile number must contain only digits.' }),
    birthMonth: z.string().min(1, { message: 'Please select a month.' }),
    birthDay: z.string().min(1, { message: 'Please select a day.' }),
    birthYear: z.string().min(1, { message: 'Please select a year.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  })
  .refine(
    (data) => {
      const { birthYear, birthMonth, birthDay } = data;
      if (!birthYear || !birthMonth || !birthDay) {
        return false;
      }
      const year = Number.parseInt(birthYear, 10);
      const month = Number.parseInt(birthMonth, 10);
      const day = Number.parseInt(birthDay, 10);
      const date = new Date(year, month - 1, day);
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day &&
        date < new Date() &&
        date > new Date('1900-01-01')
      );
    },
    {
      message: 'Please enter a valid date of birth.',
      path: ['birthDay'],
    }
  );

export type SignupFormValues = z.infer<typeof signupSchema>;

export function isValidDateOfBirth(year: string, month: string, day: string): boolean {
  if (!year || !month || !day) {
    return false;
  }
  const yearNum = Number.parseInt(year, 10);
  const monthNum = Number.parseInt(month, 10);
  const dayNum = Number.parseInt(day, 10);
  const date = new Date(yearNum, monthNum - 1, dayNum);
  return (
    date.getFullYear() === yearNum &&
    date.getMonth() === monthNum - 1 &&
    date.getDate() === dayNum &&
    date < new Date() &&
    date > new Date('1900-01-01')
  );
}

export function validatePasswordMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}