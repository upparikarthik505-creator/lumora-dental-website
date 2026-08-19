import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Scan, Layers, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { EditorialHeading } from './EditorialHeading';

interface ProtocolStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  image: string;
}

const STEPS: ProtocolStep[] = [
  {
    number: '01',
    title: 'Digital Facial Mapping',
    subtitle: 'CBCT 3D & Intraoral Optical Scanning',
    description: 'We capture over 100,000 data points of your facial geometry, jaw articulation, and enamel topography without gooey traditional impression trays.',
    specs: ['0.01mm Precision Scanners', '3D Cone Beam CT Scanning', 'Facial Proportion Analysis'],
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200'
  },
  {
    number: '02',
    title: 'Intraoral Trial Try-In',
    subtitle: 'Reversible Diagnostic Mock-Up',
    description: 'Before touching a single tooth, a temporary composite mock-up is placed directly in your mouth. You test your new smile in live conversation and under natural studio light.',
    specs: ['Zero Permanent Prep', 'Full Lip Dynamics Review', 'Patient Co-Design Approval'],
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200'
  },
  {
    number: '03',
    title: 'Artisanal Ceramic Crafting',
    subtitle: 'Hand-Layered Feldspathic Porcelain',
    description: 'Our certified master ceramists in our Aventura flagship studio hand-stack micro-layers of bio-compatible porcelain under 20x magnification loupes to match natural internal enamel optics.',
    specs: ['Micro-Thin 0.3mm Profiling', 'VITA Classical Shade Match', 'Thermal Stress Testing'],
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200'
  },
  {
    number: '04',
    title: 'Micro-Bonding & Calibration',
    subtitle: 'Adhesive Cementation & Occlusal Balance',
    description: 'Using high-strength dual-cure resin cements, veneers are permanently bonded to natural enamel. Digital T-Scan occlusal sensors verify perfect bite force distribution.',
    specs: ['Dual-Cure Resin Matrix', 'Digital T-Scan Bite Check', 'Lifetime Ceramic Warranty'],
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=1200'
  }
];

export const CraftsmanshipProcess: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = STEPS[activeStepIndex];

  return (
    <section id="process" className="py-28 sm:py-36 lg:py-40 bg-[#F1EFE9] border-t border-[#1A1A1A]/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#5A5A40]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#5A5A40] font-bold block mb-3 font-mono">
            Clinical Methodology
          </span>
          <EditorialHeading
            plainText="The Bespoke 4-Step"
            italicAccent="Atelier Protocol"
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1A1A1A]"
            preset="blur"
          />
          <p className="text-base sm:text-lg text-[#1A1A1A]/75 mt-4 leading-relaxed font-light">
            An unhurried, conservative approach designed to preserve natural tooth biology while delivering flawless esthetic harmony.
          </p>
        </div>

        {/* Interactive Step Navigator with Alternating Box Ordering */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Step Selector List */}
          <div className={`lg:col-span-5 space-y-3 ${
            activeStepIndex % 2 === 1 ? 'lg:order-last' : 'lg:order-first'
          }`}>
            {STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`w-full text-left p-6 border transition-all duration-300 flex items-start justify-between ${
                    isActive
                      ? 'bg-[#1A1A1A] text-[#F9F8F6] border-[#1A1A1A] shadow-xl'
                      : 'bg-[#F9F8F6] text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs font-bold ${isActive ? 'text-[#5A5A40]' : 'text-[#1A1A1A]/40'}`}>
                        {step.number}
                      </span>
                      <h3 className="font-serif text-xl font-medium">{step.title}</h3>
                    </div>
                    <p className={`text-xs font-mono tracking-wider ${isActive ? 'text-[#F9F8F6]/70' : 'text-[#1A1A1A]/60'}`}>
                      {step.subtitle}
                    </p>
                  </div>

                  <ArrowRight className={`h-4 w-4 mt-1 transition-transform ${isActive ? 'translate-x-1 text-[#5A5A40]' : 'opacity-30'}`} />
                </button>
              );
            })}
          </div>

          {/* Active Step Visual Feature Panel */}
          <div className="lg:col-span-7 bg-[#1A1A1A] text-[#F9F8F6] p-8 sm:p-12 border border-[#1A1A1A] flex flex-col justify-between overflow-hidden relative shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.number}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8 z-10"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden border border-white/10 bg-black">
                  <img
                    src={activeStep.image}
                    alt={activeStep.title}
                    className="w-full h-full object-cover filter contrast-105"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#5A5A40] font-bold border border-white/10">
                    Phase {activeStep.number} Specification
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h4 className="font-editorial text-3xl sm:text-4xl italic text-white mb-2">
                    {activeStep.title}
                  </h4>
                  <p className="text-sm text-[#F9F8F6]/80 leading-relaxed font-light">
                    {activeStep.description}
                  </p>
                </div>

                {/* Specs List */}
                <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-white/80">
                  {activeStep.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/5 p-2.5 border border-white/5">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#5A5A40] shrink-0" />
                      <span className="text-[10px] uppercase">{spec}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
