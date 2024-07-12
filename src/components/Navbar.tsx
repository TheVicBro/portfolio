import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

type NavbarProps = {
  portfolioRef?: React.RefObject<HTMLDivElement>;
  aboutRef?: React.RefObject<HTMLDivElement>;
  contactRef?: React.RefObject<HTMLDivElement>;
};

export default function Navbar({ portfolioRef, aboutRef, contactRef }: NavbarProps) {
  const router = useRouter();

  const handleNavigation = (section: string) => {
    if (portfolioRef && aboutRef && contactRef) {
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
    if (portfolioRef && aboutRef && contactRef) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  return (
    <motion.div
      className="flex items-center justify-between 5xl:p-16 2xl:p-12 lg:p-8 p-6 5xl:px-48 4xl:px-40 lg:px-36 px-8 text-lightblack"
      initial={{ opacity: 0, y: -140 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <motion.div
        className="5xl:text-6xl text-5xl font-bold cursor-pointer"
        onClick={handleLogoClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        VC
      </motion.div>
      <div className="flex lg:flex-row flex-col lg:items-row 5xl:text-4xl text-2xl font-semibold 5xl:space-x-28 4xl:space-x-24 lg:space-x-16 space-x-0 space-y-0">
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
    </motion.div>
  );
}
