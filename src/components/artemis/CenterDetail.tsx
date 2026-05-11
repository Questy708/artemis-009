'use client';

import React, { useState, useEffect, useRef } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';

interface Props {
  goToPage: (page: string, centerSlug?: string) => void;
  centerSlug: string;
}

/* ─── Hook ─── */
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

/* ─── Full Center Data ─── */
const allCenters: Record<string, {
  name: string;
  tag: string;
  heroImg: string;
  overview: string[];
  focus: string[];
  approach: string;
  coreInvestigators: string;
  translationalPrograms: string;
  technologyCenters: string;
  juniorFellows: string;
  nodes: string;
  stats: { value: string; label: string; detail: string }[];
  projects: { title: string; desc: string }[];
}> = {
  'synthetic-intelligence': {
    name: 'Center for Synthetic Intelligence',
    tag: '01 — SYNTHETIC INTELLIGENCE',
    heroImg: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1800',
    overview: [
      'The Center for Synthetic Intelligence stands at the frontier of one of the most consequential inquiries in human history: the nature and implications of machine cognition. Rather than treating artificial intelligence as a purely technical discipline, this Center approaches it as a deeply interdisciplinary challenge that draws upon neuroscience, philosophy of mind, computational engineering, ethics, and social science. The fundamental premise is that understanding intelligence — whether biological or synthetic — requires more than any single field can offer.',
      'Core investigators pursue high-risk, curiosity-driven research into emergent cognition, autonomous reasoning architectures, and the fundamental question of what it means for a system to understand. The Center houses the Symbiotic Cognition Initiative, a multi-year, cross-college project exploring the ethical and biological integration of AI into human cognition, with over 80 faculty from four centers contributing to a research agenda that will define what it means to think alongside machines.',
      'At the same time, the Translational Programs ensure that breakthroughs in synthetic intelligence are deployed responsibly, with streamlined intellectual property licensing and robust ethical oversight built into every stage of the innovation pipeline. The Center does not pursue AI capability for its own sake; every research programme is evaluated against its potential social benefit and its alignment with Artemis\'s commitment to human dignity and flourishing.',
    ],
    focus: ['Neural mapping and cognitive architecture', 'Autonomous reasoning and decision systems', 'Human-AI symbiosis and augmentation', 'AI safety, alignment, and transparency', 'Ethical frameworks for cognitive technology', 'Emergent cognition in complex systems', 'Post-automation governance models'],
    approach: 'The Center operates on the principle that transformative AI research requires sustained, deep inquiry free from the short-term pressures of grant cycles. Core Investigators hold long-term, renewable appointments that allow them to pursue ambitious research programmes spanning five to ten years. Interdisciplinary teams are assembled around grand challenges rather than disciplinary methods, ensuring that every project benefits from multiple perspectives. The Technology Development Centers within this hub provide cutting-edge computational infrastructure, including dedicated quantum computing resources and neural simulation environments.',
    coreInvestigators: 'Twelve Core Investigators lead the Center\'s research agenda, drawn from fields including computational neuroscience, philosophy of mind, machine learning, cognitive psychology, and technology ethics. They hold long-term, renewable appointments and are freed from the pressure of securing external grants, enabling them to pursue intellectually ambitious, high-risk research programmes. Each investigator mentors a cohort of junior fellows, creating a direct line from foundational inquiry to the next generation of researchers.',
    translationalPrograms: 'The Translational Programs bridge the gap between theoretical AI research and practical application. A dedicated team works with industry partners, government agencies, and civil society organisations to ensure that synthetic intelligence breakthroughs are deployed responsibly and equitably. Streamlined intellectual property licensing and entrepreneurship support enable rapid movement from laboratory proof-of-concept to real-world solution, while ethical review boards ensure that every deployment aligns with Artemis\'s values of safety, transparency, and social benefit.',
    technologyCenters: 'The Technology Development Centers provide the computational backbone for the Center\'s research. These include dedicated quantum computing clusters, large-scale neural simulation environments, and advanced data visualization facilities. The Technology Centers also develop and distribute open-source tools for the broader AI research community, accelerating innovation across the field while maintaining rigorous standards for reproducibility and safety.',
    juniorFellows: 'Forty-five junior fellows work alongside Core Investigators, participating fully in the Center\'s intellectual life. They engage in interdisciplinary coursework that spans neuroscience, philosophy, and computer science; conduct hands-on research in neural mapping and autonomous reasoning; and complete internship placements with partner organisations in industry and government. Every junior fellow\'s capstone project must align with a Center mission, evaluated against dual criteria: epistemic contribution and civic impact.',
    nodes: 'Valletta, Malta — Central Governance Hub | Tokyo, Japan — Pacific Robotics Node | San Francisco, USA — Silicon Tech Hub',
    stats: [
      { value: '12', label: 'Core Investigators', detail: 'Long-term, grant-free appointments' },
      { value: '45', label: 'Junior Fellows', detail: 'Integrated into all research programmes' },
      { value: '$180M', label: 'Annual Research Budget', detail: 'Dedicated to synthetic intelligence inquiry' },
      { value: '3', label: 'Global Nodes', detail: 'Valletta, Tokyo, San Francisco' },
    ],
    projects: [
      { title: 'The Synthetic Humanity Project', desc: 'A multi-year, cross-college initiative exploring the ethical and biological integration of AI into human cognition. Over 80 faculty from four centers contribute to a research agenda that will define what it means to think alongside machines, addressing questions of consciousness, autonomy, and the boundaries between human and artificial intelligence.' },
      { title: 'Symbiotic Cognition Initiative', desc: 'Calibrating neural mapping arrays to understand how human and machine cognition can work in genuine partnership — not as master and tool, but as co-intelligent systems. This initiative combines neuroscience, philosophy of mind, and computational engineering to explore the frontiers of augmented human reasoning.' },
      { title: 'Autonomous Governance Lab', desc: 'Designing decision-making architectures for AI systems that must operate autonomously in complex, high-stakes environments. Researchers from this lab collaborate with the Center for Neo-Economics on post-automation governance models that inform policy across three continents.' },
    ],
  },
  'bio-regenerative-arts': {
    name: 'Center for Bio-Regenerative Arts',
    tag: '02 — BIO-REGENERATIVE ARTS',
    heroImg: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=1800',
    overview: [
      'The Center for Bio-Regenerative Arts represents a radical convergence of biological science, artistic practice, and engineering design. Where traditional biotechnology focuses on intervention — treating disease, repairing damage — this Center focuses on regeneration: the creation of living systems that inherently repair, adapt, and evolve. The fundamental insight driving this Center is that the most elegant solutions to biological challenges already exist in nature; the task is to understand, adapt, and extend them.',
      'Researchers cultivate engineered tissue scaffolds designed to accelerate wound healing in extreme environments, from deep-sea habitats to off-world colonies. They design self-healing architectural materials that respond to environmental stress by growing stronger or more flexible. And they explore the aesthetic dimensions of biologically informed design, treating beauty not as superficial ornament but as an emergent property of well-adapted form — a principle that guides everything from tissue engineering to architectural prototyping.',
      'The Technology Development Centers within this hub provide cutting-edge bio-fabrication resources, including advanced tissue printers, controlled-environment growth chambers, and molecular simulation platforms. The Translational Programs ensure that bio-regenerative innovations move from laboratory proof-of-concept to real-world deployment with appropriate ethical review and intellectual property frameworks, working closely with aerospace, marine engineering, and healthcare partners.',
    ],
    focus: ['Engineered tissue and organ scaffolds', 'Self-healing and adaptive architectural materials', 'Bio-fabrication and living design systems', 'Extreme environment biotechnology', 'Aesthetic and philosophical dimensions of bio-design', 'Closed-loop biological life support systems', 'Regenerative medicine for extreme conditions'],
    approach: 'The Center brings together biologists, materials scientists, architects, artists, and ethicists around shared research programmes that treat regeneration as both a biological phenomenon and a design philosophy. Every project is evaluated not only for its scientific rigour but for its aesthetic coherence and its ethical implications — ensuring that the living systems we create are not only functional but beautiful and just.',
    coreInvestigators: 'Nine Core Investigators lead research spanning tissue engineering, bio-materials science, architectural design, and bio-aesthetics. They hold long-term, renewable appointments that free them from grant pressures, enabling ambitious multi-year programmes like the Bio-Regenerative Systems Initiative. Each investigator mentors junior fellows through hands-on laboratory work and interdisciplinary design studios.',
    translationalPrograms: 'The Translational Programs work with aerospace companies, marine engineering firms, and healthcare systems to move bio-regenerative innovations from proof-of-concept to deployment. Streamlined intellectual property licensing ensures that breakthroughs reach patients, builders, and explorers quickly, while ethical review boards ensure that bio-fabrication technologies are deployed with full consideration of biosafety, environmental impact, and equitable access.',
    technologyCenters: 'Advanced bio-fabrication laboratories, controlled-environment growth chambers, and molecular simulation platforms form the technological backbone of the Center. These facilities are available to all researchers across the Artemis network, ensuring that breakthroughs in one domain — such as a new tissue scaffold material — can be rapidly adapted and tested in others, from architectural prototyping to agricultural applications.',
    juniorFellows: 'Thirty-eight junior fellows work alongside Core Investigators in a unique blend of laboratory research, design studio practice, and field deployment. Their interdisciplinary coursework spans biology, materials science, architecture, and ethics, and their capstone projects must demonstrate both scientific rigour and design excellence. Many fellows rotate between the Center\'s global nodes, gaining experience with different ecosystems and regulatory environments.',
    nodes: 'Kigali, Rwanda — Sustainable Tech Hub | Reykjavik, Iceland — Arctic Research Hub | Berlin, Germany — Euro-Core Node',
    stats: [
      { value: '9', label: 'Core Investigators', detail: 'Spanning biology, design, and engineering' },
      { value: '38', label: 'Junior Fellows', detail: 'Laboratory and studio integrated learning' },
      { value: '$120M', label: 'Annual Research Budget', detail: 'Dedicated to bio-regenerative inquiry' },
      { value: '3', label: 'Global Nodes', detail: 'Kigali, Reykjavik, Berlin' },
    ],
    projects: [
      { title: 'Bio-Regenerative Systems Initiative', desc: 'Pioneering closed-loop biological systems that sustain human life in extreme environments — from deep-sea habitats to extraterrestrial colonies. This initiative bridges the Center for Bio-Regenerative Arts with industry partners in aerospace and marine engineering, combining tissue engineering, self-healing materials, and closed-loop life support into integrated systems tested in real-world conditions.' },
      { title: 'Living Architecture Programme', desc: 'Developing architectural materials that grow, adapt, and self-repair using biological principles. Researchers design building skins that respond to temperature and humidity, structural elements that strengthen under load, and surfaces that resist degradation through continuous cellular regeneration.' },
      { title: 'Extreme Wound Healing Project', desc: 'Engineering tissue scaffolds that accelerate wound healing in environments where traditional medicine is unavailable or ineffective — from remote wilderness settings to off-world habitats. These scaffolds use bio-regenerative principles to stimulate the body\'s own healing mechanisms rather than relying on external intervention.' },
    ],
  },
  'cosmological-humanities': {
    name: 'Center for Cosmological Humanities',
    tag: '03 — COSMOLOGICAL HUMANITIES',
    heroImg: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1800',
    overview: [
      'The Center for Cosmological Humanities is founded on the premise that humanity\'s relationship with the cosmos cannot be understood through astrophysics alone. The questions that drive this Center — What is our place in the universe? How does cosmic discovery reshape human self-understanding? What ethical obligations accompany the capacity to observe and interpret the cosmos? — demand the combined insight of physicists, philosophers, historians, writers, and artists.',
      'Researchers process petabytes of telescope data with novel AI algorithms to map the large-scale structure of the universe and detect signatures of new physics. Simultaneously, they examine how cosmic discovery has reshaped human self-understanding, ethical frameworks, and cultural narratives throughout history and into the present. The Center hosts the Cosmological Data Observatory, which collaborates with the global telescope network and makes its datasets freely available to researchers worldwide.',
      'Core Investigators hold long-term, renewable appointments that enable them to pursue ambitious, multi-year research programmes without the pressure of securing external grants. Junior fellows work alongside these investigators, engaging in interdisciplinary coursework that spans observational astronomy, philosophy of science, and narrative craft, and conducting hands-on research that transcends traditional academic structures.',
    ],
    focus: ['Large-scale cosmological data processing and AI analysis', 'Philosophy of cosmic discovery and human significance', 'Cultural narratives of space and exploration', 'Detection of novel physics signatures', 'Ethics of extraterrestrial engagement and planetary stewardship', 'History and philosophy of astronomical observation', 'The intersection of cosmology and consciousness'],
    approach: 'The Center brings together astrophysicists, philosophers, historians, writers, and artists around shared research programmes that treat cosmic inquiry as both an empirical and a humanistic endeavour. Every project is designed to advance our understanding of the physical universe while simultaneously deepening our appreciation of what that understanding means for human civilisation.',
    coreInvestigators: 'Eight Core Investigators lead research spanning observational cosmology, philosophy of science, history of astronomy, and cultural studies of space. Their long-term appointments enable ambitious programmes like the Cosmological Data Observatory, which processes petabytes of telescope data using novel AI algorithms to map the large-scale structure of the universe.',
    translationalPrograms: 'The Translational Programs work with space agencies, planetariums, educational institutions, and cultural organisations to ensure that cosmological discoveries are communicated effectively and ethically to the public. This includes developing open-source data visualisation tools, producing educational content, and advising on the ethical implications of proposed space missions and extraterrestrial engagement protocols.',
    technologyCenters: 'The Center maintains advanced computational infrastructure for processing astronomical data, including high-performance computing clusters and custom AI algorithms for anomaly detection in large-scale survey data. It also operates the Cosmological Data Observatory in collaboration with the global telescope network.',
    juniorFellows: 'Thirty-two junior fellows participate in a unique programme that combines observational research, philosophical inquiry, and creative practice. Their interdisciplinary coursework spans astrophysics, philosophy, and narrative, and their capstone projects must demonstrate both scientific rigour and interpretive depth. Many fellows contribute to the Center\'s public engagement programmes, developing new ways to communicate cosmic discovery.',
    nodes: 'Reykjavik, Iceland — Arctic Research Hub | London, UK — Financial Ethics Node | Vancouver, Canada — Network Theory Lab',
    stats: [
      { value: '8', label: 'Core Investigators', detail: 'Spanning cosmology, philosophy, and narrative' },
      { value: '32', label: 'Junior Fellows', detail: 'Combining science and humanities' },
      { value: '$95M', label: 'Annual Research Budget', detail: 'Dedicated to cosmological inquiry' },
      { value: '3', label: 'Global Nodes', detail: 'Reykjavik, London, Vancouver' },
    ],
    projects: [
      { title: 'Cosmological Data Observatory', desc: 'Processing petabytes of telescope data with novel AI algorithms to map the large-scale structure of the universe and detect signatures of new physics. The Observatory collaborates with the global telescope network and makes its datasets freely available, accelerating discovery across the international astronomical community.' },
      { title: 'Philosophy of Cosmic Discovery', desc: 'A multi-year programme examining how advances in observational cosmology reshape fundamental philosophical questions about human significance, the nature of reality, and the ethical obligations that accompany the capacity to observe and interpret the cosmos. Researchers combine historical analysis with contemporary philosophical inquiry.' },
      { title: 'Extraterrestrial Ethics Initiative', desc: 'Developing ethical frameworks for humanity\'s engagement with the possibility of extraterrestrial life and intelligence. This initiative brings together astrobiologists, ethicists, indigenous knowledge keepers, and policy scholars to address questions of planetary stewardship, contamination, and the rights of potential non-terrestrial organisms.' },
    ],
  },
  'neo-economics': {
    name: 'Center for Neo-Economics',
    tag: '04 — NEO-ECONOMICS',
    heroImg: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1800',
    overview: [
      'The Center for Neo-Economics exists because the economic models of the twentieth century are insufficient for the challenges of the twenty-first. Automation, artificial intelligence, and the transition to post-scarcity production systems demand fundamentally new frameworks for understanding value, labour, distribution, and resilience. This Center does not seek to reform existing economic systems; it seeks to design the systems that will replace them.',
      'The Center brings together economists, computer scientists, political theorists, sociologists, and systems engineers to design economic models that are equitable, sustainable, and resilient to systemic shock. Core Investigators pursue ambitious, long-term research into post-automation governance, universal basic infrastructure, and the economics of planetary-scale commons management. Their work is informed by real-world testing through the Center\'s Deployment Cycles, which pilot new models in partnership with governments and international organisations.',
      'The Translational Programs within the Center work directly with governments and international organisations to pilot neo-economic models in real-world settings, while the Technology Development Centers build the computational infrastructure needed to simulate and test novel economic systems before deployment. The Center\'s research has already informed policy across three continents, and its graduates serve as economic advisors to governments, international organisations, and social enterprises worldwide.',
    ],
    focus: ['Post-automation economic governance models', 'Universal basic infrastructure and commons management', 'Computational economic simulation and modelling', 'Systemic risk analysis and resilience engineering', 'Equity-focused distribution frameworks', 'Planetary-scale resource allocation', 'Economics of the Infinite Learning Continuum'],
    approach: 'The Center treats economics as a design discipline rather than a purely analytical one. Researchers do not merely observe and model existing economic systems — they design, simulate, and test new ones. Computational simulation enables rapid prototyping of economic models, while Deployment Cycles provide real-world testing grounds. Every model is evaluated against its equity outcomes, its resilience to systemic shock, and its sustainability under conditions of automation and post-scarcity production.',
    coreInvestigators: 'Eleven Core Investigators lead research spanning computational economics, political theory, systems engineering, and social justice. Their long-term appointments enable ambitious programmes that cannot be completed within a single grant cycle, such as the development of planetary-scale commons management frameworks and the design of post-automation governance architectures.',
    translationalPrograms: 'The Translational Programs work directly with governments and international organisations to pilot neo-economic models in controlled settings. These real-world experiments are accompanied by rigorous impact evaluation, ensuring that new economic frameworks deliver measurable improvements in equity, sustainability, and resilience before they are scaled. The Center maintains partnerships with policy institutes on every inhabited continent.',
    technologyCenters: 'The Center maintains high-performance computing infrastructure for economic simulation, including custom-built models for testing the behaviour of novel economic systems under conditions of stress, shock, and rapid technological change. These simulation environments enable researchers to prototype economic models that would be too risky to test in live economies, providing a safe space for radical experimentation.',
    juniorFellows: 'Forty-two junior fellows participate in a programme that combines economic theory, computational modelling, and real-world deployment. Their capstone projects must include a computational simulation component and a deployment plan, evaluated against both epistemic rigour and civic impact. Many fellows serve as embedded advisors in partner governments and organisations during their Deployment Cycle rotations.',
    nodes: 'Valletta, Malta — Central Governance Hub | London, UK — Financial Ethics Node | Nairobi, Kenya — Silicon Savannah Node',
    stats: [
      { value: '11', label: 'Core Investigators', detail: 'Spanning economics, politics, and systems' },
      { value: '42', label: 'Junior Fellows', detail: 'Theory, modelling, and deployment' },
      { value: '$140M', label: 'Annual Research Budget', detail: 'Dedicated to neo-economic inquiry' },
      { value: '3', label: 'Global Nodes', detail: 'Valletta, London, Nairobi' },
    ],
    projects: [
      { title: 'Post-Automation Governance Project', desc: 'Designing decision-making architectures for societies in which the majority of productive labour is performed by autonomous systems. This project addresses fundamental questions of value creation, distribution, and democratic participation in post-scarcity economies, combining computational simulation with real-world pilot programmes in partnership with three national governments.' },
      { title: 'Planetary Commons Initiative', desc: 'Developing economic frameworks for the management of shared planetary resources — from atmospheric carbon budgets to deep-sea mineral deposits to orbital space. This initiative treats the global commons not as a tragedy to be avoided but as a design challenge to be solved, applying insights from game theory, computational economics, and indigenous governance traditions.' },
      { title: 'Resilience Engineering Programme', desc: 'Building computational models to identify and mitigate systemic risks in interconnected economic systems. Researchers simulate cascading failures — financial crises, supply chain collapses, energy grid disruptions — and design intervention protocols that maintain stability without sacrificing equity or innovation.' },
    ],
  },
};

export default function CenterDetail({ goToPage, centerSlug }: Props) {
  const center = allCenters[centerSlug];
  const anim1 = useInView();
  const anim2 = useInView();
  const anim3 = useInView();
  const anim4 = useInView();
  const anim5 = useInView();

  if (!center) {
    return (
      <div className="flex-1 flex flex-col bg-white">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-16 py-20 text-center">
          <h1 className="text-[36px] font-bold mb-4">Center not found</h1>
          <button onClick={() => goToPage('centers-of-inquiry')} className="text-[#8A0000] underline">Return to Centers of Inquiry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      {/* Sub-header */}
      <div className="sticky top-[50px] z-40 bg-white border-b border-gray-100 flex items-center px-6 lg:px-16 shrink-0 h-[60px] shadow-sm">
        <button onClick={() => goToPage('centers-of-inquiry')} className="text-[12px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#8A0000] transition-colors mr-6">
          &larr; Centers of Inquiry
        </button>
        <h2 className="text-[14px] font-bold tracking-tight text-[#8A0000] whitespace-nowrap truncate">{center.name}</h2>
      </div>

      {/* Hero */}
      <section className="relative w-full h-[45vh] min-h-[340px] overflow-hidden">
        <img src={center.heroImg} alt={center.name} className="absolute inset-0 w-full h-full object-cover grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1000px] mx-auto w-full px-6 lg:px-16 pb-14">
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Center of Inquiry</span>
          </div>
          <h1 className="text-[38px] md:text-[48px] font-extrabold leading-[1.05] tracking-tighter text-white mb-3">{center.name}</h1>
          <p className="text-[16px] text-white/70 max-w-xl leading-relaxed font-light">{center.nodes}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-[1000px] mx-auto w-full px-6 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {center.stats.map((stat, i) => (
              <div key={i} className="relative pl-6 border-l-2 border-[#8A0000]">
                <div className="text-[30px] font-black text-[#141414] leading-none mb-2 tabular-nums">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">{stat.label}</div>
                <div className="text-[12px] text-gray-500 leading-snug">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="max-w-[1000px] mx-auto w-full px-6 lg:px-16 py-20">
        <div ref={anim1.ref} className={`transition-all duration-700 ${anim1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative flex items-center mb-12">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Overview</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          {center.overview.map((para, i) => (
            <p key={i} className="text-[16px] text-gray-600 leading-relaxed mb-4 max-w-2xl">{para}</p>
          ))}
        </div>
      </section>

      {/* Focus Areas */}
      <section className="bg-gray-50 py-20">
        <div ref={anim2.ref} className={`max-w-[1000px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${anim2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Research Focus</span>
          </div>
          <h2 className="text-[28px] font-extrabold tracking-tighter text-[#141414] mb-8">Areas of inquiry</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {center.focus.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-5 border border-gray-100">
                <span className="w-1.5 h-1.5 bg-[#8A0000] rounded-full mt-2 shrink-0"></span>
                <span className="text-[14px] text-gray-700 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
          <div className="bg-white border border-gray-100 p-8">
            <h3 className="text-[16px] font-bold text-[#141414] mb-4 uppercase tracking-wide">Our Approach</h3>
            <p className="text-[15px] text-gray-600 leading-relaxed">{center.approach}</p>
          </div>
        </div>
      </section>

      {/* Four Pillars Detail */}
      <section className="max-w-[1000px] mx-auto w-full px-6 lg:px-16 py-20">
        <div ref={anim3.ref} className={`transition-all duration-700 ${anim3.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative flex items-center mb-12">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Structure</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <h2 className="text-[28px] font-extrabold tracking-tighter text-[#141414] mb-10">How this Center operates</h2>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 border border-gray-100">
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">01 — Core Investigators</div>
                <p className="text-[15px] text-gray-600 leading-relaxed">{center.coreInvestigators}</p>
              </div>
              <div className="bg-gray-50 p-8 border border-gray-100">
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">02 — Junior Fellows</div>
                <p className="text-[15px] text-gray-600 leading-relaxed">{center.juniorFellows}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 border border-gray-100">
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">03 — Translational Programs</div>
                <p className="text-[15px] text-gray-600 leading-relaxed">{center.translationalPrograms}</p>
              </div>
              <div className="bg-gray-50 p-8 border border-gray-100">
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">04 — Technology Centers</div>
                <p className="text-[15px] text-gray-600 leading-relaxed">{center.technologyCenters}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-gray-50 py-20">
        <div ref={anim4.ref} className={`max-w-[1000px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${anim4.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Featured Projects</span>
          </div>
          <h2 className="text-[28px] font-extrabold tracking-tighter text-[#141414] mb-10">Active research programmes</h2>
          <div className="space-y-6">
            {center.projects.map((project, i) => (
              <div key={i} className="bg-white border border-gray-100 p-8">
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">0{i + 1}</div>
                <h3 className="text-[20px] font-bold text-[#141414] mb-3 leading-tight">{project.title}</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed">{project.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Centers */}
      <section className="py-20">
        <div ref={anim5.ref} className={`max-w-[1000px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${anim5.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Explore More</span>
          </div>
          <h2 className="text-[24px] font-extrabold tracking-tighter text-[#141414] mb-8">Other Centers of Inquiry</h2>
          <div className="flex flex-wrap gap-4">
            {Object.entries(allCenters).filter(([slug]) => slug !== centerSlug).map(([slug, c]) => (
              <button
                key={slug}
                onClick={() => goToPage('center-detail', slug)}
                className="px-5 py-3 border border-gray-200 hover:border-[#8A0000] text-[13px] font-bold text-gray-700 hover:text-[#8A0000] transition-colors"
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
