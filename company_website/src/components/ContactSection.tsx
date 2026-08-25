'use client';

import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { COMPANY_INFO } from '@/utils/constants';
import { loanService } from '@/services/loanService';
import { useToast } from '@/context/ToastContext';

export const ContactSection: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    loanAmountRequested: 25000,
    preferredTime: 'morning' as const,
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      showToast('Please provide your name and phone number.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const res = await loanService.submitCallbackRequest(formData);
      setIsSubmitted(true);
      showToast(res.message, 'success');
    } catch {
      showToast('Failed to schedule call. Please dial directly.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Support & Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0c7368] text-xs font-bold uppercase tracking-wider">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Direct Client Care</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Get in Touch with Our Loan Specialists
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed">
              Have specific questions about commercial terms, debt consolidation strategies, or mortgage equity qualifications? Our licensed advisors are ready to help.
            </p>

            <div className="space-y-4 pt-2">
              {/* Phone Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0c7368] text-white flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium block">Toll-Free Customer Line</span>
                  <a href={`tel:${COMPANY_INFO.phoneClean}`} className="text-base font-extrabold text-slate-900 hover:text-[#0c7368] transition-colors">
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium block">Official Inquiries & Support</span>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-sm font-bold text-slate-900 hover:text-[#0c7368] transition-colors">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium block">Corporate Headquarters</span>
                  <span className="text-xs font-semibold text-slate-800 leading-tight block">
                    {COMPANY_INFO.address}
                  </span>
                </div>
              </div>

              {/* Hours Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium block">Advisory Hours</span>
                  <span className="text-xs font-semibold text-slate-800 leading-tight block">
                    {COMPANY_INFO.hours}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Callback Request Interactive Form */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            {isSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Callback Scheduled!
                </h3>
                <p className="text-slate-600 text-xs max-w-sm mx-auto">
                  A ZedLendingCorp loan officer will call you at <strong>{formData.phone}</strong> during your requested window.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Request a Free Callback
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill in your details below for a non-binding phone consultation with a senior financing specialist.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Rivera"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0c7368]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(629) 555-0129"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0c7368]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0c7368]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Approx. Loan Needed ($)</label>
                    <input
                      type="number"
                      step={1000}
                      value={formData.loanAmountRequested}
                      onChange={(e) => setFormData({ ...formData, loanAmountRequested: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:ring-2 focus:ring-[#0c7368]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Best Time to Call You</label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {[
                      { id: 'morning', label: 'Morning (8am-12pm)' },
                      { id: 'afternoon', label: 'Afternoon (12pm-5pm)' },
                      { id: 'evening', label: 'Evening (5pm-8pm)' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredTime: opt.id as any })}
                        className={`p-2 rounded-xl border text-center font-semibold transition-all ${
                          formData.preferredTime === opt.id
                            ? 'bg-[#0c7368] text-white border-[#0c7368]'
                            : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Loan Requirements / Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your financing timeline, credit history, or specific questions..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-[#0c7368]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-[#0c7368] hover:bg-[#095349] text-white text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{isLoading ? 'Submitting...' : 'Request Callback from ZedLendingCorp'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
