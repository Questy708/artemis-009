'use client';

import { Search, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
  onMenuClick: () => void;
  goHome: () => void;
  goToPage: (page: string) => void;
  onSearchClick?: () => void;
}

export default function Header({ onMenuClick, goHome, goToPage, onSearchClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`bg-[#8A0000] text-white h-[50px] flex items-center justify-between px-6 sticky top-0 z-[100] w-full shrink-0 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="lg:hidden mr-4 p-2.5 hover:bg-white/10 rounded transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center cursor-pointer group" onClick={goHome}>
          <div className="font-extrabold uppercase leading-[1.1] text-[11px] tracking-tight group-hover:opacity-80 transition-opacity">
            University of<br />Artemis
          </div>
        </div>
      </div>
      <div className="hidden lg:flex space-x-5 text-[13px] font-bold">
        <button onClick={() => goToPage('education')} className="hover:underline transition-opacity cursor-pointer">education</button>
        <button onClick={() => goToPage('research')} className="hover:underline transition-opacity cursor-pointer">research</button>
        <button onClick={() => goToPage('innovation')} className="hover:underline transition-opacity cursor-pointer">innovation</button>
        <button onClick={() => goToPage('admissions')} className="hover:underline transition-opacity cursor-pointer text-white/90">admissions + aid</button>
        <button onClick={() => goToPage('campus')} className="hover:underline transition-opacity cursor-pointer text-white/90">campus life</button>
        <button onClick={() => goToPage('colleges')} className="hover:underline transition-opacity cursor-pointer text-white/90">colleges</button>
        <button onClick={() => goToPage('about')} className="hover:underline transition-opacity cursor-pointer text-white/90">about artemis</button>
        <button onClick={() => goToPage('blog')} className="hover:underline transition-opacity cursor-pointer text-white/90">journal</button>
        <button onClick={() => goToPage('fundraising')} className="border border-white/40 text-white px-4 py-1 rounded-sm uppercase tracking-wider text-[11px] hover:bg-white/10 transition-colors cursor-pointer">give</button>
        <button onClick={() => goToPage('apply')} className="bg-white text-[#8A0000] px-4 py-1 rounded-sm uppercase tracking-wider text-[11px] hover:bg-gray-100 transition-colors cursor-pointer">apply</button>
      </div>
      <button
        onClick={onSearchClick}
        className="flex items-center group cursor-pointer p-2.5 hover:bg-white/10 rounded transition-colors"
        aria-label="Search"
      >
        <Search size={18} className="group-hover:opacity-80 transition-opacity" />
      </button>
    </nav>
  );
}
