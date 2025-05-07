'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { skills, categoryTitles, iconMap } from '@/app/data/skills';

// Define types
type Category = 'aiml' | 'ml' | 'languages' | 'leadership' | 'engineering';
type Skill = {
  name: string;
  icon: string;
};

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const checkmarkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { 
      pathLength: { type: "spring", duration: 1.5, bounce: 0 },
      opacity: { duration: 0.3 }
    }
  }
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState<Category>('aiml');
  
  return (
    <section id="skills" className="py-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Skills & Technologies
        </motion.h2>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {(Object.keys(skills) as Category[]).map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
                ${activeTab === category 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {categoryTitles[category]}
            </motion.button>
          ))}
        </div>
        
        {/* Skills Display */}
        <motion.div
          key={activeTab}
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {skills[activeTab].map((skill: Skill, index: number) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg flex items-center space-x-4"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-blue-500">
                <i className={`${iconMap[skill.icon as keyof typeof iconMap]} text-2xl`}></i>
              </div>
              
              <div className="flex-grow">
                <h3 className="text-lg font-medium">{skill.name}</h3>
              </div>
              
              <div className="flex-shrink-0 w-6 h-6 relative">
                <motion.svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  initial="hidden"
                  animate="visible"
                >
                  <motion.path
                    d="M3 12L9 18L21 6"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500 dark:text-green-400"
                    variants={checkmarkVariants}
                    custom={index}
                  />
                </motion.svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 