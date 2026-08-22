export interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  focus: string;
  avatar?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
  };
}

export const SYNRA_TEAM: TeamMemberData[] = [
  {
    id: "harshit-mishra",
    name: "Harshit Mishra",
    role: "Founder",
    focus: "Vision & Business Strategy",
  },
  {
    id: "khush-paliwal",
    name: "Khush Paliwal",
    role: "Co-Founder",
    focus: "Operations & Growth",
  },
  {
    id: "vatsal-telang",
    name: "Vatsal Telang",
    role: "CEO",
    focus: "Business Development & Client Relations",
  },
  {
    id: "girish-patil",
    name: "Girish Patil",
    role: "Employee",
    focus: "Technology & Development",
  },
  {
    id: "prathamesh-chaumwal",
    name: "Prathamesh Chaumwal",
    role: "Employee",
    focus: "Digital Marketing & SEO",
  },
];

export const SYNRA_CONTACT = {
  instagram: {
    label: "Instagram ↗",
    url: "https://www.instagram.com/synrastudios?igsh=bXA3em56YTN6NDd4",
  },
  email: {
    label: "info.synrastudios@gmail.com",
    address: "info.synrastudios@gmail.com",
  },
  tagline: "Synergy. Strategy. Results.",
  mission: "Building digital growth for businesses.",
  teamIntro: "Five people. One vision. Building digital growth for businesses.",
};

export const SERVICE_CATEGORIES = [
  {
    id: "build",
    category: "BUILD",
    description: "Digital foundations with a point of view",
    services: ["Website", "E-commerce", "Landing Page", "Branding"],
  },
  {
    id: "grow",
    category: "GROW",
    description: "Systems that get you discovered and chosen",
    services: [
      "SEO",
      "Local SEO",
      "Google Business",
      "Instagram",
      "LinkedIn",
      "Content",
      "Analytics",
    ],
  },
  {
    id: "manage",
    category: "MANAGE",
    description: "Ongoing management and performance refinement",
    services: [
      "Website Maintenance",
      "SEO Management",
      "Social Media Management",
      "Content Management",
    ],
  },
  {
    id: "automate",
    category: "AUTOMATE",
    description: "Intelligent workflows and automated systems",
    services: [
      "AI Automation",
      "AI Agent",
      "Business Workflow",
      "Custom Integration",
    ],
  },
];

export const INDUSTRY_OPTIONS = [
  "Restaurant / Cafe",
  "E-commerce",
  "Healthcare",
  "Education",
  "Real Estate",
  "Technology / Startup",
  "Professional Services",
  "Local Business",
  "Other",
];

export const START_TIMELINE_OPTIONS = [
  "ASAP",
  "Within 2 weeks",
  "Within 1 month",
  "1–3 months",
  "Just exploring",
];

export const BUDGET_OPTIONS = [
  {
    id: "tier-1",
    label: "Under ₹25,000",
    description: "Starter projects, focused landing pages, or rapid fixes",
  },
  {
    id: "tier-2",
    label: "₹25,000 – ₹50,000",
    description: "Custom business websites or strategic growth setups",
  },
  {
    id: "tier-3",
    label: "₹50,000 – ₹1,00,000",
    description: "Comprehensive web systems, SEO suites, or custom brand builds",
  },
  {
    id: "tier-4",
    label: "₹1,00,000 – ₹2,50,000",
    description: "Full-scale commerce, automation infrastructure, or end-to-end growth",
  },
  {
    id: "tier-5",
    label: "₹2,50,000+",
    description: "Enterprise digital transformation, custom AI systems & large platforms",
  },
  {
    id: "tier-unknown",
    label: "Not sure yet",
    description: "We can help you scope requirements and define an optimal budget",
  },
];

export const CONTACT_PREFERENCE_OPTIONS = [
  "Email",
  "WhatsApp",
  "Phone Call",
];

export const PREFERRED_TIME_OPTIONS = [
  "Anytime (Working hours)",
  "Morning (9 AM – 12 PM)",
  "Afternoon (12 PM – 5 PM)",
  "Evening (5 PM – 8 PM)",
];
