'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ToastProvider } from '@/context/ToastContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SearchModal } from '@/components/SearchModal';
import { AiChatbot } from '@/components/AiChatbot';

const TAB_MAP: Record<string, string> = {
  '/': 'home',
  '/about': 'about',
  '/products': 'products',
  '/careers': 'careers',
  '/contact': 'contact',
};

const REVERSE_TAB_MAP: Record<string, string> = {
  home: '/',
  about: '/about',
  products: '/products',
  careers: '/careers',
  contact: '/contact',
};

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  const activeTab = TAB_MAP[pathname] || 'home';

  const setActiveTab = (tab: string) => {
    const path = REVERSE_TAB_MAP[tab] || '/';
    router.push(path);
  };

  const handleOpenCallback = () => {
    router.push('/contact');
  };

  const handleOpenAiChat = () => {
    setIsAiChatOpen(true);
  };

  const handleSearchAction = (
    type: 'tab' | 'product' | 'apply' | 'calculator',
    payload?: string
  ) => {
    if (type === 'tab') {
      setActiveTab(payload || 'home');
    } else if (type === 'calculator' || type === 'product') {
      router.push('/products');
    } else if (type === 'apply') {
      handleOpenCallback();
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900 antialiased">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenCallback={handleOpenCallback}
          onOpenAiAdvisor={handleOpenAiChat}
        />

        <main className="flex-1">{children}</main>

        <Footer
          onNavigate={(tab) => {
            setActiveTab(tab);
          }}
          onOpenCallback={handleOpenCallback}
          onOpenAiAdvisor={handleOpenAiChat}
        />

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectAction={handleSearchAction}
        />

        <AiChatbot
          onNavigateToTab={(tab) => setActiveTab(tab)}
          onOpenCallback={handleOpenCallback}
          isOpenExternal={isAiChatOpen}
          onCloseExternal={() => setIsAiChatOpen(false)}
        />
      </div>
    </ToastProvider>
  );
}
