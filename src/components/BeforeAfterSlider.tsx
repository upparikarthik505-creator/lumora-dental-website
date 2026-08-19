import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MoveHorizontal, ZoomIn, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { EditorialHeading } from './EditorialHeading';
import case1BeforeImg from '../assets/images/case1_level_before_1785591280058.jpg';
import case1AfterImg from '../assets/images/case1_level_after_1785591294361.jpg';
import case2BeforeImg from '../assets/images/case2_level_before_1785591307810.jpg';
import case2AfterImg from '../assets/images/case2_level_after_1785591324463.jpg';
import case3BeforeImg from '../assets/images/case3_level_before_1785591339150.jpg';
import case3AfterImg from '../assets/images/case3_level_after_1785591352370.jpg';

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  shadeShift: string;
  prepDepth: string;
  material: string;
  duration: string;
  beforeImg: string;
  afterImg: string;
  description: string;
  specs: string[];
}

const CASES: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'Micro-Thin Porcelain Veneers',
    subtitle: 'Hand-Layered Feldspathic Ceramics',
    shadeShift: 'A3.5 → BL1 Bleach White',
    prepDepth: '0.2mm Ultra-Conservative',
    material: 'Custom Swiss Feldspathic Ceramic',
    duration: '10 Days • 2 Atelier Visits',
    beforeImg: case1BeforeImg,
    afterImg: case1AfterImg,
    description: 'Patient presented with tetracycline staining and worn incisal edges. Corrected with 10 micro-thin ceramic veneers without aggressive enamel reduction.',
    specs: ['Micro-Layered Light Translucency', 'Natural Mamelon Internal Artistry', 'Bio-Compatible Gingival Margin']
  },
  {
    id: 'case-2',
    title: 'Full Arch Ceramic Reconstruction',
    subtitle: '3D CBCT Guided Zirconia + E.max',
    shadeShift: 'A3 → BL2 Natural Luster',
    prepDepth: 'Guided Digital Preparation',
    material: 'Monolithic Zirconia Core + E.max Layering',
    duration: '3 Weeks • 3 Visits',
    beforeImg: case2BeforeImg,
    afterImg: case2AfterImg,
    description: 'Restored lost vertical dimension and bite alignment caused by nocturnal bruxism, regaining youthful jaw acoustics and symmetrical smile arc.',
    specs: ['Neuromuscular Bite Balance', 'Zero-Flex Structural Integrity', 'Micro-Laser Gum Apex Contouring']
  },
  {
    id: 'case-3',
    title: 'Gingival Zenith Laser Architecture',
    subtitle: 'Biological Soft-Tissue Alignment',
    shadeShift: 'Natural Enamel Preserved',
    prepDepth: '0.0mm Non-Invasive',
    material: '980nm Diode Laser Sculpting',
    duration: 'Single 45-Min Atelier Visit',
    beforeImg: case3BeforeImg,
    afterImg: case3AfterImg,
    description: 'Surgical diode laser re-contouring of asymmetric gum line, establishing mathematical Golden Ratio proportions across central incisors.',
    specs: ['Pain-Free Fiber Optic Precision', 'Immediate Same-Day Healing', 'Symmetrical Tooth Length Ratio']
  }
];

export const BeforeAfterSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [activeCaseId, setActiveCaseId] = useState<string>('case-1');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isManualDragging, setIsManualDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const currentCase = CASES.find((c) => c.id === activeCaseId) || CASES[0];

  // Smooth pointer drag control with Pointer Capture for instant, lag-free response
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsManualDragging(true);
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch (err) {
      // Fallback
    }
    updateSliderFromEvent(e);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isManualDragging || e.buttons === 1) {
      updateSliderFromEvent(e);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsManualDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (err) {
      // Fallback
    }
  };

  const updateSliderFromEvent = (e: React.PointerEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.min(99, Math.max(1, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <section
      id="before-after"
      ref={containerRef}
      className="py-24 sm:py-32 lg:py-36 bg-[#F2F0EC] text-[#1A1A1A] relative overflow-hidden border-t border-[#1A1A1A]/10"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#5A5A40]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 max-w-3xl text-center mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#5A5A40] font-bold block mb-3 font-mono">
            Clinical Photography Audits
          </span>
          <EditorialHeading
            plainText="Interactive Ceramic"
            italicAccent="Transformation Gallery"
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1A1A1A]"
            accentColorClass="text-[#5A5A40]"
            preset="blur"
          />
          <p className="text-xs sm:text-sm text-[#1A1A1A]/70 mt-4 leading-relaxed font-light max-w-xl mx-auto">
            Drag the comparison slider to inspect 20x microscopic light reflection, internal mamelon artistry, and tissue harmony.
          </p>

          {/* Case Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {CASES.map((c) => {
              const isActive = c.id === activeCaseId;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveCaseId(c.id);
                    setSliderPosition(50);
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 border ${
                    isActive
                      ? 'bg-[#121417] text-white border-[#121417] font-bold shadow-md'
                      : 'bg-white text-[#1A1A1A]/70 border-[#1A1A1A]/15 hover:border-[#1A1A1A]/40 hover:text-[#1A1A1A]'
                  }`}
                >
                  {c.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* The Interactive Centerpiece & Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          
          {/* Main Slider Display Frame (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div
              ref={sliderRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerEnter={() => setIsHovering(true)}
              onPointerLeave={() => {
                setIsHovering(false);
                setIsManualDragging(false);
              }}
              className={`relative h-[340px] sm:h-[480px] md:h-[540px] w-full select-none overflow-hidden rounded-3xl border border-[#1A1A1A]/15 shadow-2xl cursor-ew-resize touch-none bg-black transition-all ${
                isZoomed ? 'scale-105 z-30 ring-2 ring-[#5A5A40]' : ''
              }`}
            >
              {/* AFTER Image (Full background) */}
              <img
                key={`after-${activeCaseId}`}
                src={currentCase.afterImg}
                alt={`${currentCase.title} After`}
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none filter contrast-105 transition-opacity duration-300"
              />

              {/* Badge AFTER (Fixed Top Right) */}
              <div className="absolute top-6 right-6 z-10 bg-black/80 backdrop-blur-md px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-white border border-white/20 rounded-full shadow-lg flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>AFTER • CERAMIC ATELIER</span>
              </div>

              {/* BEFORE Image (Clipped overlay using hardware-accelerated clip-path) */}
              <img
                key={`before-${activeCaseId}`}
                src={currentCase.beforeImg}
                alt={`${currentCase.title} Before`}
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none filter contrast-105 transition-opacity duration-300"
                style={{
                  clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                  WebkitClipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                }}
              />

              {/* Badge BEFORE (Fixed Top Left - aligned at same level top-6) */}
              <div className="absolute top-6 left-6 z-10 bg-black/80 backdrop-blur-md px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-white border border-white/20 rounded-full shadow-lg flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                <span>BEFORE • INITIAL STATE</span>
              </div>

              {/* Animated Top Tracking Pill Label attached to slider handle line */}
              <div
                className="absolute top-5 z-20 pointer-events-none -translate-x-1/2 transition-all duration-75"
                style={{ left: `${sliderPosition}%` }}
              >
                <motion.div
                  initial={{ opacity: 0.8 }}
                  animate={{
                    opacity: isHovering || isManualDragging ? 1 : 0.85,
                    scale: isManualDragging ? 1.08 : 1,
                    y: isManualDragging ? -2 : 0
                  }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#121417]/95 border border-white/30 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold text-white shadow-2xl flex items-center gap-2 whitespace-nowrap"
                >
                  <span className={`transition-colors ${sliderPosition > 15 ? 'text-white' : 'text-white/40'}`}>
                    BEFORE ({Math.round(sliderPosition)}%)
                  </span>
                  <span className="text-white/30">|</span>
                  <span className={`transition-colors ${sliderPosition < 85 ? 'text-emerald-400' : 'text-white/40'}`}>
                    AFTER ({100 - Math.round(sliderPosition)}%)
                  </span>
                </motion.div>
              </div>

              {/* Divider Line & Drag Handle */}
              <div
                className="absolute inset-y-0 z-20 w-0.5 bg-white pointer-events-none shadow-[0_0_20px_rgba(255,255,255,0.9)]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center">
                  
                  {/* Dynamic BEFORE handle-flanking label */}
                  <motion.div
                    animate={{
                      opacity: sliderPosition > 8 ? (isHovering || isManualDragging ? 1 : 0.8) : 0,
                      x: isManualDragging ? -8 : 0,
                      scale: isManualDragging ? 1.08 : 1
                    }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-7 whitespace-nowrap bg-black/90 text-white px-2.5 py-1 rounded-md border border-white/20 text-[10px] font-mono font-bold tracking-wider shadow-xl flex items-center gap-1.5 pointer-events-none"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-300 animate-pulse" />
                    <span>BEFORE</span>
                  </motion.div>

                  {/* Center Handle Knob */}
                  <motion.div
                    animate={{
                      scale: isManualDragging ? 1.18 : isHovering ? 1.08 : 1,
                      boxShadow: isManualDragging
                        ? '0 0 25px rgba(255,255,255,0.8)'
                        : '0 10px 25px rgba(0,0,0,0.5)'
                    }}
                    transition={{ duration: 0.15 }}
                    className="flex h-12 w-12 items-center justify-center bg-white text-[#0E0F12] rounded-full border-2 border-[#121417] z-10 shadow-2xl"
                  >
                    <MoveHorizontal className="h-5 w-5 text-[#0E0F12]" />
                  </motion.div>

                  {/* Dynamic AFTER handle-flanking label */}
                  <motion.div
                    animate={{
                      opacity: sliderPosition < 92 ? (isHovering || isManualDragging ? 1 : 0.8) : 0,
                      x: isManualDragging ? 8 : 0,
                      scale: isManualDragging ? 1.08 : 1
                    }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-7 whitespace-nowrap bg-black/90 text-white px-2.5 py-1 rounded-md border border-white/20 text-[10px] font-mono font-bold tracking-wider shadow-xl flex items-center gap-1.5 pointer-events-none"
                  >
                    <span>AFTER</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </motion.div>

                </div>
              </div>

              {/* Bottom Tracking Label showing Shade Transformation */}
              <div
                className="absolute bottom-5 z-20 pointer-events-none -translate-x-1/2 transition-all duration-75"
                style={{ left: `${sliderPosition}%` }}
              >
                <motion.div
                  initial={{ opacity: 0.8 }}
                  animate={{
                    opacity: isHovering || isManualDragging ? 1 : 0.85,
                    y: isManualDragging ? -2 : 0,
                    scale: isManualDragging ? 1.05 : 1
                  }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#121417]/95 border border-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-mono font-bold text-white shadow-xl flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Sparkles className="w-3 h-3 text-white" />
                  <span>{currentCase.shadeShift}</span>
                </motion.div>
              </div>

            </div>

            {/* Slider Toolbar Footnote */}
            <div className="flex items-center justify-between text-xs font-mono text-[#1A1A1A]/70 px-2">
              <span className="uppercase tracking-wider text-[10px] flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#5A5A40]" />
                Drag horizontal line to compare micro-texturing
              </span>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="inline-flex items-center gap-1.5 text-[#1A1A1A] hover:text-[#5A5A40] text-[11px] font-bold uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-[#1A1A1A]/15 shadow-xs transition-colors"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                  {isZoomed ? 'Reset View' : '20x HD Zoom'}
                </button>
                <span className="text-[#5A5A40] font-bold">Split: {Math.round(sliderPosition)}%</span>
              </div>
            </div>
          </div>

          {/* Biological Case Specs Card (4 Cols) */}
          <div className="lg:col-span-4 bg-white border border-[#1A1A1A]/12 rounded-3xl p-8 space-y-6 text-[#1A1A1A] shadow-lg flex flex-col justify-between min-h-[480px]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]/10">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#5A5A40] font-bold">
                  Clinical Case Audit
                </span>
                <span className="text-xs font-mono text-[#1A1A1A]/50">
                  {currentCase.id.toUpperCase()}
                </span>
              </div>

              <h3 className="font-serif text-3xl font-normal text-[#1A1A1A] mt-4 tracking-tight">
                {currentCase.title}
              </h3>
              <p className="text-xs text-[#1A1A1A]/60 font-mono mt-1">
                {currentCase.subtitle}
              </p>

              <p className="text-xs text-[#1A1A1A]/80 font-light leading-relaxed mt-4 pt-4 border-t border-[#1A1A1A]/8">
                {currentCase.description}
              </p>

              {/* Biological Specs Grid */}
              <div className="space-y-3 pt-6 font-mono text-xs">
                <div className="flex items-center justify-between p-2.5 bg-[#F9F8F6] rounded-xl border border-[#1A1A1A]/10">
                  <span className="text-[#1A1A1A]/60 uppercase tracking-wider text-[10px]">Shade Shift</span>
                  <span className="text-[#1A1A1A] font-bold">{currentCase.shadeShift}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-[#F9F8F6] rounded-xl border border-[#1A1A1A]/10">
                  <span className="text-[#1A1A1A]/60 uppercase tracking-wider text-[10px]">Enamel Reduction</span>
                  <span className="text-[#1A1A1A] font-bold">{currentCase.prepDepth}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-[#F9F8F6] rounded-xl border border-[#1A1A1A]/10">
                  <span className="text-[#1A1A1A]/60 uppercase tracking-wider text-[10px]">Atelier Duration</span>
                  <span className="text-[#1A1A1A] font-bold">{currentCase.duration}</span>
                </div>
              </div>

              {/* Checklist highlights */}
              <div className="pt-6 space-y-2">
                {currentCase.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#1A1A1A]/80 font-light">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#5A5A40] shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#1A1A1A]/10">
              <a
                href="#booking"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#121417] text-white hover:bg-[#5A5A40] py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all font-sans shadow-md"
              >
                <span>Request Custom Smile Mockup</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

