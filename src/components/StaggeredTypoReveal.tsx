import React from 'react';
import { motion } from 'motion/react';

interface StaggeredTypoRevealProps {
  text: string;
  italicWord?: string;
  className?: string;
  italicClassName?: string;
  delay?: number;
}

export const StaggeredTypoReveal: React.FC<StaggeredTypoRevealProps> = ({
  text,
  italicWord,
  className = 'font-serif text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-[#1A1A1A]',
  italicClassName = 'font-editorial italic font-normal text-[#5A5A40]',
  delay = 0,
}) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: '100%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2, margin: '-50px' }}
      className={`${className} flex flex-wrap gap-x-[0.28em] gap-y-[0.15em] items-baseline`}
    >
      {words.map((word, i) => {
        const isItalic = italicWord && word.toLowerCase().includes(italicWord.toLowerCase());
        return (
          <span key={i} className="inline-block overflow-hidden py-1 -my-1">
            <motion.span
              variants={wordVariants}
              className={`inline-block ${isItalic ? italicClassName : ''}`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </motion.div>
  );
};

