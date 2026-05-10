'use client';

import { useState, useEffect, useRef } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';

interface AdmissionsProps {
  goToPage: (page: string) => void;
}

/* ─── Data ─── */
const pathCards = [
  {
    title: 'Undergraduate',
    desc: 'For high school students and transfers seeking their first degree in a paradigm-shifting environment — where every discipline is a gateway, not a boundary.',
    image: 'https://images.unsplash.com/photo-1523050335102-c3250d857224?auto=format&fit=crop&q=80&w=800',
    tag: '01 — UNDERGRADUATE',
    cta: 'Learn More',
    page: 'undergraduate',
  },
  {
    title: 'Graduate',
    desc: 'Advanced research and professional study across multi-disciplinary hubs — for scholars ready to push past the edge of known knowledge.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
    tag: '02 — GRADUATE',
    cta: 'Explore Hubs',
    page: 'research',
  },
  {
    title: 'Financial Aid',
    desc: 'Artemis is committed to meeting 100% of demonstrated need for all admitted students — because talent is universal, but opportunity should be too.',
    image: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&q=80&w=800',
    tag: '03 — FINANCIAL AID',
    cta: 'Calculate Aid',
    page: 'contact-us',
  },
];

const admissionsStats = [
  { value: '6%', label: 'Acceptance rate', detail: 'One of the most selective universities in the world' },
  { value: '100%', label: 'Need met', detail: 'Demonstrated financial need fully covered' },
  { value: '140+', label: 'Countries represented', detail: 'A truly global student body' },
  { value: '20', label: 'Micro-College options', detail: 'Interdisciplinary academic communities' },
];

const infoLinks = [
  { label: 'Tuition and Expenses', page: 'apply' },
  { label: 'Veterans Benefits', page: 'apply' },
  { label: 'International Students', page: 'apply' },
  { label: 'Transfer Students', page: 'apply' },
  { label: 'Application Deadlines', page: 'apply' },
  { label: 'Visit Campus', page: 'campus' },
];

/* ─── Hook: animate on scroll ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Component ─── */
export default function Admissions({ goToPage }: AdmissionsProps) {
  const pathsAnim = useInView();
  const statsAnim = useInView();
  const aidAnim = useInView();
  const applyAnim = useInView();
  const infoAnim = useInView();

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      {/* ── Sticky Sub-header ── */}
      <div className="sticky top-[50px] z-40 h-[60px] bg-white border-b border-gray-100 flex items-center px-6 lg:px-16 shrink-0 overflow-x-auto hide-scrollbar shadow-sm">
        <h2 className="text-[14px] font-bold tracking-tight text-[#8A0000] mr-10 whitespace-nowrap">
          Admissions + Aid
        </h2>
        <div className="flex space-x-6 shrink-0 text-[12px] font-bold uppercase tracking-widest text-gray-400">
          <a href="#paths" className="hover:text-[#8A0000] transition-colors whitespace-nowrap">Paths</a>
          <a href="#aid" className="hover:text-[#8A0000] transition-colors whitespace-nowrap">Aid</a>
          <a href="#apply" className="hover:text-[#8A0000] transition-colors whitespace-nowrap">Apply</a>
          <a href="#info" className="hover:text-[#8A0000] transition-colors whitespace-nowrap">Info</a>
        </div>
      </div>

      {/* ── 1. HERO ── */}
      <section className="relative w-full h-[55vh] min-h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523050335102-c3250d857224?auto=format&fit=crop&q=80&w=1800"
          className="absolute inset-0 w-full h-full object-cover grayscale"
          alt="Applying to Artemis"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1000px] mx-auto w-full px-6 lg:px-16 pb-16">
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Begin Here</span>
          </div>
          <h1 className="text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6 uppercase">
            Applying to<br />Artemis
          </h1>
          <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
            We seek the boldest minds — those who look at the horizon and see not a limit, but a challenge they are ready to meet. Your journey starts with a single step.
          </p>
        </div>
      </section>

      {/* ── 2. YOUR PATH — 3-card grid ── */}
      <section id="paths" className="scroll-mt-24 py-20">
        <div
          ref={pathsAnim.ref}
          className={`max-w-[1000px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${pathsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section divider */}
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Your Path</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pathCards.map((card, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/2] bg-gray-100 overflow-hidden mb-6">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">{card.tag}</div>
                <h3 className="text-[20px] font-bold text-[#141414] mb-3 group-hover:text-[#8A0000] transition-colors leading-tight">{card.title}</h3>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-4">{card.desc}</p>
                <button
                  onClick={() => goToPage(card.page)}
                  className="flex items-center space-x-3 text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#8A0000] text-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors group/btn"
                >
                  <span>{card.cta}</span>
                  <svg className="group-hover/btn:translate-x-2 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. ADMISSIONS BY THE NUMBERS ── */}
      <section className="py-20">
        <div
          ref={statsAnim.ref}
          className={`max-w-[1000px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${statsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">By the Numbers</span>
          </div>

          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-16">
            Admissions by<br />the numbers
          </h2>

          {/* Stats row with left borders */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {admissionsStats.map((stat, i) => (
              <div key={i} className="relative pl-6 border-l-2 border-[#8A0000]">
                <div className="text-[36px] font-black text-[#141414] leading-none mb-2 tabular-nums">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">{stat.label}</div>
                <div className="text-[12px] text-gray-500 leading-snug">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FINANCIAL AID — card-and-image parallax ── */}
      <section id="aid" className="scroll-mt-24 py-20 bg-gray-50">
        <div
          ref={aidAnim.ref}
          className={`max-w-[1000px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${aidAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative w-full min-h-[380px] md:min-h-[460px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&q=80&w=1400"
              alt="Financial Aid at Artemis"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative z-10 flex items-end h-full min-h-[380px] md:min-h-[460px] p-8 md:p-14">
              <div className="bg-white max-w-sm p-8 shadow-xl">
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">Our Commitment</div>
                <h3 className="text-[24px] font-bold text-[#141414] mb-3 leading-tight">Need-blind admissions</h3>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-5">
                  Artemis is proudly need-blind in its admissions process and meets 100% of demonstrated financial need for every admitted student. We believe that your potential — not your background — should determine your future.
                </p>
                <button
                  onClick={() => goToPage('contact-us')}
                  className="flex items-center space-x-3 text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#8A0000] text-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors group"
                >
                  <span>Calculate Your Aid</span>
                  <svg className="group-hover:translate-x-2 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. START YOUR APPLICATION ── */}
      <section id="apply" className="scroll-mt-24 bg-[#8A0000] py-20">
        <div
          ref={applyAnim.ref}
          className={`max-w-[1000px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${applyAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex flex-col items-center text-center">
            <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6">
              Ready to join the vanguard?
            </h2>
            <p className="text-[16px] text-white/70 max-w-lg leading-relaxed mb-10">
              Applications for the Class of 2030 are now open. Start your digital portfolio today and take the first step toward an education without boundaries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => goToPage('apply')}
                className="px-10 py-3 border-2 border-white text-white font-bold uppercase text-[12px] tracking-widest hover:bg-white hover:text-[#8A0000] transition-colors"
              >
                Start Application
              </button>
              <button
                onClick={() => goToPage('contact-us')}
                className="px-10 py-3 border-2 border-white text-white font-bold uppercase text-[12px] tracking-widest hover:bg-white hover:text-[#8A0000] transition-colors"
              >
                Request Info
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. MORE INFORMATION — link grid ── */}
      <section id="info" className="scroll-mt-24 bg-gray-50 py-20">
        <div
          ref={infoAnim.ref}
          className={`max-w-[1000px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${infoAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Resources</span>
          </div>

          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-12">
            More information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {infoLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => goToPage(link.page)}
                className="group flex justify-between items-center py-4 border-b border-gray-200 hover:border-[#8A0000] transition-colors w-full text-left"
              >
                <span className="text-[14px] font-bold text-gray-700 group-hover:text-[#8A0000] transition-colors">
                  {link.label}
                </span>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
