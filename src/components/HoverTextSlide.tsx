import React from 'react';
import { motion } from 'motion/react';

interface HoverTextSlideProps {
  text: string;
  className?: string;
  hoverColorClass?: string;
}

export const HoverTextSlide: React.FC<HoverTextSlideProps> = ({
  text,
  className = '',
  hoverColorClass = 'text-[#5A5A40]',
}) => {
  const chars = text.split('');

  return (
    <span className={`group relative inline-block overflow-hidden py-0.5 align-bottom ${className}`}>
      <span className="sr-only">{text}</span>
      
      {/* Primary layer */}
      <span className="flex overflow-hidden" aria-hidden="true">
        {chars.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
            style={{ transitionDelay: `${i * 15}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>

      {/* Hover reveal layer */}
      <span
        className={`absolute inset-0 flex overflow-hidden ${hoverColorClass}`}
        aria-hidden="true"
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 font-semibold"
            style={{ transitionDelay: `${i * 15}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    </span>
  );
};
