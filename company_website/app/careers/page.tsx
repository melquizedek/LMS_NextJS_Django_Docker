'use client';

import { useState } from 'react';
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  HeartPulse,
  PiggyBank,
  Laptop,
  GraduationCap,
  CalendarCheck,
  ShieldCheck,
  Search,
  X,
  Upload,
  Send,
  Check,
} from 'lucide-react';
import {
  JOB_POSITIONS,
  COMPANY_BENEFITS,
  COMPANY_VALUES,
} from '@/utils/careers.data';
import { JobPosition } from '@/types';
import { useToast } from '@/context/ToastContext';

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
  const [applyingForJob, setApplyingForJob] = useState<JobPosition | null>(
    null
  );

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    portfolioUrl: '',
    yearsOfExperience: '3-5 years',
    coverLetter: '',
    resumeFileName: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const { showToast } = useToast();

  const departments = [
    'All',
    'Engineering',
    'Credit & Risk',
    'Product & Design',
    'Operations',
    'Compliance & Legal',
    'Sales & Growth',
  ];

  const filteredJobs = JOB_POSITIONS.filter((job) => {
    const matchesDept =
      selectedDepartment === 'All' || job.department === selectedDepartment;
    const matchesQuery =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesQuery;
  });

  const handleOpenApply = (job: JobPosition) => {
    setApplyingForJob(job);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      linkedinUrl: '',
      portfolioUrl: '',
      yearsOfExperience: '3-5 years',
      coverLetter: '',
      resumeFileName: '',
    });
    setSubmittedSuccess(false);
    setIsApplyModalOpen(true);
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        resumeFileName: e.target.files![0].name,
      }));
      showToast(
        `Resume "${e.target.files[0].name}" attached successfully.`,
        'info'
      );
    }
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      showToast(
        'Please fill in your name, email, and phone number.',
        'error'
      );
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      showToast(
        `Application for "${applyingForJob?.title || 'Position'}" submitted successfully!`,
        'success'
      );
    }, 1000);
  };

  const renderBenefitIcon = (icon: string) => {
    switch (icon) {
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-rose-500" />;
      case 'PiggyBank':
        return <PiggyBank className="w-6 h-6 text-amber-500" />;
      case 'Laptop':
        return <Laptop className="w-6 h-6 text-sky-500" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-purple-500" />;
      case 'CalendarCheck':
        return <CalendarCheck className="w-6 h-6 text-emerald-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#0c7368]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#0c7368]" />;
    }
  };

  return (
    <div id="careers-page-container" className="bg-white min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative bg-slate-900 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-[#042f2a] opacity-90" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider mb-6">
              <Briefcase className="w-3.5 h-3.5" />
              <span>CAREERS AT ZEDLENDINGCORP</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Build the Future of{' '}
              <span className="text-[#2dd4bf]">Fair & Ethical</span> Lending
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mt-6 leading-relaxed">
              We are a dedicated team of engineers, credit risk analysts, product
              designers, and compliance leaders dismantling predatory lending.
              Join us to build world-class, automated financial infrastructure
              that puts borrowers first.
            </p>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white block">
                  100%
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Remote-First Culture
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-teal-400 block">
                  $250M+
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Disbursed Responsibly
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 block">
                  6%
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  401(k) Match
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-sky-400 block">
                  4.9/5
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Employee Satisfaction
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Open Positions Section */}
      <section
        id="open-positions-section"
        className="py-16 bg-slate-50 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#0c7368] block mb-2">
                JOIN OUR MISSION
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Current Open Positions ({filteredJobs.length})
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-xl">
                Explore our open full-time and hybrid roles. Every position
                comes with competitive compensation, equity, and comprehensive
                benefits.
              </p>
            </div>
            <div className="w-full md:w-72 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search job title, skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-transparent shadow-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedDepartment === dept
                    ? 'bg-[#0c7368] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900">
                No positions found
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                We couldn&apos;t find any job postings matching &quot;
                {searchQuery}&quot;. Try selecting another department or submit
                an open application below.
              </p>
              <button
                onClick={() => {
                  setSelectedDepartment('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-teal-50 text-[#0c7368] text-xs font-bold border border-teal-100">
                        {job.department}
                      </span>
                      {job.featured && (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-200">
                          Featured Role
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0c7368] transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-teal-700" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-teal-700" />
                        <span>
                          {job.workplace} • {job.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{job.salaryRange}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="text-xs font-bold text-[#0c7368] hover:text-[#095349] hover:underline"
                    >
                      View Full Details
                    </button>
                    <button
                      onClick={() => handleOpenApply(job)}
                      className="px-4 py-2 rounded-xl bg-[#0c7368] hover:bg-[#095349] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Benefits & Perks */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0c7368] block mb-2">
              WHY YOU&apos;LL LOVE WORKING HERE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Comprehensive Benefits for You and Your Family
            </h2>
            <p className="text-slate-600 mt-4 text-base leading-relaxed">
              We invest in our people so they can do their life&apos;s best work
              with financial security, emotional wellness, and genuine autonomy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COMPANY_BENEFITS.map((benefit, index) => (
              <div
                key={index}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-teal-200 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {renderBenefitIcon(benefit.icon)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Company Values */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-400 block mb-2">
              OUR GUIDING PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Values That Define Our Culture
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_VALUES.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 space-y-3"
              >
                <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 font-black text-sm flex items-center justify-center">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-white">{val.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. General / Open Application Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-[#063a34] to-[#081f2c] p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="max-w-xl">
              <span className="px-3 py-1 rounded-full bg-teal-400/20 text-teal-300 text-xs font-bold border border-teal-400/30 inline-block mb-3">
                GENERAL TALENT POOL
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Don&apos;t See Your Exact Role?
              </h3>
              <p className="text-xs sm:text-sm text-teal-100/90 mt-2 leading-relaxed">
                We are always seeking exceptional fintech talent. Send us your
                resume and tell us how you can help advance fair lending access.
              </p>
            </div>
            <button
              onClick={() =>
                handleOpenApply({
                  id: 'general-app',
                  title: 'General / Open Talent Pool',
                  department: 'Engineering',
                  location: 'United States (Remote)',
                  type: 'Full-time',
                  workplace: 'Remote',
                  salaryRange: 'Competitive based on experience',
                  experience: 'Open',
                  postedDate: 'Ongoing',
                  description:
                    'Open application for future roles at ZedLendingCorp.',
                  responsibilities: ['Contribute to ZedLendingCorp vision'],
                  requirements: [
                    'Passion for transparent fintech products',
                  ],
                })
              }
              className="px-6 py-3.5 rounded-xl bg-white text-[#063a34] hover:bg-teal-50 text-xs font-bold shadow-md shrink-0 transition-all"
            >
              Submit Open Application
            </button>
          </div>
        </div>
      </section>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0c7368] text-xs font-bold">
                    {selectedJob.department}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    {selectedJob.workplace} • {selectedJob.type}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  {selectedJob.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-700" />{' '}
                    {selectedJob.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />{' '}
                    {selectedJob.salaryRange}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> Min{' '}
                    {selectedJob.experience}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-slate-700">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  About the Role
                </h4>
                <p className="leading-relaxed text-slate-600">
                  {selectedJob.description}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3">
                  Key Responsibilities
                </h4>
                <ul className="space-y-2">
                  {selectedJob.responsibilities.map((r, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#0c7368] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3">
                  Requirements & Qualifications
                </h4>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {selectedJob.niceToHave && selectedJob.niceToHave.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3">
                    Nice to Have
                  </h4>
                  <ul className="space-y-2">
                    {selectedJob.niceToHave.map((nth, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-slate-600"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5" />
                        <span className="leading-relaxed">{nth}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
              <button
                onClick={() => setSelectedJob(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const job = selectedJob;
                  setSelectedJob(null);
                  handleOpenApply(job);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#0c7368] hover:bg-[#095349] text-white text-xs font-bold shadow-md transition-colors"
              >
                Apply for this Position
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Form Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50">
              <div>
                <span className="text-[11px] font-bold text-[#0c7368] uppercase tracking-wider block">
                  JOB APPLICATION
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">
                  {applyingForJob?.title}
                </h3>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {submittedSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-black text-slate-900">
                  Application Received!
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for applying to ZedLendingCorp. Our talent
                  acquisition team will review your application for{' '}
                  <strong>{applyingForJob?.title}</strong> and reach out to you
                  within 3 business days.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setIsApplyModalOpen(false)}
                    className="px-6 py-2.5 rounded-xl bg-[#0c7368] text-white text-xs font-bold shadow-md"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmitApplication}
                className="p-6 overflow-y-auto space-y-4 text-xs"
              >
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan Smith"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jordan@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(555) 000-0000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      LinkedIn Profile URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/..."
                      value={formData.linkedinUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          linkedinUrl: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Portfolio / GitHub URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/..."
                      value={formData.portfolioUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          portfolioUrl: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Attach Resume / CV (PDF or DOCX)
                  </label>
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-teal-600 rounded-2xl cursor-pointer bg-slate-50/50 hover:bg-teal-50/30 transition-colors">
                    <Upload className="w-5 h-5 text-[#0c7368] mb-1" />
                    <span className="text-xs font-semibold text-slate-700">
                      {formData.resumeFileName ||
                        'Click to select or drop resume file'}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      Max size 10MB
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Why ZedLendingCorp? (Short Note)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly tell us what excites you about our mission..."
                    value={formData.coverLetter}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        coverLetter: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
                  />
                </div>
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-[#0c7368] hover:bg-[#095349] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting Application...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
