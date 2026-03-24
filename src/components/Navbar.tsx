import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';

type NavbarProps = {
  portfolioRef?: React.RefObject<HTMLDivElement>;
  careerRef?: React.RefObject<HTMLDivElement>;
  aboutRef?: React.RefObject<HTMLDivElement>;
  contactRef?: React.RefObject<HTMLDivElement>;
  /** When set, hamburger uses this state and Navbar does not mount its own MobileMenu (parent owns one instance). */
  syncedMobileMenu?: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
};

export default function Navbar({
  portfolioRef,
  careerRef,
  aboutRef,
  contactRef,
  syncedMobileMenu,
}: NavbarProps) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const menuOpen = syncedMobileMenu?.isOpen ?? isMobileMenuOpen;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleNavigation = (section: string) => {
    if (portfolioRef && careerRef && aboutRef && contactRef) {
      if (section === "Career") {
        careerRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      if (section === "Portfolio") {
        portfolioRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      if (section === "About") {
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      if (section === "Contact") {
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/?section=${section}`);
    }
  };

  const handleLogoClick = () => {
    if (portfolioRef && careerRef && aboutRef && contactRef) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  const toggleMobileMenu = () => {
    if (syncedMobileMenu) {
      if (syncedMobileMenu.isOpen) syncedMobileMenu.onClose();
      else syncedMobileMenu.onOpen();
    } else {
      setIsMobileMenuOpen((open) => !open);
    }
  };

  return (
    <>
      <motion.div
        className="flex items-center justify-between 5xl:pt-16 2xl:pt-12 lg:pt-8 md:pt-6 pt-4 5xl:px-48 4xl:px-40 lg:px-24 px-8 text-lightblack"
        initial={{ opacity: 0, y: -140 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.div
          className="5xl:text-6xl text-5xl font-bold cursor-pointer select-none"
          onClick={handleLogoClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          VC
        </motion.div>
        
        {isMobile ? (
          <motion.button
            type="button"
            className="lg:hidden flex items-center justify-center"
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="36" 
              height="36" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </motion.button>
        ) : (
          <div className="hidden lg:flex lg:flex-row flex-col lg:items-center 5xl:text-4xl text-2xl font-semibold 5xl:space-x-20 4xl:space-x-16 lg:space-x-12 space-x-0 space-y-0">
            {["Career", "Portfolio", "About", "Contact"].map((item) => (
              <motion.div
                key={item}
                className="relative"
                whileHover="hover"
                initial="initial"
                animate="initial"
                whileTap={{ scale: 0.85 }}
              >
                <button
                  type="button"
                  className="relative z-10"
                  onClick={() => handleNavigation(item)}
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
        )}
      </motion.div>

      {!syncedMobileMenu && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          portfolioRef={portfolioRef}
          careerRef={careerRef}
          aboutRef={aboutRef}
          contactRef={contactRef}
          router={router}
        />
      )}
    </>
  );
}