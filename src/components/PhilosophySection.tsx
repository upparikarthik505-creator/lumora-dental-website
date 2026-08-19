import React from 'react';
import { motion } from 'motion/react';
import { EditorialHeading } from './EditorialHeading';
import { Sparkles, ShieldCheck, HeartHandshake, Eye, Award } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  return (
    <section className="py-28 sm:py-36 lg:py-40 bg-[#F9F8F6] relative overflow-hidden border-b border-[#1A1A1A]/10">
      {/* Background Subtle Glowing Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-black/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Subhead */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="inline-flex items-center gap-2 text-[10px] uppercase font-mono tracking-[0.3em] text-slate-700 font-bold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-900" />
            <span>The Atelier Narrative</span>
          </motion.div>

          <EditorialHeading
            plainText="Why Ordinary Dentistry Fails To Capture"
            italicAccent="Natural Ceramic Artistry"
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-medium text-[#1A1A1A] leading-[1.06] tracking-tight"
            preset="elastic"
          />

          <p className="mt-8 text-base sm:text-lg text-[#1A1A1A]/70 font-light leading-relaxed">
            Most clinical offices treat smiles as standardized volume. At Aventura Dental Arts, we view each tooth as an individual biological canvas—hand-layering micro-translucent porcelain to match your exact facial geometry.
          </p>
        </div>

        {/* Storytelling Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Traditional Clinic Box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="p-8 sm:p-12 rounded-3xl bg-white/60 border border-[#1A1A1A]/10 backdrop-blur-md flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-500"
          >
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#1A1A1A]/40 font-semibold block mb-4">
                01 • The Mass-Market Approach
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1A1A] mb-4">
                Ordinary Dental Clinics
              </h3>
              <p className="text-sm sm:text-base text-[#1A1A1A]/65 leading-relaxed font-light mb-8">
                Outsourced overseas labs, rushed 15-minute consultations, monochromatic artificial-looking crowns, and aggressive enamel reduction that permanently compromises natural tooth health.
              </p>
            </div>

            <ul className="space-y-3 pt-6 border-t border-[#1A1A1A]/10 text-xs sm:text-sm font-mono text-[#1A1A1A]/60">
              <li className="flex items-center gap-3 text-red-900/70">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                Generic monochromatic "chiclet" opaque white
              </li>
              <li className="flex items-center gap-3 text-red-900/70">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                Factory milled without hand-characterization
              </li>
              <li className="flex items-center gap-3 text-red-900/70">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                High risk of ceramic pop-off & tissue inflammation
              </li>
            </ul>
          </motion.div>

          {/* Atelier Private Studio Box */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="p-8 sm:p-12 rounded-3xl bg-[#121417] text-[#F9F8F6] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-white/10 transition-all duration-700" />

            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/80 font-bold block mb-4">
                02 • The Atelier Standard
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white mb-4">
                Aventura Dental Arts Private Atelier
              </h3>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed font-light mb-8">
                Master ceramist in-house collaboration, zero-stress unhurried 45-minute consultations, conservative micro-preparation preserving 90%+ natural enamel, and custom hand-sculpted feldspathic porcelain.
              </p>
            </div>

            <ul className="space-y-3 pt-6 border-t border-white/10 text-xs sm:text-sm font-mono text-white/80">
              <li className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-white" />
                Micro-layered optical translucency matching natural enamel
              </li>
              <li className="flex items-center gap-3">
                <Award className="w-4 h-4 text-white" />
                Facial golden-ratio geometry tailored to your eyes & lips
              </li>
              <li className="flex items-center gap-3">
                <Eye className="w-4 h-4 text-white" />
                99.4% 10-year clinical retention backed by photographic audits
              </li>
            </ul>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
