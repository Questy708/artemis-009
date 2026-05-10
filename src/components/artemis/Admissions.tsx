'use client';

import SubPageFooter from '@/components/artemis/SubPageFooter';

interface AdmissionsProps {
  goToPage: (page: string) => void;
}

export default function Admissions({ goToPage }: AdmissionsProps) {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      {/* Sub-Header nav */}
      <div className="sticky top-[50px] z-40 bg-white border-b border-gray-100 flex items-center px-6 lg:px-16 shrink-0 h-[60px] shadow-sm">
        <h2 className="text-[14px] font-bold tracking-tight text-[#8A0000] mr-10 whitespace-nowrap">
          Admissions + Aid
        </h2>
        <div className="hidden md:flex space-x-6 text-[12px] font-bold uppercase tracking-widest text-gray-400 overflow-x-auto hide-scrollbar">
          <button onClick={() => { document.getElementById('paths')?.scrollIntoView({ behavior: 'smooth' }) }} className="hover:text-black transition-colors whitespace-nowrap">Undergraduate</button>
          <button onClick={() => { document.getElementById('paths')?.scrollIntoView({ behavior: 'smooth' }) }} className="hover:text-black transition-colors whitespace-nowrap">Graduate</button>
          <button onClick={() => { document.getElementById('paths')?.scrollIntoView({ behavior: 'smooth' }) }} className="hover:text-black transition-colors whitespace-nowrap">Financial Aid</button>
          <button onClick={() => { document.getElementById('info')?.scrollIntoView({ behavior: 'smooth' }) }} className="hover:text-black transition-colors whitespace-nowrap">More Info</button>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto w-full px-6 lg:px-16 pt-16">
        {/* HERO SECTION */}
        <section className="mb-20">
          <h1 className="text-[52px] font-extrabold leading-[1.05] tracking-tighter text-gray-900 mb-10">
            Applying to Artemis:<br />The first step on <br />your grand journey.
          </h1>
          <div className="w-full h-[400px] bg-gray-100 overflow-hidden mb-12">
            <img 
              src="https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover" 
              alt="Campus Admission" 
            />
          </div>
          <div className="max-w-2xl">
            <p className="text-2xl font-light text-gray-600 leading-relaxed">
              We seek the boldest minds and the kindest souls. Artemis is for those who look at the horizon and see a challenge they are ready to meet.
            </p>
          </div>
        </section>

        {/* 3-COLUMN PATHS */}
        <section id="paths" className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-gray-200 pt-16 mb-24">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-4">Undergraduate</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
              For high school students and transfers seeking their first degree in a paradigm-shifting environment.
            </p>
            <button onClick={() => goToPage('undergraduate')} className="text-[11px] font-bold uppercase tracking-widest border-b border-black w-fit pb-1 hover:opacity-60 transition-opacity">Learn More</button>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-4">Graduate</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
              Advanced research and professional study across multi-disciplinary hubs.
            </p>
            <button onClick={() => goToPage('research')} className="text-[11px] font-bold uppercase tracking-widest border-b border-black w-fit pb-1 hover:opacity-60 transition-opacity">Explore Hubs</button>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-4">Financial Aid</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
              Artemis is committed to meeting 100% of the demonstrated need for all admitted students.
            </p>
            <button onClick={() => goToPage('contact-us')} className="text-[11px] font-bold uppercase tracking-widest border-b border-black w-fit pb-1 hover:opacity-60 transition-opacity">Calculate Aid</button>
          </div>
        </section>

        {/* INTERACTIVE CALL TO ACTION */}
        <section className="bg-gray-50 p-12 mb-24 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to join the vanguard?</h2>
          <p className="max-w-md text-gray-600 mb-10">Applications for the Class of 2030 are now open. Start your digital portfolio today.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => goToPage('apply')} className="px-10 py-3 bg-[#8A0000] text-white font-bold uppercase text-[12px] tracking-widest hover:bg-red-800 transition-colors">Start Application</button>
            <button onClick={() => goToPage('contact-us')} className="px-10 py-3 border border-gray-300 font-bold uppercase text-[12px] tracking-widest hover:bg-white transition-colors">Request Info</button>
          </div>
        </section>

        {/* RELATED RESOURCES */}
        <section id="info" className="mb-32">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-8 border-b border-gray-100 pb-2">More Information</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
            <button onClick={() => goToPage('apply')} className="flex w-full justify-between items-center py-4 border-b border-gray-100 group">
              <span className="font-bold text-gray-700 group-hover:text-black">Tuition and Expenses</span>
              <span className="text-gray-300 group-hover:text-[#8A0000]">→</span>
            </button>
            <button onClick={() => goToPage('apply')} className="flex w-full justify-between items-center py-4 border-b border-gray-100 group">
              <span className="font-bold text-gray-700 group-hover:text-black">Veterans Benefits</span>
              <span className="text-gray-300 group-hover:text-[#8A0000]">→</span>
            </button>
            <button onClick={() => goToPage('apply')} className="flex w-full justify-between items-center py-4 border-b border-gray-100 group">
              <span className="font-bold text-gray-700 group-hover:text-black">International Students</span>
              <span className="text-gray-300 group-hover:text-[#8A0000]">→</span>
            </button>
            <button onClick={() => goToPage('apply')} className="flex w-full justify-between items-center py-4 border-b border-gray-100 group">
              <span className="font-bold text-gray-700 group-hover:text-black">Transfer Students</span>
              <span className="text-gray-300 group-hover:text-[#8A0000]">→</span>
            </button>
          </div>
        </section>
      </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
