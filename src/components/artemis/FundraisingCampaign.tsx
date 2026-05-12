'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, Shield, Zap, Star, Crown, Building2,
  Home, FlaskConical, GraduationCap, BookOpen, Compass, Mail, Hash,
  Users, Globe, MapPin, Video, Trophy,
  ChevronDown, Check, Lock, Bitcoin, Wallet, CreditCard,
  Banknote, Repeat, Rocket, Landmark, Flame,
  Sparkles, CircleDot, Gem, Orbit
} from 'lucide-react';

interface Props {
  goToPage: (page: string) => void;
}

/* ─── Data ─── */
const CAMPAIGN = { goal: 80_000_000, raised: 28_400_000, donors: 1847, currency: 'GBP' };
const fmtNum = (n: number) => n.toLocaleString('en-GB');
const fmtShort = (n: number) => n >= 1_000_000 ? `${(n/1_000_000).toFixed(n%1_000_000===0?0:1)}M` : n >= 1_000 ? `${(n/1_000).toFixed(0)}K` : fmtNum(n);
const sym = '£';
const pct = Math.round((CAMPAIGN.raised / CAMPAIGN.goal) * 100);

const MILESTONES = [
  { title: 'Digital Foundation', target: 10_000_000, reached: true, desc: 'Core platform and global access layer — deployed across 3 continents.', icon: Rocket },
  { title: 'First Five Nodes', target: 25_000_000, reached: true, desc: 'Geneva, Valletta, San Francisco, Tokyo, Reykjavik — residential hubs operational.', icon: Globe },
  { title: 'Inaugural Cohort', target: 40_000_000, reached: false, desc: 'Full scholarship fund for 200 students with dedicated faculty and mentorship.', icon: GraduationCap },
  { title: 'Research Endowment', target: 60_000_000, reached: false, desc: 'Perpetual endowment for five flagship institutes with 20-year runway.', icon: FlaskConical },
  { title: 'Global Scale', target: 80_000_000, reached: false, desc: '12 nodes, 6 continents — a planetary university with borderless access.', icon: Landmark },
];

const CONSTELLATIONS = [
  { id: 'c1', title: 'The Cipher', desc: 'A cryptographic token permanently recording your contribution on the Artemis ledger. Your name, encrypted, becomes part of the university\'s foundation — visible forever on the public chain.', min: 25, icon: Hash, color: '#818cf8', magnitude: 1 },
  { id: 'c2', title: 'The Dispatch', desc: 'Quarterly intelligence brief from the Chancellor — exclusive essays, research previews, and strategic updates from inside the founding. Not a newsletter. A window into the build.', min: 100, icon: Mail, color: '#a78bfa', magnitude: 2 },
  { id: 'c3', title: 'The Passage', desc: 'Priority invitation to visit any Artemis node worldwide during the founding year. Walk the spaces, meet the community, witness the construction of something unprecedented.', min: 500, icon: Compass, color: '#22d3ee', magnitude: 3 },
  { id: 'c4', title: 'The Codex', desc: 'A limited-edition leather-bound volume documenting the founding of Artemis — your name inscribed in the founding roll. Printed on archival paper. Meant to last centuries.', min: 1000, icon: BookOpen, color: '#34d399', magnitude: 4 },
  { id: 'c5', title: 'The Patron', desc: 'Fully fund a named micro-scholarship for one student. You choose the focus — AI ethics, marine biology, civic design. They carry your name through their Artemis journey.', min: 5000, icon: GraduationCap, color: '#fbbf24', magnitude: 5 },
  { id: 'c6', title: 'The Dedication', desc: 'Name a research lab within a node. A permanent plaque, a dedication ceremony, annual reports from the researchers. Your name becomes synonymous with discovery.', min: 25000, icon: FlaskConical, color: '#f87171', magnitude: 6 },
  { id: 'c7', title: 'The Commons', desc: 'Name one of the 12 Living Commons. Your name becomes part of daily life at Artemis — spoken by every resident, written on every map, etched into the identity of a community.', min: 100000, icon: Home, color: '#8A0000', magnitude: 7 },
  { id: 'c8', title: 'The Apex', desc: 'Become the patron of an entire Artemis node. The building bears your name. The community carries your legacy. A seat on the Founders\' Council. The highest honour.', min: 1000000, icon: Building2, color: '#fbbf24', magnitude: 8 },
];

const EVENTS = [
  { title: 'The Founding Convocation', type: 'gala', desc: 'An evening of vision and commitment. Meet the Chancellor and founding faculty at the Geneva node. Black tie. Historic.', date: '15 Sep 2026', location: 'Geneva', virtual: false, capacity: 200, registered: 87, price: 500, icon: Crown },
  { title: 'Inside the Build', type: 'webinar', desc: 'Walk through the digital and physical architecture of Artemis with the design team. Live Q&A with founding engineers.', date: '22 Jul 2026', location: 'Online', virtual: true, capacity: 1000, registered: 432, price: 0, icon: Video },
  { title: 'Double Impact Day', type: 'matching', desc: 'Every pound donated is matched by the Catalyst Foundation. Your £1 becomes £2. 24 hours only.', date: '1 Oct 2026', location: 'Global', virtual: true, capacity: null, registered: 0, price: null, icon: Zap },
  { title: 'The Artemis Auction', type: 'auction', desc: 'Bid on naming rights, original artwork, and exclusive experiences. All proceeds fund the Global Scholars Fund.', date: '20 Nov 2026', location: 'London', virtual: false, capacity: 150, registered: 34, price: 250, icon: Star },
  { title: 'Hack the Future', type: 'hackathon', desc: 'A founding-weekend hackathon where donors and students co-build tools for the Artemis platform.', date: '8 Aug 2026', location: 'San Francisco', virtual: false, capacity: 100, registered: 61, price: 0, icon: Flame },
  { title: 'Spring Benefactor Dinner', type: 'gala', desc: 'An intimate dinner for major donors at the Valletta node. Michelin-starred cuisine and the future of knowledge.', date: '14 Mar 2027', location: 'Valletta', virtual: false, capacity: 80, registered: 22, price: 1000, icon: Gem },
];

const DONORS = [
  { name: 'The Nordgren Foundation', amount: 500000, date: '28 Apr', msg: 'Investing in the infrastructure of imagination.', tier: 'chancellors' },
  { name: 'Chen Wei Laboratories', amount: 200000, date: '4 May', msg: null, tier: 'founders' },
  { name: 'Dr. Elena Vasquez', amount: 50000, date: '10 May', msg: 'For the students who will change everything.', tier: 'founders' },
  { name: 'Anonymous Patron', amount: 100000, date: '7 May', msg: 'Because knowledge should have no borders.', tier: 'chancellors' },
  { name: 'The Matsuo Trust', amount: 150000, date: '18 Apr', msg: null, tier: 'founders' },
  { name: 'Liu Fang Foundation', amount: 75000, date: '25 Apr', msg: null, tier: 'guild' },
  { name: 'James & Priya Okonkwo', amount: 25000, date: '8 May', msg: null, tier: 'guild' },
  { name: 'The Al-Rashidi Family', amount: 15000, date: '5 May', msg: 'In memory of Fatima Al-Rashidi.', tier: 'guild' },
  { name: 'Dr. Robert & Sarah Kimani', amount: 10000, date: '22 Apr', msg: 'For the next generation of African scholars.', tier: 'guild' },
  { name: 'Sven & Astrid Lindqvist', amount: 20000, date: '20 Apr', msg: 'For the north, and for everywhere.', tier: 'guild' },
  { name: 'Anonymous', amount: 5000, date: '23 Apr', msg: null, tier: 'community' },
  { name: 'Takeshi Yamamoto', amount: 1000, date: '2 May', msg: null, tier: 'community' },
  { name: 'Maria Santos', amount: 500, date: '3 May', msg: 'Proud to be part of the founding.', tier: 'community' },
  { name: 'Amara Osei', amount: 100, date: '27 Apr', msg: 'Every great university starts with a first believer.', tier: 'community' },
  { name: 'Isla McGregor', amount: 250, date: '15 Apr', msg: 'A small stone in a great cathedral.', tier: 'community' },
];

const TIER_COLORS: Record<string, string> = { chancellors: '#8A0000', founders: '#818cf8', guild: '#22d3ee', community: '#34d399' };
const CRYPTO = { BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', ETH: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' };
const PRESETS = [25, 100, 500, 1000, 5000, 25000];

/* ─── Hooks ─── */
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

/* ─── Constellation SVG — the central visual metaphor ─── */
function ConstellationMap({ percent, hoveredConstellation }: { percent: number; hoveredConstellation: string | null }) {
  const stars = [
    // Central star (the campaign)
    { cx: 400, cy: 250, r: 6, glow: true, id: 'center' },
    // Milestone cluster 1 — reached
    { cx: 180, cy: 160, r: 4, glow: true, id: 'm1' },
    { cx: 210, cy: 130, r: 3, glow: true, id: 'm1b' },
    { cx: 160, cy: 190, r: 3, glow: true, id: 'm1c' },
    // Milestone cluster 2 — reached
    { cx: 300, cy: 120, r: 4, glow: true, id: 'm2' },
    { cx: 330, cy: 100, r: 3, glow: true, id: 'm2b' },
    { cx: 280, cy: 140, r: 2.5, glow: true, id: 'm2c' },
    // Milestone cluster 3
    { cx: 520, cy: 140, r: 3.5, glow: false, id: 'm3' },
    { cx: 550, cy: 120, r: 2.5, glow: false, id: 'm3b' },
    { cx: 500, cy: 160, r: 2, glow: false, id: 'm3c' },
    // Milestone cluster 4
    { cx: 600, cy: 250, r: 3.5, glow: false, id: 'm4' },
    { cx: 630, cy: 230, r: 2.5, glow: false, id: 'm4b' },
    { cx: 580, cy: 270, r: 2, glow: false, id: 'm4c' },
    // Milestone cluster 5
    { cx: 520, cy: 360, r: 3.5, glow: false, id: 'm5' },
    { cx: 550, cy: 380, r: 2.5, glow: false, id: 'm5b' },
    { cx: 500, cy: 340, r: 2, glow: false, id: 'm5c' },
    // Scattered donor stars
    { cx: 120, cy: 300, r: 1.5, glow: true, id: 'd1' },
    { cx: 350, cy: 80, r: 1.5, glow: true, id: 'd2' },
    { cx: 450, cy: 380, r: 1, glow: true, id: 'd3' },
    { cx: 250, cy: 350, r: 1, glow: true, id: 'd4' },
    { cx: 680, cy: 160, r: 1, glow: false, id: 'd5' },
    { cx: 150, cy: 80, r: 1.5, glow: true, id: 'd6' },
    { cx: 650, cy: 350, r: 1, glow: false, id: 'd7' },
    { cx: 90, cy: 220, r: 1, glow: true, id: 'd8' },
    { cx: 700, cy: 280, r: 1, glow: false, id: 'd9' },
  ];

  const lines = [
    ['m1', 'm1b'], ['m1', 'm1c'], ['m1b', 'center'], ['m1c', 'center'],
    ['m2', 'm2b'], ['m2', 'm2c'], ['m2', 'center'],
    ['m3', 'm3b'], ['m3', 'm3c'], ['m3', 'center'],
    ['m4', 'm4b'], ['m4', 'm4c'], ['m4', 'center'],
    ['m5', 'm5b'], ['m5', 'm5c'], ['m5', 'center'],
    ['d1', 'm1'], ['d2', 'm2'], ['d3', 'center'], ['d4', 'm1c'],
    ['d6', 'm1b'], ['d8', 'm1'],
  ];

  const starMap = Object.fromEntries(stars.map(s => [s.id, s]));

  return (
    <svg viewBox="0 0 800 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Background grid — subtle */}
      <defs>
        <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8A0000" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8A0000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="starGlowWhite" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Connection lines */}
      {lines.map(([from, to], i) => {
        const s1 = starMap[from], s2 = starMap[to];
        if (!s1 || !s2) return null;
        const bothReached = s1.glow && s2.glow;
        return (
          <motion.line
            key={i}
            x1={s1.cx} y1={s1.cy} x2={s2.cx} y2={s2.cy}
            stroke={bothReached ? '#8A0000' : '#ffffff'}
            strokeWidth={0.5}
            strokeOpacity={bothReached ? 0.4 : 0.08}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: i * 0.05 }}
          />
        );
      })}

      {/* Stars */}
      {stars.map((star, i) => (
        <g key={star.id}>
          {/* Glow halo */}
          {(star.glow || star.id === 'center') && (
            <circle cx={star.cx} cy={star.cy} r={star.r * 4} fill={star.id === 'center' ? 'url(#starGlow)' : 'url(#starGlowWhite)'} opacity={0.5}>
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
            </circle>
          )}
          {/* Star point */}
          <motion.circle
            cx={star.cx} cy={star.cy} r={star.r}
            fill={star.glow ? (star.id === 'center' ? '#8A0000' : '#ffffff') : '#555'}
            filter={star.glow ? 'url(#glow)' : undefined}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.03, duration: 0.4 }}
          />
        </g>
      ))}

      {/* Current position indicator — pulsing ring at campaign % */}
      <circle cx={400} cy={250} r={12} fill="none" stroke="#8A0000" strokeWidth={1} strokeOpacity={0.6}>
        <animate attributeName="r" values="12;20;12" dur="2s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* ─── Star Magnitude Visualizer ─── */
function StarMagnitude({ amount }: { amount: number }) {
  const magnitude = amount <= 0 ? 0 : amount < 100 ? 1 : amount < 500 ? 2 : amount < 1000 ? 3 : amount < 5000 ? 4 : amount < 25000 ? 5 : amount < 100000 ? 6 : amount < 1000000 ? 7 : 8;
  const size = 6 + magnitude * 4;
  const glowSize = size * 4;
  const opacity = 0.3 + (magnitude / 8) * 0.7;
  return (
    <div className="relative flex items-center justify-center" style={{ width: 80, height: 80 }}>
      {magnitude > 0 && (
        <>
          <div className="absolute rounded-full" style={{ width: glowSize, height: glowSize, background: `radial-gradient(circle, rgba(138,0,0,${opacity}) 0%, transparent 70%)` }} />
          <motion.div
            className="rounded-full bg-[#8A0000]"
            style={{ width: size, height: size }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
          <div className="absolute rounded-full border border-[#8A0000]/30" style={{ width: size + 16, height: size + 16 }}>
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="20s" repeatCount="indefinite" />
          </div>
        </>
      )}
      {magnitude === 0 && <div className="w-2 h-2 rounded-full bg-gray-600" />}
    </div>
  );
}

/* ─── Main Component ─── */
export default function FundraisingCampaign({ goToPage }: Props) {
  const activeSection = useActiveSection(['campaign', 'milestones', 'constellations', 'events', 'offering', 'foundry', 'horizon']);
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
  const [hoveredConstellation, setHoveredConstellation] = useState<string | null>(null);

  const heroAnim = useInView(0);
  const caseAnim = useInView(0);
  const milestonesAnim = useInView(0);
  const constellationsAnim = useInView(0);
  const eventsAnim = useInView(0);
  const offeringAnim = useInView(0);
  const foundryAnim = useInView(0);
  const horizonAnim = useInView(0);

  const effectiveAmount = selectedAmount || parseFloat(customAmount) || 0;

  const handleDonate = useCallback(async () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount || amount <= 0 || !donorEmail) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorEmail, donorName: isAnonymous ? null : donorName, donorAnonymous: isAnonymous,
          amount, currency: CAMPAIGN.currency, paymentMethod: paymentMethod === 'crypto' ? `crypto_${cryptoCoin.toLowerCase()}` : paymentMethod,
          perkId: selectedPerk, isRecurring, recurringFreq: isRecurring ? recurringFreq : null, message: donorMessage || null,
        }),
      });
      const data = await res.json();
      setDonationResult(data.success ? { success: true, message: data.message } : { success: false, message: data.error || 'Something went wrong.' });
    } catch { setDonationResult({ success: false, message: 'Network error.' }); }
    finally { setSubmitting(false); }
  }, [selectedAmount, customAmount, donorEmail, donorName, isAnonymous, paymentMethod, cryptoCoin, selectedPerk, isRecurring, recurringFreq, donorMessage]);

  return (
    <div className="flex flex-col bg-[#050505]">

      {/* ══════════════════════════════════════════
          I. THE VOID — Hero
          ══════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#050505] min-h-[90vh] flex flex-col">
        {/* Twinkling stars background — CSS only */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
                animation: `twinkle ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes twinkle { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.7; } }
          @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px rgba(138,0,0,0.3); } 50% { box-shadow: 0 0 60px rgba(138,0,0,0.6); } }
        `}</style>

        <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-8 text-center">
          <div ref={heroAnim.ref} className={`transition-all duration-[1500ms] ${heroAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* The central star */}
            <div className="mx-auto mb-12 relative">
              <div className="w-4 h-4 bg-[#8A0000] rounded-full mx-auto" style={{ animation: 'pulse-glow 3s ease-in-out infinite' }} />
              <div className="absolute inset-0 w-4 h-4 rounded-full mx-auto" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 60, height: 60, background: 'radial-gradient(circle, rgba(138,0,0,0.3) 0%, transparent 70%)' }} />
            </div>

            <p className="text-[13px] font-bold uppercase tracking-[0.5em] text-white/30 mb-8">The Founding Campaign</p>

            <h1 className="text-[48px] md:text-[72px] lg:text-[96px] font-extrabold leading-[0.9] tracking-tighter text-white mb-8">
              Building the<br />
              <span className="text-[#8A0000]">Future</span> of Knowledge
            </h1>

            <p className="text-[18px] md:text-[20px] text-white/40 max-w-2xl mx-auto leading-relaxed font-light mb-12">
              Before the university, there was a question. What if knowledge had no borders? What if a university could be built from nothing but conviction — by people who believe that the next century of discovery begins with a single act of faith?
            </p>

            {/* Campaign stats row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-12">
              <div className="text-center">
                <div className="text-[36px] md:text-[48px] font-black text-white leading-none">{sym}{fmtShort(CAMPAIGN.raised)}</div>
                <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30 mt-2">raised of {sym}{fmtShort(CAMPAIGN.goal)}</div>
              </div>
              <div className="w-px h-12 bg-white/10 hidden sm:block" />
              <div className="text-center">
                <div className="text-[36px] md:text-[48px] font-black text-[#8A0000] leading-none">{pct}%</div>
                <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30 mt-2">funded</div>
              </div>
              <div className="w-px h-12 bg-white/10 hidden sm:block" />
              <div className="text-center">
                <div className="text-[36px] md:text-[48px] font-black text-white leading-none">{fmtNum(CAMPAIGN.donors)}</div>
                <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30 mt-2">founders</div>
              </div>
            </div>

            {/* Progress arc */}
            <div className="max-w-xl mx-auto mb-12">
              <div className="h-1 bg-white/5 w-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-[#8A0000] to-[#dc2626]" initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} transition={{ duration: 2.5, ease: 'easeOut' }} viewport={{ once: true }} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => document.getElementById('offering')?.scrollIntoView({ behavior: 'smooth' })} className="px-10 py-4 bg-[#8A0000] text-white text-[13px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors flex items-center gap-3 group">
                Ignite Your Star <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => document.getElementById('campaign')?.scrollIntoView({ behavior: 'smooth' })} className="px-10 py-4 border border-white/20 text-white/60 text-[13px] font-bold uppercase tracking-widest hover:bg-white/5 hover:text-white transition-colors">
                Read the Case
              </button>
            </div>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={[
          { id: 'campaign', label: 'Case' },
          { id: 'milestones', label: 'Ascent' },
          { id: 'constellations', label: 'Constellations' },
          { id: 'events', label: 'Gatherings' },
          { id: 'offering', label: 'Offering' },
          { id: 'foundry', label: 'Foundry' },
          { id: 'horizon', label: 'Horizon' },
        ]}
        activeSection={activeSection}
      />

      {/* ══════════════════════════════════════════
          II. THE CASE — Why Artemis, Why Now
          ══════════════════════════════════════════ */}
      <section id="campaign" className="scroll-mt-[110px] py-20 lg:py-32 bg-[#050505]">
        <div ref={caseAnim.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${caseAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Case for Support</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7">
              <h2 className="text-[36px] md:text-[48px] font-extrabold leading-[1.0] tracking-tighter text-white mb-10">
                Why Artemis?<br />Why now?
              </h2>
              <div className="space-y-6 text-[17px] text-white/50 leading-relaxed">
                <p>The traditional university model is at an inflection point. Decades of bureaucratic growth, physical limitations, and closed systems have severely constrained the potential of the modern scholar. Artemis was founded to transcend these limitations — not by merely digitizing existing structures, but by reimagining the very nature of an academic community from the ground up.</p>
                <p>We are building a <em className="text-white/70">universitas</em> optimized for our era: borderless, data-driven, and intrinsically collaborative. Our core operating philosophy is one of <strong className="text-white/80">Foundational Efficiency</strong> — true innovation thrives when resources are concentrated on the intellectual work, not on massive administrative overhead. Every pound donated goes directly toward faculty excellence, student access, and research breakthroughs.</p>
                <p>The Founding Campaign provides the strategic capital to construct our fundamental digital estate, endow our first residential colleges, and launch interdisciplinary research hubs that operate at the speed of modern discovery instead of the pace of administrative committees. By leveraging decentralized technologies, we reduce operational drag by nearly 60% compared to traditional institutions, directing 90% of all capital toward academic and research programmes.</p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              {/* Efficiency Metrics */}
              <div className="bg-white/[0.03] border border-white/[0.06] p-8">
                <h3 className="text-[16px] font-bold text-white/70 mb-6 uppercase tracking-widest">Foundational Efficiency</h3>
                {[
                  { value: '60%', label: 'Less Overhead', desc: 'No redundant campuses, no bloated administration' },
                  { value: '90%', label: 'To Programmes', desc: 'Capital directed to academic and research work' },
                  { value: '3', label: 'Continents', desc: 'Borderless scaling via our core digital stack' },
                ].map((item, i) => (
                  <div key={i} className="border-b border-white/[0.06] py-5 last:border-0">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[32px] font-black text-[#8A0000] leading-none">{item.value}</span>
                      <span className="text-[13px] font-bold uppercase tracking-widest text-white/40">{item.label}</span>
                    </div>
                    <p className="text-[13px] text-white/25 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Strategic Initiative */}
              <div className="bg-white/[0.03] border border-white/[0.06] p-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-3 block">Strategic Initiative</span>
                <h4 className="text-[18px] font-bold text-white mb-3">Endowment for Autonomous Research</h4>
                <p className="text-[14px] text-white/40 leading-relaxed">A permanent endowment supporting interdisciplinary research hubs that operate independently of state or commercial agendas — each with a 20-year operational runway that frees researchers from the grant cycle.</p>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.06] p-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-3 block">Strategic Initiative</span>
                <h4 className="text-[18px] font-bold text-white mb-3">The Global Scholars Fund</h4>
                <p className="text-[14px] text-white/40 leading-relaxed">Full-ride virtual residencies and travel grants for scholars from underserved digital nodes — ensuring our community represents the true intellectual capital of the world, not merely the economic capital.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          III. THE ASCENT — Milestones as Constellation
          ══════════════════════════════════════════ */}
      <section id="milestones" className="scroll-mt-[110px] py-20 lg:py-28 bg-[#080808]">
        <div ref={milestonesAnim.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${milestonesAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Ascent</span>
          </div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold leading-[1.0] tracking-tighter text-white mb-4">Every star, a milestone</h2>
          <p className="text-[17px] text-white/40 max-w-2xl leading-relaxed mb-16">Track our progress as we climb from foundation to global scale. Each milestone ignites a new cluster in the Artemis constellation — and your contribution determines which stars light next.</p>

          {/* Constellation Map */}
          <div className="mb-16 max-w-3xl mx-auto">
            <ConstellationMap percent={pct} hoveredConstellation={hoveredConstellation} />
          </div>

          {/* Milestone vertical timeline */}
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/[0.06]" />
            {MILESTONES.map((ms, i) => {
              const Icon = ms.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative pl-14 pb-12 last:pb-0"
                >
                  <div className={`absolute left-0 top-0 w-10 h-10 flex items-center justify-center border ${ms.reached ? 'bg-[#8A0000] border-[#8A0000]' : 'bg-[#080808] border-white/10'}`}>
                    <Icon size={16} className={ms.reached ? 'text-white' : 'text-white/20'} />
                  </div>
                  <div className="flex items-baseline gap-4 mb-2">
                    <h4 className="text-[18px] font-bold text-white">{ms.title}</h4>
                    <span className="text-[13px] font-bold text-[#8A0000]">{sym}{fmtShort(ms.target)}</span>
                    {ms.reached && <Check size={14} className="text-[#8A0000]" />}
                  </div>
                  <p className="text-[15px] text-white/35 leading-relaxed">{ms.desc}</p>
                  {/* Progress within milestone */}
                  <div className="mt-3 h-0.5 bg-white/[0.06] w-full max-w-md">
                    <div className={`h-full transition-all ${ms.reached ? 'bg-[#8A0000]' : 'bg-white/10'}`} style={{ width: ms.reached ? '100%' : `${Math.max(0, Math.min(100, ((CAMPAIGN.raised - ms.target + 15_000_000) / 15_000_000) * 100))}%` }} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          IV. THE CONSTELLATIONS — Giving Tiers
          ══════════════════════════════════════════ */}
      <section id="constellations" className="scroll-mt-[110px] py-20 lg:py-28 bg-[#050505]">
        <div ref={constellationsAnim.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${constellationsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Constellations</span>
          </div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold leading-[1.0] tracking-tighter text-white mb-4">Place your star</h2>
          <p className="text-[17px] text-white/40 max-w-2xl leading-relaxed mb-16">Every contribution earns a place in the founding sky. From a single cipher-star to an apex constellation that bears your name — the brighter you give, the more indelible your mark on the university that will shape the next century.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONSTELLATIONS.map((c, i) => {
              const Icon = c.icon;
              const isSelected = selectedPerk === c.id;
              return (
                <motion.button
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  viewport={{ once: true }}
                  onClick={() => { setSelectedPerk(isSelected ? null : c.id); if (!isSelected) { setSelectedAmount(c.min); setCustomAmount(''); } }}
                  className={`text-left p-6 border transition-all group ${isSelected ? 'border-[#8A0000] bg-[#8A0000]/10' : 'border-white/[0.06] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: c.color + '20' }}>
                      <Icon size={16} style={{ color: c.color }} />
                    </div>
                    {isSelected && <Check size={14} className="text-[#8A0000]" />}
                  </div>
                  <h4 className="text-[15px] font-bold text-white mb-2">{c.title}</h4>
                  <p className="text-[12px] text-white/30 leading-relaxed mb-4 min-h-[48px]">{c.desc.slice(0, 80)}...</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">From</span>
                    <span className="text-[18px] font-black text-white">{sym}{fmtShort(c.min)}</span>
                  </div>
                  {/* Magnitude indicator */}
                  <div className="flex gap-1 mt-3">
                    {Array.from({ length: 8 }).map((_, j) => (
                      <div key={j} className={`w-1.5 h-1.5 rounded-full ${j < c.magnitude ? 'bg-[#8A0000]' : 'bg-white/10'}`} />
                    ))}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Expanded constellation detail */}
          <AnimatePresence>
            {selectedPerk && (() => {
              const c = CONSTELLATIONS.find(x => x.id === selectedPerk);
              if (!c) return null;
              const Icon = c.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 bg-white/[0.03] border border-[#8A0000]/30 p-8 lg:p-10 overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <Icon size={22} style={{ color: c.color }} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Magnitude {c.magnitude}</span>
                      </div>
                      <h3 className="text-[26px] font-extrabold text-white mb-3">{c.title}</h3>
                      <p className="text-[15px] text-white/50 leading-relaxed">{c.desc}</p>
                    </div>
                    <div className="lg:text-right shrink-0">
                      <div className="text-[12px] font-bold uppercase tracking-widest text-[#8A0000] mb-2">Minimum</div>
                      <div className="text-[44px] font-black text-white leading-none">{sym}{fmtShort(c.min)}</div>
                      <button onClick={() => document.getElementById('offering')?.scrollIntoView({ behavior: 'smooth' })} className="mt-5 px-8 py-3 bg-[#8A0000] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors flex items-center gap-2 group mx-auto lg:ml-auto">
                        Claim <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          V. THE GATHERINGS — Events
          ══════════════════════════════════════════ */}
      <section id="events" className="scroll-mt-[110px] py-20 lg:py-28 bg-[#080808]">
        <div ref={eventsAnim.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${eventsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Gatherings</span>
          </div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold leading-[1.0] tracking-tighter text-white mb-4">Convene the founders</h2>
          <p className="text-[17px] text-white/40 max-w-2xl leading-relaxed mb-12">The founding is a movement, not just a financial campaign. These gatherings — from galas to hackathons to matching days — are where the community becomes real.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EVENTS.map((ev, i) => {
              const Icon = ev.icon;
              const isFull = ev.capacity ? ev.registered >= ev.capacity : false;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  viewport={{ once: true }}
                  className="bg-white/[0.02] border border-white/[0.06] p-6 hover:border-[#8A0000]/30 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-[#8A0000]/10 flex items-center justify-center">
                      <Icon size={14} className="text-[#8A0000]" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">{ev.type}</span>
                    {ev.type === 'matching' && <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 bg-[#8A0000] text-white">2x</span>}
                  </div>
                  <h4 className="text-[16px] font-bold text-white mb-2 group-hover:text-[#8A0000] transition-colors">{ev.title}</h4>
                  <p className="text-[13px] text-white/30 leading-relaxed mb-4">{ev.desc}</p>
                  <div className="flex items-center gap-4 text-[12px] text-white/25">
                    <span className="flex items-center gap-1"><MapPin size={10} />{ev.location}</span>
                    <span>{ev.date}</span>
                    {ev.price !== null && ev.price > 0 && <span>{sym}{ev.price}</span>}
                    {ev.price === 0 && <span className="text-[#8A0000]">Free</span>}
                  </div>
                  {ev.capacity && (
                    <div className="mt-3">
                      <div className="h-0.5 bg-white/[0.06] w-full">
                        <div className="h-full bg-[#8A0000]/60" style={{ width: `${(ev.registered / ev.capacity) * 100}%` }} />
                      </div>
                      <span className="text-[10px] text-white/15 mt-1 block">{ev.registered}/{ev.capacity} registered</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VI. THE OFFERING — Donate
          ══════════════════════════════════════════ */}
      <section id="offering" className="scroll-mt-[110px] py-20 lg:py-28 bg-[#050505]">
        <div ref={offeringAnim.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${offeringAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Offering</span>
          </div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold leading-[1.0] tracking-tighter text-white mb-4">Transmit your signal</h2>
          <p className="text-[17px] text-white/40 max-w-2xl leading-relaxed mb-16">Every contribution is a transmission — a signal sent into the future that you were here, that you believed, that you helped build something that will outlast every one of us.</p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left — Form */}
            <div className="lg:col-span-8 space-y-8">
              {/* Amount + Star Magnitude Visualizer */}
              <div className="bg-white/[0.02] border border-white/[0.06] p-8">
                <div className="flex items-start gap-8">
                  <div className="flex-1">
                    <h3 className="text-[13px] font-bold uppercase tracking-widest text-white/50 mb-4">Select your magnitude</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                      {PRESETS.map(amt => (
                        <button key={amt} onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }} className={`py-3 text-[13px] font-bold border transition-colors ${selectedAmount === amt ? 'bg-[#8A0000] text-white border-[#8A0000]' : 'bg-transparent text-white/50 border-white/10 hover:border-[#8A0000]/50 hover:text-white'}`}>
                          {sym}{fmtShort(amt)}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px] font-bold text-white/20">{sym}</span>
                      <input type="number" value={customAmount} onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }} placeholder="Custom amount" className="w-full pl-8 pr-4 py-3 bg-white/[0.03] border border-white/10 focus:border-[#8A0000] focus:outline-none text-[16px] font-bold text-white placeholder:text-white/15" />
                    </div>
                  </div>
                  <StarMagnitude amount={effectiveAmount} />
                </div>
              </div>

              {/* Recurring */}
              <div className="bg-white/[0.02] border border-white/[0.06] p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Repeat size={16} className="text-[#8A0000]" />
                    <span className="text-[14px] font-bold text-white">Make it recurring</span>
                    <span className="text-[12px] text-white/25">— multiply your impact</span>
                  </div>
                  <button onClick={() => setIsRecurring(!isRecurring)} className={`w-11 h-5 rounded-full transition-colors relative ${isRecurring ? 'bg-[#8A0000]' : 'bg-white/10'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${isRecurring ? 'left-[24px]' : 'left-0.5'}`} />
                  </button>
                </div>
                {isRecurring && (
                  <div className="flex gap-2 mt-4">
                    {['monthly', 'quarterly', 'annual'].map(f => (
                      <button key={f} onClick={() => setRecurringFreq(f)} className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-colors ${recurringFreq === f ? 'bg-[#8A0000] text-white border-[#8A0000]' : 'bg-transparent text-white/30 border-white/10 hover:border-white/20'}`}>{f}</button>
                    ))}
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-[13px] font-bold uppercase tracking-widest text-white/50 mb-4">Transmission channel</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { key: 'card' as const, icon: CreditCard, label: 'Card' },
                    { key: 'bank' as const, icon: Banknote, label: 'Bank Transfer' },
                    { key: 'crypto' as const, icon: Bitcoin, label: 'Crypto' },
                    { key: 'paypal' as const, icon: Wallet, label: 'PayPal' },
                  ].map(m => (
                    <button key={m.key} onClick={() => setPaymentMethod(m.key)} className={`flex items-center gap-3 p-4 border transition-colors ${paymentMethod === m.key ? 'bg-[#8A0000]/20 border-[#8A0000] text-white' : 'bg-white/[0.02] border-white/[0.06] text-white/40 hover:border-white/20'}`}>
                      <m.icon size={16} />
                      <span className="text-[11px] font-bold uppercase tracking-widest">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Crypto panel */}
              {paymentMethod === 'crypto' && (
                <div className="bg-white/[0.03] border border-white/[0.08] p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Bitcoin size={18} className="text-[#f7931a]" />
                    <span className="text-[14px] font-bold text-white">Cryptocurrency</span>
                  </div>
                  <div className="flex gap-2 mb-4">
                    {(['BTC', 'ETH'] as const).map(coin => (
                      <button key={coin} onClick={() => setCryptoCoin(coin)} className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest border transition-colors ${cryptoCoin === coin ? 'bg-[#8A0000] text-white border-[#8A0000]' : 'text-white/30 border-white/10'}`}>{coin}</button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-[12px] text-white/40 bg-white/[0.03] px-3 py-2 flex-1 break-all font-mono">{CRYPTO[cryptoCoin]}</code>
                    <button onClick={() => navigator.clipboard?.writeText(CRYPTO[cryptoCoin])} className="px-3 py-2 bg-white/[0.06] text-white/40 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">Copy</button>
                  </div>
                  <p className="text-[12px] text-white/20 mt-3">After sending, email crypto@artemis.edu with your transaction hash to receive your constellation perk.</p>
                </div>
              )}

              {/* Bank transfer panel */}
              {paymentMethod === 'bank' && (
                <div className="bg-white/[0.03] border border-white/[0.08] p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Banknote size={18} className="text-[#8A0000]" />
                    <span className="text-[14px] font-bold text-white">Bank Transfer</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      ['Account', 'Artemis University Founding Fund'],
                      ['Sort Code', '20-45-78'],
                      ['Account No', '73128945'],
                      ['IBAN', 'GB29 BARC 2045 7873 1289 45'],
                      ['Reference', 'ARTEMIS-FOUNDING'],
                    ].map(([label, value], i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-white/[0.04] last:border-0">
                        <span className="text-[12px] text-white/25">{label}</span>
                        <div className="flex items-center gap-2">
                          <code className="text-[12px] font-bold text-white/60 font-mono">{value}</code>
                          <button onClick={() => navigator.clipboard?.writeText(value)} className="text-[9px] text-[#8A0000] font-bold uppercase tracking-widest hover:underline">Copy</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Donor info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1 block">Name</label>
                  <input type="text" value={donorName} onChange={(e) => setDonorName(e.target.value)} disabled={isAnonymous} placeholder={isAnonymous ? 'Anonymous' : 'Your name'} className={`w-full px-4 py-3 bg-white/[0.03] border border-white/10 focus:border-[#8A0000] focus:outline-none text-[14px] text-white placeholder:text-white/15 ${isAnonymous ? 'opacity-30' : ''}`} />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1 block">Email *</label>
                  <input type="email" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} placeholder="you@email.com" className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 focus:border-[#8A0000] focus:outline-none text-[14px] text-white placeholder:text-white/15" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setIsAnonymous(!isAnonymous)} className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${isAnonymous ? 'bg-[#8A0000] border-[#8A0000]' : 'bg-transparent border-white/20'}`}>
                  {isAnonymous && <Check size={12} className="text-white" />}
                </button>
                <span className="text-[13px] text-white/40">Transmit anonymously</span>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1 block">Message (optional)</label>
                <textarea value={donorMessage} onChange={(e) => setDonorMessage(e.target.value)} placeholder="Why you're supporting Artemis..." rows={3} className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 focus:border-[#8A0000] focus:outline-none text-[14px] text-white placeholder:text-white/15 resize-none" />
              </div>
            </div>

            {/* Right — Summary */}
            <div className="lg:col-span-4">
              <div className="sticky top-[180px] bg-white/[0.03] border border-[#8A0000]/40 p-8">
                <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#8A0000] mb-6">Your Transmission</h3>

                <div className="flex items-center gap-4 mb-6">
                  <StarMagnitude amount={effectiveAmount} />
                  <div>
                    <div className="text-[32px] font-black text-white leading-none">{sym}{fmtShort(effectiveAmount || 0)}</div>
                    {isRecurring && <div className="text-[12px] text-[#8A0000] font-bold mt-1">{recurringFreq} &middot; {sym}{fmtShort(effectiveAmount * (recurringFreq === 'monthly' ? 12 : recurringFreq === 'quarterly' ? 4 : 1))}/yr</div>}
                  </div>
                </div>

                {selectedPerk && (() => {
                  const c = CONSTELLATIONS.find(x => x.id === selectedPerk);
                  if (!c) return null;
                  return (
                    <div className="mb-6 p-4 bg-[#8A0000]/5 border border-[#8A0000]/20">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">Your Constellation</span>
                      <div className="flex items-center gap-2 mt-1">
                        {React.createElement(c.icon, { size: 14, style: { color: c.color } })}
                        <span className="text-[14px] font-bold text-white">{c.title}</span>
                      </div>
                    </div>
                  );
                })()}

                {/* Impact */}
                <div className="mb-6 p-4 bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-2 block">Your Impact</span>
                  {effectiveAmount >= 1000000 && <p className="text-[12px] text-white/40">Patron of an entire node. Your name on a building. A seat on the Founders&apos; Council.</p>}
                  {effectiveAmount >= 100000 && effectiveAmount < 1000000 && <p className="text-[12px] text-white/40">Names a Living Commons — your name spoken daily by every resident.</p>}
                  {effectiveAmount >= 25000 && effectiveAmount < 100000 && <p className="text-[12px] text-white/40">Names a research lab in perpetuity. A permanent dedication.</p>}
                  {effectiveAmount >= 5000 && effectiveAmount < 25000 && <p className="text-[12px] text-white/40">Funds a named micro-scholarship for one student.</p>}
                  {effectiveAmount >= 500 && effectiveAmount < 5000 && <p className="text-[12px] text-white/40">Sponsors a student&apos;s travel to a node.</p>}
                  {effectiveAmount >= 100 && effectiveAmount < 500 && <p className="text-[12px] text-white/40">Funds one week of digital infrastructure.</p>}
                  {effectiveAmount > 0 && effectiveAmount < 100 && <p className="text-[12px] text-white/40">Every star counts in the constellation.</p>}
                </div>

                <button onClick={handleDonate} disabled={submitting || !donorEmail || effectiveAmount <= 0} className={`w-full py-4 text-[12px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${submitting || !donorEmail || effectiveAmount <= 0 ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-[#8A0000] text-white hover:bg-[#6B0000]'}`}>
                  {submitting ? 'Transmitting...' : 'Transmit'} {!submitting && <ArrowRight size={14} />}
                </button>

                <div className="flex items-center gap-2 mt-3 justify-center">
                  <Lock size={10} className="text-white/10" />
                  <span className="text-[10px] text-white/15">256-bit SSL. Your signal is encrypted.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Result */}
          <AnimatePresence>
            {donationResult && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-8 p-8 border ${donationResult.success ? 'bg-emerald-950/50 border-emerald-800/50' : 'bg-red-950/50 border-red-800/50'}`}>
                <span className={`text-[16px] font-bold block mb-2 ${donationResult.success ? 'text-emerald-400' : 'text-red-400'}`}>{donationResult.success ? 'Signal received. Thank you.' : 'Transmission failed.'}</span>
                <p className={`text-[14px] ${donationResult.success ? 'text-emerald-500/70' : 'text-red-500/70'}`}>{donationResult.message}</p>
                {donationResult.success && (
                  <button onClick={() => { setDonationResult(null); setSelectedAmount(null); setCustomAmount(''); setDonorName(''); setDonorEmail(''); setDonorMessage(''); setSelectedPerk(null); }} className="mt-4 text-[11px] font-bold uppercase tracking-widest text-[#8A0000] border-b border-[#8A0000] pb-1 hover:text-white transition-colors">Send another signal</button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VII. THE FOUNDRY — Donor Wall
          ══════════════════════════════════════════ */}
      <section id="foundry" className="scroll-mt-[110px] py-20 lg:py-28 bg-[#0a0a0a]">
        <div ref={foundryAnim.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${foundryAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-4 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#8A0000] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/25">Live transmissions</span>
          </div>
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Foundry</span>
          </div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold leading-[1.0] tracking-tighter text-white mb-4">The founders&apos; sky</h2>
          <p className="text-[17px] text-white/40 max-w-2xl leading-relaxed mb-8">Every name here is a star in the founding constellation — a bet on the future of knowledge, placed by those who chose to build something unprecedented.</p>

          {/* Giving Societies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              { name: "Chancellor's Circle", range: '£2M+', color: '#8A0000', desc: 'Seat on the Founders\' Council. Private audience with the Chancellor. Naming rights for major facilities.', icon: Crown },
              { name: "Founder's Society", range: '£200K–£2M', color: '#818cf8', desc: 'Named fellowship or scholarship. Closed-door strategic briefings. Priority access to all events.', icon: Star },
              { name: 'Guild Partners', range: '£25K–£200K', color: '#22d3ee', desc: 'Annual impact report. Invitation to the Guild Dinner. Name on the Founders\' Wall.', icon: Trophy },
            ].map((s, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/[0.06] p-6 hover:border-white/10 transition-colors">
                <s.icon size={20} style={{ color: s.color }} className="mb-3" />
                <h4 className="text-[15px] font-bold text-white mb-1">{s.name}</h4>
                <div className="text-[12px] font-bold mb-2" style={{ color: s.color }}>{s.range}</div>
                <p className="text-[12px] text-white/25 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Donor star field */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {DONORS.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 p-4 bg-white/[0.015] border border-white/[0.03] hover:bg-white/[0.03] transition-colors"
              >
                <div className="shrink-0 w-8 h-8 flex items-center justify-center text-white/80 text-[13px] font-bold" style={{ backgroundColor: TIER_COLORS[d.tier] + '25', color: TIER_COLORS[d.tier] }}>
                  {d.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-white/70 truncate">{d.name}</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 shrink-0" style={{ color: TIER_COLORS[d.tier], backgroundColor: TIER_COLORS[d.tier] + '15' }}>{d.tier}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[12px] font-bold text-white/30">{sym}{fmtShort(d.amount)}</span>
                    <span className="text-[10px] text-white/10">{d.date}</span>
                  </div>
                  {d.msg && <p className="text-[11px] text-white/15 mt-1 italic truncate">&ldquo;{d.msg}&rdquo;</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VIII. THE HORIZON — Post-Founding Vision
          ══════════════════════════════════════════ */}
      <section id="horizon" className="scroll-mt-[110px] py-20 lg:py-28 bg-[#050505]">
        <div ref={horizonAnim.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${horizonAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Horizon</span>
          </div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold leading-[1.0] tracking-tighter text-white mb-4">Beyond the founding</h2>
          <p className="text-[17px] text-white/40 max-w-2xl leading-relaxed mb-16">When the founding goal is reached, the campaign evolves. The constellation endures. The community deepens. The mission continues — not as an ending, but as a beginning.</p>

          {/* Three phases as expanding orbits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              { phase: 'Phase I', title: 'The Founding', period: '2025 — 2028', desc: 'Raise the capital. Build five nodes. Enrol the inaugural cohort. Establish the endowment. Create the digital estate. Everything from nothing. Your donation builds the physical and intellectual foundations of a university that will endure for centuries — and your name is inscribed in its first chapter.', icon: Rocket, color: '#8A0000' },
              { phase: 'Phase II', title: 'The Expansion', period: '2028 — 2033', desc: 'Scale to 12 nodes on 6 continents. Double the student body. Launch the next generation of research institutes. The giving community becomes permanent philanthropic infrastructure — an engine that accelerates rather than a campaign that ends. Named scholarships and research positions multiply as the endowment grows.', icon: Globe, color: '#22d3ee' },
              { phase: 'Phase III', title: 'The Perpetuity', period: '2033 — Beyond', desc: 'The endowment becomes self-sustaining. Artemis operates in perpetuity, independent of tuition dependency, free from financial pressures. The Founding Campaign becomes the Artemis Foundation — a permanent charitable trust stewarding the mission for generations. Your name, inscribed in the founding record, endures as long as knowledge itself matters.', icon: Landmark, color: '#818cf8' },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }} className="bg-white/[0.02] border border-white/[0.06] p-8 hover:border-white/10 transition-colors">
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4" style={{ color: p.color }}>{p.phase}</div>
                  <Icon size={28} style={{ color: p.color }} className="mb-4" />
                  <h4 className="text-[20px] font-bold text-white mb-1">{p.title}</h4>
                  <div className="text-[12px] text-white/20 mb-4">{p.period}</div>
                  <p className="text-[13px] text-white/35 leading-relaxed">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Future stats */}
          <div className="bg-white/[0.02] border border-white/[0.06] p-10">
            <div className="mb-8 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">By the Numbers</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { value: '12', label: 'Global Nodes', detail: 'Residential hubs across 6 continents' },
                { value: '2,400', label: 'Students', detail: 'Full capacity across the network' },
                { value: '25', label: 'Institutes', detail: 'Permanently endowed, independent' },
                { value: '£200M', label: 'Endowment', detail: 'Self-sustaining by Phase III' },
              ].map((s, i) => (
                <div key={i} className="relative pl-5">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-[#8A0000]/50"></div>
                  <div className="text-[28px] font-black text-white leading-none mb-2">{s.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">{s.label}</div>
                  <div className="text-[11px] text-white/20 leading-snug">{s.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Voices */}
          <div className="mt-20">
            <div className="relative flex items-center mb-16">
              <div className="flex-grow border-t border-white/[0.06]"></div>
              <span className="mx-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/15">Voices from the Future</span>
              <div className="flex-grow border-t border-white/[0.06]"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {[
                { quote: "I was the first in my village to attend university — and the first to attend one that didn't care about my village's wealth. Artemis saw my mind, not my postcode. The scholarship that brought me here was funded by someone I will never meet, but whose name I carry in my thesis dedication.", name: 'Amara Osei', role: 'Inaugural Cohort, Weavers Commons', loc: 'Accra → Geneva' },
                { quote: "I donated because I remember being seventeen and brilliant and broke. I remember the university that let me in anyway — and how that changed everything. Artemis is that chance, scaled to the planet. I couldn't not give.", name: 'Dr. Elena Vasquez', role: "Chancellor's Circle, Founding Donor", loc: 'Mexico City' },
              ].map((v, i) => (
                <div key={i}>
                  <svg className="w-8 h-8 text-[#8A0000] opacity-20 mb-6" viewBox="0 0 24 24" fill="currentColor"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/></svg>
                  <p className="text-[17px] md:text-[19px] text-white/60 leading-relaxed mb-8 font-light italic">{v.quote}</p>
                  <div className="text-[14px] font-bold text-white/70">{v.name}</div>
                  <div className="text-[12px] text-white/25">{v.role} — {v.loc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          IX. FINAL SIGNAL — CTA
          ══════════════════════════════════════════ */}
      <section className="bg-[#8A0000] py-20 px-8 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white" style={{ width: Math.random() * 2 + 0.5, height: Math.random() * 2 + 0.5, left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, opacity: Math.random() * 0.5 + 0.1, animation: `twinkle ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite` }} />
          ))}
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-[28px] md:text-[40px] font-extrabold leading-tight tracking-tighter text-white mb-3">
              The universe is waiting<br />for your light.
            </h2>
            <p className="text-[16px] text-white/60 leading-relaxed max-w-lg">Every great institution began with someone who chose to believe before there was proof. This is your moment to place a star in a constellation that will guide scholars for centuries.</p>
          </div>
          <button onClick={() => document.getElementById('offering')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center space-x-3 bg-white text-[#8A0000] px-10 py-4 text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors shrink-0 group">
            <span>Ignite Now</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
