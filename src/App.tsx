import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { motion } from 'motion/react';

import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { KineticMarquee } from './components/KineticMarquee';
import { ServicesSection } from './components/ServicesSection';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { TeamSection } from './components/TeamSection';
import { LocationsSection } from './components/LocationsSection';
import { PricingCalculator } from './components/PricingCalculator';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CredibilitySection } from './components/CredibilitySection';
import { ContactBookingSection } from './components/ContactBookingSection';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { TechnologyPage } from './components/TechnologyPage';
import { ShadeSimulator } from './components/ShadeSimulator';
import { GoldenRatioAnalyzer } from './components/GoldenRatioAnalyzer';
import { CraftsmanshipProcess } from './components/CraftsmanshipProcess';
import { ComparisonAndFAQ } from './components/ComparisonAndFAQ';
import { DigitalSmileConcierge } from './components/DigitalSmileConcierge';
import { VirtualAtelierTour } from './components/VirtualAtelierTour';
import { FloatingBar } from './components/FloatingBar';
import { PorcelainLightInspector } from './components/PorcelainLightInspector';
import { TreatmentJourneyCanvas } from './components/TreatmentJourneyCanvas';
import { EnamelThicknessComparator } from './components/EnamelThicknessComparator';
import { DoctorSpecCardStack } from './components/DoctorSpecCardStack';
import { InteractiveToothLayerViewer } from './components/InteractiveToothLayerViewer';
import { BiteForceSimulator } from './components/BiteForceSimulator';
import { SmileGoalQuiz } from './components/SmileGoalQuiz';
import { Interactive3DAlignerSimulator } from './components/Interactive3DAlignerSimulator';
import { FloatingFeatureCanvas } from './components/FloatingFeatureCanvas';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { LuxuryPreloader } from './components/LuxuryPreloader';
import { AdminPanelModal } from './components/AdminPanelModal';
import { ArrowLeft, Sparkles, Film, Wrench, Users, DollarSign, MapPin } from 'lucide-react';

// Reusable Framer Motion Section Reveal for high-end studio entry animations
const SectionReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({
  children,
  className = '',
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 35, scale: 0.985 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [preselectedTreatment, setPreselectedTreatment] = useState('');

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleOpenBookingWithTreatment = (treatmentName: string) => {
    setPreselectedTreatment(treatmentName);
    setIsBookingOpen(true);
  };

  const handleOpenBookingDefault = () => {
    setPreselectedTreatment('');
    setIsBookingOpen(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'technology':
        return <TechnologyPage onOpenBooking={handleOpenBookingDefault} />;

      case 'services':
        return (
          <div className="pt-24 min-h-screen bg-[#F9F8F6]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between border-b border-[#1A1A1A]/10">
              <button
                onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-black hover:opacity-70 transition-opacity"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home Experience
              </button>
              <span className="text-xs font-mono text-black/50 uppercase tracking-widest hidden sm:inline">
                Page: Clinical Artistry & Treatment Catalog
              </span>
            </div>

            <ServicesSection onSelectService={handleOpenBookingWithTreatment} />
            <ShadeSimulator onOpenBookingWithProfile={handleOpenBookingWithTreatment} />
            <CraftsmanshipProcess />
            <ComparisonAndFAQ onOpenBooking={handleOpenBookingDefault} />
          </div>
        );

      case 'team':
        return (
          <div className="pt-24 min-h-screen bg-[#0E0F12]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between border-b border-white/10 text-white">
              <button
                onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white hover:text-stone-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home Experience
              </button>
              <span className="text-xs font-mono text-white/50 uppercase tracking-widest hidden sm:inline">
                Page: Master Doctors & Ceramic Artists
              </span>
            </div>

            <TeamSection />
            <CraftsmanshipProcess />
            <TestimonialsSection />
          </div>
        );

      case 'pricing':
        return (
          <div className="pt-24 min-h-screen bg-[#F9F8F6]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between border-b border-[#1A1A1A]/10">
              <button
                onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-black hover:opacity-70 transition-opacity"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home Experience
              </button>
              <span className="text-xs font-mono text-black/50 uppercase tracking-widest hidden sm:inline">
                Page: Investment & Treatment Estimator
              </span>
            </div>

            <PricingCalculator onSelectEstimate={handleOpenBookingWithTreatment} />
            <ComparisonAndFAQ onOpenBooking={handleOpenBookingDefault} />
          </div>
        );

      case 'locations':
      case 'contact':
        return (
          <div className="pt-24 min-h-screen bg-[#0E0F12]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between border-b border-white/10 text-white">
              <button
                onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white hover:text-stone-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home Experience
              </button>
              <span className="text-xs font-mono text-white/50 uppercase tracking-widest hidden sm:inline">
                Page: South Florida Atelier Locations & Contact
              </span>
            </div>

            <LocationsSection onOpenBooking={handleOpenBookingDefault} />
            <ContactBookingSection />
          </div>
        );

      case 'lab':
      case 'shade-studio':
      case 'golden-ratio':
      case '3d-studio':
        return (
          <div className="pt-24 min-h-screen bg-[#0E0F12] text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between border-b border-white/10">
              <button
                onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white hover:text-stone-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home Experience
              </button>
              <span className="text-xs font-mono text-white/50 uppercase tracking-widest hidden sm:inline">
                Page: 3D Ceramic Enamel & Phi Ratio Architecture Lab
              </span>
            </div>

            <ShadeSimulator onOpenBookingWithProfile={handleOpenBookingWithTreatment} />
            <GoldenRatioAnalyzer onOpenBookingWithProfile={handleOpenBookingWithTreatment} />
            <Interactive3DAlignerSimulator onOpenBookingWithAligner={handleOpenBookingWithTreatment} />
            <PorcelainLightInspector onOpenBookingWithMaterial={handleOpenBookingWithTreatment} />
            <InteractiveToothLayerViewer onOpenBookingWithLayer={handleOpenBookingWithTreatment} />
            <EnamelThicknessComparator onOpenBookingWithPrep={handleOpenBookingWithTreatment} />
            <BiteForceSimulator onOpenBookingWithMaterial={handleOpenBookingWithTreatment} />
            <DigitalSmileConcierge onOpenBookingWithProfile={handleOpenBookingWithTreatment} />
          </div>
        );

      case 'home':
      default:
        return (
          <>
            {/* Hero Section */}
            <Hero onOpenBooking={handleOpenBookingDefault} />

            {/* Kinetic Marquee Ticker */}
            <SectionReveal>
              <KineticMarquee />
            </SectionReveal>

            {/* Core Services Section */}
            <SectionReveal>
              <ServicesSection onSelectService={handleOpenBookingWithTreatment} />
            </SectionReveal>

            {/* Interactive Before & After Enamel Centerpiece */}
            <SectionReveal>
              <BeforeAfterSlider />
            </SectionReveal>

            {/* Accredited Cosmetic Dentists & Master Ceramists Card Deck */}
            <SectionReveal>
              <DoctorSpecCardStack onOpenBookingWithDoctor={handleOpenBookingWithTreatment} />
            </SectionReveal>

            {/* Patient Testimonials Section */}
            <SectionReveal>
              <TestimonialsSection />
            </SectionReveal>

            {/* Single Credibility Marker Proof Point */}
            <SectionReveal>
              <CredibilitySection />
            </SectionReveal>

            {/* Direct Consultation Contact Section */}
            <SectionReveal>
              <ContactBookingSection />
            </SectionReveal>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] selection:bg-[#1A1A1A] selection:text-[#F9F8F6] relative font-sans">
      {/* Luxury Opening Animation Preloader */}
      <LuxuryPreloader />

      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Custom Mouse Cursor for Desktop */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={handleOpenBookingDefault}
      />

      {/* Main View Switching / Scroll Layout */}
      <main>
        {renderTabContent()}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenBooking={handleOpenBookingDefault}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Interactive Bottom Bar */}
      <FloatingBar
        onOpenBooking={handleOpenBookingDefault}
      />

      {/* Consultation Booking Drawer / Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedTreatment={preselectedTreatment}
      />

      {/* Clinic & Database Admin Portal Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}

export default App;


