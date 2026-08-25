'use client';

import { useRouter } from 'next/navigation';
import { HeroSection } from '@/components/HeroSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { LoanProductsSection } from '@/components/LoanProductsSection';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { FAQSection } from '@/components/FAQSection';
import { ContactSection } from '@/components/ContactSection';

export default function HomePage() {
  const router = useRouter();

  const handleNavigateToTab = (tab: string) => {
    const routeMap: Record<string, string> = {
      home: '/',
      about: '/about',
      products: '/products',
      careers: '/careers',
      contact: '/contact',
    };
    router.push(routeMap[tab] || '/');
  };

  const handleOpenCallback = () => {
    router.push('/contact');
  };

  return (
    <div id="home-page-container">
      <HeroSection
        onExploreProducts={() => handleNavigateToTab('products')}
        onOpenApplication={handleOpenCallback}
      />
      <HowItWorksSection onInquireClick={handleOpenCallback} />
      <LoanProductsSection
        onNavigateToProducts={() => handleNavigateToTab('products')}
        onInquireClick={handleOpenCallback}
      />
      <WhyChooseUs onApplyClick={handleOpenCallback} />
      <TestimonialsSection />
      <FAQSection onOpenContact={handleOpenCallback} />
      <ContactSection />
    </div>
  );
}
