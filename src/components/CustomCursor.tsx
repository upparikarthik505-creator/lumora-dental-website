import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive elements or text indicators
      const target = e.target as HTMLElement | null;
      if (target) {
        const textElem = target.closest('[data-cursor-text]') as HTMLElement | null;
        if (textElem) {
          setCursorText(textElem.getAttribute('data-cursor-text') || '');
          setIsHovered(true);
        } else {
          setCursorText('');
          const isInteractive = target.closest('button, a, input, select, textarea, [data-cursor="hover"]');
          setIsHovered(!!isInteractive);
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  const hasText = !!cursorText;
  const cursorSize = hasText ? 64 : isHovered ? 44 : 18;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[999] rounded-full border border-[#5A5A40]/50 bg-[#5A5A40]/15 backdrop-blur-[2px] flex items-center justify-center text-center overflow-hidden shadow-sm"
      animate={{
        x: position.x - cursorSize / 2,
        y: position.y - cursorSize / 2,
        width: cursorSize,
        height: cursorSize,
        scale: isHovered ? 1.1 : 1,
        borderColor: isHovered ? 'rgba(90, 90, 64, 0.7)' : 'rgba(90, 90, 64, 0.35)',
        backgroundColor: hasText ? 'rgba(18, 20, 23, 0.88)' : isHovered ? 'rgba(90, 90, 64, 0.15)' : 'rgba(90, 90, 64, 0.08)',
      }}
      transition={{
        type: 'spring',
        damping: 28,
        stiffness: 350,
        mass: 0.18,
      }}
    >
      <AnimatePresence>
        {hasText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="text-[9px] font-mono font-bold tracking-widest text-[#F9F8F6] uppercase px-1 pointer-events-none leading-none"
          >
            {cursorText}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

