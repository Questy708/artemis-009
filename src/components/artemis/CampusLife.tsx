'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import SubPageFooter from '@/components/artemis/SubPageFooter';

interface CampusLifeProps {
  goToPage: (page: string) => void;
}

/* ─── Hostel Data ─── */
type HostelData = {
  id: string;
  name: string;
  city: string;
  x: number;
  y: number;
  labelPos: 'left' | 'right';
  type: string;
  description: string;
  character: string;
};

const hostels: HostelData[] = [
  {
    id: 'valletta-weavers',
    name: 'The Weavers Hall',
    city: 'Valletta',
    x: 52,
    y: 39,
    labelPos: 'right',
    type: 'Commons Residence',
    description: 'The heart of the Artemis Collegium. Weavers Hall anchors students in the art of community-building — where every corridor is a loom and every conversation a thread in something larger.',
    character: 'Collaborative, civic-minded, grounded in dialogue',
  },
  {
    id: 'kigali-kepler',
    name: 'Kepler House',
    city: 'Kigali',
    x: 57,
    y: 57,
    labelPos: 'right',
    type: 'Scholar House',
    description: 'Named for the astronomer who saw patterns in chaos. Kepler House is a haven for systems thinkers and sustainable innovators, overlooking the hills of Rwanda\'s innovation corridor.',
    character: 'Analytical, forward-looking, community-driven',
  },
  {
    id: 'berlin-forge',
    name: 'The Forge Lodge',
    city: 'Berlin',
    x: 52,
    y: 30,
    labelPos: 'right',
    type: 'Guild Hall',
    description: 'Where ideas are hammered into form. The Forge Lodge channels Berlin\'s creative raw energy into a guild of makers, artists, and provocateurs who believe the future is built, not predicted.',
    character: 'Creative, restless, prototyping-oriented',
  },
  {
    id: 'sf-frontier',
    name: 'The Frontier Residence',
    city: 'San Francisco',
    x: 15,
    y: 37,
    labelPos: 'right',
    type: 'Commons Residence',
    description: 'Perched at the edge of the Pacific and the frontier of technology. Frontier residents are builders and dreamers who treat uncertainty as fuel and the unknown as home.',
    character: 'Entrepreneurial, experimental, high-velocity',
  },
  {
    id: 'tokyo-sakura',
    name: 'Sakura House',
    city: 'Tokyo',
    x: 85,
    y: 37,
    labelPos: 'left',
    type: 'Scholar House',
    description: 'A place of precision and contemplation. Sakura House bridges ancient craft and bleeding-edge technology, reflecting Tokyo\'s own duality — where temple gardens neighbour robotics labs.',
    character: 'Disciplined, contemplative, detail-obsessed',
  },
  {
    id: 'reykjavik-aurora',
    name: 'The Aurora Lodge',
    city: 'Reykjavik',
    x: 42,
    y: 17,
    labelPos: 'right',
    type: 'Guild Hall',
    description: 'The northernmost hostel in the network. Aurora Lodge is for those drawn to extremes — geothermal research, Arctic ecology, and the kind of clarity that only comes at the edge of the world.',
    character: 'Resilient, nature-bound, quietly radical',
  },
  {
    id: 'singapore-meridian',
    name: 'The Meridian Hall',
    city: 'Singapore',
    x: 77,
    y: 55,
    labelPos: 'left',
    type: 'Commons Residence',
    description: 'Where East meets West meets future. Meridian Hall is a crossroads — students here navigate cultural complexity with the same ease they navigate smart city infrastructure and digital governance.',
    character: 'Adaptable, cosmopolitan, systems-savvy',
  },
  {
    id: 'saopaulo-botanica',
    name: 'The Botanica House',
    city: 'São Paulo',
    x: 31,
    y: 66,
    labelPos: 'right',
    type: 'Scholar House',
    description: 'Rooted in the Atlantic Forest and the pulse of Latin America. Botanica House is for those who study life in all its forms — from biodiversity to social movements to the rhythms of the city.',
    character: 'Vibrant, socially conscious, ecologically minded',
  },
  {
    id: 'oxford-bodley',
    name: 'Bodley House',
    city: 'Oxford',
    x: 47,
    y: 27,
    labelPos: 'right',
    type: 'Scholar House',
    description: 'Inspired by Oxford\'s collegiate tradition, Bodley House is a micro-college within the Artemis network — a place of tutorials, common rooms, and the conviction that rigorous thought changes the world.',
    character: 'Intellectual, tradition-honouring, debate-loving',
  },
  {
    id: 'geneva-calaton',
    name: 'The Calaton',
    city: 'Geneva',
    x: 49,
    y: 33,
    labelPos: 'right',
    type: 'Guild Hall',
    description: 'Overlooking Lake Geneva and the corridors of international power. The Calaton trains students in diplomacy, humanitarian policy, and the art of building institutions that outlast their founders.',
    character: 'Principled, diplomatic, institution-minded',
  },
  {
    id: 'nairobi-rift',
    name: 'The Rift Lodge',
    city: 'Nairobi',
    x: 56,
    y: 54,
    labelPos: 'right',
    type: 'Commons Residence',
    description: 'Built on the edge of the Great Rift Valley — a fitting metaphor. Rift Lodge is where students confront the deep fractures in global systems and learn to bridge them with technology and empathy.',
    character: 'Bold, restorative, technologically optimistic',
  },
  {
    id: 'mumbai-gateway',
    name: 'The Gateway House',
    city: 'Mumbai',
    x: 68,
    y: 44,
    labelPos: 'left',
    type: 'Guild Hall',
    description: 'Named for the arch that welcomes travellers to India\'s greatest port city. Gateway House is a guild of entrepreneurs and social innovators who see opportunity where others see complexity.',
    character: 'Resourceful, dynamic, impact-driven',
  },
  {
    id: 'seoul-han',
    name: 'The Han Residence',
    city: 'Seoul',
    x: 82,
    y: 35,
    labelPos: 'left',
    type: 'Scholar House',
    description: 'Along the banks of the Han River, this hostel embodies Korea\'s blend of deep heritage and hyper-modernity. Han residents move between K-culture analysis and semiconductor design with equal fluency.',
    character: 'Intensive, culturally layered, innovation-focused',
  },
  {
    id: 'sydney-southerncross',
    name: 'The Southern Cross Lodge',
    city: 'Sydney',
    x: 87,
    y: 69,
    labelPos: 'left',
    type: 'Commons Residence',
    description: 'Guided by the constellation for which it\'s named. Southern Cross Lodge is the network\'s gateway to Oceania — a community of marine scientists, Indigenous knowledge holders, and adventurers.',
    character: 'Exploratory, ocean-minded, community-rooted',
  },
  {
    id: 'capetown-table',
    name: 'The Table Hall',
    city: 'Cape Town',
    x: 52,
    y: 71,
    labelPos: 'right',
    type: 'Guild Hall',
    description: 'In the shadow of Table Mountain, this guild hall brings together artists, activists, and architects. Table Hall is where the struggle for justice meets the craft of beautiful, lasting design.',
    character: 'Creative, justice-oriented, architecturally minded',
  },
  {
    id: 'buenosaires-tango',
    name: 'The Tango House',
    city: 'Buenos Aires',
    x: 28,
    y: 73,
    labelPos: 'right',
    type: 'Scholar House',
    description: 'A hostel that moves. Tango House takes its name from the dance — two partners, unpredictable, perfectly attuned. Students here study urban transformation, literature, and the politics of movement.',
    character: 'Passionate, literary, politically engaged',
  },
  {
    id: 'stockholm-nordic',
    name: 'The Nordic Hall',
    city: 'Stockholm',
    x: 51,
    y: 22,
    labelPos: 'right',
    type: 'Commons Residence',
    description: 'Clean lines, clear thinking. Nordic Hall is a study in Scandinavian design principles applied to education — minimal waste, maximum wellbeing, and the quiet conviction that good systems produce good lives.',
    character: 'Orderly, design-conscious, sustainability-first',
  },
  {
    id: 'dubai-oasis',
    name: 'The Oasis Lodge',
    city: 'Dubai',
    x: 61,
    y: 41,
    labelPos: 'left',
    type: 'Guild Hall',
    description: 'Rising from the desert, Oasis Lodge is a guild of futurists and financiers. Students here engage with global capital flows, urban megaprojects, and the ethics of building cities from nothing.',
    character: 'Ambitious, globally connected, ethically questioning',
  },
  {
    id: 'shanghai-dragon',
    name: 'The Dragon Gate',
    city: 'Shanghai',
    x: 79,
    y: 39,
    labelPos: 'left',
    type: 'Commons Residence',
    description: 'At the mouth of the Yangtze, where tradition and velocity collide. Dragon Gate residents study manufacturing ecosystems, AI ethics, and the art of operating at unprecedented scale.',
    character: 'Fast-thinking, scale-minded, culturally deep',
  },
  {
    id: 'accra-goldcoast',
    name: 'The Gold Coast House',
    city: 'Accra',
    x: 47,
    y: 51,
    labelPos: 'right',
    type: 'Scholar House',
    description: 'Reclaiming a colonial name with post-colonial ambition. Gold Coast House is a centre for Pan-African thought, digital sovereignty, and the creative industries reshaping West Africa\'s narrative.',
    character: 'Afro-futurist, culturally proud, digitally native',
  },
  {
    id: 'lima-andes',
    name: 'The Andes Lodge',
    city: 'Lima',
    x: 22,
    y: 62,
    labelPos: 'right',
    type: 'Guild Hall',
    description: 'Where the Andes meet the Pacific. Andes Lodge is a guild of earth scientists, culinary innovators, and indigenous knowledge keepers — studying the deep time of landscapes and cultures.',
    character: 'Earth-connected, culinary, ancestrally aware',
  },
  {
    id: 'montreal-cartier',
    name: 'The Cartier House',
    city: 'Montreal',
    x: 24,
    y: 30,
    labelPos: 'right',
    type: 'Scholar House',
    description: 'A bilingual micro-college in the Francophone heart of North America. Cartier House bridges French and English intellectual traditions, with particular strength in AI research and philosophy of mind.',
    character: 'Bilingual, philosophical, research-intensive',
  },
  {
    id: 'edinburgh-arthur',
    name: 'The Arthur Seat Lodge',
    city: 'Edinburgh',
    x: 46,
    y: 25,
    labelPos: 'right',
    type: 'Commons Residence',
    description: 'Named for the ancient volcano at the city\'s heart. Arthur Seat Lodge is a community of storytellers, data scientists, and those who believe narrative and numbers are equally valid ways of knowing.',
    character: 'Narrative-driven, data-fluent, mythologically aware',
  },
  {
    id: 'zagreb-adriatic',
    name: 'The Adriatic House',
    city: 'Zagreb',
    x: 52,
    y: 34,
    labelPos: 'left',
    type: 'Guild Hall',
    description: 'At the crossroads of Central Europe and the Mediterranean. Adriatic House is a guild of bridge-builders — students who navigate between cultures, systems, and histories with ease and intention.',
    character: 'Mediating, culturally fluent, bridge-building',
  },
];

/* ─── Updated Stats ─── */
const campusStats = [
  { value: '16+', label: 'Cities', detail: 'Global hub presence across every continent' },
  { value: '24', label: 'Hostels', detail: 'Distinct residential communities worldwide' },
  { value: '6', label: 'Continents', detail: 'From Reykjavik to Cape Town to Sydney' },
  { value: '4', label: 'Year Rotation', detail: 'A new city, a new perspective each semester' },
];

/* ─── Traditions ─── */
const traditions = [
  {
    name: 'The Crossing',
    desc: 'When students arrive at a new hostel for the first time, they cross its threshold carrying a single object from their previous hostel — a tradition that transforms arrival into continuity.',
  },
  {
    name: 'The Common Table',
    desc: 'Every hostel sets one long table on Friday evenings. No devices, no agendas — only food and conversation. The ritual travels with students from city to city, creating a shared rhythm across the globe.',
  },
  {
    name: 'The Send-Off',
    desc: 'Before rotating to their next hub, students present a fragment of what they\'ve learned to their hostel community. It is part celebration, part transmission — ensuring knowledge doesn\'t stay in one place.',
  },
  {
    name: 'The Co-Design Immersion',
    desc: 'In their first week, every student enters a 24-hour co-design challenge with their hostel peers. Together they prototype solutions to a real community challenge, planting a learning contract at their new hub.',
  },
];

/* ─── Hook: animate on scroll ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !visible.current) {
          visible.current = true;
          setIsVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible: isVisible };
}

/* ─── Component ─── */
export default function CampusLife({ goToPage }: CampusLifeProps) {
  const heroAnim = useInView();
  const mapIntroAnim = useInView();
  const rotationAnim = useInView();
  const traditionsAnim = useInView();
  const statsAnim = useInView();

  const [activeHostelId, setActiveHostelId] = useState<string | null>(null);

  const activeHostel = useMemo(
    () => hostels.find((h) => h.id === activeHostelId),
    [activeHostelId]
  );

  return (
    <div className="flex flex-col bg-white">
      {/* ── 1. Hero ── */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[50vh] min-h-[420px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1523050335102-c3250d857224?auto=format&fit=crop&q=80&w=1800"
              className="absolute inset-0 w-full h-full object-cover grayscale"
              alt="Global rotation at Artemis"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
              <div className="mb-8 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                  Life at Artemis
                </span>
              </div>
              <h1 className="text-[32px] sm:text-[44px] md:text-[60px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6 uppercase">
                Global<br />Rotation
              </h1>
              <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
                Artemis students don&rsquo;t stay in one place. Over four years, they rotate through
                global hubs — living and learning across continents, each semester a new city,
                a new hostel, a new perspective that reshapes everything they thought they knew.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Map Intro ── */}
      <section className="py-16 lg:py-24">
        <div
          ref={heroAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${
            heroAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              The Hostel Network
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                24 hostels,<br />one world
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Each hostel is a micro-college — a residential community with its own culture,
                traditions, and identity. Inspired by Oxford&rsquo;s collegiate system and Minerva&rsquo;s
                rotation model, Artemis hostels are not just places to sleep. They are where
                living becomes the curriculum.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                From the Aurora Lodge in Reykjavik to the Southern Cross in Sydney, every hostel
                carries the DNA of its city while remaining connected to the global network.
                Click any pin to explore.
              </p>
            </div>
            <div className="group">
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1000"
                  alt="Hostel community gathering"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <p className="text-[12px] text-gray-500 mt-3 leading-relaxed">
                The Weavers Hall courtyard, Valletta — where the global rotation begins for every
                incoming cohort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Interactive World Map ── */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div
          ref={mapIntroAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${
            mapIntroAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-10 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Interactive Map
            </span>
          </div>
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            Where will you live next?
          </h2>
          <p className="text-[16px] text-gray-500 max-w-lg leading-relaxed font-light mb-10">
            Explore the 24 hostels of the Artemis network. Each pin represents a living
            community — click to discover its character.
          </p>
        </div>

        {/* Map */}
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <div
            className="relative w-full overflow-hidden bg-white border border-gray-200"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setActiveHostelId(null);
              }
            }}
          >
            <img
              src="https://cdn.prod.website-files.com/677376e1e97650585235ab96/677e1de06571eae8d537fc47_map.avif"
              alt="World Map — Artemis Hostel Network"
              className="w-full h-auto pointer-events-none select-none opacity-80"
            />

            {/* Hostel Markers */}
            {hostels.map((hostel, index) => (
              <div
                key={hostel.id}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${
                  activeHostelId === hostel.id ? 'z-40' : 'z-10'
                }`}
                style={{ left: `${hostel.x}%`, top: `${hostel.y}%` }}
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 25,
                    delay: index * 0.04,
                  }}
                  className="relative flex items-center justify-center"
                >
                  {/* Crimson Marker */}
                  <button
                    onClick={() =>
                      setActiveHostelId(activeHostelId === hostel.id ? null : hostel.id)
                    }
                    className={`relative rounded-full shrink-0 cursor-pointer transition-all duration-200 ${
                      activeHostelId === hostel.id
                        ? 'w-5 h-5 md:w-6 md:h-6 bg-[#8A0000] ring-4 ring-[#8A0000]/20'
                        : 'w-3.5 h-3.5 md:w-4 md:h-4 bg-[#8A0000] hover:bg-red-800 hover:ring-4 hover:ring-[#8A0000]/10 border-2 border-transparent hover:border-black'
                    }`}
                    aria-label={`View ${hostel.name} in ${hostel.city}`}
                  />

                  {/* Label */}
                  <div
                    className={`absolute whitespace-nowrap top-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-200 ${
                      activeHostelId === hostel.id ? 'opacity-0' : 'opacity-100'
                    } ${
                      hostel.labelPos === 'left'
                        ? 'right-full mr-2 md:mr-3'
                        : 'left-full ml-2 md:ml-3'
                    }`}
                  >
                    <span className="bg-black text-white font-mono text-[9px] md:text-[11px] font-bold tracking-[0.12em] px-2 py-1">
                      {hostel.name}
                    </span>
                  </div>
                </motion.div>
              </div>
            ))}

            {/* Info Panel */}
            <AnimatePresence>
              {activeHostel && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-3 bottom-3 right-3 md:w-80 lg:w-96 bg-white border border-gray-200 shadow-2xl p-6 md:p-8 flex flex-col z-50 overflow-y-auto"
                >
                  <button
                    onClick={() => setActiveHostelId(null)}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors"
                    aria-label="Close panel"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Hostel type badge */}
                  <div className="mb-3 mt-4">
                    <span className="bg-[#8A0000]/10 text-[#8A0000] text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                      {activeHostel.type}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold uppercase tracking-tight text-[#141414] mb-1">
                    {activeHostel.name}
                  </h3>
                  <p className="text-[12px] font-bold uppercase tracking-widest text-gray-500 mb-6">
                    {activeHostel.city}
                  </p>

                  <div className="space-y-5 flex-1">
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#8A0000] mb-2">
                        About
                      </h4>
                      <p className="text-gray-600 text-[14px] leading-relaxed">
                        {activeHostel.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#8A0000] mb-2">
                        Character
                      </h4>
                      <p className="text-gray-800 text-[14px] leading-relaxed font-medium">
                        {activeHostel.character}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <button
                        onClick={() => goToPage('visit-us')}
                        className="flex items-center space-x-3 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A0000] hover:text-black transition-colors group"
                      >
                        <span>Visit this hostel</span>
                        <svg
                          className="group-hover:translate-x-2 transition-transform"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hostel type legend */}
          <div className="mt-6 flex flex-wrap gap-6 items-center text-[11px] text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#8A0000] inline-block" />
              <span className="font-medium">Commons Residence</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#8A0000] inline-block" />
              <span className="font-medium">Scholar House</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#8A0000] inline-block rotate-45" />
              <span className="font-medium">Guild Hall</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Global Rotation Narrative ── */}
      <section className="py-16 lg:py-24">
        <div
          ref={rotationAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${
            rotationAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200" />
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">
              How Rotation Works
            </span>
            <div className="flex-grow border-t border-gray-200" />
          </div>

          {/* Large statement */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-[28px] sm:text-[36px] md:text-[48px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
              No student stays in one place.
              <br />
              <span className="text-[#8A0000]">Every semester, a new city.</span>
            </h2>
            <p className="text-[17px] text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Inspired by Minerva University&rsquo;s rotation model and Oxford&rsquo;s collegiate traditions,
              Artemis divides the globe into learning hubs. Students spend each semester at a
              different hostel — building fluency in cultures, contexts, and challenges that no
              single campus could provide.
            </p>
          </div>

          {/* Rotation steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {[
              {
                year: 'Year 1',
                title: 'Foundation',
                desc: 'Begin at The Weavers Hall in Valletta — the network\'s heart. Learn the rhythms of communal living, the language of the Collegium, and the foundational skills of cross-cultural inquiry.',
                cities: 'Valletta · Berlin',
              },
              {
                year: 'Year 2',
                title: 'Expansion',
                desc: 'Rotate to hubs in Africa and the Americas. Confront entirely different systems of thought, from Kigali\'s innovation corridors to São Paulo\'s social movements.',
                cities: 'Kigali · São Paulo · Accra',
              },
              {
                year: 'Year 3',
                title: 'Deepening',
                desc: 'Choose a specialisation and embed in the hostel that serves it best. Whether that\'s AI ethics in Montreal or marine science in Sydney, this is where expertise takes root.',
                cities: 'Tokyo · Seoul · Oxford · Sydney',
              },
              {
                year: 'Year 4',
                title: 'Integration',
                desc: 'Return to a hub with fresh eyes. Complete a capstone that draws on every city you\'ve lived in, every community you\'ve been part of, every perspective you\'ve adopted.',
                cities: 'Your choice · Global network',
              },
            ].map((step, i) => (
              <div key={i} className="relative pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#8A0000]" />
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-2">
                  {step.year}
                </div>
                <h3 className="text-[20px] font-bold text-[#141414] mb-3 leading-tight">
                  {step.title}
                </h3>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-3">{step.desc}</p>
                <p className="text-[11px] font-mono text-gray-400 tracking-wider">
                  {step.cities}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Traditions that Travel ── */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div
          ref={traditionsAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${
            traditionsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Traditions that Travel
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
            <div>
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Rituals that move<br />with you
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                In the Oxford tradition, every college has its rituals. At Artemis, those rituals
                don&rsquo;t belong to a building — they belong to the community. Wherever students rotate,
                the traditions travel with them, creating continuity across continents.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed">
                From the Crossing to the Common Table, these practices bind the network together
                — not through uniformity, but through a shared commitment to presence, reflection,
                and the belief that how you live matters as much as what you learn.
              </p>
            </div>

            {/* Full-width image */}
            <div className="group">
              <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000"
                  alt="Traditions at Artemis"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <p className="text-[12px] text-gray-500 mt-3 leading-relaxed">
                The Common Table at The Forge Lodge, Berlin — the same ritual, a different city,
                every Friday evening.
              </p>
            </div>
          </div>

          {/* Tradition cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {traditions.map((trad, i) => (
              <div
                key={i}
                className="border border-gray-200 bg-white p-6 hover:border-[#8A0000] transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-[10px] font-bold text-[#8A0000] tracking-widest mt-1 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="text-[18px] font-bold text-[#141414] mb-2 group-hover:text-[#8A0000] transition-colors leading-tight">
                      {trad.name}
                    </h4>
                    <p className="text-[14px] text-gray-600 leading-relaxed">{trad.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Stats ── */}
      <section className="py-16 lg:py-24">
        <div
          ref={statsAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${
            statsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              By the Numbers
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-12">
            A world-scale<br />university
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {campusStats.map((stat, i) => (
              <div key={i} className="relative pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#8A0000]" />
                <div className="text-[36px] font-black text-[#141414] leading-none mb-2 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">
                  {stat.label}
                </div>
                <div className="text-[12px] text-gray-500 leading-snug">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Crimson CTA bar ── */}
      <section className="bg-[#8A0000] py-16 px-5 sm:px-8 lg:px-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-[28px] md:text-[36px] font-extrabold leading-tight tracking-tighter text-white mb-2">
              Begin your global rotation
            </h2>
            <p className="text-[16px] text-white/70 leading-relaxed max-w-lg">
              Walk the hostels, share a Common Table with future peers, feel the pulse of a city
              that will reshape your thinking. There is no substitute for being here.
            </p>
          </div>
          <button
            onClick={() => goToPage('visit-us')}
            className="flex items-center space-x-3 bg-white text-[#8A0000] px-8 py-4 text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors shrink-0 group"
          >
            <span>Visit Campus</span>
            <svg
              className="group-hover:translate-x-2 transition-transform"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </section>

      {/* ── 8. Footer ── */}
      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
