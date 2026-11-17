export interface ProjectItem {
  id: number;
  name: string;
  owner: string;
  GithubRepo: string;
  Deployment: string;
  image: string;
  Work: string;
  description: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: 1,
    name: "Houdry",
    owner: "Garvit Arora",
    GithubRepo: "https://github.com/houdry-genomex",
    Deployment: "https://houdry.live/",
    image: "/assets/projects/garvit1.png",
    Work: "Air-Gapped Engineering",
    description:
      "Houdry Fabric enables air-gapped engineering on local GPUs. It processes calculations, P&IDs, and websites offline, keeping sensitive refinery data secure on the plant LAN without cloud exposure.",
  },
  {
    id: 2,
    name: "Incident Memory Agent",
    owner: "Pallavi Jain",
    GithubRepo: "https://github.com/pallavithegod/ima-agent.git",
    Deployment: "https://imagent-zeta.vercel.app/",
    image: "/assets/projects/pallavi1.png",
    Work: "Incident Monitoring & Remediation",
    description:
      "An automated incident monitoring and remediation dashboard for Vercel and Render. It tracks live health, uses AI to diagnose failures, and generates draft pull requests for rapid fixes.",
  },
  {
    id: 3,
    name: "AsteroTerrain",
    owner: "Manan Jain",
    GithubRepo: "https://github.com/MananJain-20/AstroTerrain",
    Deployment: "https://astro-terrain.vercel.app/",
    image: "/assets/projects/Manan Jain.png",
    Work: "Space Mission Testing",
    description:
      "A web app to help find testing sites for moon or martian space missions.",
  },
  {
    id: 4,
    name: "DhunMart",
    owner: "Surender",
    GithubRepo: "https://github.com/surender18/DhunMart",
    Deployment: "https://dhunmart.vercel.app/",
    image: "/assets/projects/2.png",
    Work: "A Dynamic Electronics Hub",
    description:
      "Online platform for electronics enthusiasts, specializing in high-quality earphones and audio gear.",
  },
  {
    id: 5,
    name: "Quizzical",
    owner: "Aadish Jain",
    GithubRepo: "https://github.com/aadishj23/Quiz-App",
    Deployment: "https://quiz-app-tan-six.vercel.app/",
    image: "/assets/projects/3.png",
    Work: "Technical Quiz App",
    description: "Quiz from 7+ categories and 3 difficulty levels",
  },
  {
    id: 6,
    name: "Sanskaar Group Website",
    owner: "Kaushal and Tanay",
    GithubRepo: "https://github.com/sanskaargroup/sg-website",
    Deployment: "http://www.sanskaargroup.com",
    image: "/assets/projects/4.png",
    Work: "Event Management Website",
    description: "Manage all types of social and corporate events",
  },
  {
    id: 7,
    name: "Learniverse",
    owner: "Tanay Kumar",
    GithubRepo: "https://github.com/tanaykmr/learniverse",
    Deployment: "https://learniverse.vercel.app/",
    image: "/assets/projects/5.png",
    Work: "Course selling platform",
    description:
      "A platform for educators to teach to the masses and for students to have quality education with their choice of tutors.",
  },
  {
    id: 8,
    name: "ReelPick",
    owner: "Shubham Kumar",
    GithubRepo: "https://github.com/shubham-kumar4285/reelpick/",
    Deployment: "https://reelpick-movie-recommender.streamlit.app/",
    image: "/assets/projects/6.png",
    Work: "Movie Recommendation App",
    description:
      "Reel Pick helps you find movies you'll love based on your preferences.",
  },
];
