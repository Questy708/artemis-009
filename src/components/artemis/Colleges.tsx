'use client';

import SubPageFooter from '@/components/artemis/SubPageFooter';

interface CollegesProps {
  goToPage: (page: string, program?: string) => void;
}

export default function Colleges({ goToPage }: CollegesProps) {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <div className="sticky top-[50px] z-40 bg-white border-b border-gray-100 flex items-center px-6 lg:px-16 shrink-0 h-[60px] shadow-sm">
        <h2 className="text-[14px] font-bold tracking-tight text-[#8A0000] mr-10 whitespace-nowrap">
          Our Colleges
        </h2>
      </div>

      <div className="max-w-[1000px] mx-auto w-full px-6 lg:px-16 pt-16">
        <section className="mb-20">
          <h1 className="text-[52px] font-extrabold leading-[1.05] tracking-tighter text-gray-900 mb-10 uppercase">
            Specialized <br />Excellence.
          </h1>
          <div className="w-full h-[350px] bg-gray-100 mb-12">
            <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale contrast-125" alt="College Architecture" />
          </div>
          <p className="text-2xl font-light text-gray-600 leading-relaxed max-w-3xl">
            Each college within Artemis represents a pillar of human achievement, dedicated to deep expertise and cross-collegiate collaboration. We break the barriers between science and humanities.
          </p>
        </section>

        <section className="mb-32 pt-16 border-t border-gray-100">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-10 pb-2">Academic Ecosystem</h3>
          <div className="space-y-4">
            {[
              { name: "School of Natural Sciences", focus: "Understanding the physical and biological foundations of the natural world. Includes Biology, Chemistry, Physics, and Astronomy." },
              { name: "School of Engineering & Technology", focus: "Designing, building, and optimizing systems across software, data, machines, and materials. Includes Robotics and Nanotechnology." },
              { name: "School of Arts & Humanities", focus: "Exploring meaning through culture, language, time, and expression. Includes Philosophy, Archaeology, and Media Design." },
              { name: "School of Social Sciences", focus: "Tackling global challenges through Anthropology, Political Science, Economics, and Urban Studies." },
              { name: "School of Health & Medicine", focus: "advancing human wellness, biological systems, and healthcare technologies with a focus on bioethics." },
              { name: "School of Education & Human Development", focus: "Advancing learning science, educational ecosystems, and meta-learning strategies." },
              { name: "School of Business", focus: "Developing leadership in international commerce, finance, analytics, and entrepreneurial systems." }
            ].map((c, i) => (
              <div key={i} onClick={() => goToPage('school_detail', c.name)} className="flex flex-col md:flex-row md:justify-between md:items-center py-10 border-b border-gray-100 hover:bg-gray-50 px-6 transition-all cursor-pointer group gap-4">
                <div className="flex-1">
                  <span className="text-2xl font-bold group-hover:text-[#8A0000] group-hover:translate-x-2 transition-all duration-300 block mb-2">{c.name}</span>
                  <p className="text-[13px] text-gray-500 max-w-xl">{c.focus}</p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300 group-hover:text-[#8A0000] transition-colors shrink-0">Explore College ↗</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
