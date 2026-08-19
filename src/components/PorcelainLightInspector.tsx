import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Sparkles, Layers, ShieldCheck, Eye, Sliders, ArrowUpRight, Compass, RotateCcw } from 'lucide-react';
import { EditorialHeading } from './EditorialHeading';
import { MagneticButton } from './MagneticButton';
import { soundFx } from '../lib/audioFX';

interface PorcelainLightInspectorProps {
  onOpenBookingWithMaterial?: (materialName: string) => void;
}

interface MaterialSpec {
  id: string;
  name: string;
  subtitle: string;
  thickness: string;
  translucency: number;
  flexuralStrength: string;
  description: string;
  lightReflection: string;
  bestFor: string;
}

const MATERIALS: MaterialSpec[] = [
  {
    id: 'feldspathic',
    name: 'Hand-Layered Feldspathic Porcelain',
    subtitle: 'The Gold Standard in Biomimetic Craftsmanship',
    thickness: '0.2mm – 0.3mm Ultra-Prep',
    translucency: 98,
    flexuralStrength: '120 MPa (Natural Enamel Match)',
    description: 'Custom layered powder-and-liquid ceramic fired by master ceramists. Offers identical light dispersion, opalescence, and micro-grooves to natural teeth.',
    lightReflection: 'Rayleigh Bio-Scattering & Opal Halo',
    bestFor: 'High-aesthetic anterior smile transformations without aggressive drilling',
  },
  {
    id: 'emax',
    name: 'IPS e.max Lithium Disilicate',
    subtitle: 'High-Strength Monolithic Precision',
    thickness: '0.4mm – 0.6mm Minimal Prep',
    translucency: 88,
    flexuralStrength: '500 MPa High Impact',
    description: 'Pressed glass-ceramic providing superior structural resilience and chip resistance. Ideal for patients with bruxism or moderate bite pressures.',
    lightReflection: 'Specular Gloss & Natural Translucency',
    bestFor: 'High-stress bite zones & full upper restorations',
  },
  {
    id: 'zirconia',
    name: '3D Gradient Zirconia (Ultra-Translucent)',
    subtitle: 'Maximum Biocompatibility & Durability',
    thickness: '0.5mm Seamless Fit',
    translucency: 82,
    flexuralStrength: '1,100 MPa Maximum Tensile',
    description: 'Multi-layered cubic zirconia with color and translucency gradients from cervical neck to incisal tip. Biologically inert and zero metal shadow.',
    lightReflection: 'Diffuse Soft-Focus Refraction',
    bestFor: 'Implant crowns, bridges, and severe discoloration masking',
  },
];

const LIGHT_PRESETS = [
  { id: 'ring', name: 'Clinical Ring Flash (5500K)', temp: '5500K', bgOverlay: 'rgba(255, 255, 255, 0.15)', glow: '#FFFFFF' },
  { id: 'golden', name: 'Studio Sunset (3200K)', temp: '3200K', bgOverlay: 'rgba(255, 180, 100, 0.25)', glow: '#FFB86C' },
  { id: 'daylight', name: 'Natural Daylight (6500K)', temp: '6500K', bgOverlay: 'rgba(180, 220, 255, 0.2)', glow: '#A0D2FF' },
];

export const PorcelainLightInspector: React.FC<PorcelainLightInspectorProps> = ({
  onOpenBookingWithMaterial,
}) => {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialSpec>(MATERIALS[0]);
  const [selectedLight, setSelectedLight] = useState(LIGHT_PRESETS[0]);
  const [lightPos, setLightPos] = useState({ x: 50, y: 35 });
  const [showWireframe, setShowWireframe] = useState(true);
  const [viewAngle, setViewAngle] = useState<'left' | 'front' | 'right'>('left');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(10, Math.min(90, ((e.clientY - rect.top) / rect.height) * 100));
    setLightPos({ x, y });
  };

  const handleSelectMaterial = (mat: MaterialSpec) => {
    soundFx.playClick();
    setSelectedMaterial(mat);
    const angleMap: Record<string, 'left' | 'front' | 'right'> = {
      feldspathic: 'left',
      emax: 'front',
      zirconia: 'right',
    };
    setViewAngle(angleMap[mat.id] || 'front');
  };

  const handleSelectLight = (light: typeof LIGHT_PRESETS[0]) => {
    soundFx.playTone(600, 0.1);
    setSelectedLight(light);
  };

  return (
    <section id="porcelain-lab" className="py-24 sm:py-32 lg:py-36 bg-[#EAE8E3] text-[#1A1A1A] relative overflow-hidden border-t border-[#1A1A1A]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 pb-8 border-b border-[#1A1A1A]/10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#5A5A40] font-bold border border-[#1A1A1A]/10 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#8C8C6B]" />
              <span>Interactive Material Studio</span>
            </div>

            <EditorialHeading
              plainText="Porcelain Optical &"
              italicAccent="Light Refraction Lab"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1A1A1A]"
              accentColorClass="text-[#5A5A40]"
              preset="spring"
            />
          </div>

          <p className="text-sm sm:text-base text-[#1A1A1A]/70 max-w-md leading-relaxed font-light">
            Move your cursor across the ceramic lens to test 360° light scattering, internal mamelon translucency, and edge opalescence under various studio illumination setups.
          </p>
        </div>

        {/* Main Dribbble-Style Interactive Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Material Specifications Panel (5 Cols) - Flipped to Left */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-10 rounded-[2rem] border border-[#1A1A1A]/12 shadow-lg flex flex-col justify-between space-y-6 lg:order-1">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]/10 font-mono text-[10px] uppercase tracking-wider text-[#5A5A40] font-bold">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Ceramic Formulation
                </span>
                <span>01 / 03</span>
              </div>

              {/* Material Selection Tabs */}
              <div className="mt-4 space-y-2">
                {MATERIALS.map((mat) => {
                  const isSelected = selectedMaterial.id === mat.id;
                  return (
                    <button
                      key={mat.id}
                      onClick={() => handleSelectMaterial(mat)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#121417] text-white border-[#121417] shadow-md'
                          : 'bg-[#F9F8F6] text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'
                      }`}
                    >
                      <div className="flex items-center justify-between font-serif text-sm font-semibold">
                        <span>{mat.name}</span>
                        <span className={`text-[10px] font-mono uppercase ${isSelected ? 'text-[#8C8C6B]' : 'text-[#5A5A40]'}`}>
                          {mat.thickness}
                        </span>
                      </div>
                      <div className={`text-xs mt-1 font-sans ${isSelected ? 'text-white/70' : 'text-[#1A1A1A]/60'}`}>
                        {mat.subtitle}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Material Deep Dive Details */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedMaterial.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-4 rounded-xl bg-[#F2F0EC] border border-[#1A1A1A]/10 space-y-3"
                >
                  <p className="text-xs text-[#1A1A1A]/80 leading-relaxed font-light">
                    {selectedMaterial.description}
                  </p>

                  <div className="pt-2 border-t border-[#1A1A1A]/10 grid grid-cols-2 gap-3 text-xs font-mono">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/50 block">Flexural Strength</span>
                      <span className="font-bold text-[#1A1A1A]">{selectedMaterial.flexuralStrength}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/50 block">Optical Character</span>
                      <span className="font-bold text-[#5A5A40]">{selectedMaterial.lightReflection}</span>
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] font-sans text-[#1A1A1A]/70 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#5A5A40] shrink-0 mt-0.5" />
                    <span><strong>Clinical Indication:</strong> {selectedMaterial.bestFor}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Action CTA */}
            <div className="pt-6 border-t border-[#1A1A1A]/10 flex items-center justify-between gap-4">
              <div className="text-xs font-mono text-[#1A1A1A]/70">
                <span className="text-[#1A1A1A] font-bold block text-[10px] uppercase">Selected Ceramic</span>
                {selectedMaterial.name.split(' ')[0]} {selectedMaterial.thickness}
              </div>

              <MagneticButton
                onClick={() => {
                  soundFx.playClick();
                  onOpenBookingWithMaterial?.(`Material Option: ${selectedMaterial.name} (${selectedMaterial.thickness})`);
                }}
                className="bg-[#121417] text-white hover:bg-[#8C8C6B] hover:text-slate-950 px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider transition-all shadow-md flex items-center gap-2"
              >
                <span>Request Custom Ceramic Sample</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </div>

          </div>

          {/* Right Visual Interactive Light Stage (7 Cols) - Flipped to Right */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            data-cursor-text="DRAG LIGHT"
            className="lg:col-span-7 bg-[#121417] text-white p-6 sm:p-10 rounded-[2rem] border border-[#1A1A1A]/15 relative min-h-[460px] lg:min-h-[520px] flex flex-col justify-between overflow-hidden shadow-2xl group select-none lg:order-2"
          >
            {/* Dynamic Interactive Light Halo */}
            <div
              className="absolute pointer-events-none transition-all duration-150 ease-out z-0 rounded-full blur-[110px]"
              style={{
                top: `${lightPos.y}%`,
                left: `${lightPos.x}%`,
                transform: 'translate(-50%, -50%)',
                width: '380px',
                height: '380px',
                backgroundColor: selectedLight.glow,
                opacity: 0.35,
              }}
            />

            {/* Top Toolbar Controls */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-wider">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                <Sun className="w-3.5 h-3.5 text-[#8C8C6B]" />
                <span>360° Light Beam: {Math.round(lightPos.x)}° X / {Math.round(lightPos.y)}° Y</span>
              </div>

              {/* 3D Camera Angle Selector */}
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/15">
                <span className="text-[9px] text-white/50 px-2 font-bold hidden md:inline">3D Angle:</span>
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

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setShowWireframe(!showWireframe);
                  }}
                  className={`px-3 py-1.5 rounded-full border transition-all ${
                    showWireframe
                      ? 'bg-white text-[#121417] border-white font-bold'
                      : 'bg-white/10 text-white/70 border-white/20 hover:text-white'
                  }`}
                >
                  <Eye className="w-3 h-3 inline mr-1" />
                  {showWireframe ? 'Grid Active' : 'Show Grid'}
                </button>

                <button
                  onClick={() => setLightPos({ x: 50, y: 35 })}
                  className="px-3 py-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-all"
                  title="Reset Light Position"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Center High-Definition Ceramic Tooth Refraction Stage */}
            <div className="relative z-10 my-6 flex items-center justify-center perspective-[1200px]">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black transition-all duration-700 ease-out">
                <img
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1000"
                  alt="Ceramic Light Inspection"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out"
                  style={{
                    filter: `brightness(${selectedMaterial.id === 'feldspathic' ? '1.1' : '1.0'}) contrast(${selectedLight.id === 'ring' ? '1.15' : '1.0'})`,
                    transform:
                      viewAngle === 'left'
                        ? 'perspective(1000px) rotateY(-22deg) scale(1.08)'
                        : viewAngle === 'right'
                        ? 'perspective(1000px) rotateY(22deg) scale(1.08) scaleX(-1)'
                        : 'perspective(1000px) rotateY(0deg) scale(1)',
                  }}
                />

                {/* Light Directional Radial Highlight Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-100"
                  style={{
                    background: `radial-gradient(320px circle at ${lightPos.x}% ${lightPos.y}%, ${selectedLight.bgOverlay}, transparent 75%)`,
                  }}
                />

                {/* Interactive Wireframe Vector Matrix Overlay */}
                {showWireframe && (
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none stroke-white/40"
                    viewBox="0 0 400 300"
                    fill="none"
                  >
                    {/* Incisal Edge Arc Line */}
                    <path
                      d="M 60 180 Q 200 230 340 180"
                      stroke="#8C8C6B"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                    {/* Mamelon Lobes */}
                    <path d="M 130 160 C 140 210 160 210 170 160" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
                    <path d="M 190 160 C 200 220 210 220 220 160" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.8" />
                    <path d="M 240 160 C 250 210 270 210 280 160" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />

                    {/* Light Angle Pointer Node */}
                    <circle
                      cx={`${(lightPos.x / 100) * 400}`}
                      cy={`${(lightPos.y / 100) * 300}`}
                      r="8"
                      fill="#8C8C6B"
                      fillOpacity="0.4"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx={`${(lightPos.x / 100) * 400}`}
                      cy={`${(lightPos.y / 100) * 300}`}
                      r="3"
                      fill="#FFFFFF"
                    />
                  </svg>
                )}

                {/* Overlaid Live Spec Badge */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#8C8C6B] font-bold block">
                      Active Material
                    </span>
                    <span className="text-white font-semibold truncate max-w-[180px] sm:max-w-xs block">
                      {selectedMaterial.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-wider text-white/50 block">
                      Translucency
                    </span>
                    <span className="text-white font-bold">{selectedMaterial.translucency}% Bio-Transmission</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Preset Light Temperature Selector */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 font-bold">
                Studio Illumination Environment:
              </span>
              <div className="flex items-center gap-2">
                {LIGHT_PRESETS.map((light) => {
                  const isActive = selectedLight.id === light.id;
                  return (
                    <button
                      key={light.id}
                      onClick={() => handleSelectLight(light)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-mono transition-all border ${
                        isActive
                          ? 'bg-white text-[#121417] border-white font-bold shadow-md'
                          : 'bg-white/10 text-white/70 border-white/15 hover:border-white/40 hover:text-white'
                      }`}
                    >
                      {light.name}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
