import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2, RotateCcw, Clock, DollarSign, ShieldCheck, Heart, Wand2 } from 'lucide-react';
import { EditorialHeading } from './EditorialHeading';
import { MagneticButton } from './MagneticButton';
import { soundFx } from '../lib/audioFX';

interface SmileGoalQuizProps {
  onOpenBookingWithGoal?: (goalSummary: string) => void;
}

interface GoalOption {
  id: string;
  label: string;
  category: string;
  recommendedTreatment: string;
  timeframe: string;
  prepType: string;
  idealFor: string;
  image: string;
  matchScore: number;
  description: string;
}

const GOALS: GoalOption[] = [
  {
    id: 'whiten',
    label: 'Whiten & Remove Deep Stains',
    category: 'Cosmetic Whitening',
    recommendedTreatment: 'Laser Enamel Bleaching + Multi-Layer Porcelain',
    timeframe: 'Single 60-Min Session or 10 Days',
    prepType: 'Zero Prep (100% Pain-Free)',
    idealFor: 'Coffee/Wine Discoloration & Fluorosis Stain Correction',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800',
    matchScore: 98,
    description: 'Combines 810nm diode laser whitening with optional ultra-thin Feldspathic veneers to achieve permanent Hollywood VITA BL1 brightness.',
  },
  {
    id: 'straighten',
    label: 'Straighten Crooked Teeth & Gaps',
    category: 'Invisible Orthodontics',
    recommendedTreatment: '3D Printed Clear Aligners or Micro-Veneers',
    timeframe: '4–8 Months or 14-Day Fast Track',
    prepType: 'No-Drill Biomimetic Protocol',
    idealFor: 'Crowding, Spacing Gaps, Midline Misalignment',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    matchScore: 96,
    description: 'Precision digital tooth movement using AI-designed clear aligners, or immediate gap closure using 0.2mm contact-lens veneers.',
  },
  {
    id: 'replace',
    label: 'Fix Broken, Worn, or Missing Teeth',
    category: 'Restorative Dentistry',
    recommendedTreatment: 'Zirconia Implants & IPS e.max Crowns',
    timeframe: '1 to 3 Visits',
    prepType: 'Microsurgical Precision',
    idealFor: 'Chipped Enamel, Severe Wear, Missing Tooth Gaps',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
    matchScore: 99,
    description: 'Biocompatible 1,100 MPa zirconia implants and full-strength lithium disilicate crowns designed under surgical microscopy.',
  },
  {
    id: 'gummy',
    label: 'Fix Gummy Smile & Asymmetry',
    category: 'Gingival Sculpting',
    recommendedTreatment: 'Laser Gum Contouring + Golden Ratio Veneers',
    timeframe: 'Single 90-Min Visit',
    prepType: 'Diode Laser Micro-Preservation',
    idealFor: 'Excess Gum Display, Uneven Gum Line Arcs',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    matchScore: 97,
    description: 'Sculpts the gingival frame using painless laser energy according to facial Phi ratios, creating symmetrical tooth display.',
  },
];

export const SmileGoalQuiz: React.FC<SmileGoalQuizProps> = ({ onOpenBookingWithGoal }) => {
  const [selectedGoalId, setSelectedGoalId] = useState<string>(GOALS[0].id);
  const activeGoal = GOALS.find((g) => g.id === selectedGoalId) || GOALS[0];

  const handleSelectGoal = (id: string) => {
    soundFx.playClick();
    setSelectedGoalId(id);
  };

  return (
    <section id="smile-goals" className="py-24 sm:py-32 bg-[#121417] text-white relative overflow-hidden border-t border-white/10">
      
      {/* Ambient Radial Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full mb-4 backdrop-blur-md">
              <Wand2 className="h-3.5 w-3.5 text-sky-400" />
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-sky-300 font-bold">
                Smart Patient Concierge
              </span>
            </div>

            <EditorialHeading
              plainText="What is Your"
              italicAccent="Primary Smile Goal?"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white"
              accentColorClass="text-sky-300"
              preset="spring"
            />
          </div>

          <p className="text-sm sm:text-base text-white/70 max-w-md leading-relaxed font-light">
            Select your desired transformation below to instantly calculate your tailored clinical pathway, treatment timeline, and enamel preservation match score.
          </p>
        </div>

        {/* Goal Selector Chips Grid */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {GOALS.map((goal) => {
            const isSelected = goal.id === selectedGoalId;
            return (
              <button
                key={goal.id}
                onClick={() => handleSelectGoal(goal.id)}
                className={`px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-sans font-medium transition-all duration-300 flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-sky-400 text-slate-950 border-sky-300 font-bold shadow-xl scale-[1.03]'
                    : 'bg-white/5 text-white/80 border-white/10 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                {isSelected ? <CheckCircle2 className="w-4 h-4 text-slate-950" /> : <Sparkles className="w-4 h-4 text-white/40" />}
                <span>{goal.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Goal Result Showcase Card */}
        <div className="bg-white/5 border border-white/12 backdrop-blur-xl rounded-[2.5rem] grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-2xl items-stretch">
          
          {/* Left Column: Result Image & Live Match Badge (5 Cols) */}
          <div className="lg:col-span-5 relative min-h-[380px] bg-black overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeGoal.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                src={activeGoal.image}
                alt={activeGoal.label}
                className="w-full h-full object-cover filter contrast-105 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-between p-8">
              <div className="flex items-center justify-between">
                <span className="bg-sky-400 text-slate-950 font-bold px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider">
                  {activeGoal.category}
                </span>

                <div className="bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-mono text-white flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>{activeGoal.matchScore}% Clinical Match</span>
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] text-sky-400 uppercase font-bold tracking-widest block mb-1">
                  Target Outcome
                </span>
                <h3 className="font-serif text-2xl font-medium text-white">
                  {activeGoal.label}
                </h3>
              </div>
            </div>
          </div>

          {/* Right Column: Tailored Treatment Plan (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-12 flex flex-col justify-between space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGoal.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-sky-400 font-bold block mb-2">
                    Custom Clinical Pathway
                  </span>
                  <h4 className="font-serif text-2xl font-medium text-white mb-2">
                    {activeGoal.recommendedTreatment}
                  </h4>
                  <p className="text-sm text-white/80 font-light leading-relaxed">
                    {activeGoal.description}
                  </p>
                </div>

                {/* Specs Pill Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[9px] uppercase tracking-wider text-white/50 block">Timeframe</span>
                    <span className="font-bold text-white block">{activeGoal.timeframe}</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[9px] uppercase tracking-wider text-white/50 block">Enamel Prep</span>
                    <span className="font-bold text-sky-300 block">{activeGoal.prepType}</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[9px] uppercase tracking-wider text-white/50 block">Ideal Indication</span>
                    <span className="font-bold text-white/90 block truncate">{activeGoal.idealFor}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CTA */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
              <div className="text-xs font-mono text-white/70">
                <span className="block font-bold text-white uppercase text-[10px]">Zero Obligation</span>
                Includes 3D Digital Simulation
              </div>

              <MagneticButton
                onClick={() => {
                  soundFx.playClick();
                  onOpenBookingWithGoal?.(`Smile Goal Selection: ${activeGoal.label} (${activeGoal.category})`);
                }}
                className="bg-sky-400 text-slate-950 hover:bg-white hover:text-slate-950 px-6 py-3.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <span>Book This Goal Plan</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
