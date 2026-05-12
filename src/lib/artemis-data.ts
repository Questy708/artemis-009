export const articles = [
  {
    id: 1,
    title: "The Infinite Learning Continuum",
    summary: "In 2100, we reflect on the era when Artemis revolutionized global education by introducing the Infinite Learning Continuum (ILC), transforming learning into a lifelong journey without boundaries. This radical shift decoupled knowledge acquisition from chronological age, allowing students to weave academic rigor into the fabric of their entire lives, supported by a synchronous network of global mentors.",
    category: "Education",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Centers of Inquiry",
    summary: "Unlike the siloed departmental model of the past, the Centers of Inquiry were designed as interdisciplinary hubs of innovation and discovery. Building new ecosystems of research.",
    category: "Research",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Adaptive Paced Learning",
    summary: "Breaking free from rigid timelines and embracing personalized learning journeys. Education that adapts to the rhythm of every student's learning cycles.",
    category: "Innovation",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Purpose Learning: Mission over Major",
    summary: "Reflecting from the year 2100, we look back at when Artemis University students began declaring missions, not majors, transforming education into a deeply personal and globally impactful journey.",
    category: "Philosophy",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    title: "The Synchronous Global Campus",
    summary: "As we entered the 22nd century, the concept of 'campus' shifted from a physical location to a state of being. Through the synchronicity of our 20 micro-colleges, students now experience a unified academic culture regardless of their latitude or longitude.",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
  }
];

export const heroContent = {
  title: "The Artemis Project",
  subtitle: "Welcome to the University Of Artemis: Re-engineering humanity's approach to learning in an accelerating world.",
  image: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?auto=format&fit=crop&q=80&w=2400"
};

export interface BlogArticle {
  id: number;
  title: string;
  summary: string;
  category: string;
  image: string;
  date: string;
  author: string;
  slug: string;
}

export const blogArticles: BlogArticle[] = [
  {
    id: 1,
    title: "Announcing the Founding Campaign: A Billion-Dollar Vision for the Future of Learning",
    summary: "The University of Artemis has officially launched its founding campaign, seeking to raise one billion dollars to endow the first truly global university. With pledges already exceeding three hundred million from founding partners across four continents, the campaign represents the largest philanthropic effort in higher education since the establishment of the Gates Millennium Scholars Program. Every dollar funds a seat at a table where disciplines converge and horizons expand.",
    category: "Campaign",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800",
    date: "May 12, 2026",
    author: "Office of the President",
    slug: "announcing-the-founding-campaign",
  },
  {
    id: 2,
    title: "The Synthetic Humanity Project: When Machines Learn to Think With Us",
    summary: "A cross-center initiative spanning twelve faculty and four micro-colleges, the Synthetic Humanity Project is exploring what happens when artificial intelligence becomes a genuine cognitive partner rather than a mere tool. Early findings suggest that symbiotic human-AI reasoning can double creative output while preserving moral agency — a result that challenges the prevailing narrative of automation as displacement.",
    category: "Research",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    date: "May 5, 2026",
    author: "Center for Synthetic Intelligence",
    slug: "synthetic-humanity-project",
  },
  {
    id: 3,
    title: "Bio-Regenerative Systems: Growing the Infrastructure of Tomorrow",
    summary: "Researchers at the Center for Bio-Regenerative Arts have achieved a breakthrough in self-healing building materials, demonstrating concrete-like composites that repair micro-fractures using embedded bacterial colonies. The technology, originally developed for deep-sea habitats, is now being adapted for earthquake-prone urban zones — bringing science fiction construction methods into real-world application within the decade.",
    category: "Research",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800",
    date: "Apr 28, 2026",
    author: "Center for Bio-Regenerative Arts",
    slug: "bio-regenerative-systems-breakthrough",
  },
  {
    id: 4,
    title: "First Cohort Arrives: 120 Students from 34 Countries Begin Their Artemis Journey",
    summary: "The inaugural class of the University of Artemis has arrived, bringing together 120 students from 34 countries in what admissions officers are calling the most globally diverse founding cohort in modern higher education. Students will rotate through six hostel cities over four years, studying in small seminar groups while contributing to real research from day one. Their first week features a convocation address streamed live from Valletta, Malta.",
    category: "Campus Life",
    image: "https://images.unsplash.com/photo-1523050335102-c3250d857224?auto=format&fit=crop&q=80&w=800",
    date: "Apr 20, 2026",
    author: "Office of Admissions",
    slug: "first-cohort-arrives",
  },
  {
    id: 5,
    title: "The Forge Incubator: From Dissertation to Deployment in Twelve Months",
    summary: "The Artemis Forge incubator has announced its inaugural portfolio of eight ventures, each spun directly from ongoing Center research. From a climate-adaptation analytics platform to a neurotechnology interface for accessibility, these ventures represent a new model for university entrepreneurship — one where commercialization is embedded in the research process from the start, not bolted on as an afterthought.",
    category: "Innovation",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800",
    date: "Apr 14, 2026",
    author: "The Forge",
    slug: "forge-incubator-inaugural-portfolio",
  },
  {
    id: 6,
    title: "Cosmological Data Observatory: Mapping the Universe with Petabytes and Purpose",
    summary: "The Center for Cosmological Humanities has partnered with three global telescope networks to process over twelve petabytes of observational data using novel AI algorithms developed in-house. The initiative, which combines astrophysics with philosophical inquiry, aims not merely to map the large-scale structure of the universe but to ask what it means for a species on a small blue planet to comprehend the cosmos.",
    category: "Research",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800",
    date: "Apr 7, 2026",
    author: "Center for Cosmological Humanities",
    slug: "cosmological-data-observatory",
  },
  {
    id: 7,
    title: "Founding Partners: Why Three Continents Bet on a New Kind of University",
    summary: "From a family foundation in Lagos to a sovereign wealth fund in Singapore, the founding partners of the University of Artemis share a conviction that the existing model of higher education is not merely incomplete — it is fundamentally misaligned with the challenges of the twenty-first century. This piece profiles five of the earliest backers and explores the philosophical and strategic reasoning behind their investment.",
    category: "Campaign",
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800",
    date: "Mar 30, 2026",
    author: "Office of Advancement",
    slug: "founding-partners-three-continents",
  },
  {
    id: 8,
    title: "Urban Futures Lab: Designing Cities That Adapt to Their People",
    summary: "The Center for Urban Futures has opened its simulation lab in Berlin, where researchers use immersive digital twins of real cities to test governance, infrastructure, and social policy interventions before they are deployed. Early experiments with adaptive traffic systems in Nairobi showed a thirty percent reduction in congestion without any new road construction — proving that the smartest city is one that learns, not one that merely automates.",
    category: "Research",
    image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&q=80&w=800",
    date: "Mar 22, 2026",
    author: "Center for Urban Futures",
    slug: "urban-futures-lab-cities-that-adapt",
  },
  {
    id: 9,
    title: "The Global Hackathon: 72 Hours, 20 Micro-Colleges, One Problem",
    summary: "Over one thousand students across all twenty Artemis micro-colleges participated in the inaugural Global Hackathon, a seventy-two-hour cross-node challenge to prototype solutions for equitable access to clean water. The winning team — a collaboration between nodes in Nairobi, Valletta, and Sao Paulo — developed a low-cost filtration monitoring system that is now being piloted in three communities across sub-Saharan Africa.",
    category: "Campus Life",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    date: "Mar 15, 2026",
    author: "Student Affairs",
    slug: "global-hackathon-72-hours",
  },
  {
    id: 10,
    title: "The Artemis Commons: Open Knowledge for an Open World",
    summary: "The University of Artemis has launched the Artemis Commons, an open-access research publishing platform that makes all center-funded research freely available to the global community. Built on principles of radical transparency, the Commons requires not only final papers but also datasets, methodologies, and negative results — ensuring that knowledge flows as freely across borders as the students who generate it.",
    category: "Innovation",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    date: "Mar 8, 2026",
    author: "Office of the Provost",
    slug: "artemis-commons-open-knowledge",
  },
];
