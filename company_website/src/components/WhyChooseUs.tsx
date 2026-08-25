'use client';

import React from 'react';
import { Zap, ShieldCheck, DollarSign, Award, Clock, Users, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '@/utils/constants';

interface WhyChooseUsProps {
  onApplyClick: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onApplyClick }) => {
  const pillars = [
    {
      icon: <Clock className="w-6 h-6 text-[#0c7368]" />,
      title: '2-Minute Instant Evaluation',
      desc: 'Our proprietary Online Loan Application Processing (OLAP) engine evaluates over 40 credit points instantaneously with zero waiting lines.',
    },
    {
      icon: <Zap className="w-6 h-6 text-[#0c7368]" />,
      title: 'Direct 24-Hour ACH Funding',
      desc: 'Once approved and digitally signed, your funds are routed straight to your verified checking account on the same or next business day.',
    },
    {
      icon: <DollarSign className="w-6 h-6 text-[#0c7368]" />,
      title: 'Zero Hidden Penalties',
      desc: 'No upfront application fees, no teaser interest rate spikes, and zero penalties for paying off your loan early.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#0c7368]" />,
      title: 'Bank-Grade 256-Bit Security',
      desc: 'Protected by SOC-2 Type II standards and SSL encryption. We adhere strictly to federal privacy and lending compliance.',
    },
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                alt="ZedLendingCorp Headquarters and Advisory"
                className="w-full h-[450px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-teal-300 block uppercase tracking-wider">
                      REPUTABLE & LICENSED
                    </span>
                    <span className="text-lg font-extrabold text-white mt-0.5 block">
                      Over {COMPANY_INFO.stats.disbursedTotal} in Capital Provided
                    </span>
                  </div>
                  <div className="text-2xl font-black text-emerald-400">
                    {COMPANY_INFO.stats.yearsOfExperience}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pillars & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0c7368] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>THE ZEDLENDINGCORP ADVANTAGE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              A Modern Lending Partner Designed for Transparency & Speed
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Traditional banking is bogged down by weeks of paperwork and opaque qualification criteria. ZedLendingCorp bridges the gap with modern OLAP technology, empowering individuals and growing enterprises to access the financial liquidity they deserve.
            </p>

            {/* 2x2 Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              {pillars.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#0c7368] flex items-center justify-center shadow-xs mb-3 border border-slate-100">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onApplyClick}
                className="px-6 py-3 rounded-xl bg-[#0c7368] hover:bg-[#095349] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all"
              >
                <span>Check Your Rate Online (No Score Impact)</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
