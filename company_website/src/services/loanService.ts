import { LoanProduct, CallbackRequest } from '@/types';
import { LOAN_PRODUCTS } from '@/utils/constants';

export const loanService = {
  // Fetch available products
  async getLoanProducts(): Promise<LoanProduct[]> {
    return LOAN_PRODUCTS;
  },

  // Request a callback or loan inquiry
  async submitCallbackRequest(req: CallbackRequest): Promise<{ success: boolean; message: string }> {
    await new Promise((res) => setTimeout(res, 300));
    return {
      success: true,
      message: `Thank you, ${req.fullName}! A ZedLendingCorp loan specialist will reach out to you at ${req.phone} during your preferred ${req.preferredTime} window.`,
    };
  },
};
