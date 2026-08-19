import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const LuxuryPreloader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[999] bg-[#121417] text-[#F9F8F6] flex flex-col items-center justify-between p-8 sm:p-12 overflow-hidden pointer-events-none"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#5A5A40]/20 rounded-full blur-[120px]" />

          {/* Top Branding Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#5A5A40] font-bold"
          >
            Aventura Dental Arts • Atelier Esthetique
          </motion.div>

          {/* Center Monogram & Title */}
          <div className="text-center relative z-10 my-auto">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-full border border-white/20 flex items-center justify-center font-serif text-2xl sm:text-3xl text-white italic"
            >
              A
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight"
            >
              Aventura <span className="font-editorial italic font-normal text-[#5A5A40]">Dental Arts</span>
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '120px' }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1px] bg-[#5A5A40] mx-auto mt-6"
            />
          </div>

          {/* Bottom Loading Progress Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-4 text-xs font-mono text-white/50 tracking-wider"
          >
            <span>CURATING ATELIER EXPERIENCE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#5A5A40] animate-ping" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
