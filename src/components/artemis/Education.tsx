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
    linkTarget: 'graduate-coming-soon',
  },
  {
    title: 'Departments & Programs',
    description: 'Artemis has well over 100 departments and programs spanning the humanities, sciences, social sciences, and emerging interdisciplinary fields.',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=600',
    linkText: 'Browse Departments',
    linkTarget: 'programs',
  },
  {
    title: 'Global Education',
    description: 'People come from afar to study here, and our students learn and grow through international travel, study abroad, and cross-cultural research partnerships.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600',
    linkText: 'Explore Global Programs',
    linkTarget: 'collegium-alliance',
  },
  {
    title: 'Summer Session',
    description: 'Artemis provides educational opportunities year-round. Our summer offerings allow students to accelerate their studies or explore entirely new fields.',
    image: 'https://images.unsplash.com/photo-1606761568499-6d2451b08c66?auto=format&fit=crop&q=80&w=600',
    linkText: 'View Summer Offerings',
    linkTarget: 'undergraduate',
  },
  {
    title: 'Non-Degree Offerings',
    description: 'Explore the diverse programs available for non-matriculating students — from professional certificates to community learning initiatives.',
    image: 'https://images.unsplash.com/photo-1510511459019-54bc7603c4fc?auto=format&fit=crop&q=80&w=600',
    linkText: 'Discover Non-Degree Options',
    linkTarget: 'admissions',
  },
  {
    title: 'Online Learning',
    description: 'Step inside a virtual Artemis classroom and learn from some of our most renowned faculty members — accessible from anywhere in the world.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
    linkText: 'Start Learning Online',
    linkTarget: 'programs',
  },
];

const educationStats = [
  { value: '100+', label: 'Departments', detail: 'Spanning every major discipline' },
  { value: '20', label: 'Micro-Colleges', detail: 'Dynamic skill-based learning nodes' },
  { value: 'ECTS', label: 'Credits', detail: 'Globally transferable qualifications' },
  { value: '100%', label: 'Need Met', detail: 'Financial aid for admitted students' },
];

const curriculumLinks = [
  { label: 'Course catalog & registration', page: 'programs' },
  { label: 'Interdisciplinary degree programs', page: 'colleges' },
  { label: 'Skill-based certifications', page: 'undergraduate_curriculum' },
  { label: 'Academic advising & support', page: 'undergraduate' },
  { label: 'Honors & distinction pathways', page: 'undergraduate' },
  { label: 'Study abroad opportunities', page: 'collegium-alliance' },
];

const gridLinks = [
  { label: 'Browse course catalog', page: 'programs' },
  { label: 'Explore interdisciplinary degrees', page: 'colleges' },
  { label: 'Skill-based certifications', page: 'undergraduate_curriculum' },
  { label: 'Academic advising & support', page: 'undergraduate' },
  { label: 'Honors & distinction pathways', page: 'undergraduate' },
  { label: 'Study abroad opportunities', page: 'collegium-alliance' },
];

const sidebarLinks = [
  { label: 'Undergraduate programs', page: 'undergraduate' },
  { label: 'Graduate programs', page: 'graduate-coming-soon' },
  { label: 'Departments & programs', page: 'programs' },
  { label: 'Global education', page: 'collegium-alliance' },
  { label: 'Academic calendar', page: 'application-deadlines' },
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

/*
 * LAYOUT SYSTEM — matching ASU blueprint
 *
 * ASU uses a layered approach:
 *   1. Full-viewport-width backgrounds (bg-white, bg-gray-50, bg-[#8A0000])
 *   2. Centered content container inside each section (max-w-[1400px])
 *   3. The hero image is FULL-BLEED — no max-width at all
 *   4. Global learning image is also FULL-BLEED
 *   5. Two-column grids fill the full container width
 *
 * Key: Section backgrounds go edge-to-edge.
 *      Only TEXT content is constrained and centered.
 */

/* ─── Component ─── */
export default function Education({ goToPage }: EducationProps) {
  const approachAnim = useInView();
  const programsAnim = useInView();
  const globalAnim = useInView();
  const statsAnim = useInView();

  /* Active section tracker for "On This Page" nav */
  const [activeSection, setActiveSection] = useState('approach');
  useEffect(() => {
    const sectionIds = ['approach', 'programs', 'curriculum', 'global', 'by-the-numbers'];
    const handleScroll = () => {
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom > 160) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col bg-white w-full">

      <div className="mb-8 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Our Approach</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div className="mb-8 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Programs of Study</span>
            </div>

            <div className="mb-14">
              <h2 className="text-[38px] lg:text-[46px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
                Seven paths to<br />mastery
              </h2>
              <p className="text-[17px] text-gray-600 leading-[1.75] max-w-2xl">
                Whether you are beginning your academic journey or seeking to deepen your expertise,
                Artemis offers a program tailored to your ambitions. Each path is designed to be
                interdisciplinary, flexible, and globally relevant.
              </p>
            </div>

            <div className="mb-8 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Global Learning</span>
            </div>
          </div>

        {/* Full-bleed image — breaks OUT of the content container */}
        <div className="max-w-[1600px] mx-auto">
        <div className="relative w-full min-h-[420px] md:min-h-[500px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=2560"
            alt="Global Learning at Artemis"
            className="absolute inset-0 w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-20 h-full flex items-end min-h-[420px] md:min-h-[500px] pb-10 md:pb-14">
            <div className="bg-white max-w-md p-8 md:p-10 shadow-xl">
              <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">
                Global Initiative
              </div>
              <h3 className="text-[26px] font-bold text-[#141414] mb-3 leading-tight">
                The world is your campus
              </h3>
              <p className="text-[15px] text-gray-600 leading-[1.7] mb-6">
                People come from afar to study at Artemis, and our students learn and grow through
                international travel, research partnerships, and cross-cultural exchange programs
                spanning six continents.
              </p>
              <button
                onClick={() => goToPage('collegium-alliance')}
                className="text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#8A0000] text-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors"
              >
                Explore Global Programs &rarr;
              </button>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. STATS — 4 equal columns on gray
          Background: full-width gray-50
          Content: centered in max-w-[1400px]
          ═══════════════════════════════════════════ */}
      <section id="by-the-numbers" className="scroll-mt-[110px] w-full bg-gray-50">
        <div
          ref={statsAnim.ref}
          className={`max-w-[1400px] mx-auto px-8 lg:px-20 py-16 lg:py-24 transition-all duration-700 ${statsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-12 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              By the Numbers
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {educationStats.map((stat, i) => (
              <div key={i} className="relative">
                <div className="text-[44px] lg:text-[56px] font-black text-[#141414] leading-none mb-3 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-2">
                  {stat.label}
                </div>
                <div className="text-[14px] text-gray-500 leading-snug">{stat.detail}</div>
                {i < educationStats.length - 1 && (
                  <div className="hidden lg:block absolute -right-8 top-0 bottom-0 w-px bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          8. ACADEMIC CALENDAR CTA — full-width crimson band
          Background: full-width crimson
          Content: centered in max-w-[1400px]
          ═══════════════════════════════════════════ */}
      <section className="w-full bg-[#8A0000] py-16 px-8 lg:px-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-[28px] md:text-[36px] font-extrabold text-white leading-tight tracking-tight mb-2">
              Academic Calendars
            </h3>
            <p className="text-[17px] text-white/70 leading-[1.75] max-w-lg">
              View key dates for Artemis College and the graduate and professional schools.
              Plan your academic year with confidence.
            </p>
          </div>
          <button
            onClick={() => goToPage('application-deadlines')}
            className="shrink-0 bg-white text-[#8A0000] px-8 py-4 text-[13px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors shadow-lg"
          >
            Browse Calendars
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          9. FOOTER
          ═══════════════════════════════════════════ */}
      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
