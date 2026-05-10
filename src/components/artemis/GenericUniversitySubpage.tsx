'use client';

import React from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import { ChevronRight } from 'lucide-react';

interface Props {
  goToPage: (page: string) => void;
  title: string;
  parentTitle: string;
  parentId: string;
}

export default function GenericUniversitySubpage({ goToPage, title, parentTitle, parentId }: Props) {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      {/* Breadcrumb Header */}
      <div className="sticky top-[50px] z-40 bg-white border-b border-gray-100 flex items-center px-6 lg:px-16 shrink-0 h-[60px] shadow-sm">
        <button onClick={() => goToPage('about')} className="text-[12px] font-bold uppercase tracking-widest text-[#8A0000] hover:text-black mr-4">
          About
        </button>
        <div className="text-gray-300 mr-4">/</div>
        <button onClick={() => goToPage(parentId)} className="text-[12px] font-bold uppercase tracking-widest text-[#8A0000] hover:text-black mr-4 uppercase">
          {parentTitle}
        </button>
        <div className="text-gray-300 mr-4">/</div>
        <h2 className="text-[14px] font-bold tracking-tight text-black whitespace-nowrap">
          {title}
        </h2>
      </div>

      <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-16 pt-16 pb-32">
        <h1 className="text-[48px] lg:text-[64px] font-extrabold leading-[1] tracking-tighter text-gray-900 uppercase mb-8">
          {title}
        </h1>
        
        <div className="p-16 border-t border-b border-gray-100 text-center mt-12 bg-gray-50/30">
            <h3 className="text-[20px] font-bold text-gray-900 mb-4 uppercase tracking-tight">Records Pending Migration</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-10 text-[15px] leading-relaxed">Detailed administrative and historical records for &quot;{title}&quot; are currently being synchronized with our global nodes.</p>
            <button onClick={() => goToPage(parentId)} className="px-10 py-3 bg-[#141414] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#8A0000] transition-colors">
                Return to {parentTitle}
            </button>
        </div>
      </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
