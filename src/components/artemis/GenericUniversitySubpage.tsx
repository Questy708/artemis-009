'use client';

import React, { useState, useEffect, useRef } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import { ChevronRight, Download, ExternalLink, MapPin, Globe, Building2, Server } from 'lucide-react';

interface Props {
  goToPage: (page: string) => void;
  title: string;
  parentTitle: string;
  parentId: string;
}

/* ─── Scroll-triggered animation hook ─── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/* ─── Reusable section divider ─── */
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center py-12">
      <div className="flex-grow border-t border-gray-200"></div>
      <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">{label}</span>
      <div className="flex-grow border-t border-gray-200"></div>
    </div>
  );
}

/* ─── Red line accent label ─── */
function RedAccentLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-8 h-[1px] bg-[#8A0000]"></span>
      <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#8A0000]">{text}</span>
    </div>
  );
}

/* ─── Stat block ─── */
function StatBlock({ number, label, detail }: { number: string; label: string; detail?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`border-l-2 border-[#8A0000] pl-6 py-2 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="text-[36px] lg:text-[44px] font-extrabold tracking-tighter text-[#141414] leading-none">
        {number}
      </div>
      <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#8A0000] mt-2">{label}</div>
      {detail && <div className="text-[13px] text-gray-500 mt-1 leading-relaxed">{detail}</div>}
    </div>
  );
}

/* ─── Link row ─── */
function LinkRow({ label, onClick, icon }: { label: string; onClick: () => void; icon?: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center justify-between w-full py-4 border-b border-gray-100 hover:border-[#8A0000] transition-colors text-left"
    >
      <div className="flex items-center gap-3">
        {icon && <span className="text-gray-400 group-hover:text-[#8A0000] transition-colors">{icon}</span>}
        <span className="text-[15px] font-bold text-gray-700 group-hover:text-black transition-colors">{label}</span>
      </div>
      <ChevronRight size={18} className="text-gray-300 group-hover:text-[#8A0000] transition-colors" />
    </button>
  );
}

/* ─── Scroll-reveal wrapper ─── */
function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FACTS AND FIGURES PAGE
   ═══════════════════════════════════════════════════════ */
function FactsAndFigures({ goToPage }: { goToPage: (page: string) => void }) {
  const mainStats = [
    { number: '350+', label: 'Scholars', detail: 'Across all programmes and micro-colleges' },
    { number: '20', label: 'Micro-Colleges', detail: 'Autonomous learning communities worldwide' },
    { number: '6', label: 'Continents', detail: 'Physical presence spanning the globe' },
    { number: '$12M', label: 'Research Expenditure', detail: 'Annual investment in discovery' },
    { number: '0', label: 'Spin-Offs', detail: 'Building from foundational research' },
    { number: '120+', label: 'Staff', detail: 'Faculty, researchers, and professionals' },
    { number: '28+', label: 'Countries', detail: 'Represented in our scholar body' },
    { number: '15', label: 'Departments', detail: 'Spanning every discipline' },
  ];

  const demographics = [
    { region: 'Europe', pct: 32 },
    { region: 'Asia-Pacific', pct: 28 },
    { region: 'Africa', pct: 18 },
    { region: 'Americas', pct: 15 },
    { region: 'Middle East', pct: 7 },
  ];

  const researchGrowth = [
    { year: '2026', value: '$12M' },
    { year: '2028', value: '$35M' },
    { year: '2030', value: '$80M' },
  ];

  return (
    <>
      <div className="max-w-[1000px] mx-auto w-full px-6 lg:px-16 pb-32">
        {/* Key Statistics */}
        <SectionDivider label="Key Statistics" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          {mainStats.map((stat, i) => (
            <StatBlock key={i} number={stat.number} label={stat.label} detail={stat.detail} />
          ))}
        </div>

        {/* Student Demographics */}
        <SectionDivider label="Student Demographics" />

        <RevealSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-[28px] font-bold text-[#141414] tracking-tight mb-4">A Global Scholar Body</h2>
              <p className="text-[14px] text-gray-500 leading-relaxed">
                Artemis scholars represent 28+ nationalities, creating one of the most diverse learning communities in higher education. Our decentralized model ensures representation from every corner of the world.
              </p>
            </div>
            <div className="lg:col-span-8 space-y-5">
              {demographics.map((d) => (
                <div key={d.region} className="flex items-center gap-4">
                  <span className="text-[13px] font-bold text-[#141414] w-28 shrink-0">{d.region}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#8A0000] rounded-full transition-all duration-1000"
                      style={{ width: `${d.pct}%` }}
                    />
                  </div>
                  <span className="text-[13px] font-bold text-[#8A0000] w-12 text-right">{d.pct}%</span>
                </div>
              ))}
              <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4">
                <div>
                  <div className="text-[28px] font-extrabold tracking-tighter text-[#141414]">52%</div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8A0000]">Postgraduate</div>
                </div>
                <div>
                  <div className="text-[28px] font-extrabold tracking-tighter text-[#141414]">48%</div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8A0000]">Undergraduate</div>
                </div>
                <div>
                  <div className="text-[28px] font-extrabold tracking-tighter text-[#141414]">11:1</div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8A0000]">Staff Ratio</div>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Research Growth */}
        <SectionDivider label="Research Growth" />

        <RevealSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-[28px] font-bold text-[#141414] tracking-tight mb-4">Trajectory of Discovery</h2>
              <p className="text-[14px] text-gray-500 leading-relaxed">
                Research expenditure has projected to grow sevenfold by 2030, fueled by cross-continental collaboration and the Artemis Commons digital infrastructure.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="flex items-end gap-4 h-48">
                {researchGrowth.map((r, i) => {
                  const heights = [15, 45, 100];
                  return (
                    <div key={r.year} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-[13px] font-bold text-[#141414]">{r.value}</span>
                      <div
                        className="w-full bg-[#8A0000] rounded-t-sm transition-all duration-700"
                        style={{ height: `${heights[i]}%` }}
                      />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{r.year}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Financial Overview */}
        <SectionDivider label="Financial Overview" />

        <RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <StatBlock number="$18M" label="Total Revenue" detail="From tuition, grants, partnerships, and endowment returns" />
            <StatBlock number="$15M" label="Total Expenditure" detail="Across research, teaching, infrastructure, and digital estate" />
            <StatBlock number="$48M" label="Endowment" detail="Founding gifts and early endowment" />
          </div>
        </RevealSection>

        {/* Links */}
        <SectionDivider label="Resources" />

        <RevealSection>
          <div className="max-w-lg">
            <LinkRow label="Download factsheet (PDF)" onClick={() => {}} icon={<Download size={16} />} />
            <LinkRow label="Institutional research data" onClick={() => goToPage('research')} icon={<ExternalLink size={16} />} />
            <LinkRow label="Annual report 2024" onClick={() => {}} icon={<Download size={16} />} />
          </div>
        </RevealSection>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   ARTEMIS GLOSSARY PAGE
   ═══════════════════════════════════════════════════════ */
function ArtemisGlossary() {
  const terms = [
    { term: 'ACN', full: 'Artemis Collegium Network', def: 'The federated governance structure that unites all 20 micro-colleges under a single academic charter while preserving their institutional autonomy.' },
    { term: 'Guild System', full: 'Guild System', def: 'A professional affinity framework grouping scholars into cross-disciplinary guilds — Craft, Inquiry, Venture, and Civic — each with distinct rites of passage and mentorship structures.' },
    { term: 'Living Commons', full: 'Living Commons', def: 'Residential-learning hybrid spaces where scholars live, collaborate, and create together. Each commons is purpose-built around a thematic focus, from bio-ethics to quantum computation.' },
    { term: 'Homo Eruditus', full: 'Homo Eruditus', def: 'The Artemis ideal: the perpetually learning human. Our foundational philosophy holds that education is not a phase but an unbroken continuum of becoming.' },
    { term: 'Micro-College', full: 'Micro-College', def: 'A small, self-governing academic community of 200–800 scholars, each with a distinctive disciplinary or thematic identity. The primary unit of belonging at Artemis.' },
    { term: 'Node', full: 'Node', def: 'A physical or digital access point to the Artemis network. Every hub, commons, and virtual classroom is a node in the distributed university architecture.' },
    { term: 'Artemis Commons', full: 'Artemis Commons', def: 'The open digital platform providing virtual classrooms, research cloud, collaborative workspaces, and the Infinite Library — accessible to every Artemis scholar worldwide.' },
    { term: 'The Forge', full: 'The Forge', def: 'Artemis\'s venture incubation ecosystem. A structured programme that transforms research insights into viable enterprises, with dedicated seed funding and mentorship.' },
    { term: 'Nexus', full: 'Nexus', def: 'The annual gathering where all micro-colleges convene for a week of interdisciplinary exchange, presentations, and collective decision-making on university-wide matters.' },
    { term: 'Purpose Learning', full: 'Purpose Learning', def: 'Artemis\'s pedagogical framework that anchors every programme to a real-world challenge. Scholars declare a Purpose alongside their subject, ensuring study is never abstracted from impact.' },
    { term: 'Infinite Learning Continuum', full: 'Infinite Learning Continuum', def: 'The principle that Artemis enrolment is lifelong. Graduates retain full access to courses, research infrastructure, and community — learning does not end at degree conferral.' },
    { term: 'Capstone', full: 'Capstone', def: 'A culminating project or thesis that demonstrates mastery and purpose alignment. Required for all Artemis degrees, evaluated by cross-guild panels rather than single examiners.' },
    { term: 'Co-Design', full: 'Co-Design', def: 'The practice of involving scholars in shaping curriculum, governance, and campus experience. No major institutional decision is made without student representation in the process.' },
    { term: 'Digital Estate', full: 'Digital Estate', def: 'The entirety of Artemis\'s virtual infrastructure — from the Commons platform to research cloud, AI tutoring systems, and the distributed ledger for credential verification.' },
    { term: 'Guild Rite', full: 'Guild Rite', def: 'A milestone ceremony marking a scholar\'s progression within their guild. Rites are designed by guild members and celebrate growth, contribution, and readiness for new responsibilities.' },
    { term: 'The Infinite Library', full: 'The Infinite Library', def: 'A globally distributed digital repository of all Artemis research, course materials, and scholarly outputs. Open-access by default, it embodies the university\'s commitment to knowledge as a public good.' },
  ];

  return (
    <>
      <div className="max-w-[1000px] mx-auto w-full px-6 lg:px-16 pb-32">
        <SectionDivider label="Core Terms" />

        {/* Glossary list */}
        <div className="space-y-0">
          {terms.map((t, i) => {
            const isCore = i < 8;
            return (
              <GlossaryEntry key={t.term} term={t.term} full={t.full} def={t.def} isCore={isCore} />
            );
          })}
        </div>

        <SectionDivider label="Philosophy & Practice" />

        <RevealSection>
          <div className="bg-gray-50 p-8 lg:p-12 rounded-lg">
            <RedAccentLabel text="On Language" />
            <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
              The vocabulary of Artemis is intentionally distinct. Each term reflects a deliberate departure from traditional academic conventions — not for novelty&apos;s sake, but because the structures they describe are genuinely new. When we say &ldquo;micro-college&rdquo; instead of &ldquo;college,&rdquo; we are signalling a fundamentally different scale, governance model, and relationship between scholar and institution.
            </p>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              Language shapes thought. By articulating our structures with precision, we ensure that every member of the Artemis community shares a common understanding of what makes this university unlike any other.
            </p>
          </div>
        </RevealSection>
      </div>
    </>
  );
}

function GlossaryEntry({ term, full, def, isCore }: { term: string; full: string; def: string; isCore: boolean }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`border-b border-gray-100 py-6 grid grid-cols-1 lg:grid-cols-12 gap-4 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
    >
      <div className="lg:col-span-3 flex items-start gap-3">
        <span className={`shrink-0 w-2 h-2 rounded-full mt-2 ${isCore ? 'bg-[#8A0000]' : 'bg-gray-300'}`} />
        <div>
          <div className="text-[15px] font-extrabold text-[#141414]">{term}</div>
          <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mt-0.5">{full}</div>
        </div>
      </div>
      <div className="lg:col-span-9">
        <p className="text-[14px] text-gray-600 leading-relaxed">{def}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   OUR ESTATE PAGE
   ═══════════════════════════════════════════════════════ */
function OurEstate({ goToPage }: { goToPage: (page: string) => void }) {
  const hubs = [
    { name: 'Valletta Hub', location: 'Malta', desc: 'Global headquarters and primary governance centre. Houses the Central Council chambers and the Nexus convening hall.', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=600' },
    { name: 'Geneva Hub', location: 'Switzerland', desc: 'Centre for International Relations and Diplomatic Studies. Adjacent to UN and WTO institutions.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600' },
    { name: 'Berlin Hub', location: 'Germany', desc: 'Innovation and Venture hub, home to The Forge incubator and the School of Creative Industries.', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=600' },
    { name: 'Kigali Hub', location: 'Rwanda', desc: 'Centre for Sustainable Development and African Studies. A living laboratory for urban innovation.', img: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&q=80&w=600' },
    { name: 'Singapore Hub', location: 'Singapore', desc: 'Asia-Pacific gateway. Focuses on computational sciences, fintech, and cross-cultural research.', img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=600' },
    { name: 'São Paulo Hub', location: 'Brazil', desc: 'Latin American centre for biodiversity research, social innovation, and the Civic Guild training grounds.', img: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=600' },
  ];

  return (
    <>
      <div className="max-w-[1000px] mx-auto w-full px-6 lg:px-16 pb-32">
        {/* Estate at a Glance */}
        <SectionDivider label="At a Glance" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          <StatBlock number="25,000" label="Sq Ft Research Space" detail="Across all physical hubs" />
          <StatBlock number="12" label="Residential Commons" detail="Purpose-built living-learning communities" />
          <StatBlock number="8" label="Global Hubs" detail="Physical presence on every major continent" />
          <StatBlock number="99.9%" label="Uptime" detail="Digital platform availability, 2024" />
        </div>

        {/* Physical Hubs */}
        <SectionDivider label="Physical Hubs" />

        <RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hubs.map((hub) => (
              <HubCard key={hub.name} hub={hub} />
            ))}
          </div>
        </RevealSection>

        {/* Digital Estate */}
        <SectionDivider label="Digital Estate" />

        <RevealSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <h2 className="text-[28px] font-bold text-[#141414] tracking-tight mb-4">Artemis Commons</h2>
              <p className="text-[14px] text-gray-500 leading-relaxed mb-6">
                The digital backbone of the university. Artemis Commons is a distributed platform that ensures every scholar — regardless of location — has equal access to learning, research, and community.
              </p>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <DigitalEstateFeature
                icon={<Server size={20} />}
                title="Virtual Classrooms"
                desc="Immersive, low-latency learning spaces supporting real-time collaboration across time zones. Built on WebRTC with spatial audio for natural interaction."
              />
              <DigitalEstateFeature
                icon={<Globe size={20} />}
                title="Research Cloud"
                desc="A shared computational infrastructure providing GPU clusters, data lakes, and collaborative notebooks. Every researcher has equal allocation, regardless of hub."
              />
              <DigitalEstateFeature
                icon={<Building2 size={20} />}
                title="Infinite Library"
                desc="All Artemis research outputs, course materials, and scholarly works — open-access by default. Integrated AI-assisted discovery and citation tools."
              />
            </div>
          </div>
        </RevealSection>

        {/* Sustainability */}
        <SectionDivider label="Sustainability" />

        <RevealSection>
          <div className="bg-gray-50 p-8 lg:p-12 rounded-lg">
            <RedAccentLabel text="Carbon Negative by 2030" />
            <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
              Artemis has committed to becoming carbon negative by 2030. Our distributed model inherently reduces the environmental cost of education — fewer daily commutes, shared digital infrastructure, and hubs designed to Passivhaus standards.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="border-l-2 border-[#8A0000] pl-4">
                <div className="text-[24px] font-extrabold text-[#141414]">72%</div>
                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8A0000]">Renewable Energy</div>
                <div className="text-[12px] text-gray-500 mt-1">Across all hubs, 2024</div>
              </div>
              <div className="border-l-2 border-[#8A0000] pl-4">
                <div className="text-[24px] font-extrabold text-[#141414]">Zero</div>
                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8A0000]">Single-Use Plastic</div>
                <div className="text-[12px] text-gray-500 mt-1">All campus operations</div>
              </div>
              <div className="border-l-2 border-[#8A0000] pl-4">
                <div className="text-[24px] font-extrabold text-[#141414]">1,200</div>
                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8A0000]">Trees Planted</div>
                <div className="text-[12px] text-gray-500 mt-1">Via the Artemis Reforestation Trust</div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Links */}
        <SectionDivider label="Explore" />

        <RevealSection>
          <div className="max-w-lg">
            <LinkRow label="Campus maps" onClick={() => goToPage('campus')} icon={<MapPin size={16} />} />
            <LinkRow label="Hub details and directions" onClick={() => goToPage('estate')} icon={<ExternalLink size={16} />} />
            <LinkRow label="Digital platform access" onClick={() => {}} icon={<Globe size={16} />} />
            <LinkRow label="Sustainability plan 2024–2030" onClick={() => {}} icon={<Download size={16} />} />
          </div>
        </RevealSection>
      </div>
    </>
  );
}

function HubCard({ hub }: { hub: { name: string; location: string; desc: string; img: string } }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`group rounded-lg overflow-hidden border border-gray-100 hover:border-[#8A0000] transition-all duration-500 hover:shadow-lg ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={hub.img}
          alt={hub.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={14} className="text-[#8A0000]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8A0000]">{hub.location}</span>
        </div>
        <h3 className="text-[17px] font-bold text-[#141414] mb-2">{hub.name}</h3>
        <p className="text-[13px] text-gray-500 leading-relaxed">{hub.desc}</p>
      </div>
    </div>
  );
}

function DigitalEstateFeature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex gap-4 p-6 bg-gray-50 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 transition-all">
      <div className="shrink-0 text-[#8A0000] mt-1">{icon}</div>
      <div>
        <h4 className="text-[15px] font-bold text-[#141414] mb-1">{title}</h4>
        <p className="text-[13px] text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   BRAND PAGE
   ═══════════════════════════════════════════════════════ */
function Brand({ goToPage }: { goToPage: (page: string) => void }) {
  const colors = [
    { hex: '#8A0000', name: 'Crimson', role: 'Primary accent. Used for emphasis, links, markers, and interactive elements.' },
    { hex: '#141414', name: 'Near-Black', role: 'Strong headings, body emphasis, and structural text.' },
    { hex: '#FFFFFF', name: 'White', role: 'Primary background. Clean, expansive, and authoritative.' },
    { hex: '#F3F4F6', name: 'Gray-100', role: 'Secondary backgrounds, cards, and subtle separation.' },
    { hex: '#6B7280', name: 'Gray-500', role: 'Body text, descriptions, and supporting content.' },
  ];

  const typography = [
    { label: 'Display', style: 'text-[48px] lg:text-[64px] font-extrabold tracking-tighter uppercase', example: 'ARTEMIS' },
    { label: 'Heading', style: 'text-[28px] font-bold tracking-tight', example: 'Section Title' },
    { label: 'Subheading', style: 'text-[17px] font-bold', example: 'Content Subheading' },
    { label: 'Body', style: 'text-[15px] text-gray-600 leading-relaxed', example: 'Running text for paragraphs and descriptions.' },
    { label: 'Label', style: 'text-[12px] font-bold uppercase tracking-[0.2em]', example: 'SECTION LABEL' },
  ];

  return (
    <>
      <div className="max-w-[1000px] mx-auto w-full px-6 lg:px-16 pb-32">
        {/* Brand Philosophy */}
        <SectionDivider label="Brand Philosophy" />

        <RevealSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-[28px] font-bold text-[#141414] tracking-tight mb-4">Clarity Over Cleverness</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
                The Artemis brand speaks with the authority of an institution that has earned its confidence. We do not shout; we state. We do not decorate; we distill. Every visual and verbal choice reflects the university&apos;s commitment to substance over spectacle.
              </p>
              <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
                Our identity is built on three pillars: <strong className="text-[#141414]">Conviction</strong> — we believe in the transformative power of education; <strong className="text-[#141414]">Inclusivity</strong> — knowledge belongs to everyone; and <strong className="text-[#141414]">Precision</strong> — we choose every word and pixel with intention.
              </p>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                The crimson accent is not decorative. It is directional — guiding attention, marking significance, and providing continuity across every touchpoint of the Artemis experience.
              </p>
            </div>
          </div>
        </RevealSection>

        {/* Color Palette */}
        <SectionDivider label="Color Palette" />

        <RevealSection>
          <div className="space-y-6">
            {colors.map((c) => (
              <div key={c.hex} className="flex items-center gap-6 py-4 border-b border-gray-100">
                <div
                  className="w-16 h-16 rounded-lg shrink-0 border border-gray-100"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[15px] font-bold text-[#141414]">{c.name}</span>
                    <span className="text-[12px] font-mono text-gray-400">{c.hex}</span>
                  </div>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{c.role}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* Typography */}
        <SectionDivider label="Typography" />

        <RevealSection>
          <div className="space-y-8">
            {typography.map((t) => (
              <div key={t.label} className="border-b border-gray-100 pb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A0000]">{t.label}</span>
                </div>
                <div className={t.style}>{t.example}</div>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* Logo Usage */}
        <SectionDivider label="Logo Usage" />

        <RevealSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-[28px] font-bold text-[#141414] tracking-tight mb-4">The Artemis Wordmark</h2>
              <p className="text-[14px] text-gray-500 leading-relaxed">
                The Artemis wordmark is always set in uppercase with extra-bold weight and tight tracking. It never appears in lowercase, never in italics, and never with effects or gradients.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-6">
                {/* Correct usage */}
                <div className="p-8 bg-gray-50 rounded-lg border-2 border-green-100">
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-green-700 mb-4">Correct Usage</div>
                  <div className="text-[36px] font-extrabold tracking-tighter text-[#141414] uppercase mb-2">ARTEMIS</div>
                  <p className="text-[12px] text-gray-500">Uppercase, extra-bold, tight tracking, on white or light backgrounds.</p>
                </div>
                {/* Incorrect usage */}
                <div className="p-8 bg-gray-50 rounded-lg border-2 border-red-100">
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A0000] mb-4">Incorrect Usage</div>
                  <div className="space-y-3">
                    <div className="text-[36px] font-light tracking-widest text-gray-300 italic lowercase">artemis</div>
                    <p className="text-[12px] text-gray-500">Never use lowercase, light weight, wide tracking, or italics.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Tone of Voice */}
        <SectionDivider label="Tone of Voice" />

        <RevealSection>
          <div className="bg-gray-50 p-8 lg:p-12 rounded-lg">
            <RedAccentLabel text="Writing as Artemis" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div>
                <h4 className="text-[15px] font-bold text-[#141414] mb-3">We Are</h4>
                <ul className="space-y-2 text-[14px] text-gray-600">
                  <li className="flex items-start gap-2"><span className="text-[#8A0000] mt-0.5">•</span> Confident but never arrogant</li>
                  <li className="flex items-start gap-2"><span className="text-[#8A0000] mt-0.5">•</span> Precise but never cold</li>
                  <li className="flex items-start gap-2"><span className="text-[#8A0000] mt-0.5">•</span> Ambitious but never grandiose</li>
                  <li className="flex items-start gap-2"><span className="text-[#8A0000] mt-0.5">•</span> Inclusive but never vague</li>
                  <li className="flex items-start gap-2"><span className="text-[#8A0000] mt-0.5">•</span> Direct but never blunt</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-[#141414] mb-3">We Are Not</h4>
                <ul className="space-y-2 text-[14px] text-gray-600">
                  <li className="flex items-start gap-2"><span className="text-gray-300 mt-0.5">•</span> Hyperbolic or sales-driven</li>
                  <li className="flex items-start gap-2"><span className="text-gray-300 mt-0.5">•</span> Exclusionary or elitist</li>
                  <li className="flex items-start gap-2"><span className="text-gray-300 mt-0.5">•</span> Flippant or irreverent</li>
                  <li className="flex items-start gap-2"><span className="text-gray-300 mt-0.5">•</span> Jargon-heavy without explanation</li>
                  <li className="flex items-start gap-2"><span className="text-gray-300 mt-0.5">•</span> Passive or non-committal</li>
                </ul>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Download Links */}
        <SectionDivider label="Brand Assets" />

        <RevealSection>
          <div className="max-w-lg">
            <LinkRow label="Download logo pack (SVG + PNG)" onClick={() => {}} icon={<Download size={16} />} />
            <LinkRow label="Brand guidelines PDF" onClick={() => {}} icon={<Download size={16} />} />
            <LinkRow label="Web style guide" onClick={() => {}} icon={<ExternalLink size={16} />} />
            <LinkRow label="Editorial guidelines" onClick={() => {}} icon={<Download size={16} />} />
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
              For brand enquiries or partnership usage requests:
            </p>
            <button
              onClick={() => goToPage('contact-us')}
              className="text-[14px] font-bold text-[#8A0000] border-b-2 border-[#8A0000] pb-0.5 hover:text-[#6B0000] hover:border-[#6B0000] transition-colors"
            >
              Contact the Brand Team
            </button>
          </div>
        </RevealSection>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function GenericUniversitySubpage({ goToPage, title, parentTitle, parentId }: Props) {
  const heroImages: Record<string, { image: string; label: string }> = {
    'Facts and figures': { image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1800', label: 'By the Numbers' },
    'Artemis Glossary': { image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1800', label: 'Definitions' },
    'Our estate': { image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1800', label: 'Infrastructure' },
    'Brand': { image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=1800', label: 'Visual Identity' },
  };
  const heroConfig = heroImages[title];

  return (
    <div className="flex flex-col bg-white">
      {/* Sub-header */}
      <div className="sticky top-[50px] z-40 bg-white border-b border-gray-100 flex items-center px-6 lg:px-16 shrink-0 h-[60px] shadow-sm">
        <h2 className="text-[14px] font-bold tracking-tight text-[#8A0000] mr-10 whitespace-nowrap cursor-pointer hover:opacity-80" onClick={() => goToPage('the-university')}>
          The University
        </h2>
        <div className="hidden md:flex space-x-6 text-[12px] font-bold uppercase tracking-widest text-gray-400 overflow-x-auto hide-scrollbar">
          <span className="text-black whitespace-nowrap border-b-2 border-[#8A0000]">{title}</span>
        </div>
      </div>

      {/* Hero Image */}
      {heroConfig && (
        <section className="relative w-full h-[55vh] min-h-[400px] overflow-hidden">
          <img src={heroConfig.image} className="absolute inset-0 w-full h-full object-cover grayscale" alt={title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative z-10 flex flex-col justify-end h-full max-w-[1000px] mx-auto w-full px-6 lg:px-16 pb-16">
            <div className="mb-8 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">{heroConfig.label}</span>
            </div>
            <h1 className="text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6 uppercase">{title}</h1>
          </div>
        </section>
      )}

      {/* Page Content — switched by title */}
      {title === 'Facts and figures' && <FactsAndFigures goToPage={goToPage} />}
      {title === 'Artemis Glossary' && <ArtemisGlossary />}
      {title === 'Our estate' && <OurEstate goToPage={goToPage} />}
      {title === 'Brand' && <Brand goToPage={goToPage} />}

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
