import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu, Eye, Microscope, Sparkles } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface TechnologyPageProps {
  onOpenBooking: () => void;
}

export const TechnologyPage: React.FC<TechnologyPageProps> = ({ onOpenBooking }) => {
  const techItems = [
    {
      icon: <Cpu className="h-6 w-6 text-white" />,
      title: '3D CBCT Digital Tomography',
      desc: 'Sub-millimeter 3D spatial bone mapping allowing virtual implant pre-planning and zero-error surgical guidance without invasive exploratory flap surgery.',
    },
    {
      icon: <Eye className="h-6 w-6 text-white" />,
      title: 'Digital Intraoral Scanning',
      desc: 'Replaces uncomfortable traditional silicone putty impressions with high-frame-rate optical scanning for precise ceramic edge fit within 15 microns.',
    },
    {
      icon: <Microscope className="h-6 w-6 text-white" />,
      title: 'Clinical Operating Microscopes',
      desc: 'High-magnification illumination ensuring conservative micro-thin enamel preparation, preserving 90%+ of your natural tooth structure.',
    },
    {
      icon: <Sparkles className="h-6 w-6 text-white" />,
      title: 'Digital Shade Spectrophotometry',
      desc: 'Objective optical color mapping under standardized 5500K daylight simulation to match multi-layer ceramic translucency to adjacent enamel.',
    },
  ];

  return (
    <div className="pt-32 pb-24 bg-[#F9F8F6]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#5A5A40] font-bold block mb-2">
            Precision Infrastructure
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-[#1A1A1A]">
            Technology at Aventura Dental Arts
          </h1>
          <p className="text-base text-[#1A1A1A]/75 mt-3 leading-relaxed">
            We employ modern digital tools strictly to enhance clinical longevity, reduce procedure times, and eliminate patient discomfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {techItems.map((tech, idx) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-[#F1EFE9] p-8 border border-[#1A1A1A]/10 space-y-4 flex flex-col ${
                idx % 2 === 1 ? 'items-end text-right' : 'items-start text-left'
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center bg-[#1A1A1A] text-[#F9F8F6]">
                {tech.icon}
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#1A1A1A]">
                {tech.title}
              </h3>
              <p className="text-sm text-[#1A1A1A]/80 leading-relaxed font-normal">
                {tech.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="bg-[#1A1A1A] p-8 sm:p-12 text-[#F9F8F6] border border-[#1A1A1A] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-medium text-white">Experience Gentle Digital Care</h3>
            <p className="text-sm text-[#F9F8F6]/70 mt-1 max-w-lg">
              Book a diagnostic visit featuring comprehensive digital optical scanning and 3D smile mapping.
            </p>
          </div>
          <MagneticButton onClick={onOpenBooking} className="bg-[#F9F8F6] text-[#1A1A1A] hover:bg-[#EAE8E4]">
            Book Consultation
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};
