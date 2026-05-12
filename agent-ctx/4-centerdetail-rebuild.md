# Task ID: 4 — CenterDetail.tsx Rebuild

## Agent: Main Agent

## Summary
Completely rewrote `/home/z/my-project/src/components/artemis/CenterDetail.tsx` with 15 fully-detailed Centers of Inquiry, replacing the previous 4-center version.

## What Changed
- **Before**: 4 centers (Synthetic Intelligence, Bio-Regenerative Arts, Cosmological Humanities, Neo-Economics)
- **After**: 15 centers with rich, substantive content for each

## The 15 Centers
1. Frontiers of Artemis Research (`frontiers-of-artemis-research`)
2. Civilization Architecture (`civilization-architecture`)
3. Planetary Systems (`planetary-systems`)
4. Space & Frontier Science (`space-frontier-science`)
5. Emerging Technologies (`emerging-technologies`)
6. Next-Gen Education (`next-gen-education`)
7. Materials, Matter & Manufacturing Futures (`materials-matter-manufacturing`)
8. Agriculture, Food Systems (`agriculture-food-systems`)
9. Robotics, Mechatronics & Physical Autonomy (`robotics-mechatronics-autonomy`)
10. Gaming & Worldbuilding (`gaming-worldbuilding`)
11. Energy Systems (`energy-systems`)
12. Health & Bioethics (`health-bioethics`)
13. Urban Futures (`urban-futures`)
14. Biotech & Life Sciences (`biotech-life-sciences`)
15. Fintech, DeFi & Economics (`fintech-defi-economics`)

## Design Language Applied
- Crimson `#8A0000` as sole accent color
- Section dividers: `<hr>` + uppercase tracking-widest labels
- Numbered labels: `01 — LABEL` style
- Grayscale images: `grayscale group-hover:grayscale-0 hover:scale-105`
- Red line accent: `<span className="w-8 h-[1px] bg-[#8A0000]"></span>` + uppercase label
- Underline CTAs: `border-b-2 border-[#8A0000]`
- max-w-[1000px] content width
- Minimal palette: white, gray-100, #8A0000, #141414, gray-600
- Scroll-triggered animations via useInView IntersectionObserver hook
- Sticky sub-header at `top-[50px]` z-40

## Component Structure
1. Sticky sub-header with back button → Centers of Inquiry
2. Hero section with grayscale image and overlay
3. Stats section (4 stats with crimson left border)
4. Overview section (3 paragraphs with section divider)
5. Focus Areas section (7 focus items with crimson dots, plus approach paragraph)
6. Four Pillars Detail (Core Investigators, Junior Fellows, Translational Programs, Technology Centers)
7. Featured Projects (3 projects with `01`/`02`/`03` numbering)
8. Other Centers section (ALL 14 other centers with underline CTAs)
9. SubPageFooter

## Content Requirements Met
- Each overview: 3 paragraphs × 150+ words = 450+ words total
- Each pillar (approach, coreInvestigators, translationalPrograms, technologyCenters, juniorFellows): 100+ words
- Each project desc: 80+ words
- All heroImg URLs use specified Unsplash images
- All slugs match the specified naming convention

## Verification
- Dev server running at localhost:3000 without compilation errors
- Lint: pre-existing ref warnings from useInView hook pattern (project-wide, not introduced by this task)
