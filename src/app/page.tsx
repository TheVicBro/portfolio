"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from "react-intersection-observer";

type FormData = {
  name: string;
  email: string;
  company: string;
  inquiry: string;
};

export default function Home() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 1500], [1, 0]);
  const y = useTransform(scrollY, [0, 1500], [0, 200]);
  const [isMainClickable, setIsMainClickable] = useState(true);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((current) => {
      setIsMainClickable(current < 1500);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const topRefView = useRef<HTMLDivElement|null>(null);
  const aboutRef = useRef<HTMLDivElement|null>(null);
  const portfolioRef = useRef<HTMLDivElement|null>(null);
  const contactRef = useRef<HTMLDivElement|null>(null);

  const openResume = () => {
    window.open('/VictorChung_Resume.pdf', '_blank', 'noopener,noreferrer');
  };

  const { ref: portfolioRefView, inView: portfolioInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: portfolioItemRef1, inView: portfolioItemInView1 } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: portfolioItemRef2, inView: portfolioItemInView2 } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: portfolioItemRef3, inView: portfolioItemInView3 } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [cursorX, setCursorX] = useState<number | undefined>(0);
  const [cursorY, setCursorY] = useState<number | undefined>(0);
  const [cursorScale, setCursorScale] = useState<number>(0);

  const handleMouseEnter = () => {
    setCursorScale(2.5);
  };

  const handleMouseLeave = () => {
    setCursorScale(0);
  };

  const handleMouseMove = (e: MouseEvent) => {
    setCursorX(e.clientX);
    setCursorY(e.clientY);
  };
  
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
  
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    inquiry: '',
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus('Form submitted successfully!');
        alert('Thank you! Your message has been received. I will contact you soon.');
        setFormData({
          name: '',
          email: '',
          company: '',
          inquiry: '',
        });
      } else {
        setStatus(`Error: ${result.message}`);
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setStatus(`Error: ${error.message}`);
        alert(`Error: ${error.message}`);
      } else {
        setStatus('An unexpected error occurred');
        alert('An unexpected error occurred');
      }
    }
  };

  return (
    <main>
      <motion.div
        className="cursor"
        style={{
          left: cursorX! - 25,
          top: cursorY! - 25,
          transform: `scale(${cursorScale})`
        }}
      >Learn More</motion.div>
      <motion.div
        ref={topRefView}
        className="flex items-center justify-between 5xl:p-16 p-12 5xl:px-48 px-40 text-lightblack"
        initial={{ opacity: 0, y: -140 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="5xl:text-6xl text-5xl font-bold">VC</div>
        <div className="flex items-row 5xl:text-4xl text-3xl font-semibold 5xl:space-x-28 space-x-24">
          {["Portfolio", "About", "Contact"].map((item) => (
            <motion.div
              key={item}
              className="relative"
              whileHover="hover"
              initial="initial"
              animate="initial"
              whileTap={{ scale: 0.85 }}
            >
              <button 
                className="relative z-10"
                onClick={() => {
                  if (item === "Portfolio") {
                    portfolioRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }
                  if (item === "About") {
                    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }
                  if (item === "Contact") {
                    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
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
        style={{ opacity, y, pointerEvents: isMainClickable ? 'auto' : 'none' }}
        initial={{ opacity: 1, y: 0 }}
        transition={{ ease: 'easeOut' }}
      >
        <div className="flex justify-between 5xl:pt-48 5xl:px-48 pt-36 px-40">
          <div className="flex flex-col justify-between">
            <div>
              <div className="truncate">
                <motion.div
                  className="mt-4 5xl:text-12xl text-9xl font-bold text-lightblack leading-none"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  VICTOR CHUNG
                </motion.div>
              </div>
              <div className="mt-2 5xl:px-12 px-10">
                <div className="truncate pb-2">
                  <motion.div
                    className="5xl:text-7xl text-6xl font-bold text-skyblue"
                    initial={{ y: "-110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    Full Stack Developer
                  </motion.div>
                </div>
                <div className="5xl:mt-6 mt-4 space-x-8">
                  <motion.button
                    className="rounded-lg bg-white 5xl:text-3xl text-2xl font-medium 5xl:py-6 py-4 overflow-hidden whitespace-nowrap"
                    initial={{ width: 0, paddingLeft: 0, paddingRight: 0 }}
                    animate={{ width: "18rem", paddingLeft: "2rem", paddingRight: "2rem" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    whileTap={{ scale: 0.85 }}
                    onClick={() => portfolioRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <p className="line-clamp-1">View Portfolio</p>
                  </motion.button>
                  <motion.button
                    className="rounded-lg bg-white 5xl:text-3xl text-2xl font-medium 5xl:py-6 py-4 overflow-hidden whitespace-nowrap"
                    initial={{ width: 0, paddingLeft: 0, paddingRight: 0 }}
                    animate={{ width: "18rem", paddingLeft: "2rem", paddingRight: "2rem" }}
                    whileTap={{ scale: 0.85 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    onClick={openResume}
                  >
                    <p className="line-clamp-1">View Resume</p>
                  </motion.button>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex space-x-4 5xl:px-12 px-10">
                <Link href="https://www.linkedin.com/in/victor-chung-ca/" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    className="flex justify-center items-center rounded-lg bg-skyblue w-16 h-16"
                    initial={{ width: 0 }}
                    animate={{ width: "4rem" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    layout="preserve-aspect"
                    whileTap={{ scale: 0.85 }}
                  >
                    <div className="w-14 h-14 relative">
                      <Image src="/linkedin.png" alt="LinkedIn" layout="fill" />
                    </div>
                  </motion.button>
                </Link>
                <Link href="https://github.com/TheVicBro" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    className="flex justify-center items-center rounded-lg bg-skyblue w-16 h-16"
                    initial={{ width: 0 }}
                    animate={{ width: "4rem" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    layout="preserve-aspect"
                    whileTap={{ scale: 0.85 }}
                  >
                    <div className="w-14 h-14 relative">
                      <Image src="/github.png" alt="GitHub" layout="fill" />
                    </div>
                  </motion.button>
                </Link>
              </div>
              <div className="relative">
                <div className="absolute z-10 5xl:bottom-40 bottom-28 5xl:right-20 right-16 5xl:w-64 5xl:h-60 w-48 h-40 bg-white rounded-lg"></div>
                <div className="absolute z-10 bottom-0 5xl:right-48 right-36 5xl:w-64 5xl:h-56 w-48 h-40 bg-white rounded-lg"></div>
              </div>
            </div>
          </div>
          <div className="bg-lightblack w-1/4 h-112 5xl:h-160 rounded-lg">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="w-full h-full p-6">
                <img src="/profilepic.jpg" alt="profile" className="rounded-lg w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="relative">
          <div className="flex 5xl:mt-64 mt-48 px-48 justify-between text-lightblack">
            <div>ONTARIO, CANADA</div>
            <div>(SCROLL FOR MORE)</div>
          </div>
        </div>
      </motion.div>
      <div ref={portfolioRef} className="relative bg-lightblack z-20 rounded-3xl px-48 py-16">
        <motion.div
          ref={portfolioRefView}
          className="5xl:text-10xl text-9xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={portfolioInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          PORTFOLIO
        </motion.div>
        <div className="flex mb-36">
          <motion.div
            ref={portfolioItemRef1}
            className="flex-col w-2/5 mr-8"
            initial={{ opacity: 0, x: -50 }}
            animate={portfolioItemInView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="5xl:text-12xl text-10xl font-medium text-skyblue leading-none">01.</div>
            <div className="5xl:text-4xl text-3xl text-gray-400 mb-4 mt-8">ROUT3</div>
            <div className="5xl:text-5xl text-4xl text-white">LLM Proxy Web App</div>
          </motion.div>
          <motion.div
            className="w-11/12 cursor-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={portfolioItemInView1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src="/rout3.png" alt="rout3" className="object-cover rounded-lg flex-grow" draggable="false" />
          </motion.div>
        </div>
        <div className="flex mb-36">
          <motion.div
            ref={portfolioItemRef2}
            className="flex-col w-2/5 mr-8"
            initial={{ opacity: 0, x: -50 }}
            animate={portfolioItemInView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="5xl:text-12xl text-10xl font-medium text-skyblue leading-none">02.</div>
            <div className="5xl:text-4xl text-3xl  text-gray-400 mb-4 mt-8">GOEASY</div>
            <div className="5xl:text-5xl text-4xl text-white">Web App UI</div>
          </motion.div>
          <motion.div
            className="w-11/12 cursor-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={portfolioItemInView2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src="/goeasy.png" alt="goeasy" className="object-cover rounded-lg flex-grow" draggable="false" />
          </motion.div>
        </div>
        <div className="flex mb-36">
          <motion.div
            ref={portfolioItemRef3}
            className="flex-col w-2/5 mr-8"
            initial={{ opacity: 0, x: -50 }}
            animate={portfolioItemInView3 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="5xl:text-12xl text-10xl font-medium text-skyblue leading-none">03.</div>
            <div className="5xl:text-4xl text-3xl text-gray-400 mb-4 mt-8">ROUT3</div>
            <div className="5xl:text-5xl text-4xl text-white">LLM Proxy Landing Page</div>
          </motion.div>
          <motion.div
            className="w-11/12 cursor-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={portfolioItemInView3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src="/llmproxy.png" alt="llmproxy" className="object-cover rounded-lg flex-grow" draggable="false" />
          </motion.div>
        </div>
      </div>
      <div ref={aboutRef} className="flex relative px-48 5xl:py-32 py-24 h-screen">
        <div className="w-1/3 my-12 relative">
          <div className="relative w-full h-full">
            <Image
              src="/about.png"
              alt="about"
              layout="fill"
              className="rounded-lg"
              draggable="false"
            />
          </div>
        </div>
        <div className="flex flex-col items-center w-2/3 pl-24 5xl:pt-36 pt-32">
          <div className="5xl:text-10xl text-8xl font-bold text-center text-lightblack">
            ABOUT ME
          </div>
          <div className="5xl:text-4xl text-3xl text-center font-medium 5xl:leading-relaxed leading-normal mt-8">
            I&apos;m a Computer Engineering student at York University with a passion for full-stack development. As Lead Full Stack Developer at Rout3, I led projects like the LLM Proxy Dashboard. At goeasy, I worked as a Front End Developer, enhancing UI/UX for banking applications. My experience also includes optimizing workflows at the Ontario Ministry of Health. I excel in solving complex problems and creating impactful, user-friendly software.
          </div>
          <div>
            <motion.button 
              className="rounded-lg bg-white 5xl:text-3xl text-2xl font-medium 5xl:py-6 py-4 px-8 mt-16"
              whileTap={{ scale: 0.85 }} 
              onClick={openResume}
            >
              View Resume
            </motion.button>
          </div>
        </div>
      </div>
      <div ref={contactRef} className="z-40 bg-lightblack flex flex-col items-center px-48 5xl:py-32 py-24 h-screen">
        <div className="flex 5xl:text-10xl text-8xl font-bold text-center text-white">
          CONTACT
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="mt-32 flex text-white text-5xl space-x-8 h-full">
              <div className="flex flex-col">
                <div>
                  <div>
                    Name
                    <a className="text-skyblue">*</a>
                  </div>
                  <div>
                    <input 
                      type="text" 
                      name="name"
                      className="mt-4 border-4 border-white px-4 py-2 bg-lightblack rounded" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <div>
                    Email
                    <a className="text-skyblue">*</a>
                  </div>
                  <div>
                    <input 
                      type="email"
                      name="email"
                      className="mt-4 border-4 border-white px-4 py-2 bg-lightblack rounded" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <div>
                    Company
                    <a className="text-skyblue">*</a>
                  </div>
                  <div>
                    <input 
                      type="text" 
                      name="company" 
                      className="mt-4 border-4 border-white px-4 py-2 bg-lightblack rounded"
                      value={formData.company} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div>
                  Inquiry
                  <a className="text-skyblue">*</a>
                </div>
                <div>
                  <textarea 
                    name="inquiry"
                    className="mt-4 h-full border-4 border-white p-4 bg-lightblack rounded resize-none" 
                    rows={8} 
                    value={formData.inquiry} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
            </div>
          </div>
          <motion.button 
            className="bg-skyblue text-4xl text-white rounded-lg my-12 p-4" type="submit"
            whileTap={{ scale: 0.85 }}
          >
            Submit
          </motion.button>
        </form>
        <div className="flex items-center justify-between w-full mt-12">
          <div className="flex 5xl:text-6xl text-6xl font-bold text-left text-white">
            © 2024 VICTOR CHUNG
          </div>
          <div>
            <motion.button 
              className="bg-skyblue text-white text-6xl rounded-full w-32 h-32"
              whileTap={{ scale: 0.85 }}
              onClick={() => topRefView.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              ↑
            </motion.button>
          </div>
        </div>
      </div>
    </main>
  );
}
