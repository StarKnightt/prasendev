import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, VideoIcon, FolderIcon, Settings, Wrench, Zap } from "lucide-react";
import { faReact, faNodeJs, faGitAlt, faTypescript, faTailwindCss, faDocker, faFigma, faGithub, faFirefoxBrowser, faBrave, faNotion, faPython, faJava, faJs, faHtml5, faCss3Alt } from "@fortawesome/free-brands-svg-icons";
import { faLeaf, faPlug, faBolt, faTerminal, faRocket, faServer, faDatabase, faCode } from "@fortawesome/free-solid-svg-icons";

export const DATA = {
  name: "Prasenjit Nayak",
  initials: "PN",
  url: "https://www.prasen.dev",
  location: "Odisha, India",
  locationLink: "https://www.google.com/maps/place/odisha",
  description:
    "",
  summary:
    "Currently **freelancing** and open to [**DevRel work**](mailto:prasen.nayak@hotmail.com), always up for collaborating on exciting projects.\n\nI love playing [video games](https://www.youtube.com/@StarKnight-12) and share thoughts on tech [here](https://www.youtube.com/@prasendev).\n\nHere's what I think about the [future of computer science](https://www.prasen.dev/blog/hello-world).\n\nI also enjoy [touch typing](https://monkeytype.com/profile/prasenx) in my free time, bullish on AI and future technologies",

  avatarUrl: "/prasen.webp",
  skills: [
    { name: "TypeScript", icon: faTypescript, category: "Languages" },
    { name: "JavaScript", icon: faJs, category: "Languages" },
    { name: "Python", icon: faPython, category: "Languages" },
    { name: "React", icon: faReact, category: "Frontend" },
    { name: "Next.js", customIcon: Icons.nextjs, category: "Frontend" },
    { name: "TailwindCSS", icon: faTailwindCss, category: "Frontend" },
    { name: "Framer Motion", icon: faBolt, category: "Frontend" },
    { name: "Node.js", icon: faNodeJs, category: "Backend" },
    { name: "MongoDB", icon: faLeaf, category: "Backend" },
    { name: "PostgreSQL", icon: faDatabase, category: "Backend" },
    { name: "Redis", icon: faDatabase, category: "Backend" },
    { name: "Git", icon: faGitAlt, category: "Tools" },
    { name: "Docker", icon: faDocker, category: "Tools" },
    { name: "Cursor", customIcon: Icons.cursor, category: "Tools" },
    { name: "Claude", customIcon: Icons.claude, category: "Tools" },
  ],
  setup: [
    {
      title: "Gears Used",
      description: "Productivity tools and gadgets I use daily.",
      href: "/gadgets",
      icon: Settings,
    },
    {
      title: "Tools I Use",
      description: "Software and apps I code with daily.",
      href: "/gadgets#tools",
      icon: Wrench,
    },
  ],
  tools: [
    {
      name: "Cursor",
      description: "AI-powered code editor built on VS Code — my primary IDE for all projects.",
      href: "https://cursor.com/referral?code=63BS4MRLZQQV",
      customIcon: Icons.cursor,
    },
    {
      name: "VS Code",
      description: "The classic. I still use it for quick edits and when I need specific extensions.",
      href: "https://code.visualstudio.com",
      customIcon: Icons.vscode,
    },
    {
      name: "Git Bash",
      description: "My go-to terminal on Windows for all git operations and shell scripting.",
      href: "https://gitforwindows.org",
      icon: faTerminal,
    },
    {
      name: "Postman",
      description: "API testing and documentation — essential for building and debugging REST APIs.",
      href: "https://www.postman.com",
      icon: faRocket,
    },
    {
      name: "Docker",
      description: "Containerization for consistent dev environments and easy deployments.",
      href: "https://www.docker.com",
      icon: faDocker,
    },
    {
      name: "Hostinger",
      description: "Reliable and affordable hosting for my projects and client sites.",
      href: "https://www.hostinger.com/in?REFERRALCODE=NP4PRASENELF",
      icon: faServer,
    },
    {
      name: "Firefox",
      description: "Privacy-first browser I use for everyday browsing and web development.",
      href: "https://www.mozilla.org/firefox",
      icon: faFirefoxBrowser,
    },
    {
      name: "Brave",
      description: "Fast, ad-free browser — my secondary pick for a clean browsing experience.",
      href: "https://brave.com",
      icon: faBrave,
    },
    {
      name: "Figma",
      description: "Design tool for UI mockups, prototyping, and collaborating on layouts.",
      href: "https://www.figma.com",
      icon: faFigma,
    },
    {
      name: "GitHub",
      description: "Where all my code lives — version control, CI/CD, and open source contributions.",
      href: "https://github.com",
      icon: faGithub,
    },
    {
      name: "Vercel",
      description: "One-click deploys for all my Next.js apps with instant previews.",
      href: "https://vercel.com",
      icon: faRocket,
    },
    {
      name: "Notion",
      description: "Notes, task management, and documentation — my second brain.",
      href: "https://www.notion.so",
      icon: faNotion,
    },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/videos", icon: VideoIcon, label: "Videos" },
    { href: "/projects", icon: FolderIcon, label: "Projects" },
    { href: "/gadgets", icon: Icons.shop, label: "Gadgets" },
  ],
  contact: {
    email: "prasen.nayak@hotmail.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/StarKnightt",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/prasenjitnayak/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/prasenx",
        icon: Icons.x,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://youtube.com/@prasendev",
        icon: Icons.youtube,
        navbar: true,
      },
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/prasenn_x/",
        icon: Icons.instagram,
        navbar: true,
      },
      Steam: {
        name: "Steam",
        url: "https://s.team/p/hpdv-frbg/prvbvwtg",
        icon: Icons.steam,
        navbar: true,
      },
      CodePen: {
        name: "CodePen",
        url: "https://codepen.io/StarKnightt",
        icon: Icons.codepen,
        navbar: true,
      },
      Discord: {
        name: "Discord",
        url: "https://discord.com/users/878205528570990602",
        icon: Icons.discord,
        navbar: true,
      },
      buyMeACoffee: {
        name: "buyMeACoffee",
        url: "https://buymeacoffee.com/prasen",
        icon: Icons.buyMeACoffee,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "mailto:prasen.nayak@hotmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "smart huh :)",
      href: "#",
      badges: ["NDA"],
      location: "",
      title: "Frontend Developer",
      logoUrl: "/company.png",
      start: "December 2025",
      end: "August 2026",
      description:
        "Gatekeeping this one because of NDA. Worked on exciting stuff though!",
      redacted: true,
    },
    {
      company: "Freelance",
      href: "https://github.com/StarKnightt",
      badges: [],
      location: "Remote",
      title: "Frontend Developer",
      logoUrl: "/freelance.webp",
      start: "2025",
      end: "Present",
      description:
        "Delivering web solutions for startups and small businesses. Building responsive UIs with React/Next.js, integrating third-party APIs, and deploying production-ready applications.",
    },
    {
      company: "v0 by Vercel",
      href: "https://v0.app/@starknightt",
      badges: [],
      location: "Remote",
      title: "v0 Ambassador",
      logoUrl: "/v0dev_logo.webp",
      start: "2025",
      end: "2026",
      description: "Community ambassador for Vercel's AI-powered UI generation tool. Created and shared projects, helped developers adopt v0 for rapid prototyping.",
    },
  ],
  education: [
    {
      school: "Trident Academy Of Technology",
      href: "https://tat.ac.in/",
      degree: "B.Tech in Computer Science and Information Technology",
      logoUrl: "/buildspace.webp",
      start: "2020",
      end: "2024",
    },
    {
      school: "Netaji Subhas Memorial City College",
      href: "https://www.nsmcity.ac.in/index.asp",
      degree: "Higher Secondary",
      logoUrl: "/waterloo.webp",
      start: "2019",
      end: "2020",
    },
  ],
  projects: [
    {
      title: "Outbuilt",
      href: "https://outbuilt.lol",
      dates: "August 2026",
      active: true,
      description:
        "A pay-to-rank public leaderboard. No logins, no algorithms. Your rank is exactly what you paid for, and anyone can outbid you. Already generating revenue.",
      technologies: [
        "Next.js",
        "React 19",
        "TypeScript",
        "Supabase",
        "Dodo Payments",
        "Tailwind CSS v4",
      ],
      links: [
        {
          type: "Website",
          href: "https://outbuilt.lol",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "https://video.gumlet.io/6745e593080b60408ca085f7/6a8ef3e50784f723ea1a0908/download.mp4",
      poster: "https://video.gumlet.io/6745e593080b60408ca085f7/6a8ef3e50784f723ea1a0908/thumbnail-1-0.png?v=1787753505658",
    },
    {
      title: "Jungle Trail",
      href: "https://starknightt.github.io/jungle-trail/",
      dates: "August 2026",
      active: true,
      description:
        "A fully procedural first-person jungle in Three.js. Every texture, mesh, and sound is generated in code — zero external art assets. The debug overlay was a PR from the CTO of Xbox.",
      technologies: [
        "Three.js",
        "JavaScript",
        "WebAudio API",
        "Procedural Generation",
      ],
      links: [
        {
          type: "Website",
          href: "https://starknightt.github.io/jungle-trail/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/StarKnightt/jungle-trail",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://video.gumlet.io/6745e593080b60408ca085f7/6a7223daec8c132ca29227c6/download.mp4",
      poster: "https://video.gumlet.io/6745e593080b60408ca085f7/6a7223daec8c132ca29227c6/thumbnail-1-0.png?v=1785865438030",
    },
    {
      title: "Night Street",
      href: "https://night-street.vercel.app/",
      dates: "August 2026",
      active: true,
      description:
        "A photorealistic city street at golden hour you can walk through in the browser. Zero external assets — every texture, mesh, and sound is generated in code. Featured by the official Claude account on X.",
      technologies: [
        "Three.js",
        "React Three Fiber",
        "TypeScript",
        "GLSL Shaders",
        "WebAudio API",
        "Procedural Generation",
      ],
      links: [
        {
          type: "Website",
          href: "https://night-street.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/StarKnightt/night-street",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://video.gumlet.io/6745e593080b60408ca085f7/6a8eedb10784f723ea19e7df/download.mp4",
      poster: "https://video.gumlet.io/6745e593080b60408ca085f7/6a8eedb10784f723ea19e7df/thumbnail-1-0.png?v=1787752082926",
    },
    {
      title: "PayBrackets",
      href: "https://paybrackets.com",
      dates: "June 2026 - Present",
      active: true,
      description:
        "A free US take-home pay calculator for the 2026 tax year, covering all 50 states and D.C. Over 160 programmatic pages with federal and state tax breakdowns, hourly to salary conversion, and instant client-side paycheck math built from IRS and Tax Foundation data.",
      technologies: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS v4",
        "Programmatic SEO",
        "Vercel",
      ],
      links: [
        {
          type: "Website",
          href: "https://paybrackets.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "https://video.gumlet.io/6745e593080b60408ca085f7/6a460104e4e7cc890ee9e003/download.mp4",
      poster: "https://video.gumlet.io/6745e593080b60408ca085f7/6a460104e4e7cc890ee9e003/thumbnail-1-0.png?v=1782972766299",
    },
    {
      title: "Next.js Learning",
      href: "https://learn.prasen.dev/",
      dates: "May 2026 - Present",
      active: true,
      description:
        "A free, open-source interactive learning platform for mastering Next.js with 17 structured chapters from basics to production patterns. Features Ctrl+K search, in-site video player, interactive architecture diagrams, and neo-brutalism design.",
      technologies: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS v4",
        "Framer Motion",
        "Vercel",
      ],
      links: [
        {
          type: "Website",
          href: "https://learn.prasen.dev/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/StarKnightt/Next.JS-Learning",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://video.gumlet.io/6745e593080b60408ca085f7/6a16bc92d99287327250b129/download.mp4",
    },
    {
      title: "Backrooms: Level 0",
      href: "https://backroom-escape.vercel.app/",
      dates: "June 2026",
      active: true,
      description:
        "A first-person survival horror game running entirely in the browser. Every asset, texture, sound, and the monster are generated procedurally at runtime. Features A* pathfinding AI, procedural PBR textures, synthesized audio, and custom post-processing shaders.",
      technologies: [
        "Next.js 16",
        "Three.js",
        "TypeScript",
        "WebAudio API",
        "GLSL Shaders",
        "Procedural Generation",
      ],
      links: [
        {
          type: "Website",
          href: "https://backroom-escape.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/StarKnightt/Backroom-Escape",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://video.gumlet.io/6745e593080b60408ca085f7/6a2fb2faffbd5132b8c3d72a/download.mp4",
    },
    {
      title: "Dateup",
      href: "https://dateup.in",
      dates: "April 2026 - Present",
      active: true,
      description:
        "An AI-powered dating profile optimizer that helps you get more matches. Features AI photo enhancement, a rizz assistant for conversation starters, and a profile reviewer for actionable feedback.",
      technologies: [
        "Next.js",
        "Supabase",
        "TypeScript",
        "TailwindCSS",
        "xAI Grok",
        "OpenAI",
        "Groq",
        "Dodo Payments",
      ],
      links: [
        {
          type: "Website",
          href: "https://dateup.in",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "https://video.gumlet.io/6745e593080b60408ca085f7/69fc6b4498a4e5006b3c5cb6/download.mp4",
    },
    {
      title: "CleanType",
      href: "https://clean-type.vercel.app/",
      dates: "March 2025 - April 2025",
      active: true,
      description:
        "A super minimalist write experience, type with minimalist, no noise and distraction, completely fresh Windows app, with a clean UI and no ads, just pure writing experience.",
      technologies: [
        "Rust",
        "Tauri",
        "Typescript",
        "CSS",
        "Vite",
        "Git",
        "React",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.cleantype.software/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/StarKnightt/CleanType",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://video.gumlet.io/6745e593080b60408ca085f7/68011ca73ab3a7b826bbfac0/download.mp4",
    },
    {
      title: "Wallpaperz",
      href: "https://www.wallpaperz.in/",
      dates: "January 2025 - February 2025",
      active: true,
      description:
        "A modern wallpaper discovery platform where you can find stunning wallpapers and generate images with AI.",
      technologies: [
        "Next.js",
        "Git",
        "TailwindCSS",
        "Framer-motion",
        "TypeScript",
        "Imagekit",
        "shadcnUI",
        "DreamStudio",
        "Stability AI",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.wallpaperz.in/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/StarKnightt/wallpaperz",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://video.gumlet.io/6745e593080b60408ca085f7/67d5057eefcecbdea7560e35/download.mp4",
    },
    {
      title: "3D Carousel Gallery",
      href: "https://3dcarousell.vercel.app/",
      dates: "December 2024 - January 2025",
      active: true,
      description:
        "A beautiful and interactive 3D carousel gallery built with Next.js, featuring image and video support with an integrated music player.",
      technologies: [
        "Next.js",
        "CSS 3D Transform",
        "SoundCloud Widget API",
        "Modern-Javascript",
        "Vercel",
        "Git",
      ],
      links: [
        {
          type: "Website",
          href: "https://3dcarousell.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/StarKnightt/3D-Carousel",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://video.gumlet.io/6745e593080b60408ca085f7/67912b93d696a7af3b2e38ef/download.mp4",
    },
  ],
  hackathons: [
    {
      title: "Smart India Hackathon 2022",
      dates: "March 23rd - 25th, 2022",
      location: "Bhubaneswar, India",
      description:
        "Built 'EducationX' - an e-learning portal with free and premium educational content. Implemented user authentication, course management, and payment integration.",
      image:
        "/smart-india-hackathon.webp",
      mlh: "https://github.com/Synchrotek/E-LearningX",
      links: [],
    },
    {
      title: "Smart India Hackathon 2023",
      dates: "December 19th - 23rd, 2023",
      location: "Bhubaneswar, India",
      description:
        "Built 'NexusLink' - a real-time collaborative coding platform with multi-user editing, integrated chat, and project management features using WebSockets.",
      image:
        "/logo.webp",
      mlh: "https://nexuslink01v.netlify.app/",
      links: [],
    },
  ],
} as const;
