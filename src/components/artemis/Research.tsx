'use client';

import { useState, useEffect, useRef } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';

interface ResearchProps {
  goToPage: (page: string) => void;
}

/* ─── Data ─── */
const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600', alt: 'Laboratory research' },
  { src: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=600', alt: 'Scientific collaboration' },
  { src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600', alt: 'Robotics and AI' },
  { src: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=600', alt: 'Medical research' },
];

const joinLinks = [
  { icon: '🤝', label: 'Donate to Research', desc: 'Support groundbreaking discovery', page: 'fundraising' },
  { icon: '🔗', label: 'Partner With Us', desc: 'Industry & academic collaboration', page: 'innovation' },
  { icon: '🔬', label: 'Student Researcher', desc: 'Undergraduate & graduate opportunities', page: 'education' },
  { icon: '🌍', label: 'Participate in a Study', desc: 'Community-engaged research', page: 'about' },
  { icon: '📅', label: 'Research Events', desc: 'Symposia, lectures & workshops', page: 'campus' },
  { icon: '💼', label: 'Research Careers', desc: 'Faculty & staff positions', page: 'jobs' },
];

const featuredProjects = [
  {
    title: 'The Synthetic Humanity Project',
    desc: 'Exploring the ethical and biological integration of AI into human cognition — a multi-disciplinary initiative spanning neuroscience, philosophy, and computational engineering.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1400',
  },
  {
    title: 'Bio-Regenerative Systems Initiative',
    desc: 'Pioneering closed-loop biological systems that sustain human life in extreme environments — from deep-sea habitats to extraterrestrial colonies.',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=1400',
  },
  {
    title: 'Cosmological Data Observatory',
    desc: 'Processing petabytes of telescope data with novel AI algorithms to map the large-scale structure of the universe and detect signatures of new physics.',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1400',
  },
];

const researchStats = [
  { value: '$847M', label: 'Research Expenditure', detail: 'Annual spend across all centers' },
  { value: '#1', label: 'Most Innovative', detail: 'Global University Index 2025' },
  { value: '#1', label: 'Transdisciplinary Output', detail: 'Cross-field publications worldwide' },
  { value: '#3', label: 'AI & Society Impact', detail: 'Ranking for AI-ethics research' },
];

const highlightCards = [
  {
    title: 'Space to Innovate',
    desc: 'Over 400,000 sq ft of dedicated research space across three continents — from wet labs to quantum computing cleanrooms — designed to let ideas breathe and grow without constraint.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Solving Wicked Problems',
    desc: 'Artemis researchers tackle problems that refuse to stay within disciplinary borders: climate adaptation, pandemic preparedness, autonomous governance, and the ethics of cognitive enhancement.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Empowering Entrepreneurs',
    desc: 'With 120+ spin-offs launched in the past five years, Artemis translates discovery into impact. Our venture pipeline moves from bench to market faster than any peer institution.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800',
  },
];

const learnMoreLinks = [
  {
    heading: 'Research Offices',
    links: ['Office of the Vice-Provost for Research', 'Research Integrity & Compliance', 'Grant & Contract Services', 'Research Communications'],
  },
  {
    heading: 'For Researchers',
    links: ['Funding Opportunities', 'Research Data Management', 'Lab Safety & Protocols', 'Faculty Mentorship Programs'],
  },
  {
    heading: 'For Partners',
    links: ['Industry Collaboration Portal', 'Licensing & Tech Transfer', 'Sponsored Research Agreements', 'Innovation District Tenancy'],
  },
  {
    heading: 'Connect',
    links: ['Research Newsletter', 'Annual Research Report', 'Contact the Knowledge Enterprise', 'Research Social Media'],
  },
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
export default function Research({ goToPage }: ResearchProps) {
  const [activeGallery, setActiveGallery] = useState(0);
  const heroAnim = useInView();
  const joinAnim = useInView();
  const statsAnim = useInView();
  const highlightsAnim = useInView();
  const facilitiesAnim = useInView();

  // Auto-cycle gallery
  useEffect(() => {
    const timer = setInterval(() => setActiveGallery(i => (i + 1) % galleryImages.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      {/* ── Sticky Sub-header with Anchor Nav ── */}
      <div className="sticky top-[50px] z-40 h-[60px] bg-white border-b border-gray-100 flex items-center px-6 lg:px-16 shrink-0 overflow-x-auto hide-scrollbar shadow-sm">
        <h2 className="text-[14px] font-bold tracking-tight text-[#8A0000] mr-10 whitespace-nowrap">
          Research at Artemis
        </h2>
        <div className="flex space-x-6 shrink-0 text-[12px] font-bold uppercase tracking-widest text-gray-400">
          <a href="#join" className="hover:text-black transition-colors">Join Us</a>
          <a href="#growth" className="hover:text-black transition-colors">Growth &amp; Impact</a>
          <a href="#highlights" className="hover:text-black transition-colors">Highlights</a>
          <a href="#learn" className="hover:text-black transition-colors">Learn More</a>
        </div>
      </div>

      {/* ── 1. HERO — Full-bleed image with overlay text ── */}
      <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=1800"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Research at Artemis"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1200px] mx-auto w-full px-6 lg:px-16 pb-16">
          <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-white/70 mb-4">Research &amp; Innovation</p>
          <h1 className="text-[44px] md:text-[60px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6">
            Research and innovation<br />at Artemis
          </h1>
          <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
            We believe discovery is a public good. Artemis invests boldly in research that redefines what a university can be — inclusive, use-inspired, and unbounded by convention.
          </p>
        </div>
      </section>

      {/* ── 2. REVOLUTIONIZING THE RESEARCH ENTERPRISE — two-column ── */}
      <section className="max-w-[1200px] mx-auto w-full px-6 lg:px-16 py-20">
        <div
          ref={heroAnim.ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start transition-all duration-700 ${heroAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Left — Text */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000] mb-6">Our Approach</p>
            <h2 className="text-[36px] md:text-[44px] font-extrabold leading-[1.1] tracking-tighter text-gray-900 mb-8">
              Revolutionizing the research enterprise
            </h2>
            <p className="text-[18px] text-gray-600 leading-relaxed mb-6">
              At Artemis, research is not a siloed activity confined to laboratories — it is a collective endeavor woven into the fabric of everything we do. We prioritize high-impact, use-inspired projects that address the core existential challenges of our time, from climate resilience to cognitive augmentation.
            </p>
            <p className="text-[18px] text-gray-600 leading-relaxed mb-8">
              Our model rejects the traditional boundaries between pure and applied research. Instead, every inquiry begins with a question that matters to real communities and ends with knowledge that can be deployed, scaled, and shared. This is research with a conscience — and with consequences.
            </p>
            <button
              onClick={() => goToPage('innovation')}
              className="text-[11px] font-bold uppercase tracking-widest border border-[#8A0000] text-[#8A0000] px-8 py-3 hover:bg-[#8A0000] hover:text-white transition-colors"
            >
              Explore Our Model
            </button>
          </div>

          {/* Right — Image Gallery Carousel */}
          <div className="relative">
            <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden">
              {galleryImages.map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === activeGallery ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}
            </div>
            {/* Gallery indicators */}
            <div className="flex space-x-2 mt-4">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveGallery(i)}
                  className={`w-10 h-1 transition-all ${i === activeGallery ? 'bg-[#8A0000]' : 'bg-gray-300'}`}
                />
              ))}
            </div>
            {/* Thumbnail row */}
            <div className="grid grid-cols-4 gap-2 mt-3">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveGallery(i)}
                  className={`aspect-[4/3] overflow-hidden border-2 transition-all ${i === activeGallery ? 'border-[#8A0000]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. BE A PART OF ARTEMIS RESEARCH — grid links ── */}
      <section id="join" className="scroll-mt-24 bg-gray-50 py-20">
        <div
          ref={joinAnim.ref}
          className={`max-w-[1200px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${joinAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000] mb-4">Get Involved</p>
          <h2 className="text-[36px] md:text-[44px] font-extrabold leading-[1.1] tracking-tighter text-gray-900 mb-12">
            Be a part of Artemis research
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => goToPage(link.page)}
                className="group bg-white border border-gray-200 p-8 text-left hover:border-[#8A0000] hover:shadow-lg transition-all"
              >
                <span className="text-3xl mb-4 block">{link.icon}</span>
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#8A0000] transition-colors">{link.label}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{link.desc}</p>
                <div className="mt-4 text-[11px] font-bold uppercase tracking-widest text-black group-hover:text-[#8A0000] transition-colors">
                  Learn More →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FEATURED PROJECTS — animated sections with background images ── */}
      <section className="py-0">
        {featuredProjects.map((project, i) => {
          const anim = useInView(0.1);
          return (
            <div
              key={i}
              ref={anim.ref}
              className={`relative w-full min-h-[60vh] flex items-center transition-all duration-700 overflow-hidden ${anim.visible ? 'opacity-100' : 'opacity-0'}`}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
              </div>
              {/* Content */}
              <div className={`relative z-10 max-w-[1200px] mx-auto w-full px-6 lg:px-16 py-20 transition-all duration-700 delay-200 ${anim.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60 mb-4">Featured Project 0{i + 1}</p>
                <h3 className="text-[32px] md:text-[44px] font-extrabold leading-[1.1] tracking-tighter text-white mb-6 max-w-xl">
                  {project.title}
                </h3>
                <p className="text-[16px] text-white/80 leading-relaxed max-w-lg mb-8">
                  {project.desc}
                </p>
                <button
                  onClick={() => goToPage('innovation')}
                  className="text-[11px] font-bold uppercase tracking-widest border border-white text-white px-8 py-3 hover:bg-white hover:text-[#8A0000] transition-colors"
                >
                  Read More
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* ── 5. RESEARCH GROWTH & IMPACT — stats + sidebar ── */}
      <section id="growth" className="scroll-mt-24 bg-[#0a0a0a] text-white py-20">
        <div
          ref={statsAnim.ref}
          className={`max-w-[1200px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${statsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main content — 8 cols */}
            <div className="lg:col-span-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000] mb-4">By the Numbers</p>
              <h2 className="text-[36px] md:text-[44px] font-extrabold leading-[1.1] tracking-tighter mb-6">
                Research growth and impact
              </h2>
              <p className="text-[18px] text-gray-400 leading-relaxed mb-12 max-w-2xl">
                Artemis has sustained double-digit growth in research expenditure for seven consecutive years — fueled by strategic investment in people, infrastructure, and the radical idea that every discipline can serve the public good.
              </p>
              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                {researchStats.map((stat, i) => (
                  <div key={i} className="border-l-2 border-[#8A0000] pl-4">
                    <div className="text-[36px] md:text-[44px] font-black leading-none mb-2 tracking-tight">{stat.value}</div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-white/80 mb-1">{stat.label}</div>
                    <div className="text-[12px] text-gray-500 leading-snug">{stat.detail}</div>
                  </div>
                ))}
              </div>
              <p className="text-[14px] text-gray-500 leading-relaxed max-w-xl">
                Figures reflect FY2025 data across all Artemis colleges, centers, and affiliated research institutes. Methodology follows the Higher Education Research and Development (HERD) survey standard.
              </p>
            </div>

            {/* Sidebar links — 4 cols */}
            <div className="lg:col-span-4 border-l border-white/10 pl-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/50 mb-6">Quick Links</p>
              <div className="space-y-4">
                {[
                  { label: 'Annual Research Report', page: 'about' },
                  { label: 'Research Expenditure Data', page: 'about' },
                  { label: 'Faculty Expertise Directory', page: 'our-people' },
                  { label: 'Funding Opportunities', page: 'fundraising' },
                  { label: 'Research Integrity Office', page: 'about' },
                  { label: 'Tech Transfer Portal', page: 'innovation' },
                ].map((link, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(link.page)}
                    className="block w-full text-left text-[15px] text-white/80 hover:text-[#8A0000] transition-colors py-2 border-b border-white/5 group"
                  >
                    {link.label}
                    <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. HIGHLIGHTS — card-and-image parallax-style ── */}
      <section id="highlights" className="scroll-mt-24 py-20">
        <div
          ref={highlightsAnim.ref}
          className={`max-w-[1200px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${highlightsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000] mb-4">Highlights</p>
          <h2 className="text-[36px] md:text-[44px] font-extrabold leading-[1.1] tracking-tighter text-gray-900 mb-16">
            What sets Artemis apart
          </h2>

          <div className="space-y-20">
            {highlightCards.map((card, i) => (
              <div
                key={i}
                className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 items-center`}
              >
                {/* Image */}
                <div className="w-full md:w-1/2">
                  <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                {/* Text */}
                <div className="w-full md:w-1/2">
                  <span className="text-[11px] font-bold text-[#8A0000] tracking-widest mb-4 block">0{i + 1}</span>
                  <h3 className="text-[28px] font-extrabold leading-tight tracking-tighter text-gray-900 mb-4">
                    {card.title}
                  </h3>
                  <p className="text-[16px] text-gray-600 leading-relaxed">
                    {card.desc}
                  </p>
                  <button
                    onClick={() => goToPage('innovation')}
                    className="mt-6 text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#8A0000] text-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CORE RESEARCH FACILITIES — parallax image section ── */}
      <section className="relative overflow-hidden">
        <div
          ref={facilitiesAnim.ref}
          className={`transition-all duration-700 ${facilitiesAnim.visible ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="relative w-full h-[50vh] min-h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1800"
              alt="Core Research Facilities"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60 mb-4">Infrastructure</p>
              <h2 className="text-[36px] md:text-[52px] font-extrabold leading-[1.1] tracking-tighter text-white mb-6">
                Core Research Facilities
              </h2>
              <p className="text-[16px] text-white/80 leading-relaxed max-w-2xl mb-8">
                From nanofabrication cleanrooms to cognitive neuroscience suites, Artemis operates shared facilities that are open to every researcher — because the best ideas deserve the best tools, regardless of department or rank.
              </p>
              <button
                onClick={() => goToPage('campus')}
                className="text-[11px] font-bold uppercase tracking-widest border border-white text-white px-8 py-3 hover:bg-white hover:text-[#8A0000] transition-colors"
              >
                Explore Facilities
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. CENTERS OF INQUIRY — retained from original ── */}
      <section className="max-w-[1200px] mx-auto w-full px-6 lg:px-16 py-20">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000] mb-4">Our Centers</p>
        <h2 className="text-[36px] md:text-[44px] font-extrabold leading-[1.1] tracking-tighter text-gray-900 mb-12">
          Centers of Inquiry
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: 'Center for Synthetic Intelligence',
              desc: 'Advancing the frontiers of machine cognition, autonomous reasoning, and human-AI symbiosis — with deep commitments to safety, transparency, and social benefit.',
              img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600',
            },
            {
              name: 'Center for Bio-Regenerative Arts',
              desc: 'Fusing biology, design, and engineering to create living systems that repair, adapt, and evolve — from tissue scaffolds to self-healing architectures.',
              img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=600',
            },
            {
              name: 'Center for Cosmological Humanities',
              desc: 'Bridging astrophysics, philosophy, and narrative to explore humanity\'s place in the cosmos — because the deepest questions deserve more than one discipline.',
              img: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=600',
            },
            {
              name: 'Center for Neo-Economics',
              desc: 'Rethinking economic systems for an age of automation and abundance — designing models that are equitable, sustainable, and resilient to systemic shock.',
              img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=600',
            },
          ].map((center, i) => (
            <div key={i} className="group border border-gray-200 hover:border-[#8A0000] transition-all cursor-pointer bg-white shadow-sm hover:shadow-lg overflow-hidden">
              <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
                <img src={center.img} alt={center.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <span className="text-[10px] font-bold text-[#8A0000] mr-4">0{i + 1}</span>
                  <h4 className="text-xl font-bold group-hover:text-[#8A0000] transition-colors leading-tight">{center.name}</h4>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{center.desc}</p>
                <div className="text-[11px] font-bold uppercase tracking-widest text-black group-hover:text-[#8A0000] transition-colors">
                  Explore Center →
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. LEARN MORE — link columns ── */}
      <section id="learn" className="scroll-mt-24 bg-gray-50 py-20">
        <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000] mb-4">Resources</p>
          <h2 className="text-[36px] md:text-[44px] font-extrabold leading-[1.1] tracking-tighter text-gray-900 mb-12">
            Learn more about the Knowledge Enterprise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {learnMoreLinks.map((col, i) => (
              <div key={i}>
                <h4 className="text-[13px] font-bold uppercase tracking-widest text-gray-900 mb-4 border-b border-gray-200 pb-2">{col.heading}</h4>
                <ul className="space-y-3">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <button
                        onClick={() => goToPage('about')}
                        className="text-[14px] text-gray-600 hover:text-[#8A0000] transition-colors text-left leading-snug"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
