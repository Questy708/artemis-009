'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, ArrowUpRight, Shield, Heart, Zap, Star, Crown, Building2,
  Home, FlaskConical, GraduationCap, BookOpen, Compass, Mail, Hash,
  Users, Globe, Clock, Calendar, MapPin, Video, Sparkles, Trophy,
  ChevronDown, ChevronRight, Check, Lock, Bitcoin, Wallet, CreditCard,
  Banknote, Repeat, Gift, Eye, MessageSquare, PartyPopper, Target,
  Rocket, Landmark, CircleDot, Flame
} from 'lucide-react';

interface Props {
  goToPage: (page: string) => void;
}

/* ─── Campaign Data ─── */
const CAMPAIGN = {
  goal: 80_000_000,
  raised: 28_400_000,
  donors: 1847,
  currency: 'GBP',
};

const symbol = (c: string) => c === 'GBP' ? '£' : '$';
const fmt = (n: number) => n.toLocaleString('en-GB');
const fmtShort = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return fmt(n);
};

const MILESTONES = [
  { title: 'Digital Foundation', target: 10_000_000, reached: true, desc: 'Core platform, secure infrastructure, and global access layer — deployed and operational across 3 continents.', icon: Rocket },
  { title: 'First Five Nodes', target: 25_000_000, reached: true, desc: 'Geneva, Valletta, San Francisco, Tokyo, Reykjavik — five residential hubs now accepting residents.', icon: Globe },
  { title: 'Inaugural Cohort', target: 40_000_000, reached: false, desc: 'Full scholarship fund for the first 200 students across all nodes, with dedicated faculty and mentorship networks.', icon: GraduationCap },
  { title: 'Research Endowment', target: 60_000_000, reached: false, desc: 'Perpetual endowment securing five flagship research institutes with a 20-year operational runway.', icon: FlaskConical },
  { title: 'Global Scale', target: 80_000_000, reached: false, desc: '12 nodes on 6 continents — a truly planetary university with borderless access to knowledge.', icon: Landmark },
];

const PERKS = [
  { id: 'p1', title: 'Founding Cipher', desc: 'A unique cryptographic token permanently recording your contribution on the Artemis ledger. Your name, encrypted, becomes part of the university\'s foundation — visible forever on the public chain.', min: 25, category: 'digital', icon: Hash, color: '#6366f1' },
  { id: 'p2', title: 'The Artemis Dispatch', desc: 'Quarterly intelligence brief from the Chancellor — exclusive essays, research previews, and strategic updates from inside the founding. Not a newsletter. A window into the build.', min: 100, category: 'digital', icon: Mail, color: '#8b5cf6' },
  { id: 'p3', title: 'Node Access Pass', desc: 'Priority invitation to visit any Artemis node worldwide during the founding year. Walk the spaces, meet the community, witness the construction of something unprecedented.', min: 500, category: 'experience', icon: Compass, color: '#0891b2' },
  { id: 'p4', title: 'Founders\' Book', desc: 'A limited-edition leather-bound volume documenting the founding of Artemis — with your name inscribed in the founding roll. Printed on archival paper. Meant to last centuries.', min: 1000, category: 'physical', icon: BookOpen, color: '#059669' },
  { id: 'p5', title: 'Scholarship Patron', desc: 'Fully fund a named micro-scholarship for one student. You choose the focus — AI ethics, marine biology, civic design. They carry your name through their Artemis journey and beyond.', min: 5000, category: 'naming', icon: GraduationCap, color: '#d97706' },
  { id: 'p6', title: 'Lab Dedication', desc: 'Name a research lab within a node. A permanent plaque, a dedication ceremony, and annual reports from the researchers who work there. Your name becomes synonymous with discovery.', min: 25000, category: 'naming', icon: FlaskConical, color: '#dc2626' },
  { id: 'p7', title: 'Commons Naming', desc: 'Name one of the 12 Living Commons. Your name becomes part of daily life at Artemis — spoken by every resident, written on every map, etched into the identity of a community.', min: 100000, category: 'naming', icon: Home, color: '#8A0000' },
  { id: 'p8', title: 'Node Patron', desc: 'Become the patron of an entire Artemis node. The building bears your name. The community carries your legacy. A seat on the Founders\' Council. The highest honour in the founding.', min: 1000000, category: 'naming', icon: Building2, color: '#1a1a2e' },
];

const EVENTS = [
  { id: 'e1', title: 'The Founding Convocation', type: 'gala', desc: 'An evening of vision and commitment. Meet the Chancellor, the founding faculty, and fellow patrons at the Geneva node. Black tie. Historic.', date: '2026-09-15', location: 'Geneva, Switzerland', virtual: false, capacity: 200, registered: 87, price: 500, icon: Crown },
  { id: 'e2', title: 'Inside the Build: Virtual Site Tour', type: 'webinar', desc: 'Walk through the digital and physical architecture of Artemis with the design team. Live Q&A with founding engineers.', date: '2026-07-22', location: 'Online', virtual: true, capacity: 1000, registered: 432, price: 0, icon: Video },
  { id: 'e3', title: 'Double Impact Day', type: 'matching', desc: 'Every pound donated today is matched pound-for-pound by the Catalyst Foundation. Your £1 becomes £2. 24 hours only.', date: '2026-10-01', location: 'Global', virtual: true, capacity: null, registered: 0, price: null, icon: Zap },
  { id: 'e4', title: 'The Artemis Auction', type: 'auction', desc: 'Bid on naming rights, original artwork, and exclusive experiences — all proceeds fund the Global Scholars Fund.', date: '2026-11-20', location: 'London, UK', virtual: false, capacity: 150, registered: 34, price: 250, icon: Star },
  { id: 'e5', title: 'Hack the Future: 48-Hour Build', type: 'hackathon', desc: 'A founding-weekend hackathon where donors and students co-build tools for the Artemis platform. Prizes. Glory. Pizza.', date: '2026-08-08', location: 'San Francisco, USA', virtual: false, capacity: 100, registered: 61, price: 0, icon: Flame },
  { id: 'e6', title: 'Spring Benefactor Dinner', type: 'gala', desc: 'An intimate dinner for major donors at the Valletta node. Michelin-starred cuisine, Mediterranean views, and the future of knowledge.', date: '2027-03-14', location: 'Valletta, Malta', virtual: false, capacity: 80, registered: 22, price: 1000, icon: PartyPopper },
];

const DONOR_WALL = [
  { name: 'The Nordgren Foundation', amount: 500000, date: '28 Apr', message: 'Investing in the infrastructure of imagination.', tier: 'chancellors' },
  { name: 'Chen Wei Laboratories', amount: 200000, date: '4 May', message: null, tier: 'founders' },
  { name: 'Dr. Elena Vasquez', amount: 50000, date: '10 May', message: 'For the students who will change everything.', tier: 'founders' },
  { name: 'James & Priya Okonkwo', amount: 25000, date: '8 May', message: null, tier: 'guild' },
  { name: 'Liu Fang Foundation', amount: 75000, date: '25 Apr', message: null, tier: 'guild' },
  { name: 'Dr. Robert & Sarah Kimani', amount: 10000, date: '22 Apr', message: 'For the next generation of African scholars.', tier: 'guild' },
  { name: 'The Al-Rashidi Family', amount: 15000, date: '5 May', message: 'In memory of Fatima Al-Rashidi, who believed in education for all.', tier: 'guild' },
  { name: 'Anonymous Patron', amount: 100000, date: '7 May', message: 'Because knowledge should have no borders.', tier: 'chancellors' },
  { name: 'Takeshi Yamamoto', amount: 1000, date: '2 May', message: null, tier: 'community' },
  { name: 'Maria Santos', amount: 500, date: '3 May', message: 'Proud to be part of the founding.', tier: 'community' },
  { name: 'Amara Osei', amount: 100, date: '27 Apr', message: 'Every great university starts with a first believer.', tier: 'community' },
  { name: 'Anonymous', amount: 5000, date: '23 Apr', message: null, tier: 'community' },
  { name: 'Sven & Astrid Lindqvist', amount: 20000, date: '20 Apr', message: 'For the north, and for everywhere.', tier: 'guild' },
  { name: 'The Matsuo Trust', amount: 150000, date: '18 Apr', message: null, tier: 'founders' },
  { name: 'Isla McGregor', amount: 250, date: '15 Apr', message: 'A small stone in a great cathedral.', tier: 'community' },
];

const TIER_COLORS: Record<string, string> = {
  chancellors: '#8A0000',
  founders: '#6366f1',
  guild: '#0891b2',
  community: '#059669',
};

const CRYPTO_ADDRESSES = {
  BTC: { address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', qr: '/qr-btc.svg' },
  ETH: { address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', qr: '/qr-eth.svg' },
};

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000, 5000, 25000];

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

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, prefix = '', suffix = '', duration = 2000 }: { target: number; prefix?: string; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useInView(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target, duration]);
  return <span ref={ref}>{prefix}{count.toLocaleString('en-GB')}{suffix}</span>;
}

/* ─── Progress Ring (SVG) ─── */
function ProgressRing({ percent, size = 120, strokeWidth = 8 }: { percent: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#8A0000" strokeWidth={strokeWidth}
        strokeLinecap="round" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }} transition={{ duration: 2, ease: 'easeOut' }}
      />
    </svg>
  );
}

/* ─── Main Component ─── */
export default function FundraisingCampaign({ goToPage }: Props) {
  const activeSection = useActiveSection(['campaign', 'milestones', 'perks', 'events', 'donate', 'community', 'vision']);
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFreq, setRecurringFreq] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'crypto' | 'paypal'>('card');
  const [cryptoCoin, setCryptoCoin] = useState<'BTC' | 'ETH'>('BTC');
  const [selectedPerk, setSelectedPerk] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [donationResult, setDonationResult] = useState<{ success: boolean; message: string } | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [perkFilter, setPerkFilter] = useState<string>('all');

  const heroAnim = useInView(0);
  const progressAnim = useInView(0);
  const milestonesAnim = useInView(0);
  const perksAnim = useInView(0);
  const eventsAnim = useInView(0);
  const donorWallAnim = useInView(0);
  const visionAnim = useInView(0);

  const percentComplete = Math.round((CAMPAIGN.raised / CAMPAIGN.goal) * 100);

  const handleDonate = useCallback(async () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount || amount <= 0 || !donorEmail) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorEmail,
          donorName: isAnonymous ? null : donorName,
          donorAnonymous: isAnonymous,
          amount,
          currency: CAMPAIGN.currency,
          paymentMethod: paymentMethod === 'crypto' ? `crypto_${cryptoCoin.toLowerCase()}` : paymentMethod,
          perkId: selectedPerk,
          isRecurring,
          recurringFreq: isRecurring ? recurringFreq : null,
          message: donorMessage || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setDonationResult({ success: true, message: data.message });
      } else {
        setDonationResult({ success: false, message: data.error || 'Something went wrong. Please try again.' });
      }
    } catch {
      setDonationResult({ success: false, message: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  }, [selectedAmount, customAmount, donorEmail, donorName, isAnonymous, paymentMethod, cryptoCoin, selectedPerk, isRecurring, recurringFreq, donorMessage]);

  const filteredPerks = perkFilter === 'all' ? PERKS : PERKS.filter(p => p.category === perkFilter);
  const activePerk = selectedPerk ? PERKS.find(p => p.id === selectedPerk) : null;
  const effectiveAmount = selectedAmount || parseFloat(customAmount) || 0;

  return (
    <div className="flex flex-col bg-white">
      {/* ════════════════════════════════════════════════════════
          1. HERO — Cinematic dark hero with animated progress ring
          ════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#0a0a0a]">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full min-h-[520px] md:min-h-[600px] overflow-hidden">
            {/* Background image */}
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1800"
              className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
              alt="Building the future"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/60" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center max-w-[1400px] mx-auto w-full px-8 lg:px-20 h-full py-16 lg:py-0 min-h-[520px] md:min-h-[600px]">
              {/* Left — Text */}
              <div
                ref={heroAnim.ref}
                className={`lg:w-3/5 transition-all duration-700 ${heroAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <div className="mb-6 flex items-center space-x-3">
                  <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Founding Campaign</span>
                </div>
                <h1 className="text-[40px] md:text-[56px] lg:text-[68px] font-extrabold leading-[1.0] tracking-tighter text-white mb-6">
                  Building the<br />
                  <span className="text-[#8A0000]">Future</span> of<br />
                  Knowledge
                </h1>
                <p className="text-[17px] md:text-[19px] text-white/60 max-w-xl leading-relaxed mb-10 font-light">
                  The Artemis Founding Campaign is the cornerstone of our mission. Join a select generation of supporters establishing the intellectual and physical foundations of the world&apos;s most agile university.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => { setDonateModalOpen(true); document.getElementById('donate-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="px-10 py-4 bg-[#8A0000] text-white text-[13px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors flex items-center gap-3 group"
                  >
                    Donate Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => document.getElementById('campaign')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-10 py-4 bg-transparent border border-white/30 text-white text-[13px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#141414] transition-colors"
                  >
                    Explore Impact
                  </button>
                </div>
              </div>

              {/* Right — Progress Ring */}
              <div className={`lg:w-2/5 flex flex-col items-center lg:items-end mt-12 lg:mt-0 transition-all duration-700 delay-300 ${heroAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="relative">
                  <ProgressRing percent={percentComplete} size={180} strokeWidth={10} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[42px] font-black text-white leading-none">{percentComplete}%</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mt-1">funded</span>
                  </div>
                </div>
                <div className="mt-6 text-right">
                  <div className="text-[28px] font-black text-white">{symbol(CAMPAIGN.currency)}{fmtShort(CAMPAIGN.raised)}</div>
                  <div className="text-[13px] text-white/40">of {symbol(CAMPAIGN.currency)}{fmtShort(CAMPAIGN.goal)} goal</div>
                  <div className="flex items-center gap-2 mt-2 justify-end">
                    <Users size={14} className="text-[#8A0000]" />
                    <span className="text-[13px] text-white/50">{fmt(CAMPAIGN.donors)} donors</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={[
          { id: 'campaign', label: 'Campaign' },
          { id: 'milestones', label: 'Milestones' },
          { id: 'perks', label: 'Perks' },
          { id: 'events', label: 'Events' },
          { id: 'donate', label: 'Donate' },
          { id: 'community', label: 'Community' },
          { id: 'vision', label: 'Vision' },
        ]}
        activeSection={activeSection}
      />

      {/* ════════════════════════════════════════════════════════
          2. CAMPAIGN — The Case for Support
          ════════════════════════════════════════════════════════ */}
      <section id="campaign" className="scroll-mt-[110px] py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20">
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Our Commitment</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Why Artemis?<br />Why now?
              </h2>
              <div className="space-y-5 text-[16px] text-gray-600 leading-relaxed">
                <p>The traditional university model is at an inflection point. Decades of bureaucratic growth, physical limitations, and closed systems have severely constrained the potential of the modern scholar. Artemis was founded to transcend these limitations — not by merely digitizing existing structures, but by reimagining the very nature of an academic community from the ground up.</p>
                <p>We are building a <em>universitas</em> optimized for our era: borderless, data-driven, and intrinsically collaborative. Our core operating philosophy is one of <strong>Foundational Efficiency</strong>. We recognize that true innovation thrives when resources are concentrated on the intellectual work, not on massive administrative overhead. The Artemis Founding Campaign provides the strategic capital to construct our fundamental digital estate, endow our first residential colleges, and launch interdisciplinary research hubs that operate at the speed of modern discovery instead of the pace of administrative committees.</p>
                <p>Every pound donated goes directly toward faculty excellence, student access, and research breakthroughs — ensuring your support is the primary engine of our growth. By leveraging decentralized technologies, we reduce operational drag by nearly 60% compared to traditional institutions of similar scale, directing 90% of all capital toward academic and research programmes.</p>
              </div>
            </div>

            {/* Efficiency Metrics — dark card */}
            <div className="bg-[#141414] p-10 lg:p-12 text-white">
              <h3 className="text-[22px] font-bold text-white mb-8">Foundational Efficiency</h3>
              <div className="space-y-8">
                {[
                  { value: '60%', label: 'Less Overhead', desc: 'Than peer-tier physical institutions — no redundant campuses, no bloated administration' },
                  { value: '90%', label: 'To Programmes', desc: 'Of all capital directed straight to academic and research programmes, not operating costs' },
                  { value: '3', label: 'Continents', desc: 'Borderless scaling via our core digital stack — knowledge without geography' },
                ].map((item, i) => (
                  <div key={i} className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-[36px] font-black text-[#8A0000] leading-none">{item.value}</span>
                      <span className="text-[14px] font-bold uppercase tracking-widest text-white/70">{item.label}</span>
                    </div>
                    <p className="text-[14px] text-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Strategic Initiatives */}
          <div className="mt-20 space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <div className="mb-4 flex items-center space-x-3">
                  <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">Strategic Initiative</span>
                </div>
                <h3 className="text-[28px] font-extrabold text-[#141414] mb-4 leading-tight">Endowment for Autonomous Research</h3>
                <p className="text-[16px] text-gray-600 leading-relaxed mb-4">We are building a permanent endowment to support interdisciplinary research hubs that operate independently of state or commercial agendas, focusing on long-term challenges — from the ethics of AI to sustainable bio-engineering. Our Founding Campaign aims to fully endow the first five flagship institutes, each with a 20-year operational runway that frees researchers from the grant cycle and lets them pursue questions that matter on decadal timescales.</p>
                <p className="text-[16px] text-gray-600 leading-relaxed">These institutes are not silos. They are woven together through the Artemis network, sharing data, methods, and insights across disciplines in real time. A climate modeler in Tokyo feeds parameters to a policy lab in Geneva. A bio-ethicist in Valletta reviews protocols for a synthetic biology team in San Francisco. This is research at the speed of connection.</p>
              </div>
              <div className="group">
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" alt="Research" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="group order-2 lg:order-1">
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000" alt="Scholars" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="mb-4 flex items-center space-x-3">
                  <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">Strategic Initiative</span>
                </div>
                <h3 className="text-[28px] font-extrabold text-[#141414] mb-4 leading-tight">The Global Scholars Fund</h3>
                <p className="text-[16px] text-gray-600 leading-relaxed mb-4">Artemis is designed to be accessible to the best minds, not just those with the greatest resources. This fund provides full-ride virtual residencies and travel grants for scholars from underserved digital nodes, ensuring our community represents the true intellectual capital of the world — not merely the economic capital.</p>
                <p className="text-[16px] text-gray-600 leading-relaxed">The fund covers tuition, housing, research materials, and a living stipend for scholars from over 40 countries who would otherwise be excluded from world-class education. It is not charity. It is an investment in human capital that the world cannot afford to waste. Every scholar we enable creates a multiplier effect in their home community that lasts for generations.</p>
              </div>
            </div>
          </div>

          {/* Campaign Pillars */}
          <div className="mt-24">
            <div className="relative flex items-center mb-16">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-400">Campaign Pillars</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Users, title: 'Access & Opportunity', desc: 'Endowing scholarships for the next generation of global scholars, regardless of their economic background. Talent is distributed uniformly; opportunity is not. We correct that imbalance at the structural level, ensuring that the most promising minds on Earth can access the education they deserve.' },
                { icon: BookOpen, title: 'Frontier Research', desc: 'Funding interdisciplinary research hubs tackling humanity\'s most complex challenges in medicine, climate, and technology. Our institutes are designed to operate across traditional boundaries, connecting fields that should never have been separated and accelerating the cycle from question to discovery to application.' },
                { icon: Zap, title: 'Digital Estate', desc: 'Developing the secure, decentralized infrastructure essential for a modern, borderless university. This is not a website. It is the connective tissue of an institution — authentication, collaboration, assessment, credentials — built to serve tens of thousands of scholars across every timezone simultaneously.' },
              ].map((pillar, idx) => (
                <div key={idx} className="p-10 border border-gray-200 hover:border-[#8A0000] transition-all cursor-pointer group bg-white">
                  <pillar.icon size={36} className="text-[#8A0000] mb-6" />
                  <h3 className="text-[22px] font-bold text-[#141414] mb-4 group-hover:text-[#8A0000] transition-colors">{pillar.title}</h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. MILESTONES — Gamified Progress Mountain
          ════════════════════════════════════════════════════════ */}
      <section id="milestones" className="scroll-mt-[110px] py-16 lg:py-24 bg-gray-50">
        <div
          ref={milestonesAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${milestonesAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Campaign Progress</span>
          </div>
          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            The ascent
          </h2>
          <p className="text-[17px] text-gray-500 max-w-2xl leading-relaxed mb-16">
            Every great institution is built one milestone at a time. Track our progress as we climb from foundation to global scale — and see exactly where your contribution lands on the mountain.
          </p>

          {/* Giant progress bar with milestone markers */}
          <div className="relative mb-20">
            {/* Background track */}
            <div className="h-3 bg-gray-200 w-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#8A0000] to-[#b91c1c]"
                initial={{ width: 0 }}
                whileInView={{ width: `${percentComplete}%` }}
                transition={{ duration: 2, ease: 'easeOut' }}
                viewport={{ once: true }}
              />
            </div>
            {/* Milestone markers */}
            <div className="relative mt-8">
              {MILESTONES.map((ms, i) => {
                const pos = (ms.target / CAMPAIGN.goal) * 100;
                const Icon = ms.icon;
                return (
                  <div
                    key={i}
                    className="absolute -translate-x-1/2 flex flex-col items-center"
                    style={{ left: `${Math.min(pos, 98)}%` }}
                  >
                    <div className={`w-10 h-10 flex items-center justify-center ${ms.reached ? 'bg-[#8A0000] text-white' : 'bg-white border-2 border-gray-300 text-gray-400'} transition-colors`}>
                      <Icon size={18} />
                    </div>
                    <div className={`text-[12px] font-bold mt-2 ${ms.reached ? 'text-[#8A0000]' : 'text-gray-400'}`}>{symbol(CAMPAIGN.currency)}{fmtShort(ms.target)}</div>
                    <div className={`text-[13px] font-bold text-center mt-1 max-w-[140px] ${ms.reached ? 'text-[#141414]' : 'text-gray-500'}`}>{ms.title}</div>
                    {ms.reached && <Check size={14} className="text-[#8A0000] mt-1" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Milestone Detail Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {MILESTONES.map((ms, i) => {
              const Icon = ms.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`p-6 border ${ms.reached ? 'border-[#8A0000] bg-white' : 'border-gray-200 bg-white'} group hover:shadow-lg transition-all`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 flex items-center justify-center ${ms.reached ? 'bg-[#8A0000]' : 'bg-gray-100'}`}>
                      <Icon size={16} className={ms.reached ? 'text-white' : 'text-gray-400'} />
                    </div>
                    {ms.reached && <Check size={16} className="text-[#8A0000]" />}
                  </div>
                  <h4 className="text-[15px] font-bold text-[#141414] mb-2">{ms.title}</h4>
                  <p className="text-[13px] text-gray-500 leading-relaxed mb-3">{ms.desc}</p>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#8A0000]">{symbol(CAMPAIGN.currency)}{fmtShort(ms.target)}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. PERKS — Giving Tiers & Rewards
          ════════════════════════════════════════════════════════ */}
      <section id="perks" className="scroll-mt-[110px] py-16 lg:py-24">
        <div
          ref={perksAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${perksAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Rewards</span>
          </div>
          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            What you receive
          </h2>
          <p className="text-[17px] text-gray-500 max-w-2xl leading-relaxed mb-10">
            Every contribution earns a place in the founding story. From cryptographic tokens to named buildings — the more you give, the more indelible your mark on the university that will shape the next century.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {['all', 'digital', 'experience', 'physical', 'naming'].map(cat => (
              <button
                key={cat}
                onClick={() => setPerkFilter(cat)}
                className={`px-5 py-2 text-[11px] font-bold uppercase tracking-widest border transition-colors ${perkFilter === cat ? 'bg-[#8A0000] text-white border-[#8A0000]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#8A0000] hover:text-[#8A0000]'}`}
              >
                {cat === 'all' ? 'All Tiers' : cat}
              </button>
            ))}
          </div>

          {/* Perk Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPerks.map((perk, i) => {
                const Icon = perk.icon;
                const isSelected = selectedPerk === perk.id;
                const canAfford = effectiveAmount >= perk.min;
                return (
                  <motion.div
                    key={perk.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => {
                      setSelectedPerk(isSelected ? null : perk.id);
                      if (!isSelected) {
                        setSelectedAmount(perk.min);
                        setCustomAmount('');
                      }
                    }}
                    className={`p-6 border-2 cursor-pointer transition-all hover:shadow-lg ${isSelected ? 'border-[#8A0000] bg-[#8A0000]/5 shadow-lg' : 'border-gray-200 bg-white hover:border-[#8A0000]/50'}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: perk.color + '15' }}>
                        <Icon size={20} style={{ color: perk.color }} />
                      </div>
                      {isSelected && <Check size={18} className="text-[#8A0000]" />}
                    </div>
                    <h4 className="text-[16px] font-bold text-[#141414] mb-2">{perk.title}</h4>
                    <p className="text-[13px] text-gray-500 leading-relaxed mb-4 min-h-[60px]">{perk.desc}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#8A0000]">From</span>
                      <span className="text-[20px] font-black text-[#141414]">{symbol(CAMPAIGN.currency)}{fmt(perk.min)}</span>
                    </div>
                    <div className="mt-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 ${perk.category === 'naming' ? 'bg-[#8A0000]/10 text-[#8A0000]' : perk.category === 'experience' ? 'bg-cyan-50 text-cyan-700' : perk.category === 'physical' ? 'bg-emerald-50 text-emerald-700' : 'bg-violet-50 text-violet-700'}`}>{perk.category}</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Selected Perk Detail */}
          <AnimatePresence>
            {activePerk && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 bg-[#141414] text-white p-8 lg:p-12 overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      {React.createElement(activePerk.icon, { size: 24, style: { color: activePerk.color } })}
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{activePerk.category} tier</span>
                    </div>
                    <h3 className="text-[28px] font-extrabold text-white mb-4">{activePerk.title}</h3>
                    <p className="text-[15px] text-white/60 leading-relaxed">{activePerk.desc}</p>
                  </div>
                  <div className="lg:text-right shrink-0">
                    <div className="text-[14px] font-bold uppercase tracking-widest text-[#8A0000] mb-2">Minimum contribution</div>
                    <div className="text-[48px] font-black text-white leading-none">{symbol(CAMPAIGN.currency)}{fmtShort(activePerk.min)}</div>
                    <button
                      onClick={() => { setDonateModalOpen(true); setSelectedAmount(activePerk.min); }}
                      className="mt-6 px-8 py-3 bg-[#8A0000] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors flex items-center gap-2 group"
                    >
                      Claim This Perk <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          5. EVENTS — Fundraising Events Calendar
          ════════════════════════════════════════════════════════ */}
      <section id="events" className="scroll-mt-[110px] py-16 lg:py-24 bg-gray-50">
        <div
          ref={eventsAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${eventsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Events</span>
          </div>
          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            Gather. Connect.<br />Build together.
          </h2>
          <p className="text-[17px] text-gray-500 max-w-2xl leading-relaxed mb-12">
            The founding is not just a financial campaign — it is a movement. Join us at events around the world to experience the Artemis vision firsthand, meet fellow patrons, and become part of the story.
          </p>

          <div className="space-y-4">
            {EVENTS.map((ev, i) => {
              const Icon = ev.icon;
              const isExpanded = expandedEvent === ev.id;
              const capacityPercent = ev.capacity ? Math.min((ev.registered / ev.capacity) * 100, 100) : 0;
              const isSoldOut = ev.capacity ? ev.registered >= ev.capacity : false;
              return (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className={`bg-white border transition-all ${isExpanded ? 'border-[#8A0000] shadow-lg' : 'border-gray-200 hover:border-[#8A0000]/50'}`}
                >
                  <button
                    onClick={() => setExpandedEvent(isExpanded ? null : ev.id)}
                    className="w-full flex items-center gap-6 p-6 lg:p-8 text-left"
                  >
                    {/* Date badge */}
                    <div className="shrink-0 w-16 text-center">
                      <div className="text-[11px] font-bold uppercase tracking-widest text-[#8A0000]">
                        {new Date(ev.date).toLocaleDateString('en-GB', { month: 'short' })}
                      </div>
                      <div className="text-[28px] font-black text-[#141414] leading-none">
                        {new Date(ev.date).getDate()}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="shrink-0 w-12 h-12 bg-[#8A0000]/10 flex items-center justify-center">
                      <Icon size={20} className="text-[#8A0000]" />
                    </div>

                    {/* Title & Meta */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[17px] font-bold text-[#141414] truncate">{ev.title}</h4>
                      <div className="flex items-center gap-4 mt-1 text-[13px] text-gray-500">
                        <span className="flex items-center gap-1"><MapPin size={12} /> {ev.location}</span>
                        {ev.virtual && <span className="flex items-center gap-1"><Video size={12} /> Virtual</span>}
                        {ev.price !== null && ev.price > 0 && <span>{symbol(CAMPAIGN.currency)}{ev.price}</span>}
                        {ev.price === 0 && <span className="text-[#8A0000] font-bold">Free</span>}
                      </div>
                    </div>

                    {/* Capacity indicator */}
                    {ev.capacity && (
                      <div className="hidden md:block shrink-0 w-32">
                        <div className="text-[11px] text-gray-400 mb-1">{ev.registered}/{ev.capacity} registered</div>
                        <div className="h-1.5 bg-gray-100 w-full">
                          <div className="h-full bg-[#8A0000] transition-all" style={{ width: `${capacityPercent}%` }} />
                        </div>
                      </div>
                    )}

                    <ChevronDown size={20} className={`text-gray-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 lg:px-8 pb-8 border-t border-gray-100 pt-6">
                          <p className="text-[15px] text-gray-600 leading-relaxed mb-6 max-w-2xl">{ev.desc}</p>
                          <div className="flex flex-wrap items-center gap-4">
                            <button
                              onClick={() => setDonateModalOpen(true)}
                              className={`px-6 py-3 text-[12px] font-bold uppercase tracking-widest flex items-center gap-2 group ${isSoldOut ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#8A0000] text-white hover:bg-[#6B0000] transition-colors'}`}
                              disabled={isSoldOut}
                            >
                              {isSoldOut ? 'Sold Out' : 'Register Now'} {!isSoldOut && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
                            </button>
                            {ev.capacity && !isSoldOut && (
                              <span className="text-[12px] text-gray-400">
                                {ev.capacity - ev.registered} spots remaining
                              </span>
                            )}
                            {ev.type === 'matching' && (
                              <span className="px-3 py-1 bg-[#8A0000]/10 text-[#8A0000] text-[10px] font-bold uppercase tracking-widest">
                                2x Match Active
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. DONATE — The Giving Engine (multi-method payment)
          ════════════════════════════════════════════════════════ */}
      <section id="donate" className="scroll-mt-[110px] py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20">
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Give Now</span>
          </div>
          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            Fuel the founding
          </h2>
          <p className="text-[17px] text-gray-500 max-w-2xl leading-relaxed mb-12">
            Every contribution, at every level, is a brick in the foundation. Choose your amount, your method, and your reward — and join the ranks of those who built a university from nothing but conviction.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left — Amount + Perk Selection */}
            <div className="lg:col-span-2 space-y-8">
              {/* Amount Selection */}
              <div>
                <h3 className="text-[14px] font-bold uppercase tracking-widest text-[#141414] mb-4">Choose your amount</h3>
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {PRESET_AMOUNTS.map(amt => (
                    <button
                      key={amt}
                      onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                      className={`py-3 text-[14px] font-bold border transition-colors ${selectedAmount === amt ? 'bg-[#8A0000] text-white border-[#8A0000]' : 'bg-white text-[#141414] border-gray-200 hover:border-[#8A0000]'}`}
                    >
                      {symbol(CAMPAIGN.currency)}{fmtShort(amt)}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[18px] font-bold text-gray-400">{symbol(CAMPAIGN.currency)}</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                    placeholder="Custom amount"
                    className="w-full pl-10 pr-4 py-4 border border-gray-200 focus:border-[#8A0000] focus:outline-none text-[18px] font-bold bg-[#F9F8F6]"
                  />
                </div>
              </div>

              {/* Recurring Toggle */}
              <div className="bg-gray-50 border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Repeat size={18} className="text-[#8A0000]" />
                    <span className="text-[14px] font-bold text-[#141414]">Make it recurring</span>
                  </div>
                  <button
                    onClick={() => setIsRecurring(!isRecurring)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${isRecurring ? 'bg-[#8A0000]' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${isRecurring ? 'left-[26px]' : 'left-0.5'}`} />
                  </button>
                </div>
                {isRecurring && (
                  <div className="flex gap-3">
                    {['monthly', 'quarterly', 'annual'].map(freq => (
                      <button
                        key={freq}
                        onClick={() => setRecurringFreq(freq)}
                        className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest border transition-colors ${recurringFreq === freq ? 'bg-[#8A0000] text-white border-[#8A0000]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#8A0000]'}`}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                )}
                {isRecurring && (
                  <p className="mt-3 text-[13px] text-gray-500">Recurring donations multiply your impact over time. A {symbol(CAMPAIGN.currency)}100/month gift becomes {symbol(CAMPAIGN.currency)}1,200/year — and qualifies for the {symbol(CAMPAIGN.currency)}1,000 Founders&apos; Book tier.</p>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-[14px] font-bold uppercase tracking-widest text-[#141414] mb-4">Payment method</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { key: 'card' as const, icon: CreditCard, label: 'Card' },
                    { key: 'bank' as const, icon: Banknote, label: 'Bank Transfer' },
                    { key: 'crypto' as const, icon: Bitcoin, label: 'Crypto' },
                    { key: 'paypal' as const, icon: Wallet, label: 'PayPal' },
                  ].map(method => (
                    <button
                      key={method.key}
                      onClick={() => setPaymentMethod(method.key)}
                      className={`flex items-center gap-3 p-4 border transition-colors ${paymentMethod === method.key ? 'bg-[#8A0000] text-white border-[#8A0000]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#8A0000]'}`}
                    >
                      <method.icon size={18} />
                      <span className="text-[12px] font-bold uppercase tracking-widest">{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Crypto addresses */}
              {paymentMethod === 'crypto' && (
                <div className="bg-[#141414] text-white p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Bitcoin size={20} className="text-[#f7931a]" />
                    <span className="text-[14px] font-bold">Cryptocurrency Donation</span>
                  </div>
                  <div className="flex gap-4 mb-6">
                    {(['BTC', 'ETH'] as const).map(coin => (
                      <button
                        key={coin}
                        onClick={() => setCryptoCoin(coin)}
                        className={`px-5 py-2 text-[12px] font-bold uppercase tracking-widest border transition-colors ${cryptoCoin === coin ? 'bg-[#8A0000] text-white border-[#8A0000]' : 'bg-transparent text-white/50 border-white/20 hover:border-white/50'}`}
                      >
                        {coin}
                      </button>
                    ))}
                  </div>
                  <div className="mb-4">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">{cryptoCoin} Address</div>
                    <div className="flex items-center gap-3">
                      <code className="text-[13px] text-white/70 bg-white/5 px-4 py-3 flex-1 break-all font-mono">
                        {CRYPTO_ADDRESSES[cryptoCoin].address}
                      </code>
                      <button
                        onClick={() => navigator.clipboard?.writeText(CRYPTO_ADDRESSES[cryptoCoin].address)}
                        className="shrink-0 px-4 py-3 bg-white/10 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white/20 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  <p className="text-[13px] text-white/40 leading-relaxed">Please use the exact address above for your {cryptoCoin} transfer. After sending, email <span className="text-white/60">crypto@artemis.edu</span> with your transaction hash to receive your perk and confirmation. Donations are recorded at the exchange rate at the time of receipt.</p>
                </div>
              )}

              {/* Bank Transfer Details */}
              {paymentMethod === 'bank' && (
                <div className="bg-gray-50 border border-gray-200 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Banknote size={20} className="text-[#8A0000]" />
                    <span className="text-[14px] font-bold">Bank Transfer Details</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Account Name', value: 'Artemis University Founding Fund' },
                      { label: 'Sort Code', value: '20-45-78' },
                      { label: 'Account Number', value: '73128945' },
                      { label: 'IBAN', value: 'GB29 BARC 2045 7873 1289 45' },
                      { label: 'SWIFT/BIC', value: 'BARCGB2L' },
                      { label: 'Reference', value: 'ARTEMIS-FOUNDING' },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                        <span className="text-[13px] text-gray-500">{row.label}</span>
                        <div className="flex items-center gap-2">
                          <code className="text-[13px] font-bold text-[#141414] font-mono">{row.value}</code>
                          <button onClick={() => navigator.clipboard?.writeText(row.value)} className="text-[10px] text-[#8A0000] font-bold uppercase tracking-widest hover:underline">Copy</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[13px] text-gray-500 mt-4 leading-relaxed">For transfers over {symbol(CAMPAIGN.currency)}10,000, please email <span className="text-[#8A0000]">founding@artemis.edu</span> to arrange a personal briefing with the campaign team.</p>
                </div>
              )}

              {/* Donor Information Form */}
              <div>
                <h3 className="text-[14px] font-bold uppercase tracking-widest text-[#141414] mb-4">Your information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Full Name</label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      disabled={isAnonymous}
                      placeholder={isAnonymous ? 'Anonymous' : 'Your name'}
                      className={`w-full px-4 py-3 border focus:border-[#8A0000] focus:outline-none text-[15px] bg-[#F9F8F6] ${isAnonymous ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Email *</label>
                    <input
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full px-4 py-3 border border-gray-200 focus:border-[#8A0000] focus:outline-none text-[15px] bg-[#F9F8F6]"
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${isAnonymous ? 'bg-[#8A0000] border-[#8A0000]' : 'bg-white border-gray-300'}`}
                  >
                    {isAnonymous && <Check size={12} className="text-white" />}
                  </button>
                  <span className="text-[14px] text-gray-600">Donate anonymously</span>
                </div>

                <div className="mt-4">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Message (optional)</label>
                  <textarea
                    value={donorMessage}
                    onChange={(e) => setDonorMessage(e.target.value)}
                    placeholder="Share why you're supporting Artemis..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-[#8A0000] focus:outline-none text-[15px] bg-[#F9F8F6] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Right — Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-[180px] bg-white border-2 border-[#8A0000] p-8">
                <h3 className="text-[14px] font-bold uppercase tracking-widest text-[#8A0000] mb-6">Your Donation</h3>

                {/* Amount */}
                <div className="mb-6">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1">Amount</div>
                  <div className="text-[36px] font-black text-[#141414] leading-none">
                    {symbol(CAMPAIGN.currency)}{fmt(effectiveAmount || 0)}
                  </div>
                  {isRecurring && (
                    <div className="text-[13px] text-[#8A0000] font-bold mt-1">
                      {recurringFreq} &middot; {symbol(CAMPAIGN.currency)}{fmt(effectiveAmount * (recurringFreq === 'monthly' ? 12 : recurringFreq === 'quarterly' ? 4 : 1))}/year
                    </div>
                  )}
                </div>

                {/* Perk */}
                {activePerk && (
                  <div className="mb-6 p-4 bg-gray-50 border border-gray-200">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-[#8A0000] mb-2">Your Perk</div>
                    <div className="flex items-center gap-2">
                      {React.createElement(activePerk.icon, { size: 16, style: { color: activePerk.color } })}
                      <span className="text-[14px] font-bold text-[#141414]">{activePerk.title}</span>
                    </div>
                  </div>
                )}

                {/* Impact Calculator */}
                <div className="mb-6 p-4 bg-[#8A0000]/5 border border-[#8A0000]/20">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#8A0000] mb-3">Your Impact</div>
                  {effectiveAmount >= 5000 && <p className="text-[13px] text-gray-600 mb-1">Funds a named micro-scholarship for one student</p>}
                  {effectiveAmount >= 1000 && effectiveAmount < 5000 && <p className="text-[13px] text-gray-600 mb-1">Provides research materials for a founding lab</p>}
                  {effectiveAmount >= 500 && effectiveAmount < 1000 && <p className="text-[13px] text-gray-600 mb-1">Sponsors a student&apos;s travel to a node</p>}
                  {effectiveAmount >= 100 && effectiveAmount < 500 && <p className="text-[13px] text-gray-600 mb-1">Funds one week of digital infrastructure</p>}
                  {effectiveAmount < 100 && effectiveAmount > 0 && <p className="text-[13px] text-gray-600 mb-1">Every brick counts in the foundation</p>}
                  {effectiveAmount >= 25000 && <p className="text-[13px] text-gray-600">Names a research lab in perpetuity</p>}
                  {effectiveAmount >= 100000 && <p className="text-[13px] text-[#8A0000] font-bold">Names a Living Commons — your name spoken daily</p>}
                  {effectiveAmount >= 1000000 && <p className="text-[13px] text-[#8A0000] font-bold">Patron of an entire Artemis node</p>}
                </div>

                {/* Payment method indicator */}
                <div className="mb-6">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1">Method</div>
                  <div className="text-[14px] font-bold text-[#141414]">
                    {paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'bank' ? 'Bank Transfer' : paymentMethod === 'crypto' ? `${cryptoCoin} Cryptocurrency` : 'PayPal'}
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={handleDonate}
                  disabled={submitting || !donorEmail || effectiveAmount <= 0}
                  className={`w-full py-4 text-[13px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${submitting || !donorEmail || effectiveAmount <= 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#8A0000] text-white hover:bg-[#6B0000]'}`}
                >
                  {submitting ? 'Processing...' : 'Complete Donation'} {!submitting && <ArrowRight size={14} />}
                </button>

                {/* Security note */}
                <div className="flex items-center gap-2 mt-4">
                  <Lock size={12} className="text-gray-300" />
                  <span className="text-[11px] text-gray-400">256-bit SSL encryption. Your data is safe.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Donation Result */}
          <AnimatePresence>
            {donationResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mt-8 p-8 ${donationResult.success ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {donationResult.success ? <Check size={20} className="text-emerald-600" /> : <Shield size={20} className="text-red-600" />}
                  <span className={`text-[16px] font-bold ${donationResult.success ? 'text-emerald-800' : 'text-red-800'}`}>
                    {donationResult.success ? 'Thank you for your generosity!' : 'Donation could not be processed'}
                  </span>
                </div>
                <p className={`text-[15px] ${donationResult.success ? 'text-emerald-700' : 'text-red-700'}`}>{donationResult.message}</p>
                {donationResult.success && (
                  <button
                    onClick={() => { setDonationResult(null); setSelectedAmount(null); setCustomAmount(''); setDonorName(''); setDonorEmail(''); setDonorMessage(''); setSelectedPerk(null); }}
                    className="mt-4 text-[12px] font-bold uppercase tracking-widest text-[#8A0000] border-b border-[#8A0000] pb-1 hover:text-[#6B0000] transition-colors"
                  >
                    Make another donation
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. COMMUNITY — Donor Wall & Giving Societies
          ════════════════════════════════════════════════════════ */}
      <section id="community" className="scroll-mt-[110px] py-16 lg:py-24 bg-[#141414]">
        <div
          ref={donorWallAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${donorWallAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Community</span>
          </div>
          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-white mb-4">
            The founders&apos; wall
          </h2>
          <p className="text-[17px] text-white/40 max-w-2xl leading-relaxed mb-16">
            Every name here represents a bet on the future of knowledge. These are the individuals and families who chose to build something unprecedented — and whose names will be inscribed in the university&apos;s founding record for as long as Artemis endures.
          </p>

          {/* Giving Societies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { name: "Chancellor's Circle", range: '£2M+', color: '#8A0000', desc: 'Founding benefactors shaping university strategy. Seat on the Founders\' Council. Private annual audience with the Chancellor. Exclusive naming rights for major facilities and programmes.', icon: Crown },
              { name: "Founder's Society", range: '£200K – £2M', color: '#6366f1', desc: 'Direct support for chairs and building projects. Named fellowship or scholarship. Invitations to closed-door strategic briefings. Priority access to all founding events.', icon: Star },
              { name: 'Guild Partners', range: '£25K – £200K', color: '#0891b2', desc: 'Sustained impact across research and scholarships. Annual impact report on funded programmes. Invitation to the Guild Dinner at the Geneva node. Name on the Founders\' Wall.', icon: Trophy },
            ].map((society, i) => {
              const Icon = society.icon;
              return (
                <div key={i} className="p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group">
                  <Icon size={28} style={{ color: society.color }} className="mb-4" />
                  <h4 className="text-[18px] font-bold text-white mb-1">{society.name}</h4>
                  <div className="text-[13px] font-bold mb-4" style={{ color: society.color }}>{society.range}</div>
                  <p className="text-[14px] text-white/40 leading-relaxed">{society.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Live Donor Stream */}
          <div className="mb-4 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#8A0000] animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30">Recent Supporters</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {DONOR_WALL.map((donor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-4 bg-white/5 border border-white/5"
              >
                <div className="shrink-0 w-10 h-10 flex items-center justify-center text-white text-[16px] font-bold" style={{ backgroundColor: TIER_COLORS[donor.tier] + '33' }}>
                  {donor.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-white truncate">{donor.name}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 shrink-0" style={{ color: TIER_COLORS[donor.tier], backgroundColor: TIER_COLORS[donor.tier] + '15' }}>{donor.tier}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[13px] font-bold text-white/60">{symbol(CAMPAIGN.currency)}{fmtShort(donor.amount)}</span>
                    <span className="text-[12px] text-white/20">{donor.date}</span>
                  </div>
                  {donor.message && <p className="text-[12px] text-white/30 mt-1 italic truncate">&ldquo;{donor.message}&rdquo;</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          8. VISION — Post-Founding Future & Long-Term Impact
          ════════════════════════════════════════════════════════ */}
      <section id="vision" className="scroll-mt-[110px] py-16 lg:py-24">
        <div
          ref={visionAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${visionAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Beyond the Founding</span>
          </div>
          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            A living campaign
          </h2>
          <p className="text-[17px] text-gray-500 max-w-2xl leading-relaxed mb-16">
            The Founding Campaign is not a moment — it is a movement. When the founding goal is reached, the campaign evolves. The infrastructure of giving remains. The community deepens. The mission continues.
          </p>

          {/* Three Eras */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                era: 'Phase I',
                title: 'The Founding',
                period: '2025 — 2028',
                desc: 'Raise the founding capital. Build the first five nodes. Enrol the inaugural cohort. Establish the research endowment. Create the digital estate. Everything from nothing. This is where your donation builds the physical and intellectual foundations of a university that will endure for centuries.',
                icon: Rocket,
                color: '#8A0000',
              },
              {
                era: 'Phase II',
                title: 'The Expansion',
                period: '2028 — 2033',
                desc: 'Scale to 12 nodes on 6 continents. Double the student body. Launch the next generation of research institutes. Deepen the endowment. The giving community becomes a permanent philanthropic infrastructure — not a campaign that ends, but an engine that accelerates. Named scholarships and research positions multiply as the endowment grows.',
                icon: Globe,
                color: '#0891b2',
              },
              {
                era: 'Phase III',
                title: 'The Perpetuity',
                period: '2033 — Beyond',
                desc: 'The endowment becomes self-sustaining. Artemis operates in perpetuity, independent of tuition dependency, free from the financial pressures that constrain traditional universities. The Founding Campaign becomes the Artemis Foundation — a permanent, independent charitable trust that stewards the university\'s mission for generations. Your name, inscribed in the founding record, endures as long as knowledge itself matters.',
                icon: Landmark,
                color: '#6366f1',
              },
            ].map((phase, i) => {
              const Icon = phase.icon;
              return (
                <div key={i} className="relative p-8 border border-gray-200 hover:border-[#8A0000] transition-colors group">
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4" style={{ color: phase.color }}>{phase.era}</div>
                  <Icon size={32} style={{ color: phase.color }} className="mb-4" />
                  <h4 className="text-[22px] font-bold text-[#141414] mb-1">{phase.title}</h4>
                  <div className="text-[13px] text-gray-400 mb-4">{phase.period}</div>
                  <p className="text-[14px] text-gray-600 leading-relaxed">{phase.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Future Stats */}
          <div className="bg-gray-50 border border-gray-200 p-10 lg:p-14">
            <div className="mb-8 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">By the Numbers</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { value: '12', label: 'Global Nodes', detail: 'Residential hubs across 6 continents by 2033' },
                { value: '2,400', label: 'Students', detail: 'Full capacity across the Artemis network' },
                { value: '25', label: 'Research Institutes', detail: 'Permanently endowed, operationally independent' },
                { value: '£200M', label: 'Endowment Target', detail: 'Self-sustaining by Phase III — forever' },
              ].map((stat, i) => (
                <div key={i} className="relative pl-6">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#8A0000]"></div>
                  <div className="text-[32px] font-black text-[#141414] leading-none mb-2">{stat.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">{stat.label}</div>
                  <div className="text-[12px] text-gray-500 leading-snug">{stat.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Voices from the Future */}
          <div className="mt-20">
            <div className="relative flex items-center mb-16">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-400">Stories of a Future That Can Be</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {[
                {
                  quote: "I was the first in my village to attend university — and the first to attend one that didn't care about my village's wealth. Artemis saw my mind, not my postcode. The scholarship that brought me here was funded by someone I will never meet, but whose name I carry in my thesis dedication.",
                  name: 'Amara Osei',
                  role: 'Inaugural Cohort, Weavers Commons',
                  location: 'Accra → Geneva Node',
                },
                {
                  quote: "I donated because I remember being seventeen and brilliant and broke. I remember the university that let me in anyway — and how that changed everything. Artemis is that chance, scaled to the planet. I couldn't not give.",
                  name: 'Dr. Elena Vasquez',
                  role: 'Chancellor\'s Circle, Founding Donor',
                  location: 'Mexico City',
                },
              ].map((story, i) => (
                <div key={i} className="relative">
                  <svg className="w-10 h-10 text-[#8A0000] opacity-20 mb-6" viewBox="0 0 24 24" fill="currentColor"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/></svg>
                  <p className="text-[18px] md:text-[20px] text-[#141414] leading-relaxed mb-8 font-light italic">{story.quote}</p>
                  <div>
                    <div className="text-[14px] font-bold text-[#141414]">{story.name}</div>
                    <div className="text-[12px] text-gray-500">{story.role} — {story.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          9. FINAL CTA — Crimson Bar
          ════════════════════════════════════════════════════════ */}
      <section className="bg-[#8A0000] py-16 px-8 lg:px-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-[28px] md:text-[36px] font-extrabold leading-tight tracking-tighter text-white mb-2">
              The future is unfunded.<br />Until you fund it.
            </h2>
            <p className="text-[16px] text-white/70 leading-relaxed max-w-lg">
              Every great institution began with someone who chose to believe before there was proof. Artemis is that choice. This is your moment to build a university that will outlast every one of us.
            </p>
          </div>
          <button
            onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center space-x-3 bg-white text-[#8A0000] px-8 py-4 text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors shrink-0 group"
          >
            <span>Donate Now</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
