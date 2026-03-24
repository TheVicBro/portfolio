"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

const Rout3 = () => {
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
            ROUT3 - Dashboard Web App
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
                Developed a comprehensive web application dashboard for LLM Proxy, a powerful tool designed to optimize and simplify the use of multiple Language Model providers. This project was created for Rout3, showcasing my ability to build complex, user-friendly interfaces for advanced AI tools.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Features:</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  Intuitive dashboard for managing multiple LLM providers
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  Secure API key management system
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                  Real-time analytics and usage tracking
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                  Customizable configuration settings for each LLM
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
                  User authentication and account management
                </motion.li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Technologies Used:</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Svelte', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Luxon', 'RESTful APIs'].map((tech, index) => (
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
                One of the main challenges was creating a unified interface for multiple LLM providers, each with their own unique APIs and requirements. I overcame this by designing a flexible abstraction layer that standardized interactions across different providers, ensuring a seamless user experience.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Learnings:</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
                  Deepened understanding of LLM architectures and APIs
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
                  Improved skills in building responsive, data-driven UIs with Svelte
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}>
                  Enhanced proficiency in state management and real-time data visualization
                </motion.li>
              </ul>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Future Enhancements:</h3>
                <p className="text-gray-600">
                  Looking ahead, I plan to implement advanced features such as automated cost optimization algorithms, integration with more LLM providers, and enhanced analytics capabilities to further improve the utility and efficiency of the LLM Proxy tool.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="mt-12 border-t border-gray-200 pt-8 flex justify-center"
              >
                <Link 
                  href="https://rout3.com" 
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
          <Image
            src="/rout3.gif"
            alt="Rout3 dashboard demonstration"
            width={1920}
            height={1080}
            className="mt-12 mx-auto rounded-lg w-full max-w-5xl h-auto"
            unoptimized
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Rout3;