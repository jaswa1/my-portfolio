'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { projects } from '@/app/data/projects';

// Define extended project type with additional details
type ExtendedProject = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  role: string;
  company: string;
  longDescription?: string[];
  challenges?: string[];
  solutions?: string[];
  results?: string[];
  technologies?: string[];
  githubUrl?: string;
  demoUrl?: string;
  images?: string[];
};

// Extended project data with additional details
const extendedProjects: ExtendedProject[] = [
  {
    slug: 'mtmt',
    title: "MTMT (Metrics That Matter)",
    description: "LLM-powered executive dashboard enabling C-Suite leaders to access key market insights through natural language interactions.",
    longDescription: [
      "Metrics That Matter (MTMT) is a comprehensive analytics platform designed for C-Suite executives to access critical market insights through conversational AI.",
      "The platform features a natural language interface that translates executive queries into complex data operations, enabling leaders to make data-driven decisions without requiring technical expertise.",
      "MTMT integrates with multiple data sources across the organization, providing a unified view of business performance and market trends."
    ],
    challenges: [
      "Creating a truly intuitive natural language interface that understands executive intent and business context",
      "Integrating disparate data sources while maintaining data governance and security",
      "Designing visualizations that effectively communicate complex insights to non-technical stakeholders"
    ],
    solutions: [
      "Implemented advanced LLM techniques with custom fine-tuning to understand business-specific terminology and context",
      "Developed a secure data orchestration layer that maintains compliance while enabling cross-functional data access",
      "Created an adaptive visualization engine that presents insights in the most appropriate format based on query type"
    ],
    results: [
      "Reduced time to insight from days to minutes for executive decision-making",
      "Enabled data democratization across the organization while maintaining robust governance",
      "Significantly improved executive adoption of data-driven decision processes"
    ],
    technologies: ["LLM", "Python", "React", "NextJS", "GraphQL", "D3.js", "AWS"],
    githubUrl: "https://github.com/jaswa1/mtmt-dashboard",
    demoUrl: "https://mtmt-dashboard.vercel.app",
    images: ["/images/projects/mtmt-dashboard-1.png", "/images/projects/mtmt-dashboard-2.png"],
    tags: ["LLM", "Executive Dashboard", "NLP", "Analytics"],
    role: "Lead AI Architect",
    company: "Estee Lauder"
  },
  {
    slug: 'estee-hackathon',
    title: "E.S.T.E.E AI Innovation Hackathon",
    description: "Conceived and developed a working proof-of-concept showcasing AI's potential to streamline enterprise insight discovery.",
    longDescription: [
      "The E.S.T.E.E AI Innovation Hackathon was a company-wide initiative to demonstrate AI's transformative potential for enterprise insight discovery.",
      "As project lead, I designed and implemented a proof-of-concept system that showcased how AI could automate the extraction and synthesis of business insights from unstructured data.",
      "The project focused on demonstrating tangible business value while highlighting the potential for AI-augmented decision-making processes."
    ],
    challenges: [
      "Developing a compelling proof-of-concept within the limited timeframe of a hackathon",
      "Creating a solution that demonstrated immediate business value to senior executives",
      "Balancing technical innovation with practical implementation considerations"
    ],
    solutions: [
      "Assembled a cross-functional team with complementary skills in AI, UX, and business domain expertise",
      "Focused on a high-impact use case involving automated insight extraction from earnings calls and market reports",
      "Created a minimal yet functional prototype that demonstrated the core value proposition"
    ],
    results: [
      "Secured organizational buy-in from senior executives for future integration",
      "Demonstrated the value of innovation ecosystems in corporate settings",
      "Established a framework for future AI initiatives within the organization"
    ],
    technologies: ["PyTorch", "NLP", "React", "Azure", "Hugging Face Transformers"],
    githubUrl: "https://github.com/jaswa1/estee-ai-hackathon",
    demoUrl: "https://estee-hackathon.vercel.app",
    images: ["/images/projects/estee-hackathon-1.png", "/images/projects/estee-hackathon-2.png"],
    tags: ["AI", "Hackathon", "Enterprise", "Innovation"],
    role: "Project Lead & Architect",
    company: "Estee Lauder"
  },
  {
    slug: 'hero',
    title: "HERO - ELC's Forecasting Suite",
    description: "Directed a multi-disciplinary team in delivering a strategic forecasting tool for Supply Chain, Finance, R&D, and Strategy units.",
    longDescription: [
      "HERO is a comprehensive forecasting suite that provides predictive analytics capabilities across multiple business verticals at Estee Lauder Companies.",
      "The system integrates machine learning models with business domain knowledge to generate accurate forecasts for supply chain, finance, R&D, and strategic planning teams.",
      "HERO features a collaborative interface that enables cross-functional teams to share insights, adjust assumptions, and create scenario-based forecasts."
    ],
    challenges: [
      "Developing forecasting models that work effectively across diverse business domains",
      "Facilitating collaboration between teams with different data needs and expertise levels",
      "Ensuring model explainability to build trust in AI-driven forecasts"
    ],
    solutions: [
      "Implemented an ensemble of specialized forecasting models tailored to different business domains",
      "Created a shared workspace with role-based views that maintained consistent data while addressing domain-specific needs",
      "Developed explainable AI components that provide transparency into forecast drivers and confidence levels"
    ],
    results: [
      "Successfully embedded ML-driven forecasting into corporate operations",
      "Improved speed and confidence in decision-making across business units",
      "Enabled collaborative insight sharing across business verticals"
    ],
    technologies: ["Python", "TensorFlow", "React", "AWS", "Time Series Analysis", "Statistical Modeling"],
    githubUrl: "https://github.com/jaswa1/hero-forecasting",
    demoUrl: "https://hero-forecasting.vercel.app",
    images: ["/images/projects/hero-forecasting-1.png", "/images/projects/hero-forecasting-2.png"],
    tags: ["ML", "Forecasting", "Cross-functional", "Supply Chain"],
    role: "Strategic AI Lead",
    company: "Estee Lauder"
  },
  {
    slug: 'fence',
    title: "FENCE - Feature Evaluation Platform",
    description: "Delivered an AI-driven product intelligence solution to evaluate consumer sentiment in real-time.",
    longDescription: [
      "FENCE (Feature Evaluation & Consumer Engagement Platform) is an AI-driven product intelligence solution that analyzes consumer sentiment in real-time.",
      "The platform processes social media, reviews, customer feedback, and market research to provide actionable insights for product development and positioning.",
      "FENCE uses advanced NLP and sentiment analysis to identify emerging trends, competitive advantages, and potential product improvements."
    ],
    challenges: [
      "Processing and analyzing high volumes of unstructured consumer data from diverse sources",
      "Developing sentiment models that account for industry-specific terminology and context",
      "Creating actionable insights that directly inform product development decisions"
    ],
    solutions: [
      "Implemented a scalable data pipeline for processing multi-source consumer feedback",
      "Developed domain-specific sentiment models trained on beauty and consumer goods terminology",
      "Created an insights engine that translates sentiment patterns into actionable product recommendations"
    ],
    results: [
      "Provided stakeholders with actionable insights for product development",
      "Informed market positioning strategies based on real-time consumer sentiment",
      "Demonstrated the strategic power of behavioral analytics in product ecosystems"
    ],
    technologies: ["Python", "NLP", "Sentiment Analysis", "React", "MongoDB", "AWS", "ElasticSearch"],
    githubUrl: "https://github.com/jaswa1/fence-platform",
    demoUrl: "https://fence-platform.vercel.app",
    images: ["/images/projects/fence-platform-1.png", "/images/projects/fence-platform-2.png"],
    tags: ["Consumer Analytics", "Sentiment Analysis", "Product Intelligence"],
    role: "AI Solution Architect",
    company: "Estee Lauder"
  },
  {
    slug: 'speemo',
    title: "SpeEmo - Emotion Recognition System",
    description: "Designed an AI/ML system to interpret affective cues in speech, integrating NLP and sentiment analysis.",
    longDescription: [
      "SpeEmo is an advanced emotion recognition system that interprets affective cues in speech through a combination of acoustic analysis and natural language processing.",
      "The system identifies emotional states such as happiness, sadness, anger, fear, and neutral tones by analyzing both the semantic content and paralinguistic features of speech.",
      "SpeEmo was designed with applications in accessibility, education technology, and human-centered AI experiences."
    ],
    challenges: [
      "Developing robust models that work across different speaking styles, accents, and languages",
      "Balancing accuracy with processing speed for real-time applications",
      "Creating ethical guidelines for emotion detection applications"
    ],
    solutions: [
      "Implemented a multi-modal approach combining acoustic feature extraction with semantic analysis",
      "Developed an optimized inference pipeline enabling real-time processing on consumer hardware",
      "Created a comprehensive framework for ethical implementation focusing on opt-in consent and transparency"
    ],
    results: [
      "Demonstrated applications in human-centered AI experiences and accessibility technology",
      "Achieved state-of-the-art accuracy in emotion recognition across diverse speaker populations",
      "Established a foundation for more intuitive human-computer interactions"
    ],
    technologies: ["PyTorch", "Speech Processing", "NLP", "Signal Processing", "React", "TensorFlow"],
    githubUrl: "https://github.com/jaswa1/speemo",
    demoUrl: "https://speemo.vercel.app",
    images: ["/images/projects/speemo-1.png", "/images/projects/speemo-2.png"],
    tags: ["Speech Processing", "NLP", "Sentiment Analysis", "Accessibility"],
    role: "ML Researcher & Developer",
    company: "Research"
  },
  {
    slug: 'stroke-recovery',
    title: "Real-time Stroke Recovery System",
    description: "Led development of proprietary AI/ML models that process hand and eye movement data, creating adaptive virtual environments.",
    longDescription: [
      "The Real-time Stroke Recovery System is an innovative rehabilitation platform that combines computer vision, neuroscience, and immersive technologies to assist stroke patients in their recovery journey.",
      "The system uses proprietary AI/ML models to process hand and eye movement data in real-time, creating adaptive virtual environments that respond dynamically to patient progress.",
      "The platform incorporates blockchain technology for HIPAA-compliant data privacy, ensuring ethical and secure handling of sensitive patient information."
    ],
    challenges: [
      "Developing models sensitive enough to detect subtle improvements in motor control and coordination",
      "Creating adaptive environments that provide appropriate challenge levels based on patient capabilities",
      "Ensuring medical data privacy while enabling effective monitoring by healthcare providers"
    ],
    solutions: [
      "Implemented high-precision computer vision algorithms capable of tracking millimeter-level movements",
      "Developed an adaptive difficulty system using reinforcement learning to optimize rehabilitation progress",
      "Created a blockchain-based data management system for HIPAA-compliant storage and sharing"
    ],
    results: [
      "Successfully deployed the system in clinical trials with partnering health institutions",
      "Demonstrated measurable improvements in patient recovery metrics compared to traditional methods",
      "Established a secure framework for data collection that advances research while protecting privacy"
    ],
    technologies: ["Computer Vision", "PyTorch", "Blockchain", "Unity3D", "WebGL", "React", "AWS"],
    githubUrl: "https://github.com/jaswa1/stroke-recovery-system",
    demoUrl: "https://stroke-recovery-system.vercel.app",
    images: ["/images/projects/stroke-recovery-1.png", "/images/projects/stroke-recovery-2.png"],
    tags: ["Rehabilitation", "Medical AI", "Blockchain", "Health Tech"],
    role: "Co-founder & AI/ML Lead",
    company: "ctrlCV"
  }
];

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState<ExtendedProject | null>(null);
  
  useEffect(() => {
    if (params.slug) {
      const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
      const foundProject = extendedProjects.find(p => p.slug === slug);
      
      if (foundProject) {
        setProject(foundProject);
      }
    }
  }, [params]);
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Link href="/#projects" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-20 px-4 md:px-10 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <Link 
            href="/#projects" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-8"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Projects
          </Link>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            {project.title}
          </motion.h1>
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-4 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-medium">
              {project.company}
            </span>
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              Role: {project.role}
            </span>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-700 dark:text-gray-300 mb-12"
          >
            {project.description}
          </motion.p>
        </div>
        
        {/* Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            {/* Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">Overview</h2>
              <div className="space-y-4">
                {project.longDescription?.map((paragraph, i) => (
                  <p key={i} className="text-gray-700 dark:text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.section>
            
            {/* Project Images */}
            {project.images && project.images.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">Project Gallery</h2>
                <div className="grid grid-cols-1 gap-6">
                  {project.images.map((image, i) => (
                    <div key={i} className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
                      <img 
                        src={image} 
                        alt={`${project.title} screenshot ${i+1}`} 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
            
            {/* Challenges */}
            {project.challenges && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">Challenges</h2>
                <ul className="list-disc pl-6 space-y-2">
                  {project.challenges.map((challenge, i) => (
                    <li key={i} className="text-gray-700 dark:text-gray-300">{challenge}</li>
                  ))}
                </ul>
              </motion.section>
            )}
            
            {/* Solutions */}
            {project.solutions && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">Solutions</h2>
                <ul className="list-disc pl-6 space-y-2">
                  {project.solutions.map((solution, i) => (
                    <li key={i} className="text-gray-700 dark:text-gray-300">{solution}</li>
                  ))}
                </ul>
              </motion.section>
            )}
            
            {/* Results */}
            {project.results && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">Results</h2>
                <ul className="list-disc pl-6 space-y-2">
                  {project.results.map((result, i) => (
                    <li key={i} className="text-gray-700 dark:text-gray-300">{result}</li>
                  ))}
                </ul>
              </motion.section>
            )}
          </div>
          
          {/* Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg sticky top-8"
            >
              {/* Technologies */}
              {project.technologies && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Tags */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Links */}
              <div>
                <h3 className="text-xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
                  Links
                </h3>
                <div className="space-y-3">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub Repository
                    </a>
                  )}
                  
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 