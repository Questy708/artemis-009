'use client';

import { useState, useEffect, useRef } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';

interface InnovationProps {
  goToPage: (page: string) => void;
}

/* ─── Data ─── */
const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800',
    alt: 'Venture demonstration',
    caption: 'Student entrepreneurs pitch at the Forge Demo Day, raising through the Forge Demo Day since the program\'s founding.',
  },
  {
    src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    alt: 'Rapid prototyping lab',
    caption: 'Inside the Artemis Forge, engineers iterate on hardware prototypes using state-of-the-art CNC machining, 3D printing, and electronics fabrication — from concept to working prototype in days, not months.',
  },
  {
    src: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
    alt: 'Digital ecosystem',
    caption: 'The Nexus connects over 50 developers, designers, and domain experts across Artemis campuses, fostering cross-disciplinary software solutions that bridge research and real-world deployment.',
  },
  {
    src: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800',
    alt: 'Interdisciplinary collaboration',
    caption: 'Teams from the Forge and the Nexus collaborate on integrated hardware-software ventures, supported by SkyBridge\'s corporate partnership network spanning three continents.',
  },
];

const ventureHubs = [
  {
    title: 'Artemis Forge',
    desc: 'A physical and digital space for rapid prototyping and hardware innovation. Equipped with state-of-the-art labs, CNC machining, additive manufacturing, and expert technicians — the Forge transforms concepts into working prototypes in days, not months, spinning up hardware prototypes for future ventures.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1400',
    tag: '01 — FORGE',
  },
  {
    title: 'The Nexus',
    desc: 'Our digital ecosystem connecting developers, designers, and domain experts to build the next generation of software solutions. The Nexus provides cloud infrastructure, AI tooling, design systems, and a curated mentorship network — software ventures in development, targeting launch within the first three years.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1400',
    tag: '02 — NEXUS',
  },
  {
    title: 'SkyBridge',
    desc: 'Artemis\'s technology transfer engine — bridging academic discovery and industry application through licensing, spin-off formation, and corporate partnerships. SkyBridge is building a portfolio of intellectual property and facilitating pathways from lab to market.',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=1400',
    tag: '03 — SKYBRIDGE',
  },
];

const innovationStats = [
  { value: '0', label: 'Spin-offs', detail: 'In development from foundational research' },
  { value: '$0', label: 'Venture funding', detail: 'First ventures in incubation' },
  { value: '8+', label: 'Industry partners', detail: 'Founding industry partnerships' },
  { value: '3', label: 'Continents', detail: 'Global innovation footprint' },
];

const resourceLinks = [
  { heading: 'Entrepreneurship', links: ['Support for entrepreneurs', 'Startup incubation programs', 'Venture funding opportunities', 'Mentorship network', 'Founder residency'] },
  { heading: 'Innovation', links: ['Corporate partnerships', 'Technology licensing', 'Economic development', 'International development', 'Intellectual property'] },
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
export default function Innovation({ goToPage }: InnovationProps) {
  const [activeGallery, setActiveGallery] = useState(0);
  const [expandedHub, setExpandedHub] = useState<number | null>(null);
  const approachAnim = useInView();
  const statsAnim = useInView();
  const techTransferAnim = useInView();
  const resourcesAnim = useInView();

  // Auto-cycle gallery
  useEffect(() => {
    const timer = setInterval(() => setActiveGallery(i => (i + 1) % galleryImages.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col bg-white">
      {/* ── Sticky Sub-header ── */}
      <div className="sticky top-[50px] z-40 bg-white border-b border-gray-200 w-full">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
          <div className="flex items-center h-[52px] gap-8 overflow-x-auto hide-scrollbar">
              <h2 className="text-[14px] font-bold tracking-tight text-[#8A0000] mr-10 whitespace-nowrap">
                Innovation at Artemis
              </h2>
              <div className="flex space-x-6 shrink-0 text-[12px] font-bold uppercase tracking-widest text-gray-400">
                <a href="#incubators" className="hover:text-[#8A0000] transition-colors whitespace-nowrap">Incubators</a>
                <a href="#tech" className="hover:text-[#8A0000] transition-colors whitespace-nowrap">Tech Transfer</a>
                <a href="#ventures" className="hover:text-[#8A0000] transition-colors whitespace-nowrap">Ventures</a>
                <a href="#impact" className="hover:text-[#8A0000] transition-colors whitespace-nowrap">Impact</a>
              </div>
      </div>
          </div>
        </div>

      {/* ── 1. HERO ── */}
      <section className="relative w-full h-[60vh] min-h-[440px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1800"
          className="absolute inset-0 w-full h-full object-cover grayscale"
          alt="Innovation at Artemis"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-8 lg:px-20 pb-16">
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Innovation Enterprise</span>
          </div>
          <h1 className="text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6 uppercase">
            Incubating the<br />future of humanity
          </h1>
          <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
            Artemis Innovation is a catalyst for world-changing ideas. We provide the resources, mentorship, and network needed to turn theoretical breakthroughs into practical solutions that reshape industries and improve lives.
          </p>
        </div>
      </section>

      {/* ── 2. OUR APPROACH ── */}
      <section className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        <div
          ref={approachAnim.ref}
          className={`transition-all duration-700 ${approachAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section divider */}
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Our Approach</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left — Text */}
            <div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Catalyzing ideas<br />into impact
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Great ideas don&apos;t change the world on their own — they need infrastructure, capital, and guidance to reach their potential. At Artemis, we&apos;ve built an innovation ecosystem that surrounds every promising idea with the support it needs to grow.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                From dedicated prototyping labs to venture funding, from corporate partnerships to global licensing networks, our approach ensures that breakthroughs born in Artemis labs reach the people and markets that need them most.
              </p>
              <button
                onClick={() => goToPage('research')}
                className="flex items-center space-x-4 py-2 border-b-2 border-[#141414] text-[#141414] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-[#8A0000] hover:border-[#8A0000] transition-all group"
              >
                <span>Explore Our Model</span>
                <svg className="group-hover:translate-x-2 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>

            {/* Right — Gallery */}
            <div>
              <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                {galleryImages.map((img, i) => (
                  <img
                    key={i}
                    src={img.src}
                    alt={img.alt}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === activeGallery ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
              </div>
              {/* Thumbnail strip */}
              <div className="flex gap-2 mt-3">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveGallery(i)}
                    className={`flex-1 aspect-[4/3] overflow-hidden border-2 transition-all ${i === activeGallery ? 'border-[#8A0000]' : 'border-transparent opacity-50 hover:opacity-80'}`}
                  >
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              {/* Caption */}
              <p className="text-[13px] text-gray-500 leading-relaxed mt-3 min-h-[48px]">
                {galleryImages[activeGallery].caption}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. VENTURE HUBS ── */}
      <section id="incubators" className="scroll-mt-24 bg-gray-50 py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20">
          {/* Section divider */}
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Venture Hubs</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {ventureHubs.map((hub, i) => (
              <div
                key={i}
                className="relative flex-1 min-h-[280px] md:min-h-[380px] overflow-hidden cursor-pointer group"
                onMouseEnter={() => setExpandedHub(i)}
                onMouseLeave={() => setExpandedHub(null)}
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${hub.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/75 transition-colors duration-500" />
                <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                  <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-2 uppercase">{hub.tag}</div>
                  <h3 className="text-[22px] md:text-[26px] font-bold text-white mb-2 leading-tight">
                    {hub.title}
                  </h3>
                  <div className={`overflow-hidden transition-all duration-500 ${expandedHub === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-[14px] text-white/80 leading-relaxed mb-5">
                      {hub.desc}
                    </p>
                    <button
                      onClick={(e) => { e.stopPropagation(); goToPage('research'); }}
                      className="text-[11px] font-bold uppercase tracking-widest border border-white text-white px-5 py-2 hover:bg-white hover:text-[#8A0000] transition-colors"
                    >
                      Explore Hub →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. STATS ROW ── */}
      <section id="ventures" className="scroll-mt-24 py-16 lg:py-24">
        <div
          ref={statsAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${statsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">By the Numbers</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            {/* Main — 8 cols */}
            <div className="lg:col-span-8">
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                Innovation at<br />scale
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed max-w-xl">
                With ventures in incubation, foundational industry partnerships spanning 8+ organizations across three continents, Artemis translates discovery into impact faster than any peer institution.
              </p>
            </div>
            {/* Sidebar — 4 cols */}
            <div className="lg:col-span-4 border-l border-gray-200 pl-8">
              <div className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">Related links</div>
              <div className="space-y-3">
                {[
                  { label: 'Artemis spin-off portfolio', page: 'about' },
                  { label: 'Venture funding programs', page: 'fundraising' },
                  { label: 'Corporate partnership inquiries', page: 'innovation' },
                  { label: 'Innovation facts & figures', page: 'about' },
                ].map((link, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(link.page)}
                    className="block w-full text-left text-[14px] text-[#8A0000] hover:underline leading-snug"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {innovationStats.map((stat, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gray-100"></div>
                <div className="text-[36px] font-black text-[#141414] leading-none mb-2 tabular-nums">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">{stat.label}</div>
                <div className="text-[12px] text-gray-500 leading-snug">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TECH TRANSFER ── */}
      <section id="tech" className="scroll-mt-24 py-16 lg:py-24">
        <div
          ref={techTransferAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${techTransferAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative w-full min-h-[380px] md:min-h-[460px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1400"
              alt="Technology Transfer"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative z-10 flex items-end h-full min-h-[380px] md:min-h-[460px] p-8 md:p-14">
              <div className="bg-white max-w-sm p-8 shadow-xl">
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">Tech Transfer</div>
                <h3 className="text-[24px] font-bold text-[#141414] mb-3 leading-tight">From lab to market</h3>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-5">
                  SkyBridge, Artemis&apos;s technology transfer engine, bridges academic discovery and industry application through licensing, spin-off formation, and corporate partnerships — building a portfolio of intellectual property and facilitating pathways from lab to market.
                </p>
                <button
                  onClick={() => goToPage('research')}
                  className="text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#8A0000] text-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors"
                >
                  Explore SkyBridge →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. ENTREPRENEURSHIP RESOURCES ── */}
      <section id="impact" className="scroll-mt-24 bg-gray-50 py-16 lg:py-24">
        <div
          ref={resourcesAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${resourcesAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Resources</span>
          </div>
          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-12">
            Entrepreneurship<br />resources
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {resourceLinks.map((col, i) => (
              <div key={i}>
                <h3 className="text-[13px] font-bold uppercase tracking-widest text-gray-900 mb-4 border-b border-gray-200 pb-2">{col.heading}</h3>
                <div className="space-y-0">
                  {col.links.map((link, j) => (
                    <button
                      key={j}
                      onClick={() => goToPage('fundraising')}
                      className="group flex justify-between items-center py-3 border-b border-gray-200 hover:border-[#8A0000] transition-colors w-full text-left"
                    >
                      <span className="text-[14px] font-bold text-gray-700 group-hover:text-[#8A0000] transition-colors">
                        {link}
                      </span>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CRIMSON CTA BAR ── */}
      <section className="bg-[#8A0000] py-16">
        <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-white mb-2">
              Ready to build?
            </h2>
            <p className="text-[16px] text-white/70 leading-relaxed max-w-lg">
              Whether you&apos;re an entrepreneur with a bold idea, a researcher ready to commercialize, or a corporation seeking partnership — Artemis Innovation is your launchpad.
            </p>
          </div>
          <button
            onClick={() => goToPage('fundraising')}
            className="shrink-0 flex items-center space-x-3 bg-white text-[#8A0000] px-8 py-4 text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors group"
          >
            <span>Get Started</span>
            <svg className="group-hover:translate-x-2 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
