import React from 'react';
import { motion } from 'motion/react';

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export const SplitTextReveal: React.FC<SplitTextRevealProps> = ({
  text,
  className = '',
  delay = 0,
  as: Component = 'h2',
}) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: '100%',
      opacity: 0,
      rotateX: -45,
    },
    visible: {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <Component className={`inline-block ${className}`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: '-50px' }}
        className="flex flex-wrap gap-x-[0.28em] gap-y-[0.1em] overflow-hidden"
      >
        {words.map((word, idx) => (
          <span key={idx} className="inline-block overflow-hidden py-1 -my-1">
            <motion.span
              variants={wordVariants}
              className="inline-block origin-bottom-left transform-gpu"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
};
