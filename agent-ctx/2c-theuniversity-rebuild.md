# Task 2-c: Rebuild TheUniversity.tsx

## Summary
Completely rewrote `/home/z/my-project/src/components/artemis/TheUniversity.tsx` to replace Oxford University content with Artemis content.

## Changes Made
- Removed all Oxford references (36 colleges, GLAM, Humanities Division, Oxford University Press, Oxford Lifelong Learning, etc.)
- Implemented full Artemis design language:
  - Crimson #8A0000 as sole accent color
  - #141414 for strong headings
  - Section dividers with `flex-grow border-t` pattern
  - Red line accent (`w-8 h-[1px] bg-[#8A0000]`) with uppercase labels
  - Grayscale images with hover-to-color effects
  - Stats with left border accent
  - Underline CTAs with `border-b-2 border-[#8A0000]`
  - `max-w-[1000px]` content width
  - Scroll-triggered animations via `useInView` hook (IntersectionObserver + useState + useEffect)

## Page Sections
1. **Breadcrumb**: About / The University
2. **Hero**: Full-width grayscale hero image with overlay, "The University" heading + description about federated network of autonomous micro-colleges
3. **Pages in this section**: Section divider + 5 link rows (Our history, Facts and figures, Artemis Glossary, Our estate, Brand)
4. **The Micro-Colleges**: Describes the 20 micro-colleges as autonomous academic units with unified curriculum and digital infrastructure
5. **Role of Micro-Colleges and the Network**: Two-column layout with white cards:
   - Left: What Micro-Colleges do (select/admit, housing/community, tutorials/mentorship)
   - Right: What the Artemis Network does (curriculum, lectures, research facilities, examinations, degrees)
6. **Schools and Research Divisions**: 7 schools in a 3-column grid with numbered cards
7. **Artemis University Press**: Publishing arm with description and image
8. **Artemis Lifelong Learning**: Continuing education with stats sidebar

## Notes
- Lint errors for `useInView` hook are pre-existing across the codebase (same pattern in Innovation.tsx)
- Uses SubPageFooter component
- Hero image uses the specified Unsplash URL
- All content uses Artemis lore (Abraham Kyeyune, 2024 founding, micro-colleges, etc.)
