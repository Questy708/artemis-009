'use client';

import { useState, useEffect, useRef } from 'react';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';
import SubPageFooter from '@/components/artemis/SubPageFooter';

interface CampusLifeProps {
  goToPage: (page: string) => void;
}

/* ─── Data ─── */
const campusStats = [
  { value: '12', label: 'Living Commons', detail: 'Themed residential communities' },
  { value: '50+', label: 'Student societies', detail: 'Clubs, guilds, and collectives' },
  { value: '3', label: 'Continents', detail: 'Global hub presence' },
  { value: '24h', label: 'Initiation immersion', detail: 'Co-design experience for all newcomers' },
];

/* ─── Living Moments: editorial atlas data ─── */
const livingMoments = [
  {
    image: 'https://images.unsplash.com/photo-1523050335102-c3250d857224?auto=format&fit=crop&q=80&w=1000',
    location: 'Valletta',
    time: '06:00',
    caption: 'Dawn over the Mediterranean — the Weavers gather for morning reflection on the terrace',
    tag: 'Weavers Commons',
    span: 'col-span-1 md:col-span-2 row-span-2', // hero cell
  },
  {
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
    location: 'Tokyo',
    time: '14:00',
    caption: 'An afternoon of molecular prototyping at the Catalyst lab',
    tag: 'Catalyst Commons',
    span: 'col-span-1 row-span-1',
  },
  {
    // Text-only cell — student quote
    type: 'quote',
    quote: '"The Commons doesn\'t just house you — it reshapes how you think about belonging."',
    attribution: 'Yuki Tanaka, Explorers Commons, Class of 2027',
    span: 'col-span-1 row-span-1',
  },
  {
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800',
    location: 'Reykjavik',
    time: '22:00',
    caption: 'Stargazing from the Explorers rooftop observatory — where the sky becomes a syllabus',
    tag: 'Explorers Commons',
    span: 'col-span-1 row-span-1',
  },
  {
    // Network map cell
    type: 'network',
    span: 'col-span-1 md:col-span-2 row-span-1',
  },
  {
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    location: 'San Francisco',
    time: '10:00',
    caption: 'The Builders workshop — where infrastructure meets imagination on the Pacific coast',
    tag: 'Builders Commons',
    span: 'col-span-1 row-span-1',
  },
  {
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    location: 'Geneva',
    time: '18:00',
    caption: 'Evening seminar in the Weavers salon — ideas tested against the fire of conversation',
    tag: 'Weavers Commons',
    span: 'col-span-1 row-span-1',
  },
  {
    // Stats/typography cell
    type: 'stat',
    statValue: '12',
    statLabel: 'Living Commons across 3 continents',
    statDetail: 'Each one a world. Together, a universe.',
    span: 'col-span-1 row-span-1',
  },
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
  const activeSection = useActiveSection(['living', 'traditions', 'community', 'explore']);

  return (
    <div className="flex flex-col bg-white">
      {/* ── 1. Hero ── */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
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

      <OnThisPageNav
        sections={[
          { id: 'living', label: 'Living' },
          { id: 'traditions', label: 'Traditions' },
          { id: 'community', label: 'Community' },
          { id: 'explore', label: 'Explore' },
        ]}
        activeSection={activeSection}
      />

      {/* ── 2. Living Commons — section divider with two-column ── */}
      <section id="living" className="scroll-mt-[110px] py-16 lg:py-24">
        <div
          ref={heroAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${heroAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section divider */}
          <div className="mb-6 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                Living Commons
              </span>
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

      {/* ── 4. The Artemis Atlas — Living Moments editorial grid ── */}
      <section className="py-16 lg:py-24">
        <div
          ref={commonsCardsAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${commonsCardsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-start justify-between mb-12">
            <div>
              <div className="mb-4 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Artemis Atlas</span>
              </div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414]">
                Living moments<br />across the network
              </h2>
            </div>
            <p className="hidden md:block text-[14px] text-gray-500 max-w-xs text-right leading-relaxed">
              A single day spans three continents. These are the moments that make the Artemis network alive.
            </p>
          </div>

          {/* Bento Grid — asymmetric editorial layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[220px] md:auto-rows-[200px]">
            {livingMoments.map((moment, i) => {
              /* ── Quote cell ── */
              if (moment.type === 'quote') {
                return (
                  <div key={i} className={`${moment.span} bg-[#141414] p-8 flex flex-col justify-between`}>
                    <svg className="w-8 h-8 text-[#8A0000] opacity-40" viewBox="0 0 24 24" fill="currentColor"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/></svg>
                    <div>
                      <p className="text-[16px] md:text-[18px] text-white/90 leading-snug font-light mb-4">{moment.quote}</p>
                      <p className="text-[11px] text-white/40 uppercase tracking-widest">{moment.attribution}</p>
                    </div>
                  </div>
                );
              }

              /* ── Network map cell ── */
              if (moment.type === 'network') {
                return (
                  <div key={i} className={`${moment.span} bg-[#0a0a0a] relative overflow-hidden flex items-center justify-center`}>
                    {/* Animated dots + lines constellation */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="xMidYMid slice">
                      {/* Connecting lines */}
                      <line x1="100" y1="60" x2="250" y2="140" stroke="#8A0000" strokeWidth="0.5" opacity="0.3" />
                      <line x1="250" y1="140" x2="400" y2="50" stroke="#8A0000" strokeWidth="0.5" opacity="0.3" />
                      <line x1="400" y1="50" x2="520" y2="130" stroke="#8A0000" strokeWidth="0.5" opacity="0.3" />
                      <line x1="100" y1="60" x2="400" y2="50" stroke="#8A0000" strokeWidth="0.3" opacity="0.15" />
                      <line x1="250" y1="140" x2="520" y2="130" stroke="#8A0000" strokeWidth="0.3" opacity="0.15" />
                      {/* Pulsing dots — hub nodes */}
                      <circle cx="100" cy="60" r="4" fill="#8A0000"><animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" /></circle>
                      <circle cx="250" cy="140" r="5" fill="#8A0000"><animate attributeName="r" values="4;6;4" dur="4s" repeatCount="indefinite" /></circle>
                      <circle cx="400" cy="50" r="4" fill="#8A0000"><animate attributeName="r" values="3;5;3" dur="3.5s" repeatCount="indefinite" /></circle>
                      <circle cx="520" cy="130" r="3" fill="#8A0000"><animate attributeName="r" values="2;4;2" dur="2.8s" repeatCount="indefinite" /></circle>
                      {/* Secondary dots */}
                      <circle cx="170" cy="90" r="1.5" fill="#8A0000" opacity="0.5" />
                      <circle cx="330" cy="100" r="1.5" fill="#8A0000" opacity="0.5" />
                      <circle cx="460" cy="80" r="1.5" fill="#8A0000" opacity="0.5" />
                      <circle cx="560" cy="60" r="1" fill="#8A0000" opacity="0.3" />
                      {/* Location labels */}
                      <text x="100" y="42" fill="white" opacity="0.6" fontSize="8" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.1em">VALLETTA</text>
                      <text x="250" y="162" fill="white" opacity="0.6" fontSize="8" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.1em">GENEVA</text>
                      <text x="400" y="35" fill="white" opacity="0.6" fontSize="8" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.1em">TOKYO</text>
                      <text x="520" y="152" fill="white" opacity="0.6" fontSize="8" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.1em">SAN FRANCISCO</text>
                    </svg>
                    <div className="relative z-10 text-center">
                      <p className="text-[11px] text-white/50 uppercase tracking-[0.3em]">The network is always on</p>
                    </div>
                  </div>
                );
              }

              /* ── Stat cell ── */
              if (moment.type === 'stat') {
                return (
                  <div key={i} className={`${moment.span} bg-[#8A0000] p-8 flex flex-col justify-center`}>
                    <div className="text-[64px] font-black text-white leading-none mb-2">{moment.statValue}</div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 mb-3">{moment.statLabel}</div>
                    <div className="w-12 h-[1px] bg-white/40 mb-3"></div>
                    <div className="text-[13px] text-white/60 leading-relaxed font-light italic">{moment.statDetail}</div>
                  </div>
                );
              }

              /* ── Photo cell (default) ── */
              return (
                <div key={i} className={`${moment.span} group relative overflow-hidden cursor-pointer`}>
                  <img
                    src={moment.image}
                    alt={moment.caption}
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  {/* Gradient overlay — always visible at bottom, expands on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:via-black/30 transition-all duration-500" />
                  {/* Floating time label — top left */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8A0000] animate-pulse"></span>
                      <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">{moment.time} — {moment.location}</span>
                    </span>
                  </div>
                  {/* Caption — bottom, always visible */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <div className="text-[9px] font-bold text-[#8A0000] tracking-[0.2em] uppercase mb-1.5">{moment.tag}</div>
                    <p className="text-[13px] text-white/80 leading-snug font-light">{moment.caption}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Traditions & Rituals — card-and-image parallax ── */}
      <section id="traditions" className="scroll-mt-[110px] py-16 lg:py-24">
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
          <div className="max-w-[1600px] mx-auto">
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
      <section id="community" className="scroll-mt-[110px] py-16 lg:py-24 bg-gray-50">
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
      <section id="explore" className="scroll-mt-[110px] py-16 lg:py-24">
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
