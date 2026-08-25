export type LoanType = 
  | 'pension'
  | 'salary'
  | 'sme'
  | 'emergency'
  | 'personal'
  | 'business'
  | 'auto'
  | 'home_equity';

export interface LoanProduct {
  id: LoanType;
  title: string;
  badge: string;
  tagline: string;
  description?: string;
  minAmount: number;
  maxAmount: number;
  defaultAmount: number;
  minTenureMonths: number;
  maxTenureMonths: number;
  defaultTenureMonths: number;
  interestRateAnnual: number;
  processingFeePercent: number;
  turnaroundTime: string;
  iconName?: string;
  features: string[];
  eligibility: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'rates' | 'application' | 'repayment' | 'security';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  rating: number;
  quote: string;
  loanType: string;
  amount: string;
}

export interface CallbackRequest {
  fullName: string;
  phone: string;
  email: string;
  loanAmountRequested: number;
  preferredTime: 'morning' | 'afternoon' | 'evening';
  notes?: string;
}
