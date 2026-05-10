'use client';

import React from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import { ArrowRight } from 'lucide-react';

interface Props {
  goToPage: (page: string, param?: string) => void;
  schoolName: string;
}

export default function SchoolDetail({ goToPage, schoolName }: Props) {
  // Mapping of school to its description and majors
  const schoolData: Record<string, { description: string; majors: string[] }> = {
    "School of Natural Sciences": {
      description: "Understanding the physical and biological foundations of the natural world.",
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
        "Planetary Science (B.S.)"
      ]
    },
    "School of Engineering & Technology": {
      description: "Designing, building, and optimizing systems across software, data, machines, and materials.",
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
        "Design (B.A.)"
      ]
    },
    "School of Arts & Humanities": {
      description: "Exploring meaning through culture, language, time, and expression.",
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
        "Theater and Performance Studies (B.F.A.)"
      ]
    },
    "School of Social Sciences": {
      description: "Tackling global challenges through Anthropology, Political Science, Economics, and Urban Studies.",
      majors: [
        "Anthropology (B.A.)",
        "Political Science (B.A.)",
        "Urban Studies (B.A.)",
        "Economics (B.A.)",
        "Global Governance & Systems (B.A.)",
        "Social Innovation & Design (B.A.)"
      ]
    },
    "School of Health & Medicine": {
      description: "Advancing human wellness, biological systems, and healthcare technologies with a focus on bioethics.",
      majors: [
        "Neuroscience (B.S.)",
        "Public Health (B.S.)",
        "Biomedical Engineering (B.S.)",
        "Nutrition Science (B.S.)",
        "Genetics (B.S.)",
        "Immunobiology (B.S.)",
        "Biomedical Computation (B.S.)",
        "Food Systems (B.S.)"
      ]
    },
    "School of Education & Human Development": {
      description: "Advancing learning science, educational ecosystems, and meta-learning strategies.",
      majors: [
        "Education (B.A.)",
        "Learning Design & Technology (B.A.)",
        "Cognitive Science (B.A.)",
        "Developmental Psychology (B.A.)",
        "Educational Leadership (B.A.)",
        "Childhood & Human Development (B.A.)"
      ]
    },
    "School of Business": {
      description: "Developing leadership in international commerce, finance, analytics, and entrepreneurial systems.",
      majors: [
        "International Business (B.S.)",
        "Finance (B.S.)",
        "Business Analytics (B.S.)",
        "Supply Chain & Logistics (B.S.)",
        "Consulting & Strategy (B.S.)",
        "Entrepreneurship (B.S.)"
      ]
    }
  };

  const data = schoolData[schoolName] || { description: "An Artemis College academic school.", majors: [] };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <div className="sticky top-[50px] z-40 bg-white border-b border-gray-100 flex items-center px-6 lg:px-16 shrink-0 h-[60px] shadow-sm">
        <h2 
          className="text-[14px] font-bold tracking-tight text-[#8A0000] mr-10 whitespace-nowrap cursor-pointer hover:opacity-80" 
          onClick={() => goToPage('colleges')}
        >
          Our Colleges
        </h2>
        <div className="hidden md:flex space-x-6 text-[12px] font-bold uppercase tracking-widest text-gray-400 overflow-x-auto hide-scrollbar">
           <span className="text-black whitespace-nowrap border-b-2 border-[#8A0000]">{schoolName}</span>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto w-full px-6 lg:px-16 pt-16 mb-32">
        <h1 className="text-[52px] font-extrabold leading-[1.05] tracking-tighter text-gray-900 mb-8 uppercase">
          {schoolName}
        </h1>
        
        <div className="max-w-3xl mb-16">
          <p className="text-2xl font-light text-gray-700 leading-relaxed mb-6">
            {data.description}
          </p>
        </div>

        <section className="mb-24 pt-16 border-t border-gray-100">
          <h2 className="text-[32px] font-extrabold text-[#141414] tracking-tight mb-8">Programs of Study</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {data.majors.map((major, idx) => (
               <div 
                  key={idx} 
                  onClick={() => goToPage('program_detail', major)}
                  className="p-6 border border-gray-100 rounded-xl hover:bg-gray-50 hover:border-[#8A0000] transition-colors cursor-pointer group"
               >
                 <span className="text-[17px] font-bold text-gray-900 group-hover:text-[#8A0000] transition-colors block mb-4">{major}</span>
                 <ArrowRight size={18} className="text-gray-400 group-hover:text-[#8A0000] transition-colors" />
               </div>
             ))}
             {data.majors.length === 0 && (
               <p className="text-gray-500">Programs for this school will be listed soon.</p>
             )}
          </div>
        </section>
      </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
