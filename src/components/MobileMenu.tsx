import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, memo } from 'react';
import type { useRouter } from 'next/navigation';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  portfolioRef?: React.RefObject<HTMLDivElement>;
  careerRef?: React.RefObject<HTMLDivElement>;
  aboutRef?: React.RefObject<HTMLDivElement>;
  contactRef?: React.RefObject<HTMLDivElement>;
  router?: ReturnType<typeof useRouter>;
  closeButtonClassName?: string;
};

// Memoize the component to prevent unnecessary rerenders
const MobileMenu = memo(function MobileMenu({ isOpen, onClose, portfolioRef, careerRef, aboutRef, contactRef, router, closeButtonClassName }: MobileMenuProps) {
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavigation = (section: string) => {
    if (portfolioRef && careerRef && aboutRef && contactRef) {
      if (section === "Portfolio") {
        portfolioRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      if (section === "Career") {
        careerRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      if (section === "About") {
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      if (section === "Contact") {
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router?.push(`/?section=${section}`);
    }
    onClose();
  };

  const menuItems = ["Portfolio", "Career", "About", "Contact"];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          key="mobile-menu"
        >
          {/* Backdrop/overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-lightblack to-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Animated elements in background - simplified for better performance */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
            <motion.div 
              className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-skyblue/20 blur-[90px]"
              animate={{ 
                x: [100, 120, 100], 
                y: [-100, -80, -100] 
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                repeatType: "reverse", 
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-blue-300/20 blur-[80px]"
              animate={{ 
                x: [-90, -70, -90], 
                y: [90, 70, 90]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                repeatType: "reverse", 
                ease: "easeInOut", 
                delay: 0.5 
              }}
            />
          </div>

          {/* Close button */}
          <motion.button
            type="button"
            className={`absolute top-4 md:top-8 right-4 md:right-8 text-white text-4xl z-10 p-2 w-14 h-14 flex items-center justify-center rounded-full bg-skyblue/20 backdrop-blur-sm ${closeButtonClassName || ''}`}
            onClick={onClose}
            aria-label="Close menu"
            whileTap={{ scale: 0.9 }}
            whileHover={{ 
              rotate: 180,
              backgroundColor: "rgba(59, 130, 246, 0.4)", 
              scale: 1.1
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              duration: 0.2,
              ease: "easeOut"
            }}
          >
            <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Menu content */}
          <motion.div 
            className="relative z-10 flex flex-col items-center justify-center space-y-7 w-full px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="relative overflow-hidden group"
              >
                <motion.button
                  type="button"
                  className="text-white text-5xl md:text-6xl lg:text-7xl font-bold relative z-10 py-3 px-6"
                  onClick={() => handleNavigation(item)}
                  whileHover={{ 
                    scale: 1.05, 
                    x: 10,
                    transition: { duration: 0.15 } 
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 group-hover:text-skyblue transition-colors duration-150">{item}</span>
                  <motion.div 
                    className="absolute bottom-0 left-0 h-3 bg-gradient-to-r from-skyblue to-blue-400 rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.15 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-white/5 rounded-lg -z-10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                  />
                </motion.button>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-10 flex space-x-8"
            >
              <motion.a 
                href="https://www.linkedin.com/in/victor-chung-ca/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative w-14 h-14 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div 
                  className="absolute inset-0 rounded-xl bg-white/10 group-hover:bg-skyblue/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.15 }}
                />
                <svg 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="white" 
                  className="relative z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-150"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>
              
              <motion.a 
                href="https://github.com/TheVicBro" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative w-14 h-14 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div 
                  className="absolute inset-0 rounded-xl bg-white/10 group-hover:bg-skyblue/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.15 }}
                />
                <svg 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="white" 
                  className="relative z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-150"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default MobileMenu; 