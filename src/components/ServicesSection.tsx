import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data/clinicData';
import { ServiceItem } from '../types';
import { ArrowUpRight, Sparkles, ShieldCheck, Zap, HeartPulse, X, CheckCircle2, Eye, Box, Clock, Shield } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { EditorialHeading } from './EditorialHeading';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

const SERVICE_IMAGES: Record<string, string> = {
  veneers: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200',
  implants: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=1200',
  whitening: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=1200',
  restorative: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1200',
  preventive: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200'
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (id: string) => {
    switch (id) {
      case 'veneers':
        return <Sparkles className="h-5 w-5 text-white" />;
      case 'implants':
        return <ShieldCheck className="h-5 w-5 text-white" />;
      case 'whitening':
        return <Zap className="h-5 w-5 text-white" />;
      case 'restorative':
        return <Box className="h-5 w-5 text-white" />;
      default:
        return <HeartPulse className="h-5 w-5 text-white" />;
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 lg:py-36 bg-[#F9F8F6] border-t border-[#1A1A1A]/10 relative overflow-hidden">
      {/* Background Ambient Light */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-[#5A5A40]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 text-[10px] font-mono uppercase tracking-[0.25em] text-[#5A5A40] font-bold mb-4">
            <Sparkles className="w-3 h-3 text-[#5A5A40]" />
            Clinical Disciplines & 3D Atelier
          </div>
          <EditorialHeading
            plainText="Parallel Masterclass in"
            italicAccent="Esthetic Dentistry"
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1A1A1A]"
            preset="elastic"
          />
          <p className="text-sm sm:text-base text-[#1A1A1A]/70 mt-4 max-w-2xl mx-auto leading-relaxed font-normal">
            Every restoration is crafted in our internal 3D ceramic studio using biomimetic principles, micro-thin enamel preservation, and Swiss feldspathic porcelain.
          </p>
        </div>

        {/* Alternating Showcase Cards (Image Left -> Content Right, Image Right -> Content Left) */}
        <div className="space-y-16 sm:space-y-24">
          {SERVICES.map((service, index) => {
            const isEven = index % 2 === 0;
            const imageUrl = SERVICE_IMAGES[service.id] || SERVICE_IMAGES.preventive;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#121417] text-[#F9F8F6] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)] grid grid-cols-1 lg:grid-cols-12 items-center"
              >
                {/* Image Panel (Alternates Left and Right) */}
                <div
                  className={`lg:col-span-6 relative min-h-[360px] sm:min-h-[440px] lg:min-h-[480px] overflow-hidden group ${
                    isEven ? 'lg:order-first' : 'lg:order-last'
                  }`}
                >
                  <img
                    src={imageUrl}
                    alt={service.name}
                    className="absolute inset-0 w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121417] via-black/30 to-transparent pointer-events-none" />

                  {/* Top Left Badge */}
                  <div className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white">
                    {getIcon(service.id)}
                    <span>{service.category}</span>
                  </div>

                  {/* Bottom Image Overlay Spec */}
                  <div className="absolute bottom-6 left-6 right-6 z-10 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/15 flex items-center justify-between text-xs font-mono">
                    <span className="text-white/80">3D Precision fit within 15µm</span>
                    <span className="text-white font-bold">AACD Standard</span>
                  </div>
                </div>

                {/* Content Panel (Alternates Right and Left) */}
                <div
                  className={`lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-6 ${
                    isEven ? 'lg:order-last' : 'lg:order-first'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-stone-400 font-bold">
                        Discipline 0{index + 1}
                      </span>
                      <span className="text-[11px] font-mono text-[#121417] font-bold bg-white px-3 py-1 rounded-full border border-white/30 shadow-xs">
                        From {service.startingPrice}
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
                      {service.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                      {service.fullDesc}
                    </p>

                    {/* Feature Solutions List */}
                    <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                      {service.solutionsList?.slice(0, 4).map((sol, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-white/85 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                          <span className="truncate">{sol}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Row */}
                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-[11px] font-mono text-white/60">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-white" />
                        <span>{service.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedService(service)}
                        className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors border border-white/15"
                      >
                        Specs & Faq
                      </button>
                      <button
                        onClick={() => onSelectService(service.name)}
                        className="inline-flex items-center gap-2 bg-white hover:bg-stone-200 text-slate-950 px-5 py-2.5 rounded-full text-xs font-sans font-semibold transition-all shadow-md group"
                      >
                        <span>Book Care</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-[#1A1A1A]/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative z-10 w-full max-w-xl bg-[#F9F8F6] p-6 sm:p-8 border border-[#1A1A1A]/20 rounded-3xl shadow-2xl"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center bg-[#EAE8E4] text-[#1A1A1A] border border-[#1A1A1A]/10 hover:bg-[#1A1A1A] hover:text-white transition-colors rounded-full"
                aria-label="Close details"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center bg-[#1A1A1A] text-white rounded-xl">
                  {getIcon(selectedService.id)}
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#5A5A40] font-mono">
                    {selectedService.category}
                  </span>
                  <h3 className="font-editorial text-3xl italic font-normal text-[#1A1A1A]">
                    {selectedService.name}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-6 font-normal">
                {selectedService.fullDesc}
              </p>

              <div className="space-y-3 bg-[#F1EFE9] p-4 text-xs border border-[#1A1A1A]/10 mb-8 font-mono rounded-2xl">
                <div className="flex justify-between">
                  <span className="text-[#1A1A1A]/60 font-medium uppercase tracking-wider text-[10px]">Timeline & Visits:</span>
                  <span className="font-semibold text-[#1A1A1A]">{selectedService.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1A1A1A]/60 font-medium uppercase tracking-wider text-[10px]">Ideal For:</span>
                  <span className="font-semibold text-[#1A1A1A] text-right">{selectedService.idealFor}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#1A1A1A]/10">
                  <span className="text-[#1A1A1A]/60 font-medium uppercase tracking-wider text-[10px]">Starting Fee:</span>
                  <span className="font-bold text-[#1A1A1A]">{selectedService.startingPrice}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2.5 text-xs uppercase tracking-widest font-semibold text-[#1A1A1A]/80 hover:bg-[#EAE8E4] rounded-full"
                >
                  Close
                </button>
                <MagneticButton
                  onClick={() => {
                    const name = selectedService.name;
                    setSelectedService(null);
                    onSelectService(name);
                  }}
                >
                  Book Consultation
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

