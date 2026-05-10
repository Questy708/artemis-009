'use client';

import SubPageFooter from '@/components/artemis/SubPageFooter';

interface ResearchProps {
  goToPage: (page: string) => void;
}

export default function Research({ goToPage }: ResearchProps) {
  const centers = ["Synthetic Intelligence", "Bio-Regenerative Arts", "Cosmological Humanities", "Neo-Economics"];

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      {/* Sub-page Specific Sticky Header */}
      <div className="sticky top-[50px] z-40 h-[60px] bg-white border-b border-gray-100 flex items-center px-6 lg:px-16 shrink-0 overflow-x-auto hide-scrollbar shadow-sm">
        <h2 className="text-[14px] font-bold tracking-tight text-[#8A0000] mr-10 whitespace-nowrap">
          Research at Artemis
        </h2>
        <div className="flex space-x-6 shrink-0 text-[12px] font-bold uppercase tracking-widest text-gray-400">
           <a href="#centers" className="hover:text-black transition-colors">Centers of Inquiry</a>
           <a href="#initiatives" className="hover:text-black transition-colors">Global Initiatives</a>
           <a href="#publications" className="hover:text-black transition-colors">Publications</a>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto w-full px-6 lg:px-16 pt-16">
        {/* HERO */}
        <section className="mb-20">
          <h1 className="text-[52px] font-extrabold leading-[1.05] tracking-tighter text-gray-900 mb-10 uppercase">
            Advancing the <br />Boundaries of Human <br />Knowledge.
          </h1>
          <div className="w-full h-[450px] bg-gray-100 overflow-hidden mb-12">
            <img 
              src="https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover grayscale brightness-90" 
              alt="Research Lab" 
            />
          </div>
          <p className="text-2xl font-light text-gray-600 leading-relaxed max-w-3xl">
            At Artemis, research is not a siloed activity but a collective endeavor. We prioritize high-impact projects that address the core existential challenges of our time.
          </p>
        </section>

        {/* CENTERS OF INQUIRY */}
        <section id="centers" className="scroll-mt-24 mb-24">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-10 border-b border-gray-100 pb-2">Centers of Inquiry</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {centers.map((center, i) => (
              <div key={i} className="group border border-gray-100 p-8 hover:border-[#8A0000] transition-all cursor-pointer flex flex-col h-full bg-white shadow-sm hover:shadow-md">
                <div className="flex items-center mb-6">
                  <span className="text-[10px] font-bold text-[#8A0000] mr-4">0{i + 1}</span>
                  <h4 className="text-xl font-bold group-hover:text-[#8A0000] transition-colors leading-tight">
                    Center for {center}
                  </h4>
                </div>
                <p className="text-gray-500 group-hover:text-[#8A0000] text-sm leading-relaxed mb-6 transition-colors flex-1">
                  Focused on addressing pressing global issues through interdisciplinary approaches and cutting-edge paradigms.
                </p>
                <div className="text-[11px] font-bold uppercase tracking-widest text-black border-b border-black w-fit">Explore Center</div>
              </div>
            ))}
          </div>
        </section>

        {/* GLOBAL INITIATIVES */}
        <section id="initiatives" className="scroll-mt-24 mb-32">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-10 border-b border-gray-100 pb-2">Global Initiatives</h3>
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 h-64 bg-gray-100 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-bold mb-4">The Synthetic Humanity Project</h4>
                <p className="text-gray-600 leading-relaxed mb-6">Exploring the ethical and biological integration of AI into human cognition.</p>
                <button className="text-[11px] font-bold uppercase tracking-widest border border-gray-200 px-6 py-2 hover:bg-black hover:text-white transition-colors">Read Case Study</button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
