import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, VideoIcon, FolderIcon, Settings } from "lucide-react";

export const DATA = {
  name: "Prasenjit Nayak",
  initials: "PN",
  url: "https://github.com/StarKnightt/prasendev",
  location: "Odisha, India",
  locationLink: "https://www.google.com/maps/place/odisha",
  description:
    "",
  summary:
    "Currently **freelancing** and **collaborating** with new people on exciting projects.\n\nI love playing [video games](https://www.youtube.com/@StarKnight-12) and share thoughts on tech [here](https://www.youtube.com/@Star_Knight12).\n\nHere's what I think about the [future of computer science](https://www.prasen.dev/blog/hello-world).\n\nI also enjoy [touch typing](https://monkeytype.com/profile/prasenj4551R) in my free time.",

  avatarUrl: "/hi.webp",
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "TailwindCSS",
    "Git",
    "REST APIs",
    "Framer Motion"
  ],
  setup: [
    {
      title: "Gears Used",
      description: "Productivity tools and gadgets I use daily.",
      href: "/gadgets",
      icon: Settings,
    },
  ],
  videos: [
    {
      title: "Track Your Coding time for free",
      description: "Learn how to track your code time with complete analytics and insights.",
      thumbnail: "/video1.avif",
      url: "https://youtu.be/tBatfQjWxCg?si=sy2vZbCHoIYNME-3",
      date: "2024-05-15"
    },
    {
      title: "Fix multi-cursor in VS Code",
      description: "Simple trick to fix multi-cursor in VS Code.",
      thumbnail: "/video2.avif",
      url: "https://youtu.be/E9h7M6ZK_tA?si=ykzV7ARU4VMnbBRo",
      date: "2024-07-01"
    },
    {
     title: "Twitter(X)'s monetization (Hindi)",
     description: "Is the policy broken? Let's find out.",
     thumbnail: "/video3.avif",
     url: "https://youtu.be/Z3h1jt6jKLY?si=blL4l4FNco9WW9FT",
     date: "2024-11-04"
    },
    {
      title:"How to fix any kind of ban in twitter (Hindi)",
      description: "Learn how to fix any kind of ban in twitter.",
      thumbnail: "/video4.avif",
      url:"https://youtu.be/P7JRFrcXlQU",
      date: "2024-12-24"
    },
    {
      title:"Microsoft's new shocking move (Hindi)",
      description: "GitHub Copilot is now free for everyone, let's see what's the catch.",
      thumbnail: "/video5.avif",
      url:"https://www.youtube.com/watch?v=uIJOUe8T3_I",
      date: "2024-12-19"
    },
    {
      title:"How to run DeepSeek R1 model locally (Hindi)",
      description:"Learn how to run DeepSeek R1 model locally, in easy steps",
      thumbnail: "/video6.avif",
      url:"https://youtu.be/BgB2pW6QgVg",
      date: "2025-01-29"
    },
    {
      title:"How to do zoom in and out video recording in Windows for free. (Hindi)",
      description:"Learn how to do zoom in and out video recording in Windows for free.",
      thumbnail: "/video7.avif",
      url:"https://youtu.be/WziGdEiT9fE",
      date: "2025-03-16"
    },
    {
      title:"I Finally Got My FIRST PC!",
      description: "In this video I talked about my first PC, overall experience was really good, I also talked about the components that I used in the PC in details as well as why to use them and why not.",
      thumbnail: "/video8.avif",
      url:"https://youtu.be/vHTbqgmB2U8",
      date: "2025-05-06"
    },
    {
      title:"How to Get Free Subscriptions for Notion, Cursor, Google, Perplexity & Free Domain Names (Hindi)",
      description: "In this video I talked about how to get free subscriptions for Notion, Cursor, Google, Perplexity & Free Domain Names.",
      thumbnail: "/video9.avif",
      url:"https://youtu.be/0Up-SjeSwI0",
      date: "2025-08-27"
    },
    {
      title:"The Truth About My 2025: Wins, Losses, & Regrets",
      description: "In this video, I break down the specific wins and devastating losses that defined my year, and the critical lessons I learned from them. This isn't just a highlight reel, it’s an honest look at what it takes to grow when life hits hard.",
      thumbnail: "/video10.avif",
      url:"https://youtu.be/iXPFdG9Ft7E",
      date: "2025-12-23"
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
      company: "Confidential",
      href: "#",
      badges: ["NDA"],
      location: "Remote",
      title: "Full Stack Developer",
      logoUrl: "/nda-company.svg",
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
