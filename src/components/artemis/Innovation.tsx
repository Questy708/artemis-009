'use client';

import SubPageFooter from '@/components/artemis/SubPageFooter';

interface InnovationProps {
  goToPage: (page: string) => void;
}

export default function Innovation({ goToPage }: InnovationProps) {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <div className="sticky top-[50px] z-40 bg-white border-b border-gray-100 flex items-center px-6 lg:px-16 shrink-0 h-[60px] shadow-sm">
        <h2 className="text-[14px] font-bold tracking-tight text-[#8A0000] mr-10 whitespace-nowrap">
          Innovation at Artemis
        </h2>
        <div className="hidden md:flex space-x-6 text-[12px] font-bold uppercase tracking-widest text-gray-400 overflow-x-auto hide-scrollbar">
           <a href="#incubators" className="hover:text-black transition-colors whitespace-nowrap">Incubators</a>
           <a href="#tech" className="hover:text-black transition-colors whitespace-nowrap">Tech Transfer</a>
           <a href="#ventures" className="hover:text-black transition-colors whitespace-nowrap">Ventures</a>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto w-full px-6 lg:px-16 pt-16">
        <section className="mb-20">
          <h1 className="text-[52px] font-extrabold leading-[1.05] tracking-tighter text-gray-900 mb-10 uppercase">
            Incubating the <br />Future of Humanity.
          </h1>
          <div className="w-full h-[400px] bg-gray-100 mb-12">
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Innovation Hub" />
          </div>
          <p className="text-2xl font-light text-gray-600 leading-relaxed max-w-3xl">
            Artemis Innovation is a catalyst for world-changing ideas. We provide the resources, mentorship, and network needed to turn theoretical breakthroughs into practical solutions.
          </p>
        </section>

        <section id="incubators" className="scroll-mt-24 mb-24 pt-16 border-t border-gray-100">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-10 pb-2">Venture Hubs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-10 bg-gray-50 border border-gray-100 hover:border-[#8A0000] transition-colors group cursor-pointer">
              <h4 className="font-bold text-2xl mb-4 group-hover:text-[#8A0000] transition-colors">Artemis Forge</h4>
              <p className="text-gray-600 leading-relaxed">A physical and digital space for rapid prototyping and hardware innovation. Equipped with state-of-the-art labs and expert technicians.</p>
            </div>
            <div className="p-10 bg-gray-50 border border-gray-100 hover:border-[#8A0000] transition-colors group cursor-pointer">
              <h4 className="font-bold text-2xl mb-4 group-hover:text-[#8A0000] transition-colors">The Nexus</h4>
              <p className="text-gray-600 leading-relaxed">Our digital ecosystem connecting developers, designers, and domain experts to build the next generation of software solutions.</p>
            </div>
          </div>
        </section>
      </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
