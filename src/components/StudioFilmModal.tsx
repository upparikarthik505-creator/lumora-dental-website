import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Volume2, VolumeX, Sparkles, ShieldCheck } from 'lucide-react';

interface StudioFilmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudioFilmModal: React.FC<StudioFilmModalProps> = ({ isOpen, onClose }) => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#0D0D0D]/80 backdrop-blur-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl bg-[#1A1A1A]/90 backdrop-blur-2xl border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.7)] rounded-3xl overflow-hidden flex flex-col"
            style={{
              boxShadow: '0 30px 90px rgba(0, 0, 0, 0.7), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/15 bg-white/5 backdrop-blur-md text-[#F9F8F6]">
              <div className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-[#8C8C6B]" />
                <span className="text-[11px] uppercase tracking-[0.25em] font-mono text-[#F9F8F6]/80">
                  Aventura Dental Arts • Atelier Cinema Reel
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#F9F8F6]/70 hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-[#8C8C6B]" />}
                  {isMuted ? 'Unmute' : 'Audio Active'}
                </button>

                <button
                  onClick={onClose}
                  className="p-2 text-[#F9F8F6]/70 hover:text-white transition-colors"
                  aria-label="Close studio film"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Video / Cinema Player Area */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1600"
                alt="Aventura Dental Arts Cinema Reel"
                className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

              {/* Center Overlay Card */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-[#F9F8F6] space-y-4">
                <div className="h-16 w-16 rounded-full bg-[#F9F8F6]/10 border border-[#F9F8F6]/30 backdrop-blur-md flex items-center justify-center animate-pulse">
                  <Play className="h-6 w-6 text-[#F9F8F6] fill-[#F9F8F6] ml-1" />
                </div>
                <div>
                  <h3 className="font-editorial text-3xl sm:text-5xl italic text-white">
                    Crafting Esthetic Perfection
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F9F8F6]/70 max-w-md mx-auto mt-2 font-light">
                    Inside our Aventura flagship porcelain studio: where master ceramists hand-layer bio-compatible porcelain under 20x magnification loupes.
                  </p>
                </div>
              </div>

              {/* Bottom Cinema Ticker */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-[#F9F8F6]/60">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#8C8C6B]" /> 4K Optical Mapping Active
                </span>
                <span>02:45 / 03:00</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
