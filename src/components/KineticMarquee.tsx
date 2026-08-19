import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface KineticMarqueeProps {
  items?: string[];
  speed?: number;
  className?: string;
}

const DEFAULT_ITEMS = [
  "ARTISANAL CERAMICS",
  "PRECISION BIO-EMULATION",
  "SUNSET HARBOUR STUDIO",
  "MINIMALLY INVASIVE CARE",
  "UNHURRIED CONSULTATION",
  "ADVANCED 3D OPTICAL MAPPING",
  "HOLISTIC PRESERVATION",
  "ESTHETIC PERFECT SMILES"
];

export const KineticMarquee: React.FC<KineticMarqueeProps> = ({
  items = DEFAULT_ITEMS,
  className = "",
}) => {
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`relative w-full overflow-hidden bg-[#1A1A1A] py-4 text-[#F9F8F6] border-y border-[#1A1A1A] select-none ${className}`}>
      <motion.div
        className="flex whitespace-nowrap items-center gap-8"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 35,
        }}
      >
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] font-bold text-[#F9F8F6]/90 font-mono transition-colors hover:text-[#5A5A40]">
              {item}
            </span>
            <Sparkles className="h-3 w-3 text-[#5A5A40] opacity-80 shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
