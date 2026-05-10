'use client';

import SubPageFooter from '@/components/artemis/SubPageFooter';
import { ArrowRight, ChevronRight, Search } from 'lucide-react';

interface AboutProps {
  goToPage: (page: string) => void;
}

export default function About({ goToPage }: AboutProps) {
  const sections = [
    { title: "The University", link: "the-university" },
    { title: "How we are run", link: "how-we-are-run" },
    { title: "Our people", link: "our-people" },
    { title: "Access at Artemis", link: "access-at-artemis" },
    { title: "Artemis in the world", link: "artemis-in-the-world" },
    { title: "Visit us", link: "visit-us" },
    { title: "Jobs", link: "jobs" },
    { title: "Contact us", link: "contact-us" }
  ];

  const teasers = [
    {
      title: "Our history",
      desc: "Artemis is a unique and historic institution. As a pioneer in decentralized education, it can lay claim to years of continuous innovation since its founding in 2024.",
      img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800",
      link: "history"
    },
    {
      title: "Institutional Nodes",
      desc: "List of Artemis Collegium academic hubs and specialized research nodes across the globe.",
      img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800",
      link: "nodes"
    },
    {
      title: "Facts and figures",
      desc: "There are more than 26,000 scholars at Artemis, including 12,470 undergraduates and 13,920 postgraduates linked through our network.",
      img: "https://images.unsplash.com/photo-1523240715630-34360e206004?auto=format&fit=crop&q=80&w=800",
      link: "facts"
    },
    {
      title: "Visiting the colleges",
      desc: "Information on opening times and admission protocols for our physical colleges and permanent residency halls.",
      img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
      link: "visiting"
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      {/* Sub-header Navigation */}
      <div className="sticky top-[50px] z-40 bg-white border-b border-gray-100 flex items-center px-6 lg:px-16 shrink-0 h-[60px] shadow-sm">
        <h2 className="text-[14px] font-bold tracking-tight text-[#8A0000] mr-10 whitespace-nowrap">
          About Artemis
        </h2>
        <div className="hidden md:flex space-x-6 text-[12px] font-bold uppercase tracking-widest text-gray-400 overflow-x-auto hide-scrollbar">
           {sections.slice(0, 5).map(s => (
             <a key={s.title} href={`#${s.link}`} className="hover:text-black transition-colors whitespace-nowrap">{s.title}</a>
           ))}
        </div>
      </div>

      {/* HERO SECTION - REFINED FOR OXFORD BLUEPRINT */}
      <div className="bg-white pt-16 pb-8">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-12">
            <div className="max-w-2xl">
              <h1 className="text-[48px] lg:text-[64px] font-extrabold leading-[1] tracking-tighter text-gray-900 uppercase">
                About the <br />Artemis Institution
              </h1>
            </div>
            <div className="lg:max-w-[320px] mb-2">
              <p className="text-[13px] leading-relaxed text-gray-600 font-medium">
                Artemis is a world-leading centre of learning, teaching and research and a pioneer in decentralized global education.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg aspect-[21/9] bg-gray-100 shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1523240715630-34360e206004?auto=format&fit=crop&q=80&w=1600" 
              className="w-full h-full object-cover grayscale brightness-95" 
              alt="Artemis Institutional" 
            />
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-16 py-20 relative z-10">
          {/* PAGES IN THIS SECTION - 3 COL LINK LIST */}
          <section className="mb-24">
            <h2 className="text-[32px] font-bold text-gray-900 mb-12 tracking-tight">Pages in this section</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4">
              {sections.map((item) => (
                <button 
                  key={item.title}
                  onClick={() => goToPage(item.link)}
                  className="group flex justify-between items-center py-4 border-b border-gray-100 hover:border-[#8A0000] transition-colors w-full text-left"
                >
                  <span className="text-[14px] font-bold text-gray-700 group-hover:text-black animated-underline animated-underline--off group-hover:animated-underline--on">
                    {item.title}
                  </span>
                  <div className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#f3f4f6] transition-all">
                    <ChevronRight size={14} className="text-[#8A0000]" />
                  </div>
                </button>
              ))}
            </div>
          </section>

        {/* TEASER CARDS - CLEAN ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {teasers.map((teaser) => (
            <div key={teaser.title} className="group cursor-pointer">
              <div className="aspect-[3/2] rounded-lg overflow-hidden mb-6 bg-gray-100 shadow-sm">
                <img 
                  src={teaser.img} 
                  alt={teaser.title}
                  className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#8A0000] transition-colors">{teaser.title}</h3>
              <p className="text-[14px] text-gray-600 leading-relaxed mb-6 line-clamp-3 font-normal">{teaser.desc}</p>
              <div className="text-[12px] font-bold uppercase tracking-widest text-[#141414] border-b border-black w-fit group-hover:text-[#8A0000] group-hover:border-[#8A0000] transition-all">
                Learn more
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
