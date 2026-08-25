'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Calculator, ArrowRight, ShieldCheck, HelpCircle, FileText, ChevronRight } from 'lucide-react';
import { LOAN_PRODUCTS, FAQ_LIST } from '@/utils/constants';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (type: 'tab' | 'product' | 'apply' | 'calculator', payload?: any) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectAction }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = LOAN_PRODUCTS.filter(
    (p) => p.title.toLowerCase().includes(query.toLowerCase()) || p.tagline.toLowerCase().includes(query.toLowerCase())
  );

  const filteredFAQs = FAQ_LIST.filter(
    (f) => f.question.toLowerCase().includes(query.toLowerCase()) || f.answer.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div 
      id="search-modal-overlay"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/70 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-[#0c7368] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search loans, calculator, rates, FAQs, dashboard..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-900 focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-5">
          
          {/* Quick Shortcuts */}
          {!query && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Quick Navigation
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => {
                    onSelectAction('tab', 'products');
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-teal-50 hover:text-[#0c7368] text-xs font-semibold text-slate-700 text-left border border-slate-200 flex items-center justify-between"
                >
                  <span>Products</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0c7368]" />
                </button>
                <button
                  onClick={() => {
                    onSelectAction('tab', 'about');
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-teal-50 hover:text-[#0c7368] text-xs font-semibold text-slate-700 text-left border border-slate-200 flex items-center justify-between"
                >
                  <span>About Us</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0c7368]" />
                </button>
                <button
                  onClick={() => {
                    onSelectAction('tab', 'careers');
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-teal-50 hover:text-[#0c7368] text-xs font-semibold text-slate-700 text-left border border-slate-200 flex items-center justify-between"
                >
                  <span>Careers</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0c7368]" />
                </button>
                <button
                  onClick={() => {
                    onSelectAction('tab', 'contact');
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-teal-50 hover:text-[#0c7368] text-xs font-semibold text-slate-700 text-left border border-slate-200 flex items-center justify-between"
                >
                  <span>Contact Us</span>
                  <HelpCircle className="w-3.5 h-3.5 text-[#0c7368]" />
                </button>
              </div>
            </div>
          )}

          {/* Loan Products Results */}
          {filteredProducts.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Loan Products ({filteredProducts.length})
              </span>
              <div className="space-y-1.5">
                {filteredProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectAction('product', p.id);
                      onClose();
                    }}
                    className="w-full p-3 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-between text-left group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-[#0c7368]">{p.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-teal-50 text-[#0c7368] font-bold">{p.interestRateAnnual}% APR</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{p.tagline}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0c7368] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Results */}
          {filteredFAQs.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Help & Answers ({filteredFAQs.length})
              </span>
              <div className="space-y-1.5">
                {filteredFAQs.map((faq) => (
                  <button
                    key={faq.id}
                    onClick={() => {
                      onSelectAction('tab', 'faq');
                      onClose();
                    }}
                    className="w-full p-3 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-between text-left group"
                  >
                    <div className="pr-4">
                      <span className="text-xs font-semibold text-slate-900 group-hover:text-[#0c7368] block">{faq.question}</span>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{faq.answer}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0c7368] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && filteredProducts.length === 0 && filteredFAQs.length === 0 && (
            <div className="text-center py-8 text-xs text-slate-500">
              No results found for "{query}". Try checking our loan catalog or contacting support.
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex justify-between items-center text-[11px] text-slate-400">
          <span>Press ESC or click outside to close</span>
          <span>ZedLendingCorp OLAP Platform</span>
        </div>

      </div>
    </div>
  );
};
