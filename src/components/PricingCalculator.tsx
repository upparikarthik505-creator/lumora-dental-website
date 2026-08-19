import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, ArrowRight, Check } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { EditorialHeading } from './EditorialHeading';

interface PricingCalculatorProps {
  onSelectEstimate: (treatmentName: string) => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onSelectEstimate }) => {
  const [step, setStep] = useState(1);
  const [treatment, setTreatment] = useState('Porcelain Veneers');
  const [toothCount, setToothCount] = useState(4);
  const [paymentPlan, setPaymentPlan] = useState('Monthly Installments (0% APR)');

  const treatmentOptions = [
    { name: 'Porcelain Veneers', basePrice: 1850, unit: 'tooth' },
    { name: 'Dental Implants', basePrice: 2400, unit: 'implant' },
    { name: 'Professional Whitening', basePrice: 650, unit: 'session' },
    { name: 'Comprehensive Exam & Cleaning', basePrice: 280, unit: 'visit' },
  ];

  const selectedOption = treatmentOptions.find((t) => t.name === treatment) || treatmentOptions[0];

  const isPerUnit = selectedOption.unit !== 'session' && selectedOption.unit !== 'visit';
  const effectiveUnits = isPerUnit ? toothCount : 1;
  const totalPrice = selectedOption.basePrice * effectiveUnits;
  const monthlyPrice = Math.round(totalPrice / 12);

  return (
    <section id="pricing" className="py-28 sm:py-36 lg:py-40 bg-[#F9F8F6] border-t border-[#1A1A1A]/10 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#8C8C6B]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#5A5A40] font-bold block mb-2">
            Transparent Investment
          </span>
          <EditorialHeading
            plainText="Treatment"
            italicAccent="Estimator"
            afterText="Calculator"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1A1A1A]"
            preset="spring"
          />
          <p className="text-base text-[#1A1A1A]/75 mt-3 leading-relaxed">
            Estimate your care costs with total clarity prior to your initial visit. No hidden fees or surprise additions.
          </p>
        </div>

        {/* 3-Step Calculator Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Steps Column */}
          <div className="lg:col-span-7 bg-[#F1EFE9] p-6 sm:p-8 border border-[#1A1A1A]/10">
            {/* Step Indicator Header */}
            <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-6 mb-8">
              {[
                { number: 1, label: 'Choose treatment' },
                { number: 2, label: 'Scope / Teeth' },
                { number: 3, label: 'Payment plan' },
              ].map((s) => (
                <button
                  key={s.number}
                  onClick={() => setStep(s.number)}
                  className={`flex items-center gap-2 text-left focus:outline-none transition-colors ${
                    step === s.number ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/50 hover:text-[#1A1A1A]'
                  }`}
                >
                  <div
                    className={`flex h-6 w-6 items-center justify-center text-[10px] font-bold transition-colors ${
                      step === s.number
                        ? 'bg-[#1A1A1A] text-[#F9F8F6]'
                        : 'bg-[#EAE8E4] text-[#1A1A1A]'
                    }`}
                  >
                    {s.number}
                  </div>
                  <span className="hidden sm:inline text-[11px] uppercase tracking-wider font-semibold">{s.label}</span>
                </button>
              ))}
            </div>

            {/* Step 1: Choose your treatment */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h3 className="text-sm uppercase tracking-wider font-bold text-[#1A1A1A] mb-2">
                  1. Choose your treatment
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {treatmentOptions.map((opt) => (
                    <button
                      key={opt.name}
                      type="button"
                      onClick={() => {
                        setTreatment(opt.name);
                        setStep(2);
                      }}
                      className={`p-4 border text-left transition-all ${
                        treatment === opt.name
                          ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-xs'
                          : 'border-[#1A1A1A]/10 bg-white text-[#1A1A1A] hover:bg-[#EAE8E4]'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-semibold">{opt.name}</span>
                        {treatment === opt.name && <Check className="h-4 w-4 text-[#8C8C6B]" />}
                      </div>
                      <span
                        className={`text-[11px] uppercase tracking-wider ${
                          treatment === opt.name ? 'text-white/80' : 'text-[#1A1A1A]/60'
                        }`}
                      >
                        Est. ${opt.basePrice} / {opt.unit}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: How many teeth / scope */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h3 className="text-sm uppercase tracking-wider font-bold text-[#1A1A1A] mb-2">
                  2. Select scope of care
                </h3>

                {isPerUnit ? (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-[#1A1A1A]/80 font-semibold">
                        Number of {selectedOption.unit}s:
                      </span>
                      <span className="font-serif text-2xl font-semibold text-[#1A1A1A]">
                        {toothCount} {selectedOption.unit}{toothCount > 1 ? 's' : ''}
                      </span>
                    </div>

                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={toothCount}
                      onChange={(e) => setToothCount(parseInt(e.target.value))}
                      className="w-full accent-[#1A1A1A] h-2 bg-[#EAE8E4] cursor-pointer"
                    />

                    <div className="flex justify-between text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 mt-2 font-semibold">
                      <span>1 (Single Focus)</span>
                      <span>4 (Upper Arch)</span>
                      <span>8–10 (Full Smile)</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-[#1A1A1A]/80 bg-white p-4 border border-[#1A1A1A]/10">
                    {treatment} is typically performed as a single complete session or visit.
                  </p>
                )}

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 bg-[#1A1A1A] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white hover:bg-[#333]"
                  >
                    <span>Proceed to Payment Plan</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment plan */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h3 className="text-sm uppercase tracking-wider font-bold text-[#1A1A1A] mb-2">
                  3. Select payment plan preference
                </h3>
                <div className="space-y-3">
                  {[
                    { title: 'Full Payment Savings', desc: '5% courtesy discount on upfront settlement' },
                    { title: 'Monthly Installments (0% APR)', desc: '12-month zero interest structured care plan' },
                    { title: 'Dental Insurance Guidance', desc: 'Out-of-network claims submission assistance' },
                  ].map((plan) => (
                    <button
                      key={plan.title}
                      type="button"
                      onClick={() => setPaymentPlan(plan.title)}
                      className={`w-full p-4 border text-left transition-all ${
                        paymentPlan === plan.title
                          ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white'
                          : 'border-[#1A1A1A]/10 bg-white text-[#1A1A1A] hover:bg-[#EAE8E4]'
                      }`}
                    >
                      <div className="font-semibold text-sm">{plan.title}</div>
                      <div
                        className={`text-[11px] mt-0.5 ${
                          paymentPlan === plan.title ? 'text-white/80' : 'text-[#1A1A1A]/60'
                        }`}
                      >
                        {plan.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Estimate Summary Box */}
          <div className="lg:col-span-5 bg-[#1A1A1A] text-[#F9F8F6] p-6 sm:p-8 border border-[#1A1A1A] shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#8C8C6B] uppercase tracking-[0.3em] mb-4">
                <Calculator className="h-4 w-4" />
                <span>Estimated Summary</span>
              </div>

              <div className="space-y-4 border-b border-[#F9F8F6]/10 pb-6 mb-6">
                <div className="flex justify-between items-start text-sm">
                  <span className="text-[#F9F8F6]/70">Selected Treatment:</span>
                  <span className="font-semibold text-right text-white">{treatment}</span>
                </div>
                {isPerUnit && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#F9F8F6]/70">Quantity:</span>
                    <span className="font-semibold text-white">{toothCount} {selectedOption.unit}(s)</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#F9F8F6]/70">Payment Preference:</span>
                  <span className="font-semibold text-white text-right max-w-[180px]">{paymentPlan.split(' (')[0]}</span>
                </div>
              </div>

              <div className="space-y-1 mb-6">
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8C6B]">Estimated Total Fee</div>
                <div className="font-serif text-3xl sm:text-4xl font-semibold text-white">
                  ${totalPrice.toLocaleString()}
                </div>
                {paymentPlan.includes('Monthly') && (
                  <div className="text-xs text-[#F9F8F6]/80 mt-1">
                    Or approximately <span className="font-semibold text-white">${monthlyPrice}/mo</span> over 12 months.
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-[#F9F8F6]/10">
              <p className="text-[11px] text-[#F9F8F6]/60 mb-4 leading-normal">
                Final fees are confirmed during your clinical consultation following diagnostic imaging and smile mapping.
              </p>
              <MagneticButton
                onClick={() => onSelectEstimate(`${treatment} (${toothCount} ${selectedOption.unit}s)`)}
                className="w-full justify-center bg-[#F9F8F6] text-[#1A1A1A] hover:bg-[#EAE8E4]"
              >
                Book with this Estimate
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
