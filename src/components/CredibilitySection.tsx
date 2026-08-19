import React from 'react';
import { motion } from 'motion/react';
import { CLINIC_INFO } from '../data/clinicData';
import { ShieldCheck } from 'lucide-react';
import { EditorialHeading } from './EditorialHeading';

export const CredibilitySection: React.FC = () => {
  return (
    <section className="py-20 bg-[#EAE8E3] text-[#1A1A1A] border-y border-[#1A1A1A]/10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#5A5A40] border border-[#1A1A1A]/15 rounded-full shadow-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-[#5A5A40]" />
            <span>Proven Track Record</span>
          </div>

          {/* Single Focused Credibility Headline */}
          <EditorialHeading
            plainText="1,200+ Porcelain Smile Restorations with a"
            italicAccent="99.4% 10-Year Clinical Ceramic Retention"
            afterText="Rate"
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight max-w-3xl mx-auto leading-snug text-[#1A1A1A]"
            accentColorClass="text-[#5A5A40] italic"
            preset="elastic"
          />

          <p className="text-xs sm:text-sm text-[#1A1A1A]/70 max-w-xl mx-auto font-normal">
            Documented through long-term clinical photographic audits and independent ceramic bio-mechanical strain testing.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
