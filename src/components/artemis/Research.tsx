'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';

interface ResearchProps {
  goToPage: (page: string) => void;
}

/* ─── Colors ─── */
const MAROON = '#8A0000';
const GOLD = '#FFC627';

/* ─── Data ─── */
const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
    alt: 'Laboratory research',
    caption: 'Artemis postdoctoral researchers install a next-generation biosensor array in the Center for Synthetic Intelligence, part of a cross-college initiative to develop real-time neural monitoring systems.',
  },
  {
    src: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800',
    alt: 'Medical research',
    caption: 'A research team in the Bio-Regenerative Arts center cultivates engineered tissue scaffolds designed to accelerate wound healing in extreme environments.',
  },
  {
    src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    alt: 'Robotics and AI',
    caption: 'Graduate researchers test an autonomous rover platform at the Artemis Proving Grounds, part of the Cosmological Humanities initiative to develop self-sustaining exploration systems.',
  },
  {
    src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800',
    alt: 'Entrepreneurship',
    caption: 'Artemis student entrepreneurs pitch their venture at Demo Day in the Forge incubator, where 120+ spin-offs have launched in the past five years.',
  },
  {
    src: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800',
    alt: 'Scientific collaboration',
    caption: 'Interdisciplinary teams from the Neo-Economics Center and the Center for Synthetic Intelligence collaborate on models for post-automation economic governance.',
  },
];

const joinLinks = [
  { label: 'Make a donation to support research', page: 'fundraising' },
  { label: 'Grow your company in partnership with Artemis', page: 'innovation' },
  { label: 'Become a student researcher', page: 'education' },
  { label: 'Participate in research studies', page: 'about' },
  { label: 'Explore lectures and events', page: 'campus' },
  { label: 'Search faculty and staff career opportunities', page: 'jobs' },
];

const featuredProjects = [
  {
    title: 'Solutions in the desert',
    desc: 'Artemis leads the Futures Engine initiative, a cross-college effort focused on confronting challenges facing arid and semi-arid regions — from water scarcity to renewable energy — and spurring economic development across the Global South.',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=1400',
    button: 'A sunny outlook',
  },
  {
    title: 'A powerful technology hub',
    desc: 'The Artemis Advanced Prototyping Hub accelerates the production of next-generation semiconductor and quantum technologies and trains the workforce needed to sustain them — protecting strategic capabilities for the decades ahead.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1400',
    button: 'Chips for change',
  },
  {
    title: 'Living in harmony',
    desc: 'Building on the accomplishments of the Artemis Harmony Program, the Harmony Institute fosters development of new solutions and expands effective programs that support children\'s relationships, cognitive development, and well-being.',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=1400',
    button: 'Kids in tune',
  },
];

const researchStats = [
  { value: '$847M', label: '$847M in research expenditures in fiscal year 2025' },
  { value: '#1', label: 'No. 1 for transdisciplinary research output worldwide' },
  { value: '#1', label: 'No. 1 for non-STEM humanities research expenditures' },
  { value: '#3', label: 'No. 3 for AI-ethics and society impact research' },
];

const iconCards = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-8 h-8" fill="currentColor">
        <path d="M233 7c-9.4-9.4-24.6-9.4-33.9 0l-96 96c-9.4 9.4-9.4 24.6 0 33.9l89.4 89.4-15.5 15.5C152.3 230.4 124.9 224 96 224c-31.7 0-61.5 7.7-87.8 21.2c-9 4.7-10.3 16.7-3.1 23.8L112.7 376.7 96.3 393.1c-2.6-.7-5.4-1.1-8.3-1.1c-17.7 0-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32c0-2.9-.4-5.6-1.1-8.3l16.4-16.4L242.9 506.9c7.2 7.2 19.2 5.9 23.8-3.1C280.3 477.5 288 447.7 288 416c0-28.9-6.4-56.3-17.8-80.9l15.5-15.5L375 409c9.4 9.4 24.6 9.4 33.9 0l96-96c9.4-9.4 9.4-24.6 0-33.9l-89.4-89.4 55-55c12.5-12.5 12.5-32.8 0-45.3l-48-48c-12.5-12.5-32.8-12.5-45.3 0l-55 55L233 7zm159 351l-72.4-72.4 62.1-62.1L454.1 296 392 358.1zM226.3 192.4L153.9 120 216 57.9l72.4 72.4-62.1 62.1z"/>
      </svg>
    ),
    title: 'Space to innovate',
    desc: 'Artemis NewSpace leads the integration of academic and commercial space enterprises using our core strengths in space science, engineering and education.',
    button: 'Explore Artemis NewSpace',
    page: 'innovation',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-8 h-8" fill="currentColor">
        <path d="M48 256C48 141.1 141.1 48 256 48c63.1 0 119.6 28.1 157.8 72.5c8.6 10.1 23.8 11.2 33.8 2.6s11.2-23.8 2.6-33.8C403.3 34.6 333.7 0 256 0C114.6 0 0 114.6 0 256v40c0 13.3 10.7 24 24 24s24-10.7 24-24V256zm458.5-52.9c-2.7-13-15.5-21.3-28.4-18.5s-21.3 15.5-18.5 28.4c2.9 13.9 4.5 28.3 4.5 43.1v40c0 13.3 10.7 24 24 24s24-10.7 24-24V256c0-18.1-1.9-35.8-5.5-52.9zM256 80c-19 0-37.4 3-54.5 8.6c-15.2 5-18.7 23.7-8.3 35.9c7.1 8.3 18.8 10.8 29.4 7.9c10.6-2.9 21.8-4.4 33.4-4.4c70.7 0 128 57.3 128 128v24.9c0 25.2-1.5 50.3-4.4 75.3c-1.7 14.6 9.4 27.8 24.2 27.8c11.8 0 21.9-8.6 23.3-20.3c3.3-27.4 5-55 5-82.7V256c0-97.2-78.8-176-176-176zM150.7 148.7c-9.1-10.6-25.3-11.4-33.9-.4C93.7 178 80 215.4 80 256v24.9c0 24.2-2.6 48.4-7.8 71.9C68.8 368.4 80.1 384 96.1 384c10.5 0 19.9-7 22.2-17.3c6.4-28.1 9.7-56.8 9.7-85.8V256c0-27.2 8.5-52.4 22.9-73.1c7.2-10.4 8-24.6-.2-34.2zM256 160c-53 0-96 43-96 96v24.9c0 35.9-4.6 71.5-13.8 106.1c-3.8 14.3 6.7 29 21.5 29c9.5 0 17.9-6.2 20.4-15.4c10.5-39 15.9-79.2 15.9-119.7V256c0-28.7 23.3-52 52-52s52 23.3 52 52v24.9c0 36.3-3.5 72.4-10.4 107.9c-2.7 13.9 7.7 27.2 21.8 27.2c10.2 0 19-7 21-17c7.7-38.8 11.6-78.3 11.6-118.1V256c0-53-43-96-96-96zm24 96c0-13.3-10.7-24-24-24s-24 10.7-24 24v24.9c0 59.9-11 119.3-32.5 175.2l-5.9 15.3c-4.8 12.4 1.4 26.3 13.8 31s26.3-1.4 31-13.8l5.9-15.3C267.9 411.9 280 346.7 280 280.9V256z"/>
      </svg>
    ),
    title: 'Solving "wicked problems"',
    desc: 'The Artemis Advanced Capabilities Institute advances transformational capabilities in science and technology to meet defense, security and intelligence mission needs across public and private sectors.',
    button: 'Explore ACI',
    page: 'innovation',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-8 h-8" fill="currentColor">
        <path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z"/>
      </svg>
    ),
    title: 'Empowering entrepreneurs',
    desc: 'The Artemis Entrepreneurship + Innovation Institute connects you to the information, resources and people you need to turn your big ideas into reality and bring them to market.',
    button: 'Explore E+I',
    page: 'innovation',
  },
];

const learnMoreLinks = [
  {
    heading: 'Research',
    links: [
      { label: 'About Artemis research', page: 'research' },
      { label: 'Undergraduate research opportunities', page: 'education' },
      { label: 'Core facilities', page: 'campus' },
      { label: 'Find an expert', page: 'our-people' },
    ],
  },
  {
    heading: 'Entrepreneurship and economic development',
    links: [
      { label: 'Support for entrepreneurs', page: 'innovation' },
      { label: 'Corporate partnerships', page: 'innovation' },
      { label: 'Economic development', page: 'about' },
      { label: 'International development', page: 'about' },
      { label: 'Technology transfer', page: 'innovation' },
    ],
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
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const heroAnim = useInView();
  const joinAnim = useInView();
  const statsAnim = useInView();
  const highlightsAnim = useInView();
  const cardsAnim = useInView();
  const facilitiesAnim = useInView();

  // Auto-cycle gallery
  useEffect(() => {
    const timer = setInterval(() => setActiveGallery(i => (i + 1) % galleryImages.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const handleProjectHover = useCallback((i: number | null) => {
    setExpandedProject(i);
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      {/* ── Sticky Sub-header with Anchor Nav (matching ASU "On This Page") ── */}
      <div className="sticky top-[50px] z-40 bg-white border-b border-gray-200 flex items-center px-6 lg:px-16 shrink-0 overflow-x-auto hide-scrollbar shadow-sm h-auto py-3">
        <span className="text-[12px] font-bold uppercase tracking-widest text-gray-500 mr-6 whitespace-nowrap">On This Page:</span>
        <div className="flex space-x-5 shrink-0 text-[13px] font-medium text-gray-600">
          <a href="#join" className="flex items-center space-x-1.5 hover:text-[#8A0000] transition-colors whitespace-nowrap">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 640 512"><path d="M544 248v3.3l69.7-69.7c21.9-21.9 21.9-57.3 0-79.2L535.6 24.4c-21.9-21.9-57.3-21.9-79.2 0L416.3 64.5c-2.7-.3-5.5-.5-8.3-.5H296c-37.1 0-67.6 28-71.6 64H224V248c0 22.1 17.9 40 40 40s40-17.9 40-40V176c0 0 0-.1 0-.1V160l16 0 136 0c0 0 0 0 .1 0H464c44.2 0 80 35.8 80 80v8zM336 192v56c0 39.8-32.2 72-72 72s-72-32.2-72-72V129.4c-35.9 6.2-65.8 32.3-76 68.2L99.5 255.2 26.3 328.4c-21.9 21.9-21.9 57.3 0 79.2l78.1 78.1c21.9 21.9 57.3 21.9 79.2 0l37.7-37.7c.9 0 1.8.1 2.7.1H384c26.5 0 48-21.5 48-48 0-5.6-1-11-2.7-16H432c26.5 0 48-21.5 48-48 0-12.8-5-24.4-13.2-33 25.7-5 45.1-27.6 45.2-54.8v-.4c-.1-30.8-25.1-55.8-56-55.8 0 0 0 0 0 0l-120 0z"/></svg>
            <span>Join Us</span>
          </a>
          <a href="#growth" className="flex items-center space-x-1.5 hover:text-[#8A0000] transition-colors whitespace-nowrap">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 512 512"><path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"/></svg>
            <span>Growth and Impact</span>
          </a>
          <a href="#highlights" className="flex items-center space-x-1.5 hover:text-[#8A0000] transition-colors whitespace-nowrap">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 576 512"><path d="M315 315l158.4-215L444.1 70.6 229 229 315 315zm-187 5l0 0V248.3c0-15.3 7.2-29.6 19.5-38.6L420.6 8.4C428 2.9 437 0 446.2 0c11.4 0 22.4 4.5 30.5 12.6l54.8 54.8c8.1 8.1 12.6 19 12.6 30.5 0 9.2-2.9 18.2-8.4 25.6L334.4 396.5c-9 12.3-23.4 19.5-38.6 19.5H224l-25.4 25.4c-12.5 12.5-32.8 12.5-45.3 0l-50.7-50.7c-12.5-12.5-12.5-32.8 0-45.3L128 320zM7 466.3l63-63 70.6 70.6-31 31c-4.5 4.5-10.6 7-17 7H24c-13.3 0-24-10.7-24-24v-4.7c0-6.4 2.5-12.5 7-17z"/></svg>
            <span>Highlights</span>
          </a>
          <a href="#learn" className="flex items-center space-x-1.5 hover:text-[#8A0000] transition-colors whitespace-nowrap">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 640 512"><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>
            <span>Learn More</span>
          </a>
        </div>
      </div>

      {/* ── 1. HERO — Full-bleed image with overlay (matching ASU) ── */}
      <section className="relative w-full h-[60vh] min-h-[450px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=1800"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Research at Artemis"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1200px] mx-auto w-full px-6 lg:px-16 pb-16">
          <h1 className="text-[40px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6">
            Research and innovation<br />at Artemis
          </h1>
          <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
            The Artemis Knowledge Enterprise advances research, innovation, strategic partnerships, entrepreneurship and economic development — assuming fundamental responsibility for the communities we serve.
          </p>
        </div>
      </section>

      {/* ── 2. REVOLUTIONIZING THE RESEARCH ENTERPRISE — 6-6 two-column ── */}
      <section className="max-w-[1200px] mx-auto w-full px-6 lg:px-16 py-16">
        <div
          ref={heroAnim.ref}
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-start transition-all duration-700 ${heroAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Left — Text */}
          <div className="pt-8">
            <h2 className="text-[32px] md:text-[40px] font-extrabold leading-[1.1] tracking-tighter text-gray-900 mb-6">
              Revolutionizing the<br />research enterprise
            </h2>
            <p className="text-[16px] text-gray-700 leading-relaxed mb-4">
              The challenges that humanity faces — from health care to cybersecurity to affordable energy — are complex and interconnected. Solving these challenges demands the creativity and commitment of many minds from many fields. The University of Artemis connects those minds in an ecosystem where creative ideas thrive.
            </p>
            <p className="text-[16px] text-gray-700 leading-relaxed">
              We believe a research university is a knowledge enterprise — our business is creating and sharing new knowledge to provide value to our communities. This belief fuels everything we do. Academic silos no longer serve. At Artemis, we have reshaped the very structure of the university, centering our academic units and research institutes around grand challenges. We have woven an entrepreneurial mindset into the fabric of our institution, empowering our students, faculty and staff to test and launch their innovative ideas.
            </p>
          </div>

          {/* Right — Image Gallery Carousel (matching ASU Glide carousel) */}
          <div className="pt-8">
            {/* Main image */}
            <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden border border-gray-300">
              {galleryImages.map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === activeGallery ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}
            </div>
            {/* Thumbnail strip with arrows */}
            <div className="flex items-center border border-t-0 border-gray-300 bg-gray-50 px-4 py-3">
              <button
                onClick={() => setActiveGallery(i => (i - 1 + galleryImages.length) % galleryImages.length)}
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors mr-3"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
              </button>
              <div className="flex-1 flex gap-2 overflow-x-auto hide-scrollbar">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveGallery(i)}
                    className={`shrink-0 w-20 h-14 overflow-hidden border-2 transition-all ${i === activeGallery ? 'border-[#FFC627]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <button
                onClick={() => setActiveGallery(i => (i + 1) % galleryImages.length)}
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors ml-3"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
              </button>
            </div>
            {/* Caption */}
            <div className="border border-t-0 border-gray-300 bg-white px-4 py-3 border-t-0">
              <p className="text-[14px] text-gray-600 leading-relaxed min-h-[60px]">
                {galleryImages[activeGallery].caption}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. BE A PART OF ARTEMIS RESEARCH — 6-6 on gray bg ── */}
      <section id="join" className="scroll-mt-24 bg-gray-100 py-16">
        <div
          ref={joinAnim.ref}
          className={`max-w-[1200px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${joinAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left — Heading + intro */}
            <div>
              <h2 className="text-[32px] md:text-[40px] font-extrabold leading-[1.1] tracking-tighter text-gray-900 mb-4">
                <span className="bg-[#FFC627] px-2">Be a part of Artemis research</span>
              </h2>
              <p className="text-[16px] text-gray-700 leading-relaxed">
                We invite students, faculty, staff, alumni, businesses and community members to join us in advancing discovery and innovation.
              </p>
            </div>
            {/* Right — Grid links (2 columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {joinLinks.map((link, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(link.page)}
                  className="flex items-start space-x-2 text-left py-2 group"
                >
                  <svg className="w-3 h-3 mt-1.5 shrink-0 text-[#8A0000]" fill="currentColor" viewBox="0 0 320 512"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-128 128c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 288 105.4 182.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l128 128z"/></svg>
                  <span className="text-[15px] text-gray-700 group-hover:text-[#8A0000] group-hover:underline transition-colors leading-snug">{link.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FEATURED PROJECTS — animated expand sections (matching ASU) ── */}
      <section className="max-w-[1200px] mx-auto w-full px-6 lg:px-16 py-16">
        <h2 className="text-[32px] md:text-[40px] font-extrabold leading-[1.1] tracking-tighter text-gray-900 mb-8">
          <span className="bg-[#FFC627] px-2">Featured projects</span>
        </h2>
        {/* Animated content sections */}
        <div className="flex flex-col md:flex-row gap-4">
          {featuredProjects.map((project, i) => (
            <div
              key={i}
              className="relative flex-1 min-h-[320px] md:min-h-[400px] overflow-hidden cursor-pointer group"
              onMouseEnter={() => handleProjectHover(i)}
              onMouseLeave={() => handleProjectHover(null)}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 transition-transform duration-700"
                style={{
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors duration-500" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                <h3 className="text-[24px] md:text-[28px] font-bold text-white mb-2">
                  {project.title}
                </h3>
                <div className={`overflow-hidden transition-all duration-500 ${expandedProject === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-[14px] text-white/90 leading-relaxed mb-4">
                    {project.desc}
                  </p>
                  <button
                    onClick={(e) => { e.stopPropagation(); goToPage('innovation'); }}
                    className="text-[12px] font-bold uppercase tracking-widest bg-[#FFC627] text-black px-5 py-2 hover:bg-white transition-colors"
                  >
                    {project.button}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. RESEARCH GROWTH AND IMPACT — 8-4 layout ── */}
      <section id="growth" className="scroll-mt-24 bg-white py-16">
        <div
          ref={statsAnim.ref}
          className={`max-w-[1200px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${statsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main content — 8 cols */}
            <div className="lg:col-span-8">
              <h2 className="text-[28px] md:text-[36px] font-extrabold leading-[1.1] tracking-tighter text-gray-900 mb-6">
                Research growth and impact
              </h2>
              <p className="text-[16px] text-gray-700 leading-relaxed max-w-2xl">
                Artemis is one of the fastest-growing research enterprises in the world, more than doubling its research expenditures over the last ten years. The university continually climbs in rankings from the Global Research Index, which measures research expenditures across disciplines and funding sources. Additionally, Artemis is a leader in bringing innovations to market, ranking among the top universities worldwide for patents issued and ventures launched.
              </p>
            </div>

            {/* Sidebar — 4 cols */}
            <div className="lg:col-span-4 border-l border-gray-200 pl-8">
              <h3 className="text-[14px] font-bold uppercase tracking-widest text-gray-900 mb-4">Related links</h3>
              <nav className="space-y-3">
                {[
                  { label: 'Read research highlights from the past year', page: 'about' },
                  { label: 'More Knowledge Enterprise facts and figures', page: 'about' },
                  { label: 'Artemis faculty excellence', page: 'our-people' },
                ].map((link, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(link.page)}
                    className="block w-full text-left text-[15px] text-[#8A0000] hover:underline leading-snug"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* Stats row on gray bg — 4 equal columns */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {researchStats.map((stat, i) => (
              <div key={i}>
                <h2 className="text-[36px] md:text-[44px] font-black leading-none mb-2 tracking-tight">
                  <span className="bg-[#FFC627] px-1.5">{stat.value}</span>
                </h2>
                <p className="text-[14px] text-gray-700 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. HIGHLIGHTS — card-and-image parallax (matching ASU) ── */}
      <section id="highlights" className="scroll-mt-24 py-16">
        <div
          ref={highlightsAnim.ref}
          className={`max-w-[1200px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${highlightsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="text-[32px] md:text-[40px] font-extrabold leading-[1.1] tracking-tighter text-gray-900 mb-8">
            <span className="bg-[#FFC627] px-2">Highlights</span>
          </h2>

          {/* Card-and-image section (parallax style) */}
          <div
            className="relative w-full min-h-[400px] md:min-h-[500px] overflow-hidden"
            style={{
              backgroundImage: 'linear-gradient(rgba(25,25,25,0) 0%, rgba(25,25,25,0.79) 100%), url(https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1400)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="flex items-end h-full min-h-[400px] md:min-h-[500px] p-8 md:p-16">
              <div className="bg-white max-w-md p-8 shadow-xl">
                <h3 className="text-[24px] font-bold text-gray-900 mb-3">Shaping tomorrow, today</h3>
                <p className="text-[14px] text-gray-700 leading-relaxed mb-5">
                  The Artemis Global Futures Laboratory is taking action toward a sustainable future in which well-being is attainable for everyone — bridging research, policy, and practice across continents.
                </p>
                <button
                  onClick={() => goToPage('innovation')}
                  className="text-[12px] font-bold uppercase tracking-widest bg-[#8A0000] text-white px-5 py-2.5 hover:bg-[#6b0000] transition-colors"
                >
                  Visit Global Futures Lab
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. THREE-CARD ARRANGEMENT on gray bg (matching ASU) ── */}
      <section className="bg-gray-100 py-16">
        <div
          ref={cardsAnim.ref}
          className={`max-w-[1200px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${cardsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {iconCards.map((card, i) => (
              <div key={i} className="bg-white border border-gray-200 p-8 flex flex-col">
                <div className="text-[#8A0000] mb-4">{card.icon}</div>
                <h3 className="text-[20px] font-bold text-gray-900 mb-3">{card.title}</h3>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-5 flex-1">{card.desc}</p>
                <div>
                  <button
                    onClick={() => goToPage(card.page)}
                    className="text-[12px] font-bold uppercase tracking-widest bg-[#8A0000] text-white px-5 py-2.5 hover:bg-[#6b0000] transition-colors"
                  >
                    {card.button}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CORE RESEARCH FACILITIES — parallax with card overlay (matching ASU) ── */}
      <section className="py-16">
        <div
          ref={facilitiesAnim.ref}
          className={`max-w-[1200px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${facilitiesAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div
            className="relative w-full min-h-[400px] md:min-h-[500px] overflow-hidden"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1400)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="flex items-end h-full min-h-[400px] md:min-h-[500px] p-8 md:p-16">
              <div className="bg-white max-w-md p-8 shadow-xl">
                <h3 className="text-[24px] font-bold text-gray-900 mb-3">Core Research Facilities</h3>
                <p className="text-[14px] text-gray-700 leading-relaxed mb-5">
                  Artemis Core Research Facilities empower the achievement of goals for researchers, businesses and industry leaders by offering access to specialized equipment and the expertise of skilled scientists.
                </p>
                <button
                  onClick={() => goToPage('campus')}
                  className="text-[12px] font-bold uppercase tracking-widest bg-[#8A0000] text-white px-5 py-2.5 hover:bg-[#6b0000] transition-colors"
                >
                  Connect with Core Facilities
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. CENTERS OF INQUIRY ── */}
      <section className="max-w-[1200px] mx-auto w-full px-6 lg:px-16 py-16">
        <h2 className="text-[32px] md:text-[40px] font-extrabold leading-[1.1] tracking-tighter text-gray-900 mb-12">
          <span className="bg-[#FFC627] px-2">Centers of Inquiry</span>
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

      {/* ── 10. LEARN MORE — 2-column links (matching ASU) ── */}
      <section id="learn" className="scroll-mt-24 py-16">
        <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-16">
          <h2 className="text-[32px] md:text-[40px] font-extrabold leading-[1.1] tracking-tighter text-gray-900 mb-12">
            <span className="bg-[#FFC627] px-2">Learn more about the<br />Knowledge Enterprise</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {learnMoreLinks.map((col, i) => (
              <div key={i}>
                <h3 className="text-[18px] font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">{col.heading}</h3>
                <div className="space-y-3">
                  {col.links.map((link, j) => (
                    <p key={j}>
                      <button
                        onClick={() => goToPage(link.page)}
                        className="text-[15px] text-[#8A0000] hover:underline leading-snug text-left"
                      >
                        {link.label}
                      </button>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
