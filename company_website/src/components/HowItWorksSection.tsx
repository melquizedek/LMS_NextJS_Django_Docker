'use client';

import React from 'react';
import { FileText, UserCheck, Banknote, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';

interface HowItWorksSectionProps {
  onInquireClick?: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onInquireClick }) => {
  const steps = [
    {
      step: '01',
      title: 'Submit Inquiry & 2 Valid IDs',
      description: 'Fill out our simple inquiry form or visit any accredited branch. Provide 2 government-issued IDs and your proof of income or pension voucher.',
      icon: <FileText className="w-6 h-6 text-[#0c7368]" />,
      badge: 'Takes 3 Minutes',
    },
    {
      step: '02',
      title: 'Fast & Respectful Credit Assessment',
      description: 'Our dedicated loan advisors review your documents with care and transparency. No surprise fees, no complex credit jargon, and no co-maker hassles.',
      icon: <UserCheck className="w-6 h-6 text-[#0c7368]" />,
      badge: 'Swift Decision',
    },
    {
      step: '03',
      title: 'Immediate Cash Release',
      description: 'Upon approval, your funds are deposited directly to your bank account / e-wallet or claimed directly at our branch counter on the same day.',
      icon: <Banknote className="w-6 h-6 text-[#0c7368]" />,
      badge: 'Same-Day Funds',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#0c7368] text-xs font-bold uppercase tracking-wider mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>SIMPLE & HASSLE-FREE PROCESS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How to Get Your Loan in 3 Easy Steps
          </h2>
          <p className="text-slate-600 mt-3 text-base leading-relaxed">
            We've eliminated complicated paperwork and long queues. Get the financial assistance you need with speed, dignity, and total transparency.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative bg-slate-50 rounded-3xl p-8 border border-slate-200/80 hover:border-teal-300 hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-slate-100 flex items-center justify-center group-hover:bg-[#0c7368] group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-3xl font-black text-slate-300 group-hover:text-[#0c7368] transition-colors">
                    {item.step}
                  </span>
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-md bg-teal-100/70 text-[#0c7368] text-[11px] font-bold mb-3">
                  {item.badge}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center gap-2 text-xs font-bold text-[#0c7368]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero hidden charges</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#07473f] to-[#0a2f2a] rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-2xl font-black text-white">Ready to apply for a loan?</h3>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-1 max-w-xl">
              Talk to our friendly loan consultants today or submit your online inquiry in under 3 minutes.
            </p>
          </div>
          <button
            onClick={onInquireClick}
            className="px-6 py-3.5 rounded-xl bg-white text-[#07473f] hover:bg-teal-50 text-xs font-extrabold flex items-center gap-2 shadow-md shrink-0 transition-all cursor-pointer"
          >
            <span>Inquire Now / Contact Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
