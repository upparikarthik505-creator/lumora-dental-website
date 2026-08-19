import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, ShieldCheck, Sparkles, AlertCircle, ArrowUpRight, Check, Activity } from 'lucide-react';
import { EditorialHeading } from './EditorialHeading';
import { MagneticButton } from './MagneticButton';
import { soundFx } from '../lib/audioFX';
import enamelBeforeImg from '../assets/images/enamel_before_1785142578575.jpg';
import enamelAfterImg from '../assets/images/enamel_after_1785142598294.jpg';
import veneersBeforeImg from '../assets/images/veneers_before_1785558787267.jpg';

interface EnamelThicknessComparatorProps {
  onOpenBookingWithPrep?: (prepType: string) => void;
}

interface PrepOption {
  id: string;
  name: string;
  thickness: string;
  enamelPreserved: number;
  anesthesiaRequired: boolean;
  durabilityScore: number;
  aestheticScore: number;
  description: string;
  image: string;
  highlight: string;
}

const PREP_OPTIONS: PrepOption[] = [
  {
    id: 'noprep',
    name: '0.2mm No-Prep Ultra-Veneer',
    thickness: '0.2mm – 0.3mm (Contact lens thickness)',
    enamelPreserved: 99,
    anesthesiaRequired: false,
    durabilityScore: 95,
    aestheticScore: 99,
    description: 'Zero tooth shaving or drilling required. Crafted from high-density Feldspathic porcelain hand-layered directly over your unaltered natural teeth.',
    image: enamelAfterImg,
    highlight: 'Reversible & Painless Procedure',
  },
  {
    id: 'minprep',
    name: '0.5mm Micro-Prep IPS e.max',
    thickness: '0.5mm Minimal Micro-Etch',
    enamelPreserved: 88,
    anesthesiaRequired: false,
    durabilityScore: 99,
    aestheticScore: 96,
    description: 'Microscopic polish limited strictly to the outer enamel surface. Provides 500 MPa flexural strength for heavy bite pressures.',
    image: veneersBeforeImg,
    highlight: 'High-Impact Bruxism Resilience',
  },
  {
    id: 'traditional',
    name: 'Traditional Aggressive Crown Prep',
    thickness: '1.5mm – 2.0mm Heavy Shaving',
    enamelPreserved: 35,
    anesthesiaRequired: true,
    durabilityScore: 80,
    aestheticScore: 75,
    description: 'Traditional legacy dentistry requiring significant enamel reduction down to sensitive dentin core.',
    image: enamelBeforeImg,
    highlight: 'Legacy Crown Method (Not Practiced Here)',
  },
];

export const EnamelThicknessComparator: React.FC<EnamelThicknessComparatorProps> = ({
  onOpenBookingWithPrep,
}) => {
  const [selectedPrep, setSelectedPrep] = useState<PrepOption>(PREP_OPTIONS[0]);
  const [viewAngle, setViewAngle] = useState<'left' | 'front' | 'right'>('left');

  const handleSelect = (prep: PrepOption) => {
    soundFx.playClick();
    setSelectedPrep(prep);
    const defaultAngles: Record<string, 'left' | 'front' | 'right'> = {
      noprep: 'left',
      minprep: 'front',
      traditional: 'right',
    };
    setViewAngle(defaultAngles[prep.id] || 'front');
  };

  return (
    <section id="enamel-lab" className="py-24 sm:py-32 bg-[#EAE8E3] text-[#1A1A1A] relative overflow-hidden border-t border-[#1A1A1A]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 pb-8 border-b border-[#1A1A1A]/10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-[#1A1A1A]/10 px-3.5 py-1.5 rounded-full mb-4 shadow-xs">
              <Layers className="h-3.5 w-3.5 text-[#5A5A40]" />
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#5A5A40] font-bold">
                Biomimetic Enamel Preservation
              </span>
            </div>

            <EditorialHeading
              plainText="0.2mm Micro-Prep vs"
              italicAccent="Traditional Shaving"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1A1A1A]"
              accentColorClass="text-[#5A5A40]"
              preset="spring"
            />
          </div>

          <p className="text-sm sm:text-base text-[#1A1A1A]/70 max-w-md leading-relaxed font-light">
            Compare enamel preservation metrics between ultra-thin contact-lens veneers and old-school dental crowns.
          </p>
        </div>

        {/* Option Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PREP_OPTIONS.map((prep) => {
            const isSelected = selectedPrep.id === prep.id;
            return (
              <button
                key={prep.id}
                onClick={() => handleSelect(prep)}
                className={`p-6 rounded-[2rem] text-left border transition-all duration-300 relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#121417] text-white border-[#121417] shadow-xl scale-[1.02]'
                    : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/12 hover:border-[#1A1A1A]/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full font-bold ${
                      isSelected ? 'bg-[#8C8C6B] text-white' : 'bg-[#1A1A1A]/5 text-[#5A5A40]'
                    }`}>
                      {prep.highlight}
                    </span>
                    {isSelected && <Check className="w-5 h-5 text-[#8C8C6B]" />}
                  </div>

                  <h3 className="font-serif text-xl font-medium mb-1">
                    {prep.name}
                  </h3>
                  <div className={`text-xs font-mono mb-4 ${isSelected ? 'text-white/70' : 'text-[#1A1A1A]/60'}`}>
                    Thickness: {prep.thickness}
                  </div>
                </div>

                {/* Progress Metric */}
                <div className="pt-4 border-t border-current/10">
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span>Natural Enamel Preserved</span>
                    <span className="font-bold">{prep.enamelPreserved}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-current/10 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        prep.enamelPreserved > 90
                          ? 'bg-[#8C8C6B]'
                          : prep.enamelPreserved > 70
                          ? 'bg-slate-600'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${prep.enamelPreserved}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Breakdown Box */}
        <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-[#1A1A1A]/12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#1A1A1A]/10 shadow-md bg-black perspective-[1200px] lg:order-2">
            <img
              src={selectedPrep.image}
              alt={selectedPrep.name}
              className="w-full h-full object-cover filter contrast-105 transition-transform duration-700 ease-out"
              style={{
                transform:
                  viewAngle === 'left'
                    ? 'perspective(1000px) rotateY(-22deg) scale(1.08)'
                    : viewAngle === 'right'
                    ? 'perspective(1000px) rotateY(22deg) scale(1.08) scaleX(-1)'
                    : 'perspective(1000px) rotateY(0deg) scale(1)',
              }}
            />

            {/* Overlaid 3D Camera Controls */}
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 p-1 rounded-full border border-white/20 backdrop-blur-md">
              <span className="text-[9px] font-mono text-white/60 px-2 font-bold">3D Angle:</span>
              {[
                { id: 'left', label: 'Left ◀' },
                { id: 'front', label: 'Front ⏺' },
                { id: 'right', label: 'Right ▶' },
              ].map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    soundFx.playClick();
                    setViewAngle(a.id as any);
                  }}
                  className={`px-2 py-0.5 rounded-full transition-all text-[9px] font-mono font-bold ${
                    viewAngle === a.id
                      ? 'bg-[#8C8C6B] text-slate-950 shadow-xs'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none flex items-end p-6 text-white">
              <div>
                <span className="font-mono text-[10px] text-[#8C8C6B] uppercase font-bold tracking-widest block">
                  Enamel Reduction Metric ({viewAngle} view)
                </span>
                <span className="font-serif text-2xl font-medium">
                  {selectedPrep.thickness}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 lg:order-1">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#5A5A40] font-bold block mb-2">
                Biomimetic Clinical Summary
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1A1A] mb-3">
                {selectedPrep.name}
              </h3>
              <p className="text-sm text-[#1A1A1A]/80 leading-relaxed font-light">
                {selectedPrep.description}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1A1A1A]/10 text-xs font-sans">
              <div className="p-3.5 rounded-xl bg-[#F2F0EC] border border-[#1A1A1A]/10">
                <span className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 font-semibold block mb-0.5">Anesthesia Required</span>
                <span className="font-semibold text-[#1A1A1A]">
                  {selectedPrep.anesthesiaRequired ? 'Yes (Local Injections)' : 'No Injection Needed'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F2F0EC] border border-[#1A1A1A]/10">
                <span className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 font-semibold block mb-0.5">Bio-Aesthetic Index</span>
                <span className="font-semibold text-[#5A5A40]">{selectedPrep.aestheticScore} / 100</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F2F0EC] border border-[#1A1A1A]/10 col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 font-semibold block mb-0.5">Enamel Retention</span>
                <span className="font-semibold text-[#1A1A1A]">{selectedPrep.enamelPreserved}% Intact</span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between gap-4">
              <div className="text-xs text-[#1A1A1A]/70 font-mono">
                <ShieldCheck className="w-4 h-4 text-[#5A5A40] inline mr-1" />
                <span>100% Reversible Preservation Protocol</span>
              </div>

              <MagneticButton
                onClick={() => {
                  soundFx.playClick();
                  onOpenBookingWithPrep?.(`Enamel Prep Preference: ${selectedPrep.name}`);
                }}
                className="bg-[#121417] text-white hover:bg-[#5A5A40] px-6 py-3.5 rounded-full text-xs font-semibold flex items-center gap-2"
              >
                <span>Request No-Prep Assessment</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
