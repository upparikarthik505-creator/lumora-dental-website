import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, MapPin, Sparkles, Shield, Clock, Coffee, ShieldCheck, Check } from 'lucide-react';
import { EditorialHeading } from './EditorialHeading';
import { MagneticButton } from './MagneticButton';

interface StudioZone {
  id: string;
  name: string;
  subtitle: string;
  desc: string;
  imgUrl: string;
  amenities: string[];
  hotspots: {
    x: number; // percentage
    y: number;
    label: string;
    detail: string;
  }[];
}

const ZONES: StudioZone[] = [
  {
    id: 'aventura-suite',
    name: 'Aventura Flagship VIP Suite',
    subtitle: 'Private Sky-View Diagnostic Suite',
    desc: 'Featuring floor-to-ceiling glass overlooking Biscayne Bay, ultra-silent quiet-drive dental handpieces, and ceiling-mounted 4K cinematic entertainment displays.',
    imgUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200',
    amenities: ['Custom Spatial Audio', 'Aromatherapy Diffusers', 'Private Elevator Entry'],
    hotspots: [
      { x: 30, y: 40, label: 'Quiet-Drive Handpiece', detail: 'Vibration-free whisper technology reducing acoustic anxiety by 90%.' },
      { x: 70, y: 35, label: '4K Ceiling Display', detail: 'Immersive entertainment during restorative cementation appointments.' },
      { x: 50, y: 75, label: 'Ergonomic Italian Leather Chair', detail: 'Multi-zone memory foam cushioning designed for total relaxation.' },
    ],
  },
  {
    id: 'ceramist-lab',
    name: 'Master Ceramist Atelier',
    subtitle: 'In-House Feldspathic Porcelain Studio',
    desc: 'Where certified master ceramists hand-stack microscopic porcelain layers under 20x magnification, firing custom shades in vacuum kilns.',
    imgUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200',
    amenities: ['20x Zeiss Loupe Magnification', 'Ivoclar Vacuum Kilns', 'Spectrophotometer Shade Match'],
    hotspots: [
      { x: 25, y: 45, label: 'Zeiss Optical Loupes', detail: 'Allows 0.01mm edge adaptation for zero micro-gap margins.' },
      { x: 65, y: 50, label: 'Ivoclar Porcelain Furnace', detail: 'Fires feldspathic ceramic at 920°C for crystal optical clarity.' },
    ],
  },
  {
    id: 'lounge',
    name: 'Concierge Recovery & Nespresso Lounge',
    subtitle: 'Private Post-Treatment Reflection Sanctuary',
    desc: 'Relax post-appointment with artisan espresso, cold-pressed juices, and private consultation nooks before stepping out into Miami Beach.',
    imgUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=1200',
    amenities: ['Organic Cold-Pressed Juices', 'Valet Pickup Service', 'Warm Lavender Towels'],
    hotspots: [
      { x: 40, y: 50, label: 'VIP Reflection Nook', detail: 'Private space to inspect your new smile in natural Miami studio lighting.' },
      { x: 80, y: 60, label: 'Espresso Bar', detail: 'Complimentary single-origin coffee and organic refreshments.' },
    ],
  },
];

export const VirtualAtelierTour: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const [activeZone, setActiveZone] = useState<StudioZone>(ZONES[0]);
  const [activeHotspot, setActiveHotspot] = useState<typeof ZONES[0]['hotspots'][0] | null>(ZONES[0].hotspots[0]);

  return (
    <section id="virtual-tour" className="py-28 sm:py-36 lg:py-40 bg-[#121212] text-[#F9F8F6] border-t border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-[#5A5A40]/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#5A5A40] font-bold block mb-3">
              360° Studio Atmosphere
            </span>
            <EditorialHeading
              plainText="Virtual Atelier Tour &"
              italicAccent="VIP Suite Experience"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white"
              accentColorClass="text-[#8C8C6B]"
              preset="elastic"
            />
          </div>

          <p className="text-sm sm:text-base text-white/70 max-w-md leading-relaxed font-light">
            Explore our state-of-the-art Aventura flagship sanctuary. Click interactive hotspots to preview our high-precision equipment and private recovery amenities.
          </p>
        </div>

        {/* Zone Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 font-mono text-xs uppercase tracking-wider">
          {ZONES.map((zone) => {
            const isActive = activeZone.id === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => {
                  setActiveZone(zone);
                  setActiveHotspot(zone.hotspots[0]);
                }}
                className={`px-5 py-3 border transition-all ${
                  isActive
                    ? 'bg-white text-[#1A1A1A] border-white font-bold shadow-lg'
                    : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30'
                }`}
              >
                {zone.name}
              </button>
            );
          })}
        </div>

        {/* Main Tour Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#1A1A1A] border border-white/10 p-2 sm:p-4 shadow-2xl overflow-hidden">
          
          {/* Interactive Image with Hotspot Overlay */}
          <div className="lg:col-span-8 relative aspect-[16/10] bg-black overflow-hidden border border-white/10 group">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeZone.id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={activeZone.imgUrl}
                alt={activeZone.name}
                className="w-full h-full object-cover filter brightness-95"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Hotspot Pins */}
            {activeZone.hotspots.map((hs, i) => {
              const isSelected = activeHotspot?.label === hs.label;
              return (
                <button
                  key={i}
                  onClick={() => setActiveHotspot(hs)}
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group/pin focus:outline-none z-20"
                >
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                        isSelected ? 'bg-[#5A5A40] opacity-80' : 'bg-white opacity-40'
                      }`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-3.5 w-3.5 border border-black ${
                        isSelected ? 'bg-[#5A5A40]' : 'bg-white'
                      }`}
                    />
                  </span>
                  
                  {/* Floating Tag */}
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-black/90 text-white text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 border border-white/20 whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none">
                    {hs.label}
                  </span>
                </button>
              );
            })}

            {/* Zone Tag Overlay */}
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#5A5A40] font-bold border border-white/10">
              {activeZone.subtitle}
            </div>
          </div>

          {/* Hotspot Detail Panel */}
          <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-[#141414] border border-white/5 space-y-6">
            <div className="space-y-6">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#5A5A40] block mb-2 font-bold">
                  Active Feature Inspection
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl italic text-white">
                  {activeHotspot?.label || activeZone.name}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                {activeHotspot?.detail || activeZone.desc}
              </p>

              {/* Zone Amenities List */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block font-bold mb-2">
                  Suite Amenities
                </span>
                {activeZone.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-mono text-white/80">
                    <Check className="h-3.5 w-3.5 text-[#5A5A40] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6 border-t border-white/10">
              <button
                onClick={onOpenBooking}
                className="w-full bg-[#F9F8F6] hover:bg-[#5A5A40] text-[#1A1A1A] hover:text-white py-3 px-4 font-mono text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-lg"
              >
                Request Private Suite Booking
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
