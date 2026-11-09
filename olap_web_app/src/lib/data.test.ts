jest.mock('lucide-react', () => ({
  Home: 'Home',
  Briefcase: 'Briefcase',
  Car: 'Car',
  FileText: 'FileText',
  User: 'User',
  Shield: 'Shield',
  Calculator: 'Calculator',
  FolderOpen: 'FolderOpen',
}));

import { navLinks, loanProducts, recentPayments, notifications, userProfile } from '@/lib/data';

describe('data utilities', () => {
  describe('navLinks', () => {
    it('has 7 navigation links', () => {
      expect(navLinks).toHaveLength(7);
    });

    it('each link has href, label, and icon', () => {
      navLinks.forEach((link) => {
        expect(link.href).toBeDefined();
        expect(link.label).toBeDefined();
        expect(link.icon).toBeDefined();
      });
    });

    it('contains expected routes', () => {
      const hrefs = navLinks.map((link) => link.href);
      expect(hrefs).toContain('/dashboard');
      expect(hrefs).toContain('/products');
      expect(hrefs).toContain('/calculator');
      expect(hrefs).toContain('/apply');
      expect(hrefs).toContain('/loan-applications');
      expect(hrefs).toContain('/profile');
      expect(hrefs).toContain('/admin/generate-schedule');
    });
  });

  describe('loanProducts', () => {
    it('has 3 loan products', () => {
      expect(loanProducts).toHaveLength(3);
    });

    it('each product has required fields', () => {
      loanProducts.forEach((product) => {
        expect(product.id).toBeDefined();
        expect(product.name).toBeDefined();
        expect(product.description).toBeDefined();
        expect(product.image).toBeDefined();
        expect(product.image.url).toBeDefined();
        expect(product.image.hint).toBeDefined();
        expect(product.image.id).toBeDefined();
        expect(product.icon).toBeDefined();
      });
    });

    it('has expected product IDs', () => {
      const ids = loanProducts.map((p) => p.id);
      expect(ids).toContain('prod_mortgage');
      expect(ids).toContain('prod_personal');
      expect(ids).toContain('prod_auto');
    });
  });

  describe('recentPayments', () => {
    it('has 4 recent payments', () => {
      expect(recentPayments).toHaveLength(4);
    });

    it('each payment has required fields', () => {
      recentPayments.forEach((payment) => {
        expect(payment.id).toBeDefined();
        expect(payment.date).toBeDefined();
        expect(typeof payment.amount).toBe('number');
        expect(payment.status).toBeDefined();
      });
    });

    it('all payments have status Completed', () => {
      recentPayments.forEach((payment) => {
        expect(payment.status).toBe('Completed');
      });
    });

    it('all payments have same amount', () => {
      const amounts = recentPayments.map((p) => p.amount);
      expect(new Set(amounts).size).toBe(1);
      expect(amounts[0]).toBe(550.00);
    });
  });

  describe('notifications', () => {
    it('has 3 notifications', () => {
      expect(notifications).toHaveLength(3);
    });

    it('each notification has required fields', () => {
      notifications.forEach((notification) => {
        expect(notification.id).toBeDefined();
        expect(notification.title).toBeDefined();
        expect(notification.description).toBeDefined();
        expect(notification.date).toBeDefined();
      });
    });

    it('has expected notification titles', () => {
      const titles = notifications.map((n) => n.title);
      expect(titles).toContain('Payment Reminder');
      expect(titles).toContain('Payment Successful');
      expect(titles).toContain('Application Approved');
    });
  });

  describe('userProfile', () => {
    it('has all required fields', () => {
      expect(userProfile.name).toBe('Alex Doe');
      expect(userProfile.email).toBe('alex.doe@example.com');
      expect(userProfile.phone).toBe('+1 (555) 123-4567');
      expect(userProfile.address).toBe('123 Main St, Anytown, USA 12345');
      expect(userProfile.employment).toBe('Software Engineer at TechCorp');
      expect(userProfile.memberSince).toBe('2023-01-15');
    });
  });
});