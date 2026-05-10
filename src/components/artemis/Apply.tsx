'use client';

import React, { useState } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface Props {
  goToPage: (page: string) => void;
}

export default function Apply({ goToPage }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <div className="sticky top-[50px] z-40 bg-white border-b border-gray-100 flex items-center px-6 lg:px-16 shrink-0 h-[60px] shadow-sm">
        <h2 className="text-[14px] font-bold tracking-tight text-[#8A0000] mr-10 whitespace-nowrap">
          Admissions & Aid
        </h2>
        <div className="hidden md:flex space-x-6 text-[12px] font-bold uppercase tracking-widest text-gray-400 overflow-x-auto hide-scrollbar">
           <span className="text-black whitespace-nowrap border-b-2 border-[#8A0000]">Apply</span>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto w-full px-6 lg:px-16 pt-16 mb-24">
        <h1 className="text-[52px] font-extrabold leading-[1.05] tracking-tighter text-gray-900 mb-8 uppercase">
          Application for Admission
        </h1>
        <p className="text-2xl font-light text-gray-600 leading-relaxed mb-12 max-w-3xl">
          Join the next generation of scholars, innovators, and leaders at the University of Artemis.
        </p>

        {submitted ? (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
            <CheckCircle2 size={64} className="text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Received</h2>
            <p className="text-lg text-gray-600 mb-8">Thank you for your interest in the University of Artemis. We will be in touch regarding your application status.</p>
            <button onClick={() => goToPage('home')} className="px-8 py-3 bg-[#141414] text-white text-[13px] font-bold uppercase tracking-widest hover:bg-[#8A0000] transition-colors rounded">
              Return Home
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl bg-gray-50 p-8 md:p-12 rounded-2xl border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] font-bold text-gray-900 uppercase tracking-widest mb-2">First Name</label>
                <input required type="text" className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-[#8A0000] transition-colors" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-900 uppercase tracking-widest mb-2">Last Name</label>
                <input required type="text" className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-[#8A0000] transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-900 uppercase tracking-widest mb-2">Email Address</label>
              <input required type="email" className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-[#8A0000] transition-colors" />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-900 uppercase tracking-widest mb-2">Desired School</label>
              <select required className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-[#8A0000] transition-colors bg-white">
                <option value="">Select a School...</option>
                <option value="natural-sciences">School of Natural Sciences</option>
                <option value="engineering">School of Engineering & Technology</option>
                <option value="arts">School of Arts & Humanities</option>
                <option value="social-sciences">School of Social Sciences</option>
                <option value="health">School of Health & Medicine</option>
                <option value="education">School of Education & Human Development</option>
                <option value="business">School of Business</option>
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-900 uppercase tracking-widest mb-2">Personal Statement (Max 500 words)</label>
              <textarea required rows={6} className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-[#8A0000] transition-colors resize-none" placeholder="Tell us about your aspirations..."></textarea>
            </div>

            <button type="submit" className="w-full px-8 py-4 bg-[#8A0000] text-white text-[14px] font-bold uppercase tracking-widest hover:bg-[#141414] transition-colors rounded flex items-center justify-center gap-2">
              Submit Application <ArrowRight size={18} />
            </button>
          </form>
        )}
      </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
