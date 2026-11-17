export interface SpeakerOrMentor {
  name: string;
  role: string;
  company?: string;
  image?: string;
}

export interface WinnerItem {
  title: string;
  teamName?: string;
  image: string;
}

export interface JudgeItem {
  name: string;
  role?: string;
  image: string;
}

export interface TrackItem {
  title: string;
  description: string;
}

export interface RoundItem {
  title: string;
  date: string;
  description: string;
}

export interface YoutubeLinkItem {
  title: string;
  url: string;
  videoId?: string;
  session?: string;
}

export interface EventItem {
  id: number;
  slug: string;
  name: string;
  category: "Hackathon" | "Cohort" | "Alumni Talk" | "Workshop" | "Orientation";
  badge: string;
  date: string;
  year: string;
  timelineStatus: "Upcoming" | "Active" | "Past";
  location: string;
  attendeesCount?: string;
  prizePool?: string;
  image: string;
  cardImage?: string;
  shortSummary: string; // Exactly ~20 words for the card
  description: string; // Detailed multi-paragraph description with polished third-person tone
  highlights: string[];
  speakersOrMentors?: SpeakerOrMentor[];
  judges?: JudgeItem[];
  winners?: WinnerItem[];
  gallery?: string[];
  youtubeLinks?: YoutubeLinkItem[];
  bannerFormat?: "widescreen" | "square";
  officialLink?: string;
  whatsappLink?: string;
  perks?: string[];
  tracks?: TrackItem[];
  rounds?: RoundItem[];
  hasImagePlaceholders?: boolean;
}

export const eventsData: EventItem[] = [
  {
    id: 1,
    slug: "hackbpit-2k23",
    name: "HackBPIT 2k23",
    category: "Hackathon",
    badge: "Flagship Hackathon",
    date: "29-11-2023 to 30-11-2023",
    year: "2023",
    timelineStatus: "Past",
    location: "BPIT Main Auditorium, New Delhi",
    attendeesCount: "100+ Teams (400+ Hackers)",
    prizePool: "₹1,00,000 Total (₹50k Cash)",
    bannerFormat: "square",
    image: "/assets/event-photos/HackBPIT 2k23/Square Poster .jpg",
    cardImage: "/assets/event-photos/HackBPIT 2k23/Square Poster .jpg",
    shortSummary:
      "The premier 30-hour offline hackathon hosting 100+ national teams, elite industry mentorship, and an intense ₹1 Lakh prize pool.",
    description:
      "HackBPIT, the flagship hackathon of BPIT, is where innovative ideas meet real-world problem-solving! Hosted by Anveshan, HackBPIT 2023 drew an impressive 100+ teams from across the country, all competing for a total prize pool of 1 Lakh with a ₹50,000 cash prize.\n\nThis high-energy, 30-hour offline event brought together students, industry mentors, and tech enthusiasts to collaborate, create, and build impactful solutions. Participants faced challenging problem statements across multiple domains, encouraging them to think critically and work together under pressure. The event was not just about coding; it was a platform for learning, mentorship, and networking, offering valuable insights and lifelong industry connections for every attendee.",
    highlights: [
      "100+ Teams selected from 450+ nationwide applications",
      "30-hour non-stop offline hacking marathon",
      "Comprehensive mentorship and code reviews from industry leaders",
      "₹1,00,000 total prize pool featuring ₹50,000 cash prize and cloud credits",
    ],
    judges: [
      {
        name: "Pushan Verma",
        role: "Industry Mentor & Judge",
        image: "/assets/event-photos/HackBPIT 2k23/Pushan Verma.png",
      },
      {
        name: "Shriya Chabra",
        role: "Industry Mentor & Judge",
        image: "/assets/event-photos/HackBPIT 2k23/Shriya Chabra.png",
      },
      {
        name: "Shubham Prakash",
        role: "Industry Mentor & Judge",
        image: "/assets/event-photos/HackBPIT 2k23/Shubham Prakash.png",
      },
      {
        name: "Sawarnee Sethi",
        role: "Cloud Engineer @ AWS",
        image: "/assets/event-photos/HackBPIT 2k23/Swarnee Sethi.png",
      },
      {
        name: "Vaibhav Parashar",
        role: "Industry Mentor & Judge",
        image: "/assets/event-photos/HackBPIT 2k23/Vaibhav Parashar.png",
      },
    ],
    winners: [
      {
        title: "Champions (1st Place)",
        teamName: "HackBPIT Grand Winner",
        image: "/assets/event-photos/HackBPIT 2k23/Winner 1.jpg",
      },
      {
        title: "Runners-Up (2nd Place)",
        teamName: "HackBPIT 1st Runner Up",
        image: "/assets/event-photos/HackBPIT 2k23/Winner2.jpg",
      },
    ],
    gallery: [
      "/assets/event-photos/HackBPIT 2k23/Stage Photo 2.jpg",
      "/assets/event-photos/HackBPIT 2k23/Poster 1.jpg",
      "/assets/event-photos/HackBPIT 2k23/Winner 1.jpg",
      "/assets/event-photos/HackBPIT 2k23/Winner2.jpg",
    ],
  },
  {
    id: 2,
    slug: "meet-your-alumni-sawarnee-sethi",
    name: "Meet Your Alumni: Sawarnee Sethi",
    category: "Alumni Talk",
    badge: "Cloud & Placements",
    date: "18-03-2024",
    year: "2024",
    timelineStatus: "Past",
    location: "Audi 2 & Seminar Hall, BPIT",
    attendeesCount: "250+ Students",
    bannerFormat: "square",
    image: "/assets/event-photos/Meet Your Alumni/1.png",
    cardImage: "/assets/event-photos/Meet Your Alumni/1.png",
    shortSummary:
      "Exclusive career masterclass with AWS Cloud Engineer Sawarnee Sethi on cracking tech placements, interview prep, and industry transitions.",
    description:
      "Meet Your Alumni is a special initiative by Anveshan designed to connect BPIT students with accomplished alumni for invaluable career guidance. Anveshan hosted Mr. Sawarnee Sethi, a Cloud Engineer at AWS, who shared his expertise on internships and placements.\n\nIn this session, Mr. Sethi offered proven strategies for navigating the internship and placement process, preparing for rigorous technical interviews, and building a standout engineering profile. With his firsthand industry insights, students gained practical knowledge on transitioning from academic life to a successful, high-impact tech career.",
    highlights: [
      "Step-by-step roadmap for cloud infrastructure careers and AWS roles",
      "Deep dive into technical interview rounds and resume optimization",
      "Navigating on-campus assessments and off-campus referrals",
      "Interactive AMA answering real-time student placement queries",
    ],
    speakersOrMentors: [
      {
        name: "Sawarnee Sethi",
        role: "Cloud Support Engineer",
        company: "Amazon Web Services (AWS)",
        image: "/assets/event-photos/HackBPIT 2k23/Swarnee Sethi.png",
      },
    ],
    gallery: [
      "/assets/event-photos/Meet Your Alumni/1.png",
      "/assets/event-photos/Meet Your Alumni/3.png",
      "/assets/event-photos/Meet Your Alumni/4.png",
      "/assets/event-photos/Meet Your Alumni/7.jpg",
      "/assets/event-photos/Meet Your Alumni/9.jpg",
      "/assets/event-photos/Meet Your Alumni/10.jpg",
    ],
  },
  {
    id: 3,
    slug: "tech-starter-2k24",
    name: "Tech Starter 2k24",
    category: "Cohort",
    badge: "Foundational Bootcamp",
    date: "14-09-2024 to 17-10-2024",
    year: "2024",
    timelineStatus: "Past",
    location: "Hybrid (BPIT Campus Labs & Discord)",
    attendeesCount: "350+ Students",
    bannerFormat: "square",
    image: "/assets/event-photos/TechStarter 2k24/image.png",
    cardImage: "/assets/event-photos/TechStarter 2k24/image.png",
    shortSummary:
      "Month-long foundational engineering cohort covering full-stack web, Git, and DSA in C++ and Java with hands-on project building.",
    description:
      "Tech Starter was Anveshan's month-long foundational cohort, specially designed to equip students with essential skills across core tech domains. Led by Anveshan Core Team members, this immersive program included hands-on sessions on HTML & CSS, Git and GitHub, JavaScript, C++, Java, and an Introduction to Data Structures and Algorithms.\n\nEach session was crafted to provide a practical, beginner-friendly approach, allowing students to build confidence and solidify their understanding of these foundational topics. Tech Starter empowered participants with the knowledge and skills they need to embark on their tech journeys, whether diving into web development, coding fundamentals, or programming logic.",
    highlights: [
      "Hands-on web development with HTML, modern CSS, and JavaScript",
      "Version control mastery using Git, GitHub, and collaborative pull requests",
      "Programming logic building with C++ and Java fundamentals",
      "Core Data Structures & Algorithms problem-solving strategies",
      "Weekly guided mini-projects and milestone evaluations",
    ],
    youtubeLinks: [
      {
        title: "Tech Starter Session 1: HTML & CSS",
        session: "Session 01",
        url: "https://youtu.be/9CgtsqE4zp8?si=B8QULS46J3oMb1Ez",
        videoId: "9CgtsqE4zp8",
      },
      {
        title: "Tech Starter Session 2: Git & GitHub",
        session: "Session 02",
        url: "https://youtu.be/FeQdu4G277s?si=FR1Edvyu9rvnW0TA",
        videoId: "FeQdu4G277s",
      },
      {
        title: "Tech Starter Session 3: JavaScript",
        session: "Session 03",
        url: "https://youtu.be/YRV8HMhtEtI?si=BzJcY6aS_jZCdxAN",
        videoId: "YRV8HMhtEtI",
      },
      {
        title: "Tech Starter Session 4: C++",
        session: "Session 04",
        url: "https://youtu.be/poCevLxlVec?si=nxx7-zOezAFPiVfI",
        videoId: "poCevLxlVec",
      },
      {
        title: "Tech Starter Session 5: Java",
        session: "Session 05",
        url: "https://youtu.be/btuqoWA4Grg?si=_1EYAnJI9vx4XtAi",
        videoId: "btuqoWA4Grg",
      },
      {
        title: "Tech Starter Session 6: DSA",
        session: "Session 06",
        url: "https://youtu.be/XU8viBxXbJA?si=EiNlzr_bqo2YrJn8",
        videoId: "XU8viBxXbJA",
      },
      {
        title: "Anveshan Orientation 2024-25 & Cohort Kickoff",
        session: "Special Kickoff",
        url: "https://youtu.be/eLt6PspCsic?si=T28HxIvA1HZ3rfb6",
        videoId: "eLt6PspCsic",
      },
    ],
  },
  {
    id: 4,
    slug: "web3-and-blockchain-session",
    name: "Web3 & Blockchain Hands-on Workshop",
    category: "Workshop",
    badge: "Decentralized Tech",
    date: "28-12-2024",
    year: "2024",
    timelineStatus: "Past",
    location: "BPIT Main Seminar Hall & Online",
    attendeesCount: "200+ Developers",
    bannerFormat: "square",
    image:
      "/assets/event-photos/web3 and blockchain 2024/WhatsApp Image 2026-09-28 at 2.40.55 PM.jpeg",
    cardImage:
      "/assets/event-photos/web3 and blockchain 2024/WhatsApp Image 2026-09-28 at 2.40.55 PM.jpeg",
    shortSummary:
      "Hands-on decentralized workshop with QuillAI Network exploring smart contracts, Web3 protocols, blockchain security, and live dApp development.",
    description:
      "Anveshan collaborated with the QuillAI Network to host an intensive, hands-on workshop focused on building decentralized applications and unlocking the capabilities of modern blockchain architectures.\n\nThis high-energy technical masterclass covered smart contract engineering, Ethereum Virtual Machine (EVM) fundamentals, cryptographic security, and the convergence of autonomous AI agents with Web3 protocols. Developers engaged in live coding exercises, deploying interactive dApps and discovering opportunities within decentralized ecosystems.",
    highlights: [
      "Fundamentals of blockchain architecture and EVM smart contracts",
      "Hands-on smart contract deployment with Solidity and developer testnets",
      "Auditing best practices and smart contract vulnerability prevention",
      "Convergence of autonomous AI agents with decentralized protocols",
    ],
    speakersOrMentors: [
      {
        name: "QuillAI Network Engineers",
        role: "Core Blockchain & Security Researchers",
        company: "QuillAI Network",
      },
    ],
  },
  {
    id: 5,
    slug: "beyond-dsa",
    name: "Beyond DSA: Exploring Real-World Tech Opportunities",
    category: "Workshop",
    badge: "Industry Keynote",
    date: "10-11-2025",
    year: "2025",
    timelineStatus: "Past",
    location: "Room 6A, BPIT, New Delhi",
    attendeesCount: "180+ Engineers",
    bannerFormat: "square",
    image:
      "/assets/event-photos/Beyond DSA/WhatsApp Image 2026-09-28 at 2.40.55 PM.jpeg",
    cardImage:
      "/assets/event-photos/Beyond DSA/WhatsApp Image 2026-09-28 at 2.40.55 PM.jpeg",
    shortSummary:
      "High-impact talk with startup engineers Tanay Kumar & Shivank Kapur on product engineering, off-campus hiring, and tech growth.",
    description:
      "Beyond DSA was an insightful panel session designed to help engineering students look past routine coding exercises and discover how real software engineers architect impactful products, secure off-campus roles, and thrive in dynamic startup ecosystems.\n\nFeaturing distinguished engineers Tanay Kumar (Founding Engineer @ Final Round AI) and Shivank Kapur (Senior Product Engineer @ Stealth), the speakers provided an unvarnished playbook on what top engineering managers look for. The session explored the nuances of early-stage engineering, open-source credibility, cold outreach strategies, and building technical moats.",
    highlights: [
      "The engineering reality beyond competitive programming and DSA platforms",
      "How to build production-grade projects that catch recruiter and founder attention",
      "Actionable off-campus referral and outreach playbooks",
      "Navigating early-stage startups and rapid architectural iteration",
    ],
    speakersOrMentors: [
      {
        name: "Tanay Kumar",
        role: "Founding Engineer",
        company: "Final Round AI",
      },
      {
        name: "Shivank Kapur",
        role: "Sr. Product Engineer",
        company: "Stealth",
      },
    ],
  },
  {
    id: 6,
    slug: "introduction-to-ai-agents",
    name: "Introduction to AI Agents",
    category: "Workshop",
    badge: "Agentic AI",
    date: "23-03-2026",
    year: "2026",
    timelineStatus: "Past",
    location: "BPIT Main Computer Lab, New Delhi",
    attendeesCount: "220+ Participants",
    bannerFormat: "square",
    image: "/assets/event-photos/Introduction to AI Agents/poster.jpeg",
    cardImage: "/assets/event-photos/Introduction to AI Agents/poster.jpeg",
    shortSummary:
      "Hands-on masterclass building autonomous AI agents with LangChain, CrewAI, and Vector DBs, deployed via FastAPI and React.",
    description:
      "Moving beyond traditional conversational chatbots, Anveshan hosted an interactive and practical hands-on workshop titled 'Introduction to AI Agents' at BPIT, New Delhi.\n\nThe workshop challenged participants to stop merely chatting with LLMs and start building autonomous agentic systems. Guided through the core cognitive cycle—Perceive → Think → Act—engineers explored multi-agent orchestration with LangChain and CrewAI, knowledge retrieval with Vector Databases, and full-stack integration connecting Python agent backends with React and FastAPI. Every attendee concluded the session with a working, self-directed AI agent.",
    highlights: [
      "Autonomous Agent Architecture: Understanding the Perceive → Think → Act pipeline",
      "Multi-agent orchestration and coordination using LangChain & CrewAI",
      "Vector Databases & contextual RAG for accurate tool decision-making",
      "End-to-end full-stack integration using Python, FastAPI, and React",
      "Live deployment of working autonomous agents during the session",
    ],
    gallery: [
      "/assets/event-photos/Introduction to AI Agents/1774328990873.jpg",
      "/assets/event-photos/Introduction to AI Agents/1774328991301.jpg",
      "/assets/event-photos/Introduction to AI Agents/1774328991810.jpg",
      "/assets/event-photos/Introduction to AI Agents/WhatsApp Image 2026-09-28 at 4.04.05 PM.jpeg",
    ],
  },
  {
    id: 7,
    slug: "orientation-sih-session",
    name: "Orientation + Smart India Hackathon (SIH) Session",
    category: "Orientation",
    badge: "Annual Induction",
    date: "29-08-2026",
    year: "2026",
    timelineStatus: "Past",
    location: "Main Auditorium, BPIT, New Delhi",
    attendeesCount: "400+ Incoming Engineers",
    bannerFormat: "square",
    image:
      "/assets/event-photos/Orientation/WhatsApp Image 2026-09-28 at 2.48.05 PM.jpeg",
    cardImage:
      "/assets/event-photos/Orientation/WhatsApp Image 2026-09-28 at 2.48.05 PM.jpeg",
    shortSummary:
      "Annual community induction paired with a winning Smart India Hackathon playbook session and the official launch of TechStarter.",
    description:
      "Anveshan successfully hosted its annual flagship Orientation Session, welcoming incoming students and introducing them to the community's vision, culture of rapid prototyping, and vibrant technical wings.\n\nThe orientation was immediately followed by an insightful Smart India Hackathon (SIH) session featuring firsthand guidance and case studies from Anveshan's national SIH finalists. The finalists broke down their entire journey—from problem statement selection and hardware-software integration to jury pitching under high pressure. The event culminated in the official unveiling of TechStarter, providing attendees with a clear roadmap to kickstart their engineering careers.",
    highlights: [
      "Comprehensive introduction to Anveshan's wings, projects, and hackathon culture",
      "Smart India Hackathon winning strategies directly from national finalists",
      "Frameworks for rapid MVP development, hardware-software syncing, and pitch decks",
      "Official launch and registration kickoff for the TechStarter cohort",
      "Interactive open-floor Q&A with experienced senior mentors",
    ],
    youtubeLinks: [
      {
        title: "SIH Doubt Session Live | Queries Answered Live Stream",
        session: "SIH Masterclass",
        url: "https://www.youtube.com/live/2i_MjcrYEKU?si=7pQ8hU3AxCwL5XT7",
        videoId: "2i_MjcrYEKU",
      },
    ],
  },
  {
    id: 8,
    slug: "techstarter-3",
    name: "TechStarter 3.0",
    category: "Cohort",
    badge: "Flagship Cohort",
    date: "05-09-2026 to 19-09-2026",
    year: "2026",
    timelineStatus: "Past",
    location: "Hybrid (BPIT Labs & Online Community Discord)",
    attendeesCount: "450+ Enrolled Learners",
    bannerFormat: "widescreen",
    image: "/assets/event-photos/Techstarter 26/poster.jpg",
    cardImage: "/assets/event-photos/Techstarter 26/poster.jpg",
    shortSummary:
      "Accelerated month-long cohort spanning full-stack web, DSA in C++/Java, AI/ML, and hands-on Agentic AI workflow modules.",
    description:
      "TechStarter 3.0 is the third expanded edition of Anveshan's foundational cohort, engineered to equip aspiring software developers with production-level skills across core and cutting-edge tech domains.\n\nLed by senior core team mentors, this cohort delivered immersive modules across HTML & CSS, Git & GitHub, JavaScript, and Data Structures & Algorithms in both C++ and Java. New to this edition, TechStarter 3.0 introduced dedicated tracks in Artificial Intelligence, Machine Learning, and Agentic AI workflows. The program prioritized practical, beginner-friendly pedagogy, empowering participants to build confidence and launch their tech journeys.",
    highlights: [
      "Modern Web Development: HTML5, CSS architectures, and JavaScript",
      "Version control mastery with Git, GitHub, and open-source practices",
      "DSA foundations and algorithmic problem-solving in C++ and Java",
      "Introductory Artificial Intelligence and Machine Learning fundamentals",
      "Specialized Agentic AI module focusing on autonomous workflows and tool use",
      "Weekly project checkpoints, mentor reviews, and live debugging sessions",
    ],
    youtubeLinks: [
      {
        title: "Tech Starter 3.0 | Basics of Web Development: HTML & CSS",
        session: "Module 01",
        url: "https://youtu.be/tdpg4n0K5OE?si=y6nAuqzaYdx3Gx4Q",
        videoId: "tdpg4n0K5OE",
      },
      {
        title: "Tech Starter 3.0 | Git & GitHub Masterclass",
        session: "Module 02",
        url: "https://youtu.be/GGuBJ2eadhw?si=haoX7lmVgCp1VtKq",
        videoId: "GGuBJ2eadhw",
      },
      {
        title: "Tech Starter 3.0 | Core of Web Development: JavaScript",
        session: "Module 03",
        url: "https://youtu.be/OVuxkSOdZe4?si=5OaY39szCBe8sKPj",
        videoId: "OVuxkSOdZe4",
      },
      {
        title: "Tech Starter 3.0 | Data Structures & Algorithms: Java",
        session: "Module 04",
        url: "https://youtu.be/I8jAsieDNk0?si=aLZz8iPVG8AOZ0UY",
        videoId: "I8jAsieDNk0",
      },
      {
        title: "Tech Starter 3.0 | Deep Dive into the AI World: Agentic AI",
        session: "Module 05",
        url: "https://youtu.be/gWxwco6QMY8?si=M8T81p8R4xwcBz_V",
        videoId: "gWxwco6QMY8",
      },
      {
        title: "Tech Starter 3.0 | AI/ML",
        session: "Module 06",
        url: "https://youtu.be/o4PoUigA-S4?si=oNAPpdXbsMwrVrHx",
        videoId: "o4PoUigA-S4",
      },
    ],
  },
  {
    id: 9,
    slug: "reforged-26",
    name: "Reforged '26 Hackathon",
    category: "Hackathon",
    badge: "Flagship Hackathon",
    date: "18-10-2026 to 28-10-2026",
    year: "2026",
    timelineStatus: "Past",
    location: "Hybrid (Online Evaluation + Offline Finale at BPIT, Delhi)",
    attendeesCount: "600+ Hackers Participated",
    prizePool: "₹10,000 Cash + ₹1 Lakh Worth Swags & Goodies",
    bannerFormat: "widescreen",
    image: "/assets/event-photos/Reforged 26/banner.webp",
    cardImage: "/assets/event-photos/Reforged 26/banner.webp",
    shortSummary:
      "Anveshan's premier flagship hackathon uniting 600+ builders across n8n, Agentic AI, Google Gemma, and Open Innovation at BPIT, Delhi.",
    description:
      "Reforged '26 is Anveshan's premier flagship hackathon, bringing together 600+ ambitious student developers, designers, and problem-solvers from across the country to tackle real-world engineering challenges.\n\nMoving beyond slide decks, the multi-stage hybrid sprint challenged teams to architect production-ready software—progressing from online prototype evaluations to an electrifying 10-hour offline finale on-site at the BPIT Campus.",
    highlights: [
      "600+ student developers & innovators registered nationwide",
      "Two-phase hybrid format: Online prototype sprint followed by 10-hour BPIT offline finale",
      "₹10,000 cash rewards + ₹1 Lakh in swags, Kiro AI credits & developer perks",
      "Direct 1-on-1 architecture mentorship and jury evaluation from industry engineers",
    ],
    officialLink: "https://reforged.anveshan.dev",
    whatsappLink:
      "https://chat.whatsapp.com/FUCjtbFuqxj3U4nEbuJYUr?s=cl&p=a&mlu=4&ilr=4",
    gallery: [
      "/assets/event-photos/Reforged 26/PXL_20261028_091305814.MP.jpg",
      "/assets/event-photos/Reforged 26/PXL_20261028_105352860.MP.jpg",
      "/assets/event-photos/Reforged 26/tingIMG_20261028_102157.jpg",
      "/assets/event-photos/Reforged 26/IMG_6779.jpg",
      "/assets/event-photos/Reforged 26/IMG_7375.JPG",
    ],
    perks: [
      "$70 worth Kiro AI credits to all participants",
      "$25 digital gift cards to winners",
      "Exclusive mechanical keyboards to Gemma and n8n track winners",
      "Free n8n developer accounts for qualifying teams",
      "₹1,00,000+ worth of exclusive swags, stickers, tees, and goodies",
      "Complimentary meals, snacks, and beverages during the offline round at BPIT",
    ],
    tracks: [
      {
        title: "n8n Sponsored Track",
        description:
          "Workflows, intelligent automation pipelines, microservice integrations, and autonomous business processes.",
      },
      {
        title: "Agentic AI Track",
        description:
          "Autonomous multi-agent systems, intelligent tool execution, persistent memory systems, and multi-step reasoning.",
      },
      {
        title: "Gemma Track",
        description:
          "Fine-tuning, on-device AI, and multimodal solutions built using Google's state-of-the-art open model family (Gemma 2, CodeGemma & PaliGemma).",
      },
      {
        title: "Open Innovation Track",
        description:
          "FinTech, Web3, DevTools, CyberSecurity, IoT, HealthTech, and real-world high-impact engineering solutions.",
      },
    ],
    rounds: [
      {
        title: "Round 1 (Online): Architecture & Working Prototype",
        date: "18 - 20 October 2026",
        description:
          "Teams submitted system architecture blueprints and working MVP repositories via the dedicated portal.",
      },
      {
        title: "Round 2 (Offline Grand Finale): 10-Hour On-Site Hackathon",
        date: "28 October 2026",
        description:
          "Finalist teams battled it out live on-site at BPIT Delhi, featuring live mentor checkpoints and jury presentations.",
      },
    ],
  },
];
