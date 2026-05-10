---
Task ID: 1
Agent: Main Agent
Task: Import GitHub project https://github.com/walkerx11/artemis-site-006

Work Log:
- Cloned repository from https://github.com/walkerx11/artemis-site-006 to /home/z/my-project/artemis-site-006
- Explored project structure: Next.js 16 university website ("University of Artemis") with Tailwind CSS 4, shadcn/ui, Prisma (SQLite), Framer Motion, react-simple-maps, recharts
- Installed all dependencies via `bun install` (850 packages)
- Generated Prisma client and pushed schema to SQLite database at /home/z/my-project/db/custom.db
- Fixed next.config.ts to add allowedDevOrigins for preview domain
- Started dev server on port 3000 — verified HTTP 200 response

Stage Summary:
- Project successfully imported and running at http://localhost:3000
- Key tech stack: Next.js 16.1.3, React 19, Tailwind CSS 4, shadcn/ui, Prisma 6 (SQLite), Bun
- The project is a client-side SPA with state-based routing (ArtemisApp component manages pages via useState)
- Main sections: Home, Research, Education, Innovation, Admissions, Campus Life, Colleges, About, The University
- Database: SQLite with User and Post models
