'use client';

import SubPageFooter from '@/components/artemis/SubPageFooter';

interface UndergraduateStudyProps {
  goToPage: (page: string) => void;
}

export default function UndergraduateStudy({ goToPage }: UndergraduateStudyProps) {
  const sidebarLinks = [
    { title: "Undergraduate Study", id: "undergraduate-study" },
    { title: "Graduate & Professional Study", id: "graduate" },
    { title: "Departments & Programs", id: "departments" },
    { title: "Global Education", id: "global" },
    { title: "Summer Session", id: "summer" },
    { title: "Non-Degree Offerings", id: "non-degree" },
    { title: "Online Learning", id: "online" }
  ];

  return (
    <div className="flex flex-col bg-white">
      <div className="sticky top-[50px] z-40 bg-white border-b border-gray-200 w-full">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
          <div className="flex items-center h-[52px] gap-8 overflow-x-auto hide-scrollbar">
            <h2 className="text-[14px] font-bold tracking-tight text-[#8A0000] mr-10 whitespace-nowrap cursor-pointer hover:opacity-80" onClick={() => goToPage('education')}>
            Education at Artemis
            </h2>
            <div className="hidden md:flex space-x-6 text-[12px] font-bold uppercase tracking-widest text-gray-400 overflow-x-auto hide-scrollbar">
            <span className="text-black whitespace-nowrap border-b-2 border-[#8A0000]">Undergraduate Study</span>
          </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 pt-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Main Content Area */}
          <div className="flex-1">
             <section className="mb-24">
              <h1 className="text-[52px] font-extrabold leading-[1.05] tracking-tighter text-gray-900 mb-10 uppercase">
                Artemis Undergraduate Study
              </h1>
              
              <div className="max-w-3xl mb-16">
                <p className="text-2xl font-light text-gray-700 leading-relaxed mb-6">
                  At Artemis, we view college as a time for students to explore, exercise curiosity, and discover new interests and abilities.
                </p>
                <p className="text-[17px] text-gray-700 leading-relaxed mb-4">
                  We provide students with an immersive, collaborative, and inspiring environment where they can develop a broadly informed, highly disciplined intellect that will help them be successful in whatever work they finally choose.
                </p>
                <p className="text-[17px] text-gray-700 leading-relaxed">
                  Our students graduate with the values and knowledge they need to pursue meaningful work, find passion in life-long learning, and lead successful and purposeful lives.
                </p>
              </div>

              <div className="flex flex-col mt-16 pt-6 border-t border-gray-200">
                 {/* Artemis College */}
                 <article className="my-10">
                   <h2 className="text-[28px] font-bold text-[#141414] tracking-tight mb-3">Artemis College</h2>
                   <p className="text-[16px] leading-relaxed text-[#333333] mb-5 max-w-2xl">
                     All undergraduates attend Artemis College, an intimate learning environment offering instruction in the liberal arts and sciences.
                   </p>
                   <div className="w-full h-[300px] md:h-[400px] bg-gray-100 mb-6 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1523050335102-c3250d857224?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Artemis College" />
                   </div>
                   <button onClick={() => goToPage('colleges')} className="text-[14px] font-bold text-[#141414] hover:text-[#8A0000] transition-colors uppercase tracking-widest">
                     Artemis College website
                   </button>
                 </article>

                 {/* Programs of Study */}
                 <article className="my-10">
                   <h2 className="text-[28px] font-bold text-[#141414] tracking-tight mb-3">Programs of Study</h2>
                   <p className="text-[16px] leading-relaxed text-[#333333] mb-5 max-w-2xl">
                     Browse available majors, academic requirements, and other key info about our undergraduate curriculum.
                   </p>
                   <button onClick={() => goToPage('programs')} className="text-[14px] font-bold text-[#141414] hover:text-[#8A0000] transition-colors uppercase tracking-widest">
                     Programs of Study
                   </button>
                 </article>

                 {/* The 4-Year Curriculum Model */}
                  <article className="my-10 pt-16 border-t border-gray-100">
                    <h2 className="text-[32px] font-extrabold text-[#141414] tracking-tight mb-8 uppercase">The 4-Year Journey</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                       {[
                         { year: "Year 1", title: "Inception & Core", desc: "Foundational Core + Interdisciplinary Exposure. Focus on learning to learn, think, and act." },
                         { year: "Year 2", title: "Concentration & Orientation", desc: "Concentration Courses + Guild Orientation. Integration with real-world problems begins." },
                         { year: "Year 3", title: "Advanced Work & Deployment", desc: "Advanced Coursework + Studio Work + Global Deployment. Extensive field-based inquiry." },
                         { year: "Year 4", title: "Capstone & Contribution", desc: "Capstone + Embedded Inquiry/Internship + Public Contribution. Delivering open IP and research." }
                       ].map((item, idx) => (
                         <div key={idx} className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#8A0000] transition-colors group text-left">
                            <div className="text-[12px] font-bold text-[#8A0000] uppercase mb-1">{item.year}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#8A0000] transition-colors">{item.title}</h3>
                            <p className="text-[14px] text-gray-600 leading-relaxed">{item.desc}</p>
                         </div>
                       ))}
                    </div>
                  </article>

                  {/* Core Competencies */}
                  <article className="my-16 pt-16 border-t border-gray-100">
                    <h2 className="text-[32px] font-extrabold text-[#141414] tracking-tight mb-8 uppercase">Core Meta-Competencies</h2>
                    <p className="text-[16px] text-gray-600 mb-8 max-w-2xl">Artemis centers its curriculum on meta-learning: the skill of learning how to learn, sense, decide, and act in complex environments.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                       {[
                         "Systems Thinking", "Ethical Reasoning", "Commons Literacy",
                         "Empirical Inquiry", "Communicative Precision", "Reflective Practice"
                       ].map((comp, idx) => (
                         <div key={idx} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-[#8A0000] flex items-center justify-center text-white font-bold text-xs">{idx + 1}</div>
                            <span className="text-[15px] font-bold text-gray-800">{comp}</span>
                         </div>
                       ))}
                    </div>
                  </article>

                 {/* Undergraduate Research */}
                 <article className="my-10">
                   <h2 className="text-[28px] font-bold text-[#141414] tracking-tight mb-3">Undergraduate Research</h2>
                   <p className="text-[16px] leading-relaxed text-[#333333] mb-5 max-w-2xl">
                     With access to Artemis&apos;s extensive collections and resources, our undergraduates have discovered new species, patented products, and co-authored original research.
                   </p>
                   <button onClick={() => goToPage('research')} className="text-[14px] font-bold text-[#141414] hover:text-[#8A0000] transition-colors uppercase tracking-widest">
                     Undergraduate Research
                   </button>
                 </article>

                 {/* International Experiences */}
                 <article className="my-10">
                   <h2 className="text-[28px] font-bold text-[#141414] tracking-tight mb-3">International Experiences</h2>
                   <p className="text-[16px] leading-relaxed text-[#333333] mb-5 max-w-2xl">
                     There are a variety of global learning opportunities available, from studying abroad to international internships to directed research.
                   </p>
                   <button className="text-[14px] font-bold text-[#141414] hover:text-[#8A0000] transition-colors uppercase tracking-widest">
                     International Experiences
                   </button>
                 </article>
              </div>
             </section>
          </div>

          {/* Right Sidebar Navigation */}
          <aside className="w-full lg:w-[280px] shrink-0 pt-2 lg:pt-[150px] mb-20 lg:mb-0">
            <h3 className="text-[13px] font-bold mb-4 text-[#141414] lg:hidden">Additional Navigation</h3>
            <ul className="flex flex-col">
              {sidebarLinks.map((link, idx) => (
                <li key={idx} className="border-t border-gray-200 last:border-b">
                  <button 
                    onClick={() => {
                        if (link.id === 'undergraduate-study') {
                            // Already here
                        } else {
                            // For simplicity, we just route back to Education for other links right now
                            goToPage('education');
                        }
                    }} 
                    className={`block w-full text-left py-5 text-[18px] transition-colors leading-snug font-serif pr-4 ${link.title === 'Undergraduate Study' ? 'text-[#8A0000] font-bold border-l-[3px] border-[#8A0000] pl-4 -ml-4' : 'text-[#141414] hover:text-[#8A0000]'}`}
                  >
                    {link.title}
                  </button>
                </li>
              ))}
            </ul>

            {/* Sidebar Callout */}
            <div className="mt-16 bg-gray-50 border-t-[4px] border-gray-200 p-8 shadow-sm">
              <h4 className="text-[20px] font-bold text-[#141414] mb-3 leading-tight tracking-tight border-b border-gray-200 pb-3">Faculty of Arts and Sciences (FAS)</h4>
              <p className="text-[15px] text-gray-600 mb-6 leading-relaxed">
                The Faculty of Arts and Sciences is composed of the departments and academic programs that provide instruction in Artemis College and the Graduate School of Arts and Sciences.
              </p>
              <button className="bg-transparent border border-gray-300 text-[#141414] px-6 py-3 text-[14px] font-bold hover:bg-gray-200 transition-colors w-full text-center">
                Learn more
              </button>
            </div>
          </aside>

        </div>
      </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
