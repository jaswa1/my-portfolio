// Icon mapping for common technologies
export const iconMap = {
  // AI/ML Technologies
  python: "fab fa-python",
  pytorch: "fas fa-fire",
  huggingface: "fas fa-robot",
  openai: "fas fa-brain",
  langchain: "fas fa-link",
  llm: "fas fa-comment-dots",
  mlops: "fas fa-cogs",
  llmops: "fas fa-layer-group",
  nlp: "fas fa-language",
  cv: "fas fa-eye",
  tensorflow: "fas fa-brain",
  
  // Engineering & Data
  signal: "fas fa-wave-square",
  timeseries: "fas fa-chart-line", 
  graphql: "fas fa-project-diagram",
  biomedical: "fas fa-heartbeat",
  neuroimaging: "fas fa-brain",
  
  // Languages & Tools
  typescript: "fab fa-js-square",
  javascript: "fab fa-js",
  cpp: "fas fa-code",
  java: "fab fa-java",
  
  // Frontend & Apps
  react: "fab fa-react",
  nextjs: "fab fa-react",
  html: "fab fa-html5",
  css: "fab fa-css3-alt",
  
  // DevOps & Collaboration
  git: "fab fa-git-alt",
  docker: "fab fa-docker",
  aws: "fab fa-aws",
  cicd: "fas fa-sync",
  crossfunctional: "fas fa-users",
  leadership: "fas fa-crown"
};

export const skills = {
  aiml: [
    { name: "PyTorch", icon: "pytorch" },
    { name: "HuggingFace", icon: "huggingface" },
    { name: "OpenAI APIs", icon: "openai" },
    { name: "LangChain", icon: "langchain" },
    { name: "Large Language Models", icon: "llm" },
    { name: "MLOps", icon: "mlops" },
    { name: "LLMOps", icon: "llmops" }
  ],
  ml: [
    { name: "Natural Language Processing", icon: "nlp" },
    { name: "Computer Vision", icon: "cv" },
    { name: "Signal Processing", icon: "signal" },
    { name: "Timeseries Analysis", icon: "timeseries" },
    { name: "Neuroimaging", icon: "neuroimaging" }
  ],
  languages: [
    { name: "Python", icon: "python" },
    { name: "GraphQL", icon: "graphql" },
    { name: "TypeScript", icon: "typescript" },
    { name: "JavaScript", icon: "javascript" },
    { name: "C++", icon: "cpp" }
  ],
  leadership: [
    { name: "Executive Dashboards", icon: "leadership" },
    { name: "Cross-functional Alignment", icon: "crossfunctional" },
    { name: "CI/CD Pipeline Management", icon: "cicd" },
    { name: "Strategic AI Innovation", icon: "leadership" },
    { name: "Technical Team Leadership", icon: "leadership" }
  ],
  engineering: [
    { name: "Biomedical Engineering", icon: "biomedical" },
    { name: "Rehabilitation Protocols", icon: "biomedical" },
    { name: "Signal Processing", icon: "signal" },
    { name: "AWS", icon: "aws" },
    { name: "Docker", icon: "docker" }
  ]
};

// Map of skill category names to human-readable titles
export const categoryTitles = {
  aiml: "AI & LLM Technologies",
  ml: "Machine Learning Specialties",
  languages: "Programming & Query Languages",
  leadership: "Leadership & Strategy",
  engineering: "Engineering & Infrastructure"
}; 