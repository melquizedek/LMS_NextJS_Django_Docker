'use client';

import React from 'react';
import { 
  UserCheck, 
  Building2, 
  Briefcase, 
  Zap, 
  Car, 
  Home, 
  ArrowRight, 
  Check, 
  Clock, 
  ShieldCheck
} from 'lucide-react';
import { formatCurrency, formatPercent } from '@/utils/formatters';
import { LOAN_PRODUCTS } from '@/utils/constants';
import { LoanProduct } from '@/types';

interface LoanProductsSectionProps {
  onNavigateToProducts?: () => void;
  onInquireClick?: () => void;
}

export const LoanProductsSection: React.FC<LoanProductsSectionProps> = ({
  onNavigateToProducts,
  onInquireClick,
}) => {
  const products = LOAN_PRODUCTS;

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-[#0c7368]" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#0c7368]" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-[#0c7368]" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#0c7368]" />;
      case 'Car':
        return <Car className="w-6 h-6 text-[#0c7368]" />;
      case 'Home':
        return <Home className="w-6 h-6 text-[#0c7368]" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#0c7368]" />;
    }
  };

  const handleInquire = (product: LoanProduct) => {
    if (onInquireClick) {
      onInquireClick();
    } else if (onNavigateToProducts) {
      onNavigateToProducts();
    }
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/80 text-[#0c7368] text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>LOAN PRODUCTS & CREDIT PROGRAMS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Accessible Financing Tailored to Your Needs
            </h2>
            <p className="text-slate-600 mt-2 text-base max-w-2xl">
              Engineered with transparent terms, low fixed interest rates, and zero hidden deductions. Designed for pensioners, salary earners, and entrepreneurs.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Minimal requirements • Same-day cash disbursement</span>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              id={`loan-product-card-${product.id}`}
              className="bg-white rounded-3xl border border-slate-200/90 hover:border-teal-400 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div>
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 group-hover:bg-[#0c7368] text-[#0c7368] group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                    {getIcon(product.iconName)}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                    {product.badge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0c7368] transition-colors">
                  {product.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {product.tagline}
                </p>

                {/* Metrics Pill Grid */}
                <div className="my-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Interest Rate</span>
                    <span className="font-bold text-slate-900 text-sm text-[#0c7368]">
                      {formatPercent(product.interestRateAnnual)} APR
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Max Limit</span>
                    <span className="font-bold text-slate-900 text-sm">
                      {formatCurrency(product.maxAmount)}
                    </span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-teal-700" />
                      Speed: <strong>{product.turnaroundTime}</strong>
                    </span>
                    <span>{product.minTenureMonths}-{product.maxTenureMonths} mo</span>
                  </div>
                </div>

                {/* Feature Bullet List */}
                <div className="space-y-2 mb-6">
                  {product.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleInquire(product)}
                  className="w-full py-3 rounded-xl bg-[#0c7368] hover:bg-[#095349] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Inquire for {product.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Link */}
        {onNavigateToProducts && (
          <div className="mt-12 text-center">
            <button
              onClick={onNavigateToProducts}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-300 hover:border-teal-600 text-xs font-bold text-slate-800 hover:text-[#0c7368] shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <span>View Full Products Catalog & Eligibility Criteria</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
