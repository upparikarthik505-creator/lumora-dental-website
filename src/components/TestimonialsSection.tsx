import React from 'react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data/clinicData';
import { Quote, Star, CheckCircle } from 'lucide-react';
import { EditorialHeading } from './EditorialHeading';

const PATIENT_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600'
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-28 sm:py-36 lg:py-40 bg-[#F9F8F6] border-t border-[#1A1A1A]/10 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#5A5A40]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#5A5A40] font-bold block mb-3 font-mono">
            Verified Outcomes
          </span>
          <EditorialHeading
            plainText="Reflections on"
            italicAccent="Patient Care"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1A1A1A]"
            preset="elastic"
          />
          <p className="text-base text-[#1A1A1A]/75 mt-3 leading-relaxed">
            Genuine experiences from individuals who entrusted Aventura Dental Arts with their restorative and cosmetic care.
          </p>
        </div>

        {/* 3 Reviews Shown At Once */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="bg-[#F1EFE9] p-8 border border-[#1A1A1A]/10 flex flex-col justify-between transition-all duration-300 hover:border-[#1A1A1A]/30 hover:shadow-lg relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1 text-[#5A5A40]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#5A5A40]" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider text-[#5A5A40] font-bold bg-[#EAE8E4] px-2 py-0.5 border border-[#1A1A1A]/10">
                    <CheckCircle className="h-3 w-3 text-[#5A5A40]" /> Verified Patient
                  </span>
                </div>

                <p className="font-serif text-base sm:text-lg text-[#1A1A1A] italic leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className={`pt-6 border-t border-[#1A1A1A]/10 flex items-center gap-4 ${
                index % 2 === 1 ? 'flex-row-reverse text-right' : 'flex-row text-left'
              }`}>
                <img
                  src={PATIENT_AVATARS[index % PATIENT_AVATARS.length]}
                  alt={item.patientName}
                  className="w-12 h-12 rounded-full object-cover border border-[#1A1A1A]/20 shrink-0"
                />
                <div>
                  <div className="font-semibold text-sm text-[#1A1A1A]">
                    {item.patientName}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-[#5A5A40] font-mono font-bold mt-0.5">
                    {item.treatment}
                  </div>
                  <div className="text-[11px] text-[#1A1A1A]/50 mt-0.5 font-medium font-mono">
                    {item.location} &bull; {item.year}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
