'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';
import { ArrowRight, Lightbulb, FlaskConical, Users, Rocket, Building2, ChevronRight, ExternalLink } from 'lucide-react';

interface InnovationProps {
  goToPage: (page: string) => void;
}

/* ─── Data ─── */

const portfolioCompanies = [
  {
    name: 'Helix Diagnostics',
    channel: 'AI + Health',
    desc: 'AI-powered molecular diagnostics platform that reduces testing turnaround from days to hours. Built on Artemis research in synthetic biology and machine learning, Helix enables point-of-care clinicians to identify pathogens and recommend treatment in under thirty minutes.',
    status: 'Launched',
    founded: '2025',
    img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'FerroGrid',
    channel: 'Clean Energy',
    desc: 'Next-generation wide-bandgap semiconductor power supply units for AI data centres and high-density computing. FerroGrid\'s GaN transistor technology, derived from Artemis fusion energy research, delivers 40% greater energy efficiency than conventional silicon-based systems.',
    status: 'In Development',
    founded: '2025',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'Aether Propulsion',
    channel: 'Clean Energy',
    desc: 'Satellite propulsion systems leveraging superconducting magnet technology originally developed for Artemis fusion research. Aether\'s thrusters deliver higher specific impulse at lower power draw, enabling longer satellite missions and deeper-space capability.',
    status: 'In Development',
    founded: '2026',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'Meridian Health',
    channel: 'AI + Health',
    desc: 'Patient-centred health records platform that uses AI to personalise and humanise clinical data. Meridian transforms raw EHR inputs into narratives that patients understand and trust, closing the communication gap between providers and the people they serve.',
    status: 'Launched',
    founded: '2025',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'CarbonLock',
    channel: 'Climate',
    desc: 'Permanent carbon capture materials derived from Artemis geothermal and materials science research. CarbonLock\'s mineralisation process sequesters CO2 into stable rock forms at ambient temperature, offering a scalable pathway to negative emissions without energy-intensive compression.',
    status: 'Proto',
    founded: '2026',
    img: 'https://images.unsplash.com/photo-1569163139394-de4e5f43e5ca?auto=format&fit=crop&q=80&w=600',
  },
];

const modelPhases = [
  {
    number: '01',
    name: 'Define',
    desc: 'A venture channel is defined through sponsorship and strategic alignment. Artemis works with partners to identify urgent problem spaces and map the technology landscape — creating a focused hunting ground for new ventures.',
    icon: Lightbulb,
  },
  {
    number: '02',
    name: 'Discover',
    desc: 'A Venture Builder is recruited and embedded deep within Artemis research labs. Over approximately six months, they systematically scout technologies, interview faculty, assess intellectual property, and identify market needs — building a living map of opportunity.',
    icon: FlaskConical,
  },
  {
    number: '03',
    name: 'Explore',
    desc: 'Venture Builders form teams with Venture Fellows, faculty advisors, and industry collaborators. Together they rapidly prototype low-fidelity technical and market solutions to the most promising problems, advancing the best fits through a rigorous stage-gate process.',
    icon: Users,
  },
  {
    number: '04',
    name: 'Build',
    desc: 'Selected ventures receive dedicated prototyping funding, hands-on mentorship, and access to Artemis labs and infrastructure. Venture Fellows join full-time to de-risk technical assumptions and validate commercial viability — iterating from concept to working prototype.',
    icon: Building2,
  },
  {
    number: '05',
    name: 'Launch',
    desc: 'The strongest Proto Ventures become independent companies launched from Artemis. Founders receive continued advisory support, access to the Artemis investor network, and pathways to follow-on funding — achieving escape velocity as world-changing ventures.',
    icon: Rocket,
  },
];

const teamMembers = [
  {
    name: 'Dr. Elena Vasquez',
    role: 'Managing Director',
    desc: 'Former partner at a leading deep-tech venture firm. Oversees all studio operations, channel strategy, and venture formation. Lectures on venture design at the Artemis Collegium.',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
  },
  {
    name: 'Dr. Kwame Asante',
    role: 'Venture Builder, AI + Health',
    desc: 'Physician-scientist and serial entrepreneur. Embedded within the Artemis Center for Computational Biology, scouting breakthroughs at the intersection of machine learning and clinical medicine.',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
  },
  {
    name: 'Dr. Yuki Tanaka',
    role: 'Venture Builder, Clean Energy',
    desc: 'Nuclear engineer and former CTO of a fusion energy startup. Based at the Artemis Energy Systems Lab, identifying commercial pathways from fusion and advanced energy research.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
  },
  {
    name: 'Prof. Mariam Osei',
    role: 'Faculty Director',
    desc: 'Chair of Innovation and Entrepreneurship at the Artemis Collegium. Former Director of Technology Transfer at a leading research university. Guides venture selection and stage-gate reviews.',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
  },
  {
    name: 'James Chen',
    role: 'Venture Builder, Climate',
    desc: 'Climate scientist turned venture builder with a decade of experience in carbon capture and geothermal energy. Embedded in the Artemis Earth Systems Programme, seeking ventures that accelerate the energy transition.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
  },
  {
    name: 'Dr. Amina Khalil',
    role: 'Head of Fellows Programme',
    desc: 'Bioengineer and former startup founder. Recruits and mentors the Venture Fellows who form the founding teams of Proto Ventures, ensuring every team combines deep technical expertise with entrepreneurial drive.',
    img: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&q=80&w=300',
  },
];

const ventureStats = [
  { value: '3', label: 'Active Channels', detail: 'AI + Health, Clean Energy, Climate' },
  { value: '5', label: 'Portfolio Companies', detail: 'Two launched, three in development' },
  { value: '12+', label: 'Venture Fellows', detail: 'Recruited per semester across all channels' },
  { value: '$0', label: 'Equity Taken', detail: 'We don\'t take equity from our ventures' },
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
export default function Innovation({ goToPage }: InnovationProps) {
  const aboutAnim = useInView();
  const portfolioAnim = useInView();
  const modelAnim = useInView();
  const peopleAnim = useInView();
  const statsAnim = useInView();
  const [activePhase, setActivePhase] = useState(0);

  const activeSection = useActiveSection(['about', 'portfolio', 'model', 'people']);

  return (
    <div className="flex flex-col bg-white">
      {/* ── 1. HERO ── */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[50vh] min-h-[420px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1800"
              className="absolute inset-0 w-full h-full object-cover"
              alt="Artemis Venture Studio"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a0505]/90 via-[#1a0505]/50 to-[#1a0505]/20" />
            <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
              <div className="mb-8 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#D97706]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D97706]">
                  Artemis Venture Studio
                </span>
              </div>
              <h1 className="text-[32px] sm:text-[44px] md:text-[60px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6">
                Translating ideas<br />into impactful ventures
              </h1>
              <p className="text-[18px] text-white/85 max-w-xl leading-relaxed font-light">
                The first venture studio of its kind within a university. We combine translation
                expertise and deep research access to identify, build, and launch startups from
                Artemis technology — deliberately, not by chance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={[
          { id: 'about', label: 'About' },
          { id: 'portfolio', label: 'Portfolio' },
          { id: 'model', label: 'Our Model' },
          { id: 'people', label: 'People' },
        ]}
        activeSection={activeSection}
      />

      {/* ── 2. ABOUT ── */}
      <section id="about" className="scroll-mt-[110px] max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 py-16 lg:py-24">
        <div
          ref={aboutAnim.ref}
          className={`transition-all duration-700 ${aboutAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              About the Studio
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Problems first,<br />not technology push
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Many potentially world-changing inventions remain on the lab room floor. Artemis
                Venture Studio exists to change that. We seek out the world&apos;s hardest problems
                and deliberately build ventures to solve them — replacing serendipity with a
                repeatable, rigorous process.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Unlike traditional accelerators or incubators, we do not wait for founders to walk
                through the door. Our Venture Builders are embedded inside Artemis research labs,
                scouting breakthroughs at the source. They combine deep technical expertise with
                market knowledge to identify opportunities that would otherwise go unrecognised.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                Critically, we do not take equity from the ventures we create. Our mission is to
                maximise the translation of Artemis research into real-world impact — not to capture
                financial upside. This alignment with founders, not against them, is what makes the
                studio model uniquely powerful within a university setting.
              </p>

              {/* Key differentiators */}
              <div className="space-y-4">
                {[
                  { label: 'Problem-first', detail: 'We start with urgent problems, not technology looking for a market.' },
                  { label: 'Embedded in labs', detail: 'Venture Builders work alongside researchers, not from the outside.' },
                  { label: 'No equity taken', detail: 'Our incentive is impact, not ownership.' },
                  { label: 'Deliberate process', detail: 'Repeatable, stage-gated methodology replaces chance.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-[#8A0000] mt-2 shrink-0" />
                    <div>
                      <span className="text-[14px] font-bold text-[#141414]">{item.label}</span>
                      <span className="text-[14px] text-gray-500"> — {item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — image + stats */}
            <div className="space-y-8">
              <div className="group">
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=1000"
                    alt="Venture Studio collaboration"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div
                ref={statsAnim.ref}
                className={`grid grid-cols-2 gap-6 transition-all duration-700 ${statsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                {ventureStats.map((stat, i) => (
                  <div key={i} className="border-l-2 border-[#8A0000] pl-5">
                    <div className="text-[36px] font-black text-[#141414] leading-none mb-1 tabular-nums">{stat.value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">{stat.label}</div>
                    <div className="text-[12px] text-gray-500 leading-snug">{stat.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PORTFOLIO ── */}
      <section id="portfolio" className="scroll-mt-[110px] bg-gray-50 py-16 lg:py-24">
        <div
          ref={portfolioAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${portfolioAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Portfolio
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            Ventures launched<br />from Artemis research
          </h2>
          <p className="text-[16px] text-gray-500 max-w-2xl leading-relaxed font-light mb-12">
            Each portfolio company began as a research insight that the Venture Studio identified,
            shaped, and accelerated toward independence. We measure success not just by funding
            raised, but by the additionality we provide — would this venture exist without us?
          </p>

          <div className="space-y-8">
            {portfolioCompanies.map((company, i) => (
              <div
                key={company.name}
                className="bg-white border border-gray-200 hover:border-[#8A0000] transition-colors group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-0">
                  <div className="aspect-[4/3] lg:aspect-auto overflow-hidden bg-gray-100">
                    <img
                      src={company.img}
                      alt={company.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="p-6 lg:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 ${
                        company.status === 'Launched'
                          ? 'bg-green-50 text-green-700'
                          : company.status === 'In Development'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {company.status}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">
                        {company.channel}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400">Est. {company.founded}</span>
                    </div>
                    <h3 className="text-[22px] font-bold text-[#141414] mb-3 group-hover:text-[#8A0000] transition-colors leading-tight">
                      {company.name}
                    </h3>
                    <p className="text-[15px] text-gray-600 leading-relaxed">{company.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. OUR MODEL ── */}
      <section id="model" className="scroll-mt-[110px] py-16 lg:py-24">
        <div
          ref={modelAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${modelAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Our Model
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            From problem to venture,<br />deliberately
          </h2>
          <p className="text-[16px] text-gray-500 max-w-2xl leading-relaxed font-light mb-12">
            Our five-phase framework ensures that every venture we launch is built on a real need,
            grounded in world-class research, and de-risked through disciplined iteration. Click
            each phase to learn more.
          </p>

          {/* Phase selector */}
          <div className="flex flex-wrap gap-2 mb-10">
            {modelPhases.map((phase, i) => (
              <button
                key={phase.name}
                onClick={() => setActivePhase(i)}
                className={`px-5 py-3 text-[12px] font-bold uppercase tracking-widest transition-all ${
                  activePhase === i
                    ? 'bg-[#8A0000] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {phase.number} — {phase.name}
              </button>
            ))}
          </div>

          {/* Phase content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#8A0000]/10 flex items-center justify-center">
                    {(() => {
                      const Icon = modelPhases[activePhase].icon;
                      return <Icon size={28} className="text-[#8A0000]" />;
                    })()}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">Phase {modelPhases[activePhase].number}</div>
                    <h3 className="text-[28px] font-extrabold text-[#141414] tracking-tight leading-none">
                      {modelPhases[activePhase].name}
                    </h3>
                  </div>
                </div>
                <p className="text-[16px] text-gray-600 leading-relaxed mb-8">
                  {modelPhases[activePhase].desc}
                </p>

                {/* Visual progress line */}
                <div className="flex items-center gap-2">
                  {modelPhases.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 transition-colors duration-300 ${
                        i <= activePhase ? 'bg-[#8A0000]' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {modelPhases.map((p, i) => (
                    <span
                      key={i}
                      className={`text-[9px] font-bold uppercase tracking-wider ${
                        i <= activePhase ? 'text-[#8A0000]' : 'text-gray-300'
                      }`}
                    >
                      {p.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — illustration */}
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                <img
                  src={
                    activePhase === 0
                      ? 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
                      : activePhase === 1
                      ? 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
                      : activePhase === 2
                      ? 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
                      : activePhase === 3
                      ? 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800'
                      : 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800'
                  }
                  alt={`Phase ${modelPhases[activePhase].name}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Additionality callout */}
          <div className="mt-16 bg-gray-50 p-8 lg:p-12 border-l-4 border-[#8A0000]">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#8A0000]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                Our North Star Metric
              </span>
            </div>
            <h3 className="text-[24px] font-extrabold text-[#141414] mb-3 tracking-tight">Additionality</h3>
            <p className="text-[16px] text-gray-600 leading-relaxed max-w-3xl">
              The single most important question we ask at every stage gate: <em>Would this venture
              exist without the Venture Studio?</em> If the answer is yes — if the founders and the
              technology would have found each other regardless — then we have not added value. Our
              goal is to create ventures that would not otherwise exist, translating research into
              impact that the market alone would leave behind.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. PEOPLE ── */}
      <section id="people" className="scroll-mt-[110px] bg-gray-50 py-16 lg:py-24">
        <div
          ref={peopleAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${peopleAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              People
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            The team behind<br />the ventures
          </h2>
          <p className="text-[16px] text-gray-500 max-w-2xl leading-relaxed font-light mb-12">
            Our Venture Builders are the engine of the studio. They combine the technical depth of a
            postdoc, the hustle of a startup founder, and the market intuition of a venture
            investor. They are embedded in labs, not offices — and they build companies, not
            presentations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <div
                key={member.name}
                className="bg-white border border-gray-200 hover:border-[#8A0000] transition-colors group overflow-hidden"
              >
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-2">
                    {member.role}
                  </div>
                  <h3 className="text-[20px] font-bold text-[#141414] mb-3 group-hover:text-[#8A0000] transition-colors leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-[14px] text-gray-600 leading-relaxed">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Roles summary */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-[20px] font-bold text-[#141414] mb-6 tracking-tight">How the team works</h3>
              <div className="space-y-6">
                {[
                  { role: 'Venture Builder', desc: 'Full-time, funded position. Deep technical expertise plus market knowledge. Embedded in research labs for 1-2 years. Drives new venture formation, leads team building, and oversees Fellows. Expected to join a resulting venture as senior leadership.' },
                  { role: 'Venture Fellow', desc: 'Postdocs and graduate students with deep-tech backgrounds and the passion to change the world. 5-7 recruited per semester. Many join Proto Ventures full-time as co-founders. Unpaid fellowship with unmatched access to Artemis research and mentorship.' },
                  { role: 'Faculty Advisors', desc: 'Source of big ideas and technologies. Most act as technical advisors and consultants to Proto Ventures, providing domain expertise and access to lab infrastructure that no outside startup could replicate.' },
                  { role: 'Advisory Board', desc: 'Per-channel group of industry experts and senior faculty. Defines focus areas, approves ideas moving through each stage gate, and selects projects for dedicated prototyping funding.' },
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-[#8A0000] pl-5">
                    <h4 className="text-[15px] font-bold text-[#141414] mb-1">{item.role}</h4>
                    <p className="text-[14px] text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-8 lg:p-10">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-3">
                The Ideal Venture Builder
              </div>
              <h3 className="text-[20px] font-bold text-[#141414] mb-6 tracking-tight">
                One-third postdoc, one-third founder, one-third investor
              </h3>
              <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
                The best Venture Builders are not career academics, nor are they pure business
                operators. They sit at the intersection of deep technical knowledge, entrepreneurial
                instinct, and market sophistication — rare individuals who can read a research paper
                and a term sheet with equal fluency.
              </p>
              <div className="space-y-3">
                {[
                  'Compensated like a VC associate, autonomy like a PI',
                  'IP rights like a postdoc, leadership like a founder',
                  'Dedicated budget to create teams and run projects',
                  'Expected to join a resulting venture as senior management',
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8A0000] mt-2 shrink-0" />
                    <span className="text-[14px] text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => goToPage('about')}
                className="mt-8 flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#8A0000] text-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors group"
              >
                <span>Join the Studio</span>
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CRIMSON CTA BAR ── */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <div className="bg-[#8A0000] px-8 py-16 md:px-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-white mb-2">
                Ready to build?
              </h2>
              <p className="text-[16px] text-white/70 leading-relaxed max-w-lg">
                Whether you&apos;re a researcher with a breakthrough, an entrepreneur seeking
                deep-tech opportunity, or a corporation wanting to sponsor a channel — Artemis
                Venture Studio is your launchpad.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <button
                onClick={() => goToPage('fundraising')}
                className="flex items-center space-x-3 bg-white text-[#8A0000] px-8 py-4 text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors group"
              >
                <span>Sponsor a Channel</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button
                onClick={() => goToPage('about')}
                className="flex items-center space-x-3 border border-white text-white px-8 py-4 text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#8A0000] transition-colors group"
              >
                <span>Join as a Builder</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
