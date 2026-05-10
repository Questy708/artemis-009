'use client';

import SubPageFooter from '@/components/artemis/SubPageFooter';

interface CampusLifeProps {
  goToPage: (page: string) => void;
}

export default function CampusLife({ goToPage }: CampusLifeProps) {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <div className="sticky top-[50px] z-40 bg-white border-b border-gray-100 flex items-center px-6 lg:px-16 shrink-0 h-[60px] shadow-sm">
        <h2 className="text-[14px] font-bold tracking-tight text-[#8A0000] mr-10 whitespace-nowrap">
          Campus Life
        </h2>
        <div className="hidden md:flex space-x-6 text-[12px] font-bold uppercase tracking-widest text-gray-400 overflow-x-auto hide-scrollbar">
           <a href="#housing" className="hover:text-black transition-colors whitespace-nowrap">Housing</a>
           <a href="#societies" className="hover:text-black transition-colors whitespace-nowrap">Societies</a>
           <a href="#athletics" className="hover:text-black transition-colors whitespace-nowrap">Athletics</a>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto w-full px-6 lg:px-16 pt-16">
        <section className="mb-20">
          <h1 className="text-[52px] font-extrabold leading-[1.05] tracking-tighter text-gray-900 mb-10 uppercase">
            A Global Living Lab.<br />Community & Craft.
          </h1>
          <div className="w-full h-[400px] bg-gray-100 mb-12">
            <img src="https://images.unsplash.com/photo-1523050335102-c3250d857224?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Student Community" />
          </div>
          <p className="text-2xl font-light text-gray-600 leading-relaxed max-w-3xl">
            Artemis isn&apos;t just a place; it&apos;s a community spread across global hubs, connected digitally and united by a shared culture of inquiry and mutual respect.
          </p>
        </section>

        <section id="housing" className="scroll-mt-24 mb-24 pt-16 border-t border-gray-100">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-10 pb-2">Living at Artemis</h3>
          <div className="prose prose-lg text-gray-600 mb-10 max-w-3xl">
            <p>Every student is assigned to one of our <b>12 Living Commons</b>, themed around archetypes of learning and societal transformation. These are not just residences, but shared kitchens, meditation rooms, civic salons, and outdoor labs where student life is the living curriculum.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {[
              { name: "The Weavers Commons", type: "Social Innovation Archetype" },
              { name: "The Catalyst Commons", type: "Scientific Discovery Archetype" },
            ].map((item, idx) => (
              <div key={idx} className="h-80 bg-gray-100 overflow-hidden relative group cursor-pointer shadow-sm rounded-xl">
                <img src={idx === 0 ? "https://images.unsplash.com/photo-1523050335102-c3250d857224?auto=format&fit=crop&q=80&w=600" : "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600"} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={item.name} />
                <div className="absolute inset-x-0 bottom-0 bg-white/95 p-6 translate-y-full group-hover:translate-y-0 transition-transform">
                  <span className="text-[10px] font-bold text-[#8A0000] uppercase tracking-widest block mb-1">{item.type}</span>
                  <span className="text-lg font-bold text-gray-900">{item.name}</span>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-10 pb-2">Traditions & Rituals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Initiation Ritual</h4>
              <p className="text-[15px] text-gray-600 leading-relaxed">A 24-hour co-design immersion with peers during the first week. Every student plants a &lsquo;learning contract&rsquo; tree at their primary node, marking their commitment to the intellectual guild.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Final Year Passage</h4>
              <p className="text-[15px] text-gray-600 leading-relaxed">A culmination where students present a multimedia reflection of their 4-year journey, inviting their Commons family to offer final questions before they transition to the global network.</p>
            </div>
          </div>
        </section>
      </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
