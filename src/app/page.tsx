"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { AnimatedText } from '../components/AnimatedText';
import Navbar from '../components/Navbar';
import { useSearchParams, useRouter } from 'next/navigation';  
import { Suspense } from 'react';
import FloatingMenuButton from '../components/FloatingMenuButton';
import MobileMenu from '../components/MobileMenu';

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
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Monitor scroll position to show floating menu
  useEffect(() => {
    const isScrolling = {current: false};
    let scrollTimeout: NodeJS.Timeout;
    
    const updateFloatingMenu = () => {
      if (isScrolling.current) return;
      
      isScrolling.current = true;
      
      // Show floating menu when scrolled past hero section
      const isPastHero = window.scrollY > window.innerHeight;
      
      // Hide floating menu when near bottom of page (300px from bottom)
      const isNearBottom = window.innerHeight + window.scrollY + 300 >= document.body.offsetHeight;
      
      setShowFloatingMenu(isPastHero && !isNearBottom);
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling.current = false;
      }, 50);
    };

    // Initial check without scroll
    setShowFloatingMenu(window.scrollY > window.innerHeight && 
      !(window.innerHeight + window.scrollY + 300 >= document.body.offsetHeight));
    
    window.addEventListener('scroll', updateFloatingMenu, { passive: true });
    
    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', updateFloatingMenu);
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

  const careerRef = useRef<HTMLDivElement|null>(null);
  const careerRefView = useRef(null);
  const careerItemRef1 = useRef(null);
  const careerItemRef2 = useRef(null);
  const careerItemRef3 = useRef(null);
  const careerItemRef4 = useRef(null);
  const careerItemRef5 = useRef(null);

  const careerInView = useInView(careerRefView, { once: true, amount: 0.2 });
  const careerItemInView1 = useInView(careerItemRef1, { once: true, amount: 0.2 });
  const careerItemInView2 = useInView(careerItemRef2, { once: true, amount: 0.2 });
  const careerItemInView3 = useInView(careerItemRef3, { once: true, amount: 0.2 });
  const careerItemInView4 = useInView(careerItemRef4, { once: true, amount: 0.2 });
  const careerItemInView5 = useInView(careerItemRef5, { once: true, amount: 0.2 });

  // When coming from a different page, scroll to the section specified in the URL
  const searchParams = useSearchParams();
  useEffect(() => {
    const section = searchParams?.get('section');
    if (section) {
      if (section === 'Portfolio') {
        portfolioRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else if (section === 'Career') {
        careerRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  const [isHovered, setIsHovered] = useState(false);

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
      <FloatingMenuButton 
        isVisible={showFloatingMenu && window.innerWidth < 1024} 
        onClick={() => setIsMobileMenuOpen(true)}
        menuOpen={isMobileMenuOpen}
      />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        portfolioRef={portfolioRef}
        careerRef={careerRef}
        aboutRef={aboutRef}
        contactRef={contactRef}
        router={router}
      />
      <motion.div 
        className="h-screen sticky top-0 flex flex-col justify-between pb-12 md:pb-0"
        style={{ opacity, y, pointerEvents: isMainClickable ? 'auto' : 'none' }}
        initial={{ opacity: 1, y: 0 }}
        transition={{ ease: 'easeOut' }}
      >
        <Navbar portfolioRef={portfolioRef} careerRef={careerRef} aboutRef={aboutRef} contactRef={contactRef} />
        <div className="flex lg:flex-row flex-col-reverse justify-center lg:justify-between h-[50%] md:h-[45%] 5xl:h-1/2 5xl:px-48 4xl:px-40 lg:px-24 px-8">
          <div className="flex flex-col justify-between lg:text-left text-center -mb-36 lg:mb-0">
            <div>
              <div className="truncate">
                <motion.div
                  className="mt-4 5xl:text-12xl 4xl:text-9xl 3xl:text-8.5xl xl:text-8xl lg:text-7xl md:text-6xl text-4.5xl font-bold text-lightblack leading-none"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  VICTOR CHUNG
                </motion.div>
              </div>
              <div className="mt-1 5xl:px-12 lg:px-10 px-4 pb-4">
                <div className="truncate py-4">
                  <motion.div
                    className="5xl:text-7xl 4xl:text-6xl lg:text-5xl md:text-4xl text-2.5xl font-bold text-skyblue leading-none lg:leading-normal"
                    initial={{ y: "-250%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <span className="gradient-bg bg-clip-text px-4 py-2 text-white rounded-xl">
                      Full Stack Engineer
                    </span>
                  </motion.div>
                </div>
                <div className="flex mt-2 md:mt-6 lg:space-x-8 space-x-2 lg:justify-start justify-center">
                  <motion.div
                    className="relative rounded-lg overflow-visible lg:w-44 xl:w-48 2xl:w-52 4xl:w-64 5xl:w-72 w-32"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <motion.div 
                      className="absolute inset-0 -z-10 bg-gradient-to-r from-skyblue to-blue-400 rounded-lg blur-sm"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 0, scale: 0.95 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      variants={{
                        hover: { opacity: 0.7, scale: 1.08 },
                        initial: { opacity: 0, scale: 0.95 }
                      }}
                    />
                    <motion.button
                      className="relative z-10 rounded-lg bg-white 5xl:text-3xl lg:text-2xl text-xl font-medium 5xl:py-6 lg:py-4 py-3 overflow-hidden whitespace-nowrap px-4 lg:px-6 w-full"
                      onClick={() => portfolioRef.current?.scrollIntoView({ behavior: 'smooth' })}
                      whileHover="hover"
                      initial="initial"
                      whileTap={{ scale: 0.95 }}
                      variants={{
                        hover: { scale: 1.05 },
                        initial: { scale: 1 }
                      }}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-skyblue to-blue-400 rounded-lg"
                        variants={{
                          hover: { opacity: 0.15 },
                          initial: { opacity: 0 }
                        }}
                      />
                      <motion.p 
                        className="relative z-10 line-clamp-1"
                        variants={{
                          hover: { color: "#1d4ed8" },
                          initial: { color: "#000000" }
                        }}
                      >
                        {isLg ? 'View Portfolio' : 'Portfolio'}
                      </motion.p>
                    </motion.button>
                  </motion.div>

                  <motion.div
                    className="relative rounded-lg overflow-visible lg:w-44 xl:w-48 2xl:w-52 4xl:w-64 5xl:w-72 w-32"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <motion.div 
                      className="absolute inset-0 -z-10 bg-gradient-to-r from-skyblue to-blue-400 rounded-lg blur-sm"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 0, scale: 0.95 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      variants={{
                        hover: { opacity: 0.7, scale: 1.08 },
                        initial: { opacity: 0, scale: 0.95 }
                      }}
                    />
                    <motion.button
                      className="relative z-10 rounded-lg bg-white 5xl:text-3xl lg:text-2xl text-xl font-medium 5xl:py-6 lg:py-4 py-3 overflow-hidden whitespace-nowrap px-4 lg:px-6 w-full"
                      onClick={openResume}
                      whileHover="hover"
                      initial="initial"
                      whileTap={{ scale: 0.95 }}
                      variants={{
                        hover: { scale: 1.05 },
                        initial: { scale: 1 }
                      }}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-skyblue to-blue-400 rounded-lg"
                        variants={{
                          hover: { opacity: 0.15 },
                          initial: { opacity: 0 }
                        }}
                      />
                      <motion.p 
                        className="relative z-10 line-clamp-1"
                        variants={{
                          hover: { color: "#1d4ed8" },
                          initial: { color: "#000000" }
                        }}
                      >
                        {isLg ? 'View Resume' : 'Resume'}
                      </motion.p>
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex lg:justify-between justify-center items-end">
              <div className="flex space-x-4 5xl:px-12 lg:px-10 px-4">
                <Link href="https://www.linkedin.com/in/victor-chung-ca/" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    className="flex justify-center items-center rounded-lg bg-skyblue h-10 md:h-12 lg:h-16 hover:bg-blue-500 transition-colors shadow-lg"
                    initial={{ width: 0 }}
                    animate={{ width: "var(--width-social)", transition: { duration: 1, ease: "easeOut" } }}
                    layout="preserve-aspect"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.85 }}
                  >
                    <div className="w-8 md:w-10 lg:w-14 h-8 md:h-10 lg:h-14 relative">
                      <Image src="/linkedin.png" alt="LinkedIn" fill />
                    </div>
                  </motion.button>
                </Link>
                <Link href="https://github.com/TheVicBro" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    className="flex justify-center items-center rounded-lg bg-skyblue h-10 md:h-12 lg:h-16 hover:bg-blue-500 transition-colors shadow-lg"
                    initial={{ width: 0 }}
                    animate={{ width: "var(--width-social)", transition: { duration: 1, ease: "easeOut" } }}
                    layout="preserve-aspect"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.85 }}
                  >
                    <div className="w-8 md:w-10 lg:w-14 h-8 md:h-10 lg:h-14 relative">
                      <Image src="/github.png" alt="GitHub" fill />
                    </div>
                  </motion.button>
                </Link>
              </div>
              <div className="relative">
                <motion.div 
                  className="absolute z-10 5xl:bottom-40 bottom-16 5xl:right-20 right-16 5xl:w-64 5xl:h-60 4xl:w-48 4xl:h-40 bg-white rounded-lg shadow-lg floating-element"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                ></motion.div>
                <motion.div 
                  className="absolute z-10 bottom-[-12px] 5xl:right-48 right-36 5xl:w-64 5xl:h-56 4xl:w-48 4xl:h-40 bg-white rounded-lg shadow-lg floating-element"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                ></motion.div>
              </div>
            </div>
          </div>
          <div className="bg-lightblack min-w-64 lg:w-1/3 3xl:w-1/4 lg:mx-0 sm:mx-44 h-full rounded-lg -mt-[8.5rem] lg:mt-0 shadow-xl">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full"
            >
              <div className="w-full h-full 2xl:p-6 p-4">
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                  <Image src="/victor.jpg" alt="profile" className="rounded-lg object-cover hover:scale-105 transition-transform duration-500" fill />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div 
          className="flex lg:mb-8 mb-4 2xl:text-xl xl:text-lg lg:text-md text-sm 5xl:px-48 4xl:px-40 lg:px-28 px-8 justify-between text-lightblack"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>ONTARIO, CANADA</div>
          <div className="scrolldown-indicator flex items-center">
            (SCROLL FOR MORE)
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-1"
            >
              ↓
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
      
      <div ref={portfolioRef} className="relative bg-lightblack z-20 rounded-3xl 5xl:px-48 4xl:px-40 lg:px-24 px-8 lg:py-32 py-16 shadow-2xl">
        <motion.div
          ref={portfolioRefView}
          className="text-center md:text-left 5xl:text-10xl 4xl:text-9xl lg:text-8xl text-5xl font-bold text-white lg:mb-24 mb-16 md:mt-10 mt-4"
          initial={{ opacity: 0, y: -50 }}
          animate={portfolioInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="gradient-bg bg-clip-text rounded-xl px-4 md:px-8 py-2">PORTFOLIO</span>
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
            <div className="5xl:text-5xl 4xl:text-4xl lg:text-3xl text-lg text-white">Dashboard</div>
          </motion.div>
          <motion.div
            className="w-11/12 cursor-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={portfolioItemInView1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onMouseEnter={() => {
              handleMouseEnter();
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              handleMouseLeave();
              setIsHovered(false);
            }}
          >
            <Link href="/rout3" className="cursor-none group" onClick={(e) => handlePortfolioItemClick(e, '/rout3')}>
              <div className="overflow-hidden rounded-lg shadow-xl">
                <Image 
                  src={isHovered ? "/rout3.gif" : "/rout3.png"}  
                  alt="rout3" 
                  width={1920} 
                  height={1080} 
                  className="object-cover rounded-lg flex-grow transform transition-transform duration-700 group-hover:scale-105" 
                  draggable="false" 
                />
              </div>
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
            <Link href="/goeasy" className="cursor-none group" onClick={(e) => handlePortfolioItemClick(e, '/goeasy')}>
              <div className="overflow-hidden rounded-lg shadow-xl">
                <Image 
                  src="/goeasy.png" 
                  alt="goeasy" 
                  width={1920} 
                  height={1080} 
                  className="object-cover rounded-lg flex-grow transform transition-transform duration-700 group-hover:scale-105" 
                  draggable="false" 
                />
              </div>
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
            <div className="5xl:text-4xl 4xl:text-3xl lg:text-2xl text-sm text-gray-400 lg:mb-4 lg:mt-8 mt-2">NOBL KIDS</div>
            <div className="5xl:text-5xl 4xl:text-4xl lg:text-3xl text-lg text-white">Landing Page</div>
          </motion.div>
          <motion.div
            className="w-11/12 cursor-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={portfolioItemInView3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/noblkids" className="cursor-none group" onClick={(e) => handlePortfolioItemClick(e, '/noblkids')}>
              <div className="overflow-hidden rounded-lg shadow-xl">
                <Image 
                  src="/noblkids.png" 
                  alt="noblkids" 
                  width={1920} 
                  height={1080} 
                  className="object-cover rounded-lg flex-grow transform transition-transform duration-700 group-hover:scale-105" 
                  draggable="false" 
                />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      <div ref={careerRef} className="relative bg-gradient-to-b from-[#2A2A2A] to-[#383838] z-20 rounded-b-3xl rounded-t-none 5xl:px-48 4xl:px-40 lg:px-24 px-8 lg:py-32 py-16 shadow-2xl overflow-hidden -mt-10">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-skyblue/20 blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-blue-300/20 blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-white/5 blur-[80px] -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <motion.div
          ref={careerRefView}
          className="text-center md:text-left 5xl:text-10xl 4xl:text-9xl lg:text-8xl text-5xl font-bold text-white lg:mb-24 mb-16 relative z-10 md:mt-10 mt-4"
          initial={{ opacity: 0, y: -50 }}
          animate={careerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="gradient-bg bg-clip-text px-4 md:px-8 py-2 rounded-xl">CAREER</span>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 relative z-10">
          {/* Pelmorex */}
          <motion.div
            ref={careerItemRef1}
            className="group relative p-[2px] rounded-xl bg-gradient-to-br from-skyblue via-blue-400 to-blue-300"
            initial={{ opacity: 0, y: 50 }}
            animate={careerItemInView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.04 }}
          >
            <div className="bg-[#2A2A2A] rounded-xl p-8 h-full">
              <div className="relative w-full h-24 md:h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/pelmorex.jpg"
                  alt="Pelmorex"
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0"></div>
              </div>
              
              <div className="flex flex-col justify-between h-[calc(100%-14rem)]">
                <div>
                  <div className="text-3xl font-bold text-white mb-2">Pelmorex Corp</div>
                  <div className="text-xl text-skyblue mb-2">Software Engineer Intern</div>
                  <div className="text-white/80 mb-4">Sep 2024 - Apr 2025</div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-skyblue/20 transition-colors">Go</span>
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-skyblue/20 transition-colors">TypeScript</span>
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-skyblue/20 transition-colors">Protobuf</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-white/80">
                  <div className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-skyblue rounded-full flex-shrink-0 mt-2"></div>
                    <div>Built real-time weather alert visualization system</div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-skyblue rounded-full flex-shrink-0 mt-2"></div>
                    <div>Reduced alert processing time to seconds</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Nobl Kids */}
          <motion.div
            ref={careerItemRef2}
            className="group relative p-[2px] rounded-xl bg-gradient-to-br from-skyblue via-blue-400 to-blue-300"
            initial={{ opacity: 0, y: 50 }}
            animate={careerItemInView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.04 }}
          >
            <div className="bg-[#2A2A2A] rounded-xl p-8 h-full">
              <div className="relative w-full h-24 md:h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/nobllogo.jpg"
                  alt="Nobl Kids"
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0"></div>
              </div>
              
              <div className="flex flex-col justify-between h-[calc(100%-14rem)]">
                <div>
                  <div className="text-3xl font-bold text-white mb-2">Nobl Kids</div>
                  <div className="text-xl text-skyblue mb-2">Software Engineer</div>
                  <div className="text-white/80 mb-4">Sep 2024 - Dec 2024</div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-skyblue/20 transition-colors">React</span>
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-skyblue/20 transition-colors">Framer Motion</span>
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-skyblue/20 transition-colors">UI/UX</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-white/80">
                  <div className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-skyblue rounded-full flex-shrink-0 mt-2"></div>
                    <div>Improved user engagement by 40%</div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-skyblue rounded-full flex-shrink-0 mt-2"></div>
                    <div>Built responsive B2B/B2C landing pages</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Rout3 */}
          <motion.div
            ref={careerItemRef3}
            className="group relative p-[2px] rounded-xl bg-gradient-to-br from-skyblue via-blue-400 to-blue-300"
            initial={{ opacity: 0, y: 50 }}
            animate={careerItemInView3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.04 }}
          >
            <div className="bg-[#2A2A2A] rounded-xl p-8 h-full">
              <div className="relative w-full h-24 md:h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/rout3logo.jpg"
                  alt="Rout3"
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0"></div>
              </div>
              
              <div className="flex flex-col justify-between h-[calc(100%-14rem)]">
                <div>
                  <div className="text-3xl font-bold text-white mb-2">Rout3</div>
                  <div className="text-xl text-skyblue mb-2">Founding Engineer</div>
                  <div className="text-white/80 mb-4">May 2024 - Aug 2024</div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-skyblue/20 transition-colors">Svelte</span>
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-skyblue/20 transition-colors">TypeScript</span>
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-skyblue/20 transition-colors">Python</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-white/80">
                  <div className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-skyblue rounded-full flex-shrink-0 mt-2"></div>
                    <div>Secured $10K in startup funding</div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-skyblue rounded-full flex-shrink-0 mt-2"></div>
                    <div>Built LLM proxy dashboard</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* goeasy */}
          <motion.div
            ref={careerItemRef4}
            className="group relative p-[2px] rounded-xl bg-gradient-to-br from-skyblue via-blue-400 to-blue-300"
            initial={{ opacity: 0, y: 50 }}
            animate={careerItemInView4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.04 }}
          >
            <div className="bg-[#2A2A2A] rounded-xl p-8 h-full">
              <div className="relative w-full h-24 md:h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/goeasylogo.jpg"
                  alt="goeasy"
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0"></div>
              </div>
              
              <div className="flex flex-col justify-between h-[calc(100%-14rem)]">
                <div>
                  <div className="text-3xl font-bold text-white mb-2">goeasy Ltd.</div>
                  <div className="text-xl text-skyblue mb-2">Frontend Engineer Intern</div>
                  <div className="text-white/80 mb-4">Feb 2023 - Sep 2023</div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-skyblue/20 transition-colors">Next.js</span>
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-skyblue/20 transition-colors">Contentful</span>
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-skyblue/20 transition-colors">Apollo</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-white/80">
                  <div className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-skyblue rounded-full flex-shrink-0 mt-2"></div>
                    <div>Reduced bounce rates by 25%</div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-skyblue rounded-full flex-shrink-0 mt-2"></div>
                    <div>96% test success rate</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ontario Ministry of Health */}
          <motion.div
            ref={careerItemRef5}
            className="group relative p-[2px] rounded-xl bg-gradient-to-br from-skyblue via-blue-400 to-blue-300"
            initial={{ opacity: 0, y: 50 }}
            animate={careerItemInView5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.04 }}
          >
            <div className="bg-[#2A2A2A] rounded-xl p-8 h-full">
              <div className="relative w-full h-24 md:h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/moh.jpg"
                  alt="Ontario Ministry of Health"
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0"></div>
              </div>
              
              <div className="flex flex-col justify-between h-[calc(100%-14rem)]">
                <div>
                  <div className="text-3xl font-bold text-white mb-2">Ontario Ministry of Health</div>
                  <div className="text-xl text-skyblue mb-2">Cloud Engineer Intern</div>
                  <div className="text-white/80 mb-4">Sep 2021 - Sep 2022</div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-skyblue/20 transition-colors">Power Apps</span>
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-skyblue/20 transition-colors">Azure</span>
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-skyblue/20 transition-colors">REST API</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-white/80">
                  <div className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-skyblue rounded-full flex-shrink-0 mt-2"></div>
                    <div>Saved 40+ hours monthly work</div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-skyblue rounded-full flex-shrink-0 mt-2"></div>
                    <div>Reduced system downtime by 90%</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div ref={aboutRef} className="flex lg:flex-row flex-col relative 5xl:px-48 4xl:px-40 lg:px-24 px-8 5xl:py-32 4xl:py-24 py-8 lg:h-screen h-auto bg-gradient-to-b from-[#E6E6E6] to-[#f0f0f0]">
        <div className="lg:w-1/3 w-full 4xl:my-12 relative lg:mb-0 mb-8 flex items-center">
          <motion.div
            ref={aboutPictureRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full"
          >
            <div className="relative w-full lg:h-full h-auto shadow-xl rounded-lg overflow-hidden">
              <Image
                src="/about.png"
                alt="about"
                layout="responsive"
                width={835} 
                height={1190}
                className="rounded-lg hover:scale-105 transition-transform duration-700"
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
            text={["I'm a 4th-year Computer Engineering student at York University with over 2 years of experience as a full-stack engineer. Currently, I work as a Software Engineer Intern at Pelmorex. Previously, I've led projects like an LLM Proxy Dashboard at Rout3 and enhanced interfaces for 50,000+ users at goeasy. With expertise in Python, Go, TypeScript, and React, I'm passionate about creating scalable, impactful software solutions."]}
            staggerChildren={0.01}
            animateMode="word"
            once={true}
          />
          <div>
            <motion.button 
              className="rounded-lg bg-lightblack text-white 5xl:text-3xl text-2xl font-medium 5xl:py-6 py-4 px-8 4xl:mt-16 lg:mt-10 m-8 shadow-lg"
              whileHover={{ scale: 1.05, backgroundColor: "#333" }}
              whileTap={{ scale: 0.85 }} 
              onClick={openResume}
            >
              View Resume
            </motion.button>
          </div>
        </div>
      </div>
      
      <div ref={contactRef} className="z-40 bg-lightblack flex flex-col justify-between items-center lg:px-48 px-8 5xl:pt-32 5xl:pb-16 4xl:pt-24 4xl:pb-8 pt-16 pb-4 lg:h-screen h-auto relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="gradient-bg w-full h-full"></div>
        </div>
        
        <div className="relative z-10 flex justify-center 5xl:text-10xl 4xl:text-8xl lg:text-7xl text-5xl font-bold text-center text-white">
          <motion.span
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="gradient-bg bg-clip-text px-8 py-4 rounded-xl"
          >
            CONTACT
          </motion.span>
        </div>
        
        <form onSubmit={handleSubmit} className="w-full max-w-screen-lg mx-auto relative z-10">
          <div>
            <div className="flex lg:flex-row flex-col text-white 5xl:text-5xl 4xl:text-4xl lg:text-2xl text-3xl lg:mt-0 mt-12 lg:space-x-8 space-y-4 lg:space-y-0 lg:h-full h-auto">
              <div className="flex flex-col w-full lg:w-1/2">
                <div className="flex flex-col items-center lg:items-start">
                  <div>
                    Name
                    <a className="text-skyblue">*</a>
                  </div>
                  <div className="w-full max-w-sm lg:max-w-lg">
                    <input 
                      type="text" 
                      name="name"
                      className="4xl:mt-4 mt-2 border-4 border-white px-4 py-2 bg-lightblack rounded w-full focus:border-skyblue transition-colors" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
                <div className="lg:mt-6 mt-4 flex flex-col items-center lg:items-start">
                  <div>
                    Email
                    <a className="text-skyblue">*</a>
                  </div>
                  <div className="w-full max-w-sm lg:max-w-lg">
                    <input 
                      type="email"
                      name="email"
                      className="4xl:mt-4 mt-2 border-4 border-white px-4 py-2 bg-lightblack rounded w-full focus:border-skyblue transition-colors" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
                <div className="lg:mt-6 mt-4 flex flex-col items-center lg:items-start">
                  <div>
                    Company
                    <a className="text-skyblue">*</a>
                  </div>
                  <div className="w-full max-w-sm lg:max-w-lg">
                    <input 
                      type="text" 
                      name="company" 
                      className="4xl:mt-4 mt-2 border-4 border-white px-4 py-2 bg-lightblack rounded w-full focus:border-skyblue transition-colors"
                      value={formData.company} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full lg:w-1/2 lg:mt-0 mt-4">
                <div className="flex flex-col items-center lg:items-start">
                  <div>
                    Inquiry
                    <a className="text-skyblue">*</a>
                  </div>
                  <div className="w-full max-w-sm lg:max-w-lg">
                    <textarea 
                      name="inquiry"
                      className="4xl:mt-4 mt-2 border-4 border-white p-4 bg-lightblack rounded w-full resize-none focus:border-skyblue transition-colors" 
                      rows={8} 
                      value={formData.inquiry} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:mb-0 mb-8">
            <motion.button 
              className="gradient-bg 5xl:text-5xl 4xl:text-4xl lg:text-2xl text-3xl text-white rounded-lg 5xl:mt-12 4xl:mt-8 mt-4 5xl:p-6 p-4 shadow-lg" 
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.85 }}
            >
              Submit
            </motion.button>
          </div>
        </form>

        <div className="flex items-center justify-between w-full mt-0 relative z-10">
          <div className="flex 5xl:text-6xl 4xl:text-6xl 2xl:text-5xl text-4xl font-bold text-left text-white">
            © 2024 VICTOR CHUNG
          </div>
          <div>
            <motion.button 
              className="gradient-bg text-white text-5xl rounded-full 4xl:w-32 4xl:h-32 lg:w-20 lg:h-20 w-24 h-24 shadow-lg"
              whileHover={{ scale: 1.1 }}
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