'use client';

import React from 'react';
import { ShieldCheck, PhoneCall, Mail, MapPin, ExternalLink } from 'lucide-react';
import { COMPANY_INFO, LOAN_PRODUCTS } from '@/utils/constants';

interface FooterProps {
  onNavigate: (tabId: string) => void;
  onOpenCallback: () => void;
  onOpenAiAdvisor?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCallback, onOpenAiAdvisor }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 select-none">
              <div className="w-10 h-10 rounded-xl bg-[#0c7368] text-white flex items-center justify-center font-bold shadow-xs">
                <ShieldCheck className="w-6 h-6 text-teal-200" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white block">
                  Zed<span className="text-teal-400">Lending</span>Corp
                </span>
                <span className="text-[10px] font-bold tracking-widest text-teal-400 uppercase -mt-0.5 block">
                  OLAP PLATFORM
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              ZedLendingCorp is an authorized Online Loan Application Processing (OLAP) platform delivering secure, non-predatory personal, business, and emergency credit solutions nationwide with 24-hour ACH disbursement.
            </p>

            <div className="pt-2 flex flex-col gap-1.5 text-slate-300">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-teal-400" />
                <span className="font-bold text-white">{COMPANY_INFO.phone}</span>
                <span className="text-slate-500">(Direct Support)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-400" />
                <span>{COMPANY_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>{COMPANY_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Products</h4>
            <ul className="space-y-2">
              {LOAN_PRODUCTS.map((prod) => (
                <li key={prod.id}>
                  <button
                    onClick={() => onNavigate('products')}
                    className="hover:text-teal-400 transition-colors text-left"
                  >
                    {prod.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Platform Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Company & Pages</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-teal-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-teal-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-teal-400 transition-colors">
                  Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('careers')} className="hover:text-teal-400 transition-colors">
                  Careers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-teal-400 transition-colors">
                  Contact Us
                </button>
              </li>
              {onOpenAiAdvisor && (
                <li>
                  <button 
                    onClick={onOpenAiAdvisor} 
                    className="text-teal-400 hover:text-teal-300 font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>ZedAI Financial Advisor</span>
                    <span className="text-[9px] bg-teal-900/60 border border-teal-500/30 text-teal-300 px-1 py-0.2 rounded">AI</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 5: Security & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Regulatory Trust</h4>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-teal-300 block">NMLS #994821</span>
              <p className="text-[11px] text-slate-400 leading-snug">
                Equal Housing Opportunity. State licensing registered under OLAP protocol guidelines.
              </p>
            </div>
            <div className="text-[11px] text-slate-500">
              256-Bit SSL Encrypted • SOC-2 Type II Certified Data Storage
            </div>
          </div>

        </div>

        {/* Regulatory Disclaimers & Copyright */}
        <div className="pt-8 space-y-4">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            * <strong>Disclosures & Terms:</strong> Fixed annual percentage rates (APR) for ZedLendingCorp loans range from 4.85% to 12.99% based on credit profile, loan tenure, loan product type, and state of residence. All loan approvals are subject to underwriting verification, debt-to-income checks, and receipt of required income documentation. Fast ACH funding is typically disbursed within 24 hours of final signed agreement, excluding federal banking holidays.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-900 text-slate-400">
            <div>
              © {new Date().getFullYear()} ZedLendingCorp Financial Services Inc. All rights reserved.
            </div>
            <div className="flex gap-4">
              <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
              <span>•</span>
              <span className="hover:text-slate-300 cursor-pointer">E-Sign Consent</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
