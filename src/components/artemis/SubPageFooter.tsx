'use client';

import React from 'react';

interface FooterProps {
  goToPage: (page: string) => void;
}

export default function SubPageFooter({ goToPage }: FooterProps) {
  const galleryImages = [
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1523050335102-c3250d857224?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=400",
  ];

  return (
    <div className="w-full shrink-0">
      {/* Photo Gallery on Crimson */}
      <section className="bg-crimson py-16 px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 auto-rows-[150px] md:auto-rows-[180px]">
          {/* Detailed grid layout matching screenshot vibe */}
          <div className="bg-gray-200 overflow-hidden relative"><img src={galleryImages[0]} className="w-full h-full object-cover" alt="" /><span className="absolute top-1 left-2 text-white/50 text-[10px]">a</span></div>
          <div className="bg-gray-200 overflow-hidden relative"><img src={galleryImages[1]} className="w-full h-full object-cover" alt="" /><span className="absolute top-1 left-2 text-white/50 text-[10px]">b</span></div>
          <div className="md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2 bg-gray-200 overflow-hidden relative">
            <img src={galleryImages[2]} className="w-full h-full object-cover" alt="" />
            <span className="absolute top-1 left-2 text-white/50 text-[10px]">c</span>
          </div>
          <div className="bg-gray-200 overflow-hidden relative"><img src={galleryImages[3]} className="w-full h-full object-cover" alt="" /><span className="absolute top-1 left-2 text-white/50 text-[10px]">d</span></div>
          <div className="bg-gray-200 overflow-hidden relative"><img src={galleryImages[4]} className="w-full h-full object-cover" alt="" /><span className="absolute top-1 left-2 text-white/50 text-[10px]">e</span></div>
          <div className="bg-gray-200 overflow-hidden relative"><img src={galleryImages[5]} className="w-full h-full object-cover" alt="" /><span className="absolute top-1 left-2 text-white/50 text-[10px]">f</span></div>
          <div className="bg-gray-200 overflow-hidden relative"><img src={galleryImages[6]} className="w-full h-full object-cover" alt="" /><span className="absolute top-1 left-2 text-white/50 text-[10px]">g</span></div>
          <div className="bg-gray-200 overflow-hidden relative"><img src={galleryImages[7]} className="w-full h-full object-cover" alt="" /><span className="absolute top-1 left-2 text-white/50 text-[10px]">h</span></div>
          <div className="bg-gray-200 overflow-hidden relative"><img src={galleryImages[8]} className="w-full h-full object-cover" alt="" /><span className="absolute top-1 left-2 text-white/50 text-[10px]">i</span></div>
        </div>
      </section>

      {/* Main Footer Section */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-20 px-6 lg:px-16 overflow-hidden">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-12 md:gap-20">
          
          {/* Logo & Address */}
          <div className="flex flex-col gap-6 md:w-1/3">
            <div className="font-black text-3xl tracking-tighter text-[#141414]">
              ARTEMIS
            </div>
            <div>
              <p className="font-bold text-[13px] text-gray-900 mb-1">University of Artemis</p>
              <p className="text-[13px] text-gray-600 mb-4 leading-tight">123 Innovative Way, Knowledge City, Global Hub</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[12px] font-medium border-b border-gray-100 pb-4 mb-4">
                <button onClick={() => goToPage('visit-us')} className="footer-link">Visit</button>
                <button onClick={() => goToPage('campus')} className="footer-link">Map</button>
                <button onClick={() => goToPage('campus')} className="footer-link">Events</button>
                <button onClick={() => goToPage('our-people')} className="footer-link">People</button>
                <button onClick={() => goToPage('jobs')} className="footer-link">Jobs</button>
                <button onClick={() => goToPage('contact-us')} className="footer-link">Contact</button>
              </div>
              <div className="flex gap-x-3 text-[12px] font-medium text-gray-500 mb-6">
                <button onClick={() => goToPage('about')} className="footer-link">Privacy</button>
                <button onClick={() => goToPage('access-at-artemis')} className="footer-link">Accessibility</button>
                <button onClick={() => goToPage('innovation')} className="footer-link">Social Media Hub</button>
              </div>
              
              <div className="flex space-x-4 grayscale opacity-80 text-lg">
                <span className="cursor-pointer hover:opacity-100 transition-opacity">𝕏</span>
                <span className="cursor-pointer hover:opacity-100 transition-opacity text-blue-800 font-bold">f</span>
                <span className="cursor-pointer hover:opacity-100 transition-opacity text-red-600">▶</span>
                <span className="cursor-pointer hover:opacity-100 transition-opacity">📷</span>
              </div>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <button onClick={() => goToPage('education')} className="text-[13px] font-bold text-gray-900 text-left hover:underline">Education</button>
              <button onClick={() => goToPage('admissions')} className="text-[13px] font-bold text-gray-900 text-left hover:underline">Admissions + Aid</button>
              <button onClick={() => goToPage('about')} className="text-[13px] font-bold text-gray-900 text-left hover:underline">About Artemis</button>
              <button className="text-[13px] font-bold text-gray-900 text-left hover:underline">Give</button>
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={() => goToPage('research')} className="text-[13px] font-bold text-gray-900 text-left hover:underline">Research</button>
              <button onClick={() => goToPage('campus')} className="text-[13px] font-bold text-gray-900 text-left hover:underline">Campus Life</button>
              <button className="text-[13px] font-bold text-gray-900 text-left hover:underline">Alumni</button>
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={() => goToPage('innovation')} className="text-[13px] font-bold text-gray-900 text-left hover:underline">Innovation</button>
              <button className="text-[13px] font-bold text-gray-900 text-left hover:underline">News</button>
              <button className="text-[13px] font-bold text-gray-900 text-left hover:underline">Lifelong Learning</button>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
