"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight } from "lucide-react";
import Link from 'next/link';

const NoblKids = () => {
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
            Nobl Kids - Landing Page
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
                Developed a dynamic, user-centric landing page for Nobl Kids, a comprehensive platform connecting children with extracurricular activities in the GTA. The landing page showcases the platform&apos;s key features through engaging animations and interactive elements, making it appealing to both parents and activity providers.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Features:</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  Animated hero section with floating activity icons
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  Interactive feature showcases with scroll animations
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                  Responsive provider section with business tools highlight
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                  Magic Search preview section
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
                  Mobile-first design with custom breakpoints
                </motion.li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Technologies Used:</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'react-intersection-observer'].map((tech, index) => (
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
                One of the main challenges was creating smooth, performance-optimized animations that work seamlessly across different devices. I implemented a custom media query hook for responsive animations and used Framer Motion with react-intersection-observer for efficient scroll-based animations. The floating elements in the hero section required careful positioning and timing to achieve a natural, engaging feel without impacting performance.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Learnings:</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
                  Advanced animation techniques with Framer Motion for complex UI interactions
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
                  Responsive design patterns for dynamic content layouts
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}>
                  Performance optimization for animation-heavy pages
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }}>
                  Custom hook implementation for responsive behavior
                </motion.li>
              </ul>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Results and Impact:</h3>
                <p className="text-gray-600 mb-6">
                  The landing page successfully communicates Nobl Kids&apos; dual value proposition to both parents and activity providers. The engaging animations and clear feature presentation help users quickly understand the platform&apos;s benefits. The responsive design ensures a consistent experience across all devices, while the optimized performance maintains smooth interactions despite the rich animated content.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Future Enhancements:</h3>
                <p className="text-gray-600">
                  Future plans include implementing interactive demos of the activity search functionality, adding testimonials from early users, and creating animated transitions between different sections of the landing page. We&apos;re also considering adding a dynamic pricing calculator for activity providers and a showcase of featured activities.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="mt-12 border-t border-gray-200 pt-8 flex justify-center"
              >
                <Link 
                  href="https://noblkids.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 bg-tertiary-yellow-700 hover:bg-tertiary-yellow-600 text-black px-8 py-4 rounded-xl font-medium transition-colors duration-300"
                  >
                    View Website
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NoblKids;