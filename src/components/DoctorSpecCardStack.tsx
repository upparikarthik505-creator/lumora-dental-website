import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ShieldCheck, Sparkles, Video, Calendar, ArrowUpRight, Star, ChevronRight, CheckCircle2 } from 'lucide-react';
import { EditorialHeading } from './EditorialHeading';
import { MagneticButton } from './MagneticButton';
import { soundFx } from '../lib/audioFX';
import { useDoctors, ExtendedDoctor, resolveDoctorImage } from '../data/doctorStore';

interface DoctorSpecCardStackProps {
  onOpenBookingWithDoctor?: (doctorName: string) => void;
}

export const DoctorSpecCardStack: React.FC<DoctorSpecCardStackProps> = ({
  onOpenBookingWithDoctor,
}) => {
  const { doctors } = useDoctors();
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');

  useEffect(() => {
    if (doctors.length > 0 && !doctors.some((d) => d.id === selectedDoctorId)) {
      setSelectedDoctorId(doctors[0].id);
    }
  }, [doctors, selectedDoctorId]);

  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId) || doctors[0] || null;
  const docIndex = selectedDoctor ? doctors.findIndex((d) => d.id === selectedDoctor.id) : 0;

  const handleSelectDoctor = (doc: ExtendedDoctor) => {
    soundFx.playClick();
    setSelectedDoctorId(doc.id);
  };

  if (!selectedDoctor) return null;

  return (
    <section id="doctors-atelier" className="py-24 sm:py-32 bg-[#F9F8F6] text-[#1A1A1A] relative overflow-hidden border-t border-[#1A1A1A]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 pb-8 border-b border-[#1A1A1A]/10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-[#1A1A1A]/10 px-3.5 py-1.5 rounded-full mb-4 shadow-xs">
              <Award className="h-3.5 w-3.5 text-[#5A5A40]" />
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#5A5A40] font-bold">
                Master Clinicians & Dentists
              </span>
            </div>

            <EditorialHeading
              plainText="AACD Accredited Doctors &"
              italicAccent="Hand-Fired Porcelain Artists"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1A1A1A]"
              accentColorClass="text-[#5A5A40]"
              preset="3d-flip"
            />
          </div>

          <p className="text-sm sm:text-base text-[#1A1A1A]/70 max-w-md leading-relaxed font-light">
            Every restoration is engineered in-house by our master ceramic artisans and accredited cosmetic dentists.
          </p>
        </div>

        {/* Doctor Selection Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {doctors.map((doc) => {
            const isSelected = selectedDoctor.id === doc.id;
            return (
              <button
                key={doc.id}
                onClick={() => handleSelectDoctor(doc)}
                className={`p-5 rounded-2xl text-left border transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#121417] text-white border-[#121417] shadow-lg scale-[1.01]'
                    : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={resolveDoctorImage(doc.image, doc.id, doc.name)}
                    alt={doc.name}
                    className="w-12 h-12 rounded-full object-cover border border-current/20 shrink-0"
                  />
                  <div className="truncate">
                    <div className="font-serif font-semibold text-base truncate">{doc.name}</div>
                    <div className={`text-xs truncate ${isSelected ? 'text-white/70' : 'text-[#1A1A1A]/60'}`}>
                      {doc.role}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Doctor Detailed Showcase Card */}
        <div className="bg-white border border-[#1A1A1A]/12 rounded-[2.5rem] grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-xl items-center">
          
          {/* Column A: Portrait & Badge (5 Cols) */}
          <div className={`lg:col-span-5 relative h-full min-h-[420px] bg-[#121417] text-white overflow-hidden group ${
            docIndex % 2 === 1 ? 'lg:order-last' : 'lg:order-first'
          }`}>
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedDoctor.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                src={resolveDoctorImage(selectedDoctor.image, selectedDoctor.id, selectedDoctor.name)}
                alt={selectedDoctor.name}
                className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-8">
              <div className="font-mono text-[10px] text-[#8C8C6B] uppercase font-bold tracking-widest mb-1">
                {selectedDoctor.experienceYears || (selectedDoctor as any).yearsExperience || 10} Years Clinical Excellence
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                {selectedDoctor.name}
              </h3>
              <p className="text-xs text-white/70 font-light mt-1">
                {selectedDoctor.casesCompleted || '1,000+ Porcelain Transformations'}
              </p>
            </div>
          </div>

          {/* Right Column: Bio, Credentials & Signature Technique (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-12 space-y-6 bg-[#F2F0EC] text-[#1A1A1A]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDoctor.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#5A5A40] font-bold block mb-1">
                    Specialist Profile
                  </span>
                  <h4 className="font-serif text-xl font-semibold text-[#1A1A1A]">
                    {selectedDoctor.role}
                  </h4>
                  <p className="text-sm text-[#1A1A1A]/80 leading-relaxed font-light mt-2">
                    {selectedDoctor.bio}
                  </p>
                </div>

                {/* Accreditations */}
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#1A1A1A]/60 font-semibold block mb-2.5">
                    Accreditations & Board Certifications
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(selectedDoctor.credentials || selectedDoctor.specialties || ['AACD Accredited Specialist']).map((cred, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-[#1A1A1A]/10 text-xs font-sans font-medium text-[#1A1A1A] shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#5A5A40]" />
                        <span>{cred}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Signature Technique */}
                <div className="p-4 rounded-xl bg-white border border-[#1A1A1A]/10 space-y-1 shadow-xs">
                  <span className="text-[10px] font-sans uppercase tracking-wider text-[#5A5A40] font-semibold block">
                    Signature Clinical Specialty
                  </span>
                  <div className="font-serif text-base sm:text-lg font-medium text-[#1A1A1A]">
                    {selectedDoctor.signatureTechnique}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CTA */}
            <div className="pt-6 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="text-xs font-mono text-[#1A1A1A]/70">
                <span className="block font-bold text-[#1A1A1A] uppercase text-[10px]">In-Person & Virtual</span>
                Direct Consultation Available
              </div>

              <MagneticButton
                onClick={() => {
                  soundFx.playClick();
                  onOpenBookingWithDoctor?.(`Consultation with ${selectedDoctor.name}`);
                }}
                className="bg-[#121417] text-white hover:bg-[#5A5A40] px-6 py-3.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2"
              >
                <span>Book Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
