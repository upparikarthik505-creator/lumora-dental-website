import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Video,
  Building2,
  Sparkles,
  Download,
  ArrowRight,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { CLINIC_INFO, SERVICES } from '../data/clinicData';
import { MagneticButton } from './MagneticButton';
import { saveAppointment, Appointment } from '../data/bookingStore';
import { useDoctors } from '../data/doctorStore';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTreatment?: string;
}

const TIME_SLOTS = [
  { time: '09:00 AM', status: 'Available', type: 'Morning' },
  { time: '10:30 AM', status: 'Popular', type: 'Morning' },
  { time: '11:45 AM', status: 'Available', type: 'Morning' },
  { time: '01:15 PM', status: 'Available', type: 'Afternoon' },
  { time: '02:45 PM', status: 'Popular', type: 'Afternoon' },
  { time: '04:15 PM', status: 'Available', type: 'Late Afternoon' },
  { time: '05:30 PM', status: 'Limited', type: 'Late Afternoon' },
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedTreatment = '',
}) => {
  const { doctors } = useDoctors();
  // Wizard Steps: 1 = Treatment & Suite, 2 = Date & Time Calendar, 3 = Patient Info, 4 = Confirmation
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Fields
  const [selectedTreatment, setSelectedTreatment] = useState(
    preselectedTreatment || SERVICES[0].name
  );
  const [selectedLocation, setSelectedLocation] = useState('Aventura Flagship');
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Laura Lugo');
  const [consultationType, setConsultationType] = useState<'In-Person Atelier' | 'Virtual Video Call'>('In-Person Atelier');
  
  // Calendar State
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDateStr, setSelectedDateStr] = useState<string>(() => {
    // Default to tomorrow or next business day YYYY-MM-DD
    const nextDay = new Date();
    nextDay.setDate(today.getDate() + 1);
    return nextDay.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:30 AM');

  // Patient Info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Resulting Created Appointment
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Sync preselected treatment if prop changes
  useEffect(() => {
    if (preselectedTreatment) {
      setSelectedTreatment(preselectedTreatment);
    }
  }, [preselectedTreatment]);

  // Calendar math helpers
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isDateDisabled = (dayNum: number) => {
    const checkDate = new Date(currentYear, currentMonth, dayNum);
    const dateToday = new Date();
    dateToday.setHours(0, 0, 0, 0);

    // Disable past dates
    if (checkDate < dateToday) return true;
    // Disable Sundays (clinic closed)
    if (checkDate.getDay() === 0) return true;
    return false;
  };

  const formatSelectedDate = (dateStr: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !selectedDateStr) return;

    const newApp = saveAppointment({
      patientName: fullName,
      email,
      phone,
      treatment: selectedTreatment,
      consultationType,
      location: selectedLocation,
      doctorPreference: selectedDoctor,
      date: selectedDateStr,
      timeSlot: selectedTimeSlot,
      notes,
    });

    setConfirmedBooking(newApp);
    setStep(4);
  };

  const handleDownloadICS = () => {
    if (!confirmedBooking) return;
    const title = `Aventura Dental Arts - ${confirmedBooking.treatment}`;
    const desc = `Consultation with ${confirmedBooking.doctorPreference} at ${confirmedBooking.location}. Reference: ${confirmedBooking.id}`;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Aventura Dental Arts//Consultation Booking//EN
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${desc}
LOCATION:${confirmedBooking.location}
DTSTART:${confirmedBooking.date.replace(/-/g, '')}T100000Z
DTEND:${confirmedBooking.date.replace(/-/g, '')}T110000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${confirmedBooking.id}_appointment.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAndClose = () => {
    setStep(1);
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Dark Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-[#0E0F12]/70 backdrop-blur-2xl"
          />

          {/* Modal Card with Glass Texture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative z-10 w-full max-w-3xl bg-[#F9F8F6]/95 backdrop-blur-2xl text-[#1A1A1A] rounded-[2.5rem] shadow-[0_25px_70px_rgba(0,0,0,0.35)] border border-white/50 overflow-hidden my-auto"
            style={{
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)',
            }}
          >
            {/* Header / Top Progress Bar */}
            <div className="bg-[#121417]/90 backdrop-blur-xl text-white px-6 sm:px-8 py-5 flex items-center justify-between relative overflow-hidden border-b border-white/15">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center bg-white/10 rounded-full border border-white/20">
                  <Sparkles className="h-4 w-4 text-[#5A5A40]" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#5A5A40] font-bold">
                    Concierge Reservation Engine
                  </div>
                  <div className="text-base sm:text-lg font-serif font-medium text-white">
                    Book A Call + Atelier Consultation
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={resetAndClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-[#121417] transition-all"
                aria-label="Close booking modal"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Progress Indicator Dots */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 flex">
                <div
                  className="bg-[#5A5A40] h-full transition-all duration-500"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
              
              {/* STEP 1: Treatment, Doctor & Location Selection */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]/10">
                    <div>
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#5A5A40]">
                        Step 01 of 03
                      </span>
                      <h4 className="font-serif text-xl sm:text-2xl font-medium text-[#1A1A1A]">
                        Select Treatment & Specialist
                      </h4>
                    </div>
                    <span className="text-xs font-mono bg-[#EAE8E3] text-[#1A1A1A] px-3 py-1 rounded-full font-bold">
                      Instant Scheduling
                    </span>
                  </div>

                  {/* Consultation Mode Switcher */}
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest font-bold text-[#1A1A1A]/70 mb-2">
                      Consultation Format
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setConsultationType('In-Person Atelier')}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                          consultationType === 'In-Person Atelier'
                            ? 'border-[#121417] bg-[#121417] text-white shadow-md'
                            : 'border-[#1A1A1A]/15 bg-white text-[#1A1A1A] hover:bg-[#F1EFE9]'
                        }`}
                      >
                        <Building2 className="h-5 w-5 text-[#5A5A40] shrink-0" />
                        <div>
                          <div className="text-xs font-bold font-mono uppercase tracking-wider">In-Person Atelier</div>
                          <div className={`text-[10px] mt-0.5 ${consultationType === 'In-Person Atelier' ? 'text-white/70' : 'text-[#1A1A1A]/60'}`}>
                            Comprehensive 3D scan & smile audit
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setConsultationType('Virtual Video Call')}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                          consultationType === 'Virtual Video Call'
                            ? 'border-[#121417] bg-[#121417] text-white shadow-md'
                            : 'border-[#1A1A1A]/15 bg-white text-[#1A1A1A] hover:bg-[#F1EFE9]'
                        }`}
                      >
                        <Video className="h-5 w-5 text-[#5A5A40] shrink-0" />
                        <div>
                          <div className="text-xs font-bold font-mono uppercase tracking-wider">Virtual Video Call</div>
                          <div className={`text-[10px] mt-0.5 ${consultationType === 'Virtual Video Call' ? 'text-white/70' : 'text-[#1A1A1A]/60'}`}>
                            Remote 1-on-1 ceramic consultation
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Service / Discipline Dropdown */}
                    <div className="sm:col-span-1">
                      <label className="block text-[10px] uppercase font-mono tracking-widest font-bold text-[#1A1A1A]/70 mb-1.5">
                        Service / Discipline
                      </label>
                      <select
                        value={selectedTreatment}
                        onChange={(e) => setSelectedTreatment(e.target.value)}
                        className="w-full border border-[#1A1A1A]/20 bg-white rounded-xl px-4 py-3 text-sm font-medium text-[#1A1A1A] focus:border-[#121417] focus:outline-none shadow-2xs"
                      >
                        {SERVICES.map((srv) => (
                          <option key={srv.id} value={srv.name}>
                            {srv.name} — ({srv.startingPrice})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Master Ceramist / Specialist Choice */}
                    <div className="sm:col-span-1">
                      <label className="block text-[10px] uppercase font-mono tracking-widest font-bold text-[#1A1A1A]/70 mb-1.5">
                        Preferred Master Doctor
                      </label>
                      <select
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                        className="w-full border border-[#1A1A1A]/20 bg-white rounded-xl px-4 py-3 text-sm font-medium text-[#1A1A1A] focus:border-[#121417] focus:outline-none shadow-2xs"
                      >
                        {doctors.map((doc) => (
                          <option key={doc.id} value={doc.name}>
                            {doc.name} ({doc.role})
                          </option>
                        ))}
                        <option value="First Available Lead Specialist">First Available Lead Specialist</option>
                      </select>
                    </div>
                  </div>

                  {/* Next Step Button */}
                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      className="bg-[#121417] hover:bg-[#5A5A40] text-white px-8 py-3.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg"
                    >
                      <span>Proceed to Calendar</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Interactive Calendar & Time Slot Selection */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]/10">
                    <div>
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#5A5A40]">
                        Step 02 of 03
                      </span>
                      <h4 className="font-serif text-xl sm:text-2xl font-medium text-[#1A1A1A]">
                        Select Appointment Date & Time
                      </h4>
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs font-mono underline text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
                    >
                      ← Change Location
                    </button>
                  </div>

                  {/* Calendar Widget Container */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Left: Interactive Month Grid (7 cols) */}
                    <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-[#1A1A1A]/10 shadow-xs">
                      
                      {/* Month Switcher Header */}
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1A1A1A]/10">
                        <span className="font-serif text-lg font-bold text-[#1A1A1A]">
                          {monthNames[currentMonth]} {currentYear}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={handlePrevMonth}
                            className="p-1.5 rounded-lg border border-[#1A1A1A]/10 hover:bg-[#F1EFE9] text-[#1A1A1A]"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={handleNextMonth}
                            className="p-1.5 rounded-lg border border-[#1A1A1A]/10 hover:bg-[#F1EFE9] text-[#1A1A1A]"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Days of Week Header */}
                      <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] font-bold text-[#1A1A1A]/50 uppercase mb-2">
                        <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                      </div>

                      {/* Day Grid */}
                      <div className="grid grid-cols-7 gap-1.5 text-center">
                        {/* Empty padding cells for first day offset */}
                        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                          <div key={`empty-${i}`} className="h-9" />
                        ))}

                        {/* Month Days */}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          const dayNum = i + 1;
                          const monthStr = String(currentMonth + 1).padStart(2, '0');
                          const dayStr = String(dayNum).padStart(2, '0');
                          const thisDateFormatted = `${currentYear}-${monthStr}-${dayStr}`;

                          const disabled = isDateDisabled(dayNum);
                          const isSelected = selectedDateStr === thisDateFormatted;

                          return (
                            <button
                              key={dayNum}
                              type="button"
                              disabled={disabled}
                              onClick={() => setSelectedDateStr(thisDateFormatted)}
                              className={`h-9 w-full rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center relative ${
                                isSelected
                                  ? 'bg-[#121417] text-white shadow-md scale-105 ring-2 ring-[#5A5A40]'
                                  : disabled
                                  ? 'text-[#1A1A1A]/20 cursor-not-allowed bg-[#F9F8F6]/50'
                                  : 'hover:bg-[#5A5A40]/10 text-[#1A1A1A] hover:text-[#121417]'
                              }`}
                            >
                              <span>{dayNum}</span>
                              {isSelected && (
                                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[#5A5A40]" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#1A1A1A]/10 flex items-center justify-between text-[10px] font-mono text-[#1A1A1A]/60">
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-[#121417]" /> Selected Date
                        </span>
                        <span>Hours: Mon–Thu 8am-6pm, Fri 8am-3pm</span>
                      </div>
                    </div>

                    {/* Right: Available Time Slots (5 cols) */}
                    <div className="lg:col-span-5 space-y-4">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-[#5A5A40]">
                          Selected Date
                        </span>
                        <div className="font-serif text-lg font-bold text-[#1A1A1A] mt-0.5">
                          {formatSelectedDate(selectedDateStr)}
                        </div>
                      </div>

                      <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                        <label className="block text-[10px] uppercase font-mono tracking-widest font-bold text-[#1A1A1A]/70 mb-1">
                          Available Atelier Slots
                        </label>
                        {TIME_SLOTS.map((slot) => {
                          const isSelected = selectedTimeSlot === slot.time;
                          return (
                            <button
                              key={slot.time}
                              type="button"
                              onClick={() => setSelectedTimeSlot(slot.time)}
                              className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                                isSelected
                                  ? 'border-[#121417] bg-[#121417] text-white shadow-md'
                                  : 'border-[#1A1A1A]/15 bg-white text-[#1A1A1A] hover:bg-[#F1EFE9]'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <Clock className={`h-4 w-4 ${isSelected ? 'text-[#5A5A40]' : 'text-[#1A1A1A]/40'}`} />
                                <span className="text-xs font-mono font-bold">{slot.time}</span>
                              </div>
                              <span
                                className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                  isSelected
                                    ? 'bg-[#5A5A40] text-white'
                                    : 'bg-[#F1EFE9] text-[#1A1A1A]/70'
                                }`}
                              >
                                {slot.status}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Navigation buttons */}
                      <div className="pt-2 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="bg-[#121417] hover:bg-[#5A5A40] text-white px-7 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg"
                        >
                          <span>Patient Details</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>

                    </div>

                  </div>
                </motion.div>
              )}

              {/* STEP 3: Patient Information Form */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-5"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]/10">
                    <div>
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#5A5A40]">
                        Step 03 of 03
                      </span>
                      <h4 className="font-serif text-xl sm:text-2xl font-medium text-[#1A1A1A]">
                        Patient Contact & Aesthetics Note
                      </h4>
                    </div>
                    <button
                      onClick={() => setStep(2)}
                      className="text-xs font-mono underline text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
                    >
                      ← Back to Calendar
                    </button>
                  </div>

                  {/* Summary Callout Banner */}
                  <div className="bg-[#EAE8E3] p-4 rounded-2xl border border-[#1A1A1A]/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/50 block">Treatment</span>
                      <span className="font-bold text-[#1A1A1A] truncate block">{selectedTreatment}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/50 block">Location</span>
                      <span className="font-bold text-[#1A1A1A] truncate block">{selectedLocation}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/50 block">Date</span>
                      <span className="font-bold text-[#1A1A1A] truncate block">{formatSelectedDate(selectedDateStr)}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/50 block">Slot</span>
                      <span className="font-bold text-[#5A5A40] truncate block">{selectedTimeSlot}</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitBooking} className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-widest font-bold text-[#1A1A1A]/80 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Eleanor Vance"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full border border-[#1A1A1A]/20 bg-white rounded-xl px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:border-[#121417] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-widest font-bold text-[#1A1A1A]/80 mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="(305) 000-0000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full border border-[#1A1A1A]/20 bg-white rounded-xl px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:border-[#121417] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest font-bold text-[#1A1A1A]/80 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="eleanor@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-[#1A1A1A]/20 bg-white rounded-xl px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:border-[#121417] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest font-bold text-[#1A1A1A]/80 mb-1.5">
                        Special Aesthetic Goals or Medical Notes (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Describe desired ceramic shade goals, tooth shape, or any dental anxieties..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full border border-[#1A1A1A]/20 bg-white rounded-xl px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:border-[#121417] focus:outline-none"
                      />
                    </div>

                    <div className="pt-3 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        className="bg-[#121417] hover:bg-[#5A5A40] text-white px-9 py-3.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-xl flex items-center gap-2"
                      >
                        <ShieldCheck className="h-4 w-4 text-[#5A5A40]" />
                        <span>Confirm Consultation</span>
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 4: Real Confirmation View */}
              {step === 4 && confirmedBooking && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-4 text-center space-y-6"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#121417] text-white shadow-xl">
                    <CheckCircle2 className="h-10 w-10 text-[#5A5A40]" />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold text-[#5A5A40] block mb-1">
                      Reservation Reference #{confirmedBooking.id}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1A1A]">
                      Consultation Successfully Scheduled
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1A1A1A]/80 max-w-md mx-auto mt-2 leading-relaxed">
                      Thank you, <span className="font-bold text-[#1A1A1A]">{confirmedBooking.patientName}</span>. Your appointment has been recorded in our Atelier system and added to clinic records.
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-[#121417] text-white p-6 rounded-3xl text-left max-w-lg mx-auto shadow-xl space-y-3 font-mono text-xs border border-white/10">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-white/50 uppercase tracking-widest text-[9px]">Treatment</span>
                      <span className="font-bold text-white text-right">{confirmedBooking.treatment}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-white/50 uppercase tracking-widest text-[9px]">Date & Time</span>
                      <span className="font-bold text-[#5A5A40] text-right">
                        {formatSelectedDate(confirmedBooking.date)} at {confirmedBooking.timeSlot}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-white/50 uppercase tracking-widest text-[9px]">Location</span>
                      <span className="font-bold text-white text-right">{confirmedBooking.location}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white/50 uppercase tracking-widest text-[9px]">Specialist</span>
                      <span className="font-bold text-white text-right">{confirmedBooking.doctorPreference}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleDownloadICS}
                      className="bg-white border border-[#1A1A1A]/20 hover:bg-[#EAE8E3] text-[#1A1A1A] px-5 py-2.5 rounded-full text-xs font-sans font-semibold tracking-wide transition-all flex items-center gap-2 shadow-xs"
                    >
                      <Download className="h-3.5 w-3.5 text-[#5A5A40]" />
                      <span>Download Calendar Invite (.ics)</span>
                    </button>

                    <button
                      onClick={resetAndClose}
                      className="bg-[#121417] text-white hover:bg-[#5A5A40] px-6 py-2.5 rounded-full text-xs font-sans font-semibold tracking-wide transition-all shadow-md"
                    >
                      Close Window
                    </button>
                  </div>
                </motion.div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
