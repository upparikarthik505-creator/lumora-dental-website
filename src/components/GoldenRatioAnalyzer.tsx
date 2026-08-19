import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Sliders, CheckCircle, Shield, ArrowUpRight, Compass, Eye, ArrowRight } from 'lucide-react';
import { EditorialHeading } from './EditorialHeading';
import { MagneticButton } from './MagneticButton';
import { soundFx } from '../lib/audioFX';

interface AnalyzerProps {
  onOpenBookingWithProfile: (profile: string) => void;
}

export const GoldenRatioAnalyzer: React.FC<AnalyzerProps> = ({ onOpenBookingWithProfile }) => {
  const [incisorRatio, setIncisorRatio] = useState(80); // 75-85%
  const [lateralProportion, setLateralProportion] = useState(62); // 61.8% Golden Ratio
  const [lipGingivalDisplay, setLipGingivalDisplay] = useState(1.5); // 0 - 4mm
  const [showGrid, setShowGrid] = useState(true);
  const [viewAngle, setViewAngle] = useState<'left' | 'front' | 'right'>('front');

  // Calculate aesthetic score based on golden ratio proximity
  const incisorDev = Math.abs(incisorRatio - 80);
  const lateralDev = Math.abs(lateralProportion - 61.8);
  const lipDev = Math.abs(lipGingivalDisplay - 1.5);
  const score = Math.max(72, Math.round(100 - (incisorDev * 1.2 + lateralDev * 0.8 + lipDev * 4)));

  const handleBook = () => {
    const details = `Golden Ratio Diagnostic: Central Aspect ${incisorRatio}%, Lateral Prop ${lateralProportion}% (Golden target 61.8%), Lip Reveal ${lipGingivalDisplay}mm. Calculated Harmony Score: ${score}%`;
    onOpenBookingWithProfile(details);
  };

  return (
    <section id="golden-ratio" className="py-24 sm:py-32 lg:py-36 bg-[#F9F8F6] text-[#1A1A1A] border-t border-[#1A1A1A]/10 relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-0 left-1/3 w-[550px] h-[550px] bg-[#5A5A40]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-10 border-b border-[#1A1A1A]/10">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#EAE8E3] border border-[#1A1A1A]/10 px-3.5 py-1.5 rounded-full mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#5A5A40] font-bold">
              <Compass className="h-3.5 w-3.5 text-[#5A5A40]" />
              Biomimetic Symmetry
            </div>

            <EditorialHeading
              plainText="Golden Ratio (phi 1.618)"
              italicAccent="Smile Architecture"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1A1A1A]"
              accentColorClass="text-[#5A5A40]"
              preset="3d-flip"
            />
          </div>

          <p className="text-sm sm:text-base text-[#1A1A1A]/70 max-w-md leading-relaxed font-light">
            In facial aesthetics, the divine proportion governs perceived natural elegance. Adjust key parameters below to test your smile's harmony score.
          </p>
        </div>

        {/* Interactive Analyzer Container */}
        <div className="bg-white border border-[#1A1A1A]/12 rounded-[2rem] grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-xl">
          
          {/* Controls Column (5 Cols) - Flipped to Left */}
          <div className="lg:col-span-5 p-8 sm:p-10 bg-[#F2F0EC] text-[#1A1A1A] flex flex-col justify-between space-y-8 lg:order-1">
            <div className="space-y-6">
              
              {/* Slider 1: Central Incisor Proportion */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="uppercase text-[#1A1A1A]/70 font-bold text-[10px] tracking-wider">
                    01. Central Incisor Width-to-Height
                  </span>
                  <span className="text-[#1A1A1A] font-bold">{incisorRatio}%</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="90"
                  value={incisorRatio}
                  onChange={(e) => {
                    soundFx.playClick();
                    setIncisorRatio(Number(e.target.value));
                  }}
                  className="w-full accent-[#121417] bg-[#1A1A1A]/10 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-[#1A1A1A]/50 mt-1">
                  <span>70% (Narrow)</span>
                  <span className="font-bold text-[#5A5A40]">80% (Golden Standard)</span>
                  <span>90% (Wide)</span>
                </div>
              </div>

              {/* Slider 2: Lateral-to-Central Golden Ratio */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="uppercase text-[#1A1A1A]/70 font-bold text-[10px] tracking-wider">
                    02. Lateral Incisor Proportion
                  </span>
                  <span className="text-[#1A1A1A] font-bold">{lateralProportion}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="75"
                  value={lateralProportion}
                  onChange={(e) => {
                    soundFx.playClick();
                    setLateralProportion(Number(e.target.value));
                  }}
                  className="w-full accent-[#121417] bg-[#1A1A1A]/10 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-[#1A1A1A]/50 mt-1">
                  <span>50%</span>
                  <span className="font-bold text-[#5A5A40]">61.8% (Phi Ideal)</span>
                  <span>75%</span>
                </div>
              </div>

              {/* Slider 3: Gingival Display on Full Smile */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="uppercase text-[#1A1A1A]/70 font-bold text-[10px] tracking-wider">
                    03. Gingival Gum Display
                  </span>
                  <span className="text-[#1A1A1A] font-bold">{lipGingivalDisplay}mm</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="0.5"
                  value={lipGingivalDisplay}
                  onChange={(e) => {
                    soundFx.playClick();
                    setLipGingivalDisplay(Number(e.target.value));
                  }}
                  className="w-full accent-[#121417] bg-[#1A1A1A]/10 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-[#1A1A1A]/50 mt-1">
                  <span>0mm (Low)</span>
                  <span className="font-bold text-[#5A5A40]">1.5mm (Aesthetic Peak)</span>
                  <span>4mm (High Display)</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#1A1A1A]/10 text-xs text-[#1A1A1A]/80 font-mono space-y-1">
                <span className="font-bold text-[#1A1A1A] uppercase text-[10px] block">Aesthetic Diagnosis</span>
                <p className="leading-relaxed text-[11px] font-sans">
                  {score >= 90
                    ? 'Proportions align within 98% of divine golden ratio vectors. Exceptionally balanced natural smile structure.'
                    : score >= 75
                    ? 'Minor axial divergence detected. Micro-veneers can optimize lateral symmetry to 1:1.618 perfection.'
                    : 'Substantial proportion variance. Complete porcelain smile re-architecture recommended.'}
                </p>
              </div>

            </div>

            {/* CTA */}
            <div className="pt-6 border-t border-[#1A1A1A]/10 flex items-center justify-between gap-4">
              <div className="text-xs font-mono text-[#1A1A1A]/70">
                <span className="block font-bold text-[#1A1A1A] uppercase text-[10px]">Phi Metric Analysis</span>
                {score}% Facial Harmony Match
              </div>

              <MagneticButton
                onClick={() => {
                  soundFx.playClick();
                  onOpenBookingWithProfile?.(`Golden Ratio Analysis: ${score}% Phi Match`);
                }}
                className="bg-[#121417] text-white hover:bg-slate-800 px-5 py-3.5 rounded-full text-xs font-semibold flex items-center gap-2"
              >
                <span>Book Phi Ratio Scan</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>

          </div>

          {/* Visual Stage (7 Cols) - Flipped to Right */}
          <div className="lg:col-span-7 bg-[#121417] text-white p-8 sm:p-12 flex flex-col justify-between relative min-h-[440px] overflow-hidden lg:order-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 z-10 font-mono text-[10px] uppercase tracking-widest text-white/60">
              <span className="bg-black/60 px-3 py-1 border border-white/10 text-[#8C8C6B] font-bold rounded-md">
                Geometric Overlay Engine
              </span>

              {/* 3D Angle Toggles */}
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/15">
                <span className="text-[9px] text-white/50 px-2 font-bold font-mono">3D Angle:</span>
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

              <button
                onClick={() => setShowGrid(!showGrid)}
                className="flex items-center gap-1.5 hover:text-white transition-colors bg-white/10 px-3 py-1 border border-white/15 rounded-full"
              >
                <Eye className="h-3.5 w-3.5 text-[#8C8C6B]" />
                {showGrid ? 'Hide Phi Grid' : 'Show Phi Grid'}
              </button>
            </div>

            {/* Central Graphic with Dynamic SVG Golden Ratio Grid Overlay */}
            <div className="relative my-8 aspect-[16/9] w-full max-w-xl mx-auto overflow-hidden border border-white/15 bg-black rounded-xl perspective-[1200px]">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200"
                alt="Facial smile analysis"
                className="w-full h-full object-cover filter contrast-105 brightness-95 transition-transform duration-700 ease-out"
                style={{
                  transform:
                    viewAngle === 'left'
                      ? 'perspective(1000px) rotateY(-18deg) scale(1.05)'
                      : viewAngle === 'right'
                      ? 'perspective(1000px) rotateY(18deg) scale(1.05) scaleX(-1)'
                      : 'perspective(1000px) rotateY(0deg) scale(1)',
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

              {/* Dynamic Phi Grid Overlay */}
              {showGrid && (
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none stroke-[#8C8C6B] opacity-80"
                  viewBox="0 0 400 225"
                  fill="none"
                >
                  {/* Golden Spiral / Ratio Vertical Grid Lines */}
                  <line x1="150" y1="0" x2="150" y2="225" strokeWidth="0.8" strokeDasharray="3 3" />
                  <line x1="250" y1="0" x2="250" y2="225" strokeWidth="0.8" strokeDasharray="3 3" />
                  <line x1="180" y1="0" x2="180" y2="225" strokeWidth="1" />
                  <line x1="220" y1="0" x2="220" y2="225" strokeWidth="1" />

                  {/* Horizontal Lip & Smile Arc Vectors */}
                  <path d="M 120 145 Q 200 170 280 145" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
                  <path d="M 140 135 Q 200 148 260 135" stroke="#8C8C6B" strokeWidth="1" fill="none" />

                  {/* Measurement Nodes */}
                  <circle cx="200" cy="148" r="3" fill="#8C8C6B" />
                  <circle cx="180" cy="142" r="2.5" fill="#FFFFFF" />
                  <circle cx="220" cy="142" r="2.5" fill="#FFFFFF" />
                </svg>
              )}

              {/* Dynamic Score Indicator Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between font-mono text-white text-[11px] bg-black/80 backdrop-blur-md p-3 border border-white/10 rounded-lg">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#8C8C6B] font-bold block">
                    Calculated Harmony Index
                  </span>
                  <span className="font-editorial text-3xl italic text-white leading-none">
                    {score}% Match
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-widest text-white/50 block">
                    Phi Ratio Accuracy
                  </span>
                  <span className="text-white font-bold text-xs">
                    {lateralProportion === 62 ? '1 : 1.618 (Ideal)' : `${(lateralProportion / 100).toFixed(3)} Ratio`}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Spec Details */}
            <div className="z-10 grid grid-cols-3 gap-2 pt-4 border-t border-white/10 font-mono text-[10px] text-white/70">
              <div className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[#8C8C6B]" />
                <span>Central: {incisorRatio}% W/H</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-[#8C8C6B]" />
                <span>Lateral: {lateralProportion}%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Compass className="h-3.5 w-3.5 text-[#8C8C6B]" />
                <span>Gingival: {lipGingivalDisplay}mm</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
