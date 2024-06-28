import { motion } from 'framer-motion';

type NavbarProps = {
    portfolioRef: React.RefObject<HTMLDivElement>;
    aboutRef: React.RefObject<HTMLDivElement>;
    contactRef: React.RefObject<HTMLDivElement>;
  };

export default function Navbar({ portfolioRef, aboutRef, contactRef }: NavbarProps) {
  return (
    <motion.div
      className="flex items-center justify-between 5xl:p-16 2xl:p-12 lg:p-8 p-6 5xl:px-48 4xl:px-40 lg:px-36 px-8 text-lightblack"
      initial={{ opacity: 0, y: -140 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <div className="5xl:text-6xl text-5xl font-bold">VC</div>
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
  );
}