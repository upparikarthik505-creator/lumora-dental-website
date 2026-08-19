import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Sliders, CheckCircle, Info, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { EditorialHeading } from './EditorialHeading';
import { MagneticButton } from './MagneticButton';
import { soundFx } from '../lib/audioFX';

interface ShadeOption {
  id: string;
  code: string;
  name: string;
  desc: string;
  colorHex: string;
  translucency: number;
}

const SHADES: ShadeOption[] = [
  {
    id: 'bl1',
    code: 'BL1',
    name: 'Hollywood Ultra Bleach',
    desc: 'High-luminosity white with maximum light reflection for a luminous red-carpet appearance.',
    colorHex: '#FAF8F5',
    translucency: 85,
  },
  {
    id: 'bl2',
    code: 'BL2',
    name: 'Natural Bleach White',
    desc: 'Radiant yet soft white containing subtle gradient translucency along the biting edge.',
    colorHex: '#F6F3EE',
    translucency: 92,
  },
  {
    id: 'a1',
    code: 'A1',
    name: 'Natural Bright',
    desc: 'The gold standard for natural youthful enamel. Matches healthy, untreated adolescent enamel.',
    colorHex: '#F1ECE2',
    translucency: 96,
  },
  {
    id: 'a2',
    code: 'A2',
    name: 'Warm Organic',
    desc: 'Sophisticated warm undertone ideal for seamless single-tooth restorations.',
    colorHex: '#EAE3D5',
    translucency: 98,
  },
];

const ARCS = [
  { id: 'youthful', name: 'Youthful Oval', desc: 'Central incisors slightly longer, soft rounded edges' },
  { id: 'bold', name: 'Bold Square-Oval', desc: 'Straight horizontal line for a confident, structured look' },
  { id: 'soft', name: 'Soft Natural', desc: 'Subtle curvature following the lower lip natural contour' },
];

export const ShadeSimulator: React.FC<{ onOpenBookingWithProfile: (profileText: string) => void }> = ({
  onOpenBookingWithProfile,
}) => {
  const [selectedShade, setSelectedShade] = useState<ShadeOption>(SHADES[1]); // BL2
  const [selectedArc, setSelectedArc] = useState(ARCS[0]);
  const [mamelons, setMamelons] = useState(true);
  const [opalRefraction, setOpalRefraction] = useState(true);
  const [macroZoom, setMacroZoom] = useState(false);
  const [viewAngle, setViewAngle] = useState<'left' | 'front' | 'right'>('front');

  const handleBookWithProfile = () => {
    const profile = `Custom Smile Profile: Shade ${selectedShade.code} (${selectedShade.name}), Shape: ${selectedArc.name}, Mamelons: ${mamelons ? 'Yes' : 'No'}, Opal: ${opalRefraction ? 'Yes' : 'No'}`;
    onOpenBookingWithProfile(profile);
  };

  return (
    <section id="shade-studio" className="py-24 sm:py-32 lg:py-36 bg-[#EAE8E3] text-[#1A1A1A] border-t border-[#1A1A1A]/10 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#5A5A40]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-[#1A1A1A]/10 px-3.5 py-1.5 rounded-full mb-4 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#5A5A40]" />
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#5A5A40] font-bold">
                Interactive Studio Technology
              </span>
            </div>
            <EditorialHeading
              plainText="Porcelain Shade &"
              italicAccent="Smile Ratio Finder"
              afterText=""
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1A1A1A]"
              accentColorClass="text-[#5A5A40]"
              preset="shimmer"
            />
          </div>

          <p className="text-sm sm:text-base text-[#1A1A1A]/70 max-w-md leading-relaxed font-light">
            Preview handcrafted VITA ceramic shade codes, light translucency levels, and edge characterizations before your in-person diagnostic wax-up try-in.
          </p>
        </div>

        {/* Main Interactive App Container */}
        <div className="bg-white border border-[#1A1A1A]/12 grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-xl rounded-[2.5rem]">
          
          {/* Left Column: Visual Macro Preview */}
          <div className="lg:col-span-7 bg-[#121417] text-white p-8 sm:p-12 relative flex flex-col justify-between min-h-[420px] overflow-hidden group">
            {/* Visual Header Badges */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 z-10">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 bg-black/60 px-3 py-1 border border-white/10">
                20x Optical Loupe View
              </span>

              {/* 3D Camera Angle Selector */}
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
                onClick={() => setMacroZoom(!macroZoom)}
                className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C8C6B] hover:text-white transition-colors bg-white/5 px-3 py-1 border border-white/10 rounded-full"
              >
                {macroZoom ? 'Standard View' : 'Macro Zoom'}
              </button>
            </div>

            {/* Central High-Res Ceramic Smile Simulation Render */}
            <div className="my-12 relative flex items-center justify-center perspective-[1200px]">
              <motion.div
                animate={{ scale: macroZoom ? 1.25 : 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[16/9] w-full max-w-lg border border-white/15 bg-black overflow-hidden shadow-2xl rounded-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200"
                  alt="Microscopic view of porcelain veneer"
                  className="w-full h-full object-cover opacity-90 transition-all duration-700 filter brightness-105"
                  style={{
                    filter: `brightness(${selectedShade.code === 'BL1' ? '1.15' : selectedShade.code === 'BL2' ? '1.08' : '1.0'}) contrast(${opalRefraction ? '1.1' : '1.0'})`,
                    transform:
                      viewAngle === 'left'
                        ? 'perspective(1000px) rotateY(-20deg) scale(1.05)'
                        : viewAngle === 'right'
                        ? 'perspective(1000px) rotateY(20deg) scale(1.05) scaleX(-1)'
                        : 'perspective(1000px) rotateY(0deg) scale(1)',
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Shade Spec Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white font-mono text-[11px]">
                  <div>
                    <span className="text-[#5A5A40] font-bold block text-[9px] uppercase tracking-widest">
                      Selected Ceramic Code
                    </span>
                    <span className="font-editorial text-2xl italic font-normal text-white">
                      VITA {selectedShade.code}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-white/60 block text-[9px] uppercase tracking-widest">
                      Translucency Rate
                    </span>
                    <span className="text-white font-bold">{selectedShade.translucency}% Bio-Refraction</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Real-time Feature Badges */}
            <div className="z-10 grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-[10px] font-mono text-white/70">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#5A5A40]" />
                <span>Shape: {selectedArc.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className={`h-3.5 w-3.5 ${mamelons ? 'text-[#5A5A40]' : 'text-white/20'}`} />
                <span>Mamelon Texture</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className={`h-3.5 w-3.5 ${opalRefraction ? 'text-[#5A5A40]' : 'text-white/20'}`} />
                <span>Opal Halo</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Controls */}
          <div className="lg:col-span-5 p-8 sm:p-10 space-y-8 flex flex-col justify-between bg-[#F2F0EC] text-[#1A1A1A]">
            <div className="space-y-6">
              {/* Control Section 1: Ceramic Shade Selector */}
              <div>
                <label className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#1A1A1A]/60 block mb-3 font-bold">
                  01. Choose VITA Porcelain Shade
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {SHADES.map((s) => {
                    const isSelected = selectedShade.id === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => {
                          soundFx.playClick();
                          setSelectedShade(s);
                        }}
                        className={`p-3 text-left border rounded-xl transition-all duration-300 font-mono text-xs flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#121417] text-white border-[#121417] font-semibold shadow-md'
                            : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold">{s.code}</span>
                          <span
                            className="h-3.5 w-3.5 rounded-full border border-black/20"
                            style={{ backgroundColor: s.colorHex }}
                          />
                        </div>
                        <span className="text-[10px] opacity-75 truncate">{s.name}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-[#1A1A1A]/70 mt-3 font-light leading-relaxed">
                  {selectedShade.desc}
                </p>
              </div>

              {/* Control Section 2: Smile Arc Architecture */}
              <div>
                <label className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#1A1A1A]/60 block mb-3 font-bold">
                  02. Smile Arc Geometry
                </label>
                <div className="space-y-2">
                  {ARCS.map((arc) => {
                    const isSelected = selectedArc.id === arc.id;
                    return (
                      <button
                        key={arc.id}
                        onClick={() => {
                          soundFx.playClick();
                          setSelectedArc(arc);
                        }}
                        className={`w-full text-left p-3 border rounded-xl text-xs font-mono transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#121417] text-white border-[#121417] font-semibold shadow-xs'
                            : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'
                        }`}
                      >
                        <div>
                          <div className="font-bold">{arc.name}</div>
                          <div className={`text-[10px] font-sans font-light ${isSelected ? 'text-white/70' : 'text-[#1A1A1A]/60'}`}>{arc.desc}</div>
                        </div>
                        {isSelected && <CheckCircle className="h-4 w-4 text-[#8C8C6B] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Control Section 3: Micro-Effects Toggles */}
              <div>
                <label className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#1A1A1A]/60 block mb-3 font-bold">
                  03. Optical Characterization
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setMamelons(!mamelons);
                    }}
                    className={`p-3 border rounded-xl text-left font-mono text-xs transition-all ${
                      mamelons ? 'bg-[#121417] border-[#121417] text-white' : 'bg-white border-[#1A1A1A]/10 text-[#1A1A1A]/60'
                    }`}
                  >
                    <span className="block font-bold">Incisal Mamelons</span>
                    <span className={`text-[9px] block mt-0.5 ${mamelons ? 'text-white/70' : 'text-[#1A1A1A]/50'}`}>Natural internal ridges</span>
                  </button>

                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setOpalRefraction(!opalRefraction);
                    }}
                    className={`p-3 border rounded-xl text-left font-mono text-xs transition-all ${
                      opalRefraction ? 'bg-[#121417] border-[#121417] text-white' : 'bg-white border-[#1A1A1A]/10 text-[#1A1A1A]/60'
                    }`}
                  >
                    <span className="block font-bold">Opal Edge Halo</span>
                    <span className={`text-[9px] block mt-0.5 ${opalRefraction ? 'text-white/70' : 'text-[#1A1A1A]/50'}`}>Blueish edge translucency</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="pt-6 border-t border-[#1A1A1A]/10 flex items-center justify-between gap-4">
              <div className="text-xs font-mono text-[#1A1A1A]/70">
                <span className="block font-bold text-[#1A1A1A] uppercase text-[10px]">Saved Profile</span>
                VITA {selectedShade.code} • {selectedArc.name}
              </div>

              <MagneticButton onClick={handleBookWithProfile} className="bg-[#121417] text-white hover:bg-[#5A5A40]">
                Book Consultation With Profile
              </MagneticButton>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
