'use client';

import React from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import { ArrowRight, ShieldCheck, FileText, Gift, Compass, RotateCcw, Users, Leaf, Newspaper, ChevronRight } from 'lucide-react';

interface Props {
  goToPage: (page: string) => void;
}

export default function HowWeAreRun({ goToPage }: Props) {
  const sections = [
    { title: "Governance & finance", link: "governance-finance" },
    { title: "Policies and statements", link: "policies" },
    { title: "Fundraising", link: "fundraising" },
    { title: "Strategic plan", link: "strategic-plan" },
    { title: "Change and continuous improvement", link: "improvement" },
    { title: "Equality and diversity", link: "equality" },
    { title: "Sustainability", link: "sustainability" },
    { title: "The Gazette", link: "gazette" },
  ];

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      {/* Breadcrumb Header */}
      <div className="sticky top-[50px] z-40 bg-white border-b border-gray-100 flex items-center px-6 lg:px-16 shrink-0 h-[60px] shadow-sm">
        <button onClick={() => goToPage('about')} className="text-[12px] font-bold uppercase tracking-widest text-[#8A0000] hover:text-black mr-4">
          About
        </button>
        <div className="text-gray-300 mr-4">/</div>
        <h2 className="text-[14px] font-bold tracking-tight text-black whitespace-nowrap">
          How we are run
        </h2>
      </div>

      {/* Hero Section */}
      <div className="bg-white pt-16 pb-8">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-12">
            <div className="max-w-2xl">
              <h1 className="text-[48px] lg:text-[64px] font-extrabold leading-[1] tracking-tighter text-gray-900 uppercase">
                How we <br />are run
              </h1>
            </div>
            <div className="lg:max-w-[320px] mb-2">
              <p className="text-[13px] leading-relaxed text-gray-600 font-medium">
                Oxford is an independent and self-governing institution consisting of the University, its divisions, departments and faculties, and the colleges.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-16">
        {/* Pages in this section */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 border-b border-gray-100 pb-4">Pages in this section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-2">
            {sections.map((item) => (
              <button 
                key={item.title}
                onClick={() => goToPage(item.link)}
                className="group flex justify-between items-center py-4 border-b border-gray-100 hover:border-[#8A0000] transition-colors w-full text-left"
              >
                <span className="text-[14px] font-bold text-gray-700 group-hover:text-black animated-underline animated-underline--off group-hover:animated-underline--on">
                  {item.title}
                </span>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </section>

        {/* Content Section: Governance Model */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 py-16 border-t border-gray-100">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">The Core Leadership</h2>
          </div>
          <div className="lg:col-span-8 flex flex-col space-y-8">
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed text-[15px]">
              <p>Artemis is governed as a dynamic commons, where power is distributed across guilds, civic bodies, and learning assemblies. Our leadership structure is designed for agility and epistemic accountability.</p>
              
              <div className="space-y-6 mt-8">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">1. Chancellor / President</h4>
                  <p>The strategic head of the university, leading planetary partnerships and global funding alliances. Appointed by a combined vote of Deans, Guild Chairs, and the Civic Assembly.</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">2. Provost</h4>
                  <p>Oversees academic integrity and curricular coherence across the guild network. Chairs the Capstone & Curriculum Council.</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">3. Deans of Schools</h4>
                  <p>Leaders for each of our seven academic schools, managing faculty and school-level governance forums.</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">4. Guild Chairs</h4>
                  <p>Elected by interdisciplinary committees within each Guild to coordinate seasonal research challenges and field partnerships.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section: Academic Divisions */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 py-16 border-t border-gray-100">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">The Seven Schools</h2>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "School of Natural Sciences",
                "School of Engineering & Technology",
                "School of Arts & Humanities",
                "School of Social Sciences",
                "School of Health & Medicine",
                "School of Education & Human Development",
                "School of Business"
              ].map(school => (
                <div key={school} className="p-8 bg-gray-50 rounded-lg border border-transparent hover:border-[#8A0000] transition-all group">
                  <h4 className="font-bold text-gray-900 mb-2 text-[17px]">{school}</h4>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>

            <div className="mt-16 pt-16 border-t border-gray-100">
               <h3 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-tight">Research & Collections</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                  <div className="text-gray-600 text-[15px] leading-relaxed">
                    <p className="mb-6">The gardens, libraries, and museums of Artemis form one of the greatest concentrations of university collections in the world, managed collectively as part of our commitment to the global knowledge commons.</p>
                    <p>Enabling nodes to work closely with academic schools, these collections provide students and researchers with access to critical resources for their study, drawing scholars from around the globe to our physical and digital halls.</p>
                  </div>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                    <img src="https://images.unsplash.com/photo-1590012314607-cda9d9b6a2a1?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale brightness-90" alt="Artemis Collections" />
                  </div>
               </div>
            </div>

            <div className="mt-16 pt-16 border-t border-gray-100">
               <h3 className="text-2xl font-bold text-gray-900 mb-6">Artemis University Press</h3>
               <p className="text-gray-600 text-[15px] leading-relaxed max-w-3xl">Artemis University Press is a global leader in publishing, serving the university&apos;s mission to further excellence in research, scholarship, and education by publishing worldwide in both digital and physical formats.</p>
            </div>
          </div>
        </section>

        {/* Teaser Grid - Matches Blueprint */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-32 border-t border-gray-100 pt-20">
            {[
                { title: "Governance and finance", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600", desc: "How the internal systems of the university maintain operational excellence." },
                { title: "University Officers", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600", desc: "The roles and responsibilities of senior University personnel." }
            ].map((t, idx) => (
                <div key={idx} className="group cursor-pointer">
                    <div className="aspect-[3/2] overflow-hidden rounded-lg mb-6 bg-gray-100 shadow-sm">
                        <img src={t.img} className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt={t.title} />
                    </div>
                    <h4 className="text-[20px] font-bold text-gray-900 mb-3 group-hover:text-[#8A0000] transition-colors">{t.title}</h4>
                    <p className="text-[14px] text-gray-600 leading-relaxed mb-6">{t.desc}</p>
                    <div className="text-[12px] font-bold uppercase tracking-widest text-[#141414] border-b border-black w-fit group-hover:text-[#8A0000] group-hover:border-[#8A0000] transition-all">
                      Learn more
                    </div>
                </div>
            ))}
        </div>
      </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
