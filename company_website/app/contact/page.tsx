'use client';

import { ContactSection } from '@/components/ContactSection';
import { FAQSection } from '@/components/FAQSection';

export default function ContactPage() {
  return (
    <div id="contact-page-view" className="py-4">
      <ContactSection />
      <FAQSection
        onOpenContact={() => {
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />
    </div>
  );
}
