'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Layers,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  FileCheck,
  Building,
  PhoneCall,
  Check,
} from 'lucide-react';
import { LOAN_PRODUCTS } from '@/utils/constants';
import { formatCurrency } from '@/utils/formatters';
import { LoanProduct } from '@/types';

export default function ProductsPage() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<
    'all' | 'pension' | 'salary' | 'business' | 'emergency'
  >('all');
  const [activeTabSection, setActiveTabSection] = useState<
    'catalog' | 'comparison' | 'requirements'
  >('catalog');

  const filteredProducts = LOAN_PRODUCTS.filter((prod) => {
    if (selectedFilter === 'pension')
      return prod.id === 'personal' || prod.id === 'home_equity';
    if (selectedFilter === 'salary')
      return prod.id === 'emergency' || prod.id === 'personal';
    if (selectedFilter === 'business')
      return prod.id === 'business' || prod.id === 'sme';
    if (selectedFilter === 'emergency') return prod.id === 'emergency';
    return true;
  });

  const handleInquire = (_product: LoanProduct) => {
    router.push('/contact');
  };

  const generalRequirements = [
    {
      category: 'For All Applicants',
      items: [
        'Two (2) original Government-Issued Valid IDs (e.g. Passport, Driver\'s License, UMID, Postal ID, PRC)',
        'Fully accomplished and signed Loan Inquiry / Application Form',
        'Active Bank Account / ATM card details for direct disbursement',
        'Proof of Billing (Electricity, Water, or Internet bill under applicant or immediate family)',
      ],
    },
    {
      category: 'For Pensioners (AFP / SSS / GSIS / PVAO)',
      items: [
        'Original Retirement / Pension ID and Voucher',
        'Bank Passbook / ATM statement showing the last 3 months pension credits',
        'Certificate of Pension Eligibility or Verification Slip',
        'No co-maker required for standard pension credit lines',
      ],
    },
    {
      category: 'For Salaried Employees & Corporate Partners',
      items: [
        'Latest three (3) months payslips signed by HR/Payroll officer',
        'Certificate of Employment with Compensation and Tenure',
        'Company ID and TIN Number',
        'Signed salary deduction agreement (if under accredited corporate employer)',
      ],
    },
    {
      category: 'For Business Owners & Entrepreneurs',
      items: [
        'DTI Registration or SEC Certificate with Articles of Incorporation',
        'Mayor\'s / Business Permit for the current fiscal year',
        'Bank Statements for the last 6 consecutive months',
        'Income Tax Return (ITR) and Audited Financial Statements',
      ],
    },
  ];

  return (
    <div id="products-catalog-page" className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 text-[#0c7368] text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>FINANCING PROGRAMS & PRODUCTS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Accessible Loan Products Built on Trust
          </h1>
          <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
            Explore our comprehensive range of financing facilities designed for
            pensioners, working professionals, and growing enterprises. Simple
            qualifications, transparent terms, and swift cash release.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1">
            {(
              [
                { key: 'catalog', label: 'Loan Catalog' },
                { key: 'comparison', label: 'Side-by-Side Comparison' },
                { key: 'requirements', label: 'Requirements & Eligibility' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTabSection(tab.key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTabSection === tab.key
                    ? 'bg-[#0c7368] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* View 1: Products Grid */}
        {activeTabSection === 'catalog' && (
          <div>
            <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
              {[
                { id: 'all', label: 'All Financing (6)' },
                { id: 'pension', label: 'Pension Loans' },
                { id: 'salary', label: 'Salary & Quick Cash' },
                { id: 'business', label: 'Business & SME' },
                { id: 'emergency', label: 'Emergency Cash' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f.id as typeof selectedFilter)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedFilter === f.id
                      ? 'bg-[#0c7368] text-white shadow-md'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0c7368] text-xs font-bold border border-teal-100">
                        {p.badge}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-teal-700" />
                        {p.turnaroundTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0c7368] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 min-h-[32px]">
                      {p.tagline}
                    </p>
                    <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-500">Interest Rate:</span>
                        <span className="font-bold text-[#0c7368] text-sm">
                          {p.interestRateAnnual}% APR
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-500">
                          Borrowing Range:
                        </span>
                        <span className="font-bold text-slate-900">
                          {formatCurrency(p.minAmount)} -{' '}
                          {formatCurrency(p.maxAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-500">
                          Repayment Terms:
                        </span>
                        <span className="font-bold text-slate-900">
                          {p.minTenureMonths} to {p.maxTenureMonths} Months
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 mb-6">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Included Features
                      </span>
                      {p.features.map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs text-slate-700"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0c7368] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex gap-2">
                    <button
                      onClick={() => handleInquire(p)}
                      className="w-full py-3 rounded-xl bg-[#0c7368] hover:bg-[#095349] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Inquire for {p.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View 2: Side-by-Side Comparison Table */}
        {activeTabSection === 'comparison' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                Loan Products Side-by-Side Matrix
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Review all credit options and choose the structure that best
                matches your timeline and liquidity needs.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                    <th className="py-3 px-4 font-bold">Loan Product</th>
                    <th className="py-3 px-4 font-bold">Fixed APR</th>
                    <th className="py-3 px-4 font-bold">
                      Credit Limit Range
                    </th>
                    <th className="py-3 px-4 font-bold">Tenure Range</th>
                    <th className="py-3 px-4 font-bold">Origination Fee</th>
                    <th className="py-3 px-4 font-bold">
                      Disbursement Speed
                    </th>
                    <th className="py-3 px-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {LOAN_PRODUCTS.map((prod) => (
                    <tr
                      key={prod.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="py-4 px-4 font-bold text-slate-900 flex items-center gap-2">
                        <span>{prod.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-teal-50 text-[#0c7368] font-semibold">
                          {prod.badge}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-bold text-[#0c7368]">
                        {prod.interestRateAnnual}%
                      </td>
                      <td className="py-4 px-4 text-slate-700 font-semibold">
                        {formatCurrency(prod.minAmount)} –{' '}
                        {formatCurrency(prod.maxAmount)}
                      </td>
                      <td className="py-4 px-4 text-slate-600">
                        {prod.minTenureMonths} to {prod.maxTenureMonths} Mos
                      </td>
                      <td className="py-4 px-4 text-slate-600">
                        {prod.processingFeePercent}%
                      </td>
                      <td className="py-4 px-4 text-slate-600">
                        {prod.turnaroundTime}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => handleInquire(prod)}
                          className="px-3 py-1.5 rounded-lg bg-[#0c7368] hover:bg-[#095349] text-white font-bold text-[11px] cursor-pointer"
                        >
                          Inquire
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View 3: Requirements & Eligibility Guide */}
        {activeTabSection === 'requirements' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#0c7368] flex items-center justify-center">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Application Checklist & Documentary Requirements
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ensure you have prepared these clear, standard documents
                    before visiting our branch or submitting your inquiry.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {generalRequirements.map((group, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80"
                  >
                    <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#0c7368]" />
                      <span>{group.category}</span>
                    </h4>
                    <ul className="space-y-2.5 text-xs text-slate-600">
                      {group.items.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="flex items-start gap-2"
                        >
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Corporate Partnership Banner */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider">
                  <Building className="w-3.5 h-3.5" />
                  <span>FOR EMPLOYERS & HR EXECUTIVES</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Partner with us for Employee Salary Loan Programs
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  Empower your workforce with low-interest emergency salary
                  advances and financial wellness programs with zero liability
                  for your company.
                </p>
              </div>
              <button
                onClick={() => router.push('/contact')}
                className="px-6 py-3 rounded-xl bg-[#0c7368] hover:bg-[#0a5e54] text-white text-xs font-bold whitespace-nowrap shadow-lg transition-all shrink-0 cursor-pointer flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Inquire for Corporate Accreditation</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
