'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  PhoneCall, 
  Search, 
  Menu, 
  X, 
  Sparkles,
  Bot,
  ArrowRight
} from 'lucide-react';
import { COMPANY_INFO } from '@/utils/constants';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenCallback: () => void;
  onOpenAiAdvisor?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenCallback,
  onOpenAiAdvisor,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products' },
    { id: 'careers', label: 'Careers' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all">
      {/* Top announcement & credentials bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>SEC Licensed Financing Corporation • Over 30 Years of Trusted Service</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-400">
            <span>SEC Reg. #CS200109482</span>
            <span>•</span>
            <span>Cert. of Authority #1294</span>
            <span>•</span>
            <button 
              onClick={onOpenCallback}
              className="text-teal-400 hover:text-teal-300 font-medium underline underline-offset-2"
            >
              Request Free Loan Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo - ZedLendingCorp */}
          <div 
            id="nav-brand-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0c7368] to-[#04433c] text-white flex items-center justify-center shadow-md shadow-teal-900/10 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-teal-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  Zed<span className="text-[#0c7368]">Lending</span>Corp
                </span>
              </div>
              <span className="block text-[10px] font-bold tracking-widest text-[#0c7368] uppercase -mt-0.5">
                FINANCING CORPORATION
              </span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#0c7368] font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-[#0c7368] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3 md:gap-4">
            {/* Search Icon Button */}
            <button
              id="nav-search-button"
              onClick={onOpenSearch}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
              aria-label="Search site"
              title="Search loans and information"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Requesting a Call Box */}
            <button
              id="nav-call-button"
              onClick={onOpenCallback}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-full hover:bg-slate-50 transition-colors text-left group"
            >
              <div className="w-10 h-10 rounded-full bg-[#0c7368] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-[#095349] transition-colors">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="hidden xl:block">
                <div className="text-[11px] text-slate-500 font-medium leading-none">
                  Customer Care Hotline:
                </div>
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {COMPANY_INFO.phone}
                </div>
              </div>
            </button>

            {/* AI Advisor Button */}
            {onOpenAiAdvisor && (
              <button
                id="nav-ai-advisor-button"
                onClick={onOpenAiAdvisor}
                className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 shadow-2xs transition-all"
              >
                <Bot className="w-4 h-4 text-teal-600 animate-pulse" />
                <span>AI Loan Advisor</span>
              </button>
            )}

            {/* Inquire / Apply Button */}
            <button
              id="nav-apply-now-button"
              onClick={onOpenCallback}
              className="hidden md:flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#0c7368] to-[#085a51] hover:brightness-110 shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inquire Now</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-search-toggle"
              onClick={onOpenSearch}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-teal-50 text-[#0c7368] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#0c7368]" />}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCallback();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0c7368] text-white font-semibold text-sm shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Inquire for a Loan</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCallback();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50"
            >
              <PhoneCall className="w-4 h-4 text-[#0c7368]" />
              <span>Call Us: {COMPANY_INFO.phone}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
