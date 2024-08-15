"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

const LLMProxy = () => {
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
          <h1 className="text-5xl font-bold text-center text-lightblack mb-16">
            Rout3 - LLM Proxy Landing Page
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
                Developed a modern, responsive landing page for LLM Proxy, a tool designed to simplify and optimize the use of multiple Language Model providers. This project showcases my ability to create engaging, informative web experiences using cutting-edge web technologies.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Features:</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  Responsive design with mobile-first approach
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  Interactive code demonstration section
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                  Animated features showcase
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                  Team member carousel with responsive layout
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
                  Smooth scrolling and navigation effects
                </motion.li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Technologies Used:</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Astro', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'react-slick'].map((tech, index) => (
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
                A significant challenge in this project was creating a seamless, performant experience across different devices while incorporating various interactive elements. I tackled this by leveraging Astro&apos;s partial hydration capabilities, using React for interactive components, and implementing responsive design patterns. For instance, I created a responsive navigation system that adapts to different screen sizes, ensuring a consistent user experience across devices.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Learnings:</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
                  Deepened understanding of Astro&apos;s hybrid rendering approach
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
                  Improved skills in creating performant, animated UI components with Framer Motion
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}>
                  Enhanced proficiency in TypeScript for type-safe component development
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }}>
                  Gained experience in optimizing landing pages for conversion and user engagement
                </motion.li>
              </ul>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Results and Impact:</h3>
                <p className="text-gray-600 mb-6">
                  The landing page effectively communicated LLM Proxy&apos;s value proposition, resulting in increased user engagement and sign-ups. The interactive elements, such as the code demonstration and feature animations, significantly improved user understanding of the product. The responsive design ensured a consistent experience across all devices, contributing to lower bounce rates and higher conversion rates.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Future Enhancements:</h3>
                <p className="text-gray-600">
                  Moving forward, I&apos;ve proposed implementing A/B testing to optimize conversion rates, integrating a blog section for content marketing, and adding more interactive demos to showcase LLM Proxy&apos;s capabilities. These enhancements aim to further improve user engagement and provide more comprehensive information about the product.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LLMProxy;