"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from "react-intersection-observer";

export default function Home() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 1500], [1, 0]);
  const y = useTransform(scrollY, [0, 1500], [0, 200]);

  const portfolioRef = useRef(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <main>
      <motion.div
        className="flex items-center justify-between p-16 px-48 text-lightblack"
        initial={{ opacity: 0, y: -140 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="text-6xl font-bold">VC</div>
        <div className="flex items-row text-4xl font-semibold space-x-28">
          {["Portfolio", "About", "Contact"].map((item) => (
            <motion.div
              key={item}
              className="relative"
              whileHover="hover"
              initial="initial"
              animate="initial"
            >
              <button 
                className="relative z-10"
                onClick={() => {
                  if (item === "Portfolio") {
                    portfolioRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {item}
              </button>
              <motion.div
                className="absolute bottom-[-1] left-1/2 transform -translate-x-1/2 h-2 bg-skyblue"
                variants={{
                  initial: { width: 0 },
                  hover: { width: "100%" },
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div 
        className="h-screen sticky top-0"
        style={{ opacity, y }}
        initial={{ opacity: 1, y: 0 }}
        transition={{ ease: 'easeOut' }}
      >
        <div className="flex justify-between pt-48 px-48">
          <div className="flex flex-col justify-between">
            <div>
              <div className="truncate">
                <motion.div
                  className="mt-4 text-12xl font-bold text-lightblack leading-none"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  VICTOR CHUNG
                </motion.div>
              </div>
              <div className="mt-2 px-12">
                <div className="truncate pb-2">
                  <motion.div
                    className="text-7xl font-bold text-skyblue"
                    initial={{ y: "-110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    Full Stack Developer
                  </motion.div>
                </div>
                <div className="mt-6 space-x-8">
                  <motion.button
                    className="rounded-lg bg-white text-3xl font-medium py-6 overflow-hidden whitespace-nowrap"
                    initial={{ width: 0, paddingLeft: 0, paddingRight: 0 }}
                    animate={{ width: "18rem", paddingLeft: "2rem", paddingRight: "2rem" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    onClick={() => portfolioRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <p className="line-clamp-1">View Portfolio</p>
                  </motion.button>
                  <motion.button
                    className="rounded-lg bg-white text-3xl font-medium py-6 overflow-hidden whitespace-nowrap"
                    initial={{ width: 0, paddingLeft: 0, paddingRight: 0 }}
                    animate={{ width: "18rem", paddingLeft: "2rem", paddingRight: "2rem" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <p className="line-clamp-1">View Resume</p>
                  </motion.button>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex space-x-4 px-12">
                <motion.button
                  className="flex justify-center items-center rounded-lg bg-skyblue w-16 h-16"
                  initial={{ width: 0 }}
                  animate={{ width: "4rem" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  layout="preserve-aspect"
                >
                  <img src="/linkedin.png" className="w-14 h-14" />
                </motion.button>
                <motion.button
                  className="flex justify-center items-center rounded-lg bg-skyblue w-16 h-16"
                  initial={{ width: 0 }}
                  animate={{ width: "4rem" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  layout="preserve-aspect"
                >
                  <img src="/github.png" className="h-16 w-16" />
                </motion.button>
              </div>
              <div className="relative">
                <div className="absolute z-10 bottom-40 right-20 w-64 h-60 bg-white rounded-lg"></div>
                <div className="absolute z-10 bottom-0 right-48 w-64 h-56 bg-white rounded-lg"></div>
              </div>
            </div>
          </div>
          <div className="bg-lightblack w-1/4 h-160 rounded-lg">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "40rem" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="w-full h-full p-6">
                <img src="/profilepic.jpg" alt="profile" className="rounded-lg w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="relative">
          <div className="flex mt-64 px-48 justify-between text-lightblack">
            <div>ONTARIO, CANADA</div>
            <div>(SCROLL FOR MORE)</div>
          </div>
        </div>
      </motion.div>
      <div ref={portfolioRef} className="relative bg-lightblack z-20 rounded-3xl px-48 py-16">
        <motion.div 
          ref={ref}
          className="text-10xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          PORTFOLIO
        </motion.div>
        <div className="flex">
          <motion.div 
            className="flex-col w-2/5 mr-8"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-12xl font-medium text-skyblue leading-none">01.</div>
            <div className="text-4xl text-gray-400 mb-4 mt-8">ROUT3</div>
            <div className="text-5xl text-white">LLM Proxy Web App</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <img src="/llmproxy.png" alt="llmproxy" className="object-cover rounded-lg flex-grow mb-4" />
            <img src="/goeasy.png" alt="goeasy" className="object-cover rounded-lg flex-grow" />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
