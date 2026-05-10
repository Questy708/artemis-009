'use client';

import { useState, useEffect, useRef } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';

interface EducationProps {
  goToPage: (page: string) => void;
}

/* ─── Data ─── */
const academicPrograms = [
  {
    title: 'Undergraduate Study',
    description: 'Artemis provides a liberal arts education that fosters intellectual curiosity, independent thinking, and leadership skills — grounded in the Homo Eruditus philosophy of lifelong learning.',
    image: 'https://images.unsplash.com/photo-1523050335102-c3250d857224?auto=format&fit=crop&q=80&w=600',
    linkText: 'Explore Undergraduate Programs',
    linkTarget: 'undergraduate',
  },
  {
    title: 'Graduate & Professional Study',
    description: 'Our advanced degree programs are close-knit communities with access to vast resources, designed for those who seek to push the boundaries of their discipline.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600',
    linkText: 'Explore Graduate Programs',
    linkTarget: 'education',
  },
  {
    title: 'Departments & Programs',
    description: 'Artemis has well over 100 departments and programs spanning the humanities, sciences, social sciences, and emerging interdisciplinary fields.',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=600',
    linkText: 'Browse Departments',
    linkTarget: 'education',
  },
  {
    title: 'Global Education',
    description: 'People come from afar to study here, and our students learn and grow through international travel, study abroad, and cross-cultural research partnerships.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600',
    linkText: 'Explore Global Programs',
    linkTarget: 'education',
  },
  {
    title: 'Summer Session',
    description: 'Artemis provides educational opportunities year-round. Our summer offerings allow students to accelerate their studies or explore entirely new fields.',
    image: 'https://images.unsplash.com/photo-1606761568499-6d2451b08c66?auto=format&fit=crop&q=80&w=600',
    linkText: 'View Summer Offerings',
    linkTarget: 'education',
  },
  {
    title: 'Non-Degree Offerings',
    description: 'Explore the diverse programs available for non-matriculating students — from professional certificates to community learning initiatives.',
    image: 'https://images.unsplash.com/photo-1510511459019-54bc7603c4fc?auto=format&fit=crop&q=80&w=600',
    linkText: 'Discover Non-Degree Options',
    linkTarget: 'education',
  },
  {
    title: 'Online Learning',
    description: 'Step inside a virtual Artemis classroom and learn from some of our most renowned faculty members — accessible from anywhere in the world.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
    linkText: 'Start Learning Online',
    linkTarget: 'education',
  },
];

const educationStats = [
  { value: '100+', label: 'Departments', detail: 'Spanning every major discipline' },
  { value: '20', label: 'Micro-Colleges', detail: 'Dynamic skill-based learning nodes' },
  { value: 'ECTS', label: 'Credits', detail: 'Globally transferable qualifications' },
  { value: '100%', label: 'Need Met', detail: 'Financial aid for admitted students' },
];

const curriculumLinks = [
  { label: 'Course catalog & registration', page: 'education' },
  { label: 'Interdisciplinary degree programs', page: 'education' },
  { label: 'Skill-based certifications', page: 'education' },
  { label: 'Academic advising & support', page: 'education' },
  { label: 'Honors & distinction pathways', page: 'education' },
  { label: 'Study abroad opportunities', page: 'education' },
];

/* ─── Hook: animate on scroll ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Component ─── */
export default function Education({ goToPage }: EducationProps) {
  const approachAnim = useInView();
  const programsAnim = useInView();
  const globalAnim = useInView();
  const statsAnim = useInView();

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      {/* ── Sticky Sub-header ── */}
      <div className="sticky top-[50px] z-40 h-[60px] bg-white border-b border-gray-100 flex items-center px-6 lg:px-16 shrink-0 overflow-x-auto hide-scrollbar shadow-sm">
        <h2 className="text-[14px] font-bold tracking-tight text-[#8A0000] mr-10 whitespace-nowrap">
          Education at Artemis
        </h2>
        <div className="flex space-x-6 shrink-0 text-[12px] font-bold uppercase tracking-widest text-gray-400">
          <a href="#programs" className="hover:text-[#8A0000] transition-colors whitespace-nowrap">
            Programs
          </a>
          <a href="#curriculum" className="hover:text-[#8A0000] transition-colors whitespace-nowrap">
            Curriculum
          </a>
          <a href="#global" className="hover:text-[#8A0000] transition-colors whitespace-nowrap">
            Global Learning
          </a>
        </div>
      </div>

      {/* ── 1. HERO ── */}
      <section className="relative w-full h-[55vh] min-h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1800"
          className="absolute inset-0 w-full h-full object-cover grayscale"
          alt="Education at Artemis"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1000px] mx-auto w-full px-6 lg:px-16 pb-16">
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Homo Eruditus
            </span>
          </div>
          <h1 className="text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6 uppercase">
            Education at<br />Artemis
          </h1>
          <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
            Transforming human potential through learning for life. We move beyond static degrees
            to dynamic, skill-based certifications and interdisciplinary exploration.
          </p>
        </div>
      </section>

      {/* ── 2. OUR APPROACH ── */}
      <section className="max-w-[1000px] mx-auto w-full px-6 lg:px-16 py-20">
        <div
          ref={approachAnim.ref}
          className={`transition-all duration-700 ${approachAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section divider */}
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">
              Our Approach
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Left — Text */}
            <div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Learning without<br />boundaries
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Education at Artemis is designed around the concept of &lsquo;Homo Eruditus&rsquo;&mdash;the lifelong
                learner. We encourage our students to explore the academic landscape, venturing into
                unfamiliar fields of knowledge and, perhaps, discovering new passions that will take
                them in a different direction altogether.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                Along the way, faculty members help guide them, and fellow students offer diverse
                perspectives that can shed new light on the path. We also encourage our students to
                travel literally, by going abroad for study, research, or work. By nurturing this
                spirit of inquiry, Artemis aims to prepare global citizens who are instilled with a
                lifelong love of learning.
              </p>
              <button
                onClick={() => goToPage('undergraduate')}
                className="flex items-center space-x-4 py-2 border-b-2 border-[#141414] text-[#141414] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-[#8A0000] hover:border-[#8A0000] transition-all group"
              >
                <span>Explore Our Model</span>
                <svg
                  className="group-hover:translate-x-2 transition-transform"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>

            {/* Right — Key visual / stat */}
            <div>
              <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden mb-6">
                <img
                  src="https://images.unsplash.com/photo-1523050335102-c3250d857224?auto=format&fit=crop&q=80&w=800"
                  alt="Students collaborating"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <div className="border-l-4 border-[#8A0000] pl-6 py-2">
                <p className="text-[24px] font-bold text-[#141414] leading-tight mb-2">
                  &ldquo;The mind is not a vessel to be filled, but a fire to be kindled.&rdquo;
                </p>
                <p className="text-[12px] font-bold uppercase tracking-widest text-[#8A0000]">
                  Artemis Founding Principle
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PROGRAMS OF STUDY ── */}
      <section id="programs" className="scroll-mt-24 py-20 bg-gray-50">
        <div
          ref={programsAnim.ref}
          className={`max-w-[1000px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${programsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section divider */}
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">
              Programs of Study
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="mb-12">
            <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
              Seven paths to<br />mastery
            </h2>
            <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl">
              Whether you are beginning your academic journey or seeking to deepen your expertise,
              Artemis offers a program tailored to your ambitions. Each path is designed to be
              interdisciplinary, flexible, and globally relevant.
            </p>
          </div>

          {/* Program cards grid — top row 3, bottom row 4 centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {academicPrograms.map((program, i) => (
              <div
                key={i}
                className="group bg-white border border-gray-200 hover:border-[#8A0000] transition-all cursor-pointer shadow-sm hover:shadow-lg overflow-hidden"
                onClick={() => goToPage(program.linkTarget)}
              >
                <div className="aspect-[3/2] bg-gray-100 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">
                    0{i + 1} &mdash; {program.title.toUpperCase().replace('&', '&')}
                  </div>
                  <h3 className="text-[20px] font-bold text-[#141414] mb-3 group-hover:text-[#8A0000] transition-colors leading-tight">
                    {program.title}
                  </h3>
                  <p className="text-[14px] text-gray-600 leading-relaxed mb-5">
                    {program.description}
                  </p>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#141414] border-b-2 border-[#8A0000] text-[#8A0000] pb-0.5 group-hover:text-black group-hover:border-black transition-all inline-flex items-center space-x-2">
                    <span>{program.linkText}</span>
                    <span>&rarr;</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CURRICULUM ── */}
      <section id="curriculum" className="scroll-mt-24 py-20">
        <div className="max-w-[1000px] mx-auto w-full px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <div className="mb-8 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                  Curriculum
                </span>
              </div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                Dynamic skill-based<br />certifications
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Artemis has reimagined the traditional curriculum. Rather than fixed degree tracks
                alone, we offer dynamic, skill-based certifications that adapt to the evolving needs
                of the world — and of each student.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                Our interdisciplinary degrees cross traditional boundaries, allowing students to
                combine fields in ways that reflect the complexity of real-world challenges. Every
                program integrates theory with practice, ensuring that graduates are not just
                knowledgeable, but capable.
              </p>
              <button
                onClick={() => goToPage('education')}
                className="flex items-center space-x-4 py-2 border-b-2 border-[#141414] text-[#141414] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-[#8A0000] hover:border-[#8A0000] transition-all group"
              >
                <span>View Course Catalog</span>
                <svg
                  className="group-hover:translate-x-2 transition-transform"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>

            {/* Right — Link rows */}
            <div className="space-y-0">
              {curriculumLinks.map((link, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(link.page)}
                  className="group flex justify-between items-center py-4 border-b border-gray-200 hover:border-[#8A0000] transition-colors w-full text-left"
                >
                  <span className="text-[14px] font-bold text-gray-700 group-hover:text-[#8A0000] transition-colors">
                    {link.label}
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. GLOBAL LEARNING ── */}
      <section id="global" className="scroll-mt-24 bg-gray-50 py-20">
        <div
          ref={globalAnim.ref}
          className={`max-w-[1000px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${globalAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section divider */}
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">
              Global Learning
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Full-width card-and-image parallax */}
          <div className="relative w-full min-h-[380px] md:min-h-[460px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1400"
              alt="Global Learning at Artemis"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative z-10 flex items-end h-full min-h-[380px] md:min-h-[460px] p-8 md:p-14">
              <div className="bg-white max-w-sm p-8 shadow-xl">
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">
                  Global Initiative
                </div>
                <h3 className="text-[24px] font-bold text-[#141414] mb-3 leading-tight">
                  The world is your campus
                </h3>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-5">
                  People come from afar to study at Artemis, and our students learn and grow through
                  international travel, research partnerships, and cross-cultural exchange programs
                  spanning six continents.
                </p>
                <button
                  onClick={() => goToPage('education')}
                  className="text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#8A0000] text-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors"
                >
                  Explore Global Programs &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. STATS ROW ── */}
      <section className="py-20">
        <div
          ref={statsAnim.ref}
          className={`max-w-[1000px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${statsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              By the Numbers
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {educationStats.map((stat, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gray-100"></div>
                <div className="text-[36px] font-black text-[#141414] leading-none mb-2 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">
                  {stat.label}
                </div>
                <div className="text-[12px] text-gray-500 leading-snug">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. ACADEMIC CALENDAR CALLOUT ── */}
      <section className="w-full">
        <div className="bg-[#8A0000] py-14 px-6 lg:px-16">
          <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-[28px] md:text-[32px] font-extrabold text-white leading-tight tracking-tight mb-2">
                Academic Calendars
              </h3>
              <p className="text-[16px] text-white/70 leading-relaxed max-w-lg">
                View key dates for Artemis College and the graduate and professional schools.
                Plan your academic year with confidence.
              </p>
            </div>
            <button
              onClick={() => goToPage('education')}
              className="shrink-0 bg-white text-[#8A0000] px-8 py-3.5 text-[13px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors shadow-lg"
            >
              Browse Calendars
            </button>
          </div>
        </div>
      </section>

      {/* ── 8. FOOTER ── */}
      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
