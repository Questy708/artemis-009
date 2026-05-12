'use client';

import { useState, useEffect, useRef } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';

interface CampusLifeProps {
  goToPage: (page: string) => void;
}

/* ─── Data ─── */
const commonsCards = [
  {
    tag: '01 — WEAVERS',
    title: 'The Weavers Commons',
    desc: 'Social innovation and community weaving. Residents collaborate on civic projects, mutual aid networks, and the art of building bonds that hold society together.',
    image: 'https://images.unsplash.com/photo-1523050335102-c3250d857224?auto=format&fit=crop&q=80&w=800',
  },
  {
    tag: '02 — CATALYST',
    title: 'The Catalyst Commons',
    desc: 'Scientific discovery and experimental living. A community of researchers who treat daily life as a laboratory — testing ideas, running experiments, and accelerating breakthroughs.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
  },
  {
    tag: '03 — EXPLORERS',
    title: 'The Explorers Commons',
    desc: 'Cosmological inquiry and frontier thinking. From astrophysics to philosophy, Explorers push the boundaries of what is known and imagine what lies beyond the horizon.',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800',
  },
  {
    tag: '04 — BUILDERS',
    title: 'The Builders Commons',
    desc: 'Engineering, design, and making. Builders are architects of the tangible — from sustainable infrastructure to digital platforms that reshape how communities function.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
  },
];

const campusStats = [
  { value: '12', label: 'Living Commons', detail: 'Themed residential communities' },
  { value: '50+', label: 'Student societies', detail: 'Clubs, guilds, and collectives' },
  { value: '3', label: 'Continents', detail: 'Global hub presence' },
  { value: '24h', label: 'Initiation immersion', detail: 'Co-design experience for all newcomers' },
];

const studentLifeLinks = [
  { label: 'Housing', page: 'visit-us' },
  { label: 'Dining', page: 'campus' },
  { label: 'Athletics', page: 'campus' },
  { label: 'Wellness', page: 'access-at-artemis' },
  { label: 'Arts & Culture', page: 'research' },
  { label: 'Student Government', page: 'how-we-are-run' },
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
export default function CampusLife({ goToPage }: CampusLifeProps) {
  const heroAnim = useInView();
  const commonsIntroAnim = useInView();
  const commonsCardsAnim = useInView();
  const traditionsAnim = useInView();
  const statsAnim = useInView();
  const studentLifeAnim = useInView();

  return (
    <div className="flex flex-col bg-white">
      {/* ── 1. Sticky Sub-header ── */}
      <div className="sticky top-[50px] z-40 bg-white border-b border-gray-200 w-full">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
          <div className="flex items-center h-[52px] gap-8 overflow-x-auto hide-scrollbar">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
          <div className="flex items-center h-[52px] gap-8 overflow-x-auto hide-scrollbar">
              <h2 className="text-[14px] font-bold tracking-tight text-[#8A0000] mr-10 whitespace-nowrap">
                Campus Life
              </h2>
              <div className="flex space-x-6 shrink-0 text-[12px] font-bold uppercase tracking-widest text-gray-400">
                <a href="#living" className="hover:text-[#8A0000] transition-colors whitespace-nowrap">Living</a>
                <a href="#traditions" className="hover:text-[#8A0000] transition-colors whitespace-nowrap">Traditions</a>
                <a href="#community" className="hover:text-[#8A0000] transition-colors whitespace-nowrap">Community</a>
                <a href="#explore" className="hover:text-[#8A0000] transition-colors whitespace-nowrap">Explore</a>
              </div>
      </div>
          </div>
        </div>
          </div>
        </div>

      {/* ── 2. Hero ── */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1800px] mx-auto">
          <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523050335102-c3250d857224?auto=format&fit=crop&q=80&w=1800"
          className="absolute inset-0 w-full h-full object-cover grayscale"
          alt="Campus life at Artemis"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-8 lg:px-20 pb-16">
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Life at Artemis</span>
          </div>
          <h1 className="text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6 uppercase">
            A global<br />living lab
          </h1>
          <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
            Across three continents, Artemis students live and learn in a community that stretches far beyond the classroom — connected digitally, united by a shared culture of inquiry and mutual respect.
          </p>
        </div>
          </div>
        </div>
      </section>

      {/* ── 3. Living Commons — section divider with two-column ── */}
      <section id="living" className="scroll-mt-24 py-16 lg:py-24">
        <div
          ref={heroAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${heroAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section divider */}
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Living Commons</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div
            ref={commonsIntroAnim.ref}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start transition-all duration-700 ${commonsIntroAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Left — Text */}
            <div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Where living<br />is the curriculum
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Every student is assigned to one of our 12 Living Commons, themed around archetypes of learning and societal transformation. These are not just residences — they are shared kitchens, meditation rooms, civic salons, and outdoor labs where student life itself becomes the living curriculum.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                Each Commons cultivates a distinct character — from the quiet contemplation of the Scholars to the restless energy of the Builders — while remaining woven into the larger Artemis tapestry through shared rituals, cross-Commons projects, and the digital connective tissue that links all our hubs.
              </p>
              <button
                onClick={() => goToPage('campus')}
                className="flex items-center space-x-4 py-2 border-b-2 border-[#141414] text-[#141414] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-[#8A0000] hover:border-[#8A0000] transition-all group"
              >
                <span>Explore the Commons</span>
                <svg className="group-hover:translate-x-2 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>

            {/* Right — Image */}
            <div className="group">
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1000"
                  alt="Living Commons community"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <p className="text-[12px] text-gray-500 mt-3 leading-relaxed">
                The Weavers Commons courtyard at the Geneva hub — a space designed for conversation, collaboration, and the quiet art of community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. The Commons — 4-card grid on gray-50 ── */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div
          ref={commonsCardsAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${commonsCardsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Commons</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {commonsCards.map((card, i) => (
              <div key={i} className="group border border-gray-200 hover:border-[#8A0000] transition-all cursor-pointer bg-white shadow-sm hover:shadow-lg overflow-hidden">
                <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <span className="text-[10px] font-bold text-[#8A0000] tracking-widest mr-4 uppercase">{card.tag}</span>
                  </div>
                  <h3 className="text-[20px] font-bold text-[#141414] mb-3 group-hover:text-[#8A0000] transition-colors leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-[14px] text-gray-600 leading-relaxed mb-4">{card.desc}</p>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#141414] border-b border-black w-fit group-hover:text-[#8A0000] group-hover:border-[#8A0000] transition-all">
                    Discover More
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Traditions & Rituals — card-and-image parallax ── */}
      <section id="traditions" className="scroll-mt-24 py-16 lg:py-24">
        <div
          ref={traditionsAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${traditionsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section divider */}
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Traditions & Rituals</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Card-and-image parallax */}
          <div className="max-w-[1800px] mx-auto">
          <div className="relative w-full min-h-[380px] md:min-h-[460px] overflow-hidden mb-16">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1400"
              alt="Traditions at Artemis"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative z-10 flex items-end h-full min-h-[380px] md:min-h-[460px] p-8 md:p-14">
              <div className="bg-white max-w-sm p-8 shadow-xl">
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">Rituals of Belonging</div>
                <h3 className="text-[24px] font-bold text-[#141414] mb-3 leading-tight">Traditions that bind us</h3>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-5">
                  Artemis marks the journey of every student with rituals that transform individual growth into collective memory — from the first night of co-design to the final passage into the alumni network.
                </p>
                <button
                  onClick={() => goToPage('campus')}
                  className="text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#8A0000] text-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors"
                >
                  Our Traditions →
                </button>
              </div>
            </div>
          </div>

          {/* Two tradition descriptions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <div className="mb-4 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">Initiation Ritual</span>
              </div>
              <h4 className="text-[22px] font-bold text-[#141414] mb-4 leading-tight">A 24-hour co-design immersion</h4>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                During the first week, every new student enters a 24-hour co-design immersion with their Commons peers. Together, they prototype solutions to a real community challenge, planting a &lsquo;learning contract&rsquo; tree at their primary node — a living symbol of their commitment to the intellectual guild.
              </p>
            </div>
            <div>
              <div className="mb-4 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">Final Year Passage</span>
              </div>
              <h4 className="text-[22px] font-bold text-[#141414] mb-4 leading-tight">A multimedia reflection of the journey</h4>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                The culmination of the Artemis experience: students present a multimedia reflection of their four-year journey, inviting their Commons family to offer final questions before they transition into the global alumni network. It is both celebration and rite of passage.
              </p>
            </div>
          </div>
        </div>
          </div>
      </section>

      {/* ── 6. Stats row ── */}
      <section id="community" className="scroll-mt-24 py-16 lg:py-24 bg-gray-50">
        <div
          ref={statsAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${statsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">By the Numbers</span>
          </div>

          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-12">
            Community in<br />every dimension
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {campusStats.map((stat, i) => (
              <div key={i} className="relative pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#8A0000]"></div>
                <div className="text-[36px] font-black text-[#141414] leading-none mb-2 tabular-nums">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">{stat.label}</div>
                <div className="text-[12px] text-gray-500 leading-snug">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Student Life link grid ── */}
      <section id="explore" className="scroll-mt-24 py-16 lg:py-24">
        <div
          ref={studentLifeAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${studentLifeAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Student Life</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-12">
            <div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                Everything you need,<br />everything you are
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed">
                From housing and dining to wellness and student government, Artemis provides the infrastructure for a full life — not just an academic one. Explore the services, spaces, and organizations that make our campuses feel like home.
              </p>
            </div>

            {/* Link rows with chevrons */}
            <div className="space-y-0">
              {studentLifeLinks.map((link, i) => (
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
        </div>
      </section>

      {/* ── 8. Crimson CTA bar ── */}
      <section className="bg-[#8A0000] py-16 px-8 lg:px-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-[28px] md:text-[36px] font-extrabold leading-tight tracking-tighter text-white mb-2">
              Experience Artemis in person
            </h2>
            <p className="text-[16px] text-white/70 leading-relaxed max-w-lg">
              Walk the Commons, sit in on a seminar, share a meal with future peers. There is no substitute for being here.
            </p>
          </div>
          <button
            onClick={() => goToPage('visit-us')}
            className="flex items-center space-x-3 bg-white text-[#8A0000] px-8 py-4 text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors shrink-0 group"
          >
            <span>Visit Campus</span>
            <svg className="group-hover:translate-x-2 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      </section>

      {/* ── 9. Footer ── */}
      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
