'use client';

import SubPageFooter from '@/components/artemis/SubPageFooter';

interface EducationProps {
  goToPage: (page: string) => void;
}

export default function Education({ goToPage }: EducationProps) {
  const academicPrograms = [
    {
      title: "Undergraduate Study",
      description: "Artemis provides a liberal arts education that fosters intellectual curiosity, independent thinking, and leadership skills.",
      image: "https://images.unsplash.com/photo-1523050335102-c3250d857224?auto=format&fit=crop&q=80&w=600",
      linkText: "Undergraduate Study",
      linkTarget: "undergraduate"
    },
    {
      title: "Graduate & Professional Study",
      description: "Our advanced degree programs are close-knit communities with access to vast resources.",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600",
      linkText: "Graduate & Professional Study",
      linkTarget: "education"
    },
    {
      title: "Departments & Programs",
      description: "Artemis has well over 100 departments and programs in a wide range of disciplines.",
      image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=600",
      linkText: "Departments & Programs",
      linkTarget: "education"
    },
    {
      title: "Global Education",
      description: "People come from afar to study here, and our students learn and grow through international travel.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600",
      linkText: "Global Education",
      linkTarget: "education"
    },
    {
      title: "Summer Session",
      description: "Artemis provides educational opportunities year-round. Learn about our summer offerings.",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b08c66?auto=format&fit=crop&q=80&w=600",
      linkText: "Summer Session",
      linkTarget: "education"
    },
    {
      title: "Non-Degree Offerings",
      description: "Explore the diverse programs available here for non-matriculating students.",
      image: "https://images.unsplash.com/photo-1510511459019-54bc7603c4fc?auto=format&fit=crop&q=80&w=600",
      linkText: "Non-Degree Offerings",
      linkTarget: "education"
    },
    {
      title: "Online Learning",
      description: "Step inside a virtual Artemis classroom and learn from some of our most renowned faculty members.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
      linkText: "Online Learning",
      linkTarget: "education"
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <div className="sticky top-[50px] z-40 bg-white border-b border-gray-100 flex items-center px-6 lg:px-16 shrink-0 h-[60px] shadow-sm">
        <h2 className="text-[14px] font-bold tracking-tight text-[#8A0000] mr-10 whitespace-nowrap">
          Education at Artemis
        </h2>
        <div className="hidden md:flex space-x-6 text-[12px] font-bold uppercase tracking-widest text-gray-400 overflow-x-auto hide-scrollbar">
           <a href="#programs" className="hover:text-black transition-colors whitespace-nowrap">Programs</a>
           <a href="#curriculum" className="hover:text-black transition-colors whitespace-nowrap">Curriculum</a>
           <a href="#global" className="hover:text-black transition-colors whitespace-nowrap">Global Learning</a>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-16 pt-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Main Content Area */}
          <div className="flex-1 max-w-[800px]">
            <section className="mb-24">
              <h1 className="text-[52px] font-extrabold leading-[1.05] tracking-tighter text-gray-900 mb-10">
                Transforming Human Potential.<br />Learning for Life.
              </h1>
              <div className="w-full h-[400px] bg-gray-100 mb-12">
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Student Life" />
              </div>
              
              <div className="max-w-3xl mb-16">
                <p className="text-2xl font-light text-gray-700 leading-relaxed mb-6">
                  Education at Artemis is designed around the concept of 'Homo Eruditus'—the lifelong learner. We move beyond static degrees to dynamic, skill-based certifications and interdisciplinary degrees.
                </p>
                <p className="text-[17px] text-gray-700 leading-relaxed mb-4">
                  We encourage our students to explore the academic landscape, venturing into unfamiliar fields of knowledge and, perhaps, discovering new passions that will take them in a different direction altogether. Along the way, faculty members help guide them, and fellow students offer diverse perspectives that can shed new light on the path. We also encourage our students to travel literally, by going abroad for study, research, or work.
                </p>
                <p className="text-[17px] text-gray-700 leading-relaxed">
                  By nurturing this spirit of inquiry, Artemis aims to prepare global citizens who are instilled with a life-long love of learning.
                </p>
              </div>

              <div id="programs" className="flex flex-col gap-12 mt-16 pt-12 border-t border-gray-200">
                {academicPrograms.map((program, idx) => (
                  <article key={idx} className="flex flex-col md:flex-row gap-6 md:gap-10 group">
                    <div className="relative w-full md:w-[295px] h-[208px] shrink-0 bg-gray-100 overflow-hidden shadow-sm cursor-pointer" onClick={() => goToPage(program.linkTarget)}>
                      <img 
                        src={program.image}
                        className="w-full h-full object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                        alt={program.title}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 ease-out"></div>
                    </div>
                    <div className="flex flex-col justify-center max-w-[500px]">
                      <h2 
                        className="text-[24px] font-bold text-[#141414] tracking-tight mb-3 group-hover:text-[#8A0000] cursor-pointer transition-colors"
                        onClick={() => goToPage(program.linkTarget)}
                      >
                        {program.title}
                      </h2>
                      <p className="text-[15px] leading-relaxed text-[#333333] mb-5">
                        {program.description}
                      </p>
                      <div>
                        <button 
                          className="text-[14px] font-bold text-[#141414] hover:text-[#8A0000] transition-all cursor-pointer"
                          onClick={() => goToPage(program.linkTarget)}
                        >
                          {program.linkText}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar Navigation */}
          <aside className="w-full lg:w-[280px] shrink-0 pt-2 lg:pt-[150px] mb-20 lg:mb-0">
            <h3 className="text-[13px] font-bold mb-4 text-[#141414] lg:hidden">Additional Navigation</h3>
            <ul className="flex flex-col">
              {academicPrograms.map((program, idx) => (
                <li key={idx} className="border-t border-gray-200 last:border-b">
                  <button 
                    onClick={() => goToPage(program.linkTarget)}
                    className="block w-full text-left py-5 text-[18px] text-[#141414] hover:text-[#8A0000] transition-colors leading-snug font-serif pr-4"
                  >
                    {program.title}
                  </button>
                </li>
              ))}
            </ul>

            {/* Sidebar Callout */}
            <div className="mt-16 bg-white border-t-[4px] border-[#141414] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <h4 className="text-[20px] font-bold text-[#141414] mb-3 leading-tight tracking-tight">Academic Calendars</h4>
              <p className="text-[15px] text-gray-600 mb-6 leading-relaxed">
                View key dates for Artemis College and the graduate and professional schools.
              </p>
              <button className="bg-transparent border border-black text-[#141414] px-6 py-3 text-[13px] font-bold hover:bg-[#141414] hover:text-white transition-colors w-full uppercase tracking-widest">
                Browse Calendars
              </button>
            </div>
          </aside>

        </div>
      </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
