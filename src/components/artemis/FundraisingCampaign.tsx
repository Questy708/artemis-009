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
  Sparkles, CircleDot, Gem, Orbit, Heart, ChevronRight,
  Briefcase, FileText, Gift, HandCoins, Building, LandmarkPlot, Phone
} from 'lucide-react';

interface Props {
  goToPage: (page: string) => void;
}

/* ─── Data ─── */
const CAMPAIGN = { goal: 80_000_000, raised: 28_400_000, donors: 1847, currency: 'GBP' };
const fmtNum = (n: number) => n.toLocaleString('en-GB');
const fmtShort = (n: number) => n >= 1_000_000 ? `${(n/1_000_000).toFixed(n%1_000_000===0?0:1)}M` : n >= 1_000 ? `${(n/1_000).toFixed(0)}K` : fmtNum(n);
const sym = '\u00a3';
const pct = Math.round((CAMPAIGN.raised / CAMPAIGN.goal) * 100);

const MILESTONES = [
  { title: 'Digital Foundation', target: 10_000_000, reached: true, desc: 'Core platform and global access layer deployed across 3 continents. The digital backbone of a borderless university — live and operational.', icon: Rocket, date: 'Completed Dec 2025', deliverables: ['Core platform live across 3 continents', 'Artemis Collegium Network (ACN) operational', 'Digital admissions and enrolment system deployed'] },
  { title: 'First Five Nodes', target: 25_000_000, reached: true, desc: 'Geneva, Valletta, San Francisco, Tokyo, Reykjavik — residential hubs operational with full faculty and student services.', icon: Globe, date: 'Completed Mar 2026', deliverables: ['Five residential hubs fully operational', 'Founding faculty of 35 scholars in residence', 'Cross-node synchronisation and travel programme launched'] },
  { title: 'Inaugural Cohort', target: 40_000_000, reached: false, desc: 'Full scholarship fund for 200 students with dedicated faculty, mentorship networks, and cross-node residency programmes.', icon: GraduationCap, date: 'Target 2027', deliverables: ['200 full scholarships funded', 'Mentorship network connecting students across all nodes', 'Cross-node residency programme for inaugural class'] },
  { title: 'Research Endowment', target: 60_000_000, reached: false, desc: 'Perpetual endowment for five flagship institutes with a 20-year runway — freeing researchers from the grant cycle permanently.', icon: FlaskConical, date: 'Target 2028', deliverables: ['Five flagship research institutes permanently endowed', '20-year operational runway secured for each', 'Centres of Inquiry fully staffed and publishing'] },
  { title: 'Global Scale', target: 80_000_000, reached: false, desc: '12 nodes across 6 continents — a planetary university with borderless access, self-sustaining and permanently independent.', icon: Landmark, date: 'Target 2030', deliverables: ['12 nodes operational across 6 continents', 'Self-sustaining endowment — no tuition dependency', '2,400 students and 25 permanently endowed institutes'] },
];

const CONSTELLATIONS = [
  { id: 'c1', title: 'The Cipher', desc: 'A cryptographic token permanently recording your contribution on the Artemis ledger. Your name, encrypted, becomes part of the university\'s foundation — visible forever on the public chain. Every donor at this level receives a unique hash that proves they were among the first to believe.', min: 25, icon: Hash, color: '#8A0000', magnitude: 1 },
  { id: 'c2', title: 'The Dispatch', desc: 'Quarterly intelligence brief from the Chancellor — exclusive essays, research previews, and strategic updates from inside the founding. Not a newsletter. A window into the build. Each dispatch includes unreleased data from our research nodes and early access to Artemis publications.', min: 100, icon: Mail, color: '#8A0000', magnitude: 2 },
  { id: 'c3', title: 'The Passage', desc: 'Priority invitation to visit any Artemis node worldwide during the founding year. Walk the spaces, meet the community, witness the construction of something unprecedented. Includes guided access to restricted research areas and private sessions with resident faculty.', min: 500, icon: Compass, color: '#8A0000', magnitude: 3 },
  { id: 'c4', title: 'The Codex', desc: 'A limited-edition leather-bound volume documenting the founding of Artemis — your name inscribed in the founding roll. Printed on archival paper. Meant to last centuries. Only 200 copies will ever be produced, each numbered and signed by the founding Chancellor.', min: 1000, icon: BookOpen, color: '#8A0000', magnitude: 4 },
  { id: 'c5', title: 'The Patron', desc: 'Fully fund a named micro-scholarship for one student. You choose the focus — AI ethics, marine biology, civic design. They carry your name through their Artemis journey. You receive annual impact reports from your scholar and are invited to their thesis defence.', min: 5000, icon: GraduationCap, color: '#8A0000', magnitude: 5 },
  { id: 'c6', title: 'The Dedication', desc: 'Name a research lab within a node. A permanent plaque, a dedication ceremony, annual reports from the researchers. Your name becomes synonymous with discovery. The lab operates under your chosen name for the lifetime of the institution.', min: 25000, icon: FlaskConical, color: '#8A0000', magnitude: 6 },
  { id: 'c7', title: 'The Commons', desc: 'Name one of the 12 Living Commons. Your name becomes part of daily life at Artemis — spoken by every resident, written on every map, etched into the identity of a community. Includes a dedication ceremony attended by the inaugural cohort and the Chancellor.', min: 100000, icon: Home, color: '#8A0000', magnitude: 7 },
  { id: 'c8', title: 'The Apex', desc: 'Become the patron of an entire Artemis node. The building bears your name. The community carries your legacy. A seat on the Founders\' Council. The highest honour in the founding of a university that will endure for centuries.', min: 1000000, icon: Building2, color: '#8A0000', magnitude: 8 },
];

const FOUNDING_OPPORTUNITIES = [
  { title: 'Micro-Scholarship for One Student', amount: 40000, desc: 'Fully fund a graduate student\'s tuition and living expenses for one year at any Artemis node. You choose the focus area — from synthetic intelligence to cosmological humanities. Your scholar carries your name and provides annual impact reports.', icon: GraduationCap, type: 'Scholarship' },
  { title: 'Undergraduate Scholarship (Four Years)', amount: 120000, desc: 'Support a student through their entire Artemis journey — from matriculation to commencement. A named four-year scholarship that transforms one person\'s life and creates a ripple effect across the global network.', icon: BookOpen, type: 'Scholarship' },
  { title: 'Artemis Dispatch Fellowship', amount: 200000, desc: 'Underwrite 20 fellows per year in the Dispatch programme — the university\'s signature public intellectual initiative. Fellows produce research, writing, and public engagement that reaches millions.', icon: Compass, type: 'Fellowship' },
  { title: 'Polaris Research Fellowship', amount: 1000000, desc: 'Endow a named Polaris Fellowship supporting a cohort of 20 early-career researchers annually. Fellows receive full funding, dedicated workspace at a node, and mentorship from senior Artemis faculty.', icon: Star, type: 'Fellowship' },
  { title: 'Endowed Chair for a Faculty Member', amount: 5000000, desc: 'Permanently endow a named faculty chair — securing world-class teaching and research at Artemis in perpetuity. The chair holder operates independently of the grant cycle, free to pursue the most ambitious and long-term research.', icon: Crown, type: 'Endowment' },
  { title: 'Institute for Entrepreneurship and Leadership', amount: 25000000, desc: 'Name the Institute for Entrepreneurship and Leadership — the engine of Artemis\'s innovation pipeline. A permanent centre connecting students, faculty, and industry partners across every node.', icon: Rocket, type: 'Naming' },
  { title: 'Centre of Inquiry', amount: 50000000, desc: 'Name one of the five flagship Centres of Inquiry — a permanently endowed, independently operating research centre. Each centre carries a 20-year runway and the freedom to pursue truth without institutional pressure.', icon: FlaskConical, type: 'Naming' },
  { title: 'Undergraduate College', amount: 100000000, desc: 'Name an entire undergraduate college within Artemis — a living-learning community of scholars, faculty, and staff. Your name becomes synonymous with an academic tradition that will endure for centuries.', icon: Building2, type: 'Naming' },
  { title: 'Academic and Residential Buildings', amount: 15000000, range: '\u00a315M \u2013 \u00a375M', desc: 'Name a landmark academic or residential building at any Artemis node. From lecture halls to libraries, from laboratories to living commons — these are the physical spaces where the future of knowledge takes shape.', icon: Landmark, type: 'Naming' },
];

const WAYS_TO_GIVE = [
  { title: 'Online', desc: 'Make a one-time or recurring gift by card, PayPal, or cryptocurrency directly on this page. Fast, secure, and immediate confirmation of your contribution.', icon: CreditCard },
  { title: 'Bank or Wire Transfer', desc: 'Transfer directly from your bank. Suitable for large contributions and international donors. See the donation form for our account details, or contact our advancement team for assistance with international transfers.', icon: Banknote },
  { title: 'Cryptocurrency', desc: 'Donate Bitcoin (BTC) or Ethereum (ETH) directly to Artemis. Crypto donations are recorded on the public chain, making your contribution a permanent part of the university\'s founding record. Contact crypto@artemis.edu with your transaction hash.', icon: Bitcoin },
  { title: 'Securities and Stock', desc: 'Donate appreciated stocks, bonds, or mutual funds to avoid capital gains tax while maximising your impact. Our advancement team will facilitate the transfer and provide all necessary documentation for your records.', icon: Briefcase },
  { title: 'Planned Giving', desc: 'Include Artemis in your estate plan through a will, trust, or beneficiary designation. Planned gifts create a permanent legacy and may provide significant tax benefits. We work with your advisors to structure a gift that aligns with your financial goals.', icon: FileText },
  { title: 'Employer Matching', desc: 'Many employers match charitable contributions pound-for-pound or dollar-for-dollar. Check with your HR department to see if your company participates — your gift to Artemis could be doubled at no additional cost to you.', icon: HandCoins },
  { title: 'Donor-Advised Funds', desc: 'Recommend a grant from your donor-advised fund (DAF) to the University of Artemis. DAF gifts are a tax-efficient way to support the founding while maintaining flexibility in your giving strategy.', icon: Gift },
  { title: 'In-Kind Contributions', desc: 'Donate equipment, technology, library materials, real estate, or professional services. In-kind gifts that support the academic mission are valued and recognised in the same way as financial contributions.', icon: Heart },
];

const FINANCIAL_GOALS = [
  { category: 'Student Access & Scholarships', amount: 25000000, pct: 31, desc: 'Full scholarships, travel grants, and living stipends ensuring that admission to Artemis is never determined by a student\'s ability to pay.' },
  { category: 'Research Endowment', amount: 20000000, pct: 25, desc: 'Perpetual endowment for five flagship Centres of Inquiry with 20-year operational runways — freeing researchers from the grant cycle.' },
  { category: 'Faculty & Academic Staff', amount: 15000000, pct: 19, desc: 'Recruitment and retention of world-class faculty, endowed chairs, and the academic staff that make the Artemis model possible.' },
  { category: 'Digital Infrastructure', amount: 10000000, pct: 13, desc: 'The ACN platform, global learning tools, synchronised teaching systems, and the data backbone connecting every node.' },
  { category: 'Physical Nodes & Facilities', amount: 10000000, pct: 12, desc: 'Acquisition, construction, and outfitting of residential hubs and shared spaces across the global network.' },
];

const EVENTS = [
  { title: 'The Founding Convocation', type: 'Gala', desc: 'An evening of vision and commitment. Meet the Chancellor and founding faculty at the Geneva node. Black tie. Historic.', date: '15 Sep 2026', weekday: 'Mon', location: 'Geneva', virtual: false, capacity: 200, registered: 87, price: 500, icon: Crown },
  { title: 'Inside the Build', type: 'Webinar', desc: 'Walk through the digital and physical architecture of Artemis with the design team. Live Q&A with founding engineers.', date: '22 Jul 2026', weekday: 'Wed', location: 'Online', virtual: true, capacity: 1000, registered: 432, price: 0, icon: Video },
  { title: 'Double Impact Day', type: 'Matching', desc: 'Every pound donated is matched by the Catalyst Foundation. Your \u00a31 becomes \u00a32. 24 hours only.', date: '1 Oct 2026', weekday: 'Thu', location: 'Global', virtual: true, capacity: null, registered: 0, price: null, icon: Zap },
  { title: 'The Artemis Auction', type: 'Auction', desc: 'Bid on naming rights, original artwork, and exclusive experiences. All proceeds fund the Global Scholars Fund.', date: '20 Nov 2026', weekday: 'Fri', location: 'London', virtual: false, capacity: 150, registered: 34, price: 250, icon: Star },
  { title: 'Hack the Future', type: 'Hackathon', desc: 'A founding-weekend hackathon where donors and students co-build tools for the Artemis platform.', date: '8 Aug 2026', weekday: 'Sat', location: 'San Francisco', virtual: false, capacity: 100, registered: 61, price: 0, icon: Flame },
  { title: 'Spring Benefactor Dinner', type: 'Dinner', desc: 'An intimate dinner for major donors at the Valletta node. Michelin-starred cuisine and the future of knowledge.', date: '14 Mar 2027', weekday: 'Sun', location: 'Valletta', virtual: false, capacity: 80, registered: 22, price: 1000, icon: Gem },
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

const TIER_COLORS: Record<string, string> = { chancellors: '#8A0000', founders: '#4338ca', guild: '#0e7490', community: '#15803d' };
const TIER_LABELS: Record<string, string> = { chancellors: "Chancellor's Circle", founders: "Founder's Society", guild: 'Guild Partners', community: 'Community' };
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

/* ─── Main Component ─── */
export default function FundraisingCampaign({ goToPage }: Props) {
  const activeSection = useActiveSection(['case', 'goals', 'ascent', 'constellations', 'opportunities', 'gatherings', 'ways', 'offering', 'foundry', 'horizon', 'contact']);
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

  const heroAnim = useInView(0);
  const quoteAnim = useInView(0);
  const caseAnim = useInView(0);
  const goalsAnim = useInView(0);
  const ascentAnim = useInView(0);
  const constellationsAnim = useInView(0);
  const opportunitiesAnim = useInView(0);
  const eventsAnim = useInView(0);
  const waysAnim = useInView(0);
  const offeringAnim = useInView(0);
  const foundryAnim = useInView(0);
  const horizonAnim = useInView(0);
  const contactAnim = useInView(0);

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
    <div className="flex flex-col bg-white">

      {/* ══════════════════════════════════════════
          I. HERO
          ══════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[60vh] min-h-[480px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1800"
              alt="Building the Future of Knowledge"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-8 lg:px-20 pb-16">
              <div ref={heroAnim.ref} className={`transition-all duration-700 ${heroAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="mb-8 flex items-center space-x-3">
                  <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Founding Campaign</span>
                </div>

                <h1 className="text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6">
                  Building the<br />
                  <span className="text-[#8A0000]">Future</span> of Knowledge
                </h1>
                <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light mb-10">
                  Higher education is at an inflection point. We can no longer wait for reform. So we are starting a movement to renew and transform education by building a university that directly tackles the seemingly intractable problems that brought us here.
                </p>

                {/* Campaign stats row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 mb-8">
                  <div>
                    <div className="text-[36px] md:text-[44px] font-black text-white leading-none">{sym}{fmtShort(CAMPAIGN.raised)}</div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 mt-1">raised of {sym}{fmtShort(CAMPAIGN.goal)} goal</div>
                  </div>
                  <div className="hidden sm:block w-px h-12 bg-white/20" />
                  <div>
                    <div className="text-[36px] md:text-[44px] font-black text-[#8A0000] leading-none">{pct}%</div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 mt-1">funded</div>
                  </div>
                  <div className="hidden sm:block w-px h-12 bg-white/20" />
                  <div>
                    <div className="text-[36px] md:text-[44px] font-black text-white leading-none">{fmtNum(CAMPAIGN.donors)}</div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 mt-1">founding donors</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="max-w-lg mb-8">
                  <div className="h-1.5 bg-white/10 w-full overflow-hidden">
                    <motion.div className="h-full bg-[#8A0000]" initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} transition={{ duration: 2.5, ease: 'easeOut' }} viewport={{ once: true }} />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => document.getElementById('offering')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center space-x-3 px-8 py-4 bg-[#8A0000] text-white text-[13px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors group">
                    <span>Give Now</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button onClick={() => document.getElementById('case')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center space-x-3 px-8 py-4 border border-white/30 text-white/70 text-[13px] font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-colors">
                    <span>Read the Case</span>
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={[
          { id: 'case', label: 'Case' },
          { id: 'goals', label: 'Goals' },
          { id: 'ascent', label: 'Ascent' },
          { id: 'constellations', label: 'Perks' },
          { id: 'opportunities', label: 'Naming' },
          { id: 'gatherings', label: 'Events' },
          { id: 'ways', label: 'Ways to Give' },
          { id: 'offering', label: 'Give' },
          { id: 'foundry', label: 'Foundry' },
          { id: 'horizon', label: 'Horizon' },
          { id: 'contact', label: 'Contact' },
        ]}
        activeSection={activeSection}
      />

      {/* ══════════════════════════════════════════
          II. INSPIRATIONAL QUOTE
          ══════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div ref={quoteAnim.ref} className={`max-w-[900px] mx-auto w-full px-8 lg:px-20 text-center transition-all duration-700 ${quoteAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <svg className="w-10 h-10 text-[#8A0000] opacity-30 mx-auto mb-8" viewBox="0 0 24 24" fill="currentColor"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/></svg>
          <blockquote className="text-[22px] md:text-[28px] font-light text-[#141414] leading-relaxed mb-8 italic">
            The function of the university is not simply to teach bread-winning, or to furnish teachers for the public schools, or to be a centre of polite society; it is, above all, to be the organ of that fine adjustment between real life and the growing knowledge of life, an adjustment which forms the secret of civilisation.
          </blockquote>
          <div className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">W.E.B. Du Bois</div>
          <div className="text-[11px] text-gray-500 mt-1">The Talented Tenth (1903)</div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          III. THE CASE — Why Artemis, Why Now
          ══════════════════════════════════════════ */}
      <section id="case" className="scroll-mt-[110px] py-20 lg:py-28">
        <div ref={caseAnim.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${caseAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Case for Support</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-[36px] md:text-[48px] font-extrabold leading-[1.0] tracking-tighter text-[#141414] mb-10">
                Why Artemis?<br />Why now?
              </h2>
              <div className="space-y-5 text-[16px] text-gray-600 leading-relaxed">
                <p>The traditional university model is at an inflection point. Decades of bureaucratic growth, physical limitations, and closed systems have severely constrained the potential of the modern scholar. Artemis was founded to transcend these limitations &mdash; not by merely digitizing existing structures, but by reimagining the very nature of an academic community from the ground up.</p>
                <p>We are building a <em className="text-gray-800">universitas</em> optimized for our era: borderless, data-driven, and intrinsically collaborative. Our core operating philosophy is one of <strong className="text-gray-900">Foundational Efficiency</strong> &mdash; true innovation thrives when resources are concentrated on the intellectual work, not on massive administrative overhead. Every pound donated goes directly toward faculty excellence, student access, and research breakthroughs.</p>
                <p>The Founding Campaign provides the strategic capital to construct our fundamental digital estate, endow our first residential colleges, and launch interdisciplinary research hubs that operate at the speed of modern discovery instead of the pace of administrative committees. By leveraging decentralized technologies, we reduce operational drag by nearly 60% compared to traditional institutions, directing 90% of all capital toward academic and research programmes.</p>
              </div>
              <button onClick={() => document.getElementById('offering')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center space-x-4 py-2 mt-8 border-b-2 border-[#8A0000] text-[#8A0000] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-[#141414] hover:border-[#141414] transition-all group">
                <span>Support the Campaign</span>
                <svg className="group-hover:translate-x-2 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-0">
                {[
                  { value: '60%', label: 'Less Overhead', desc: 'No redundant campuses, no bloated administration' },
                  { value: '90%', label: 'To Programmes', desc: 'Capital directed to academic and research work' },
                  { value: '3', label: 'Continents', desc: 'Borderless scaling via our core digital stack' },
                ].map((item, i) => (
                  <div key={i} className="relative pl-6 border-l-2 border-[#8A0000] py-6">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[36px] font-black text-[#8A0000] leading-none">{item.value}</span>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">{item.label}</span>
                    </div>
                    <p className="text-[13px] text-gray-500 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 border border-gray-100 p-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-3 block">Strategic Initiative</span>
                <h4 className="text-[18px] font-bold text-[#141414] mb-3">Endowment for Autonomous Research</h4>
                <p className="text-[14px] text-gray-600 leading-relaxed">A permanent endowment supporting interdisciplinary research hubs that operate independently of state or commercial agendas &mdash; each with a 20-year operational runway that frees researchers from the grant cycle.</p>
              </div>

              <div className="bg-gray-50 border border-gray-100 p-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-3 block">Strategic Initiative</span>
                <h4 className="text-[18px] font-bold text-[#141414] mb-3">The Global Scholars Fund</h4>
                <p className="text-[14px] text-gray-600 leading-relaxed">Full-ride virtual residencies and travel grants for scholars from underserved digital nodes &mdash; ensuring our community represents the true intellectual capital of the world, not merely the economic capital.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          IV. FINANCIAL GOALS — Where the Money Goes
          ══════════════════════════════════════════ */}
      <section id="goals" className="scroll-mt-[110px] bg-gray-50 py-20 lg:py-28">
        <div ref={goalsAnim.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${goalsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Financial Goals</span>
          </div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold leading-[1.0] tracking-tighter text-[#141414] mb-4">Where your gift goes</h2>
          <p className="text-[16px] text-gray-600 max-w-2xl leading-relaxed mb-16">Every pound donated is a strategic investment in the future of knowledge. Here is how the {sym}{fmtShort(CAMPAIGN.goal)} founding goal is allocated across the five pillars of the Artemis mission.</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Visual bar chart */}
            <div className="space-y-4">
              {FINANCIAL_GOALS.map((g, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-[14px] font-bold text-[#141414]">{g.category}</span>
                    <span className="text-[13px] font-black text-[#8A0000]">{sym}{fmtShort(g.amount)}</span>
                  </div>
                  <div className="h-3 bg-gray-200 w-full overflow-hidden">
                    <motion.div className="h-full bg-[#8A0000]" initial={{ width: 0 }} whileInView={{ width: `${g.pct}%` }} transition={{ duration: 1.2, delay: i * 0.1, ease: 'easeOut' }} viewport={{ once: true }} />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] text-gray-500">{g.desc}</span>
                    <span className="text-[11px] font-bold text-gray-400">{g.pct}%</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary card */}
            <div className="bg-white border border-gray-200 p-8 lg:p-10">
              <div className="mb-6 flex items-center space-x-3">
                <span className="w-6 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A0000]">Campaign Summary</span>
              </div>
              <div className="space-y-5">
                <div className="flex items-baseline justify-between py-4 border-b border-gray-100">
                  <span className="text-[14px] font-bold text-[#141414]">Campaign Goal</span>
                  <span className="text-[24px] font-black text-[#141414]">{sym}{fmtShort(CAMPAIGN.goal)}</span>
                </div>
                <div className="flex items-baseline justify-between py-4 border-b border-gray-100">
                  <span className="text-[14px] font-bold text-[#141414]">Raised to Date</span>
                  <span className="text-[24px] font-black text-[#8A0000]">{sym}{fmtShort(CAMPAIGN.raised)}</span>
                </div>
                <div className="flex items-baseline justify-between py-4 border-b border-gray-100">
                  <span className="text-[14px] font-bold text-[#141414]">Remaining</span>
                  <span className="text-[24px] font-black text-[#141414]">{sym}{fmtShort(CAMPAIGN.goal - CAMPAIGN.raised)}</span>
                </div>
                <div className="flex items-baseline justify-between py-4">
                  <span className="text-[14px] font-bold text-[#141414]">Founding Donors</span>
                  <span className="text-[24px] font-black text-[#141414]">{fmtNum(CAMPAIGN.donors)}</span>
                </div>
              </div>
              <p className="text-[13px] text-gray-500 mt-6 leading-relaxed">90% of all contributions go directly to academic programmes, student access, and research. Artemis operates with a fraction of the overhead of traditional institutions.</p>
              <button onClick={() => document.getElementById('offering')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center space-x-3 mt-6 px-8 py-3 bg-[#8A0000] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors group w-full justify-center">
                <span>Contribute Now</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          V. THE ASCENT — Milestones with Deliverables
          ══════════════════════════════════════════ */}
      <section id="ascent" className="scroll-mt-[110px] py-20 lg:py-28">
        <div ref={ascentAnim.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${ascentAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Three Phases to Launch</span>
          </div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold leading-[1.0] tracking-tighter text-[#141414] mb-4">With your support, we build in three phases</h2>
          <p className="text-[16px] text-gray-600 max-w-2xl leading-relaxed mb-16">Each phase has concrete deliverables. Not aspirations &mdash; commitments. Track our progress as we climb from foundation to global scale.</p>

          {/* Horizontal stepped progress bar */}
          <div className="relative mb-20 max-w-4xl mx-auto">
            <div className="absolute top-5 left-0 right-0 h-[2px] bg-gray-200" />
            <div className="absolute top-5 left-0 h-[2px] bg-[#8A0000] transition-all duration-1000" style={{ width: `${Math.min(pct, 100) * 0.8}%` }} />
            <div className="flex justify-between relative">
              {MILESTONES.map((ms, i) => {
                const Icon = ms.icon;
                return (
                  <div key={i} className="flex flex-col items-center" style={{ width: `${100 / MILESTONES.length}%` }}>
                    <div className={`w-10 h-10 flex items-center justify-center border-2 relative z-10 ${ms.reached ? 'bg-[#8A0000] border-[#8A0000]' : 'bg-white border-gray-300'}`}>
                      <Icon size={16} className={ms.reached ? 'text-white' : 'text-gray-400'} />
                    </div>
                    <div className={`text-[10px] font-bold uppercase tracking-widest mt-3 ${ms.reached ? 'text-[#8A0000]' : 'text-gray-400'}`}>{sym}{fmtShort(ms.target)}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Milestone detail cards with deliverables */}
          <div className="space-y-0">
            {MILESTONES.map((ms, i) => {
              const Icon = ms.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start py-10 border-b border-gray-200 last:border-0"
                >
                  <div className="lg:col-span-1 flex items-center gap-3 lg:flex-col lg:items-start">
                    <div className={`w-10 h-10 flex items-center justify-center ${ms.reached ? 'bg-[#8A0000]' : 'bg-gray-200'}`}>
                      <Icon size={16} className={ms.reached ? 'text-white' : 'text-gray-500'} />
                    </div>
                  </div>
                  <div className="lg:col-span-3">
                    <div className="flex items-baseline gap-3 mb-1">
                      <h4 className="text-[20px] font-bold text-[#141414]">{ms.title}</h4>
                      {ms.reached && <Check size={16} className="text-[#8A0000] shrink-0" />}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] font-bold text-[#8A0000]">{sym}{fmtShort(ms.target)}</span>
                      <span className="text-[12px] text-gray-400">{ms.date}</span>
                    </div>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="text-[15px] text-gray-600 leading-relaxed mb-4">{ms.desc}</p>
                    {/* Deliverables checklist */}
                    <ul className="space-y-2">
                      {ms.deliverables.map((d, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <Check size={12} className={`mt-1 shrink-0 ${ms.reached ? 'text-[#8A0000]' : 'text-gray-300'}`} />
                          <span className="text-[13px] text-gray-600">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:col-span-3">
                    <div className="h-1.5 bg-gray-200 w-full overflow-hidden">
                      <div className={`h-full ${ms.reached ? 'bg-[#8A0000]' : 'bg-gray-300'}`} style={{ width: ms.reached ? '100%' : `${Math.max(0, Math.min(100, ((CAMPAIGN.raised - ms.target + 15_000_000) / 15_000_000) * 100))}%` }} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2 block">{ms.reached ? 'Complete' : 'In progress'}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VI. THE CONSTELLATIONS — Giving Tiers / Perks
          ══════════════════════════════════════════ */}
      <section id="constellations" className="scroll-mt-[110px] bg-gray-50 py-20 lg:py-28">
        <div ref={constellationsAnim.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${constellationsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Constellations</span>
          </div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold leading-[1.0] tracking-tighter text-[#141414] mb-4">Place your star</h2>
          <p className="text-[16px] text-gray-600 max-w-2xl leading-relaxed mb-16">Every contribution earns a place in the founding constellation and unlocks exclusive perks. From a single cipher-star to an apex constellation that bears your name &mdash; the brighter you give, the more indelible your mark.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {CONSTELLATIONS.slice(0, 4).map((c, i) => {
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
                  className={`text-left p-6 border-2 transition-all group ${isSelected ? 'border-[#8A0000] bg-[#8A0000]/5' : 'border-gray-200 bg-white hover:border-[#8A0000]/50 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 flex items-center justify-center bg-[#8A0000]/10">
                      <Icon size={16} className="text-[#8A0000]" />
                    </div>
                    {isSelected && <Check size={16} className="text-[#8A0000]" />}
                  </div>
                  <h4 className="text-[16px] font-bold text-[#141414] mb-2">{c.title}</h4>
                  <p className="text-[13px] text-gray-500 leading-relaxed mb-4 line-clamp-2">{c.desc}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">From</span>
                    <span className="text-[20px] font-black text-[#141414]">{sym}{fmtShort(c.min)}</span>
                  </div>
                  <div className="flex gap-1 mt-3">
                    {Array.from({ length: 8 }).map((_, j) => (
                      <div key={j} className={`w-1.5 h-1.5 rounded-full ${j < c.magnitude ? 'bg-[#8A0000]' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                </motion.button>
              );
            })}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONSTELLATIONS.slice(4).map((c, i) => {
              const Icon = c.icon;
              const isSelected = selectedPerk === c.id;
              return (
                <motion.button
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i + 4) * 0.06, duration: 0.4 }}
                  viewport={{ once: true }}
                  onClick={() => { setSelectedPerk(isSelected ? null : c.id); if (!isSelected) { setSelectedAmount(c.min); setCustomAmount(''); } }}
                  className={`text-left p-6 border-2 transition-all group ${isSelected ? 'border-[#8A0000] bg-[#8A0000]/5' : 'border-gray-200 bg-white hover:border-[#8A0000]/50 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 flex items-center justify-center bg-[#8A0000]/10">
                      <Icon size={16} className="text-[#8A0000]" />
                    </div>
                    {isSelected && <Check size={16} className="text-[#8A0000]" />}
                  </div>
                  <h4 className="text-[16px] font-bold text-[#141414] mb-2">{c.title}</h4>
                  <p className="text-[13px] text-gray-500 leading-relaxed mb-4 line-clamp-2">{c.desc}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">From</span>
                    <span className="text-[20px] font-black text-[#141414]">{sym}{fmtShort(c.min)}</span>
                  </div>
                  <div className="flex gap-1 mt-3">
                    {Array.from({ length: 8 }).map((_, j) => (
                      <div key={j} className={`w-1.5 h-1.5 rounded-full ${j < c.magnitude ? 'bg-[#8A0000]' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {selectedPerk && (() => {
              const c = CONSTELLATIONS.find(x => x.id === selectedPerk);
              if (!c) return null;
              const Icon = c.icon;
              return (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-6 bg-white border-2 border-[#8A0000]/30 p-8 lg:p-10 overflow-hidden">
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4"><Icon size={22} className="text-[#8A0000]" /><span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Magnitude {c.magnitude}</span></div>
                      <h3 className="text-[28px] font-extrabold text-[#141414] mb-3">{c.title}</h3>
                      <p className="text-[15px] text-gray-600 leading-relaxed">{c.desc}</p>
                    </div>
                    <div className="lg:text-right shrink-0">
                      <div className="text-[12px] font-bold uppercase tracking-widest text-[#8A0000] mb-2">Minimum contribution</div>
                      <div className="text-[48px] font-black text-[#141414] leading-none">{sym}{fmtShort(c.min)}</div>
                      <button onClick={() => document.getElementById('offering')?.scrollIntoView({ behavior: 'smooth' })} className="mt-5 flex items-center space-x-3 px-8 py-3 bg-[#8A0000] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors group mx-auto lg:ml-auto">
                        <span>Claim This Tier</span><ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
          VII. FOUNDING OPPORTUNITIES — Naming Rights
          ══════════════════════════════════════════ */}
      <section id="opportunities" className="scroll-mt-[110px] py-20 lg:py-28">
        <div ref={opportunitiesAnim.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${opportunitiesAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Founding Opportunities</span>
          </div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold leading-[1.0] tracking-tighter text-[#141414] mb-4">Legacy-building naming opportunities</h2>
          <p className="text-[16px] text-gray-600 max-w-2xl leading-relaxed mb-6">We are building the first borderless, network-native university in history. We are looking for donors and partners who share our vision and are excited about this legacy-building opportunity. Below are the founding opportunities to launch Artemis.</p>
          <p className="text-[14px] text-gray-500 mb-16">Contact our advancement team at <a href="mailto:donate@artemis.edu" className="text-[#8A0000] font-bold hover:underline">donate@artemis.edu</a> to learn how you can become an Artemis Founder.</p>

          <div className="space-y-0">
            {FOUNDING_OPPORTUNITIES.map((opp, i) => {
              const Icon = opp.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start py-8 border-b border-gray-200 last:border-0 group"
                >
                  <div className="lg:col-span-1">
                    <div className="w-10 h-10 flex items-center justify-center bg-[#8A0000]/10">
                      <Icon size={16} className="text-[#8A0000]" />
                    </div>
                  </div>
                  <div className="lg:col-span-5">
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 bg-[#8A0000]/10 text-[#8A0000] mb-2 inline-block">{opp.type}</span>
                    <h4 className="text-[18px] font-bold text-[#141414] group-hover:text-[#8A0000] transition-colors">{opp.title}</h4>
                  </div>
                  <div className="lg:col-span-4">
                    <p className="text-[14px] text-gray-600 leading-relaxed">{opp.desc}</p>
                  </div>
                  <div className="lg:col-span-2 lg:text-right">
                    <div className="text-[22px] font-black text-[#8A0000] leading-none">{opp.range || `${sym}${fmtShort(opp.amount)}`}</div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1 block">{opp.type === 'Naming' ? 'Naming opportunity' : opp.type === 'Endowment' ? 'Per named chair' : 'Naming opportunity'}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 bg-gray-50 border border-gray-100 p-8 text-center">
            <p className="text-[15px] text-gray-600 mb-4">These are just a few of the founding opportunities available. Every gift at every level makes a difference.</p>
            <a href="mailto:donate@artemis.edu" className="inline-flex items-center space-x-3 px-8 py-3 bg-[#8A0000] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors group">
              <span>Contact Our Advancement Team</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VIII. THE GATHERINGS — Events
          ══════════════════════════════════════════ */}
      <section id="gatherings" className="scroll-mt-[110px] bg-gray-50 py-20 lg:py-28">
        <div ref={eventsAnim.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${eventsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Gatherings</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <div className="mb-6 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Calendar</span>
              </div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">Convene the founders</h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">The founding is a movement, not just a financial campaign. These gatherings &mdash; from galas to hackathons to matching days &mdash; are where the community becomes real.</p>
              <button onClick={() => goToPage('contact-us')} className="flex items-center space-x-4 py-2 border-b-2 border-[#8A0000] text-[#8A0000] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-[#141414] hover:border-[#141414] transition-all group">
                <span>Contact for Events</span>
                <svg className="group-hover:translate-x-2 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>

            <div className="lg:col-span-8 space-y-0">
              {EVENTS.map((ev, i) => {
                const Icon = ev.icon;
                const dateParts = ev.date.split(' ');
                return (
                  <motion.div key={i} initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} viewport={{ once: true }} className="group flex items-start gap-6 py-5 border-b border-gray-200 hover:border-[#8A0000] transition-colors">
                    <div className="shrink-0 w-[60px] text-center pt-1">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-1">{ev.weekday}</div>
                      <div className="text-[22px] font-black text-[#141414] leading-none tabular-nums">{dateParts[0]}</div>
                      <div className="text-[11px] font-bold text-gray-400 uppercase">{dateParts[1]}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">{ev.type}</span>
                        {ev.type === 'Matching' && <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 bg-[#8A0000] text-white">2x</span>}
                        {ev.virtual && <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 bg-gray-200 text-gray-600">Virtual</span>}
                      </div>
                      <h4 className="text-[16px] font-bold text-[#141414] group-hover:text-[#8A0000] transition-colors leading-tight mb-1">{ev.title}</h4>
                      <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">{ev.desc}</p>
                      <div className="flex items-center gap-4 mt-2 text-[12px] text-gray-400">
                        <span className="flex items-center gap-1"><MapPin size={10} />{ev.location}</span>
                        {ev.price !== null && ev.price > 0 && <span>{sym}{ev.price}</span>}
                        {ev.price === 0 && <span className="text-[#8A0000] font-bold">Free</span>}
                      </div>
                      {ev.capacity && (
                        <div className="mt-2">
                          <div className="h-1 bg-gray-200 w-32"><div className="h-full bg-[#8A0000]/60 transition-all" style={{ width: `${(ev.registered / ev.capacity) * 100}%` }} /></div>
                          <span className="text-[10px] text-gray-400 mt-1 block">{ev.registered}/{ev.capacity} registered</span>
                        </div>
                      )}
                    </div>
                    <svg className="shrink-0 w-4 h-4 text-gray-300 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all mt-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          IX. WAYS TO GIVE
          ══════════════════════════════════════════ */}
      <section id="ways" className="scroll-mt-[110px] py-20 lg:py-28">
        <div ref={waysAnim.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${waysAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Ways to Give</span>
          </div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold leading-[1.0] tracking-tighter text-[#141414] mb-4">How to contribute</h2>
          <p className="text-[16px] text-gray-600 max-w-2xl leading-relaxed mb-16">There are many ways to support the founding of Artemis. Whether you give online, through your employer, or as part of your estate plan &mdash; every contribution matters. Explore the options below to find the method that works best for you.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WAYS_TO_GIVE.map((w, i) => {
              const Icon = w.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-white border border-gray-200 p-6 hover:border-[#8A0000]/30 transition-colors group"
                >
                  <div className="w-9 h-9 flex items-center justify-center bg-[#8A0000]/10 mb-4">
                    <Icon size={16} className="text-[#8A0000]" />
                  </div>
                  <h4 className="text-[15px] font-bold text-[#141414] mb-2 group-hover:text-[#8A0000] transition-colors">{w.title}</h4>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{w.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 bg-gray-50 border border-gray-100 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-[#8A0000]" />
              <span className="text-[14px] text-gray-600">Questions about giving? Our advancement team is here to help.</span>
            </div>
            <a href="mailto:donate@artemis.edu" className="flex items-center space-x-3 px-6 py-2.5 border-2 border-[#8A0000] text-[#8A0000] text-[11px] font-bold uppercase tracking-widest hover:bg-[#8A0000] hover:text-white transition-colors group shrink-0">
              <span>donate@artemis.edu</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          X. THE OFFERING — Donate Form
          ══════════════════════════════════════════ */}
      <section id="offering" className="scroll-mt-[110px] bg-gray-50 py-20 lg:py-28">
        <div ref={offeringAnim.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${offeringAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Give Online</span>
          </div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold leading-[1.0] tracking-tighter text-[#141414] mb-4">Make your contribution</h2>
          <p className="text-[16px] text-gray-600 max-w-2xl leading-relaxed mb-16">Choose your amount, select your payment method, and join the founding. For major gifts and naming opportunities, contact our advancement team at <a href="mailto:donate@artemis.edu" className="text-[#8A0000] font-bold hover:underline">donate@artemis.edu</a>.</p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {/* Amount Selection */}
              <div className="bg-[#F9F8F6] border border-gray-100 p-8">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 mb-4">Select your amount</h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                  {PRESETS.map(amt => (
                    <button key={amt} onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }} className={`py-3 text-[13px] font-bold border-2 transition-all ${selectedAmount === amt ? 'bg-[#8A0000] text-white border-[#8A0000]' : 'bg-white text-gray-700 border-gray-200 hover:border-[#8A0000] hover:text-[#8A0000]'}`}>
                      {sym}{fmtShort(amt)}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px] font-bold text-gray-300">{sym}</span>
                  <input type="number" value={customAmount} onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }} placeholder="Custom amount" className="w-full pl-8 pr-4 py-3 bg-white border-2 border-gray-200 focus:border-[#8A0000] focus:outline-none text-[16px] font-bold text-[#141414] placeholder:text-gray-300" />
                </div>
                {effectiveAmount > 0 && (
                  <div className="mt-4 p-4 bg-white border border-gray-100">
                    <div className="flex items-center gap-2">
                      <Heart size={14} className="text-[#8A0000]" />
                      <span className="text-[13px] text-gray-600">
                        {effectiveAmount >= 1000000 && 'Patron of an entire Artemis node. The building bears your name.'}
                        {effectiveAmount >= 100000 && effectiveAmount < 1000000 && 'Names a Living Commons. Your name becomes part of daily life at Artemis.'}
                        {effectiveAmount >= 25000 && effectiveAmount < 100000 && 'Names a research lab in perpetuity. A permanent dedication.'}
                        {effectiveAmount >= 5000 && effectiveAmount < 25000 && 'Funds a named micro-scholarship for one student.'}
                        {effectiveAmount >= 500 && effectiveAmount < 5000 && 'Sponsors a student\'s travel to an Artemis node.'}
                        {effectiveAmount >= 100 && effectiveAmount < 500 && 'Funds one week of digital infrastructure.'}
                        {effectiveAmount > 0 && effectiveAmount < 100 && 'Every star counts in the founding constellation.'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Recurring toggle */}
              <div className="bg-[#F9F8F6] border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Repeat size={16} className="text-[#8A0000]" />
                    <span className="text-[14px] font-bold text-[#141414]">Make it recurring</span>
                    <span className="text-[12px] text-gray-400">&mdash; multiply your impact</span>
                  </div>
                  <button onClick={() => setIsRecurring(!isRecurring)} className={`w-11 h-5 rounded-full transition-colors relative ${isRecurring ? 'bg-[#8A0000]' : 'bg-gray-300'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${isRecurring ? 'left-[24px]' : 'left-0.5'}`} />
                  </button>
                </div>
                {isRecurring && (
                  <div className="flex gap-2 mt-4">
                    {['monthly', 'quarterly', 'annual'].map(f => (
                      <button key={f} onClick={() => setRecurringFreq(f)} className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest border-2 transition-all ${recurringFreq === f ? 'bg-[#8A0000] text-white border-[#8A0000]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#8A0000]'}`}>{f}</button>
                    ))}
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 mb-4">Payment method</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { key: 'card' as const, icon: CreditCard, label: 'Card' },
                    { key: 'bank' as const, icon: Banknote, label: 'Bank Transfer' },
                    { key: 'crypto' as const, icon: Bitcoin, label: 'Crypto' },
                    { key: 'paypal' as const, icon: Wallet, label: 'PayPal' },
                  ].map(m => (
                    <button key={m.key} onClick={() => setPaymentMethod(m.key)} className={`flex items-center gap-3 p-4 border-2 transition-all ${paymentMethod === m.key ? 'bg-[#8A0000]/5 border-[#8A0000] text-[#8A0000]' : 'bg-white border-gray-200 text-gray-500 hover:border-[#8A0000]/50'}`}>
                      <m.icon size={16} />
                      <span className="text-[11px] font-bold uppercase tracking-widest">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {paymentMethod === 'crypto' && (
                <div className="bg-[#F9F8F6] border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-4"><Bitcoin size={18} className="text-[#8A0000]" /><span className="text-[14px] font-bold text-[#141414]">Cryptocurrency</span></div>
                  <div className="flex gap-2 mb-4">
                    {(['BTC', 'ETH'] as const).map(coin => (
                      <button key={coin} onClick={() => setCryptoCoin(coin)} className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest border-2 transition-all ${cryptoCoin === coin ? 'bg-[#8A0000] text-white border-[#8A0000]' : 'bg-white text-gray-500 border-gray-200'}`}>{coin}</button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-[12px] text-gray-600 bg-white px-3 py-2 flex-1 break-all font-mono border border-gray-100">{CRYPTO[cryptoCoin]}</code>
                    <button onClick={() => navigator.clipboard?.writeText(CRYPTO[cryptoCoin])} className="px-3 py-2 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">Copy</button>
                  </div>
                  <p className="text-[12px] text-gray-400 mt-3">After sending, email crypto@artemis.edu with your transaction hash to receive your constellation perk.</p>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="bg-[#F9F8F6] border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-4"><Banknote size={18} className="text-[#8A0000]" /><span className="text-[14px] font-bold text-[#141414]">Bank Transfer</span></div>
                  <div className="space-y-0">
                    {[['Account', 'Artemis University Founding Fund'],['Sort Code', '20-45-78'],['Account No', '73128945'],['IBAN', 'GB29 BARC 2045 7873 1289 45'],['Reference', 'ARTEMIS-FOUNDING']].map(([label, value], i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                        <span className="text-[12px] text-gray-500">{label}</span>
                        <div className="flex items-center gap-2">
                          <code className="text-[12px] font-bold text-[#141414] font-mono">{value}</code>
                          <button onClick={() => navigator.clipboard?.writeText(value)} className="text-[9px] text-[#8A0000] font-bold uppercase tracking-widest hover:underline">Copy</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Donor info */}
              <div className="bg-[#F9F8F6] border border-gray-100 p-8 space-y-4">
                <div className="mb-6 flex items-center space-x-3"><span className="w-6 h-[1px] bg-[#8A0000]"></span><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A0000]">Your Details</span></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-[0.15em] mb-2">Name</label>
                    <input type="text" value={donorName} onChange={(e) => setDonorName(e.target.value)} disabled={isAnonymous} placeholder={isAnonymous ? 'Anonymous' : 'Your name'} className={`w-full border border-gray-300 bg-white px-4 py-3 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/30 focus:border-[#8A0000] transition-all ${isAnonymous ? 'opacity-40' : ''}`} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-[0.15em] mb-2">Email *</label>
                    <input type="email" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} placeholder="you@email.com" className="w-full border border-gray-300 bg-white px-4 py-3 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/30 focus:border-[#8A0000] transition-all" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsAnonymous(!isAnonymous)} className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${isAnonymous ? 'bg-[#8A0000] border-[#8A0000]' : 'bg-white border-gray-300'}`}>
                    {isAnonymous && <Check size={12} className="text-white" />}
                  </button>
                  <span className="text-[13px] text-gray-600">Give anonymously</span>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-[0.15em] mb-2">Message (optional)</label>
                  <textarea value={donorMessage} onChange={(e) => setDonorMessage(e.target.value)} placeholder="Why you're supporting Artemis..." rows={3} className="w-full border border-gray-300 bg-white px-4 py-3 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/30 focus:border-[#8A0000] transition-all resize-none" />
                </div>
              </div>
            </div>

            {/* Right — Summary */}
            <div className="lg:col-span-4">
              <div className="sticky top-[180px] bg-white border-2 border-gray-200 p-8 shadow-sm">
                <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#8A0000] mb-6">Your Contribution</h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#8A0000]/10"><Heart size={20} className="text-[#8A0000]" /></div>
                  <div>
                    <div className="text-[32px] font-black text-[#141414] leading-none">{sym}{fmtShort(effectiveAmount || 0)}</div>
                    {isRecurring && <div className="text-[12px] text-[#8A0000] font-bold mt-1">{recurringFreq} &middot; {sym}{fmtShort(effectiveAmount * (recurringFreq === 'monthly' ? 12 : recurringFreq === 'quarterly' ? 4 : 1))}/yr</div>}
                  </div>
                </div>
                {selectedPerk && (() => { const c = CONSTELLATIONS.find(x => x.id === selectedPerk); if (!c) return null; const Icon = c.icon; return (<div className="mb-6 p-4 bg-[#8A0000]/5 border border-[#8A0000]/20"><span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">Your Constellation</span><div className="flex items-center gap-2 mt-1"><Icon size={14} className="text-[#8A0000]" /><span className="text-[14px] font-bold text-[#141414]">{c.title}</span></div></div>); })()}
                {effectiveAmount > 0 && (
                  <div className="mb-6 p-4 bg-gray-50 border border-gray-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-2 block">Your Impact</span>
                    <p className="text-[12px] text-gray-600 leading-relaxed">
                      {effectiveAmount >= 1000000 && 'Patron of an entire node. A seat on the Founders\' Council.'}
                      {effectiveAmount >= 100000 && effectiveAmount < 1000000 && 'Names a Living Commons. Your name spoken daily by every resident.'}
                      {effectiveAmount >= 25000 && effectiveAmount < 100000 && 'Names a research lab in perpetuity.'}
                      {effectiveAmount >= 5000 && effectiveAmount < 25000 && 'Funds a named micro-scholarship for one student.'}
                      {effectiveAmount >= 500 && effectiveAmount < 5000 && 'Sponsors a student\'s travel to a node.'}
                      {effectiveAmount >= 100 && effectiveAmount < 500 && 'Funds one week of digital infrastructure.'}
                      {effectiveAmount > 0 && effectiveAmount < 100 && 'Every star counts in the constellation.'}
                    </p>
                  </div>
                )}
                <button onClick={handleDonate} disabled={submitting || !donorEmail || effectiveAmount <= 0} className={`w-full py-4 text-[12px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${submitting || !donorEmail || effectiveAmount <= 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#8A0000] text-white hover:bg-[#6B0000]'}`}>
                  {submitting ? 'Processing...' : 'Complete Donation'} {!submitting && <ArrowRight size={14} />}
                </button>
                <div className="flex items-center gap-2 mt-3 justify-center"><Lock size={10} className="text-gray-300" /><span className="text-[10px] text-gray-400">256-bit SSL encrypted</span></div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {donationResult && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-8 p-8 border-2 ${donationResult.success ? 'bg-emerald-50 border-emerald-300' : 'bg-red-50 border-red-300'}`}>
                <span className={`text-[16px] font-bold block mb-2 ${donationResult.success ? 'text-emerald-700' : 'text-red-700'}`}>{donationResult.success ? 'Thank you for your generosity.' : 'Donation failed.'}</span>
                <p className={`text-[14px] ${donationResult.success ? 'text-emerald-600' : 'text-red-600'}`}>{donationResult.message}</p>
                {donationResult.success && <button onClick={() => { setDonationResult(null); setSelectedAmount(null); setCustomAmount(''); setDonorName(''); setDonorEmail(''); setDonorMessage(''); setSelectedPerk(null); }} className="mt-4 text-[11px] font-bold uppercase tracking-widest text-[#8A0000] border-b border-[#8A0000] pb-1 hover:text-[#141414] hover:border-[#141414] transition-colors">Make another contribution</button>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          XI. THE FOUNDRY — Donor Wall
          ══════════════════════════════════════════ */}
      <section id="foundry" className="scroll-mt-[110px] py-20 lg:py-28">
        <div ref={foundryAnim.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${foundryAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-4 flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#8A0000] animate-pulse" /><span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">Live contributions</span></div>
          <div className="mb-6 flex items-center space-x-3"><span className="w-8 h-[1px] bg-[#8A0000]"></span><span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Foundry</span></div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold leading-[1.0] tracking-tighter text-[#141414] mb-4">The founders&apos; sky</h2>
          <p className="text-[16px] text-gray-600 max-w-2xl leading-relaxed mb-8">Every name here is a star in the founding constellation &mdash; a bet on the future of knowledge, placed by those who chose to build something unprecedented.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              { name: "Chancellor's Circle", range: '\u00a32M+', desc: 'Seat on the Founders\' Council. Private audience with the Chancellor. Naming rights for major facilities.', icon: Crown, color: '#8A0000' },
              { name: "Founder's Society", range: '\u00a3200K\u2013\u00a32M', desc: 'Named fellowship or scholarship. Closed-door strategic briefings. Priority access to all events.', icon: Star, color: '#4338ca' },
              { name: 'Guild Partners', range: '\u00a325K\u2013\u00a3200K', desc: 'Annual impact report. Invitation to the Guild Dinner. Name on the Founders\' Wall.', icon: Trophy, color: '#0e7490' },
            ].map((s, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 p-6 hover:border-[#8A0000]/30 transition-colors group">
                <s.icon size={22} style={{ color: s.color }} className="mb-3" />
                <h4 className="text-[16px] font-bold text-[#141414] mb-1">{s.name}</h4>
                <div className="text-[12px] font-bold mb-2" style={{ color: s.color }}>{s.range}</div>
                <p className="text-[13px] text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {DONORS.map((d, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.04 }} viewport={{ once: true }} className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-100 hover:border-gray-300 transition-colors">
                <div className="shrink-0 w-8 h-8 flex items-center justify-center text-[13px] font-bold" style={{ backgroundColor: TIER_COLORS[d.tier] + '15', color: TIER_COLORS[d.tier] }}>{d.name.charAt(0)}</div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-[#141414] truncate">{d.name}</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 shrink-0" style={{ color: TIER_COLORS[d.tier], backgroundColor: TIER_COLORS[d.tier] + '10' }}>{TIER_LABELS[d.tier]}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[12px] font-bold text-[#8A0000]">{sym}{fmtShort(d.amount)}</span>
                    <span className="text-[10px] text-gray-400">{d.date}</span>
                  </div>
                  {d.msg && <p className="text-[11px] text-gray-400 mt-1 italic truncate">&ldquo;{d.msg}&rdquo;</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          XII. THE HORIZON — Post-Founding Vision
          ══════════════════════════════════════════ */}
      <section id="horizon" className="scroll-mt-[110px] bg-gray-50 py-20 lg:py-28">
        <div ref={horizonAnim.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${horizonAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">The Horizon</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <h2 className="text-[36px] md:text-[48px] font-extrabold leading-[1.0] tracking-tighter text-[#141414] mb-4">Beyond the founding</h2>
          <p className="text-[16px] text-gray-600 max-w-2xl leading-relaxed mb-16">When the founding goal is reached, the campaign evolves. The constellation endures. The community deepens. The mission continues &mdash; not as an ending, but as a beginning.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              { phase: 'Phase I', title: 'The Founding', period: '2025 \u2014 2028', desc: 'Raise the capital. Build five nodes. Enrol the inaugural cohort. Establish the endowment. Create the digital estate. Everything from nothing. Your donation builds the physical and intellectual foundations of a university that will endure for centuries \u2014 and your name is inscribed in its first chapter.', icon: Rocket, color: '#8A0000' },
              { phase: 'Phase II', title: 'The Expansion', period: '2028 \u2014 2033', desc: 'Scale to 12 nodes on 6 continents. Double the student body. Launch the next generation of research institutes. The giving community becomes permanent philanthropic infrastructure \u2014 an engine that accelerates rather than a campaign that ends.', icon: Globe, color: '#8A0000' },
              { phase: 'Phase III', title: 'The Perpetuity', period: '2033 \u2014 Beyond', desc: 'The endowment becomes self-sustaining. Artemis operates in perpetuity, independent of tuition dependency. The Founding Campaign becomes the Artemis Foundation \u2014 a permanent charitable trust stewarding the mission for generations.', icon: Landmark, color: '#8A0000' },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }} className="bg-white border border-gray-200 p-8 hover:border-[#8A0000]/30 transition-colors">
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A0000] mb-4">{p.phase}</div>
                  <Icon size={28} className="text-[#8A0000] mb-4" />
                  <h4 className="text-[20px] font-bold text-[#141414] mb-1">{p.title}</h4>
                  <div className="text-[12px] text-gray-400 mb-4">{p.period}</div>
                  <p className="text-[13px] text-gray-600 leading-relaxed">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Card-and-image parallax with future stats */}
          <div className="relative w-full min-h-[380px] md:min-h-[460px] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1523050335102-c3250d857224?auto=format&fit=crop&q=80&w=1400" alt="The Future of Artemis" className="absolute inset-0 w-full h-full object-cover grayscale" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative z-10 flex items-end h-full min-h-[380px] md:min-h-[460px] p-8 md:p-14">
              <div className="bg-white max-w-lg p-8 shadow-xl">
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">By the Numbers</div>
                <h3 className="text-[24px] font-bold text-[#141414] mb-6 leading-tight">A university built to last centuries</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[{ value: '12', label: 'Global Nodes', detail: 'Residential hubs across 6 continents' },{ value: '2,400', label: 'Students', detail: 'Full capacity across the network' },{ value: '25', label: 'Institutes', detail: 'Permanently endowed, independent' },{ value: '\u00a3200M', label: 'Endowment', detail: 'Self-sustaining by Phase III' }].map((s, i) => (
                    <div key={i} className="relative pl-4">
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#8A0000]"></div>
                      <div className="text-[24px] font-black text-[#141414] leading-none mb-1">{s.value}</div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-0.5">{s.label}</div>
                      <div className="text-[10px] text-gray-500 leading-snug">{s.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Voices */}
          <div className="mt-20">
            <div className="relative flex items-center mb-16">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Voices from the Future</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {[
                { quote: "I was the first in my village to attend university \u2014 and the first to attend one that didn't care about my village's wealth. Artemis saw my mind, not my postcode. The scholarship that brought me here was funded by someone I will never meet, but whose name I carry in my thesis dedication.", name: 'Amara Osei', role: 'Inaugural Cohort, Weavers Commons', loc: 'Accra \u2192 Geneva' },
                { quote: "I donated because I remember being seventeen and brilliant and broke. I remember the university that let me in anyway \u2014 and how that changed everything. Artemis is that chance, scaled to the planet. I couldn't not give.", name: 'Dr. Elena Vasquez', role: "Chancellor's Circle, Founding Donor", loc: 'Mexico City' },
              ].map((v, i) => (
                <div key={i}>
                  <svg className="w-8 h-8 text-[#8A0000] opacity-20 mb-6" viewBox="0 0 24 24" fill="currentColor"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/></svg>
                  <p className="text-[17px] md:text-[19px] text-gray-700 leading-relaxed mb-8 font-light italic">{v.quote}</p>
                  <div className="text-[14px] font-bold text-[#141414]">{v.name}</div>
                  <div className="text-[12px] text-gray-500">{v.role} &mdash; {v.loc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          XIII. CONTACT ADVANCEMENT TEAM
          ══════════════════════════════════════════ */}
      <section id="contact" className="scroll-mt-[110px] py-20 lg:py-28">
        <div ref={contactAnim.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${contactAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <div className="mb-6 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Advancement Office</span>
              </div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                Talk to our<br />advancement team
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                Whether you are considering a major gift, exploring naming opportunities, or want to discuss how your contribution can have the greatest impact &mdash; our advancement team is here to help. We work with donors and their financial advisors to structure gifts that align with your philanthropic goals and maximise your impact on the founding of Artemis.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-8">
                We can assist with planned giving, securities transfers, donor-advised fund grants, estate planning, and any other questions about contributing to the Founding Campaign. All conversations are confidential.
              </p>
              <div className="space-y-4">
                <div className="border-l-2 border-[#8A0000] pl-6">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-1">Email</div>
                  <a href="mailto:donate@artemis.edu" className="text-[16px] font-bold text-[#141414] hover:text-[#8A0000] transition-colors">donate@artemis.edu</a>
                </div>
                <div className="border-l-2 border-[#8A0000] pl-6">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-1">Phone</div>
                  <p className="text-[16px] font-bold text-[#141414]">+44 (0) 20 7946 0958</p>
                </div>
                <div className="border-l-2 border-[#8A0000] pl-6">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-1">Post</div>
                  <p className="text-[14px] text-gray-600">Artemis University Advancement Office<br />Geneva Node, Rue de Lausanne 47<br />1201 Geneva, Switzerland</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-100 p-8 lg:p-10">
              <h3 className="text-[16px] font-bold text-[#141414] mb-6">Send us a message</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-[0.15em] mb-2">Your Name *</label>
                  <input type="text" placeholder="Full name" className="w-full border border-gray-300 bg-white px-4 py-3 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/30 focus:border-[#8A0000] transition-all" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-[0.15em] mb-2">Email *</label>
                  <input type="email" placeholder="you@email.com" className="w-full border border-gray-300 bg-white px-4 py-3 text-[15px] text-gray-800 focus:outline-none focus-2 focus:ring-[#8A0000]/30 focus:border-[#8A0000] transition-all" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-[0.15em] mb-2">Area of Interest</label>
                  <select className="w-full border border-gray-300 bg-white px-4 py-3 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/30 focus:border-[#8A0000] transition-all">
                    <option>General enquiry</option>
                    <option>Naming opportunities</option>
                    <option>Planned giving / Estate plans</option>
                    <option>Securities / Stock transfer</option>
                    <option>Employer matching</option>
                    <option>Donor-advised fund</option>
                    <option>Cryptocurrency</option>
                    <option>In-kind contributions</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-[0.15em] mb-2">Message</label>
                  <textarea rows={4} placeholder="Tell us about your philanthropic goals..." className="w-full border border-gray-300 bg-white px-4 py-3 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/30 focus:border-[#8A0000] transition-all resize-none" />
                </div>
                <button className="w-full py-4 bg-[#8A0000] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors flex items-center justify-center gap-2">
                  Send Enquiry <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          XIV. FINAL CTA — Crimson Bar
          ══════════════════════════════════════════ */}
      <section className="bg-[#8A0000] py-16">
        <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-[32px] md:text-[40px] font-extrabold leading-tight tracking-tighter text-white mb-2">
              Every great university began<br />with someone who believed.
            </h2>
            <p className="text-[16px] text-white/70 leading-relaxed max-w-lg">This is your moment to place a star in a constellation that will guide scholars for centuries. The next chapter starts with you.</p>
          </div>
          <button onClick={() => document.getElementById('offering')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center space-x-3 bg-white text-[#8A0000] px-10 py-4 text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors shrink-0 group">
            <span>Give Now</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
