import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function ScrollControls() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-6 bottom-6 flex flex-col items-center space-y-4 z-50">

      {/* Scroll Controls */}
      <AnimatePresence>
        {scrollY > 300 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col space-y-3"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-cyber-cyan border border-cyber-cyan/30 hover:bg-cyber-cyan hover:text-black hover:shadow-[0_0_15px_rgba(0,255,255,0.6)] transition-all shadow-lg backdrop-blur-md bg-black/50"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToBottom}
        className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-cyber-purple border border-cyber-purple/30 hover:bg-cyber-purple hover:text-white hover:shadow-[0_0_15px_rgba(176,38,255,0.6)] transition-all shadow-lg backdrop-blur-md bg-black/50"
      >
        <ArrowDown className="w-5 h-5" />
      </motion.button>

    </div>
  );
}
