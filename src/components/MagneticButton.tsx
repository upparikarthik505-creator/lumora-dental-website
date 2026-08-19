import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { HoverTextSlide } from './HoverTextSlide';

interface MagneticButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  showIcon?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children = 'Book Consultation',
  onClick,
  className = '',
  type = 'button',
  showIcon = true,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Pull intensity factor
    const distanceX = (e.clientX - centerX) * 0.22;
    const distanceY = (e.clientY - centerY) * 0.22;

    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.2 }}
      className={`group relative inline-flex items-center justify-center gap-2.5 bg-[#1A1A1A] px-6 py-3 text-xs font-semibold tracking-wide text-[#F9F8F6] rounded-full shadow-sm transition-all duration-300 hover:bg-[#2A2A2A] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/30 active:scale-[0.98] ${className}`}
      data-cursor="hover"
    >
      {showIcon && (
        <Calendar className="h-3.5 w-3.5 text-white transition-transform duration-300 group-hover:scale-110" />
      )}
      <span className="whitespace-nowrap font-bold">
        {typeof children === 'string' ? (
          <HoverTextSlide text={children} hoverColorClass="text-[#F9F8F6]" />
        ) : (
          children
        )}
      </span>
    </motion.button>
  );
};

