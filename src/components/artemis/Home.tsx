'use client';

import { articles, heroContent } from '@/lib/artemis-data';
import ArtemisMap from '@/components/artemis/ArtemisMap';

interface HomeProps {
  goToPage: (page: string, program?: string) => void;
}

export default function Home({ goToPage }: HomeProps) {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <div className="py-12 px-6 lg:px-16">
        <div className="max-w-[1000px] mx-auto">
          
          {/* HERO SPOTLIGHT */}
          <section className="mb-20">
            <div className="w-full mb-10 overflow-hidden shadow-sm">
              <img 
                src={heroContent.image} 
                alt="Artemis Expedition" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="max-w-[850px]">
              <h1 className="text-[42px] font-bold mb-6 leading-[1.1] tracking-tight text-gray-900">
                A new kind of university — one degree, every horizon.
              </h1>
              <p className="text-[22px] leading-[1.5] mb-8 font-normal text-gray-800">
                Inspired by centuries of collegiate tradition and built for a connected age, the University of Artemis unites diverse colleges — each with distinct expertise and identity — as integral academic units within one accredited institution. The result: world-class education that is accessible, recognisable, and transferable.
              </p>
              <div className="flex items-center space-x-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                <span>Apr 25, 2026</span>
                <button onClick={() => goToPage('research')} className="text-black border-b border-black hover:opacity-80 transition-opacity">FULL STORY</button>
                <span>SHARE: X F</span>
              </div>
            </div>
          </section>

          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Research & Education that Matter</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* 2x2 GRID - RESTORED ORIGINAL LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-20 mb-32">
            {articles.slice(0, 4).map((article) => (
              <article key={article.id} className="cursor-pointer group" onClick={() => goToPage('research')}>
                <div className="w-full mb-6 overflow-hidden bg-gray-100 shadow-sm aspect-[16/10]">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
                <h3 className="text-[22px] font-bold mb-3 group-hover:text-[#8A0000] text-gray-900 leading-tight transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-[16px] leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </article>
            ))}
          </div>

          {/* GLOBAL LEARNING INTERFACE - ACN SECTION */}
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Global Learning Interface</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <section className="mb-40">
            <div className="max-w-5xl mb-16">
              <div className="mb-8 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Consortium Infrastructure</span>
              </div>
              
              <h2 className="text-[42px] md:text-[54px] font-bold text-[#141414] leading-[1] mb-12 tracking-tighter">
                A federated alliance of autonomous colleges co-creating <span className="text-[#8A0000]">shared academic scaffolds.</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                <p className="text-[20px] text-gray-700 leading-relaxed font-normal">
                  The Artemis Collegium Network (ACN) operates as a distributed guild system. Instead of isolated campuses, we maintain a network of co-branded nodes where faculty, students, and research are perfectly synchronized across physical and virtual domains.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-2">
                  <div className="relative">
                    <div className="text-[36px] font-black text-[#141414] leading-none mb-3 tabular-nums">20</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight">Founding<br/>Micro-Colleges</div>
                    <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gray-100"></div>
                  </div>
                  <div className="relative">
                    <div className="text-[36px] font-black text-[#141414] leading-none mb-3 tabular-nums">ECTS</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight">Unified<br/>Credit Mapping</div>
                    <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gray-100"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="mb-16">
               <ArtemisMap />
            </div>
            
            <div className="max-w-4xl space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="group">
                  <div className="text-[11px] font-bold text-[#8A0000] tracking-widest mb-4">01 — CONTRIBUTION</div>
                  <h4 className="text-[18px] font-bold text-[#141414] mb-3 uppercase tracking-wide">Node Contribution Model</h4>
                  <p className="text-[15px] text-gray-600 leading-relaxed">
                    Member colleges contribute faculty and student cohorts to the collective pool, ensuring localized curriculum grounded in global standards.
                  </p>
                </div>

                <div className="group">
                  <div className="text-[11px] font-bold text-[#8A0000] tracking-widest mb-4">02 — INFRASTRUCTURE</div>
                  <h4 className="text-[18px] font-bold text-[#141414] mb-3 uppercase tracking-wide">Infrastructure Shield</h4>
                  <p className="text-[15px] text-gray-600 leading-relaxed">
                    Artemis provides a unified <strong>Guild system</strong>, student funding, and the <strong>Artemis Commons</strong> for global research publishing.
                  </p>
                </div>
              </div>

              <div className="pt-8">
                <button 
                  onClick={() => goToPage('about')}
                  className="flex items-center space-x-6 py-2 border-b-2 border-[#141414] text-[#141414] text-[14px] font-bold uppercase tracking-[0.2em] hover:text-[#8A0000] hover:border-[#8A0000] transition-all group"
                >
                  <span>Build with the Alliance</span>
                  <svg className="group-hover:translate-x-2 transition-transform" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              </div>
            </div>
          </section>

          {/* THE RED SUBSCRIPTION BAR */}
          <div className="bg-[#8A0000] text-white p-10 flex flex-col md:flex-row justify-between items-center mb-16">
            <div className="mb-6 md:mb-0 max-w-lg text-center md:text-left">
              <h4 className="text-[20px] font-bold mb-2">Want more about the Artemis Project?</h4>
              <p className="text-[16px] font-medium leading-relaxed">
                Explore <button onClick={() => goToPage('research')} className="underline hover:opacity-80">more spotlights</button>, or subscribe to receive <button onClick={() => goToPage('innovation')} className="underline hover:opacity-80">daily doses of innovation</button> in your inbox.
              </p>
            </div>
            <button onClick={() => goToPage('contact-us')} className="border border-white px-8 py-2 text-[14px] font-bold hover:bg-white hover:text-[#8A0000] transition-colors uppercase tracking-widest whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
