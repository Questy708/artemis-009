'use client';

import { useState, useEffect, useRef } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';

interface Props {
  goToPage: (page: string) => void;
}

/* ─── Data ─── */
const exploreLinks = [
  { label: 'University Officers', page: 'about' },
  { label: 'Famous Artemisians', page: 'about' },
  { label: 'Women making history', page: 'about' },
  { label: 'Professor of Poetry', page: 'about' },
];

const leaders = [
  {
    name: 'Abraham Kyeyune',
    title: 'Chancellor',
    role: 'Founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    bio: 'Visionary founder of the Artemis network, Kyeyune reshaped the concept of the university for the digital age — returning the institution to its decentralized guild origins.',
  },
  {
    name: 'Dr. Elara Vance',
    title: 'Provost',
    role: 'Academic Affairs',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600',
    bio: 'Architect of Artemis\'s digital humanities framework, Dr. Vance ensures that classical pedagogical models translate flawlessly into the distributed learning environment.',
  },
  {
    name: 'Prof. Julian Sarkis',
    title: 'Dean',
    role: 'School of Engineering',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600',
    bio: 'A systems engineer who developed the federated governance models still used today, allowing individual nodes to operate autonomously while contributing to the Artemis Trust.',
  },
  {
    name: 'Dr. Amara Osei',
    title: 'Guild Chair',
    role: 'Research Guild',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    bio: 'Leading the Research Guild, Dr. Osei coordinates cross-college inquiry and ensures that every Artemisian — regardless of rank or node — has equitable access to resources and opportunity.',
  },
];

const peopleStats = [
  { value: '3,500+', label: 'Staff', detail: 'Across all global nodes' },
  { value: '1,200+', label: 'Faculty', detail: 'Distinguished scholars & researchers' },
  { value: '140+', label: 'Countries', detail: 'Represented in our community' },
  { value: '85%', label: 'Satisfaction', detail: 'Annual employee survey' },
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
export default function OurPeople({ goToPage }: Props) {
  const heroAnim = useInView();
  const exploreAnim = useInView();
  const leadershipAnim = useInView();
  const spotlightAnim = useInView();
  const statsAnim = useInView();
  const workingAnim = useInView();

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      {/* ── Breadcrumb Header ── */}
      <div className="sticky top-[50px] z-40 bg-white border-b border-gray-100 flex items-center px-6 lg:px-16 shrink-0 h-[60px] shadow-sm">
        <button
          onClick={() => goToPage('about')}
          className="text-[12px] font-bold uppercase tracking-widest text-[#8A0000] hover:text-black mr-4 transition-colors"
        >
          About
        </button>
        <div className="text-gray-300 mr-4">/</div>
        <h2 className="text-[14px] font-bold tracking-tight text-black whitespace-nowrap">
          Our People
        </h2>
      </div>

      {/* ── 1. HERO ── */}
      <section className="relative w-full h-[55vh] min-h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=1800"
          className="absolute inset-0 w-full h-full object-cover grayscale"
          alt="The people of Artemis"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1000px] mx-auto w-full px-6 lg:px-16 pb-16">
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              The Artemis Community
            </span>
          </div>
          <h1 className="text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6 uppercase">
            Our People
          </h1>
          <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
            The scholars, researchers, and staff who form the beating heart of the Artemis experiment — a global guild united by the pursuit of knowledge without borders.
          </p>
        </div>
      </section>

      {/* ── 2. EXPLORE ── */}
      <section className="max-w-[1000px] mx-auto w-full px-6 lg:px-16 py-20">
        <div
          ref={exploreAnim.ref}
          className={`transition-all duration-700 ${exploreAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section divider */}
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">
              Explore
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {exploreLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => goToPage(link.page)}
                className="group flex justify-between items-center py-5 border-b border-gray-100 hover:border-[#8A0000] transition-colors w-full text-left"
              >
                <span className="text-[17px] font-bold text-gray-700 group-hover:text-[#8A0000] transition-colors">
                  {link.label}
                </span>
                <svg
                  className="w-4 h-4 text-gray-300 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all"
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
      </section>

      {/* ── 3. LEADERSHIP ── */}
      <section className="bg-gray-50 py-20">
        <div
          ref={leadershipAnim.ref}
          className={`max-w-[1000px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${leadershipAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Red line accent */}
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Leadership
            </span>
          </div>

          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            Guiding the guild
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl mb-16">
            From the Chancellor who envisioned a borderless university to the Guild Chairs who steward its research mission, Artemis is led by those who believe the future of knowledge is collective.
          </p>

          {/* Leadership grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {leaders.map((leader, i) => (
              <div
                key={i}
                className="group border border-gray-200 hover:border-[#8A0000] bg-white shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden"
              >
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="text-[18px] font-bold text-[#141414] group-hover:text-[#8A0000] transition-colors leading-tight">
                      {leader.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold text-[#8A0000] uppercase tracking-widest">
                      {leader.title}
                    </span>
                    <span className="text-gray-300">·</span>
                    <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                      {leader.role}
                    </span>
                  </div>
                  <p className="text-[14px] text-gray-600 leading-relaxed">
                    {leader.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FACULTY SPOTLIGHT ── */}
      <section className="py-20">
        <div
          ref={spotlightAnim.ref}
          className={`max-w-[1000px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${spotlightAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">
              Faculty Spotlight
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Card-and-image parallax section */}
          <div className="relative w-full min-h-[380px] md:min-h-[460px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1400"
              alt="Faculty collaboration at Artemis"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative z-10 flex items-end h-full min-h-[380px] md:min-h-[460px] p-8 md:p-14">
              <div className="bg-white max-w-sm p-8 shadow-xl">
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">
                  Academic Excellence
                </div>
                <h3 className="text-[24px] font-bold text-[#141414] mb-3 leading-tight">
                  Minds that shape the future
                </h3>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-5">
                  Artemis faculty are not confined to a single discipline or a single campus. They are distributed scholars — thinkers who collaborate across nodes, time zones, and traditions to deliver a truly global education.
                </p>
                <button
                  onClick={() => goToPage('research')}
                  className="text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#8A0000] text-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors"
                >
                  Explore Faculty Research →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. BY THE NUMBERS ── */}
      <section className="bg-gray-50 py-20">
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

          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            A global workforce
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl mb-16">
            Behind every breakthrough at Artemis is a person — a scholar, a strategist, a steward of knowledge. Our people are the infrastructure of possibility.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {peopleStats.map((stat, i) => (
              <div key={i} className="relative pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#8A0000]"></div>
                <div className="text-[36px] font-black text-[#141414] leading-none mb-2 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">
                  {stat.label}
                </div>
                <div className="text-[12px] text-gray-500 leading-snug">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. WORKING AT ARTEMIS ── */}
      <section className="py-20">
        <div
          ref={workingAnim.ref}
          className={`max-w-[1000px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${workingAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">
              Careers
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Left — Text */}
            <div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Working at Artemis
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Artemis is not a conventional employer. We are a decentralized guild of scholars, engineers, administrators, and dreamers — united by the belief that knowledge should have no borders and talent should have no ceiling.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                From competitive benefits and flexible working arrangements to the rare opportunity of shaping a university from first principles, a career at Artemis is an invitation to build something that has never existed before.
              </p>
              <button
                onClick={() => goToPage('jobs')}
                className="flex items-center space-x-4 py-2 border-b-2 border-[#8A0000] text-[#8A0000] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-black hover:border-black transition-all group"
              >
                <span>View Open Positions</span>
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

            {/* Right — Additional info */}
            <div>
              <div className="border-l-2 border-[#8A0000] pl-6 mb-10">
                <h3 className="text-[18px] font-bold text-[#141414] mb-3">
                  Why Artemis?
                </h3>
                <p className="text-[14px] text-gray-600 leading-relaxed">
                  We offer more than a job. We offer a place in a global intellectual movement — where your work reverberates across continents and your colleagues are among the most brilliant minds on the planet.
                </p>
              </div>
              <div className="space-y-0">
                {[
                  { label: 'Benefits & compensation', page: 'jobs' },
                  { label: 'Diversity & inclusion', page: 'about' },
                  { label: 'Professional development', page: 'education' },
                  { label: 'Artemis culture & values', page: 'about' },
                ].map((link, i) => (
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
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
