'use client';

import React from 'react';
import { 
  Sparkles, 
  Layers, 
  UserPlus, 
  ArrowUpRight, 
  Award, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  Clock, 
  CheckCircle2,
  PhoneCall,
  FileCheck,
  Bot
} from 'lucide-react';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onOpenApplication: () => void;
  onOpenAiAdvisor?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProducts,
  onOpenApplication,
  onOpenAiAdvisor,
}) => {
  return (
    <section id="hero-section" className="relative bg-[#f8fafc] overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background ambient lighting and subtle decorative shapes */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & Headings & Action Cards */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f7f4] border border-[#a4e2d8] text-[#0c7368] text-xs font-semibold uppercase tracking-wider mb-6 w-fit shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0c7368]" />
              <span>SEC LICENSED & REGULATED FINANCING CORPORATION</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.8rem] font-black text-slate-900 leading-[1.08] tracking-tight mb-6">
              Accessible <span className="text-[#0c7368]">Financial Solutions</span> Built with{' '}
              <span className="text-[#0284c7]">Trust & Integrity</span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-10 font-normal">
              Providing dependable, transparent financing programs for pensioners, salaried professionals, and growing enterprises. Experience human connection, minimal documentary requirements, and swift disbursement.
            </p>

            {/* Bottom Action Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              
              {/* Card 1: Explore Products Card */}
              <div 
                id="hero-explore-products-card"
                onClick={onExploreProducts}
                className="group relative bg-[#07473f] hover:bg-[#053a33] text-white p-5 rounded-2xl cursor-pointer shadow-lg shadow-teal-950/15 transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-teal-200">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/20 group-hover:bg-white text-teal-100 group-hover:text-[#07473f] flex items-center justify-center transition-all">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
                <div>
                  <span className="block text-[11px] font-bold tracking-wider text-teal-200 uppercase mb-1">
                    LOAN PROGRAMS
                  </span>
                  <h2 className="text-lg font-bold text-white leading-snug">
                    Explore Our Products
                  </h2>
                </div>
              </div>

              {/* Card 2: White Online Application Card */}
              <div 
                id="hero-apply-card"
                onClick={onOpenApplication}
                className="group relative bg-white hover:bg-slate-50 text-slate-900 p-5 rounded-2xl border-2 border-slate-900 cursor-pointer shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                    <UserPlus className="w-6 h-6 text-teal-300" />
                  </div>
                  <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-slate-900 text-slate-700 group-hover:text-white flex items-center justify-center transition-all">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
                <div>
                  <span className="block text-[11px] font-bold tracking-wider text-[#0c7368] uppercase mb-1">
                    FAST INQUIRY & PRE-APPROVAL
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 leading-snug">
                    Apply Online / Inquire
                  </h2>
                </div>
              </div>

            </div>

            {/* AI Advisor Prompt Strip */}
            {onOpenAiAdvisor && (
              <div 
                id="hero-ai-advisor-strip"
                onClick={onOpenAiAdvisor}
                className="mt-4 max-w-xl p-3.5 bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-teal-500/5 hover:from-teal-500/15 hover:to-emerald-500/15 border border-teal-200/80 rounded-2xl cursor-pointer flex items-center justify-between gap-3 group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                    <Bot className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        Ask ZedAI: Institutional Financial & Lending Advisor
                      </span>
                      <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-1.5 py-0.2 rounded">
                        NEW
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Simulate amortizations, calculate DTI ratios, and explore customized borrowing strategies.
                    </p>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-white text-teal-700 flex items-center justify-center shadow-2xs group-hover:translate-x-0.5 transition-transform shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            )}

          </div>

          {/* Right Column: High Fidelity Imagery, Stats Pill & Overlapping 30+ Years Badge */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
            
            {/* Background Dotted Matrix Pattern */}
            <div className="absolute -bottom-8 -left-8 w-40 h-40 opacity-40 pointer-events-none hidden sm:grid grid-cols-6 gap-2">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#0c7368]" />
              ))}
            </div>

            {/* Sparkle star icon accent */}
            <div className="absolute -top-4 right-6 text-sky-400 pointer-events-none">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"/>
              </svg>
            </div>

            {/* Main Visual Composition Container */}
            <div className="relative w-full max-w-[480px]">
              
              {/* Dual Imagery Layout */}
              <div className="flex items-end gap-3 sm:gap-4">
                
                {/* Left Photo: Professional Financial Advisor */}
                <div className="w-[52%] h-[340px] sm:h-[400px] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-amber-500 relative">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80"
                    alt="ZedLendingCorp Financial Advisor"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>

                {/* Right Photo: Collaborative finance consultation / client handshake */}
                <div className="w-[48%] h-[290px] sm:h-[350px] rounded-t-full rounded-b-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-200 relative">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=700&q=80"
                    alt="ZedLendingCorp Consultation"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>

              </div>

              {/* Overlapping Badge: 30+ YEARS OF HERITAGE */}
              <div className="absolute bottom-6 left-[38%] -translate-x-1/2 z-20">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#081f2c] border-4 border-white shadow-2xl flex flex-col items-center justify-center text-center p-2 text-white">
                  <span className="text-2xl sm:text-3xl font-black text-[#2dd4bf] tracking-tight leading-none">
                    30+
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-slate-200 mt-1 leading-tight px-1">
                    YEARS OF SERVICE
                  </span>
                </div>
              </div>

              {/* Floating Bottom Card: SEC Regulated / Over 50,000+ Satisfied Borrowers */}
              <div 
                id="hero-stats-card"
                className="mt-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-100 shadow-xl flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium text-slate-500">
                      SEC Regulated Financing Firm
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      50,000+ Borrowers Served
                    </span>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0c7368] text-xs font-bold whitespace-nowrap">
                  Fast Cash Release
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Feature quick highlight chips underneath hero */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-100/70 text-[#0c7368] flex items-center justify-center shrink-0">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Requirements</div>
              <div className="text-sm font-bold text-slate-900">2 Valid IDs Only</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-100/70 text-[#0c7368] flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Cash Disbursement</div>
              <div className="text-sm font-bold text-slate-900">Same-Day Release</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-100/70 text-[#0c7368] flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Interest Rates</div>
              <div className="text-sm font-bold text-slate-900">Competitive & Fixed</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-100/70 text-[#0c7368] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Regulation</div>
              <div className="text-sm font-bold text-slate-900">SEC Licensed Firm</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
