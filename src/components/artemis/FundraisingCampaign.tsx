'use client';

import React from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import { motion } from 'motion/react';
import { ArrowRight, Target, Users, BookOpen, Cpu, Award, Milestone, BookOpenText } from 'lucide-react';

interface Props {
  goToPage: (page: string) => void;
}

export default function FundraisingCampaign({ goToPage }: Props) {
  return (
    <div className="flex flex-col bg-white">
      {/* Sub-header */}
      <div className="sticky top-[50px] z-40 bg-white border-b border-gray-200 w-full">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
          <div className="flex items-center h-[52px] gap-8 overflow-x-auto hide-scrollbar">
              <h2 className="text-[14px] font-bold tracking-tight text-[#8A0000] mr-10 whitespace-nowrap">
                Support Artemis
              </h2>
              <div className="flex space-x-6 shrink-0 text-[12px] font-bold uppercase tracking-widest text-gray-400">
                <a href="#campaign" className="hover:text-[#8A0000] transition-colors whitespace-nowrap">Campaign</a>
                <a href="#giving" className="hover:text-[#8A0000] transition-colors whitespace-nowrap">Giving</a>
                <a href="#impact" className="hover:text-[#8A0000] transition-colors whitespace-nowrap">Impact</a>
          </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-[#141414] text-white pt-24 pb-24">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-[56px] lg:text-[84px] font-extrabold leading-[0.9] tracking-tighter uppercase mb-8">
              Building the <br className="hidden lg:block"/> Future of Knowledge
            </h1>
            <p className="text-[20px] text-gray-300 max-w-2xl leading-relaxed mb-12">
              The Artemis Founding Campaign is the cornerstone of our mission. Join a select generation of supporters establishing the intellectual and physical foundations of the world&apos;s most agile university.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-10 py-4 bg-[#8A0000] text-white text-[13px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#8A0000] transition-colors rounded-lg flex items-center gap-2">
                  Donate Now <ArrowRight size={16} />
              </button>
              <button className="px-10 py-4 bg-transparent border border-white text-white text-[13px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#141414] transition-colors rounded-lg">
                  Explore Impact
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-24">
        
        {/* Case for Support */}
        <section id="campaign" className="mb-24">
            <h2 className="text-[14px] font-bold text-[#8A0000] tracking-widest uppercase mb-4">Our Commitment</h2>
            <h3 className="text-[40px] font-extrabold tracking-tight text-gray-900 mb-8">Why Artemis? Why Now?</h3>
            <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p>The traditional university model is at an inflection point. Decades of bureaucratic growth, physical limitations, and closed systems have severely constrained the potential of the modern scholar. Artemis was founded to transcend these limitations, not by merely digitizing existing structures, but by reimagining the very nature of an academic community.</p>
                <p>We are building a <em>universitas</em> optimized for our era: borderless, data-driven, and intrinsically collaborative. Our core operating philosophy is one of <b>Foundational Efficiency</b>. We recognize that true innovation thrives when resources are concentrated on the intellectual work, not on massive administrative overhead. The Artemis Founding Campaign is the cornerstone of a mission to build a globally distributed, high-impact institution from the ground up, with a remarkably lean founding budget that maximizes donor impact at every layer.</p>
                <p>The Founding Campaign provides the strategic capital to construct our fundamental digital estate, endow our first residential colleges, and launch interdisciplinary research hubs that operate at the speed of modern discovery instead of the pace of administrative committees.</p>
            </div>
        </section>

        {/* Founding Budget Efficiency */}
        <section className="mb-24 py-16 border-t border-gray-100">
            <h2 className="text-[32px] font-extrabold text-gray-900 tracking-tight mb-16 uppercase">A Minimal Founding Budget</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="prose prose-lg text-gray-600 leading-relaxed">
                    <p>Artemis represents a departure from traditional capital-intensive university foundations. Our founding budget model is designed to be lean, agile, and highly focused on delivering maximum intellectual output with minimal administrative overhead. We avoid the &quot;infrastructure trap&quot; of excessive physical building by investing deeply in a secure, performant digital infrastructure that scales globally.</p>
                    <p>By leveraging decentralized technologies, we reduce operational drag by nearly 60% compared to traditional institutions of similar scale. Each pound donated goes directly toward faculty excellence, student access, and research breakthroughs, ensuring your support is the primary engine of our growth.</p>
                </div>
                <div className="p-10 bg-gray-900 text-white rounded-2xl">
                    <h4 className="text-xl font-bold mb-6 text-white">Efficiency Metrics</h4>
                    <ul className="space-y-4 text-gray-300">
                        <li><strong>60% less overhead</strong> than peer-tier physical institutions.</li>
                        <li><strong>90% of capital</strong> directed to academic and research programs.</li>
                        <li><strong>Borderless scaling</strong> via our core digital stack.</li>
                    </ul>
                </div>
            </div>
        </section>

        {/* Detailed Initiatives */}
        <section className="mb-24">
            <h2 className="text-[32px] font-extrabold text-gray-900 tracking-tight mb-16 uppercase">Strategic Initiatives</h2>
            <div className="space-y-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Endowment for Autonomous Research</h3>
                        <p className="text-gray-600 leading-relaxed text-[15px]">We are building a permanent endowment to support interdisciplinary research hubs. These hubs operate independently of state or commercial agendas, focusing on long-term challenges, from the ethics of AI to sustainable bio-engineering. Our Founding Campaign aims to fully endow the first five flagship institutes.</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" className="rounded-2xl shadow-lg" alt="Research" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800" className="rounded-2xl shadow-lg lg:order-1" alt="Scholars" />
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">The Global Scholars Fund</h3>
                        <p className="text-gray-600 leading-relaxed text-[15px]">Artemis is designed to be accessible to the best minds, not just those with the greatest resources. This fund provides full-ride virtual residencies and travel grants for scholars from underserved digital nodes, ensuring our community represents the true intellectual capital of the world.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Outcomes */}
        <section id="impact" className="mb-24 py-16 border-t border-gray-100">
            <h2 className="text-[32px] font-extrabold text-gray-900 tracking-tight mb-16 uppercase">Tangible Outcomes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { stat: "0", desc: "Inaugural cohort enrolling 2026." },
                    { stat: "5", desc: "Founding research nodes being established globally." },
                    { stat: "25", desc: "Founding scholarships for the inaugural cohort." },
                    { stat: "£28M", desc: "Capital invested in our digital and physical estate." },
                ].map((item, idx) => (
                    <div key={idx} className="p-8 border border-gray-100 rounded-2xl bg-white shadow-sm">
                        <div className="text-4xl font-extrabold text-[#8A0000] mb-3">{item.stat}</div>
                        <p className="text-[14px] text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Campaign Pillars */}
        <section className="mb-24">
          <h2 className="text-[32px] font-extrabold text-gray-900 tracking-tight mb-16 uppercase">Campaign Pillars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
                { icon: Users, title: "Access & Opportunity", desc: "Endowing scholarships for the next generation of global scholars, regardless of their economic background." },
                { icon: BookOpenText, title: "Frontier Research", desc: "Funding interdisciplinary research hubs tackling humanity's most complex challenges in medicine, climate, and tech." },
                { icon: Cpu, title: "Digital Estate", desc: "Developing the secure, decentralized infrastructure essential for a modern, borderless university." }
            ].map((pillar, idx) => (
                <div key={idx} className="p-10 border border-gray-100 rounded-2xl bg-gray-50/50 hover:border-[#8A0000] transition-colors group">
                    <pillar.icon size={40} className="text-[#8A0000] mb-8" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{pillar.title}</h3>
                    <p className="text-[15px] text-gray-600 leading-relaxed">{pillar.desc}</p>
                </div>
            ))}
          </div>
        </section>

        {/* Campaign Roadmap */}
        <section className="mb-24 p-16 bg-gray-50 border border-gray-200 rounded-2xl">
            <h2 className="text-[32px] font-extrabold text-gray-900 tracking-tight mb-16 uppercase flex items-center gap-4">
                <Milestone className="text-[#8A0000]" /> Campaign Roadmap
            </h2>
            <div className="relative">
                <div className="absolute top-[28px] left-0 right-0 h-1 bg-gray-200" />
                <motion.div 
                    className="absolute top-[28px] left-0 h-1 bg-[#8A0000]"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "75%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
                <div className="flex justify-between relative gap-8 overflow-x-auto pb-4">
                    {[
                        { phase: "Inception", year: "2020-21", desc: "Concept & Governance" },
                        { phase: "Quiet Opening", year: "2022-24", desc: "Foundational Nodes" },
                        { phase: "Public Launch", year: "2025-26", desc: "Global Appeals" },
                        { phase: "Consolidation", year: "2027+", desc: "Infrastructure Scale" }
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center flex-shrink-0 w-48 pt-4">
                            <div className="w-6 h-6 rounded-full bg-[#8A0000] z-10 mb-4" />
                            <div className="text-[12px] font-bold text-[#8A0000] uppercase mb-1">{item.year}</div>
                            <h4 className="text-lg font-bold text-gray-900 text-center mb-1">{item.phase}</h4>
                            <p className="text-[14px] text-gray-600 text-center">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Giving Societies */}
        <section id="giving" className="bg-gray-900 rounded-2xl p-16 text-white mb-24">
            <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2">
                    <h3 className="text-4xl font-bold mb-6 flex items-center gap-4"><Award className="text-[#8A0000]" /> Recognized Impact</h3>
                    <p className="text-gray-300 leading-relaxed mb-8">Artemis honors the visionaries who make this institution possible. Our donor societies are designed to reflect the breadth and depth of your commitment.</p>
                    <ul className="space-y-4 text-gray-300">
                        <li><strong>Chancellor&apos;s Circle:</strong> £2M+ – Founding benefactors shaping university strategy.</li>
                        <li><strong>Founder&apos;s Society:</strong> £200K – £2M – Direct support for chairs and building projects.</li>
                        <li><strong>Guild Partners:</strong> £25K – £200K – Sustained impact across research and scholarships.</li>
                    </ul>
                </div>
                {/* Progress Tracker */}
                <div className="lg:w-1/2 w-full p-10 bg-gray-800 rounded-xl">
                    <h4 className="text-xl font-bold mb-6">Founding Goal: £80M</h4>
                    <div className="flex items-baseline gap-2 mb-8">
                        <span className="text-5xl font-extrabold text-[#8A0000]">£28M</span>
                        <span className="text-xl text-gray-400">raised to date</span>
                    </div>
                    <div className="h-4 bg-gray-700 rounded-full w-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "35%" }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="h-full bg-[#8A0000]"
                        />
                    </div>
                </div>
            </div>
        </section>
      </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
