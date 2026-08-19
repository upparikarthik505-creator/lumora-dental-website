import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Clock, ArrowUpRight, Navigation, X } from 'lucide-react';
import { EditorialHeading } from './EditorialHeading';
import { MagneticButton } from './MagneticButton';

interface StudioLocation {
  id: string;
  name: string;
  tagline: string;
  address: string;
  cityZip: string;
  phone: string;
  hours: string;
  image: string;
  mapCoordinates: { lat: number; lng: number };
}

const LOCATIONS: StudioLocation[] = [
  {
    id: 'aventura',
    name: 'Aventura Flagship',
    tagline: 'Flagship Studio',
    address: '18851 NE 29th Avenue, Suite 301',
    cityZip: 'Aventura, FL 33180',
    phone: '(305) 682-1414',
    hours: 'Mon – Thu: 8:30am–5pm | Fri: 8:30am–2pm',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    mapCoordinates: { lat: 25.952, lng: -80.138 }
  },
  {
    id: 'bay-harbor',
    name: 'Bay Harbor Islands',
    tagline: 'Private Atelier',
    address: '1031 Kane Concourse, Suite 201',
    cityZip: 'Bay Harbor Islands, FL 33154',
    phone: '(305) 864-1656',
    hours: 'Mon – Thu: 8:30am–5pm | Fri: By Appt',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    mapCoordinates: { lat: 25.888, lng: -80.133 }
  },
  {
    id: 'coral-gables',
    name: 'Coral Gables',
    tagline: 'Surgical & Implant Center',
    address: '6705 S Red Rd, Suite 614',
    cityZip: 'Coral Gables, FL 33143',
    phone: '(305) 668-1811',
    hours: 'Mon – Fri: 8:00am–5:30pm',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
    mapCoordinates: { lat: 25.708, lng: -80.285 }
  }
];

export const LocationsSection: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const [activeLocationId, setActiveLocationId] = useState<string>('aventura');
  const [selectedMapLocation, setSelectedMapLocation] = useState<StudioLocation | null>(null);

  const locationsData = [
    {
      id: 'aventura',
      name: 'Aventura',
      tagline: 'Flagship Studio',
      address: '18851 NE 29th Avenue Suite 301, Aventura, FL 33180',
      phone: '(305) 682-14-14',
      hoursMonThur: '8:30 am – 5:00 pm',
      hoursFri: '8:30 am – 2:00 pm',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: 'bay-harbor',
      name: 'Bay Harbor',
      tagline: 'Private Atelier',
      address: '1031 Kane Concourse, Bay Harbor Islands, FL 33154',
      phone: '(305) 864-16-56',
      hoursMonThur: '8:30 am – 5:00 pm',
      hoursFri: 'By Appointment Only',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: 'coral-gables',
      name: 'Coral Gables',
      tagline: 'Surgical & Implant Center',
      address: '6705 S Red Rd Suite 614, Coral Gables, FL 33143',
      phone: '(305) 668-18-11',
      hoursMonThur: '8:00 am – 5:30 pm',
      hoursFri: '8:00 am – 3:00 pm',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
    }
  ];

  return (
    <section id="locations" className="py-28 sm:py-36 lg:py-40 bg-[#EAE8E3] border-t border-[#1A1A1A]/10 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#5A5A40]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#5A5A40] font-bold block mb-2 font-mono">
              South Florida Private Ateliers
            </span>
            <EditorialHeading
              plainText="Our South Florida"
              italicAccent="Ateliers"
              className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#1A1A1A]"
              accentColorClass="text-[#5A5A40]"
              preset="shimmer"
            />
          </div>
          <p className="text-xs sm:text-sm text-[#1A1A1A]/70 max-w-sm font-light">
            Click on any atelier column to inspect operating hours, phone lines, and direct map navigation.
          </p>
        </div>

        {/* 3 Vertical Columns Layout (Exact Match to Reference Image 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-white p-2 rounded-3xl border border-[#1A1A1A]/10 shadow-2xl overflow-hidden min-h-[640px]">
          {locationsData.map((loc) => {
            const isActive = loc.id === activeLocationId;
            return (
              <motion.div
                key={loc.id}
                onClick={() => setActiveLocationId(loc.id)}
                layout
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 flex flex-col justify-between p-8 ${
                  isActive
                    ? 'bg-[#121417] text-white shadow-xl min-h-[580px]'
                    : 'bg-[#F2F0EC] text-[#1A1A1A] hover:bg-[#EAE8E2] min-h-[500px]'
                }`}
              >
                {/* Top Section */}
                <div className="space-y-6 text-center">
                  <h3 className={`font-serif tracking-tight transition-all ${
                    isActive ? 'text-5xl sm:text-6xl text-white font-normal' : 'text-3xl sm:text-4xl text-[#1A1A1A] font-light'
                  }`}>
                    {loc.name}
                  </h3>

                  <div className="space-y-2 max-w-xs mx-auto">
                    <p className={`text-xs font-mono leading-relaxed ${isActive ? 'text-white/70' : 'text-[#1A1A1A]/60'}`}>
                      {loc.address}
                    </p>
                    <p className={`font-serif text-2xl tracking-wide ${isActive ? 'text-white' : 'text-[#1A1A1A]'}`}>
                      {loc.phone}
                    </p>
                  </div>
                </div>

                {/* Bottom Section with High Res Image + Map Pill (Active) or Small Thumbnail (Inactive) */}
                <div className="mt-8 pt-6 border-t border-current/10 space-y-6">
                  {isActive ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      {/* High-res Aerial/Architecture Image */}
                      <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/10 shadow-lg">
                        <img
                          src={loc.image}
                          alt={loc.name}
                          className="w-full h-full object-cover filter contrast-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                      </div>

                      {/* Hours & Map Pill Button */}
                      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-white/80">
                        <div className="space-y-1">
                          <div>
                            <span className="text-white/40 block text-[9px] uppercase font-bold">Mo-Th</span>
                            <span className="font-semibold">{loc.hoursMonThur}</span>
                          </div>
                          <div>
                            <span className="text-white/40 block text-[9px] uppercase font-bold">Friday</span>
                            <span className="font-semibold">{loc.hoursFri}</span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`, '_blank');
                          }}
                          className="inline-flex items-center gap-2 bg-white text-[#121417] hover:bg-[#5A5A40] hover:text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all font-sans"
                        >
                          <span>View On Map</span>
                          <span className="text-sm font-bold">+</span>
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex justify-center pt-4">
                      {/* Small Square Picture Thumbnail (Like Image 3) */}
                      <div className="w-24 h-24 rounded-xl overflow-hidden border border-[#1A1A1A]/10 shadow-xs">
                        <img
                          src={loc.image}
                          alt={loc.name}
                          className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Booking Strip */}
        <div className="mt-8 bg-[#121417] text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#5A5A40] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-white/80">
              Immediate Concierge Booking Across All 3 Ateliers
            </span>
          </div>

          <button
            onClick={onOpenBooking}
            className="bg-white text-[#121417] hover:bg-[#5A5A40] hover:text-white px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-colors font-sans"
          >
            Reserve Private Appointment +
          </button>
        </div>

      </div>
    </section>
  );
};
