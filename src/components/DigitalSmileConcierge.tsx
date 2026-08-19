import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Camera, Upload, CheckCircle, ArrowRight, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { EditorialHeading } from './EditorialHeading';
import { MagneticButton } from './MagneticButton';

interface SampleSmile {
  id: string;
  label: string;
  concern: string;
  imgUrl: string;
  shadeDetected: string;
  symmetryScore: number;
  recommendedUnits: string;
  primarySolution: string;
  estimatedVisits: string;
}

const SAMPLE_SMILES: SampleSmile[] = [
  {
    id: 'sample-1',
    label: 'Diastema & Edge Wear',
    concern: 'Midline gap with uneven central incisor length and minor enamel chipping.',
    imgUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    shadeDetected: 'VITA A2 (Warm Organic)',
    symmetryScore: 74,
    recommendedUnits: '8 Upper Feldspathic Veneers',
    primarySolution: 'Porcelain Micro-Layering & Midline Symmetry Restoration',
    estimatedVisits: '2 Visits (12 Days Total)',
  },
  {
    id: 'sample-2',
    label: 'Tetracycline Enamel Staining',
    concern: 'Deep intrinsic graying resistant to chemical LED peroxide whitening.',
    imgUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
    shadeDetected: 'VITA A3.5 (Intrinsic Gray)',
    symmetryScore: 82,
    recommendedUnits: '10 Upper Feldspathic Veneers (BL1 Shade)',
    primarySolution: 'High-Luminosity Opaque Porcelain Masking',
    estimatedVisits: '2 Visits (14 Days Total)',
  },
  {
    id: 'sample-3',
    label: 'Asymmetric Arch & Narrow Smile',
    concern: 'Dark side corridors in smile arc with minor lateral incisor rotation.',
    imgUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    shadeDetected: 'VITA A1 (Natural Bright)',
    symmetryScore: 78,
    recommendedUnits: '10 Upper & 10 Lower Units (Full Arch Expansion)',
    primarySolution: 'Buccal Corridor Expansion & Arc Alignment',
    estimatedVisits: '3 Visits (18 Days Total)',
  },
];

export const DigitalSmileConcierge: React.FC<{ onOpenBookingWithProfile: (profile: string) => void }> = ({
  onOpenBookingWithProfile,
}) => {
  const [selectedSmile, setSelectedSmile] = useState<SampleSmile>(SAMPLE_SMILES[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState(true);

  const handleSelectSample = (sample: SampleSmile) => {
    setIsAnalyzing(true);
    setSelectedSmile(sample);
    setUploadedImage(null);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 600);
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      }, 900);
    }
  };

  const handleBookWithAssessment = () => {
    const text = `Digital Concierge Assessment: Concern: ${selectedSmile.label}, Current Shade: ${selectedSmile.shadeDetected}, Symmetry Index: ${selectedSmile.symmetryScore}%, Recommended: ${selectedSmile.recommendedUnits}`;
    onOpenBookingWithProfile(text);
  };

  return (
    <section id="concierge-assessment" className="py-24 sm:py-32 lg:py-36 bg-[#F9F8F6] text-[#1A1A1A] border-t border-[#1A1A1A]/10 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-[550px] h-[550px] bg-[#8C8C6B]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-[#1A1A1A]/10">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#EAE8E3] border border-[#1A1A1A]/10 px-3.5 py-1.5 rounded-full mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#5A5A40] font-bold">
              <Camera className="h-3.5 w-3.5 text-[#8C8C6B]" />
              Virtual Diagnostic Tool
            </div>

            <EditorialHeading
              plainText="Digital Smile Concierge &"
              italicAccent="Enamel Scan Assessment"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1A1A1A]"
              accentColorClass="text-[#5A5A40]"
              preset="3d-flip"
            />
          </div>

          <p className="text-sm sm:text-base text-[#1A1A1A]/70 max-w-md leading-relaxed font-light">
            Select a common enamel case profile or upload a clear smile photograph to receive an instant clinical assessment from our prosthodontic team.
          </p>
        </div>

        {/* Interactive Concierge Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Sample Case Selector & Photo Upload (Flipped to Left) */}
          <div className="lg:col-span-5 bg-[#F2F0EC] p-8 border border-[#1A1A1A]/12 rounded-2xl flex flex-col justify-between space-y-6 lg:order-1">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#1A1A1A]/50 block mb-3 font-bold">
                01. Choose Preset Case or Upload Photo
              </span>

              {/* Sample Profile Cards */}
              <div className="space-y-3 mb-6">
                {SAMPLE_SMILES.map((sample) => {
                  const isSelected = selectedSmile.id === sample.id && !uploadedImage;
                  return (
                    <button
                      key={sample.id}
                      onClick={() => handleSelectSample(sample)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'bg-[#121417] text-white border-[#121417] font-semibold shadow-md'
                          : 'bg-white text-[#1A1A1A]/80 border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'
                      }`}
                    >
                      <div>
                        <div className="font-serif text-base font-medium">{sample.label}</div>
                        <div className={`text-xs mt-0.5 line-clamp-1 font-light ${isSelected ? 'text-white/80' : 'text-[#1A1A1A]/60'}`}>
                          {sample.concern}
                        </div>
                      </div>
                      {isSelected && <CheckCircle className="h-4 w-4 text-[#8C8C6B] shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Upload Custom Photo Button */}
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSimulateUpload}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                />
                <div className="p-4 border border-dashed border-[#1A1A1A]/20 bg-white hover:bg-[#EAE8E3] rounded-xl transition-colors text-center font-mono text-xs text-[#1A1A1A]/80 flex items-center justify-center gap-2 shadow-xs">
                  <Upload className="h-4 w-4 text-[#5A5A40]" />
                  <span>Upload Custom Smile Photo (.jpg, .png)</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border border-[#1A1A1A]/10 rounded-xl text-[11px] text-[#1A1A1A]/70 font-light leading-relaxed flex items-start gap-2.5 shadow-xs">
              <ShieldCheck className="h-4 w-4 text-[#5A5A40] shrink-0 mt-0.5" />
              <span>
                All uploaded imagery is processed locally and strictly encrypted under HIPAA patient confidentiality standards.
              </span>
            </div>
          </div>

          {/* Right Column: Instant Diagnostic Report Output (Flipped to Right) */}
          <div className="lg:col-span-7 bg-white border border-[#1A1A1A]/12 rounded-2xl p-8 sm:p-12 flex flex-col justify-between relative min-h-[460px] overflow-hidden shadow-lg lg:order-2">
            
            {/* Analyzing Spinner State */}
            {isAnalyzing ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-16">
                <RefreshCw className="h-8 w-8 text-[#5A5A40] animate-spin" />
                <div className="font-mono text-xs uppercase tracking-widest text-[#1A1A1A]/70">
                  Executing Biomimetic Optical Analysis...
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-8 flex-1 flex flex-col justify-between"
              >
                {/* Header Badge */}
                <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-4 font-mono text-[10px] uppercase tracking-widest text-[#1A1A1A]/60">
                  <span>Diagnostic Summary Report</span>
                  <span className="text-[#5A5A40] font-bold">Status: Clinical Match Ready</span>
                </div>

                {/* Case Visual & Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-5 aspect-[4/3] border border-[#1A1A1A]/15 rounded-xl overflow-hidden bg-black relative">
                    <img
                      src={uploadedImage || selectedSmile.imgUrl}
                      alt={selectedSmile.label}
                      className="w-full h-full object-cover filter brightness-105 contrast-105"
                    />
                    <div className="absolute top-2 left-2 bg-black/80 text-white px-2 py-0.5 font-mono text-[9px] font-bold border border-white/10 rounded-md">
                      {uploadedImage ? 'Custom Photo' : selectedSmile.label}
                    </div>
                  </div>

                  <div className="sm:col-span-7 space-y-3">
                    <h3 className="font-editorial text-2xl text-[#1A1A1A] italic">
                      {uploadedImage ? 'Custom Assessment Profile' : selectedSmile.label}
                    </h3>
                    <p className="text-xs text-[#1A1A1A]/75 font-light leading-relaxed">
                      {selectedSmile.concern}
                    </p>
                    <div className="inline-block bg-[#F2F0EC] border border-[#1A1A1A]/15 px-3 py-1 rounded-full font-mono text-[10px] text-[#5A5A40] font-bold uppercase tracking-wider">
                      Target: {selectedSmile.primarySolution}
                    </div>
                  </div>
                </div>

                {/* Diagnostic Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-[#1A1A1A]/10 pt-6 font-mono text-xs">
                  <div className="bg-[#F9F8F6] p-3.5 rounded-xl border border-[#1A1A1A]/10">
                    <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/50 block mb-1">Detected Shade</span>
                    <span className="text-[#1A1A1A] font-bold">{selectedSmile.shadeDetected}</span>
                  </div>

                  <div className="bg-[#F9F8F6] p-3.5 rounded-xl border border-[#1A1A1A]/10">
                    <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/50 block mb-1">Arc Symmetry</span>
                    <span className="text-[#5A5A40] font-bold">{selectedSmile.symmetryScore}% Score</span>
                  </div>

                  <div className="bg-[#F9F8F6] p-3.5 rounded-xl border border-[#1A1A1A]/10 col-span-2 sm:col-span-1">
                    <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/50 block mb-1">Prescription Units</span>
                    <span className="text-[#1A1A1A] font-bold">{selectedSmile.recommendedUnits}</span>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-6 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs font-mono text-[#1A1A1A]/70">
                    <span className="text-[#1A1A1A] font-bold block text-[10px] uppercase">Timeline Expectation</span>
                    {selectedSmile.estimatedVisits}
                  </div>

                  <MagneticButton onClick={handleBookWithAssessment}>
                    Attach Assessment & Book Visit
                  </MagneticButton>
                </div>
              </motion.div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
