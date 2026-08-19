import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Eye, ShieldCheck, Sparkles, Activity, Sliders, ArrowUpRight, Zap, Info } from 'lucide-react';
import { EditorialHeading } from './EditorialHeading';
import { MagneticButton } from './MagneticButton';
import { soundFx } from '../lib/audioFX';
import enamelBeforeImg from '../assets/images/enamel_before_1785142578575.jpg';
import enamelAfterImg from '../assets/images/enamel_after_1785142598294.jpg';

interface InteractiveToothLayerViewerProps {
  onOpenBookingWithLayer?: (layerName: string) => void;
}

interface LayerSpec {
  id: string;
  name: string;
  depth: string;
  composition: string;
  opticalProperty: string;
  function: string;
  thickness: string;
  colorHex: string;
  bgGlow: string;
  description: string;
}

const TOOTH_LAYERS: LayerSpec[] = [
  {
    id: 'veneer',
    name: '0.2mm Master Ceramic Veneer Layer',
    depth: 'Surface (0.0mm – 0.2mm)',
    composition: 'Hand-Layered Feldspathic Glass Porcelain',
    opticalProperty: 'Opalescent Translucency (98.4% Light Transmission)',
    function: 'Aesthetic smile architecture, strain protection, and stain resistance',
    thickness: '0.2mm',
    colorHex: '#8C8C6B',
    bgGlow: 'rgba(140, 140, 107, 0.25)',
    description: 'Micro-thin feldspathic porcelain hand-layered under 20x operating microscope magnification. Mimics youthful natural tooth translucency and light refraction.',
  },
  {
    id: 'enamel',
    name: 'Natural Hydroxyapatite Enamel Shield',
    depth: 'Outer Core (0.2mm – 1.8mm)',
    composition: '96% Hydroxyapatite Crystalline Prism Grid',
    opticalProperty: 'Prismatic Blue & Amber Natural Halo Refraction',
    function: 'Primary protective shield against thermal and masticatory forces',
    thickness: '1.6mm',
    colorHex: '#EAE8E3',
    bgGlow: 'rgba(234, 232, 227, 0.2)',
    description: 'The hardest substance in human biology. Our conservative prep protocols preserve 99% of this vital mineralized structure intact.',
  },
  {
    id: 'dentin',
    name: 'Biomimetic Collagen-Dentin Base',
    depth: 'Inner Core (1.8mm – 3.5mm)',
    composition: 'Tubular Collagen Matrix with Mineral Hydroxyapatite',
    opticalProperty: 'Warm Saturated Chroma Base Tone',
    function: 'Shock absorption and vital nerve cushion',
    thickness: '2.0mm',
    colorHex: '#CBB285',
    bgGlow: 'rgba(203, 178, 133, 0.2)',
    description: 'Provides the rich warm hue beneath translucent enamel. Micro-bonding seals dentinal tubules permanently against sensitivity.',
  },
];

export const InteractiveToothLayerViewer: React.FC<InteractiveToothLayerViewerProps> = ({
  onOpenBookingWithLayer,
}) => {
  const [activeLayer, setActiveLayer] = useState<LayerSpec>(TOOTH_LAYERS[0]);
  const [showXRayMode, setShowXRayMode] = useState<boolean>(false);
  const [viewAngle, setViewAngle] = useState<'left' | 'front' | 'right'>('front');

  const toggleXRay = () => {
    soundFx.playToggle();
    setShowXRayMode(!showXRayMode);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8C8C6B]/15 border border-[#8C8C6B]/30 text-[#8C8C6B] text-[11px] font-mono uppercase tracking-widest mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>Interactive Microscopic Cutaway</span>
        </div>

        <EditorialHeading
          italicText="Cross-Sectional"
          plainText="Anatomical 3D Tooth & Enamel Architecture"
        />

        <p className="mt-4 text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
          Toggle microscopic anatomical layers to explore how 0.2mm porcelain micro-veneers integrate seamlessly with natural tooth structure.
        </p>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="bg-white border border-[#1A1A1A]/12 rounded-[2.5rem] grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-xl items-stretch">
        
        {/* Left Column: Interactive Visual 3D Layer Stage (7 Cols) */}
        <div className="lg:col-span-7 bg-[#121417] text-white p-6 sm:p-10 relative min-h-[460px] flex flex-col justify-between overflow-hidden group select-none">
          
          {/* Dynamic Ambient Background Glow based on active layer */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none transition-all duration-500"
            style={{ backgroundColor: activeLayer.bgGlow }}
          />

          {/* Top Toolbar Controls */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-wider">
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-[#8C8C6B] font-bold flex items-center gap-2">
              <Activity className="w-3.5 h-3.5" />
              <span>Microscopic Depth: {activeLayer.depth}</span>
            </div>

            {/* 3D Camera Angle Selector */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/15">
              <span className="text-[9px] text-white/50 px-2 font-bold hidden md:inline">3D View:</span>
              {[
                { id: 'left', label: 'Left Profile ◀' },
                { id: 'front', label: 'Front Cutaway ⏺' },
                { id: 'right', label: 'Right Profile ▶' },
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
              onClick={toggleXRay}
              className={`px-3.5 py-1.5 rounded-full border transition-all flex items-center gap-1.5 font-mono ${
                showXRayMode
                  ? 'bg-white text-[#121417] border-white font-bold'
                  : 'bg-white/10 text-white/70 border-white/20 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showXRayMode ? 'Micro-CT Scan Active' : 'Clinical View'}</span>
            </button>
          </div>

          {/* Central Layer Graphic Rendering */}
          <div className="relative z-10 my-8 flex items-center justify-center perspective-[1200px]">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black transition-all duration-700 ease-out">
              <img
                src={showXRayMode ? enamelBeforeImg : enamelAfterImg}
                alt="Clinical Tooth Micro Cross-Section"
                className="w-full h-full object-cover transition-transform duration-700 ease-out"
                style={{
                  filter: showXRayMode ? 'contrast(140%) brightness(95%) grayscale(60%)' : 'contrast(110%)',
                  transform:
                    viewAngle === 'left'
                      ? 'perspective(1000px) rotateY(-25deg) scale(1.08)'
                      : viewAngle === 'right'
                      ? 'perspective(1000px) rotateY(25deg) scale(1.08) scaleX(-1)'
                      : 'perspective(1000px) rotateY(0deg) scale(1)',
                }}
              />

                {/* Overlaid Layer Highlight Rings */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
                  {/* Layer 0: Veneer Rim */}
                  <rect
                    x="20"
                    y="20"
                    width="360"
                    height="260"
                    rx="20"
                    fill="none"
                    stroke={activeLayer.id === 'veneer' ? '#8C8C6B' : 'white'}
                    strokeWidth={activeLayer.id === 'veneer' ? '4' : '1'}
                    strokeDasharray={activeLayer.id === 'veneer' ? 'none' : '4 4'}
                    opacity={activeLayer.id === 'veneer' ? '1' : '0.3'}
                  />

                  {/* Layer 1: Enamel Boundary */}
                  <path
                    d="M 50 80 Q 200 40 350 80 L 350 240 Q 200 280 50 240 Z"
                    fill="none"
                    stroke={activeLayer.id === 'enamel' ? '#EAE8E3' : 'white'}
                    strokeWidth={activeLayer.id === 'enamel' ? '3.5' : '1'}
                    opacity={activeLayer.id === 'enamel' ? '1' : '0.2'}
                  />

                  {/* Layer 2: Dentin Core */}
                  <path
                    d="M 90 110 Q 200 80 310 110 L 310 210 Q 200 240 90 210 Z"
                    fill="none"
                    stroke={activeLayer.id === 'dentin' ? '#CBB282' : 'white'}
                    strokeWidth={activeLayer.id === 'dentin' ? '3.5' : '1'}
                    opacity={activeLayer.id === 'dentin' ? '1' : '0.2'}
                  />

                  {/* Layer 3: Nerve Chamber */}
                  <ellipse
                    cx="200"
                    cy="160"
                    rx="45"
                    ry="25"
                    fill={activeLayer.id === 'pulp' ? '#E06D63' : 'none'}
                    fillOpacity={activeLayer.id === 'pulp' ? '0.4' : '0'}
                    stroke={activeLayer.id === 'pulp' ? '#E06D63' : 'white'}
                    strokeWidth={activeLayer.id === 'pulp' ? '3' : '1'}
                    opacity={activeLayer.id === 'pulp' ? '1' : '0.2'}
                  />
                </svg>

                {/* Overlaid Active Layer Badge */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#8C8C6B] font-bold block">
                      Active Layer
                    </span>
                    <span className="text-white font-semibold block truncate max-w-[200px]">
                      {activeLayer.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-wider text-white/50 block">
                      Thickness
                    </span>
                    <span className="text-white font-bold">{activeLayer.thickness}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Layer Select Tabs */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 font-bold">
                Select Layer Depth:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {TOOTH_LAYERS.map((layer, idx) => {
                  const isActive = idx === selectedLayerIndex;
                  return (
                    <button
                      key={layer.id}
                      onClick={() => handleSelectLayer(idx)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-mono transition-all border ${
                        isActive
                          ? 'bg-white text-[#121417] border-white font-bold shadow-md'
                          : 'bg-white/10 text-white/70 border-white/15 hover:border-white/40 hover:text-white'
                      }`}
                    >
                      L{idx}: {layer.id.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Active Layer Specifications (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-10 bg-[#F2F0EC] text-[#1A1A1A] flex flex-col justify-between space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]/10 text-[10px] font-mono uppercase tracking-widest font-bold text-[#5A5A40]">
                    <span>Layer Specifications</span>
                    <span>{selectedLayerIndex + 1} / 04</span>
                  </div>

                  <h3 className="font-serif text-2xl font-medium text-[#1A1A1A] mt-3">
                    {activeLayer.name}
                  </h3>
                  <p className="text-xs font-sans text-[#5A5A40] mt-1 font-semibold">
                    {activeLayer.depth}
                  </p>
                  <p className="text-sm text-[#1A1A1A]/80 leading-relaxed font-normal mt-3">
                    {activeLayer.description}
                  </p>
                </div>

                {/* Specs Box */}
                <div className="space-y-2.5 pt-2">
                  <div className="p-3.5 rounded-xl bg-white border border-[#1A1A1A]/10 text-xs sm:text-sm font-sans shadow-xs">
                    <span className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 font-semibold block mb-0.5">Composition</span>
                    <span className="font-semibold text-[#1A1A1A]">{activeLayer.composition}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#1A1A1A]/10 text-xs sm:text-sm font-sans shadow-xs">
                    <span className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 font-semibold block mb-0.5">Optical Character</span>
                    <span className="font-semibold text-[#5A5A40]">{activeLayer.opticalProperty}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#1A1A1A]/10 text-xs sm:text-sm font-sans shadow-xs">
                    <span className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 font-semibold block mb-0.5">Biomimetic Function</span>
                    <span className="font-semibold text-[#1A1A1A]">{activeLayer.function}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom CTA */}
            <div className="pt-6 border-t border-[#1A1A1A]/10 flex items-center justify-between gap-4">
              <div className="text-xs font-mono text-[#1A1A1A]/70">
                <span className="block font-bold text-[#1A1A1A] uppercase text-[10px]">Zero Pulp Trauma</span>
                100% Enamel Preservation
              </div>

              <MagneticButton
                onClick={() => {
                  soundFx.playClick();
                  onOpenBookingWithLayer?.(`Layer Inquiry: ${activeLayer.name}`);
                }}
                className="bg-[#121417] text-white hover:bg-[#5A5A40] px-5 py-3.5 rounded-full text-xs font-semibold flex items-center gap-2"
              >
                <span>Consult Micro-Veneer Tech</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    );
  };
