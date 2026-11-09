import { COMPANY_INFO, LOAN_PRODUCTS, FAQ_LIST, TESTIMONIALS_LIST, DEMO_USER } from '@/utils/constants';

describe('constants', () => {
  describe('COMPANY_INFO', () => {
    it('has correct company name', () => {
      expect(COMPANY_INFO.name).toBe('ZedLendingCorp');
    });

    it('has correct platform tagline', () => {
      expect(COMPANY_INFO.platformTagline).toBe('Online Loan Application Processing (OLAP)');
    });

    it('has correct contact info', () => {
      expect(COMPANY_INFO.phone).toBe('(02) 8876-1920');
      expect(COMPANY_INFO.email).toBe('support@zedlendingcorp.com.ph');
      expect(COMPANY_INFO.address).toContain('Zed Lending Tower');
    });

    it('has correct hours', () => {
      expect(COMPANY_INFO.hours).toContain('Mon - Fri');
    });

    it('has all required stats', () => {
      expect(COMPANY_INFO.stats.yearsOfExperience).toBeDefined();
      expect(COMPANY_INFO.stats.disbursedTotal).toBeDefined();
      expect(COMPANY_INFO.stats.approvalRate).toBeDefined();
      expect(COMPANY_INFO.stats.turnaroundTime).toBeDefined();
      expect(COMPANY_INFO.stats.happyBorrowers).toBeDefined();
      expect(COMPANY_INFO.stats.customerRating).toBeDefined();
    });
  });

  describe('LOAN_PRODUCTS', () => {
    it('has 6 loan products', () => {
      expect(LOAN_PRODUCTS).toHaveLength(6);
    });

    it('each product has required fields', () => {
      LOAN_PRODUCTS.forEach((product) => {
        expect(product.id).toBeDefined();
        expect(product.title).toBeDefined();
        expect(product.badge).toBeDefined();
        expect(product.tagline).toBeDefined();
        expect(product.minAmount).toBeGreaterThan(0);
        expect(product.maxAmount).toBeGreaterThan(product.minAmount);
        expect(product.defaultAmount).toBeGreaterThanOrEqual(product.minAmount);
        expect(product.defaultAmount).toBeLessThanOrEqual(product.maxAmount);
        expect(product.minTenureMonths).toBeGreaterThan(0);
        expect(product.maxTenureMonths).toBeGreaterThanOrEqual(product.minTenureMonths);
        expect(product.defaultTenureMonths).toBeGreaterThanOrEqual(product.minTenureMonths);
        expect(product.defaultTenureMonths).toBeLessThanOrEqual(product.maxTenureMonths);
        expect(product.interestRateAnnual).toBeGreaterThan(0);
        expect(product.processingFeePercent).toBeGreaterThanOrEqual(0);
        expect(product.turnaroundTime).toBeDefined();
        expect(product.iconName).toBeDefined();
        expect(product.features).toBeInstanceOf(Array);
        expect(product.features.length).toBeGreaterThan(0);
        expect(product.eligibility).toBeInstanceOf(Array);
        expect(product.eligibility.length).toBeGreaterThan(0);
      });
    });

    it('has expected product IDs', () => {
      const ids = LOAN_PRODUCTS.map((p) => p.id);
      expect(ids).toContain('personal');
      expect(ids).toContain('business');
      expect(ids).toContain('sme');
      expect(ids).toContain('emergency');
      expect(ids).toContain('auto');
      expect(ids).toContain('home_equity');
    });

    it('personal loan has correct defaults', () => {
      const personal = LOAN_PRODUCTS.find((p) => p.id === 'personal');
      expect(personal).toBeDefined();
      if (personal) {
        expect(personal.minAmount).toBe(10000);
        expect(personal.maxAmount).toBe(500000);
        expect(personal.defaultAmount).toBe(50000);
        expect(personal.interestRateAnnual).toBe(5.99);
      }
    });

    it('business loan has higher max amount', () => {
      const business = LOAN_PRODUCTS.find((p) => p.id === 'business');
      expect(business).toBeDefined();
      if (business) {
        expect(business.maxAmount).toBe(5000000);
      }
    });

    it('emergency loan has lowest min amount', () => {
      const emergency = LOAN_PRODUCTS.find((p) => p.id === 'emergency');
      expect(emergency).toBeDefined();
      if (emergency) {
        expect(emergency.minAmount).toBe(5000);
        expect(emergency.maxAmount).toBe(100000);
      }
    });
  });

  describe('FAQ_LIST', () => {
    it('has 6 FAQ items', () => {
      expect(FAQ_LIST).toHaveLength(6);
    });

    it('each FAQ has required fields', () => {
      FAQ_LIST.forEach((faq) => {
        expect(faq.id).toBeDefined();
        expect(faq.question).toBeDefined();
        expect(faq.answer).toBeDefined();
        expect(faq.category).toBeDefined();
      });
    });

    it('has expected categories', () => {
      const categories = [...new Set(FAQ_LIST.map((f) => f.category))];
      expect(categories).toContain('application');
      expect(categories).toContain('rates');
      expect(categories).toContain('general');
      expect(categories).toContain('repayment');
      expect(categories).toContain('security');
    });

    it('has expected question IDs', () => {
      const ids = FAQ_LIST.map((f) => f.id);
      expect(ids).toContain('faq-1');
      expect(ids).toContain('faq-2');
      expect(ids).toContain('faq-3');
      expect(ids).toContain('faq-4');
      expect(ids).toContain('faq-5');
      expect(ids).toContain('faq-6');
    });
  });

  describe('TESTIMONIALS_LIST', () => {
    it('has 3 testimonials', () => {
      expect(TESTIMONIALS_LIST).toHaveLength(3);
    });

    it('each testimonial has required fields', () => {
      TESTIMONIALS_LIST.forEach((testimonial) => {
        expect(testimonial.id).toBeDefined();
        expect(testimonial.name).toBeDefined();
        expect(testimonial.role).toBeDefined();
        expect(testimonial.company).toBeDefined();
        expect(testimonial.avatar).toBeDefined();
        expect(testimonial.rating).toBeGreaterThanOrEqual(1);
        expect(testimonial.rating).toBeLessThanOrEqual(5);
        expect(testimonial.quote).toBeDefined();
        expect(testimonial.loanType).toBeDefined();
        expect(testimonial.amount).toBeDefined();
      });
    });

    it('has expected loan types', () => {
      const loanTypes = TESTIMONIALS_LIST.map((t) => t.loanType);
      expect(loanTypes).toContain('Business Expansion');
      expect(loanTypes).toContain('Personal Loan');
      expect(loanTypes).toContain('Emergency Cash');
    });
  });

  describe('DEMO_USER', () => {
    it('has correct demo user data', () => {
      expect(DEMO_USER.id).toBe('usr_zed_001');
      expect(DEMO_USER.email).toBe('maria.santos@example.ph');
      expect(DEMO_USER.fullName).toBe('Maria Santos');
      expect(DEMO_USER.phone).toBe('(02) 8876-1920');
      expect(DEMO_USER.avatarUrl).toContain('unsplash.com');
      expect(DEMO_USER.memberSince).toBe('March 2023');
      expect(DEMO_USER.creditScore).toBe(745);
      expect(DEMO_USER.isVerified).toBe(true);
      expect(DEMO_USER.activeLoanCount).toBe(1);
    });
  });
});