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

/* ─── The Chronicle: dispatch data ─── */
const dispatches = [
  {
    time: '06:00',
    location: 'Valletta, Malta',
    tag: 'Weavers Commons',
    headline: 'Dawn reflections on the Mediterranean terrace',
    body: 'Before the city stirs, the Weavers are already awake — gathered on the limestone terrace above the Grand Harbour, watching the first light spill across the water. This is not a scheduled event. It is a habit that formed organically in the first year of the Valletta hub and has become the quietest and most enduring ritual in the Artemis network. No faculty, no agenda — just a shared understanding that some thoughts only surface at the edge of daybreak.',
    image: 'https://images.unsplash.com/photo-1523050335102-c3250d857224?auto=format&fit=crop&q=80&w=1200',
    gradientFrom: 'rgba(138,0,0,0.9)',
    gradientTo: 'rgba(90,0,0,0.8)',
  },
  {
    time: '10:00',
    location: 'San Francisco, USA',
    tag: 'Builders Commons',
    headline: 'Prototyping the future before lunch',
    body: 'By mid-morning the Builders workshop is already humming — laser cutters singing, 3D printers layering, and a team of second-years stress-testing a biodegradable structural joint they designed overnight. The Pacific light pours through the warehouse skylights. The air smells of cedar shavings and solder. A whiteboard in the corner reads, in red marker: "If it works, break it again. If it breaks, understand why."',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
    gradientFrom: 'rgba(26,26,46,0.9)',
    gradientTo: 'rgba(10,10,26,0.8)',
  },
  {
    time: '14:00',
    location: 'Tokyo, Japan',
    tag: 'Catalyst Commons',
    headline: 'Where molecules meet imagination',
    body: 'The Catalyst lab in the Shibuya hub is an intersection of precision and play. This afternoon, a junior fellow is running a molecular simulation on one screen while sketching a children\'s book about synthetic biology on another. The Commons philosophy is that breakthrough discovery rarely happens inside a single discipline — so the space is designed to invite productive collisions between fields that would never share a corridor in a traditional university.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200',
    gradientFrom: 'rgba(13,27,42,0.9)',
    gradientTo: 'rgba(27,38,59,0.8)',
  },
  {
    time: '18:00',
    location: 'Geneva, Switzerland',
    tag: 'Weavers Commons',
    headline: 'The evening salon — where ideas meet their match',
    body: 'Every evening at the Geneva hub, the Weavers salon opens its doors to an informal gathering that blurs the line between seminar and dinner party. Tonight\'s question, pinned to the door in chalk: "Should a civilization have a right to be forgotten?" A philosopher, a data scientist, and a first-year student from Nairobi take three completely different approaches — and by the end of the evening, all three have changed their minds at least once.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    gradientFrom: 'rgba(45,27,0,0.9)',
    gradientTo: 'rgba(26,16,0,0.8)',
  },
  {
    time: '22:00',
    location: 'Reykjavik, Iceland',
    tag: 'Explorers Commons',
    headline: 'Under the aurora, the sky becomes a syllabus',
    body: 'The Explorers rooftop observatory in Reykjavik is the northernmost point in the Artemis network. On clear nights, students gather with thermal blankets and hot coffee to watch the aurora borealis ripple across the sky — not as tourists, but as researchers calibrating atmospheric sensors and photographing spectral emissions. The aurora is not just beautiful here; it is data. And the data tells a story about solar wind, magnetospheric dynamics, and the thin veil that protects everything living beneath it.',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1200',
    gradientFrom: 'rgba(10,22,40,0.9)',
    gradientTo: 'rgba(6,16,32,0.8)',
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

      {/* ── 4. The Chronicle — cinematic dispatch timeline ── */}
      <section className="py-0">
        {/* Section header — outside the strips */}
        <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 pt-16 lg:pt-24 pb-0">
          <div
            ref={commonsCardsAnim.ref}
            className={`transition-all duration-700 ${commonsCardsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="mb-4 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Chronicle</span>
            </div>
            <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-3">
              One day. Five hubs.<br />A living network.
            </h2>
            <p className="text-[16px] text-gray-500 max-w-xl leading-relaxed">
              From the first light over Valletta to the aurora above Reykjavik — a single day in the Artemis network told through the moments that make it real.
            </p>
          </div>
        </div>

        {/* Dispatch strips — full-bleed cinematic panels */}
        <div className="mt-12">
          {dispatches.map((d, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={i} className="group relative w-full overflow-hidden" style={{ minHeight: '420px' }}>
                {/* Background image — full bleed */}
                <img
                  src={d.image}
                  alt={d.headline}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-[1200ms]"
                />
                {/* Color overlay — directional gradient via inline style */}
                <div
                  className={`absolute inset-0 ${isEven ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-black/50 to-transparent`}
                  style={{
                    background: isEven
                      ? `linear-gradient(to right, ${d.gradientFrom}, rgba(0,0,0,0.5), transparent)`
                      : `linear-gradient(to left, ${d.gradientTo}, rgba(0,0,0,0.5), transparent)`,
                  }}
                />
                {/* Subtle texture */}
                <div className="absolute inset-0 bg-black/10" />

                {/* Content */}
                <div className={`relative z-10 max-w-[1400px] mx-auto w-full px-8 lg:px-20 flex items-center h-full`} style={{ minHeight: '420px' }}>
                  <div className={`max-w-lg py-16 ${isEven ? 'mr-auto' : 'ml-auto text-right'}`}>
                    {/* Time badge */}
                    <div className={`flex items-center gap-3 mb-5 ${isEven ? '' : 'justify-end'}`}>
                      <span className="w-2 h-2 rounded-full bg-[#8A0000] animate-pulse"></span>
                      <span className="text-[11px] font-bold text-white/60 uppercase tracking-[0.3em]">{d.time} — {d.location}</span>
                    </div>
                    {/* Tag */}
                    <div className={`text-[10px] font-bold text-[#8A0000] tracking-[0.25em] uppercase mb-4 ${isEven ? '' : 'text-right'}`}>
                      {d.tag}
                    </div>
                    {/* Headline */}
                    <h3 className="text-[28px] md:text-[34px] font-extrabold leading-[1.1] tracking-tight text-white mb-5">
                      {d.headline}
                    </h3>
                    {/* Body text */}
                    <p className="text-[14px] md:text-[15px] text-white/70 leading-relaxed mb-6">
                      {d.body}
                    </p>
                    {/* Divider line */}
                    <div className={`w-16 h-[1px] bg-white/30 ${isEven ? '' : 'ml-auto'}`}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interlude — student quote between dispatches and next section */}
        <div className="bg-[#141414] py-20 lg:py-28">
          <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20">
            <div className="max-w-2xl mx-auto text-center">
              <svg className="w-10 h-10 text-[#8A0000] opacity-30 mx-auto mb-8" viewBox="0 0 24 24" fill="currentColor"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/></svg>
              <p className="text-[22px] md:text-[28px] text-white/90 leading-snug font-light mb-8">
                "The Commons doesn't just house you — it reshapes how you think about belonging."
              </p>
              <p className="text-[11px] text-white/30 uppercase tracking-[0.3em]">Yuki Tanaka — Explorers Commons, Class of 2027</p>
            </div>
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
