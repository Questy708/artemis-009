# Task 2-e: Rebuild OurPeople.tsx

## Summary
Rebuilt `/home/z/my-project/src/components/artemis/OurPeople.tsx` from a minimal page (title, description, 4 link rows) into a full, detailed page matching the Artemis design language.

## What was built
The component now includes all 8 required sections:

1. **Breadcrumb** — Sticky sub-header: About / Our People
2. **Hero section** — Full-width grayscale image (Unsplash: group of people) with overlay, "Our People" heading in uppercase, red line accent label "The Artemis Community", and description text
3. **Explore link rows** — Section divider label + 4 chevron-arrow link rows: University Officers, Famous Artemisians, Women making history, Professor of Poetry
4. **Leadership section** — Red line accent + "Guiding the guild" heading + description + 2x2 grid of leadership profile cards with grayscale portrait images, hover effects (grayscale-0, scale-105), name/title/role/bio:
   - Chancellor Abraham Kyeyune (Founder)
   - Provost Dr. Elara Vance (Academic Affairs)
   - Dean Prof. Julian Sarkis (School of Engineering)
   - Guild Chair Dr. Amara Osei (Research Guild)
5. **Faculty Spotlight** — Section divider + card-and-image parallax section (white card overlay on grayscale background image with gradient overlay) matching the Research page pattern
6. **By the Numbers** — Red line accent + stats with left border accent (crimson): 3,500+ staff, 1,200+ faculty, 140+ countries, 85% satisfaction
7. **Working at Artemis** — Section divider + two-column layout with CTA (underline border-b-2 border-[#8A0000]) linking to jobs page + related link rows
8. **SubPageFooter** — Included at the bottom

## Design language compliance
- Crimson #8A0000 as sole accent
- #141414 for strong headings
- Section dividers with border-t + uppercase labels
- Red line accent (w-8 h-[1px] bg-[#8A0000] + label)
- Grayscale images with hover effects (grayscale group-hover:grayscale-0 group-hover:scale-105)
- Stats with left border accent (bg-[#8A0000] vertical line)
- Link rows with chevron arrows
- Underline CTAs: border-b-2 border-[#8A0000]
- max-w-[1000px] content width
- Scroll-triggered animations via IntersectionObserver (useState + useEffect pattern using `useInView` hook)

## Images used
- Hero: `https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=1800`
- Faculty parallax: `https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1400`
- Leader portraits: Unsplash portrait images with grayscale filter

## Artemis lore
- University of Artemis: futuristic, decentralized, global university network
- Founder Abraham Kyeyune referenced in leadership bio
- Dr. Elara Vance, Prof. Julian Sarkis, Dr. Amara Osei from OurHistory lore
- References to "guild", "nodes", "distributed scholars", "Artemis Trust"
