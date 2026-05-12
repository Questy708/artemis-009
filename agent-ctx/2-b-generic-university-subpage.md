# Task 2-b: GenericUniversitySubpage Rebuild

## Summary
Rebuilt `/home/z/my-project/src/components/artemis/GenericUniversitySubpage.tsx` from a placeholder "records pending migration" page into a smart template that generates rich, detailed content based on the `title` prop.

## What was done
- Removed the placeholder content
- Created 4 distinct page components, switched by `title` prop:
  1. **FactsAndFigures** — Key stats grid (26K+ scholars, 20 micro-colleges, etc.), student demographics with progress bars, research growth bar chart, financial overview, and download links
  2. **ArtemisGlossary** — 16 terms (ACN, Guild System, Living Commons, etc.) in a two-column layout with crimson accent dots for core terms
  3. **OurEstate** — Physical hub cards (6 global hubs with images), digital estate features (Commons, Research Cloud, Infinite Library), sustainability stats, and exploration links
  4. **Brand** — Brand philosophy, color palette swatches, typography specimens, logo usage (correct/incorrect), tone of voice guidelines, and brand asset download links

## Design Language Applied
- Crimson #8A0000 as sole accent
- #141414 for strong headings
- Section dividers with flex-grow borders + uppercase label
- Red line accent labels
- Grayscale hero images with hover-to-color effect
- Stats with left border accent
- Link rows with chevron arrows
- Underline CTAs with border-b-2 border-[#8A0000]
- max-w-[1000px] content width
- Scroll-triggered animations via IntersectionObserver (useScrollReveal hook)
- Proper breadcrumb header (About / The University / title)
- SubPageFooter included

## Lint
No lint errors in this file. Pre-existing lint errors in About.tsx (react-hooks/refs) are unrelated.
