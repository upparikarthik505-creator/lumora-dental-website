import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, HelpCircle, Search, Sparkles, ChevronDown, ArrowRight } from 'lucide-react';
import { EditorialHeading } from './EditorialHeading';
import { MagneticButton } from './MagneticButton';

interface FAQItem {
  question: string;
  answer: string;
  category: 'veneers' | 'implants' | 'whitening' | 'general';
}

const FAQS: FAQItem[] = [
  {
    category: 'veneers',
    question: 'How much natural tooth structure needs to be prepared for veneers?',
    answer: 'At Aventura Dental Arts, our master ceramists craft micro-thin (0.3mm–0.5mm) feldspathic ceramic shells. In over 80% of cases, we perform ultra-conservative preparation limited entirely to enamel, meaning your natural tooth nerve structure remains 100% vital and untouched.',
  },
  {
    category: 'veneers',
    question: 'How long do hand-layered porcelain veneers typically last?',
    answer: 'Our ten-year clinical longevity data shows a 99.4% survival rate. When cared for with standard oral hygiene and night guard protection, hand-layered porcelain veneers routinely last 15 to 20+ years without color degradation or loss of lustre.',
  },
  {
    category: 'implants',
    question: 'Is the dental implant procedure painful?',
    answer: 'Most patients report significantly less discomfort than a standard tooth extraction. Using 3D CBCT computer-guided surgical templates, the implant is placed in under 30 minutes under local anesthesia or optional mild IV sedation. Most patients return to work the following day.',
  },
  {
    category: 'whitening',
    question: 'Will LED whitening cause sharp tooth sensitivity?',
    answer: 'Our proprietary in-office gel formulation uses a balanced dual-action potassium nitrate and amorphous calcium phosphate formula. This neutralizes nerve impulses during oxidation, yielding up to 8 shades brighter without the sharp "zings" associated with legacy whitening.',
  },
  {
    category: 'general',
    question: 'Do you offer private VIP scheduling for high-profile patients?',
    answer: 'Yes. Our Aventura flagship and Bay Harbor ateliers feature private underground parking with direct elevator access and single-patient studio reservation blocks, ensuring complete confidentiality.',
  },
  {
    category: 'general',
    question: 'What financing options or payment plans are available?',
    answer: 'We partner with CareCredit, Sunbit, and offer customized in-house 0% APR structured payment arrangements over 12 to 24 months through our financial concierge.',
  },
];

interface ComparisonSpec {
  feature: string;
  porcelainVeneers: string | boolean;
  compositeBonding: string | boolean;
  lumineers: string | boolean;
}

const COMPARISON_SPECS: ComparisonSpec[] = [
  { feature: 'Lifespan / Longevity', porcelainVeneers: '15 – 20+ Years', compositeBonding: '4 – 7 Years', lumineers: '8 – 12 Years' },
  { feature: 'Stain & Scratch Resistance', porcelainVeneers: '100% Stain Impermeable', compositeBonding: 'Porous (Stains over time)', lumineers: 'High Resistance' },
  { feature: 'Enamel Reduction Required', porcelainVeneers: 'Minimal (0.3mm - 0.5mm)', compositeBonding: 'Zero Reduction', lumineers: 'Zero Reduction' },
  { feature: 'Light Refraction & Depth', porcelainVeneers: '3D Hand-Layered Optics', compositeBonding: 'Monolithic / Flat', lumineers: 'Slightly Opaque' },
  { feature: 'Resistance to Chipping', porcelainVeneers: 'Extreme (Feldspathic Resin)', compositeBonding: 'Moderate', lumineers: 'Moderate' },
  { feature: 'Custom Studio Crafting', porcelainVeneers: 'On-site Master Ceramist', compositeBonding: 'Direct Hand-Sculpted', lumineers: 'Off-site Mass Lab' },
];

export const ComparisonAndFAQ: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'compare' | 'faq'>('compare');
  const [faqFilter, setFaqFilter] = useState<'all' | 'veneers' | 'implants' | 'whitening' | 'general'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQS.filter((f) => {
    const matchesCategory = faqFilter === 'all' || f.category === faqFilter;
    const matchesSearch =
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq-comparison" className="py-28 sm:py-36 lg:py-40 bg-[#F9F8F6] text-[#1A1A1A] border-t border-[#1A1A1A]/10 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Segmented Switch */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-sky-600 font-bold block mb-3">
              Decision & Intelligence Hub
            </span>
            <EditorialHeading
              plainText="Treatment Spec Matrix &"
              italicAccent="Patient Concierge FAQ"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1A1A1A]"
              accentColorClass="text-sky-600"
              preset="shimmer"
            />
          </div>

          {/* Toggle Switch */}
          <div className="bg-[#EAE8E4] p-1 border border-[#1A1A1A]/10 inline-flex self-start md:self-auto font-mono text-xs">
            <button
              onClick={() => setActiveTab('compare')}
              className={`px-5 py-2.5 transition-all uppercase tracking-wider font-bold ${
                activeTab === 'compare'
                  ? 'bg-[#1A1A1A] text-[#F9F8F6] shadow-sm'
                  : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
              }`}
            >
              Treatment Comparison
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-5 py-2.5 transition-all uppercase tracking-wider font-bold ${
                activeTab === 'faq'
                  ? 'bg-[#1A1A1A] text-[#F9F8F6] shadow-sm'
                  : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
              }`}
            >
              Concierge FAQ
            </button>
          </div>
        </div>

        {/* TAB 1: SIDE BY SIDE COMPARISON MATRIX */}
        {activeTab === 'compare' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="overflow-x-auto border border-[#1A1A1A]/10 bg-[#F1EFE9] shadow-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1A1A1A]/10 bg-[#1A1A1A] text-[#F9F8F6] font-mono text-xs uppercase tracking-wider">
                    <th className="p-4 sm:p-6 w-1/4">Restorative Technique</th>
                    <th className="p-4 sm:p-6 w-1/4 bg-[#262626] text-sky-400 font-bold border-x border-white/10">
                      Porcelain Veneers (Gold Std)
                    </th>
                    <th className="p-4 sm:p-6 w-1/4">Composite Resin Bonding</th>
                    <th className="p-4 sm:p-6 w-1/4">Lumineers / No-Prep</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A1A1A]/10 text-xs sm:text-sm font-sans">
                  {COMPARISON_SPECS.map((spec, i) => (
                    <tr key={i} className="hover:bg-[#EAE8E4]/60 transition-colors">
                      <td className="p-4 sm:p-6 font-mono font-bold text-[#1A1A1A] bg-[#F9F8F6]">
                        {spec.feature}
                      </td>
                      <td className="p-4 sm:p-6 font-semibold text-[#1A1A1A] bg-[#EAE8E4]/80 border-x border-[#1A1A1A]/10">
                        {spec.porcelainVeneers}
                      </td>
                      <td className="p-4 sm:p-6 text-[#1A1A1A]/80">{spec.compositeBonding}</td>
                      <td className="p-4 sm:p-6 text-[#1A1A1A]/80">{spec.lumineers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-[#1A1A1A] text-[#F9F8F6] border border-[#1A1A1A] gap-4">
              <div>
                <h4 className="font-editorial text-xl italic text-white">Unsure which technique fits your bite?</h4>
                <p className="text-xs text-[#F9F8F6]/70 mt-0.5 font-light">
                  Our prosthodontists evaluate your smile dynamics in a 3D CBCT consultation.
                </p>
              </div>
              <MagneticButton onClick={onOpenBooking}>
                Reserve Diagnostic Evaluation
              </MagneticButton>
            </div>
          </motion.div>
        )}

        {/* TAB 2: INTERACTIVE FAQ */}
        {activeTab === 'faq' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Search & Category Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-[#F1EFE9] p-4 border border-[#1A1A1A]/10">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1A1A1A]/40" />
                <input
                  type="text"
                  placeholder="Search questions (e.g. pain, financing, lifespan)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F9F8F6] pl-9 pr-4 py-2 border border-[#1A1A1A]/10 text-xs font-mono text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase">
                {(['all', 'veneers', 'implants', 'whitening', 'general'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFaqFilter(cat)}
                    className={`px-3 py-1.5 border transition-all ${
                      faqFilter === cat
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-bold'
                        : 'bg-[#F9F8F6] text-[#1A1A1A]/70 border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordions */}
            <div className="space-y-3">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#1A1A1A]/10 bg-[#F1EFE9] transition-all duration-300 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="font-serif text-lg sm:text-xl font-medium text-[#1A1A1A]">
                        {faq.question}
                      </span>
                      <div
                        className={`h-8 w-8 rounded-full border border-[#1A1A1A]/20 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 bg-[#1A1A1A] text-white' : 'bg-[#F9F8F6] text-[#1A1A1A]'
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-[#1A1A1A]/75 leading-relaxed border-t border-[#1A1A1A]/10 bg-[#F9F8F6] font-light">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {filteredFaqs.length === 0 && (
                <div className="text-center py-12 bg-[#F1EFE9] border border-[#1A1A1A]/10 font-mono text-xs text-[#1A1A1A]/50">
                  No matching questions found for "{searchQuery}". Call our Concierge directly at (305) 890-2210.
                </div>
              )}
            </div>

          </motion.div>
        )}

      </div>
    </section>
  );
};
