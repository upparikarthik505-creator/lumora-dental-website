import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, ShieldCheck, Zap, Sliders, AlertTriangle, ArrowUpRight, Check, Award, Gauge } from 'lucide-react';
import { EditorialHeading } from './EditorialHeading';
import { MagneticButton } from './MagneticButton';
import { soundFx } from '../lib/audioFX';

interface BiteForceSimulatorProps {
  onOpenBookingWithMaterial?: (materialName: string) => void;
}

interface CeramicMaterial {
  id: string;
  name: string;
  flexuralStrengthMPa: number;
  elasticModulusGPa: number;
  bruxismRating: string;
  description: string;
  recommendedFor: string;
}

const CERAMIC_MATERIALS: CeramicMaterial[] = [
  {
    id: 'emax',
    name: 'IPS e.max Lithium Disilicate',
    flexuralStrengthMPa: 500,
    elasticModulusGPa: 95,
    bruxismRating: 'High Resistance (10/10)',
    description: 'Monolithic pressed ceramic offering unmatched edge strength and natural vitality. Absorbs high biting force without micro-fracturing.',
    recommendedFor: 'Front Teeth, Bruxism Clenchers, Full Smile Design',
  },
  {
    id: 'feldspathic',
    name: 'Hand-Layered Feldspathic Glass',
    flexuralStrengthMPa: 130,
    elasticModulusGPa: 60,
    bruxismRating: 'Moderate (7/10)',
    description: 'Ultra-thin aesthetic ceramic providing unparalleled natural translucency and opalescent halos.',
    recommendedFor: 'Ultra-Thin No-Prep Front Veneers',
  },
  {
    id: 'zirconia',
    name: '3D Multilayered Zirconia',
    flexuralStrengthMPa: 1100,
    elasticModulusGPa: 210,
    bruxismRating: 'Bulletproof (10+/10)',
    description: 'Aerospace-grade ceramic engineered for maximum durability and posterior heavy chewing force.',
    recommendedFor: 'Posterior Molars, Heavy Grinders, Dental Bridges',
  },
  {
    id: 'natural',
    name: 'Natural Human Enamel',
    flexuralStrengthMPa: 380,
    elasticModulusGPa: 84,
    bruxismRating: 'Baseline Human (8/10)',
    description: 'Human enamel benchmark against which biomimetic restorations are engineered.',
    recommendedFor: 'Natural Reference Baseline',
  },
];

export const BiteForceSimulator: React.FC<BiteForceSimulatorProps> = ({
  onOpenBookingWithMaterial,
}) => {
  const [selectedMaterial, setSelectedMaterial] = useState<CeramicMaterial>(CERAMIC_MATERIALS[0]);
  const [biteForceNewtons, setBiteForceNewtons] = useState<number>(450); // Default average chewing force
  const [viewAngle, setViewAngle] = useState<'left' | 'front' | 'right'>('front');

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setBiteForceNewtons(val);
    if (val % 100 === 0) soundFx.playTone(300 + val / 2, 0.05);
  };

  const handleSelectMaterial = (mat: CeramicMaterial) => {
    soundFx.playClick();
    setSelectedMaterial(mat);
  };

  // Calculate calculated stress in MPa based on force and simulated veneer cross-sectional area (approx 1.2 mm²)
  const calculatedStressMPa = Math.round(biteForceNewtons / 1.1);
  const safetyMarginFactor = (selectedMaterial.flexuralStrengthMPa / Math.max(1, calculatedStressMPa)).toFixed(2);
  const isOverloaded = calculatedStressMPa > selectedMaterial.flexuralStrengthMPa;

  return (
    <section id="bite-simulator" className="py-24 sm:py-32 bg-[#EAE8E3] text-[#1A1A1A] relative overflow-hidden border-t border-[#1A1A1A]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 pb-8 border-b border-[#1A1A1A]/10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-[#1A1A1A]/10 px-3.5 py-1.5 rounded-full mb-4 shadow-xs">
              <Gauge className="h-3.5 w-3.5 text-[#5A5A40]" />
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#5A5A40] font-bold">
                Masticatory Stress Simulator
              </span>
            </div>

            <EditorialHeading
              plainText="Bite Force & Bruxism"
              italicAccent="Ceramic Stress Test"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1A1A1A]"
              accentColorClass="text-[#5A5A40]"
              preset="spring"
            />
          </div>

          <p className="text-sm sm:text-base text-[#1A1A1A]/70 max-w-md leading-relaxed font-light">
            Test how different ceramic formulations handle biting pressure from normal chewing (250 N) to severe nocturnal bruxism clenching (900 N+).
          </p>
        </div>

        {/* Main Grid Interactive Workbench */}
        <div className="bg-white border border-[#1A1A1A]/12 rounded-[2.5rem] grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-xl items-stretch">
          
          {/* Left Column: Interactive Pressure Workbench (7 Cols) */}
          <div className="lg:col-span-7 bg-[#121417] text-white p-6 sm:p-10 relative flex flex-col justify-between min-h-[460px] space-y-8">
            
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-wider">
              <div className="bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 text-[#8C8C6B] font-bold flex items-center gap-2">
                <Activity className="w-3.5 h-3.5" />
                <span>Stress Analysis Engine</span>
              </div>

              {/* 3D Camera Angle Selector */}
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/15">
                <span className="text-[9px] text-white/50 px-2 font-bold font-mono">3D Angle:</span>
                {[
                  { id: 'left', label: 'Left Vector ◀' },
                  { id: 'front', label: 'Occlusal Arch ⏺' },
                  { id: 'right', label: 'Right Vector ▶' },
                ].map((a) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      soundFx.playClick();
                      setViewAngle(a.id as any);
                    }}
                    className={`px-2.5 py-1 rounded-full transition-all text-[9px] font-mono font-bold ${
                      viewAngle === a.id
                        ? 'bg-[#8C8C6B] text-slate-950 shadow-sm'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>

              <div className="text-white/60">
                Flexural Yield: {selectedMaterial.flexuralStrengthMPa} MPa
              </div>
            </div>

            {/* Central Stress Gauge Display & FEA 3D Tooth Mesh */}
            <div className="bg-black/60 p-6 rounded-2xl border border-white/15 space-y-6">
              
              {/* 3D Stress FEA Visual Stage */}
              <div className="relative w-full h-36 rounded-xl overflow-hidden border border-white/10 bg-gradient-to-b from-slate-900 to-black flex items-center justify-center perspective-[1000px]">
                <img
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800"
                  alt="3D Dental Occlusal Stress Vectors"
                  className="w-full h-full object-cover opacity-80 transition-transform duration-700 ease-out"
                  style={{
                    filter: isOverloaded
                      ? 'contrast(140%) hue-rotate(-50deg) saturate(180%)'
                      : 'contrast(120%) hue-rotate(140deg)',
                    transform:
                      viewAngle === 'left'
                        ? 'perspective(800px) rotateY(-25deg) scale(1.1)'
                        : viewAngle === 'right'
                        ? 'perspective(800px) rotateY(25deg) scale(1.1) scaleX(-1)'
                        : 'perspective(800px) rotateY(0deg) scale(1)',
                  }}
                />
                
                {/* Stress Vector SVG overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-current" viewBox="0 0 400 140">
                  <path
                    d={
                      viewAngle === 'left'
                        ? 'M 80 30 Q 180 80 300 110'
                        : viewAngle === 'right'
                        ? 'M 100 110 Q 220 80 320 30'
                        : 'M 60 70 Q 200 20 340 70'
                    }
                    fill="none"
                    stroke={isOverloaded ? '#f43f5e' : '#38bdf8'}
                    strokeWidth="3"
                    strokeDasharray="6 3"
                  />
                  <circle
                    cx={viewAngle === 'left' ? '180' : viewAngle === 'right' ? '220' : '200'}
                    cy={viewAngle === 'left' ? '70' : viewAngle === 'right' ? '70' : '45'}
                    r="8"
                    fill={isOverloaded ? '#f43f5e' : '#38bdf8'}
                    className="animate-ping opacity-75"
                  />
                </svg>

                <div className="absolute top-2 right-2 bg-black/70 px-2.5 py-1 rounded-full border border-white/10 text-[9px] font-mono text-white/70">
                  {viewAngle.toUpperCase()} 3D PERSPECTIVE
                </div>
              </div>

              {/* Force Value Big Display */}
              <div className="flex items-end justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8C6B] font-bold block mb-1">
                    Simulated Masticatory Pressure
                  </span>
                  <div className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight flex items-baseline gap-2">
                    <span>{biteForceNewtons}</span>
                    <span className="text-xl font-mono text-white/60 font-normal">Newtons (N)</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-1">
                    Safety Margin
                  </span>
                  <div className={`font-mono text-2xl font-bold ${
                    isOverloaded ? 'text-rose-500' : Number(safetyMarginFactor) > 1.5 ? 'text-[#8C8C6B]' : 'text-stone-300'
                  }`}>
                    {isOverloaded ? 'FRACTURE RISK' : `${safetyMarginFactor}x Safe`}
                  </div>
                </div>
              </div>

              {/* Pressure Range Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono uppercase text-white/60">
                  <span>Soft Chewing (200 N)</span>
                  <span>Normal Bite (450 N)</span>
                  <span>Heavy Bruxism (1000 N+)</span>
                </div>

                <input
                  type="range"
                  min="200"
                  max="1200"
                  step="10"
                  value={biteForceNewtons}
                  onChange={handleSliderChange}
                  className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#8C8C6B]"
                />
              </div>

              {/* Stress Visual Progress Heatbar */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-white/70">Applied Mechanical Stress</span>
                  <span className="font-bold text-white">{calculatedStressMPa} MPa</span>
                </div>
                <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden relative">
                  <motion.div
                    className={`h-full rounded-full transition-colors duration-300 ${
                      isOverloaded
                        ? 'bg-rose-500'
                        : Number(safetyMarginFactor) > 1.5
                        ? 'bg-[#8C8C6B]'
                        : 'bg-stone-300'
                    }`}
                    style={{ width: `${Math.min(100, (calculatedStressMPa / selectedMaterial.flexuralStrengthMPa) * 100)}%` }}
                  />
                </div>
              </div>

            </div>

            {/* Material Selector Buttons */}
            <div className="pt-4 border-t border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-3 font-bold">
                Select Ceramic Material Formulation:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CERAMIC_MATERIALS.map((mat) => {
                  const isSelected = mat.id === selectedMaterial.id;
                  return (
                    <button
                      key={mat.id}
                      onClick={() => handleSelectMaterial(mat)}
                      className={`p-3 rounded-xl border text-left transition-all font-mono text-xs ${
                        isSelected
                          ? 'bg-white text-[#121417] border-white font-bold shadow-lg'
                          : 'bg-white/10 text-white/80 border-white/15 hover:border-white/30'
                      }`}
                    >
                      <span className="block truncate">{mat.name.split(' ')[0]}</span>
                      <span className={`text-[9px] block ${isSelected ? 'text-[#121417]/70' : 'text-white/50'}`}>
                        {mat.flexuralStrengthMPa} MPa
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Material Performance Breakdown (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-10 bg-[#F2F0EC] text-[#1A1A1A] flex flex-col justify-between space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMaterial.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#5A5A40] font-bold block mb-1">
                    Material Specification
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-[#1A1A1A]">
                    {selectedMaterial.name}
                  </h3>
                  <p className="text-sm text-[#1A1A1A]/80 leading-relaxed font-light mt-3">
                    {selectedMaterial.description}
                  </p>
                </div>

                {/* Performance Metrics */}
                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-xl bg-white border border-[#1A1A1A]/10 text-xs font-mono flex items-center justify-between shadow-xs">
                    <span className="text-[#1A1A1A]/60">Flexural Strength</span>
                    <span className="font-bold text-[#5A5A40] text-sm">{selectedMaterial.flexuralStrengthMPa} MPa</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#1A1A1A]/10 text-xs font-mono flex items-center justify-between shadow-xs">
                    <span className="text-[#1A1A1A]/60">Elastic Modulus</span>
                    <span className="font-bold text-[#1A1A1A] text-sm">{selectedMaterial.elasticModulusGPa} GPa</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#1A1A1A]/10 text-xs font-mono flex items-center justify-between shadow-xs">
                    <span className="text-[#1A1A1A]/60">Bruxism Resilience</span>
                    <span className="font-bold text-[#5A5A40]">{selectedMaterial.bruxismRating}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 text-xs font-sans">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#5A5A40] font-bold block mb-1">
                    Recommended Clinical Indication
                  </span>
                  <span className="text-[#1A1A1A] font-medium">{selectedMaterial.recommendedFor}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CTA */}
            <div className="pt-6 border-t border-[#1A1A1A]/10 flex items-center justify-between gap-4">
              <div className="text-xs font-mono text-[#1A1A1A]/70">
                <span className="block font-bold text-[#1A1A1A] uppercase text-[10px]">10-Year Warranty</span>
                Structural Fracture Protection
              </div>

              <MagneticButton
                onClick={() => {
                  soundFx.playClick();
                  onOpenBookingWithMaterial?.(`Material Recommendation: ${selectedMaterial.name}`);
                }}
                className="bg-[#121417] text-white hover:bg-[#5A5A40] px-5 py-3.5 rounded-full text-xs font-semibold flex items-center gap-2"
              >
                <span>Select Material</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
