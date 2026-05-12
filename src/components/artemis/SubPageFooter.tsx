'use client';

import { useState, useEffect, useCallback } from 'react';

interface FooterProps {
  goToPage: (page: string) => void;
}

/* ─── Image pool: multiple sets so cells can rotate ─── */
const imageSets = [
  // Set A — primary images
  [
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1523050335102-c3250d857224?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=400",
  ],
  // Set B — secondary rotation images
  [
    "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=400",
  ],
  // Set C — tertiary rotation images
  [
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1521714161819-15534968fc5f?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1496247749665-49cf5bf875d4?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400",
  ],
];

export default function SubPageFooter({ goToPage }: FooterProps) {
  // Track which image set each cell is showing (9 cells, each cycles independently)
  const [cellSets, setCellSets] = useState<number[]>(() =>
    Array.from({ length: 9 }, () => 0)
  );
  const [cellTransitioning, setCellTransitioning] = useState<boolean[]>(
    Array.from({ length: 9 }, () => false)
  );

  const rotateCell = useCallback((index: number) => {
    // Start fade out
    setCellTransitioning(prev => {
      const next = [...prev];
      next[index] = true;
      return next;
    });

    // After fade out, switch image and fade back in
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

  // Staggered auto-rotation: rotate 2-3 cells at a time every 3 seconds
  useEffect(() => {
    let cycle = 0;
    const timer = setInterval(() => {
      // Rotate 2-3 cells per cycle, staggered so it feels organic
      const cellsToRotate: number[] = [];
      const base = cycle % 9;

      // Pick 2-3 cells that aren't adjacent for a natural feel
      cellsToRotate.push(base);
      cellsToRotate.push((base + 3) % 9);
      if (cycle % 2 === 0) {
        cellsToRotate.push((base + 6) % 9);
      }

      cellsToRotate.forEach((cellIdx, i) => {
        setTimeout(() => rotateCell(cellIdx), i * 200);
      });

      cycle++;
    }, 4000);

    return () => clearInterval(timer);
  }, [rotateCell]);

  // Build the 9-cell grid data (layout: featured cell at index 2 spans 2 cols + 2 rows)
  const cells = Array.from({ length: 9 }, (_, i) => {
    const setIdx = cellSets[i];
    const src = imageSets[setIdx][i];
    const isTransitioning = cellTransitioning[i];
    return { src, isTransitioning, index: i };
  });

  return (
    <div className="w-full shrink-0">
      {/* ── Photo Mosaic on Crimson ── */}
      <section className="py-12 overflow-hidden">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 bg-[#8A0000] py-8 sm:py-10">
          {/* Section label */}
          <div className="flex items-center space-x-3 mb-6">
            <span className="w-6 h-[1px] bg-white/40"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">Campus Life at Artemis</span>
          </div>

          {/* Gapless image mosaic */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 auto-rows-[140px] md:auto-rows-[170px] lg:auto-rows-[180px]">
            {cells.map((cell, i) => {
              // Index 2 is the large featured cell (2x2)
              const isFeatured = i === 2;
              return (
                <div
                  key={i}
                  className={`relative overflow-hidden bg-[#6B0000] ${
                    isFeatured
                      ? 'md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2'
                      : ''
                  }`}
                >
                  {/* Current image */}
                  <img
                    src={cell.src}
                    alt=""
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      cell.isTransitioning ? 'opacity-0' : 'opacity-100'
                    }`}
                    style={{ objectFit: 'cover' }}
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
                </div>
              );
            })}
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
