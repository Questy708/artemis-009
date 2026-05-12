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
    <div className="flex flex-col bg-white">
      <div className="mb-8 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Network</span>
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="mb-8 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Founding Members</span>
            </div>

            <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-16">
              The founding five
            </h2>

            <div className="mb-8 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">How It Works</span>
            </div>

          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-16">
            Shared scaffolds, independent minds
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* ── 6. Stats Section ── */}
      <section id="nodes" className="bg-gray-50 py-16 lg:py-24 px-8 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <div
            ref={statsAnim.ref}
            className={`transition-all duration-700 ${statsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="mb-8 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">By the Numbers</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
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
      <section className="py-16 lg:py-24 px-8 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <div
            ref={parallaxAnim.ref}
            className={`transition-all duration-700 ${parallaxAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="max-w-[1600px] mx-auto">
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
        </div>
      </section>

      {/* ── 8. Crimson CTA Bar ── */}
      <section className="bg-[#8A0000] py-16">
        <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-8">
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
