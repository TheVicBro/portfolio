"use client";

import { motion } from 'framer-motion';

export default function Home() {
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
          <div>Portfolio</div>
          <div>About</div>
          <div>Contact</div>
        </div>
      </motion.div>
      <div className="h-screen sticky top-0">
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
                  <img src="/linkedin.png" className="w-14 h-14"/>
                </motion.button>
                <motion.button 
                  className="flex justify-center items-center rounded-lg bg-skyblue w-16 h-16"
                  initial={{ width: 0 }}
                  animate={{ width: "4rem" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  layout="preserve-aspect"
                >
                  <img src="/github.png" className="h-16 w-16"/>
                </motion.button>
              </div>
              <div className="relative">
                <div className="absolute z-10 bottom-40 right-20 w-64 h-56 bg-white rounded-lg"></div>
                <div className="absolute z-10 bottom-0 right-48 w-64 h-56 bg-white rounded-lg"></div>
              </div>
            </div>
          </div>
          <div className="bg-lightblack w-1/4 h-160 rounded-lg">
            <div className="w-full h-full p-6">
              <img src="/profilepic.jpg" alt="profile" className="rounded-lg w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
      <div className="relative bg-lightblack z-20 h-screen rounded-3xl">
        test
      </div>
    </main>
  );
}
