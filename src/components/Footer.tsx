import React, { useState } from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import {
  Sparkles,
  Calendar,
  ArrowUpRight,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Mail,
  ArrowUp,
  CheckCircle2,
  Award,
  ChevronRight,
  Navigation,
  Check,
  Compass,
  Building2,
  Layers,
  Cpu,
} from 'lucide-react';
import { soundFx } from '../lib/audioFX';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenBooking, onOpenAdmin }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleNavClick = (sectionId: string, isTab: boolean = false) => {
    soundFx.playClick();
    if (isTab) {
      setActiveTab(sectionId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 80);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    soundFx.playTone(880, 0.15);
    setIsSubscribed(true);
    setEmail('');
  };

  const handleCopyPhone = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(CLINIC_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080A0D] text-[#F9F8F6] border-t border-white/10 pt-20 pb-12 relative overflow-hidden font-sans select-none">
      {/* Ambient Radial Background Glows */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-white/[0.03] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none" />

      {/* Decorative Oversized Brand Watermark */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 font-serif text-[18vw] font-bold text-white/[0.015] leading-none pointer-events-none tracking-tighter whitespace-nowrap">
        AVENTURA
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* BRAND STATEMENT & HERO NEWSLETTER CARD */}
        <div className="bg-gradient-to-br from-[#1A1D24] via-[#14171E] to-[#0E1015] border border-white/15 rounded-3xl p-8 sm:p-12 mb-16 shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
          {/* Top highlight gradient line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          
          {/* Subtle Corner Glow */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-white/10 transition-all duration-700" />

          {/* Left Column: Brand Statement */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono uppercase tracking-[0.25em] text-white font-bold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              Bespoke Ceramic Atelier • Miami & Aventura
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal tracking-tight leading-tight">
              Crafting Natural <span className="font-editorial italic text-stone-200 lowercase font-normal">Smile Perfection</span>
            </h2>

            <p className="text-xs sm:text-sm text-white/75 max-w-xl leading-relaxed font-light">
              Experience South Florida's premier cosmetic dental atelier. Swiss feldspathic veneers, guided 3D digital implants, and conservative micro-thin enamel care.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-white/70">
              <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>Zero-Flex Zirconia</span>
              </span>
              <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>Micro-Thin Enamel Prep</span>
              </span>
              <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>Golden Ratio Phi 1.618</span>
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Consultation & VIP Journal */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 relative z-10">
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenBooking();
              }}
              className="w-full bg-white hover:bg-stone-200 text-slate-950 py-3.5 px-6 rounded-full text-xs font-sans font-semibold tracking-wide transition-all duration-300 shadow-xl flex items-center justify-center gap-2.5 group shrink-0"
            >
              <Calendar className="h-4 w-4 text-slate-950 transition-colors" />
              <span>Schedule Private Consultation</span>
              <ArrowUpRight className="h-4 w-4 opacity-80 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email for VIP Atelier Journal..."
                  className="w-full bg-white/5 border border-white/20 focus:border-white rounded-full py-3 pl-5 pr-14 text-xs text-white placeholder:text-white/40 focus:outline-none font-sans transition-colors shadow-inner"
                />
                <button
                  type="submit"
                  title="Subscribe to Atelier VIP Journal"
                  className="absolute right-1.5 p-2 bg-white text-slate-950 hover:bg-stone-200 rounded-full transition-all shadow-md font-bold group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
              </form>
            ) : (
              <div className="py-2.5 px-5 bg-white/10 border border-white/20 rounded-full text-white text-xs font-sans flex items-center gap-2.5 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>Subscribed to Atelier VIP Journal!</span>
              </div>
            )}

            <div className="text-[11px] font-sans text-white/50 text-center flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-white/70" />
              <span>Strict Patient Privacy • Zero Spam Policy</span>
            </div>
          </div>
        </div>

        {/* NAVIGATION DIRECTORY */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand Identity & Contact (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div
              onClick={() => handleNavClick('home', true)}
              className="flex items-center gap-3.5 cursor-pointer group focus:outline-none"
            >
              <div className="flex h-11 w-11 items-center justify-center bg-white text-slate-950 rounded-2xl transition-transform group-hover:scale-105 shadow-lg border border-white/40">
                <Sparkles className="h-5.5 w-5.5 text-slate-900" />
              </div>
              <div>
                <div className="text-2xl font-serif tracking-tight uppercase text-white font-medium">
                  Aventura <span className="font-editorial italic text-stone-200 lowercase font-normal">Dental Arts</span>
                </div>
                <div className="text-[10px] font-mono text-white/70 tracking-widest uppercase font-semibold">
                  Private Ceramic Atelier • Est. 2008
                </div>
              </div>
            </div>

            <p className="text-xs text-white/75 leading-relaxed max-w-sm font-light">
              {CLINIC_INFO.tagline} World-class cosmetic dentistry combining Swiss porcelain artistry, digital surgical planning, and biological care.
            </p>

            <div className="space-y-2.5 pt-1 text-xs text-white/85 font-mono">
              <div className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/10">
                <a href={`tel:${CLINIC_INFO.phone}`} className="flex items-center gap-2.5 text-white hover:text-stone-300 transition-colors font-bold">
                  <Phone className="h-4 w-4 shrink-0 text-white" />
                  <span>{CLINIC_INFO.phone}</span>
                </a>
                <button
                  onClick={handleCopyPhone}
                  className="text-[10px] px-2.5 py-1 bg-white/10 hover:bg-white hover:text-slate-950 rounded-lg transition-all text-white/80 font-bold"
                >
                  {copiedPhone ? <Check className="w-3 h-3 text-white inline" /> : 'Copy'}
                </button>
              </div>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(CLINIC_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-white/80 hover:text-white transition-colors group cursor-pointer bg-white/5 p-3 rounded-2xl border border-white/10"
              >
                <MapPin className="h-4 w-4 shrink-0 text-white mt-0.5 group-hover:scale-110 transition-transform" />
                <div className="flex-1">
                  <span className="block text-white font-semibold text-[11px] group-hover:text-stone-200 transition-colors">Flagship Atelier Address</span>
                  <span className="text-[11px] text-white/70 block">{CLINIC_INFO.address}</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-white shrink-0 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <div className="flex items-center gap-2 text-white font-mono text-[11px] bg-white/10 px-3.5 py-2 rounded-2xl border border-white/20">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="font-bold">Aventura Atelier • Open Today (8:00 AM – 6:00 PM)</span>
              </div>
            </div>

            {/* Accreditation Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              {['AACD Fellow', 'ADA Accredited', 'ICOI Diplomate', 'Swiss Ceramic Guild'].map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-stone-300 flex items-center gap-1.5 shadow-xs hover:border-white/40 transition-colors"
                >
                  <Award className="w-3 h-3 text-white" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Clinical Services (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-white flex items-center gap-2 border-b border-white/10 pb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>Treatments</span>
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-white/80 font-medium">
              {[
                { label: 'Micro-Thin Veneers', id: 'services' },
                { label: '3D Guided Implants', id: 'services' },
                { label: 'LED Laser Whitening', id: 'services' },
                { label: 'Biomimetic Care', id: 'services' },
                { label: 'Laser Gum Sculpting', id: 'services' },
                { label: 'Full Mouth Rehab', id: 'services' },
                { label: 'Treatment Estimator', id: 'pricing', isTab: true },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item.id, item.isTab)}
                    className="hover:text-stone-200 hover:translate-x-1 transition-all flex items-center gap-2 group text-left"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: 3D Interactive Suite & Labs (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-white flex items-center gap-2 border-b border-white/10 pb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>3D Studio Suite</span>
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-white/80 font-medium">
              {[
                { label: '3D Enamel Studio Hub', id: 'lab', isTab: true },
                { label: 'Porcelain Shade Matcher', id: 'lab', isTab: true },
                { label: 'Golden Ratio (Phi 1.618)', id: 'lab', isTab: true },
                { label: 'Clear Aligner 3D Movement', id: 'lab', isTab: true },
                { label: 'Porcelain Light Inspector', id: 'lab', isTab: true },
                { label: 'Tooth Layer Micro-Viewer', id: 'lab', isTab: true },
                { label: 'Enamel Thickness Comparator', id: 'lab', isTab: true },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item.id, item.isTab)}
                    className="hover:text-stone-200 hover:translate-x-1 transition-all flex items-center gap-2 group text-left"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Atelier Info & Navigation (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-white flex items-center gap-2 border-b border-white/10 pb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Atelier Navigation</span>
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-white/80 font-medium">
              {[
                { label: 'Master Doctors & Specialists', id: 'team', isTab: true },
                { label: '360° Virtual Atelier Tour', id: 'virtual-tour' },
                { label: 'Before & After Gallery', id: 'before-after' },
                { label: 'Patient Reviews & Stories', id: 'testimonials' },
                { label: 'Advanced Dental Tech', id: 'technology', isTab: true },
                { label: 'Ceramic FAQ & Comparison', id: 'faq-comparison' },
                { label: 'Florida Locations & Maps', id: 'locations', isTab: true },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item.id, item.isTab)}
                    className="hover:text-stone-200 hover:translate-x-1 transition-all flex items-center gap-2 group text-left"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* SOUTH FLORIDA LOCATIONS CARDS STRIP */}
        <div className="py-10 border-b border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
          
          {/* Card 1: Aventura Flagship */}
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(CLINIC_INFO.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#14171F]/90 hover:bg-[#1A1E27] p-6 rounded-3xl border border-white/15 hover:border-white/40 transition-all shadow-xl group cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-sm group-hover:text-stone-200 transition-colors font-serif">Aventura Flagship</span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold">Open Today</span>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed">18851 NE 29th Ave #301, Aventura, FL</p>
              <p className="text-[11px] text-white/90 font-semibold">Mon–Thu: 8:00am–6:00pm</p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-[10px] text-white/80">
              <span>Direct Hotline: (305) 682-1414</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold text-white">
                Directions <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>

          {/* Card 2: Bay Harbor Islands */}
          <a
            href="https://maps.google.com/?q=1031+Kane+Concourse+Bay+Harbor+Islands+FL+33154"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#14171F]/90 hover:bg-[#1A1E27] p-6 rounded-3xl border border-white/15 hover:border-white/40 transition-all shadow-xl group cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-sm group-hover:text-stone-200 transition-colors font-serif">Bay Harbor Islands</span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold">Open Today</span>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed">1031 Kane Concourse, Bay Harbor Islands, FL</p>
              <p className="text-[11px] text-white/90 font-semibold">Mon–Thu: 8:30am–5:00pm</p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-[10px] text-white/80">
              <span>Direct Hotline: (305) 682-1414</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold text-white">
                Directions <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>

          {/* Card 3: Coral Gables */}
          <a
            href="https://maps.google.com/?q=6705+S+Red+Rd+Suite+614+Coral+Gables+FL+33143"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#14171F]/90 hover:bg-[#1A1E27] p-6 rounded-3xl border border-white/15 hover:border-white/40 transition-all shadow-xl group cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-sm group-hover:text-stone-200 transition-colors font-serif">Coral Gables Surgical</span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold">Open Today</span>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed">6705 S Red Rd #614, Coral Gables, FL</p>
              <p className="text-[11px] text-white/90 font-semibold">Mon–Fri: 8:00am–5:30pm</p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-[10px] text-white/80">
              <span>Direct Hotline: (305) 682-1414</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold text-white">
                Directions <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>

        </div>

        {/* BOTTOM LEGAL, COORDINATES & BACK-TO-TOP */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between text-[11px] uppercase tracking-wider text-white/50 gap-4 font-mono">
          <div className="flex items-center gap-3">
            <span>&copy; {new Date().getFullYear()} Aventura Dental Arts. All rights reserved.</span>
            <span className="hidden lg:inline text-white/20">•</span>
            <span className="hidden lg:inline text-white/60">25.9501° N, 80.1384° W</span>
          </div>
          
          <div className="flex flex-wrap gap-4 sm:gap-6 items-center">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Notice</span>
            <span className="hover:text-white transition-colors cursor-pointer">HIPAA Compliance</span>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-[#8C8C6B] hover:text-white font-bold transition-colors cursor-pointer flex items-center gap-1 uppercase font-mono text-[11px]"
              >
                <span>Admin Portal & DB</span>
              </button>
            )}
          </div>

          <button
            onClick={scrollToTop}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white hover:text-slate-950 text-white transition-all flex items-center gap-1.5 text-[10px] font-mono border border-white/20 hover:border-white font-bold shadow-md"
            title="Back to Top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
