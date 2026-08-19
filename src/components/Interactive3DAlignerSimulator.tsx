import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Play, Pause, RotateCcw, ShieldCheck, CheckCircle2, ArrowRight, Activity, Clock } from 'lucide-react';
import { EditorialHeading } from './EditorialHeading';
import { MagneticButton } from './MagneticButton';
import { soundFx } from '../lib/audioFX';

interface Interactive3DAlignerSimulatorProps {
  onOpenBookingWithAligner?: (alignerPlan: string) => void;
}

interface AlignerStage {
  trayNum: number;
  weekRange: string;
  toothAlignmentPct: number;
  biteCorrectionPct: number;
  description: string;
  image: string;
  milestone: string;
  defaultAngle: 'left' | 'front' | 'right' | 'top';
}

const ALIGNER_STAGES: AlignerStage[] = [
  {
    trayNum: 1,
    weekRange: 'Weeks 1–3',
    toothAlignmentPct: 25,
    biteCorrectionPct: 15,
    description: 'Initial micro-expansion of dental arch & gentle initial rotational forces on anterior teeth.',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1000',
    milestone: 'Zero-Discomfort Acclimation & Initial Uncrowding',
    defaultAngle: 'left',
  },
  {
    trayNum: 6,
    weekRange: 'Weeks 6–8',
    toothAlignmentPct: 55,
    biteCorrectionPct: 45,
    description: 'Mid-stage axial alignment & midline gap closure with medical-grade SmartTrack thermoplastic polymer.',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1000',
    milestone: 'Midline Symmetry & Diastema Gap Reduction',
    defaultAngle: 'front',
  },
  {
    trayNum: 12,
    weekRange: 'Weeks 12–16',
    toothAlignmentPct: 85,
    biteCorrectionPct: 80,
    description: 'Precision occlusal indexing and canine guidance seating for optimal masticatory distribution.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000',
    milestone: 'Occlusal Seating & Complete Arch Symmetry',
    defaultAngle: 'right',
  },
  {
    trayNum: 18,
    weekRange: 'Weeks 18–20 (Final)',
    toothAlignmentPct: 100,
    biteCorrectionPct: 100,
    description: 'Final refinement phase yielding 100% golden ratio Phi symmetry, complete line angle harmony, and retainer scan.',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=1000',
    milestone: 'Perfect Phi Golden Ratio Alignment & VITA Shade Reveal',
    defaultAngle: 'front',
  },
];

export const Interactive3DAlignerSimulator: React.FC<Interactive3DAlignerSimulatorProps> = ({
  onOpenBookingWithAligner,
}) => {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState<boolean>(false);
  const [viewAngle, setViewAngle] = useState<'left' | 'front' | 'right' | 'top'>('left');
  const currentStage = ALIGNER_STAGES[activeStageIdx];

  const handleStageSelect = (idx: number) => {
    soundFx.playClick();
    setActiveStageIdx(idx);
    setViewAngle(ALIGNER_STAGES[idx].defaultAngle);
  };

  const handleTogglePlay = () => {
    soundFx.playTone(600, 0.1);
    if (!isPlayingAnimation) {
      setIsPlayingAnimation(true);
      let step = activeStageIdx;
      const interval = setInterval(() => {
        step = (step + 1) % ALIGNER_STAGES.length;
        setActiveStageIdx(step);
        soundFx.playTone(400 + step * 100, 0.08);
        if (step === ALIGNER_STAGES.length - 1) {
          clearInterval(interval);
          setIsPlayingAnimation(false);
        }
      }, 1200);
    } else {
      setIsPlayingAnimation(false);
    }
  };

  return (
    <section id="aligner-3d" className="py-24 sm:py-32 bg-[#F9F8F6] text-[#1A1A1A] relative overflow-hidden border-t border-[#1A1A1A]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 pb-8 border-b border-[#1A1A1A]/10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-[#1A1A1A]/10 px-3.5 py-1.5 rounded-full mb-4 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#8C8C6B]" />
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#5A5A40] font-bold">
                Clear Aligner Tooth Movement Engine
              </span>
            </div>

            <EditorialHeading
              plainText="Simulate 3D Orthodontic"
              italicAccent="Tooth Movement Step-by-Step"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1A1A1A]"
              accentColorClass="text-[#5A5A40]"
              preset="3d-flip"
            />
          </div>

          <p className="text-sm sm:text-base text-[#1A1A1A]/70 max-w-md leading-relaxed font-light">
            Watch how custom-molded medical-grade clear aligners gradually guide crooked enamel into perfect Phi symmetry week by week.
          </p>
        </div>

        {/* Simulator Card Box */}
        <div className="bg-white border border-[#1A1A1A]/12 rounded-[2.5rem] grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-xl items-stretch">
          
          {/* Left Column: 3D Render & Interactive Progress Animation Stage (7 Cols) */}
          <div className="lg:col-span-7 bg-[#121417] text-white p-6 sm:p-10 relative flex flex-col justify-between min-h-[460px] overflow-hidden group select-none">
            
            {/* Top Toolbar */}
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-wider">
              <div className="bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 text-[#8C8C6B] font-bold flex items-center gap-2">
                <Activity className="w-3.5 h-3.5" />
                <span>Tray {currentStage.trayNum} of 18 • {currentStage.weekRange}</span>
              </div>

              {/* 3D Camera Angle Selector */}
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/15">
                <span className="text-[9px] text-white/50 px-2 font-bold hidden xl:inline">3D Angle:</span>
                {[
                  { id: 'left', label: 'Left ◀' },
                  { id: 'front', label: 'Front ⏺' },
                  { id: 'right', label: 'Right ▶' },
                  { id: 'top', label: 'Top Arch 🔼' },
                ].map((a) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      soundFx.playClick();
                      setViewAngle(a.id as any);
                    }}
                    className={`px-2.5 py-1 rounded-full transition-all text-[9px] font-bold ${
                      viewAngle === a.id
                        ? 'bg-[#8C8C6B] text-slate-950 shadow-sm'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleTogglePlay}
                className="px-4 py-2 rounded-full bg-white text-[#121417] hover:bg-slate-200 transition-all font-mono text-[10px] font-bold flex items-center gap-1.5 shadow-md"
              >
                {isPlayingAnimation ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlayingAnimation ? 'Pause' : 'Auto-Play'}</span>
              </button>
            </div>

            {/* Central Stage Visual Image with Overlay Effects */}
            <div className="relative z-10 my-8 flex items-center justify-center perspective-[1200px]">
              <div className="relative w-full max-w-lg aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 shadow-2xl transition-all duration-700 ease-out">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${currentStage.trayNum}-${viewAngle}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    src={currentStage.image}
                    alt={`Tray ${currentStage.trayNum} (${viewAngle} view)`}
                    className="w-full h-full object-cover filter contrast-105 transition-transform duration-700 ease-out"
                    style={{
                      transform:
                        viewAngle === 'left'
                          ? 'perspective(1000px) rotateY(-20deg) scale(1.05)'
                          : viewAngle === 'right'
                          ? 'perspective(1000px) rotateY(20deg) scale(1.05) scaleX(-1)'
                          : viewAngle === 'top'
                          ? 'perspective(1000px) rotateX(25deg) scale(1.1)'
                          : 'perspective(1000px) rotateY(0deg) scale(1)',
                    }}
                  />
                </AnimatePresence>

                {/* Overlaid Animated Vector Vectors Grid simulating 3D Laser Alignment */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center justify-between font-mono text-xs text-white">
                    <span className="text-[#8C8C6B] font-bold uppercase tracking-wider">
                      {currentStage.milestone}
                    </span>
                    <span className="bg-white/20 px-2.5 py-1 rounded-full text-[10px]">
                      {currentStage.toothAlignmentPct}% Aligned
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Timeline Step Tabs */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
              {ALIGNER_STAGES.map((stage, idx) => {
                const isActive = idx === activeStageIdx;
                return (
                  <button
                    key={stage.trayNum}
                    onClick={() => handleStageSelect(idx)}
                    className={`flex-1 p-2.5 rounded-xl text-center border transition-all font-mono text-xs ${
                      isActive
                        ? 'bg-white text-[#121417] border-white font-bold shadow-md scale-105'
                        : 'bg-white/10 text-white/70 border-white/15 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    <span className="block text-[9px] uppercase tracking-wider text-[#8C8C6B]">Tray {stage.trayNum}</span>
                    <span className="block font-bold">{stage.weekRange.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Right Column: Stage Progress Stats & Breakdown (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-10 bg-[#F2F0EC] text-[#1A1A1A] flex flex-col justify-between space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.trayNum}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-slate-700 font-semibold block mb-1">
                    Orthodontic Simulation Stage
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-[#1A1A1A]">
                    Tray {currentStage.trayNum} • {currentStage.weekRange}
                  </h3>
                  <p className="text-sm text-[#1A1A1A]/80 leading-relaxed font-normal mt-2">
                    {currentStage.description}
                  </p>
                </div>

                {/* Progress Meters */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-sans mb-1.5">
                      <span className="text-[#1A1A1A]/70 font-medium">Tooth Alignment Symmetry</span>
                      <span className="font-semibold text-[#5A5A40]">{currentStage.toothAlignmentPct}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-[#1A1A1A]/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[#5A5A40] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${currentStage.toothAlignmentPct}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-sans mb-1.5">
                      <span className="text-[#1A1A1A]/70 font-medium">Bite Occlusion Seating</span>
                      <span className="font-semibold text-[#1A1A1A]">{currentStage.biteCorrectionPct}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-[#1A1A1A]/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[#121417] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${currentStage.biteCorrectionPct}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#1A1A1A]/10 text-xs sm:text-sm font-sans flex items-center gap-2.5 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium text-[#1A1A1A]">{currentStage.milestone}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CTA */}
            <div className="pt-6 border-t border-[#1A1A1A]/10 flex items-center justify-between gap-4">
              <div className="text-xs font-mono text-[#1A1A1A]/70">
                <span className="block font-bold text-[#1A1A1A] uppercase text-[10px]">Free 3D Scan Included</span>
                Removable & Virtually Invisible
              </div>

              <MagneticButton
                onClick={() => {
                  soundFx.playClick();
                  onOpenBookingWithAligner?.(`Clear Aligner Consultation: Tray ${currentStage.trayNum} Stage`);
                }}
                className="bg-[#121417] text-white hover:bg-slate-800 px-5 py-3.5 rounded-full text-xs font-semibold flex items-center gap-2"
              >
                <span>Book 3D Aligner Scan</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
