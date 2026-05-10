'use client';

import React from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface Props {
  goToPage: (page: string) => void;
}

export default function TheUniversity({ goToPage }: Props) {
  const sections = [
    { title: "Our history", link: "history" },
    { title: "Facts and figures", link: "facts" },
    { title: "Artemis Glossary", link: "glossary" },
    { title: "Our estate", link: "estate" },
    { title: "Brand", link: "brand" }
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
          The University
        </h2>
      </div>

      {/* Hero Section */}
      <div className="bg-white pt-16 pb-12">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-[44px] lg:text-[56px] font-extrabold leading-[1.1] tracking-tight text-gray-900 mb-0 uppercase">
                The University
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-[14px] text-gray-600 leading-relaxed font-medium">
                Oxford is an independent and self-governing institution consisting of the University, its divisions, departments and faculties, and the colleges.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16 -mt-8 relative z-10 mb-16">
        <div className="aspect-[21/9] rounded-lg overflow-hidden shadow-sm bg-gray-100">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover grayscale brightness-90" 
            alt="The University of Oxford" 
          />
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
                <span className="text-[15px] font-bold text-gray-700 group-hover:text-black animated-underline animated-underline--off group-hover:animated-underline--on">
                  {item.title}
                </span>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-[#8A0000]" />
              </button>
            ))}
          </div>
        </section>

        {/* Content Section: Colleges and Halls */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 py-16 border-t border-gray-100">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">The colleges and halls</h2>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed text-[15px]">
              <p>The 36 colleges and three societies are a core element of the University, to which they are related via a federal system.</p>
              <p>Each college is independent and self-governing, having a charter approved by the Privy Council, under which it is governed by a Head of House, elected and appointed by the governing body directly. The governing body comprises a number of Fellows, most of whom also hold University posts.</p>
              <p>The <strong>three societies</strong> – Kellogg College, Reuben College and St Cross College – operate very much like the other colleges but are considered departments of the University rather than independent colleges because, unlike the others, they do not have a royal charter. One of the main differences is that the governing body recommends a president, who is then appointed by Council.</p>
              <p>There are also <strong>four permanent private halls</strong>, which were founded by different Christian denominations, and still retain their religious character today.</p>
              <p>Undergraduates are admitted to 32 of the colleges and permanent private halls. All colleges accept applications from mature students, while Harris Manchester College is solely for mature students.</p>
            </div>
            <div className="aspect-[16/9] rounded-lg overflow-hidden bg-gray-50 my-10">
               <img src="https://images.unsplash.com/photo-1523240715630-34360e206004?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale opacity-90" alt="Oxford Colleges" />
            </div>
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed text-[15px] space-y-6">
              <p>Campion Hall and Green Templeton, Kellogg, Linacre, Nuffield, Reuben, St Antony&apos;s, St Cross and Wolfson Colleges admit only postgraduate students. All Souls is unique among Oxford colleges because it has no student members; all are Fellows, except the Warden.</p>
              <p>University, Balliol, and Merton Colleges are the oldest and were established by the 13th century.</p>
              <p>Green Templeton, which came into existence in 2008 following the merger of Green and Templeton Colleges, is the University&apos;s newest college, and Reuben College, which was founded by the University in 2019, is the newest society.</p>
              <p>If you are interested in undergraduate study at Oxford, please consult our <span className="text-[#8A0000] font-bold cursor-pointer border-b border-[#8A0000]">information on colleges for prospective undergraduates</span>.</p>
            </div>
          </div>
        </section>

        {/* Content Section: Role of colleges, halls and the University */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 py-16 border-t border-gray-100">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Role of colleges, halls and the University</h2>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Colleges, societies and halls:</h3>
              <ul className="space-y-4 text-gray-600 text-[14px]">
                <li className="flex items-start"><span className="text-[#8A0000] mr-2">•</span> select and admit undergraduate students, and select postgraduate students after they are admitted by the University</li>
                <li className="flex items-start"><span className="text-[#8A0000] mr-2">•</span> provide accommodation, meals, common rooms, libraries, sports and social facilities, and pastoral care for their students</li>
                <li className="flex items-start"><span className="text-[#8A0000] mr-2">•</span> are responsible for students&apos; undergraduate tutorial teaching and welfare</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">The University:</h3>
              <ul className="space-y-4 text-gray-600 text-[14px]">
                <li className="flex items-start"><span className="text-[#8A0000] mr-2">•</span> determines the content of the courses within which college teaching takes place</li>
                <li className="flex items-start"><span className="text-[#8A0000] mr-2">•</span> organises lectures and seminars</li>
                <li className="flex items-start"><span className="text-[#8A0000] mr-2">•</span> provides a wide range of resources for teaching and learning in the form of libraries, laboratories, museums, computing facilities, etc</li>
                <li className="flex items-start"><span className="text-[#8A0000] mr-2">•</span> admits and supervises postgraduate students</li>
                <li className="flex items-start"><span className="text-[#8A0000] mr-2">•</span> examines theses</li>
                <li className="flex items-start"><span className="text-[#8A0000] mr-2">•</span> sets and marks examinations</li>
                <li className="flex items-start"><span className="text-[#8A0000] mr-2">•</span> awards degrees</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Content Section: Divisions, departments and GLAM */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 py-16 border-t border-gray-100">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Divisions, departments and GLAM</h2>
          </div>
          <div className="lg:col-span-8 flex flex-col space-y-10">
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed text-[15px]">
              <p>Oxford University is divided into four academic divisions. Within these divisions are numerous departments, faculties and schools. Oxford&apos;s museums, libraries and collections provide an outstanding resource for the University and work closely with divisions to deliver teaching.</p>
              <p>Oxford University Press, one of the largest and most successful university print presses in the world, is also a department of the University, while the Department for Continuing Education exists to enable Oxford to reach students beyond the full-time student body.</p>
              
              <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Academic Divisions</h3>
              <p>There are four academic divisions within Oxford University. All have a full-time divisional head and an elected divisional board:</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {[
                 { n: "The Humanities Division", d: "Brings together nine faculties plus the Rothermere American Institute, the Ruskin School of Art and the Voltaire Foundation." },
                 { n: "Mathematical, Physical and Life Sciences", d: "The nine academic departments span the full spectrum of mathematical, computational and life sciences." },
                 { n: "The Medical Sciences Division", d: "Internationally recognised as a centre of excellence for biomedical and clinical research." },
                 { n: "The Social Sciences Division", d: "Committed to tackling some of the major challenges facing humanity today." }
               ].map(div => (
                 <div key={div.n} className="p-8 bg-gray-50 rounded-lg flex flex-col justify-between group hover:bg-white hover:border-[#8A0000] border border-transparent transition-all shadow-sm">
                   <h4 className="font-bold text-gray-900 mb-4 text-[17px]">{div.n}</h4>
                   <p className="text-[13px] text-gray-500 mb-6 leading-relaxed">{div.d}</p>
                   <ArrowRight size={16} className="text-gray-400 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all" />
                 </div>
               ))}
            </div>

            <div className="mt-16 pt-16 border-t border-gray-100">
               <h3 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-tight">GLAM</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                  <div className="text-gray-600 text-[15px] leading-relaxed">
                    <p className="mb-6">Gardens, Libraries And Museums of Oxford University are collectively known by the acronym GLAM, and form one of the greatest concentrations of university collections in the world.</p>
                    <p>Comprising over 21 million objects, specimens and printed items, they constitute one of the largest and most important research repositories, enabling GLAM to work closely with academic departments to deliver teaching and provide students access to important material for their study, as well as drawing scholars from all over the world.</p>
                  </div>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                    <img src="https://images.unsplash.com/photo-1590012314607-cda9d9b6a2a1?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale brightness-90" alt="GLAM Collections" />
                  </div>
               </div>
            </div>

            <div className="mt-16 pt-16 border-t border-gray-100">
               <h3 className="text-2xl font-bold text-gray-900 mb-6">Oxford University Press</h3>
               <p className="text-gray-600 text-[15px] leading-relaxed max-w-3xl">Oxford University Press (OUP) is one of the largest university press publishers in the world. It has become familiar to millions through a diverse publishing programme that includes scholarly works in all academic disciplines, bibles, sheet music, school and college textbooks, children&apos;s books, materials for teaching English as a foreign language, dictionaries and academic journals.</p>
               <p className="text-gray-600 text-[15px] leading-relaxed mt-4 max-w-3xl">OUP is a department of the University, and shares the mission to further excellence in research, scholarship and education by publishing worldwide. It currently publishes thousands of new titles a year across the globe.</p>
            </div>

            <div className="mt-16 pt-16 border-t border-gray-100 pb-20">
               <h3 className="text-2xl font-bold text-gray-900 mb-6">Oxford Lifelong Learning</h3>
               <p className="text-gray-600 text-[15px] leading-relaxed max-w-3xl">Oxford Lifelong Learning is one of the largest providers of continuing adult education for lifelong learning in the UK.</p>
               <p className="text-gray-600 text-[15px] leading-relaxed mt-4 max-w-3xl">It enrols more than 15,000 students from all over the world on hundreds of part-time programmes each year, including undergraduate and postgraduate qualifications, from certificates and diplomas to masters&apos; and doctoral degrees, online courses, short courses, day schools, lectures and weekend events, continuing professional development courses, and summer programmes.</p>
            </div>
          </div>
        </section>
      </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
