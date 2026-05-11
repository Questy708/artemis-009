'use client';

import { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import SubPageFooter from '@/components/artemis/SubPageFooter';

interface Props {
  goToPage: (page: string) => void;
}

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

/* ─── Data ─── */
const foundingMembers = [
  {
    name: 'Valletta College',
    city: 'Malta',
    focus: ['Governance', 'Policy', 'Central Administration'],
    desc: 'The flagship college and central governance hub. Valletta houses the Chancellor\'s Office and coordinates academic synchronisation across the entire network.',
    image: 'https://images.unsplash.com/photo-1548585744-4e0e9a624e69?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'Kigali College',
    city: 'Rwanda',
    focus: ['Sustainable Technology', 'Urban Innovation', 'African Studies'],
    desc: 'A centre for sustainable development and community-driven innovation, serving as Artemis\'s primary presence on the African continent.',
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'Berlin College',
    city: 'Germany',
    focus: ['Creative Industries', 'Innovation', 'Startup Ecosystem'],
    desc: 'The European innovation hub, connecting Artemis research to the Berlin startup ecosystem and the creative economy of continental Europe.',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'San Francisco College',
    city: 'United States',
    focus: ['Silicon Innovation', 'Technology Transfer', 'Venture Partnerships'],
    desc: 'Anchoring Artemis on the Pacific coast, this college bridges academic research and the technology industry through translational partnerships.',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'Tokyo College',
    city: 'Japan',
    focus: ['Robotics', 'Advanced Manufacturing', 'Physical Autonomy'],
    desc: 'The Pacific research node, bringing together expertise in robotics, mechatronics, and advanced manufacturing with Japan\'s engineering tradition.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=600',
  },
];

const howItWorks = [
  {
    number: '01',
    label: 'CONTRIBUTION',
    desc: 'Each member college contributes faculty and student cohorts to the collective academic pool, enriching the curriculum with local expertise grounded in global standards.',
  },
  {
    number: '02',
    label: 'INFRASTRUCTURE',
    desc: 'Artemis provides unified digital infrastructure — the Guild system, Artemis Commons, and shared research cloud — so each college can focus on teaching and research rather than building administrative systems.',
  },
  {
    number: '03',
    label: 'ACCREDITATION',
    desc: 'All member colleges award degrees under a single Artemis accreditation charter, ensuring that every graduate holds a globally recognised credential regardless of which node they attended.',
  },
];

const stats = [
  { value: '5', label: 'Founding Colleges', detail: 'Active nodes across the globe' },
  { value: '4', label: 'Continents', detail: 'Spanning every major region' },
  { value: 'ECTS', label: 'Unified Credit Mapping', detail: 'Fully transferable across nodes' },
  { value: '1', label: 'Accredited Degree', detail: 'Recognised globally' },
];

/* ─── Component ─── */
export default function CollegiumAlliance({ goToPage }: Props) {
  const overviewAnim = useInView();
  const membersAnim = useInView();
  const howAnim = useInView();
  const statsAnim = useInView();
  const parallaxAnim = useInView();

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      {/* ── 1. Sticky Breadcrumb Header ── */}
      <div className="sticky top-[50px] z-40 bg-white border-b border-gray-100 flex items-center px-6 lg:px-16 shrink-0 h-[60px] shadow-sm">
        <button
          onClick={() => goToPage('about')}
          className="text-[12px] font-bold uppercase tracking-widest text-[#8A0000] hover:text-black mr-4"
        >
          About
        </button>
        <div className="text-gray-300 mr-4">/</div>
        <h2 className="text-[14px] font-bold tracking-tight text-black whitespace-nowrap">
          Collegium Alliance
        </h2>
      </div>

      {/* ── 2. Hero Section ── */}
      <section className="relative w-full h-[55vh] min-h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1800"
          className="absolute inset-0 w-full h-full object-cover grayscale"
          alt="Collegium Alliance"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1000px] mx-auto w-full px-6 lg:px-16 pb-16">
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Alliance</span>
          </div>
          <h1 className="text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6">
            Collegium Alliance
          </h1>
          <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
            A federated alliance of founding institutions — each autonomous in identity, united in purpose — co-creating the academic scaffolds of a new kind of university.
          </p>
        </div>
      </section>

      {/* ── 3. Overview Section ── */}
      <section className="max-w-[1000px] mx-auto w-full px-6 lg:px-16 py-20">
        <div
          ref={overviewAnim.ref}
          className={`transition-all duration-700 ${overviewAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section divider */}
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">The Network</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Left — Rich text */}
            <div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Stronger together
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                The Collegium Alliance is the foundational pact that binds the founding micro-colleges of the Artemis Collegium Network. Rather than a top-down institution imposing uniformity, the Alliance is a bottom-up federation — each member retains full autonomy over its identity, academic specialisation, and cultural character while committing to shared standards, mutual support, and collective advancement.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                In practice, this means that a student attending Kigali College and another attending Berlin College follow the same rigorous curriculum framework and graduate with the same globally recognised degree — yet their day-to-day experience reflects the unique strengths, faculty, and cultural context of their respective nodes.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed">
                The Alliance is not merely a network of branch campuses. Each college is a founding partner — a co-creator of the university itself — with genuine influence over institutional direction, curriculum design, and research priorities. This is governance by contribution, not by hierarchy.
              </p>
            </div>

            {/* Right — Quote */}
            <div className="pt-4">
              <blockquote className="border-l-4 border-[#8A0000] pl-8 py-2">
                <p className="text-[20px] md:text-[22px] text-[#141414] leading-relaxed font-normal italic mb-6">
                  &ldquo;The Collegium Alliance is not a merger — it is a multiplication. Each member retains its identity while gaining the infrastructure of a global university.&rdquo;
                </p>
                <footer className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A0000]">
                  — Artemis Founding Principle
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Founding Members Grid ── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-[1000px] mx-auto w-full px-6 lg:px-16">
          <div
            ref={membersAnim.ref}
            className={`transition-all duration-700 ${membersAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Section divider */}
            <div className="relative flex items-center mb-16">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Founding Members</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-16">
              The founding five
            </h2>

            {/* First row: 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {foundingMembers.slice(0, 3).map((member, i) => (
                <div key={member.name} className="group bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin size={14} className="text-[#8A0000]" />
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#8A0000]">{member.city}</span>
                    </div>
                    <h3 className="text-[20px] font-bold text-[#141414] mb-3 group-hover:text-[#8A0000] transition-colors leading-tight">
                      {member.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.focus.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-gray-100 px-2 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-[14px] text-gray-600 leading-relaxed">
                      {member.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Second row: 2 cards centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[680px] mx-auto">
              {foundingMembers.slice(3, 5).map((member) => (
                <div key={member.name} className="group bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin size={14} className="text-[#8A0000]" />
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#8A0000]">{member.city}</span>
                    </div>
                    <h3 className="text-[20px] font-bold text-[#141414] mb-3 group-hover:text-[#8A0000] transition-colors leading-tight">
                      {member.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.focus.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-gray-100 px-2 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-[14px] text-gray-600 leading-relaxed">
                      {member.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. How the Alliance Works ── */}
      <section className="max-w-[1000px] mx-auto w-full px-6 lg:px-16 py-20">
        <div
          ref={howAnim.ref}
          className={`transition-all duration-700 ${howAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section divider */}
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">How It Works</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-16">
            Shared scaffolds, independent minds
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorks.map((item) => (
              <div key={item.number} className="group">
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-4">
                  {item.number} — {item.label}
                </div>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Stats Section ── */}
      <section className="bg-gray-50 py-20 px-6 lg:px-16">
        <div className="max-w-[1000px] mx-auto">
          <div
            ref={statsAnim.ref}
            className={`transition-all duration-700 ${statsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="mb-8 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">By the Numbers</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  <div className="text-[42px] font-black text-[#141414] leading-none mb-3 tabular-nums">{stat.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">{stat.label}</div>
                  <div className="text-[12px] text-gray-500 leading-snug">{stat.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Card-and-Image Parallax Section ── */}
      <section className="py-20 px-6 lg:px-16">
        <div className="max-w-[1000px] mx-auto">
          <div
            ref={parallaxAnim.ref}
            className={`transition-all duration-700 ${parallaxAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="relative w-full min-h-[380px] md:min-h-[460px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523240715630-34360e206004?auto=format&fit=crop&q=80&w=1400"
                alt="Join the Alliance"
                className="absolute inset-0 w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              <div className="relative z-10 flex items-end h-full min-h-[380px] md:min-h-[460px] p-8 md:p-14">
                <div className="bg-white max-w-sm p-8 shadow-xl">
                  <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">
                    Join the Alliance
                  </div>
                  <h3 className="text-[24px] font-bold text-[#141414] mb-3 leading-tight">
                    Building the future, together
                  </h3>
                  <p className="text-[14px] text-gray-600 leading-relaxed mb-5">
                    The Collegium Alliance is actively seeking founding members — institutions with distinctive expertise and a commitment to reimagining higher education. If your organisation shares our conviction that knowledge should have no borders, we want to hear from you.
                  </p>
                  <button
                    onClick={() => goToPage('contact-us')}
                    className="flex items-center space-x-3 text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#8A0000] text-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors group"
                  >
                    <span>Express Interest</span>
                    <svg className="group-hover:translate-x-2 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Crimson CTA Bar ── */}
      <section className="bg-[#8A0000] py-16">
        <div className="max-w-[1000px] mx-auto w-full px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-[32px] md:text-[40px] font-extrabold leading-tight tracking-tighter text-white mb-2">
              Ready to join the Alliance?
            </h2>
            <p className="text-[16px] text-white/70 leading-relaxed max-w-lg">
              Whether you represent an institution, a research centre, or a community of scholars — there is a place in the Artemis Collegium Network for you.
            </p>
          </div>
          <button
            onClick={() => goToPage('contact-us')}
            className="flex items-center space-x-3 bg-white text-[#8A0000] px-8 py-4 text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors shrink-0 group"
          >
            <span>Get in Touch</span>
            <svg className="group-hover:translate-x-2 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      </section>

      {/* ── 9. SubPageFooter ── */}
      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
