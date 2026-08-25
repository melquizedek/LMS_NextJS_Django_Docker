'use client';

import { useRouter } from 'next/navigation';
import {
  Award,
  ShieldCheck,
  TrendingUp,
  Compass,
  Eye,
  Sparkles,
  HeartHandshake,
} from 'lucide-react';
import { COMPANY_INFO } from '@/utils/constants';

export default function AboutPage() {
  const router = useRouter();

  const coreValues = [
    {
      title: 'Integrity & Ethical Standards',
      desc: 'We operate with unconditional honesty, transparent interest rates, and compliance with all SEC rules and financial regulations.',
      icon: <ShieldCheck className="w-6 h-6 text-[#0c7368]" />,
    },
    {
      title: 'Human Connection & Respect',
      desc: 'Every pensioner and borrower is treated with dignity, warmth, and attentive personal care by our dedicated loan officers.',
      icon: <HeartHandshake className="w-6 h-6 text-[#0c7368]" />,
    },
    {
      title: 'Adaptability & Innovation',
      desc: 'We continuously streamline our loan procedures to minimize documentary requirements and provide rapid same-day cash releases.',
      icon: <Sparkles className="w-6 h-6 text-[#0c7368]" />,
    },
    {
      title: 'Dedication & Excellence',
      desc: 'We are committed to delivering dependable, accessible credit that fosters real progress for families and enterprises.',
      icon: <Award className="w-6 h-6 text-[#0c7368]" />,
    },
  ];

  const leadershipTeam = [
    {
      name: 'Eduardo M. Tan',
      role: 'President & Chief Executive Officer',
      bio: 'Over 28 years of leadership in commercial banking, micro-finance, and pension credit programs.',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Maria Cristina Santos',
      role: 'Chief Operating Officer & Head of Credit',
      bio: 'Specialist in risk assessment, credit underwriting, and nationwide branch network operations.',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Atty. Roberto V. Ramos',
      role: 'Corporate Secretary & Compliance Officer',
      bio: 'Expert in SEC corporate compliance, data privacy, and legal frameworks for financial corporations.',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div id="about-page" className="py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#0c7368] text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>ESTABLISHED 1994 • OVER 30 YEARS OF TRUSTED SERVICE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            About ZedLendingCorp
          </h1>
          <p className="text-slate-600 mt-4 text-base leading-relaxed">
            An SEC-licensed financing institution dedicated to providing
            accessible, dependable financial solutions for retirees, salaried
            employees, and growing businesses nationwide.
          </p>
        </div>

        {/* Big Numbers Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-3xl sm:text-4xl font-black text-[#0c7368] block">
              {COMPANY_INFO.stats.yearsOfExperience}
            </span>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-1 block">
              Years in Service
            </span>
          </div>
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 block">
              {COMPANY_INFO.stats.disbursedTotal}
            </span>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-1 block">
              Total Capital Disbursed
            </span>
          </div>
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-3xl sm:text-4xl font-black text-emerald-600 block">
              {COMPANY_INFO.stats.approvalRate}
            </span>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-1 block">
              Application Approval Rate
            </span>
          </div>
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-3xl sm:text-4xl font-black text-sky-600 block">
              {COMPANY_INFO.stats.happyBorrowers}
            </span>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-1 block">
              Satisfied Borrowers
            </span>
          </div>
        </div>

        {/* Corporate Profile Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#0c7368] text-xs font-bold uppercase tracking-wider">
              <span>OUR HERITAGE</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
              Empowering Filipino Families and Retirees for Over Three Decades
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              ZedLendingCorp was founded with the mission to bridge the gap
              between traditional banking institutions and everyday citizens who
              need prompt, hassle-free credit. We recognized early on that
              military and civilian pensioners often faced bureaucratic delays
              and stringent requirements when seeking financial assistance.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Today, we have grown into a premier financing corporation with
              branches across key regional centers, serving AFP pensioners, SSS
              retirees, and partnering with top corporate employers to deliver
              fast salary advances and business expansion capital.
            </p>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-slate-100">
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
              alt="ZedLendingCorp Corporate Office"
              className="w-full h-[380px] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-4 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-teal-300">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Our Mission</h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              To provide accessible, ethical, and fast financial solutions
              through human connection, streamlined procedures, and an expansive
              branch network—empowering customers to achieve financial readiness
              and peace of mind.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-[#0c7368] text-white space-y-4 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Our Vision</h3>
            <p className="text-teal-100 text-xs sm:text-sm leading-relaxed">
              To be the most trusted and preferred non-bank financial institution
              in the country, recognized for unwavering integrity, prompt service
              delivery, and compassionate customer care.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Our Core Values
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2">
              The fundamental pillars that govern our operations and
              relationships with every client.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-teal-300 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center mb-4 group-hover:bg-[#0c7368] group-hover:text-white transition-colors">
                  {val.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {val.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Leadership */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Leadership & Governance
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2">
              Guided by seasoned financial leaders committed to fiduciary
              excellence and regulatory adherence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipTeam.map((leader, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-teal-500 shadow-sm">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {leader.name}
                </h3>
                <span className="text-xs font-semibold text-[#0c7368] mb-2">
                  {leader.role}
                </span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SEC & Regulatory Disclosure */}
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-xs text-slate-500 space-y-2 mb-16">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-[#0c7368]" />
            <span>Regulatory & Licensing Information</span>
          </div>
          <p>
            ZedLendingCorp is a financing corporation registered with and
            licensed by the Securities and Exchange Commission (SEC) under
            Republic Act No. 8556 (Financing Company Act). SEC Registration No.
            CS200109482 • Certificate of Authority to Operate No. 1294.
          </p>
        </div>

        {/* CTA Bar */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#07473f] to-[#0d594f] text-white text-center space-y-4 shadow-xl">
          <h3 className="text-2xl font-black text-white">
            Experience Fast & Caring Financial Service
          </h3>
          <p className="text-xs sm:text-sm text-teal-100 max-w-md mx-auto">
            Apply online today or speak directly with our friendly loan
            specialists.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => router.push('/contact')}
              className="px-6 py-3.5 rounded-xl bg-white text-[#07473f] hover:bg-teal-50 text-xs font-bold shadow-md transition-all"
            >
              Start Online Application
            </button>
            <button
              onClick={() => router.push('/contact')}
              className="px-6 py-3.5 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
            >
              Contact Branch Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
