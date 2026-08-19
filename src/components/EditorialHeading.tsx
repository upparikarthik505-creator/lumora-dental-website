import React from 'react';
import { motion } from 'motion/react';

export type TypoAnimationPreset = 'mask' | 'spring' | 'elastic' | 'blur' | 'character' | 'shimmer' | '3d-flip';

interface EditorialHeadingProps {
  plainText: string;
  italicAccent: string;
  afterText?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  accentColorClass?: string;
  delay?: number;
  preset?: TypoAnimationPreset;
}

export const EditorialHeading: React.FC<EditorialHeadingProps> = ({
  plainText,
  italicAccent,
  afterText = '',
  className = 'font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1A1A1A] leading-[1.08]',
  as: Component = 'h2',
  accentColorClass = 'text-[#5A5A40]',
  delay = 0,
  preset = 'character',
}) => {
  const italicLower = italicAccent.toLowerCase().trim();

  // Helper to split text into structured word objects with italic flags
  const prepareWords = () => {
    const parts: { text: string; isItalic: boolean }[] = [];
    
    if (plainText) {
      plainText.split(/\s+/).filter(Boolean).forEach(w => parts.push({ text: w, isItalic: false }));
    }
    if (italicAccent) {
      italicAccent.split(/\s+/).filter(Boolean).forEach(w => parts.push({ text: w, isItalic: true }));
    }
    if (afterText) {
      afterText.split(/\s+/).filter(Boolean).forEach(w => parts.push({ text: w, isItalic: false }));
    }
    return parts;
  };

  const wordsList = prepareWords();

  const getContainerVariants = () => {
    switch (preset) {
      case '3d-flip':
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.025, delayChildren: delay },
          },
        };
      case 'spring':
      case 'elastic':
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.02, delayChildren: delay },
          },
        };
      case 'blur':
      case 'shimmer':
      case 'mask':
      case 'character':
      default:
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.018, delayChildren: delay },
          },
        };
    }
  };

  const getCharVariants = () => {
    switch (preset) {
      case '3d-flip':
        return {
          hidden: { y: 40, opacity: 0, rotateX: -90, transformPerspective: 600 },
          visible: {
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: {
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            },
          },
        };
      case 'shimmer':
        return {
          hidden: { opacity: 0, y: 15, filter: 'brightness(0.2) blur(4px)' },
          visible: {
            opacity: 1,
            y: 0,
            filter: 'brightness(1) blur(0px)',
            transition: {
              duration: 0.5,
              ease: 'easeOut',
            },
          },
        };
      case 'spring':
        return {
          hidden: { y: 45, opacity: 0, scale: 0.8, rotateX: -30 },
          visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            transition: {
              type: 'spring',
              stiffness: 280,
              damping: 18,
            },
          },
        };
      case 'elastic':
        return {
          hidden: { y: '120%', opacity: 0, rotate: -6 },
          visible: {
            y: '0%',
            opacity: 1,
            rotate: 0,
            transition: {
              duration: 0.75,
              ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
            },
          },
        };
      case 'blur':
        return {
          hidden: { opacity: 0, filter: 'blur(10px)', scale: 1.2, y: -8 },
          visible: {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            y: 0,
            transition: {
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            },
          },
        };
      case 'mask':
      case 'character':
      default:
        return {
          hidden: { y: '115%', opacity: 0, rotateX: -35, filter: 'blur(3px)' },
          visible: {
            y: '0%',
            opacity: 1,
            rotateX: 0,
            filter: 'blur(0px)',
            transition: {
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            },
          },
        };
    }
  };

  return (
    <Component className={className}>
      <motion.span
        variants={getContainerVariants()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25, margin: '-40px' }}
        className="inline-flex flex-wrap items-baseline gap-x-[0.28em] gap-y-[0.12em]"
      >
        {wordsList.map((item, index) => {
          const isItalic = item.isItalic || (italicLower && item.text.toLowerCase().includes(italicLower));
          
          return (
            <span key={index} className="inline-flex overflow-hidden py-1 -my-1 whitespace-nowrap">
              {item.text.split('').map((char, cIdx) => (
                <motion.span
                  key={cIdx}
                  variants={getCharVariants() as any}
                  className={`inline-block transform-gpu ${
                    isItalic ? `font-editorial italic font-normal ${accentColorClass}` : ''
                  }`}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </span>
          );
        })}
      </motion.span>
    </Component>
  );
};


