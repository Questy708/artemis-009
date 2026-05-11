'use client';

import React, { useState, useEffect, useRef } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';

interface Props {
  goToPage: (page: string, centerSlug?: string) => void;
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

/* ─── Center Data ─── */
const centers = [
  {
    name: 'Center for Synthetic Intelligence',
    slug: 'synthetic-intelligence',
    desc: 'Advancing the frontiers of machine cognition, autonomous reasoning, and human-AI symbiosis — with deep commitments to safety, transparency, and social benefit.',
    longDesc: 'The Center for Synthetic Intelligence stands at the frontier of one of the most consequential inquiries in human history: the nature and implications of machine cognition. Rather than treating artificial intelligence as a purely technical discipline, this Center approaches it as a deeply interdisciplinary challenge that draws upon neuroscience, philosophy of mind, computational engineering, ethics, and social science. Core investigators pursue high-risk, curiosity-driven research into emergent cognition, autonomous reasoning architectures, and the fundamental question of what it means for a system to understand. At the same time, the Translational Programs ensure that breakthroughs in synthetic intelligence are deployed responsibly, with streamlined intellectual property licensing and robust ethical oversight built into every stage of the innovation pipeline.',
    img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    tag: '01 — SYNTHETIC INTELLIGENCE',
    focus: ['Neural mapping and cognitive architecture', 'Autonomous reasoning and decision systems', 'Human-AI symbiosis and augmentation', 'AI safety, alignment, and transparency', 'Ethical frameworks for cognitive technology'],
    nodes: 'Valletta, Malta — Tokyo, Japan — San Francisco, USA',
    investigators: 12,
    fellows: 45,
  },
  {
    name: 'Center for Bio-Regenerative Arts',
    slug: 'bio-regenerative-arts',
    desc: 'Fusing biology, design, and engineering to create living systems that repair, adapt, and evolve — from tissue scaffolds to self-healing architectures.',
    longDesc: 'The Center for Bio-Regenerative Arts represents a radical convergence of biological science, artistic practice, and engineering design. Where traditional biotechnology focuses on intervention, this Center focuses on regeneration — the creation of living systems that inherently repair, adapt, and evolve. Researchers cultivate engineered tissue scaffolds designed to accelerate wound healing in extreme environments, from deep-sea habitats to off-world colonies. They design self-healing architectural materials that respond to environmental stress, and they explore the aesthetic dimensions of biologically informed design. The Technology Development Centers within this hub provide cutting-edge bio-fabrication resources, while the Translational Programs ensure that bio-regenerative innovations move from laboratory proof-of-concept to real-world deployment with appropriate ethical review and intellectual property frameworks.',
    img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800',
    tag: '02 — BIO-REGENERATIVE ARTS',
    focus: ['Engineered tissue and organ scaffolds', 'Self-healing and adaptive architectural materials', 'Bio-fabrication and living design systems', 'Extreme environment biotechnology', 'Aesthetic and philosophical dimensions of bio-design'],
    nodes: 'Kigali, Rwanda — Reykjavik, Iceland — Berlin, Germany',
    investigators: 9,
    fellows: 38,
  },
  {
    name: 'Center for Cosmological Humanities',
    slug: 'cosmological-humanities',
    desc: 'Bridging astrophysics, philosophy, and narrative to explore humanity\'s place in the cosmos — because the deepest questions deserve more than one discipline.',
    longDesc: 'The Center for Cosmological Humanities is founded on the premise that humanity\'s relationship with the cosmos cannot be understood through astrophysics alone. This Center bridges the empirical rigour of observational astronomy and cosmological modelling with the interpretive depth of philosophy, history, literature, and the arts. Researchers process petabytes of telescope data with novel AI algorithms to map the large-scale structure of the universe and detect signatures of new physics, while simultaneously examining how cosmic discovery reshapes human self-understanding, ethical frameworks, and cultural narratives. The Center hosts the Cosmological Data Observatory, which collaborates with the global telescope network, and its Core Investigators hold long-term, renewable appointments that enable them to pursue ambitious, multi-year research programmes without the pressure of securing external grants. Junior fellows work alongside these investigators, engaging in interdisciplinary coursework and hands-on research that transcends traditional academic structures.',
    img: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800',
    tag: '03 — COSMOLOGICAL HUMANITIES',
    focus: ['Large-scale cosmological data processing and AI analysis', 'Philosophy of cosmic discovery and human significance', 'Cultural narratives of space and exploration', 'Detection of novel physics signatures', 'Ethics of extraterrestrial engagement and planetary stewardship'],
    nodes: 'Reykjavik, Iceland — London, UK — Vancouver, Canada',
    investigators: 8,
    fellows: 32,
  },
  {
    name: 'Center for Neo-Economics',
    slug: 'neo-economics',
    desc: 'Rethinking economic systems for an age of automation and abundance — designing models that are equitable, sustainable, and resilient to systemic shock.',
    longDesc: 'The Center for Neo-Economics exists because the economic models of the twentieth century are insufficient for the challenges of the twenty-first. Automation, artificial intelligence, and the transition to post-scarcity production systems demand fundamentally new frameworks for understanding value, labour, distribution, and resilience. This Center brings together economists, computer scientists, political theorists, sociologists, and systems engineers to design economic models that are equitable, sustainable, and resilient to systemic shock. Core Investigators pursue ambitious, long-term research into post-automation governance, universal basic infrastructure, and the economics of planetary-scale commons management. The Translational Programs within the Center work directly with governments and international organisations to pilot these models in real-world settings, while the Technology Development Centers build the computational infrastructure needed to simulate and test novel economic systems before deployment.',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
    tag: '04 — NEO-ECONOMICS',
    focus: ['Post-automation economic governance models', 'Universal basic infrastructure and commons management', 'Computational economic simulation and modelling', 'Systemic risk analysis and resilience engineering', 'Equity-focused distribution frameworks'],
    nodes: 'Valletta, Malta — London, UK — Nairobi, Kenya',
    investigators: 11,
    fellows: 42,
  },
];

/* ─── Pillar Tabs Data ─── */
const pillars = [
  {
    title: 'Unified Knowledge',
    content: 'Inspired by the pursuit of knowledge as a cohesive whole, our Centers of Inquiry replace traditional academic departments. They are designed to create an intellectual environment where reality is seen as interconnected and holistic, preventing distortions and imbalances that might arise from an exclusive focus on specific disciplines. This approach aligns with the vision of fostering a "philosophical habit of mind," encouraging learners to perceive knowledge as unified rather than fragmented into siloed domains. When a biologist, a philosopher, and a computer scientist share not just a hallway but a research agenda, the questions they ask become fundamentally different — and so do the answers they discover.',
  },
  {
    title: 'Junior Fellows',
    content: 'Students join the Centers of Inquiry as junior fellows, working alongside core investigators in a model that bridges disciplinary boundaries. This is not a peripheral internship programme — junior fellows participate fully in the intellectual life of the Center, engaging in interdisciplinary coursework, hands-on research, and valuable internship experiences that connect academic inquiry to real-world application. By functioning as a blend of research institutes, think tanks, and innovation incubators, the centers offer an immersive learning experience that transcends traditional academic structures. Every undergraduate and graduate capstone must align with a Center of Inquiry mission, evaluated against dual criteria: epistemic contribution and civic impact.',
  },
  {
    title: 'Core Investigators',
    content: 'At the core of each Center of Inquiry are the Core Investigators — a team of intellectually curious and innovative scientists who are provided with long-term, renewable appointments. This is a deliberate departure from the grant-dependent model that dominates most research universities. By freeing investigators from the relentless pressure of securing external funding, Artemis promotes intellectual risk-taking and collaboration, fostering an environment where transformative discoveries can emerge from sustained, deep inquiry rather than short-term, outcome-predictable projects. Core Investigators anchor the epistemic rigour of their Centers, mentoring junior fellows and shaping research agendas that span years rather than funding cycles.',
  },
  {
    title: 'Translational Programs',
    content: 'The Translational Programs bridge the gap between research and practical application, ensuring that scientific breakthroughs translate into tangible benefits for society. These programmes provide a robust infrastructure — including streamlined intellectual property licensing, funding support, and entrepreneurial mentorship — to facilitate the movement of discoveries from the laboratory to real-world solutions. By fostering a culture of innovation and entrepreneurship, the Translational Programs accelerate the impact of academic research while maintaining rigorous ethical oversight. Every translational project is reviewed for its social implications, ensuring that the pursuit of application never compromises the values of equity, sustainability, and human dignity that underpin the Artemis mission.',
  },
  {
    title: 'Technology Centers',
    content: 'The Technology Development Centers serve as the technological backbone of the Centers of Inquiry, focusing on the development and distribution of advanced tools and technologies. These centres represent a centralised hub for technological innovation, providing researchers with cutting-edge resources — from bio-fabrication laboratories and quantum computing cleanrooms to advanced computational modelling infrastructure — to advance their scientific endeavours. This collaborative model accelerates technological advancements and enhances the overall research infrastructure, ensuring that no Center operates in isolation and that breakthrough tools developed for one domain are rapidly available to researchers across the entire network.',
  },
];

/* ─── Guild Data ─── */
const guildLayers = [
  { layer: 'Inquiry', desc: 'Transdisciplinary research advancing foundational questions in vital domains (e.g., biotech ethics, urban resilience).', integration: 'Evolves CoI\'s curiosity-driven hubs into collaborative think tanks, feeding discoveries directly into the Knowledge Core for holistic preservation.' },
  { layer: 'Capstone Catalysts', desc: 'Integrates student projects into live Guild missions, ensuring capstones produce open IP or prototypes.', integration: 'Aligns with "Learners as Junior Fellows," mandating capstone embedding in CoI research cycles for immersive, outcome-oriented learning.' },
  { layer: 'Deployment Interfaces', desc: 'Field-tests tools in civic, planetary, or industry settings via global nodes (e.g., Nairobi labs, virtual simulations).', integration: 'Extends Translational Programs, accelerating CoI breakthroughs into real-world applications with ethical oversight from the Knowledge Core.' },
  { layer: 'Commons Nodes', desc: 'Archives and publishes open-access outputs with modular remix licenses, enabling global collaboration.', integration: 'Serves as the API-driven interface to the Knowledge Core, ensuring Guild artifacts enrich humanity\'s collective intellectual identity.' },
  { layer: 'Challenge Engines', desc: 'Curates seasonal sprints (2-6 weeks) and residencies to tackle urgent challenges, drawing from CoI priorities.', integration: 'Operationalizes the Infinite Learning Continuum, blending CoI\'s immersive fellowships with high-velocity, challenge-based action.' },
];

const cycles = [
  {
    name: 'Residency Cycles',
    duration: '3-6 Months',
    desc: 'Immersive embeds in Guild missions, blending CoI fellowships with field labs. Students and fellows rotate across global nodes — from Bali for cultural futurism to Toronto for AI ethics — producing capstone prototypes tested in civic contexts. These residencies tie directly to Translational Programs, with Knowledge Core provenance tracking enabling remix and iteration by subsequent cohorts.',
    steps: ['CoI Proposal & Fellow Selection', 'Embed in Guild Mission: Interdisciplinary Team Formation', 'Hands-On Research: Capstone Ideation & Prototyping', 'Field Lab Rotation: Global Node Immersion', 'Deployment Test: Civic Feedback & Iteration', 'Output: Capstone Prototype & Knowledge Core Publication', 'Reflection: Junior Fellow Review & Cycle Close'],
  },
  {
    name: 'Sprint Cycles',
    duration: '2-6 Weeks',
    desc: 'High-intensity challenges drawn from CoI priorities — for example, a "Bioethics Sprint" addressing gene-editing dilemmas. Open to junior fellows and external collaborators, sprints culminate in hackathon-style deliverables. Sprint Cycles are mandatory for Year 3+ students, feeding prototypes directly into deployment interfaces where they can be tested and refined.',
    steps: ['CoI Priority Challenge Announcement', 'Team Assembly: Junior Fellows & Civic Advisors Join', 'Intensive Inquiry: Rapid Ideation & Experimentation', 'Hackathon Phase: Collaborative Prototyping', 'Review & Pitch: Capstone Alignment Check', 'Deliverable: Open IP Output to Commons Node', 'Debrief: Lessons to Knowledge Core & Next Sprint Prep'],
  },
  {
    name: 'Deployment Cycles',
    duration: 'Ongoing, Quarterly Reviews',
    desc: 'Real-world testing in planetary settings, with iterative feedback from civic advisors. Outputs loop back to Inquiry layers for refinement. These cycles mirror the Infinite Continuum\'s experiential arc, ensuring that capstones contribute to the Knowledge Core\'s evolving repository rather than existing as isolated academic exercises with no impact beyond the classroom.',
    steps: ['Guild Prototype Selection', 'Field Test: Planetary Node Activation', 'Civic Feedback Loop: Advisor Input & Iteration', 'Impact Metrics: Capstone Evaluation & Ethical Review', 'Refinement: Loop Back to CoI Inquiry', 'Archival: Updated Artifact to Knowledge Core', 'Quarterly Review: Scale or Adapt for Next Cycle'],
  },
];

/* ─── Component ─── */
export default function CentersOfInquiry({ goToPage }: Props) {
  const [activePillar, setActivePillar] = useState(0);
  const introAnim = useInView();
  const pillarsAnim = useInView();
  const centersAnim = useInView();
  const guildAnim = useInView();
  const cyclesAnim = useInView();

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      {/* Sub-header */}
      <div className="sticky top-[50px] z-40 bg-white border-b border-gray-100 flex items-center px-6 lg:px-16 shrink-0 h-[60px] shadow-sm">
        <button onClick={() => goToPage('research')} className="text-[12px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#8A0000] transition-colors mr-6">
          &larr; Research
        </button>
        <h2 className="text-[14px] font-bold tracking-tight text-[#8A0000] whitespace-nowrap">Centers of Inquiry</h2>
      </div>

      {/* Hero */}
      <section className="relative w-full h-[45vh] min-h-[340px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=1800" alt="Centers of Inquiry" className="absolute inset-0 w-full h-full object-cover grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1000px] mx-auto w-full px-6 lg:px-16 pb-14">
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Frontiers of Research</span>
          </div>
          <h1 className="text-[44px] md:text-[52px] font-extrabold leading-[1.05] tracking-tighter text-white mb-4 uppercase">Centers of Inquiry</h1>
          <p className="text-[17px] text-white/70 max-w-xl leading-relaxed font-light">The epicenters of transformative research — where curiosity-driven exploration meets goal-oriented inquiry to address the grand challenges of our time.</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-[1000px] mx-auto w-full px-6 lg:px-16 py-20">
        <div ref={introAnim.ref} className={`transition-all duration-700 ${introAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Our Approach</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">Replacing departments with purpose</h2>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-4 max-w-2xl">Our Centers of Inquiry stand as the epicenters of transformative research. These centers are structured to seamlessly blend curiosity-driven exploration with goal-oriented research, focusing on unraveling significant challenges. Inspired by the pursuit of knowledge as a cohesive whole, these centers are the cornerstone of our academic landscape.</p>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-4 max-w-2xl">Each center is a powerhouse of interdisciplinary collaboration, bringing together researchers from diverse disciplines to tackle complex challenges. Modeled on the principles of curiosity-driven research and a commitment to truth, these centers aim not only to unravel mysteries but to address grand challenges that transcend disciplinary boundaries. The goal is to foster an environment rooted in scientific curiosity, a commitment to truth, and interdisciplinary collaboration — a collective effort to solve complex problems facing society.</p>
          <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl">They replace traditional academic departments, creating an intellectual environment where reality is seen as interconnected and holistic, preventing distortions and imbalances that might arise from an exclusive focus on specific disciplines. This approach aligns with the vision of fostering a "philosophical habit of mind," encouraging learners to perceive knowledge as unified.</p>
        </div>
      </section>

      {/* Pillar Tabs */}
      <section className="bg-gray-50 py-20">
        <div ref={pillarsAnim.ref} className={`max-w-[1000px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${pillarsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Five Pillars</span>
          </div>
          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-10">How the Centers operate</h2>

          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 mb-10">
            {pillars.map((p, i) => (
              <button key={i} onClick={() => setActivePillar(i)} className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${activePillar === i ? 'bg-[#8A0000] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#8A0000] hover:text-[#8A0000]'}`}>
                {p.title}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="bg-white border border-gray-100 p-8 md:p-10">
            <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-4 uppercase">{pillars[activePillar].title}</div>
            <p className="text-[16px] text-gray-600 leading-relaxed">{pillars[activePillar].content}</p>
          </div>
        </div>
      </section>

      {/* All Centers Grid */}
      <section className="py-20">
        <div ref={centersAnim.ref} className={`max-w-[1000px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${centersAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Our Centers</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="space-y-12">
            {centers.map((center, i) => (
              <div key={i} onClick={() => goToPage('center-detail', center.slug)} className="group cursor-pointer grid grid-cols-1 md:grid-cols-2 gap-8 border border-gray-100 hover:border-[#8A0000] transition-all bg-white overflow-hidden shadow-sm hover:shadow-lg">
                <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
                  <img src={center.img} alt={center.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">{center.tag}</div>
                  <h3 className="text-[24px] font-bold text-[#141414] mb-3 group-hover:text-[#8A0000] transition-colors leading-tight">{center.name}</h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed mb-4">{center.longDesc}</p>
                  <div className="flex gap-6 mb-5 text-[12px]">
                    <div><span className="font-black text-[#141414]">{center.investigators}</span> <span className="text-gray-500">Investigators</span></div>
                    <div><span className="font-black text-[#141414]">{center.fellows}</span> <span className="text-gray-500">Junior Fellows</span></div>
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#141414] border-b border-black w-fit group-hover:text-[#8A0000] group-hover:border-[#8A0000] transition-all">
                    Explore Center &rarr;
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guilds Section */}
      <section className="bg-gray-50 py-20">
        <div ref={guildAnim.ref} className={`max-w-[1000px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${guildAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Applied Engine</span>
          </div>
          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">Guilds as the Applied Engine of Planetary Inquiry</h2>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-4 max-w-2xl">In the University of Artemis&apos;s vision for a reimagined higher education ecosystem, research is not a siloed pursuit but a dynamic force for planetary renewal. The Guilds represent the operational evolution of the foundational Centers of Inquiry (CoI) and the expansive Knowledge Core, transforming curiosity-driven exploration into actionable, civic-embedded intelligence.</p>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-12 max-w-2xl">This architecture positions Guilds as the &ldquo;frontier layer&rdquo; atop the CoI&apos;s epistemic depth: where Centers generate unified knowledge, Guilds propel it into real-world systems through cyclical activities, co-stewardship, and student-integrated missions. Aligned with Artemis&apos;s governance ethos of adaptive, participatory structures, Guilds ensure research serves the Commons — fostering ethical, resilient innovations for a just global future.</p>

          {/* Operational Layers Table */}
          <h3 className="text-[20px] font-bold text-[#141414] mb-6">Operational Layers of the Guilds</h3>
          <p className="text-[14px] text-gray-600 leading-relaxed mb-6">Guilds operate across five interconnected roles. These layers bridge the Knowledge Core&apos;s archival unity with the CoI&apos;s innovative hubs, embedding student capstones as core drivers of progress. This layered design ensures Guilds are not parallel entities but amplifiers: CoI provide the intellectual scaffolding, while Guilds infuse dynamism through cycles of inquiry-action-reflection.</p>
          <div className="overflow-x-auto mb-12">
            <table className="w-full text-left border border-gray-200 bg-white">
              <thead>
                <tr className="bg-[#8A0000] text-white">
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest">Layer</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest">Description</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest hidden md:table-cell">Integration with Artemis</th>
                </tr>
              </thead>
              <tbody>
                {guildLayers.map((gl, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-4 px-6 text-[14px] font-bold text-[#8A0000] whitespace-nowrap">{gl.layer}</td>
                    <td className="py-4 px-6 text-[14px] text-gray-700">{gl.desc}</td>
                    <td className="py-4 px-6 text-[13px] text-gray-500 hidden md:table-cell">{gl.integration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Co-Stewardship */}
          <h3 className="text-[20px] font-bold text-[#141414] mb-6">Co-Stewardship for Adaptive Intelligence</h3>
          <p className="text-[14px] text-gray-600 leading-relaxed mb-6">Guild governance distributes authority across a triadic structure of faculty leads, civic advisors, and student fellows, creating a co-stewardship model that ensures every voice is heard and every perspective is integrated into decision-making.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 border border-gray-100">
              <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">Core Investigators</div>
              <h4 className="text-[16px] font-bold text-[#141414] mb-3">2-3 per Guild</h4>
              <p className="text-[14px] text-gray-600 leading-relaxed">Appointed via CoI nomination for 3-year renewable terms. They anchor epistemic rigor, drawing from long-term CoI appointments to pursue high-risk inquiries without grant pressures.</p>
            </div>
            <div className="bg-white p-6 border border-gray-100">
              <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">Civic Advisors</div>
              <h4 className="text-[16px] font-bold text-[#141414] mb-3">3-5 per Guild</h4>
              <p className="text-[14px] text-gray-600 leading-relaxed">Representatives from global nodes — indigenous knowledge keepers, industry ethicists, community leaders. Selected through open calls, they ensure deployments reflect diverse planetary contexts.</p>
            </div>
            <div className="bg-white p-6 border border-gray-100">
              <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">Junior Fellows</div>
              <h4 className="text-[16px] font-bold text-[#141414] mb-3">5-10 per Guild</h4>
              <p className="text-[14px] text-gray-600 leading-relaxed">Rotating cohort of undergraduates and graduates, elected from capstone participants. They co-design challenges, representing the Infinite Continuum&apos;s learner-centric flow and injecting fresh perspectives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cycles of Activity */}
      <section className="py-20">
        <div ref={cyclesAnim.ref} className={`max-w-[1000px] mx-auto w-full px-6 lg:px-16 transition-all duration-700 ${cyclesAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Cycles of Activity</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">Three interlocking rhythms</h2>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-12 max-w-2xl">Guilds pulse through three interlocking cycles, synchronized with Artemis&apos;s global calendar. These rhythms operationalize CoI&apos;s static hubs into fluid engines, ensuring capstones evolve from ideation to deployment.</p>

          <div className="space-y-12">
            {cycles.map((cycle, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 p-8 md:p-10">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] font-bold text-[#8A0000] tracking-widest uppercase">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-[22px] font-bold text-[#141414]">{cycle.name}</h3>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 bg-white px-3 py-1 border border-gray-200">{cycle.duration}</span>
                </div>
                <p className="text-[15px] text-gray-600 leading-relaxed mb-6">{cycle.desc}</p>
                <div className="flex flex-col gap-0">
                  {cycle.steps.map((step, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${j === 0 ? 'bg-[#8A0000]' : j === cycle.steps.length - 1 ? 'bg-green-700' : 'bg-gray-300'}`}></div>
                        {j < cycle.steps.length - 1 && <div className="w-0.5 h-6 bg-gray-200"></div>}
                      </div>
                      <span className="text-[13px] text-gray-700">{step}</span>
                    </div>
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
