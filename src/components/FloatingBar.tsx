import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone } from 'lucide-react';
import { soundFx } from '../lib/audioFX';

interface FloatingBarProps {
  onOpenBooking: () => void;
}

export const FloatingBar: React.FC<FloatingBarProps> = ({ onOpenBooking }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Gracefully fade in and slide up after initial hero animation completes (~1.2s delay)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 60, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 60, opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 pointer-events-auto"
        >
          <div
            className="bg-[#121417]/90 backdrop-blur-2xl border border-white/20 p-2.5 sm:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex items-center justify-between text-white gap-3 rounded-full"
            style={{
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
            }}
          >
            
            {/* Left Status Badge */}
            <div className="hidden sm:flex items-center gap-3 pl-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
              </span>

              <div className="text-[10px] font-mono leading-tight">
                <span className="block font-bold text-white uppercase tracking-wider">Aventura Atelier</span>
                <span className="text-white/80">Concierge Active</span>
              </div>
            </div>

            {/* Consolidated Single Phone Number Link */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <a
                href="tel:3056821414"
                onClick={() => soundFx.playClick()}
                className="flex items-center gap-2 bg-white/10 hover:bg-white hover:text-slate-950 backdrop-blur-md border border-white/20 hover:border-white text-white px-3.5 sm:px-4 py-2 text-[11px] font-mono font-bold uppercase tracking-wider transition-all rounded-full shadow-md group whitespace-nowrap shrink-0"
              >
                <Phone className="h-3.5 w-3.5 text-white group-hover:text-slate-950 transition-colors shrink-0" />
                <span className="whitespace-nowrap font-bold tracking-wider">(305) 682-1414</span>
              </a>
            </div>

            {/* Right Primary Booking Action */}
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenBooking();
              }}
              className="bg-white hover:bg-stone-200 text-slate-950 px-4 sm:px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-[0.18em] transition-all rounded-full shadow-lg border border-white/40 shrink-0 whitespace-nowrap"
            >
              Book A Call +
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

