'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: "Enterprise-Grade LLM Systems: Building for Scale and Compliance",
    excerpt: "Deploying Large Language Models in enterprise environments requires careful consideration of data governance, security, and scalability. This article explores key design patterns for successful implementation.",
    date: "May 15, 2023",
    category: "GenAI",
    readTime: "8 min read"
  },
  {
    id: 2,
    title: "Strategic AI Roadmaps: From POC to Production",
    excerpt: "Many organizations struggle to move AI projects from proof-of-concept to production-ready systems. Learn the strategic approaches that make the difference between experiments and enterprise value.",
    date: "March 22, 2023",
    category: "Strategy",
    readTime: "6 min read"
  },
  {
    id: 3,
    title: "Bridging Research and Application in Neural Rehabilitation",
    excerpt: "Advances in computational neuroscience are creating new possibilities for rehabilitation technologies. This article examines the latest research and their practical applications in clinical settings.",
    date: "February 8, 2023",
    category: "Research",
    readTime: "10 min read"
  },
  {
    id: 4,
    title: "Executive Guide to AI Investment and ROI",
    excerpt: "For C-suite leaders navigating AI investments, understanding the true drivers of ROI requires looking beyond typical metrics. Here's how to evaluate AI initiatives from a strategic perspective.",
    date: "January 12, 2023",
    category: "Leadership",
    readTime: "7 min read"
  }
];

// Category filter options
const categories = [
  { id: "all", label: "All Articles" },
  { id: "GenAI", label: "GenAI & LLMs" },
  { id: "Strategy", label: "AI Strategy" },
  { id: "Research", label: "Research" },
  { id: "Leadership", label: "Leadership" }
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Filter posts based on active category
  const filteredPosts = activeCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);
  
  return (
    <section id="blog" className="py-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-4"
        >
          Insights & Articles
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
        >
          Thoughts on AI innovation, strategic implementation, and technology leadership
        </motion.p>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
                ${activeCategory === category.id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>
        
        {/* Blog Posts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredPosts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col h-full"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-center mb-3">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{post.title}</h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{post.excerpt}</p>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{post.readTime}</span>
                  
                  <motion.a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 font-medium text-sm flex items-center"
                    whileHover={{ x: 3 }}
                  >
                    Read article
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
        
        {/* View More Button */}
        <div className="text-center mt-12">
          <motion.a
            href="#"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Articles
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </div>
      </div>
    </section>
  );
} 