'use client';

import React, { useState } from 'react';
import Header from '@/components/artemis/Header';
import Sidebar from '@/components/artemis/Sidebar';
import Home from '@/components/artemis/Home';
import Research from '@/components/artemis/Research';
import Education from '@/components/artemis/Education';
import Innovation from '@/components/artemis/Innovation';
import Admissions from '@/components/artemis/Admissions';
import CampusLife from '@/components/artemis/CampusLife';
import Colleges from '@/components/artemis/Colleges';
import About from '@/components/artemis/About';

import TheUniversity from '@/components/artemis/TheUniversity';
import HowWeAreRun from '@/components/artemis/HowWeAreRun';
import OurPeople from '@/components/artemis/OurPeople';
import OurHistory from '@/components/artemis/OurHistory';
import FundraisingCampaign from '@/components/artemis/FundraisingCampaign';
import GenericAboutSubpage from '@/components/artemis/GenericAboutSubpage';
import GenericUniversitySubpage from '@/components/artemis/GenericUniversitySubpage';

import UndergraduateStudy from '@/components/artemis/UndergraduateStudy';
import UndergraduateCurriculum from '@/components/artemis/UndergraduateCurriculum';

import ProgramsOfStudy from '@/components/artemis/ProgramsOfStudy';

import ProgramDetail from '@/components/artemis/ProgramDetail';
import Apply from '@/components/artemis/Apply';
import SchoolDetail from '@/components/artemis/SchoolDetail';

export default function ArtemisApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentProgram, setCurrentProgram] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const goToPage = (page: string, program?: string) => {
    setCurrentPage(page);
    if (program) {
      setCurrentProgram(program);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home goToPage={goToPage} />;
      case 'research':
        return <Research goToPage={goToPage} />;
      case 'education':
        return <Education goToPage={goToPage} />;
      case 'undergraduate':
        return <UndergraduateStudy goToPage={goToPage} />;
      case 'undergraduate_curriculum':
        return <UndergraduateCurriculum goToPage={goToPage} />;
      case 'programs':
        return <ProgramsOfStudy goToPage={goToPage} />;
      case 'program_detail':
        return <ProgramDetail goToPage={goToPage} programName={currentProgram} />;
      case 'school_detail':
        return <SchoolDetail goToPage={goToPage} schoolName={currentProgram} />;
      case 'apply':
        return <Apply goToPage={goToPage} />;
      case 'innovation':
        return <Innovation goToPage={goToPage} />;
      case 'admissions':
        return <Admissions goToPage={goToPage} />;
      case 'campus':
        return <CampusLife goToPage={goToPage} />;
      case 'colleges':
        return <Colleges goToPage={goToPage} />;
      case 'about':
        return <About goToPage={goToPage} />;
      case 'the-university':
        return <TheUniversity goToPage={goToPage} />;
      case 'catalog_page':
        return <GenericAboutSubpage goToPage={goToPage} id="catalog" title={currentProgram || 'Catalog Segment'} description="Artemis College Programs of Study component." />;
      case 'how-we-are-run':
        return <HowWeAreRun goToPage={goToPage} />;
      case 'fundraising':
        return <FundraisingCampaign goToPage={goToPage} />;
      case 'our-people':
        return <OurPeople goToPage={goToPage} />;
      case 'access-at-artemis':
        return <GenericAboutSubpage goToPage={goToPage} id="access" title="Access at Artemis" description="Ensuring equality of opportunity across the Artemis network." />;
      case 'artemis-in-the-world':
        return <GenericAboutSubpage goToPage={goToPage} id="world" title="Artemis in the world" description="Our global footprint and international research nodes." />;
      case 'visit-us':
        return <GenericAboutSubpage goToPage={goToPage} id="visit" title="Visit us" description="Guidelines for visiting our residency hubs and historic colleges." />;
      case 'jobs':
        return <GenericAboutSubpage goToPage={goToPage} id="jobs" title="Jobs" description="Building the future of knowledge with the Artemis team." />;
      case 'contact-us':
        return <GenericAboutSubpage goToPage={goToPage} id="contact" title="Contact us" description="Connect with the Artemis Collegium central administration." />;
      
      // The University Subsections
      case 'history':
        return <OurHistory goToPage={goToPage} />;
      case 'facts':
        return <GenericUniversitySubpage goToPage={goToPage} title="Facts and figures" parentTitle="The University" parentId="the-university" />;
      case 'glossary':
        return <GenericUniversitySubpage goToPage={goToPage} title="Artemis Glossary" parentTitle="The University" parentId="the-university" />;
      case 'estate':
        return <GenericUniversitySubpage goToPage={goToPage} title="Our estate" parentTitle="The University" parentId="the-university" />;
      case 'brand':
        return <GenericUniversitySubpage goToPage={goToPage} title="Brand" parentTitle="The University" parentId="the-university" />;
      
      default:
        return <Home goToPage={goToPage} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col font-sans text-[#141414]">
      {/* Fixed Header */}
      <Header 
        onMenuClick={() => setSidebarOpen(true)}
        goHome={() => { setCurrentPage('home'); setSidebarOpen(false); }} 
        goToPage={goToPage} 
      />
      
      <div className="flex flex-1 justify-center relative">
        <div className="flex w-full max-w-[1440px]">
          
          <Sidebar 
            isOpen={isSidebarOpen}
            onClose={() => setSidebarOpen(false)}
            goHome={() => { setCurrentPage('home'); setSidebarOpen(false); }}
            goToPage={goToPage}
          />
          
          <main className="flex-1 flex flex-col min-w-0">
            {renderPage()}
          </main>
        </div>
      </div>
    </div>
  );
}
