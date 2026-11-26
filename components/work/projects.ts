import type { ProjectCardProps } from "./ProjectCard";

type SelectedProject = ProjectCardProps & {
  storyHref: string;
  summary: string;
  wordmark?: boolean;
};

export const projects: readonly SelectedProject[] = [
  {
    title: "IT Intern - AI Agent Optimization",
    summary: "At FoxLogger, I refined how Operon matches support questions to SQL queries so agents get answers from the right data.",
    wordmark: true,
    dates: "July 2026 - September 2026",
    description: "Interned at FoxLogger, specializing in prompt engineering and the refinement of the AI Agent's semantic layer. I applied a structured development lifecycle: gathering user requirements, designing prompt iterations, and refining structured outputs (SQL/JSON) to improve accuracy, reduce hallucinations, and ensure seamless intent translation.",
    tags: ["FoxLogger", "Prompt Engineering", "Semantic Routing", "SQL", "JSON"],
    image: "/image/foxlogger-intern.png",
    storyHref: "/blog/foxlogger-internship",
  },
  {
    title: "SIMASU Web (Sistem Informasi Masjid)",
    summary: "I built a web workspace for Masjid Syamsul Ulum to manage inventory and community schedules.",
    dates: "2024",
    description: "Developed a comprehensive web-based management system for Masjid Syamsul Ulum. It streamlines inventory, scheduling, and administrative tasks using modern backend architecture.",
    tags: ["Laravel", "PHP", "SQLite", "Tailwind CSS"],
    image: "/image/SIMASU-Web.png",
    storyHref: "/blog/simasu-web",
  },
  {
    title: "Aplikasi Mobile SIMASU",
    summary: "I brought mosque schedules and administrative tools to a Flutter app connected to SIMASU.",
    dates: "2024",
    description: "Built the mobile counterpart for the SIMASU ecosystem. Designed to provide quick access to mosque schedules and administrative tools on the go.",
    tags: ["Flutter", "Dart", "REST API"],
    image: "/image/SIMASU-Mobile.png",
    storyHref: "/blog/simasu-mobile",
  },
  {
    title: "Gary's Personal Portfolio",
    summary: "I built an interactive portfolio for Gary, bringing his work into a 3D scene on the web.",
    dates: "Aug 2026",
    description: "Developed a high-performance personal portfolio website focusing on seamless animations, modern UI/UX design, and optimized performance using React and CSS Modules.",
    tags: ["Next.js", "Three.js", "GSAP", "Blender"],
    image: "/image/Gary-Portfolio.png",
    storyHref: "/blog/gary-portfolio",
  },
];
