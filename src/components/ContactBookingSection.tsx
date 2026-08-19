import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CLINIC_INFO, SERVICES } from '../data/clinicData';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Navigation } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { EditorialHeading } from './EditorialHeading';

export const ContactBookingSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [treatment, setTreatment] = useState(SERVICES[0].name);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 sm:py-36 lg:py-40 bg-[#F9F8F6] border-t border-[#1A1A1A]/10 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#5A5A40]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Clinic Contact Info & Location Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#5A5A40] font-bold block mb-2">
                Studio Location
              </span>
              <EditorialHeading
                plainText="Visit Aventura"
                italicAccent="Dental Arts"
                className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1A1A]"
                accentColorClass="text-[#5A5A40]"
                preset="3d-flip"
              />
              <p className="text-sm sm:text-base text-[#1A1A1A]/75 mt-3 leading-relaxed">
                Located in Aventura, FL, our sanctuary is designed for privacy, warmth, and unhurried consultation.
              </p>
            </div>

            {/* Address & Hours Cards */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-[#F1EFE9] p-5 border border-[#1A1A1A]/10">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#1A1A1A] text-[#F9F8F6]">
                  <MapPin className="h-4 w-4 text-[#5A5A40]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Address</h3>
                  <p className="text-xs text-[#1A1A1A]/80 mt-1 leading-relaxed">
                    {CLINIC_INFO.address}
                  </p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(CLINIC_INFO.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-[#1A1A1A] underline mt-1.5 hover:text-[#5A5A40] transition-colors"
                  >
                    <span>Get Live Directions on Google Maps</span>
                    <Navigation className="w-3 h-3 text-[#5A5A40]" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-[#F1EFE9] p-5 border border-[#1A1A1A]/10">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#1A1A1A] text-[#F9F8F6]">
                  <Phone className="h-4 w-4 text-[#5A5A40]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Direct Line & Email</h3>
                  <a href={`tel:${CLINIC_INFO.phone}`} className="text-xs text-[#1A1A1A] hover:text-[#5A5A40] font-bold mt-1 block">
                    {CLINIC_INFO.phone}
                  </a>
                  <a href={`mailto:${CLINIC_INFO.email}`} className="text-xs text-[#1A1A1A]/80 font-medium hover:underline">
                    {CLINIC_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-[#F1EFE9] p-5 border border-[#1A1A1A]/10">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#1A1A1A] text-[#F9F8F6]">
                  <Clock className="h-4 w-4 text-[#5A5A40]" />
                </div>
                <div className="w-full">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">Studio Hours</h3>
                  <div className="space-y-1 text-xs text-[#1A1A1A]/80">
                    {CLINIC_INFO.hours.map((h) => (
                      <div key={h.days} className="flex justify-between">
                        <span>{h.days}:</span>
                        <span className="font-semibold text-[#1A1A1A]">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Interactive Google Maps Location Card */}
            <div className="overflow-hidden border border-[#1A1A1A]/15 bg-white rounded-2xl shadow-lg relative">
              <div className="p-3 bg-[#121417] text-white flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-white" />
                  <span className="font-bold text-white text-[11px]">Live Google Maps Location</span>
                </div>
                <span className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded border border-white/20 font-semibold">
                  Valet Parking
                </span>
              </div>

              <div className="h-56 w-full relative">
                <iframe
                  title="Aventura Dental Arts Live Google Map"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(CLINIC_INFO.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0 filter contrast-105"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              <div className="p-3 bg-[#F1EFE9] border-t border-[#1A1A1A]/10 flex items-center justify-between gap-2 text-xs font-mono">
                <span className="text-[#1A1A1A]/70 text-[10px] truncate max-w-[200px] sm:max-w-xs">
                  {CLINIC_INFO.address}
                </span>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(CLINIC_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#121417] text-white hover:bg-[#5A5A40] rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1"
                >
                  <span>Open Maps</span>
                  <Navigation className="w-3 h-3 text-white" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Consultation Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-[#F1EFE9] p-6 sm:p-10 border border-[#1A1A1A]/10 shadow-xs"
          >
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center bg-[#1A1A1A] text-[#F9F8F6]">
                  <CheckCircle2 className="h-8 w-8 text-[#5A5A40]" />
                </div>
                <h3 className="font-serif text-3xl font-medium text-[#1A1A1A]">
                  Request Received
                </h3>
                <p className="text-sm text-[#1A1A1A]/80 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-[#1A1A1A]">{fullName}</span>. Our concierge team will reach out via phone or email within two business hours to finalize your visit.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="inline-block text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] underline pt-2"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#5A5A40]">
                  Direct Inquiry
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1A1A] mt-1 mb-2">
                  Request a Consultation
                </h3>
                <p className="text-xs sm:text-sm text-[#1A1A1A]/70 mb-8">
                  Fill out your details below and our concierge team will respond promptly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A]/80 mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Eleanor Vance"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full border border-[#1A1A1A]/15 bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:border-[#1A1A1A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A]/80 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(305) 555-0192"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border border-[#1A1A1A]/15 bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:border-[#1A1A1A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A]/80 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="eleanor@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-[#1A1A1A]/15 bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:border-[#1A1A1A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A]/80 mb-1.5">
                        Treatment Interest
                      </label>
                      <select
                        value={treatment}
                        onChange={(e) => setTreatment(e.target.value)}
                        className="w-full border border-[#1A1A1A]/15 bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A]/80 mb-1.5">
                      How can we best assist you?
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share any questions about porcelain veneers, dental implants, or scheduling..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full border border-[#1A1A1A]/15 bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:border-[#1A1A1A] focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <MagneticButton type="submit">
                      Book Consultation
                    </MagneticButton>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
