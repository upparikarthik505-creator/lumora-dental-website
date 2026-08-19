import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Clock, ShieldCheck, ArrowRight, ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';
import { EditorialHeading } from './EditorialHeading';
import { MagneticButton } from './MagneticButton';
import { soundFx } from '../lib/audioFX';

interface TreatmentJourneyCanvasProps {
  onOpenBookingWithStage?: (stageName: string) => void;
}

interface StepData {
  id: string;
  stepNum: string;
  title: string;
  timeframe: string;
  subtitle: string;
  description: string;
  keyDeliverables: string[];
  image: string;
  clinicalTech: string;
}

const JOURNEY_STEPS: StepData[] = [
  {
    id: 'consultation',
    stepNum: '01',
    title: 'Biomimetic 3D Scan & Face Analysis',
    timeframe: 'Day 1 • 60 Mins',
    subtitle: 'Zero-Radiation 3D CBCT & Facial Dynamics Mapping',
    description: 'We capture your high-definition facial kinematics, smile lip-lines, and jaw articulation using ultra-low radiation 3D scanners to create your digital twin.',
    keyDeliverables: ['3D CBCT Bone Density Map', 'AI Facial Phi Ratio Analysis', 'Live 3D Digital Smile Mockup'],
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1000',
    clinicalTech: 'TRIOS 5 Intraoral Scanner + 4K Facial Camera',
  },
  {
    id: 'waxup',
    stepNum: '02',
    title: '3D Printed Diagnostic Wax-Up Try-In',
    timeframe: 'Day 5 • 45 Mins',
    subtitle: 'Reversible Smile Prototype in Your Mouth',
    description: 'Test drive your future smile directly over your teeth with a temporary high-precision resin preview before touching a single enamel surface.',
    keyDeliverables: ['In-Mouth Physical Prototype', 'Phonetic & Speech Test', 'High-Res Studio Photographic Review'],
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1000',
    clinicalTech: 'In-House Formlabs 3D Resin Printer',
  },
  {
    id: 'ceramics',
    stepNum: '03',
    title: 'Hand-Fired Master Porcelain Creation',
    timeframe: 'Days 7–12 • Atelier Phase',
    subtitle: 'Artisanal Layering by Master Ceramists',
    description: 'Our master ceramists individually hand-layer raw Feldspathic ceramic powder with custom mamelon textures, opalescent halo edges, and natural micro-grooves.',
    keyDeliverables: ['VITA Shade Custom Staining', 'Multi-Layered Mamelon Firing', 'Diamond Polish Finish'],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000',
    clinicalTech: 'In-House Master Ceramic Firing Kiln',
  },
  {
    id: 'bonding',
    stepNum: '04',
    title: 'Microsurgical Enamel Bonding',
    timeframe: 'Day 14 • Final Reveal',
    subtitle: 'Permanent Micro-Layer Resin Adhesion',
    description: 'Using surgical operating microscopes, veneers are permanently bonded to your natural enamel structure for 1,100 MPa biomechanical retention.',
    keyDeliverables: ['Rubber Dam Micro-Isolation', 'Dual-Cure Resin Polymerization', '10-Year Clinical Warranty Certificate'],
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1000',
    clinicalTech: 'Zeiss Surgical Microscope + Dual-Cure Resin',
  },
];

export const TreatmentJourneyCanvas: React.FC<TreatmentJourneyCanvasProps> = ({
  onOpenBookingWithStage,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = JOURNEY_STEPS[activeStepIndex];

  const handleNext = () => {
    soundFx.playClick();
    setActiveStepIndex((prev) => (prev + 1) % JOURNEY_STEPS.length);
  };

  const handlePrev = () => {
    soundFx.playClick();
    setActiveStepIndex((prev) => (prev - 1 + JOURNEY_STEPS.length) % JOURNEY_STEPS.length);
  };

  const handleStepClick = (index: number) => {
    soundFx.playTone(550, 0.1);
    setActiveStepIndex(index);
  };

  return (
    <section id="patient-journey" className="py-24 sm:py-32 bg-[#F9F8F6] text-[#1A1A1A] relative overflow-hidden border-t border-[#1A1A1A]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 pb-8 border-b border-[#1A1A1A]/10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-[#1A1A1A]/10 px-3.5 py-1.5 rounded-full mb-4 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#5A5A40]" />
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#5A5A40] font-bold">
                The Atelier Patient Experience
              </span>
            </div>

            <EditorialHeading
              plainText="4-Step Interactive"
              italicAccent="Smile Transformation Journey"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1A1A1A]"
              accentColorClass="text-[#5A5A40]"
              preset="3d-flip"
            />
          </div>

          <p className="text-sm sm:text-base text-[#1A1A1A]/70 max-w-md leading-relaxed font-light">
            Explore the exact clinical timeline from initial zero-radiation 3D scan to final permanent micro-bonding under surgical microscopy.
          </p>
        </div>

        {/* Step Navigation Progress Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {JOURNEY_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.id}
                onClick={() => handleStepClick(idx)}
                className={`p-4 rounded-2xl text-left border transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? 'bg-[#121417] text-white border-[#121417] shadow-lg scale-[1.02]'
                    : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 hover:bg-[#F2F0EC]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-xs font-bold ${isActive ? 'text-[#8C8C6B]' : 'text-[#5A5A40]'}`}>
                    PHASE {step.stepNum}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${isActive ? 'bg-white/10 text-white/80' : 'bg-[#1A1A1A]/5 text-[#1A1A1A]/60'}`}>
                    {step.timeframe.split('•')[0].trim()}
                  </span>
                </div>
                <div className="font-serif text-sm font-semibold truncate">
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Interactive Showcase Box with Alternating Direction */}
        <div className="bg-white border border-[#1A1A1A]/12 rounded-[2.5rem] grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-xl items-stretch">
          
          {/* Column A: Stage Image & Tech Overlay (7 Cols) */}
          <div className={`lg:col-span-7 bg-[#121417] text-white p-6 sm:p-10 relative min-h-[420px] flex flex-col justify-between overflow-hidden group ${
            activeStepIndex % 2 === 1 ? 'lg:order-last border-l border-white/10' : 'lg:order-first border-r border-white/10'
          }`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 pointer-events-none"
              >
                <img
                  src={currentStep.image}
                  alt={currentStep.title}
                  className="w-full h-full object-cover filter contrast-105 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121417] via-[#121417]/40 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Top Stage Badges */}
            <div className="relative z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider">
              <div className="bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-[#8C8C6B] font-bold">
                Clinical Tech: {currentStep.clinicalTech}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-full bg-black/60 hover:bg-black border border-white/20 text-white transition-all"
                  title="Previous Step"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-full bg-black/60 hover:bg-black border border-white/20 text-white transition-all"
                  title="Next Step"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Stage Overlay Information */}
            <div className="relative z-10 mt-auto pt-16">
              <span className="font-mono text-xs text-[#8C8C6B] font-bold uppercase tracking-widest block mb-1">
                Phase {currentStep.stepNum} • {currentStep.timeframe}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white mb-2">
                {currentStep.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-lg font-light leading-relaxed">
                {currentStep.subtitle}
              </p>
            </div>
          </div>

          {/* Right Column: Stage Deliverables & Deep-Dive (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-10 bg-[#F2F0EC] text-[#1A1A1A] flex flex-col justify-between space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#5A5A40] font-bold block mb-2">
                    Phase Breakdown
                  </span>
                  <p className="text-sm text-[#1A1A1A]/80 leading-relaxed font-light">
                    {currentStep.description}
                  </p>
                </div>

                {/* Key Deliverables Checklist */}
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-bold block mb-3">
                    Key Clinical Deliverables
                  </span>
                  <div className="space-y-2.5">
                    {currentStep.keyDeliverables.map((del, i) => (
                      <div key={i} className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-[#1A1A1A]/10 text-xs font-sans text-[#1A1A1A] shadow-xs">
                        <CheckCircle2 className="w-4 h-4 text-[#5A5A40] shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CTA */}
            <div className="pt-6 border-t border-[#1A1A1A]/10 flex items-center justify-between gap-4">
              <div className="text-xs font-mono text-[#1A1A1A]/70">
                <span className="block font-bold text-[#1A1A1A] uppercase text-[10px]">Estimated Duration</span>
                {currentStep.timeframe}
              </div>

              <MagneticButton
                onClick={() => {
                  soundFx.playClick();
                  onOpenBookingWithStage?.(`Journey Consultation: Phase ${currentStep.stepNum} (${currentStep.title})`);
                }}
                className="bg-[#121417] text-white hover:bg-[#5A5A40] px-5 py-3 rounded-full text-xs font-semibold flex items-center gap-2"
              >
                <span>Book This Stage</span>
                <ChevronRight className="w-4 h-4" />
              </MagneticButton>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
