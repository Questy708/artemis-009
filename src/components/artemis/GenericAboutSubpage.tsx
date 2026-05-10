'use client';

import React from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import { ArrowRight, Sparkles, Globe, MapPin, Briefcase, PhoneCall } from 'lucide-react';

interface Props {
  goToPage: (page: string) => void;
  title: string;
  id: string;
  description: string;
}

export default function GenericAboutSubpage({ goToPage, title, description }: Props) {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <div className="sticky top-[50px] z-40 bg-white border-b border-gray-100 flex items-center px-6 lg:px-16 shrink-0 h-[60px] shadow-sm">
        <button onClick={() => goToPage('about')} className="text-[12px] font-bold uppercase tracking-widest text-[#8A0000] hover:text-black mr-4">
          About
        </button>
        <div className="text-gray-300 mr-4">/</div>
        <h2 className="text-[14px] font-bold tracking-tight text-black whitespace-nowrap">
          {title}
        </h2>
      </div>

      <div className="max-w-[1000px] mx-auto w-full px-6 lg:px-16 pt-16 pb-32">
        <h1 className="text-[52px] font-extrabold leading-[1.05] tracking-tighter text-gray-900 mb-10 uppercase">
          {title}
        </h1>
        
        <p className="text-2xl font-light text-gray-500 leading-relaxed mb-16 max-w-3xl">
          {description}
        </p>

        <div className="p-16 border-t border-b border-gray-100 text-center">
            <h3 className="text-[20px] font-bold text-gray-900 mb-4 uppercase tracking-tight">Section Under Construction</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-10 text-[15px] leading-relaxed">We are currently migrating the detailed records for {title} into the Artemis centralized database infrastructure.</p>
            <button onClick={() => goToPage('about')} className="px-10 py-3 bg-[#141414] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#8A0000] transition-colors">
                Return to About
            </button>
        </div>
      </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
