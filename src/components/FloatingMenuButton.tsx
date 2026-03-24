import { motion, AnimatePresence } from 'framer-motion';
import { memo } from 'react';

type FloatingMenuButtonProps = {
  isVisible: boolean;
  onClick: () => void;
  menuOpen: boolean;
  className?: string;
};

const FloatingMenuButton = memo(function FloatingMenuButton({ 
  isVisible, 
  onClick, 
  menuOpen, 
  className 
}: FloatingMenuButtonProps) {
  const shouldShow = isVisible && !menuOpen;

  return (
    <div className="fixed top-4 md:top-8 right-4 md:right-8 z-50">
      <AnimatePresence>
        {shouldShow && (
          <motion.button
            type="button"
            className={`rounded-full bg-gradient-to-r from-skyblue to-blue-400 text-white w-16 h-16 shadow-lg flex items-center justify-center ${className || ''}`}
            onClick={onClick}
            aria-label="Open navigation menu"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            whileHover={{ 
              scale: 1.15, 
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
              background: "linear-gradient(to right, #3b82f6, #60a5fa)"
            }}
            whileTap={{ scale: 0.9 }}
          >
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
});

export default FloatingMenuButton; 