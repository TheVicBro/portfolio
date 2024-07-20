"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { AnimatedText } from '../components/AnimatedText';
import Navbar from '../components/Navbar';
import { useSearchParams, useRouter } from 'next/navigation';  
import { Suspense } from 'react';

type FormData = {
  name: string;
  email: string;
  company: string;
  inquiry: string;
};

function MainContent() {
  const { scrollY } = useScroll();
  const [scrollRange, setScrollRange] = useState({ start: 0, end: 1500 });
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      let check = window.innerWidth >= 1024;
      setIsLg(check);
      if (check) {
        setScrollRange({ start: 0, end: 1500 });
      } else {
        setScrollRange({ start: 0, end: 800 });
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePortfolioItemClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    setIsAnimating(true);
    setCursorScale(2.5);
    setTimeout(() => {
      setIsAnimating(false);
      router.push(url);
    }, 200);
  };

  const opacity = useTransform(scrollY, [scrollRange.start, scrollRange.end], [1, 0]);
  const y = useTransform(scrollY, [scrollRange.start, scrollRange.end], [0, 200]);

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
  const aboutPictureRef = useRef(null);
  const isInView = useInView(aboutPictureRef, { amount: 0.5 });

  // When coming from a different page, scroll to the section specified in the URL
  const searchParams = useSearchParams();
  useEffect(() => {
    const section = searchParams?.get('section');
    if (section) {
      if (section === 'Portfolio') {
        portfolioRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else if (section === 'About') {
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else if (section === 'Contact') {
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [searchParams]);

  const openResume = () => {
    window.open('/VictorChung_Resume.pdf', '_blank', 'noopener,noreferrer');
  };

  const portfolioRefView = useRef(null);
  const portfolioInView = useInView(portfolioRefView, { once: true, amount: 0.2 });
  const portfolioItemRef1 = useRef(null);
  const portfolioItemInView1 = useInView(portfolioItemRef1, { once: true, amount: 0.2 });
  const portfolioItemRef2 = useRef(null);
  const portfolioItemInView2 = useInView(portfolioItemRef2, { once: true, amount: 0.2 });
  const portfolioItemRef3 = useRef(null);
  const portfolioItemInView3 = useInView(portfolioItemRef3, { once: true, amount: 0.2 });

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
          transform: `scale(${isAnimating ? cursorScale * 0.8 : cursorScale})`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        Learn More
      </motion.div>
      <div ref={topRefView}/>
      <motion.div 
        className="h-screen sticky top-0 flex flex-col justify-between"
        style={{ opacity, y, pointerEvents: isMainClickable ? 'auto' : 'none' }}
        initial={{ opacity: 1, y: 0 }}
        transition={{ ease: 'easeOut' }}
      >
        <Navbar portfolioRef={portfolioRef} aboutRef={aboutRef} contactRef={contactRef} />
        <div className="flex lg:flex-row flex-col-reverse justify-between 5xl:px-48 4xl:px-40 lg:px-36 px-8">
          <div className="flex flex-col justify-between lg:text-left text-center">
            <div>
              <div className="truncate">
                <motion.div
                  className="mt-4 5xl:text-12xl 4xl:text-9xl 3xl:text-8.5xl lg:text-7xl text-4.5xl font-bold text-lightblack leading-none"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  VICTOR CHUNG
                </motion.div>
              </div>
              <div className="mt-1 5xl:px-12 lg:px-10 px-4">
                <div className="truncate pb-2">
                  <motion.div
                    className="5xl:text-7xl 4xl:text-6xl lg:text-5xl text-2.5xl font-bold text-skyblue"
                    initial={{ y: "-110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    Full Stack Developer
                  </motion.div>
                </div>
                <div className="flex 5xl:mt-6 mt-1 lg:space-x-8 space-x-2 lg:justify-start justify-center">
                  <motion.button
                    className="rounded-lg bg-white 5xl:text-3xl lg:text-2xl text-xl font-medium 5xl:py-6 lg:py-4 py-3 overflow-hidden whitespace-nowrap"
                    initial={{ width: 0, paddingLeft: 0, paddingRight: 0 }}
                    animate={{ width: "var(--width)", paddingLeft: "var(--padding-left)", paddingRight: "var(--padding-right)" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    whileTap={{ scale: 0.85 }}
                    onClick={() => portfolioRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <p className="line-clamp-1">{isLg ? 'View Portfolio' : 'Portfolio'}</p>
                  </motion.button>
                  <motion.button
                    className="rounded-lg bg-white 5xl:text-3xl lg:text-2xl text-xl font-medium 5xl:py-6 lg:py-4 py-3 overflow-hidden whitespace-nowrap"
                    initial={{ width: 0, paddingLeft: 0, paddingRight: 0 }}
                    animate={{ width: "var(--width)", paddingLeft: "var(--padding-left)", paddingRight: "var(--padding-right)" }}
                    whileTap={{ scale: 0.85 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    onClick={openResume}
                  >
                    <p className="line-clamp-1">{isLg ? 'View Resume' : 'Resume'}</p>
                  </motion.button>
                </div>
              </div>
            </div>
            <div className="flex lg:justify-between justify-center items-end">
              <div className="flex space-x-4 5xl:px-12 lg:px-10 px-4 lg:mt-0 mt-4">
                <Link href="https://www.linkedin.com/in/victor-chung-ca/" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    className="flex justify-center items-center rounded-lg bg-skyblue lg:h-16 h-12"
                    initial={{ width: 0 }}
                    animate={{ width: "var(--width-social)" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    layout="preserve-aspect"
                    whileTap={{ scale: 0.85 }}
                  >
                    <div className="lg:w-14 lg:h-14 w-10 h-10 relative">
                      <Image src="/linkedin.png" alt="LinkedIn" layout="fill" />
                    </div>
                  </motion.button>
                </Link>
                <Link href="https://github.com/TheVicBro" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    className="flex justify-center items-center rounded-lg bg-skyblue lg:h-16 h-12"
                    initial={{ width: 0 }}
                    animate={{ width: "var(--width-social)" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    layout="preserve-aspect"
                    whileTap={{ scale: 0.85 }}
                  >
                    <div className="lg:w-14 lg:h-14 w-12 h-12 relative">
                      <Image src="/github.png" alt="GitHub" layout="fill" />
                    </div>
                  </motion.button>
                </Link>
              </div>
              <div className="relative">
                <div className="absolute z-10 5xl:bottom-40 bottom-28 5xl:right-20 right-16 5xl:w-64 5xl:h-60 4xl:w-48 4xl:h-40 bg-white rounded-lg"></div>
                <div className="absolute z-10 bottom-0 5xl:right-48 right-36 5xl:w-64 5xl:h-56 4xl:w-48 4xl:h-40 bg-white rounded-lg"></div>
              </div>
            </div>
          </div>
          <div className="bg-lightblack lg:w-1/4 5xl:h-160 4xl:h-112 2xl:h-96 lg:h-76 h-88 lg:mt-0 mt-4 rounded-lg">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="w-full h-full 2xl:p-6 p-4">
                <img src="/profilepic.jpg" alt="profile" className="rounded-lg w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="flex lg:mb-8 mb-4 lg:text-md text-sm lg:px-48 px-8 justify-between text-lightblack">
          <div>ONTARIO, CANADA</div>
          <div>(SCROLL FOR MORE)</div>
        </div>
      </motion.div>
      <div ref={portfolioRef} className="relative bg-lightblack z-20 rounded-3xl 5xl:px-48 4xl:px-40 lg:px-36 px-8 lg:py-32 py-16">
        <motion.div
          ref={portfolioRefView}
          className="5xl:text-10xl 4xl:text-9xl lg:text-8xl text-5xl font-bold text-white lg:mb-24 mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={portfolioInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          PORTFOLIO
        </motion.div>
        <div className="flex lg:mb-36 mb-24">
          <motion.div
            ref={portfolioItemRef1}
            className="flex-col w-2/5 lg:mr-8 mr-2"
            initial={{ opacity: 0, x: -50 }}
            animate={portfolioItemInView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="5xl:text-12xl 4xl:text-10xl lg:text-9xl text-6xl font-medium text-skyblue leading-none">01.</div>
            <div className="5xl:text-4xl 4xl:text-3xl lg:text-2xl text-sm text-gray-400 lg:mb-4 lg:mt-8 mt-2">ROUT3</div>
            <div className="5xl:text-5xl 4xl:text-4xl lg:text-3xl text-lg text-white">LLM Proxy Web App</div>
          </motion.div>
          <motion.div
            className="w-11/12 cursor-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={portfolioItemInView1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/rout3" className="cursor-none" onClick={(e) => handlePortfolioItemClick(e, '/rout3')}>
              <img src="/rout3.png" alt="rout3" className="object-cover rounded-lg flex-grow" draggable="false" />
            </Link>
          </motion.div>
        </div>
        <div className="flex lg:mb-36 mb-24">
          <motion.div
            ref={portfolioItemRef2}
            className="flex-col w-2/5 lg:mr-8 mr-2"
            initial={{ opacity: 0, x: -50 }}
            animate={portfolioItemInView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="5xl:text-12xl 4xl:text-10xl lg:text-9xl text-6xl font-medium text-skyblue leading-none">02.</div>
            <div className="5xl:text-4xl 4xl:text-3xl lg:text-2xl text-sm text-gray-400 lg:mb-4 lg:mt-8 mt-2">GOEASY</div>
            <div className="5xl:text-5xl 4xl:text-4xl lg:text-3xl text-lg text-white">Web App UI</div>
          </motion.div>
          <motion.div
            className="w-11/12 cursor-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={portfolioItemInView2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/goeasy" className="cursor-none" onClick={(e) => handlePortfolioItemClick(e, '/goeasy')}>
              <img src="/goeasy.png" alt="goeasy" className="object-cover rounded-lg flex-grow" draggable="false" />
            </Link>
          </motion.div>
        </div>
        <div className="flex lg:mb-36 mb-8">
          <motion.div
            ref={portfolioItemRef3}
            className="flex-col w-2/5 lg:mr-8 mr-2"
            initial={{ opacity: 0, x: -50 }}
            animate={portfolioItemInView3 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="5xl:text-12xl 4xl:text-10xl lg:text-9xl text-6xl font-medium text-skyblue leading-none">03.</div>
            <div className="5xl:text-4xl 4xl:text-3xl lg:text-2xl text-sm text-gray-400 lg:mb-4 lg:mt-8 mt-2">ROUT3</div>
            <div className="5xl:text-5xl 4xl:text-4xl lg:text-3xl text-lg text-white">LLM Proxy Landing Page</div>
          </motion.div>
          <motion.div
            className="w-11/12 cursor-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={portfolioItemInView3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/llmproxy" className="cursor-none" onClick={(e) => handlePortfolioItemClick(e, '/llmproxy')}>
              <img src="/llmproxy.png" alt="llmproxy" className="object-cover rounded-lg flex-grow" draggable="false" />
            </Link>
          </motion.div>
        </div>
      </div>
      <div ref={aboutRef} className="flex lg:flex-row flex-col relative 5xl:px-48 4xl:px-40 lg:px-36 px-8 5xl:py-32 4xl:py-24 py-8 lg:h-screen h-auto">
        <div className="lg:w-1/3 w-full 4xl:my-12 relative lg:mb-0 mb-8 flex items-center">
          <motion.div
            ref={aboutPictureRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full"
          >
            <div className="relative w-full lg:h-full h-auto">
              <Image
                src="/about.png"
                alt="about"
                layout="responsive"
                width={835} 
                height={1190}
                className="rounded-lg"
                draggable="false"
              />
            </div>
          </motion.div>
        </div>
        <div className="flex flex-col justify-center items-center lg:w-2/3 lg:pl-24 pl-2">
          <AnimatedText
            className="5xl:text-10xl 4xl:text-8xl lg:text-7xl text-5xl font-bold text-center text-lightblack"
            text={["ABOUT ME"]}
            staggerChildren={0.1}
            animateMode="char"
            once={true}
          />
          <AnimatedText
            className="5xl:text-4xl 4xl:text-3xl lg:text-2xl text-xl text-center font-medium 5xl:leading-relaxed leading-normal mt-8"
            text={["I'm a Computer Engineering student at York University with a passion for full-stack development. As Lead Full Stack Developer at Rout3, I led projects like the LLM Proxy Dashboard. At goeasy, I worked as a Front End Developer, enhancing UI/UX for banking applications. My experience also includes optimizing workflows at the Ontario Ministry of Health. I excel in solving complex problems and creating impactful, user-friendly software."]}
            staggerChildren={0.01}
            animateMode="word"
            once={true}
          />
          <div>
            <motion.button 
              className="rounded-lg bg-white 5xl:text-3xl text-2xl font-medium 5xl:py-6 py-4 px-8 4xl:mt-16 lg:mt-10 m-8"
              whileTap={{ scale: 0.85 }} 
              onClick={openResume}
            >
              View Resume
            </motion.button>
          </div>
        </div>
      </div>
      <div ref={contactRef} className="z-40 bg-lightblack flex flex-col justify-between items-center lg:px-48 px-8 5xl:pt-32 5xl:pb-16 4xl:pt-24 4xl:pb-8 pt-16 pb-4 lg:h-screen h-auto">

          <div className="flex justify-center 5xl:text-10xl 4xl:text-8xl lg:text-7xl text-5xl font-bold text-center text-white">
            CONTACT
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-screen-lg mx-auto">
            <div>
              <div className="flex lg:flex-row flex-col text-white 5xl:text-5xl 4xl:text-4xl lg:text-2xl text-3xl lg:mt-0 mt-12 lg:space-x-8 space-y-4 lg:space-y-0 lg:h-full h-auto">
                <div className="flex flex-col w-full lg:w-1/2">
                  <div>
                    <div>
                      Name
                      <a className="text-skyblue">*</a>
                    </div>
                    <div>
                      <input 
                        type="text" 
                        name="name"
                        className="4xl:mt-4 mt-2 border-4 border-white px-4 py-2 bg-lightblack rounded w-full lg:max-w-lg max-w-sm mx-auto" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>
                  <div className="lg:mt-6 mt-4">
                    <div>
                      Email
                      <a className="text-skyblue">*</a>
                    </div>
                    <div>
                      <input 
                        type="email"
                        name="email"
                        className="4xl:mt-4 mt-2 border-4 border-white px-4 py-2 bg-lightblack rounded w-full lg:max-w-lg max-w-sm mx-auto" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>
                  <div className="lg:mt-6 mt-4">
                    <div>
                      Company
                      <a className="text-skyblue">*</a>
                    </div>
                    <div>
                      <input 
                        type="text" 
                        name="company" 
                        className="4xl:mt-4 mt-2 border-4 border-white px-4 py-2 bg-lightblack rounded w-full lg:max-w-lg max-w-sm mx-auto"
                        value={formData.company} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full lg:w-1/2 lg:mt-0 mt-4">
                  <div>
                    Inquiry
                    <a className="text-skyblue">*</a>
                  </div>
                  <div>
                    <textarea 
                      name="inquiry"
                      className="4xl:mt-4 mt-2 border-4 border-white p-4 bg-lightblack rounded w-full lg:max-w-lg max-w-sm mx-auto resize-none" 
                      rows={8} 
                      value={formData.inquiry} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:mb-0 mb-8">
              <motion.button 
                className="bg-skyblue 5xl:text-5xl 4xl:text-4xl lg:text-2xl text-3xl text-white rounded-lg 5xl:mt-12 4xl:mt-8 mt-4 5xl:p-6 p-4" 
                type="submit"
                whileTap={{ scale: 0.85 }}
              >
                Submit
              </motion.button>
            </div>
          </form>

        <div className="flex items-center justify-between w-full mt-0">
          <div className="flex 5xl:text-6xl 4xl:text-6xl 2xl:text-5xl text-4xl font-bold text-left text-white">
            © 2024 VICTOR CHUNG
          </div>
          <div>
            <motion.button 
              className="bg-skyblue text-white text-5xl rounded-full 4xl:w-32 4xl:h-32 lg:w-20 lg:h-20 w-24 h-24"
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

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainContent />
    </Suspense>
  );
}
