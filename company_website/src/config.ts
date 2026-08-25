export const APP_NAME = 'ZedLendingCorp';
export const APP_TAGLINE = 'Online Loan Application Processing (OLAP) Platform';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.zedlendingcorp.com/v1';

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PRODUCTS: '/products',
  CAREERS: '/careers',
  CONTACT: '/contact',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
  },
  DASHBOARD: {
    HOME: '/dashboard',
    LOANS: '/dashboard/loans',
    NEW_LOAN: '/dashboard/loans/new',
    LOAN_DETAILS: (id: string) => `/dashboard/loans/${id}`,
    PROFILE: '/dashboard/profile',
    SETTINGS: '/dashboard/settings',
  },
} as const;

export const CONFIG = {
  APP_NAME,
  APP_TAGLINE,
  API_URL,
  ROUTES,
  DEFAULT_LOAN_AMOUNT: 15000,
  DEFAULT_LOAN_TENURE: 36,
  SUPPORT_PHONE: '(629) 555-0129',
  SUPPORT_EMAIL: 'support@zedlendingcorp.com',
};

export default CONFIG;
