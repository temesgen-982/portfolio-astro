interface Skill {
  name: string;
  icon?: string;
  // Add an optional color property
  color?: string;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "Svelte", icon: "simple-icons:svelte", color: "#FF3E00" },
      { name: "Astro", icon: "simple-icons:astro", color: "#FF5D01" },
      { name: "React", icon: "simple-icons:react", color: "#61DAFB" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: "simple-icons:nodedotjs", color: "#5FA04E" },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "PostgreSQL", icon: "simple-icons:postgresql", color: "#4169E1" },
    ],
  },
  {
    category: "Version Control",
    skills: [
      { name: "Git", icon: "simple-icons:git", color: "#F05032" },
      { name: "GitHub", icon: "simple-icons:github", color: "#181717" },
    ],
  },
  {
    category: "CI/CD",
    skills: [
      { name: "GitHub Actions", icon: "simple-icons:githubactions", color: "#2088ff" }
    ]
  }
];
