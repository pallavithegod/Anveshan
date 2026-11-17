export interface Question {
  question: string;
  answer: string;
  answerStyle: string;
  questionStyle: string;
  fontSizeScaling?: string;
}

export const questions: Question[] = [
  {
    question: "What is Reforged '26?",
    answer:
      "Reforged '26 is Anveshan's premier flagship hackathon hosted at BPIT, Delhi. Organized by Anveshan, it was focused purely on solid technical architecture, working prototypes, and shipping software that actually works.",
    answerStyle: "h-44",
    questionStyle: "mb-44 -bottom-44",
    fontSizeScaling: "text-[clamp(0.82rem,2vw,0.95rem)]",
  },
  {
    question: "What were the key dates, rounds, and venue?",
    answer:
      "Reforged '26 featured two stages: Round 1 Online from 18 to 20 October 2026 (architecture & prototype submission). Shortlisted teams then battled it out live at the 10-Hour Offline Finale on-site at BPIT Campus, Delhi on 28 October 2026!",
    answerStyle: "h-44",
    questionStyle: "mb-44 -bottom-44",
    fontSizeScaling: "text-[clamp(0.82rem,2vw,0.95rem)]",
  },
  {
    question: "Who can participate and what is the team size?",
    answer:
      "Teams must consist of 2 to 4 members (no solo participants). Inter-college teams, cross-branch, and cross-year collaborations are 100% allowed and encouraged! All college students passionate about building are welcome.",
    answerStyle: "h-40",
    questionStyle: "mb-40 -bottom-40",
    fontSizeScaling: "text-[clamp(0.82rem,2vw,0.95rem)]",
  },
  {
    question: "What were the hackathon tracks?",
    answer:
      "We featured four battlegrounds: (1) n8n Sponsored Track: AI workflows, integrations & automation pipelines; (2) Agentic Track: Autonomous multi-agent systems and intelligent tools; (3) Gemma Track: On-device AI, fine-tuning & multimodal apps using Google Gemma models; (4) Open Innovation: FinTech, Web3, CyberSecurity, HealthTech, DevTools, or IoT.",
    answerStyle: "h-48",
    questionStyle: "mb-48 -bottom-48",
    fontSizeScaling: "text-[clamp(0.8rem,2vw,0.92rem)]",
  },
  {
    question: "What prizes, perks, and food were provided?",
    answer:
      "Reforged '26 awarded ₹10,000 cash prizes plus over ₹1,00,000 worth of swags and goodies for participants and winners. Every qualifying team received free n8n accounts, plus delicious meals and snacks provided free during the offline finale at BPIT!",
    answerStyle: "h-44",
    questionStyle: "mb-44 -bottom-44",
    fontSizeScaling: "text-[clamp(0.82rem,2vw,0.95rem)]",
  },
  // {
  //   question: "Is there any registration fee to participate?",
  //   answer:
  //     "Zero! Reforged '26 is 100% free to enter. There are no registration fees or hidden costs for both the online evaluation rounds and the offline grand finale at BPIT.",
  //   answerStyle: "h-36",
  //   questionStyle: "mb-36 -bottom-36",
  //   fontSizeScaling: "text-[clamp(0.82rem,2vw,0.95rem)]",
  // },
  // {
  //   question: "Do I need a fully finished product for the online round?",
  //   answer:
  //     "Don't have a fully polished product? Who cares! You just need a working demo/prototype, a solid technical architecture, and a clear explanation of what you're building and why it matters. No 50-slide pitch decks required.",
  //   answerStyle: "h-44",
  //   questionStyle: "mb-44 -bottom-44",
  //   fontSizeScaling: "text-[clamp(0.82rem,2vw,0.95rem)]",
  // },
  // {
  //   question: "What are the judging criteria and hackathon rules?",
  //   answer:
  //     "Projects will be judged on technical architecture, execution, working demo, innovation, and real-world impact. Plagiarism or copy-pasting existing repos means an instant disqualification. Qualifying teams must attend the offline finale at BPIT.",
  //   answerStyle: "h-48",
  //   questionStyle: "mb-48 -bottom-48",
  //   fontSizeScaling: "text-[clamp(0.8rem,2vw,0.92rem)]",
  // },
  // {
  //   question: "What is Anveshan and how can I join the community?",
  //   answer:
  //     "Anveshan is the premier technical society of BPIT, mentoring students across DSA, Full-Stack, AI/ML, and Open Source. Join our official WhatsApp community or visit reforged.anveshan.dev to connect with fellow builders and stay updated on upcoming cohorts!",
  //   answerStyle: "h-48",
  //   questionStyle: "mb-48 -bottom-48",
  //   fontSizeScaling: "text-[clamp(0.8rem,2vw,0.92rem)]",
  // },
];
