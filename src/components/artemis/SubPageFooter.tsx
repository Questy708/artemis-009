'use client';

import { useState, useEffect, useCallback } from 'react';

interface FooterProps {
  goToPage: (page: string) => void;
}

const CELL_COUNT = 20;

/* ─── Image pool: multiple sets so cells can rotate ─── */
const imageSets = [
  // Set A — primary images
  [
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1523050335102-c3250d857224?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1521714161819-15534968fc5f?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1496247749665-49cf5bf875d4?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=400",
  ],
  // Set B — secondary rotation images
  [
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1509023464722-18d996393ca8?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1546961342-ea5f71b193f3?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1559386484-97dfc0e15539?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&q=80&w=400",
  ],
  // Set C — tertiary rotation images
  [
    "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1499750310107-68fef5a4598c?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1567449303078-57ad995bd329?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1606770266850-7817f7b2b130?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1588392382834-a891154bca4d?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=400",
  ],
];

export default function SubPageFooter({ goToPage }: FooterProps) {
  const [cellSets, setCellSets] = useState<number[]>(() =>
    Array.from({ length: CELL_COUNT }, () => 0)
  );
  const [cellTransitioning, setCellTransitioning] = useState<boolean[]>(
    Array.from({ length: CELL_COUNT }, () => false)
  );

  const rotateCell = useCallback((index: number) => {
    setCellTransitioning(prev => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
    setTimeout(() => {
      setCellSets(prev => {
        const next = [...prev];
        next[index] = (next[index] + 1) % imageSets.length;
        return next;
      });
      setCellTransitioning(prev => {
        const next = [...prev];
        next[index] = false;
        return next;
      });
    }, 500);
  }, []);

  // Staggered auto-rotation: rotate 3-4 cells at a time every 4 seconds
  useEffect(() => {
    let cycle = 0;
    const timer = setInterval(() => {
      const cellsToRotate: number[] = [];
      const base = cycle % CELL_COUNT;

      cellsToRotate.push(base);
      cellsToRotate.push((base + 5) % CELL_COUNT);
      cellsToRotate.push((base + 10) % CELL_COUNT);
      if (cycle % 2 === 0) {
        cellsToRotate.push((base + 15) % CELL_COUNT);
      }

      cellsToRotate.forEach((cellIdx, i) => {
        setTimeout(() => rotateCell(cellIdx), i * 150);
      });

      cycle++;
    }, 4000);

    return () => clearInterval(timer);
  }, [rotateCell]);

  const cells = Array.from({ length: CELL_COUNT }, (_, i) => {
    const setIdx = cellSets[i];
    const src = imageSets[setIdx][i];
    const isTransitioning = cellTransitioning[i];
    return { src, isTransitioning, index: i };
  });

  return (
    <div className="w-full shrink-0">
      {/* ── Photo Grid on Crimson ── */}
      <section className="py-12 overflow-hidden">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 bg-[#8A0000] py-8 sm:py-10">
          {/* Section label */}
          <div className="flex items-center space-x-3 mb-6">
            <span className="w-6 h-[1px] bg-white/40"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">Campus Life at Artemis</span>
          </div>

          {/* Uniform image grid — 20 cells: 5×4 on lg, 4×5 on md, 2×10 on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-0">
            {cells.map((cell, i) => (
              <div
                key={i}
                className="relative overflow-hidden bg-[#6B0000] aspect-[4/3]"
              >
                <img
                  src={cell.src}
                  alt=""
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    cell.isTransitioning ? 'opacity-0' : 'opacity-100'
                  }`}
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Footer Section ── */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-20 px-6 lg:px-16 overflow-hidden">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 flex flex-col md:flex-row gap-12 md:gap-20">

          {/* Logo & Address */}
          <div className="flex flex-col gap-6 md:w-1/3">
            <div className="font-black text-3xl tracking-tighter text-[#141414]">
              ARTEMIS
            </div>
            <div>
              <p className="font-bold text-[13px] text-gray-900 mb-1">University of Artemis</p>
              <p className="text-[13px] text-gray-600 mb-4 leading-tight">123 Innovative Way, Knowledge City, Global Hub</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[12px] font-medium border-b border-gray-100 pb-4 mb-4">
                <button onClick={() => goToPage('visit-us')} className="text-gray-600 hover:text-[#8A0000] transition-colors">Visit</button>
                <button onClick={() => goToPage('campus')} className="text-gray-600 hover:text-[#8A0000] transition-colors">Map</button>
                <button onClick={() => goToPage('campus')} className="text-gray-600 hover:text-[#8A0000] transition-colors">Events</button>
                <button onClick={() => goToPage('our-people')} className="text-gray-600 hover:text-[#8A0000] transition-colors">People</button>
                <button onClick={() => goToPage('jobs')} className="text-gray-600 hover:text-[#8A0000] transition-colors">Jobs</button>
                <button onClick={() => goToPage('contact-us')} className="text-gray-600 hover:text-[#8A0000] transition-colors">Contact</button>
              </div>
              <div className="flex gap-x-3 text-[12px] font-medium text-gray-500 mb-6">
                <button onClick={() => goToPage('about')} className="hover:text-[#8A0000] transition-colors">Privacy</button>
                <button onClick={() => goToPage('access-at-artemis')} className="hover:text-[#8A0000] transition-colors">Accessibility</button>
                <button onClick={() => goToPage('innovation')} className="hover:text-[#8A0000] transition-colors">Social Media Hub</button>
              </div>

              <div className="flex space-x-4 grayscale opacity-80 text-lg">
                <span className="cursor-pointer hover:opacity-100 hover:grayscale-0 transition-all">𝕏</span>
                <span className="cursor-pointer hover:opacity-100 hover:grayscale-0 transition-all text-blue-800 font-bold">f</span>
                <span className="cursor-pointer hover:opacity-100 hover:grayscale-0 transition-all text-red-600">▶</span>
                <span className="cursor-pointer hover:opacity-100 hover:grayscale-0 transition-all">📷</span>
              </div>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <button onClick={() => goToPage('education')} className="text-[13px] font-bold text-gray-900 text-left hover:text-[#8A0000] transition-colors">Education</button>
              <button onClick={() => goToPage('admissions')} className="text-[13px] font-bold text-gray-900 text-left hover:text-[#8A0000] transition-colors">Admissions + Aid</button>
              <button onClick={() => goToPage('about')} className="text-[13px] font-bold text-gray-900 text-left hover:text-[#8A0000] transition-colors">About Artemis</button>
              <button onClick={() => goToPage('fundraising')} className="text-[13px] font-bold text-gray-900 text-left hover:text-[#8A0000] transition-colors">Give</button>
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={() => goToPage('research')} className="text-[13px] font-bold text-gray-900 text-left hover:text-[#8A0000] transition-colors">Research</button>
              <button onClick={() => goToPage('campus')} className="text-[13px] font-bold text-gray-900 text-left hover:text-[#8A0000] transition-colors">Campus Life</button>
              <button className="text-[13px] font-bold text-gray-900 text-left hover:text-[#8A0000] transition-colors">Alumni</button>
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={() => goToPage('innovation')} className="text-[13px] font-bold text-gray-900 text-left hover:text-[#8A0000] transition-colors">Innovation</button>
              <button className="text-[13px] font-bold text-gray-900 text-left hover:text-[#8A0000] transition-colors">News</button>
              <button className="text-[13px] font-bold text-gray-900 text-left hover:text-[#8A0000] transition-colors">Lifelong Learning</button>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
