'use client';

import React from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import { ArrowRight, UserCircle, Award, Heart, PenTool } from 'lucide-react';

interface Props {
  goToPage: (page: string) => void;
}

export default function OurPeople({ goToPage }: Props) {
  const sublinks = [
    { name: "University Officers", icon: UserCircle },
    { name: "Famous Artemisians", icon: Award },
    { name: "Women making history", icon: Heart },
    { name: "Professor of Poetry", icon: PenTool },
  ];

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <div className="sticky top-[50px] z-40 bg-white border-b border-gray-100 flex items-center px-6 lg:px-16 shrink-0 h-[60px] shadow-sm">
        <button onClick={() => goToPage('about')} className="text-[12px] font-bold uppercase tracking-widest text-[#8A0000] hover:text-black mr-4">
          About
        </button>
        <div className="text-gray-300 mr-4">/</div>
        <h2 className="text-[14px] font-bold tracking-tight text-black whitespace-nowrap">
          Our People
        </h2>
      </div>

      <div className="max-w-[1000px] mx-auto w-full px-6 lg:px-16 pt-16 pb-32">
        <h1 className="text-[52px] font-extrabold leading-[1.05] tracking-tighter text-gray-900 mb-10 uppercase">
          Our People
        </h1>
        
        <p className="text-2xl font-light text-gray-500 leading-relaxed mb-16 max-w-3xl">
          The researchers, scholars, and staff who form the beating heart of the Artemis experiment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
          {sublinks.map((item) => (
            <button 
              key={item.name}
              className="group flex justify-between items-center py-6 border-b border-gray-100 hover:border-[#8A0000] transition-colors w-full text-left"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center mr-6 group-hover:bg-[#8A0000] group-hover:text-white transition-colors">
                  <item.icon size={18} />
                </div>
                <span className="text-[17px] font-bold text-gray-700 group-hover:text-black transition-colors">{item.name}</span>
              </div>
              <ArrowRight size={18} className="text-gray-300 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-transform" />
            </button>
          ))}
        </div>
      </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
