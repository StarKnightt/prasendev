import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, VideoIcon, FolderIcon, Settings, Wrench } from "lucide-react";
import { faReact, faNodeJs, faGitAlt, faTypescript, faTailwindCss, faDocker, faFigma, faGithub, faFirefoxBrowser, faBrave, faNotion } from "@fortawesome/free-brands-svg-icons";
import { faLeaf, faPlug, faBolt, faTerminal, faRocket, faServer } from "@fortawesome/free-solid-svg-icons";

export const DATA = {
  name: "Prasenjit Nayak",
  initials: "PN",
  url: "https://github.com/StarKnightt/prasendev",
  location: "Odisha, India",
  locationLink: "https://www.google.com/maps/place/odisha",
  description:
    "",
  summary:
    "Currently **freelancing** and **collaborating** with new people on exciting projects.\n\nI love playing [video games](https://www.youtube.com/@StarKnight-12) and share thoughts on tech [here](https://www.youtube.com/@Star_Knight12).\n\nHere's what I think about the [future of computer science](https://www.prasen.dev/blog/hello-world).\n\nI also enjoy [touch typing](https://monkeytype.com/profile/prasenj4551R) in my free time, bullish on AI and future technologies",

  avatarUrl: "/hi.webp",
  skills: [
    { name: "React", icon: faReact },
    { name: "Next.js", customIcon: Icons.nextjs },
    { name: "TypeScript", icon: faTypescript },
    { name: "Node.js", icon: faNodeJs },
    { name: "MongoDB", icon: faLeaf },
    { name: "TailwindCSS", icon: faTailwindCss },
    { name: "Git", icon: faGitAlt },
    { name: "REST APIs", icon: faPlug },
    { name: "Framer Motion", icon: faBolt },
    { name: "Claude", customIcon: Icons.claude },
    { name: "Cursor", customIcon: Icons.cursor },
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
      href: "https://cursor.com/home",
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
        url: "https://x.com/Star_Knight12",
        icon: Icons.x,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://youtube.com/@Star_Knight12",
        icon: Icons.youtube,
        navbar: true,
      },
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/starknight_143/",
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
      Vercel: {
        name: "Vercel",
        url: "https://v0.link/prasenjit-nayak",
        icon: Icons.vercel,
        navbar: true,
      },
      buyMeACoffee: {
        name: "buyMeACoffee",
        url: "https://buymeacoffee.com/prasen",
        icon: Icons.buyMeACoffee,
        navbar: true,
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
      end: "Present",
      description:
        "Gatekeeping this one because of NDA. Working on exciting stuff though!",
      redacted: true,
    },
    {
      company: "Stealth AI Startup",
      href: "https://www.linkedin.com/company/stealthaistartup/",
      badges: [],
      location: "Remote",
      title: "Full Stack Developer",
      logoUrl: "/stealth-ai.webp",
      start: "August 2025",
      end: "September 2025",
      description:
        "Built and shipped features in a fast-paced startup environment. Worked on React frontend components, integrated REST APIs, and collaborated with cross-functional teams on product delivery.",
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
      end: "Present",
      description: "Community ambassador for Vercel's AI-powered UI generation tool. Creating and sharing projects, helping developers adopt v0 for rapid prototyping.",
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
        "Stripe",
      ],
      links: [
        {
          type: "Website",
          href: "https://dateup.in",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/dateup.webp",
      video: "",
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
    {
      title: "GitHub Buddy Finder",
      href: "https://buddy-find.vercel.app/",
      dates: "April 2023 - September 2023",
      active: true,
      description:
        "This innovative web application helps developers connect with like-minded individuals based on their GitHub activity and language preferences.",
      technologies: [
        "React.js",
        "Octokit",
        "Rest API",
        "TailwindCSS",
        "react-icons",
        "react-router-dom",
        "Vite",
      ],
      links: [
        {
          type: "Website",
          href: "https://buddy-find.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/StarKnightt/Buddy-Finder",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://video.gumlet.io/6745e593080b60408ca085f7/6745ec82c84c6b7e105c3ee5/download.mp4",
    },
    {
      title: "Solar System",
      href: "https://solarrsystem.vercel.app/",
      dates: "September 2024 - October 2024",
      active: true,
      description:
        "This project is a visually stunning and interactive web application that provides information about the solar system and it's planet with music.",
      technologies: [
        "React.js",
        "font-awesome",
        "react-icons",
        "react-dom",
        "CSS3",
        "Vite",
        "Git",
      ],
      links: [
        {
          type: "Website",
          href: "https://solarrsystem.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://video.gumlet.io/6745e593080b60408ca085f7/6745ef75b79a267f99668bda/download.mp4",
    },
    {
      title: "Coffee-Website",
      href: "https://coffee-websitee.vercel.app/",
      dates: "September 2024 - October 2024",
      active: true,
      description:
        "A web app, with the futurisitc yet nostalgic design of a coffee shop, with a menu and blend of retro vibes.",
      technologies: [
        "React.js",
        "Git",
        "TailwindCSS",
        "Framer-motion",
        "React-icons",
        "React-router-dom",
      ],
      links: [
        {
          type: "Website",
          href: "https://coffee-websitee.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/StarKnightt/Coffee-Website",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://video.gumlet.io/6745e593080b60408ca085f7/6745ea2d080b60408ca0bc08/download.mp4",
    },
    {
      title: "Resume Builder",
      href: "https://resume-builder-ten-opal.vercel.app/",
      dates: "May 2023 - Sept 2023",
      active: true,
      description:
        "It was my final year [Project](https://github.com/StarKnightt/ResumeBuilder) in our college, It is a interactive and versatile Dynamic CV Builder, completely build from scratch with backend functionallity .",
      technologies: [
        "CSS",
        "javascript",
        "MongoDB",
        "Express.js",
        "HTML",
        "Regex",
        "Node.js",
      ],
      links: [
        {
          type: "Website",
          href: "https://builddresume.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/StarKnightt/ResumeBuilder",
          icon: <Icons.github className="size-3" />,
        },
      ],
      
      image: "",
      video:
        "https://video.gumlet.io/6745e593080b60408ca085f7/6745e5e5080b60408ca08984/download.mp4",
    }
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
