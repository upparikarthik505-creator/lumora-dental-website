import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { MagneticButton } from './MagneticButton';
import { EditorialHeading } from './EditorialHeading';
import { StudioFilmModal } from './StudioFilmModal';
import { RollingCounter } from './RollingCounter';
import { Play, Sparkles, MapPin, ArrowUpRight, ShieldCheck, Star } from 'lucide-react';
import heroImg from '../assets/images/hero_smile_1785142553036.jpg';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [isFilmOpen, setIsFilmOpen] = useState(false);

  return (
    <section className="relative pt-20 sm:pt-24 lg:pt-26 pb-10 flex items-center justify-center overflow-hidden bg-[#EAE8E3]">
      {/* Subtle Ambient Background Glow */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-[#5A5A40]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#1A1A1A]/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Split View Frame (Elevated Luxury Container) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-[2rem] overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-[#1A1A1A]/10 min-h-[460px] lg:min-h-[500px] relative transition-shadow duration-500">

          {/* Left Column: Light Canvas with Editorial Typography */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-[#F2F0EC] relative z-10">
            
            {/* Top Status & Badge */}
            <div>
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/80 border border-[#1A1A1A]/10 text-[10px] uppercase font-mono tracking-[0.2em] text-[#5A5A40] font-bold mb-6 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-[#5A5A40]" />
                <span>Aventura Dental Arts • Private Atelier</span>
              </div>

              {/* Magazine Typography */}
              <EditorialHeading
                plainText="Private"
                italicAccent="Dental"
                afterText="Experience"
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1A1A1A] leading-[1.02] tracking-tight"
                preset="spring"
              />

              <p className="mt-4 text-xs sm:text-sm text-[#1A1A1A]/75 font-light max-w-md leading-relaxed">
                Hand-layered feldspathic porcelain veneers and facial geometry architecture in Aventura, Coral Gables, and Bay Harbor Islands.
              </p>
            </div>

            {/* Bottom Actions & Location Badge */}
            <div className="pt-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton
                  onClick={onOpenBooking}
                  className="bg-[#121417] text-white hover:bg-[#5A5A40] px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider transition-all shadow-md flex items-center gap-2 group"
                >
                  <span>Begin Transformation</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </MagneticButton>

                <button
                  onClick={() => setIsFilmOpen(true)}
                  className="flex items-center gap-2.5 border border-[#1A1A1A]/20 hover:border-[#1A1A1A] bg-white/80 hover:bg-white px-5 py-3.5 rounded-full text-xs font-sans font-semibold tracking-wide text-[#1A1A1A] transition-all shadow-sm"
                >
                  <span className="w-5 h-5 rounded-full bg-[#121417] text-white flex items-center justify-center">
                    <Play className="h-2.5 w-2.5 fill-current translate-x-0.5" />
                  </span>
                  Watch Atelier Reel
                </button>
              </div>

              {/* Live Metric Bar */}
              <div className="pt-4 border-t border-[#1A1A1A]/10 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <div className="text-base font-serif font-semibold text-[#1A1A1A] flex items-center gap-1">
                    <RollingCounter value={1200} suffix="+" />
                  </div>
                  <span className="text-[#1A1A1A]/60 text-[9px] uppercase tracking-wider">Porcelain Restorations</span>
                </div>
                <div>
                  <div className="text-base font-serif font-semibold text-[#1A1A1A] flex items-center gap-1">
                    <span>4.98</span>
                    <Star className="w-3.5 h-3.5 fill-[#5A5A40] text-[#5A5A40]" />
                  </div>
                  <span className="text-[#1A1A1A]/60 text-[9px] uppercase tracking-wider">Patient Satisfaction</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Full Photography Frame */}
          <div className="lg:col-span-6 relative bg-black min-h-[360px] lg:min-h-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 group overflow-hidden">
            <img
              src={heroImg}
              alt="Aventura Dental Arts doctors and clinical atelier environment"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-85 filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 pointer-events-none" />

            {/* Top Right Floating Badge */}
            <div className="relative z-10 flex justify-end">
              <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[9px] font-mono text-white/90 uppercase tracking-widest flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5A5A40]" />
                <span>99.4% 10-Yr Ceramic Retention</span>
              </div>
            </div>

            {/* Overlay Editorial Quotes */}
            <div className="relative z-10 space-y-3 max-w-lg text-white pt-12">
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl italic font-normal text-white leading-tight drop-shadow-md">
                "Designing smiles that are as healthy as they are beautiful"
              </h2>
              <p className="text-xs text-white/80 font-mono font-light leading-relaxed">
                Combining advanced 3D diagnostic science with master ceramic craftsmanship.
              </p>
            </div>
          </div>

        </div>

      </div>

      <StudioFilmModal isOpen={isFilmOpen} onClose={() => setIsFilmOpen(false)} />
    </section>
  );
};

