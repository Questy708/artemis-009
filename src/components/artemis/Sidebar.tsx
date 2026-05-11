'use client';

import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  goHome: () => void;
  goToPage: (page: string) => void;
  /** When true, hide the desktop sidebar column (subpages); mobile drawer still works */
  hideDesktopSidebar?: boolean;
}

export default function Sidebar({ isOpen, onClose, goHome, goToPage, hideDesktopSidebar }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const mockResults = [
    { title: 'The Artemis Project', type: 'Initiative' },
    { title: 'Synthetic Intelligence Lab', type: 'Research' },
    { title: 'Admission Class of 2030', type: 'Deadline' },
  ].filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const sidebarContent = (
    <>
      <div className="flex-1 px-8 lg:px-10 py-12 overflow-y-auto">
        <div className="lg:hidden flex items-center justify-between mb-8">
           <span className="font-bold tracking-tighter text-[#8A0000]">MENU</span>
           <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded text-gray-500"><X size={20}/></button>
        </div>

        <div className="mb-10 relative">
          <h3 className="text-[14px] font-bold mb-4">Explore websites, people, and locations</h3>
          <div className="bg-[#F3F3F3] p-3 flex items-center focus-within:bg-white focus-within:ring-1 focus-within:ring-[#8A0000] transition-all">
            <Search size={16} className="text-[#8A0000] mr-3" />
            <input 
              type="text" 
              placeholder="What are you looking for?" 
              className="bg-transparent text-[13px] w-full outline-none" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearching(e.target.value.length > 0);
              }}
              onFocus={() => searchQuery.length > 0 && setIsSearching(true)}
              onBlur={() => setTimeout(() => setIsSearching(false), 200)}
            />
          </div>

          <AnimatePresence>
            {isSearching && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 bg-white shadow-xl border border-gray-100 z-50 mt-1 p-2"
              >
                {mockResults.length > 0 ? mockResults.map((res, i) => (
                  <div key={i} className="p-3 hover:bg-gray-50 cursor-pointer flex justify-between items-center group">
                    <span className="text-[13px] font-medium">{res.title}</span>
                    <span className="text-[10px] font-bold uppercase text-gray-400 group-hover:text-[#8A0000]">{res.type}</span>
                  </div>
                )) : (
                  <div className="p-4 text-[12px] text-gray-500 italic text-center">No matches found for "{searchQuery}"</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mb-10">
          <h3 className="text-[14px] font-bold mb-4 uppercase tracking-tight">Top resources for</h3>
          <ul className="text-[14px] space-y-3 font-medium">
            <li><button onClick={() => { goHome(); onClose?.(); }} className="side-link w-full text-left">prospective students</button></li>
            <li><button onClick={() => { goToPage('education'); onClose?.(); }} className="side-link w-full text-left">current students</button></li>
            <li><button onClick={() => { goToPage('about'); onClose?.(); }} className="side-link w-full text-left">faculty & staff</button></li>
            <li><button onClick={() => { goToPage('about'); onClose?.(); }} className="side-link w-full text-left">alumni</button></li>
            <li><button onClick={() => { goToPage('campus'); onClose?.(); }} className="side-link w-full text-left">communities & partners</button></li>
          </ul>
        </div>

        <div className="bg-[#FFF5F5] border border-[#FFDADA] p-5 mb-10">
          <h4 className="text-[14px] font-bold border-b border-[#FFDADA] pb-2 mb-3">Artemis Manifesto</h4>
          <button onClick={() => { goToPage('about'); onClose?.(); }} className="text-[13px] leading-snug text-left hover:underline">Read the 'The Artemis Project' - our mission to re-engineer human learning.</button>
        </div>
      </div>

      {/* SIDEBAR FOOTER */}
      <div className="pb-10 border-t border-gray-100 pt-8 px-8 lg:px-10">
        <p className="font-bold text-[13px] mb-1">University of Artemis</p>
        <p className="text-[12px] text-gray-600 mb-4 leading-tight">A global collegiate model for the collective future of humanity.</p>
        
        <div className="text-[12px] space-x-2 mb-2 font-medium">
          <button onClick={() => goToPage('visit-us')} className="footer-link">Visit</button>
          <button onClick={() => goToPage('campus')} className="footer-link">Map</button>
          <button onClick={() => goToPage('campus')} className="footer-link">Events</button>
          <button onClick={() => goToPage('jobs')} className="footer-link">Jobs</button>
          <button onClick={() => goToPage('contact-us')} className="footer-link">Contact</button>
        </div>
        <div className="text-[12px] space-x-2 mb-6 font-medium">
          <button onClick={() => goToPage('about')} className="footer-link">Privacy</button>
          <button onClick={() => goToPage('access-at-artemis')} className="footer-link">Accessibility</button>
        </div>
        
        <div className="flex space-x-4 grayscale opacity-60 text-sm font-bold">
          <span>𝕏</span>
          <span>f</span>
          <span>In</span>
          <span>IG</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar — only on homepage (when desktopOnly is not set) */}
      {!hideDesktopSidebar && (
        <aside className="w-[330px] hidden lg:flex flex-col border-r border-gray-100 sticky top-[50px] h-[calc(100vh-50px)] shrink-0 overflow-hidden bg-white">
          {sidebarContent}
        </aside>
      )}

      {/* Mobile Drawer — available on all pages */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-[110] lg:hidden backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-[330px] bg-white z-[120] flex flex-col lg:hidden shadow-2xl"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
