'use client';

import { motion } from 'framer-motion';
import { timeline, education, interests } from '@/app/data/experience';

export default function About() {
  return (
    <section id="about" className="py-20 px-4 md:px-10 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-6 text-center"
        >
          Experience & Education
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto"
        >
          Strategic AI leader with over 15 years of experience translating cutting-edge signal processing, ML, and AI research into enterprise-ready solutions.
        </motion.p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Professional Experience Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="col-span-2"
          >
            <h3 className="text-2xl font-semibold mb-8 border-b pb-2 border-gray-200 dark:border-gray-700">Professional Experience</h3>
            <div className="relative border-l-2 border-blue-500 dark:border-blue-400 pl-8 space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -left-[13px] bg-white dark:bg-black p-1">
                    <div className="w-5 h-5 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                  </div>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">{item.year}</p>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">{item.organization}</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
                  
                  <div className="pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-2">
                    {item.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start">
                        <div className="min-w-5 mt-1">
                          <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                        </div>
                        <p className="ml-3 text-gray-600 dark:text-gray-400">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Education & Interests Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Education */}
            <div>
              <h3 className="text-2xl font-semibold mb-8 border-b pb-2 border-gray-200 dark:border-gray-700">Education</h3>
              <div className="space-y-8">
                {education.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">{item.year}</p>
                    <h4 className="text-lg font-bold mb-1">{item.degree}</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">{item.institution}</p>
                    
                    <div className="space-y-1">
                      {item.specializations.map((spec, i) => (
                        <div key={i} className="flex items-start">
                          <div className="min-w-5 mt-1.5">
                            <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                          </div>
                          <p className="ml-3 text-sm text-gray-600 dark:text-gray-400">{spec}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Interests */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <motion.span
                    key={index}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    viewport={{ once: true }}
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 