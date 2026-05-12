'use client';

import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';

interface ProgramsOfStudyProps {
  goToPage: (page: string, program?: string) => void;
}

export default function ProgramsOfStudy({ goToPage }: ProgramsOfStudyProps) {
  const catalogNav = [
    "The Undergraduate Curriculum",
    "Academic Regulations",
    "Majors by Disciplines",
    "Majors in Artemis College",
    "Major Roadmaps",
    "Certificates in Artemis College",
    "Artemis College and Departmental Attributes",
    "Subjects of Instruction",
    "General Information"
  ];

  const schoolSections = [
    {
      id: 'school-natural-sciences',
      label: 'Natural Sciences',
      heading: 'School of Natural Sciences',
      majors: [
        "Biology (B.S.)",
        "Chemistry (B.S.)",
        "Physics (B.S.)",
        "Astronomy (B.S.)",
        "Applied Physics (B.S.)",
        "Environmental Science (B.S.)",
        "Geology (B.S.)",
        "Mathematics (B.S.)",
        "Agricultural Sciences (B.S.)",
        "Planetary Science (B.S.)",
      ]
    },
    {
      id: 'school-engineering-technology',
      label: 'Engineering & Technology',
      heading: 'School of Engineering & Technology',
      majors: [
        "Mechanical Engineering (B.S.)",
        "Civil Engineering (B.S.)",
        "Chemical Engineering (B.S.)",
        "Software Engineering (B.S.)",
        "Computer Science (B.S.)",
        "Data Science (B.S.)",
        "Robotics (B.S.)",
        "Mechatronics (B.S.)",
        "Nanotechnology (B.S.)",
        "Architecture (B.S.)",
        "Design (B.A.)",
      ]
    },
    {
      id: 'school-arts-humanities',
      label: 'Arts & Humanities',
      heading: 'School of Arts & Humanities',
      majors: [
        "Philosophy (B.A.)",
        "Comparative Literature (B.A.)",
        "Media & Communication Design (B.A.)",
        "History (B.A.)",
        "Art History (B.A.)",
        "Linguistics (B.A.)",
        "Theater & Performance (B.A.)",
        "Film & Media Studies (B.A.)",
        "Archaeology (B.A.)",
        "Art Practice (B.F.A.)",
        "Dance (B.F.A.)",
        "Classics (B.A.)",
        "Music (B.A.)",
        "Theater and Performance Studies (B.F.A.)",
      ]
    },
    {
      id: 'school-social-sciences',
      label: 'Social Sciences',
      heading: 'School of Social Sciences',
      majors: [
        "Anthropology (B.A.)",
        "Political Science (B.A.)",
        "Urban Studies (B.A.)",
        "Economics (B.A.)",
        "Global Governance & Systems (B.A.)",
        "Social Innovation & Design (B.A.)",
      ]
    },
    {
      id: 'school-health-medicine',
      label: 'Health & Medicine',
      heading: 'School of Health & Medicine',
      majors: [
        "Neuroscience (B.S.)",
        "Public Health (B.S.)",
        "Biomedical Engineering (B.S.)",
        "Nutrition Science (B.S.)",
        "Genetics (B.S.)",
        "Immunobiology (B.S.)",
        "Biomedical Computation (B.S.)",
        "Food Systems (B.S.)",
      ]
    },
    {
      id: 'school-education-human-development',
      label: 'Education & Human Development',
      heading: 'School of Education & Human Development',
      majors: [
        "Education (B.A.)",
        "Learning Design & Technology (B.A.)",
        "Cognitive Science (B.A.)",
        "Developmental Psychology (B.A.)",
        "Educational Leadership (B.A.)",
        "Childhood & Human Development (B.A.)",
      ]
    },
    {
      id: 'school-business',
      label: 'Business',
      heading: 'School of Business',
      majors: [
        "International Business (B.S.)",
        "Finance (B.S.)",
        "Business Analytics (B.S.)",
        "Supply Chain & Logistics (B.S.)",
        "Consulting & Strategy (B.S.)",
        "Entrepreneurship (B.S.)",
      ]
    },
  ];

  const sectionIds = schoolSections.map(s => s.id);
  const activeSection = useActiveSection(sectionIds);

  return (
    <div className="flex flex-col bg-white">
      {/* Catalog Header */}
      <div className="bg-[#8A0000] text-white pt-8 pb-4 px-5 sm:px-8 lg:px-20 flex justify-between items-end">
         <h1 className="text-3xl lg:text-4xl font-serif font-bold">Artemis College Programs of Study 2026–2027</h1>
      </div>
      
      <div className="bg-gray-100 border-b border-gray-200 px-5 sm:px-8 lg:px-20 py-3 flex flex-wrap text-sm text-gray-600 gap-4">
        <span className="hover:text-black cursor-pointer uppercase tracking-wider font-bold text-xs" onClick={() => goToPage('home')}>Artemis University Publications</span>
        <span>/</span>
        <span className="hover:text-black cursor-pointer uppercase tracking-wider font-bold text-xs" onClick={() => goToPage('education')}>Artemis College Programs of Study</span>
        <span>/</span>
        <span className="text-black uppercase tracking-wider font-bold text-xs">Majors in Artemis College</span>
      </div>

      {/* On This Page Navigation */}
      <OnThisPageNav
        sections={schoolSections.map(s => ({ id: s.id, label: s.label }))}
        activeSection={activeSection}
      />

      <div className="flex flex-col md:flex-row max-w-[1400px] w-full mx-auto pb-24 border-l border-r border-gray-200">
        {/* Catalog Navigation Sidebar */}
        <aside className="w-full md:w-[320px] shrink-0 border-r border-gray-200 bg-white">
          <ul className="flex flex-col py-8 px-6">
            {catalogNav.map((item, i) => (
              <li key={i}>
                <button 
                  className={`w-full text-left py-3 text-[15px] hover:text-[#8A0000] border-t border-gray-100 ${item === 'Majors in Artemis College' ? 'text-[#8A0000] font-bold border-l-2 border-l-[#8A0000] pl-3 -ml-[14px]' : 'text-[#141414]'}`}
                  onClick={(e) => {
                    if(item === 'Majors in Artemis College') goToPage('programs');
                    else if (item === 'The Undergraduate Curriculum') goToPage('undergraduate_curriculum');
                    else goToPage('catalog_page', item);
                  }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-5 sm:px-8 lg:px-20 py-16 lg:py-24 bg-white">
          <h1 className="text-[36px] font-serif font-bold text-[#141414] mb-10 border-b border-gray-200 pb-4">
            Majors in Artemis College
          </h1>

          {schoolSections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-[110px] mb-12"
            >
              <h2 className="text-[22px] font-serif font-bold text-[#8A0000] mb-5 pb-2 border-b border-gray-200">
                {section.heading}
              </h2>
              <div className="column-1 md:columns-2 gap-12">
                {section.majors.map((major, i) => (
                  <div key={i} className="mb-4">
                    <button
                      onClick={() => goToPage('program_detail', major)}
                      className="text-left text-[15px] font-serif text-[#141414] hover:text-[#8A0000] hover:underline leading-snug block pl-4 -indent-4"
                    >
                      {major}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
