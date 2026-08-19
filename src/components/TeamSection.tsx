import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDoctors, ExtendedDoctor, resolveDoctorImage } from '../data/doctorStore';
import { GraduationCap, Award, ArrowUpRight, CheckCircle, X, Sparkles } from 'lucide-react';
import { EditorialHeading } from './EditorialHeading';
import { MagneticButton } from './MagneticButton';

export const TeamSection: React.FC = () => {
  const { doctors } = useDoctors();
  const [selectedDoctor, setSelectedDoctor] = useState<ExtendedDoctor | null>(null);

  return (
    <section id="team" className="py-28 sm:py-36 lg:py-40 bg-[#0C0D0E] text-[#F9F8F6] border-t border-white/10 relative overflow-hidden">
      
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 pb-12 border-b border-white/10">
          <div className="lg:col-span-8">
            <EditorialHeading
              plainText="From experienced dentists to certified ceramists, every member of our team is committed to delivering the best results with"
              italicAccent="precision, artistry, and care."
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.12] tracking-tight"
              accentColorClass="text-stone-200"
              preset="character"
            />
          </div>

          <div className="lg:col-span-4 flex lg:justify-end items-center pt-2">
            <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
              <span className="text-4xl font-serif italic text-white font-normal">20+</span>
              <div className="text-[10px] uppercase font-mono tracking-widest text-white/70 leading-snug">
                Certified <br />Specialists
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedDoctor(doctor)}
              className="group bg-[#151719] border border-white/10 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-white/40 cursor-pointer hover:shadow-2xl relative min-h-[460px]"
            >
              <div>
                {/* Header Text Overlay */}
                <div className="p-6 pb-2">
                  <span className="text-[11px] font-mono text-white/80 font-semibold block text-center mb-1">
                    {doctor.role}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white text-center tracking-tight">
                    {doctor.name}
                  </h3>
                </div>

                {/* High Contrast Portrait Photo */}
                <div className="relative aspect-[3/4] overflow-hidden bg-black mt-2">
                  <img
                    src={resolveDoctorImage(doctor.image, doctor.id, doctor.name)}
                    alt={doctor.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center filter contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151719] via-transparent to-transparent opacity-80" />
                </div>
              </div>

              {/* Footer Location & Learn More Link */}
              <div className="p-6 pt-2 flex items-center justify-between text-xs font-mono text-white/70 border-t border-white/5">
                <span className="text-[11px] text-white/50">{doctor.locationPreference || 'Aventura'}</span>
                <span className="text-white group-hover:text-stone-300 underline underline-offset-4 font-semibold text-[11px] transition-colors">
                  Learn More
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Doctor Details Overlay Modal */}
      <AnimatePresence>
        {selectedDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1A1A1A] border border-white/20 p-6 sm:p-10 max-w-2xl w-full relative text-white shadow-2xl space-y-6 rounded-3xl"
            >
              <button
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-6">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-20 h-20 rounded-full object-cover border border-white/30 shrink-0"
                />
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-white/80 font-bold">
                    {selectedDoctor.role}
                  </span>
                  <h3 className="font-editorial text-3xl sm:text-4xl italic text-white">
                    {selectedDoctor.name}
                  </h3>
                  <p className="text-xs text-white/60 font-mono mt-1">
                    {selectedDoctor.education} • {selectedDoctor.experienceYears} Years Practice
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                {selectedDoctor.bio}
              </p>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-white/50 block mb-3 font-bold">
                  Clinical Specialties
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedDoctor.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="inline-flex items-center gap-1.5 bg-white/5 px-3 py-1.5 text-xs font-mono text-white border border-white/10 rounded-lg"
                    >
                      <Award className="h-3.5 w-3.5 text-white" />
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <MagneticButton onClick={() => setSelectedDoctor(null)}>
                  Close Credentials
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
