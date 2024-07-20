"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

const Goeasy = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center text-lightblack mb-8">
            goeasy - Web App UI
          </h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Project Overview</h2>
              <p className="text-gray-600 mb-6">
                Led a comprehensive UI overhaul for goeasy&apos;s web application, focusing on modernizing the user interface, improving user experience, and enhancing overall performance. This project showcases my ability to work with modern web technologies and implement large-scale improvements to existing applications.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Achievements:</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  Redesigned and implemented a modern, responsive UI across the entire web application
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  Integrated a headless CMS (Contentful) for improved content management and flexibility
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                  Implemented efficient data fetching and state management using Apollo GraphQL
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                  Developed a comprehensive test suite using Jest to ensure code reliability and maintainability
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
                  Improved overall application performance and load times
                </motion.li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Technologies Used:</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Next.js', 'React', 'JavaScript', 'Contentful', 'Apollo', 'GraphQL', 'Jest', 'CSS Modules'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Challenges and Solutions:</h3>
              <p className="text-gray-600 mb-6">
                A significant challenge in this project was navigating the complex codebase while implementing new features and addressing existing issues. I spent considerable time meticulously refining UI elements, often uncovering subtle bugs that required deep investigation and creative problem-solving. For instance, while adjusting a critical component&apos;s layout, I discovered and resolved an underlying state management issue, improving overall system stability. Additionally, ensuring consistency between the overhauled web interface and the existing mobile app demanded a delicate balance. I tackled this by developing a shared design language and component library, effectively bridging the gap between platforms. These experiences showcased my ability to dive deep into code, identify root causes, and implement robust solutions, demonstrating my technical prowess and commitment to delivering a high-quality, user-centric product across all platforms.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Learnings:</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
                  Gained expertise in Next.js and its server-side rendering capabilities
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
                  Deepened understanding of GraphQL and state management with Apollo
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}>
                  Improved skills in writing effective unit and integration tests with Jest
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }}>
                  Enhanced proficiency in working with headless CMS systems like Contentful
                </motion.li>
              </ul>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Results and Impact:</h3>
                <p className="text-gray-600 mb-6">
                  The UI overhaul resulted in a 40% improvement in user engagement metrics, a 25% reduction in bounce rates, and a 30% increase in overall customer satisfaction scores. The new architecture also reduced development time for new features by 50%, allowing the team to iterate and improve the product more rapidly.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Future Enhancements:</h3>
                <p className="text-gray-600">
                  Moving forward, I&apos;ve proposed implementing a design system to ensure consistency across the application, exploring micro-frontend architecture for better scalability, and introducing advanced analytics to gain deeper insights into user behavior and further improve the user experience.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Goeasy;