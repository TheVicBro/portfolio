import { motion, AnimatePresence } from 'framer-motion';
import { memo } from 'react';

type FloatingMenuButtonProps = {
  isVisible: boolean;
  onClick: () => void;
  menuOpen: boolean;  // New prop to track menu state
};

// Memoize the component to prevent unnecessary rerenders
const FloatingMenuButton = memo(function FloatingMenuButton({ isVisible, onClick, menuOpen }: FloatingMenuButtonProps) {
  // We show the button when it's visible AND the menu is closed
  const shouldShow = isVisible && !menuOpen;

  return (
    <AnimatePresence mode="wait">
      {shouldShow && (
        <motion.button
          className="fixed bottom-8 right-8 z-50 rounded-full bg-gradient-to-r from-skyblue to-blue-400 text-white w-16 h-16 shadow-lg flex items-center justify-center"
          onClick={onClick}
          key="menu-button"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25,
            duration: 0.25
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
});

export default FloatingMenuButton; 