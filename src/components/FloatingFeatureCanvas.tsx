import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Star, Activity, Heart, CheckCircle2, Award, Zap } from 'lucide-react';
import { EditorialHeading } from './EditorialHeading';
import { MagneticButton } from './MagneticButton';
import { soundFx } from '../lib/audioFX';

interface FloatingFeatureCanvasProps {
  onOpenBooking?: () => void;
}

export const FloatingFeatureCanvas: React.FC<FloatingFeatureCanvasProps> = ({ onOpenBooking }) => {
  const [activeChip, setActiveChip] = useState<string>('all');
  const [satisfactionScore, setSatisfactionScore] = useState<number>(98);

  const handleChipClick = (id: string) => {
    soundFx.playClick();
    setActiveChip(id);
    setSatisfactionScore(Math.floor(96 + Math.random() * 3.9));
  };

  return (
    <section className="py-24 sm:py-32 bg-[#EAE8E3] text-[#1A1A1A] relative overflow-hidden border-t border-[#1A1A1A]/10">
      
      {/* Soft Ambient Blur Blobs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#121417]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-[#1A1A1A]/10 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-sky-600 font-bold">
              Precision Dentistry • Human Care
            </span>
          </div>

          <EditorialHeading
            plainText="Precision Dentistry for"
            italicAccent="Confident, Glowing Smiles"
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1A1A1A]"
            accentColorClass="text-sky-600"
            preset="3d-flip"
          />

          <p className="text-sm sm:text-base text-[#1A1A1A]/70 font-light max-w-xl mx-auto leading-relaxed">
            We seamlessly blend 3D optical technology with compassionate, human-first care to give you the confidence you deserve.
          </p>
        </div>

        {/* Floating Pills Interactive Filter Hub */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {[
            { id: 'all', label: '✨ All Features' },
            { id: 'nopain', label: '🛡️ Pain-Free Focus' },
            { id: 'scan', label: '📸 3D CBCT Scanning' },
            { id: 'veneers', label: '💎 0.2mm Micro-Veneers' },
            { id: 'whitening', label: '⚡ Laser Whitening' },
            { id: 'aligners', label: '✨ Invisible Aligners' },
          ].map((chip) => {
            const isActive = activeChip === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => handleChipClick(chip.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-mono transition-all duration-300 border ${
                  isActive
                    ? 'bg-[#121417] text-white border-[#121417] shadow-lg scale-105 font-bold'
                    : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 hover:bg-[#F2F0EC]'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        {/* Central Floating Feature Workbench Canvas */}
        <div className="bg-white border border-[#1A1A1A]/12 rounded-[2.5rem] p-8 sm:p-12 shadow-xl relative overflow-hidden">
          
          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 5 Cols: Patient Loyalty & Score Gauge */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-[#F2F0EC] p-6 rounded-2xl border border-[#1A1A1A]/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-sky-700">
                  <span className="uppercase tracking-widest font-bold">Patient Satisfaction Index</span>
                  <span className="bg-white px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-[#1A1A1A]/10">
                    Live Score
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-5xl font-bold text-[#1A1A1A]">{satisfactionScore}%</span>
                  <span className="text-xs text-[#1A1A1A]/60 font-mono">Positive Patient Feedback</span>
                </div>

                <div className="w-full h-2 rounded-full bg-[#1A1A1A]/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-sky-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${satisfactionScore}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>

              {/* Patient Trust Avatars Pill */}
              <div className="p-5 rounded-2xl bg-[#121417] text-white space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2 overflow-hidden">
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#121417] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" alt="Patient" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#121417] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" alt="Patient" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#121417] object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200" alt="Patient" />
                  </div>
                  <span className="text-xs font-mono text-white/80 font-bold">+12,000 Restored Smiles</span>
                </div>
                <p className="text-xs text-white/70 font-light">
                  Join South Florida's most trusted network of aesthetic dental patients.
                </p>
              </div>

            </div>

            {/* Right 7 Cols: Floating Visual Card Canvas */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Feature Box 1 */}
              <motion.div
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-[#F9F8F6] border border-[#1A1A1A]/10 space-y-3"
              >
                <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                  01
                </div>
                <h4 className="font-serif text-lg font-semibold text-[#1A1A1A]">
                  Zero-Radiation 3D Scan
                </h4>
                <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-light">
                  Capture digital tooth geometry in under 60 seconds with zero uncomfortable impression tray gel.
                </p>
              </motion.div>

              {/* Feature Box 2 */}
              <motion.div
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-[#F9F8F6] border border-[#1A1A1A]/10 space-y-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#121417] text-white flex items-center justify-center font-bold">
                  02
                </div>
                <h4 className="font-serif text-lg font-semibold text-[#1A1A1A]">
                  0.2mm Micro-Prep
                </h4>
                <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-light">
                  Preserve 99% of your natural tooth structure with contact-lens thin porcelain hand-layered in our atelier.
                </p>
              </motion.div>

              {/* Feature Box 3 */}
              <motion.div
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-[#F9F8F6] border border-[#1A1A1A]/10 space-y-3"
              >
                <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                  03
                </div>
                <h4 className="font-serif text-lg font-semibold text-[#1A1A1A]">
                  Gingival Laser Arc
                </h4>
                <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-light">
                  Painless diode laser gum line contouring designed specifically according to facial Phi golden ratios.
                </p>
              </motion.div>

              {/* Feature Box 4 */}
              <motion.div
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-[#121417] text-white space-y-3"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 text-sky-400 flex items-center justify-center font-bold">
                  04
                </div>
                <h4 className="font-serif text-lg font-semibold text-white">
                  10-Year Warranty
                </h4>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  Full clinical warranty covering structural integrity, ceramic stain immunity, and bond strength.
                </p>
              </motion.div>

            </div>

          </div>

          {/* Bottom Action */}
          <div className="mt-10 pt-6 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-[#1A1A1A]/70 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              <span>Free 3D Smile Scan Included With All Consultations</span>
            </div>

            <MagneticButton
              onClick={() => {
                soundFx.playClick();
                onOpenBooking?.();
              }}
              className="bg-[#121417] text-white hover:bg-sky-400 hover:text-slate-950 px-6 py-3.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-md"
            >
              <span>Schedule Your Experience</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>

        </div>

      </div>
    </section>
  );
};
