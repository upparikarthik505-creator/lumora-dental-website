import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Sparkles,
  ArrowUpRight,
  Calendar,
  MapPin,
  Layers,
  Cpu,
  Building2,
  Users,
  DollarSign,
  ChevronRight,
  Database,
} from 'lucide-react';
import { soundFx } from '../lib/audioFX';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenBooking,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!mobileMenuOpen) return;
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const primaryNavPages = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'services', label: 'Services', icon: Building2 },
    { id: 'lab', label: '3D Lab', icon: Layers },
    { id: 'team', label: 'Specialists', icon: Users },
    { id: 'technology', label: 'Technology', icon: Cpu },
    { id: 'pricing', label: 'Investment', icon: DollarSign },
    { id: 'locations', label: 'Locations', icon: MapPin },
  ];

  const handleNavClick = (id: string) => {
    soundFx.playClick();
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 transition-all duration-300 pointer-events-none select-none">
        <div className="mx-auto max-w-7xl pointer-events-auto">
          {/* Main Floating Glass Navbar Container */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`rounded-full transition-all duration-300 border backdrop-blur-2xl flex items-center justify-between px-3.5 sm:px-6 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.4)] ${
              isScrolled
                ? 'bg-[#121417]/90 text-white border-white/20 shadow-black/60'
                : 'bg-[#121417]/75 text-white border-white/20 shadow-black/30'
            }`}
          >
            {/* Left Brand Identity */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none shrink-0"
            >
              <div className="flex h-8 w-8 items-center justify-center bg-white text-slate-950 rounded-full transition-transform duration-300 group-hover:scale-105 shadow-md border border-white/40">
                <Sparkles className="h-4 w-4 text-slate-950" />
              </div>
              <span className="text-xs sm:text-base font-serif tracking-tight uppercase text-white whitespace-nowrap">
                Aventura <span className="font-editorial italic text-stone-200 lowercase font-normal">Dental Arts</span>
              </span>
            </button>

            {/* Middle Navigation Items directly in Header Bar */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 mx-2 xl:mx-4">
              {primaryNavPages.map((page) => {
                const isActive = activeTab === page.id;
                const IconComponent = page.icon;
                return (
                  <button
                    key={page.id}
                    onClick={() => handleNavClick(page.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap border ${
                      isActive
                        ? 'bg-white text-slate-950 font-bold shadow-sm border-white'
                        : 'text-white/80 hover:text-white bg-white/5 hover:bg-white/15 border-white/10'
                    }`}
                  >
                    <IconComponent className={`h-3.5 w-3.5 ${isActive ? 'text-slate-950' : 'text-white/70'}`} />
                    <span>{page.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenBooking();
                }}
                className="bg-white hover:bg-stone-100 text-slate-950 px-4 py-1.5 rounded-full text-xs font-sans font-semibold tracking-wide transition-all duration-300 shadow-md border border-white/40 flex items-center gap-1.5 group shrink-0"
              >
                <Calendar className="h-3.5 w-3.5 text-slate-900 group-hover:text-slate-950 transition-colors" />
                <span className="hidden sm:inline">Book Consultation</span>
                <span className="sm:hidden">Book</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className={`lg:hidden flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-300 border shrink-0 text-xs font-sans font-semibold shadow-md group ${
                  mobileMenuOpen
                    ? 'bg-white text-slate-950 border-white'
                    : 'bg-white/15 hover:bg-white/25 text-white border-white/25'
                }`}
                aria-label="Toggle Mobile Navigation"
              >
                {mobileMenuOpen ? (
                  <X className="h-4 w-4 text-slate-950" />
                ) : (
                  <Menu className="h-4 w-4 text-white group-hover:scale-110 transition-transform" />
                )}
                <span className="tracking-wide text-xs">
                  Menu
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* MOBILE NAVIGATION OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-50 bg-[#07090C]/98 backdrop-blur-3xl text-white p-6 pt-24 overflow-y-auto flex flex-col justify-between lg:hidden"
          >
            <div className="max-w-md mx-auto w-full space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-stone-300 font-bold">
                  Header Navigation
                </span>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                {primaryNavPages.map((page) => {
                  const isActive = activeTab === page.id;
                  const IconComponent = page.icon;
                  return (
                    <button
                      key={page.id}
                      onClick={() => handleNavClick(page.id)}
                      className={`w-full p-4 rounded-2xl flex items-center justify-between text-left transition-all border ${
                        isActive
                          ? 'bg-white text-slate-950 border-white font-bold shadow-lg'
                          : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${isActive ? 'bg-slate-950 text-white' : 'bg-white/10 text-white'}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="font-serif text-lg tracking-wide">{page.label}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-white/40'}`} />
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full bg-white text-slate-950 font-mono font-bold uppercase tracking-wider py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl hover:bg-stone-200 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book VIP Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
