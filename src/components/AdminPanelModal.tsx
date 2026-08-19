import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Database,
  Users,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  RefreshCw,
  Calendar,
  Sparkles,
  ShieldAlert,
  Save,
  UserCheck,
  Image as ImageIcon,
  Check,
  Activity,
  Layers,
  CheckCircle
} from 'lucide-react';
import {
  useDoctors,
  ExtendedDoctor,
  INITIAL_DOCTORS,
  PRESET_DOCTOR_PORTRAITS,
  resolveDoctorImage
} from '../data/doctorStore';
import { testBackendConnection, db, collection, onSnapshot } from '../lib/firebase';
import {
  Appointment,
  ConciergeLead,
  updateAppointmentStatus,
  deleteAppointment,
  updateLeadStatus,
} from '../data/bookingStore';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const { doctors, saveDoctor, deleteDoctor, resetDoctors, dbConnected } = useDoctors();

  const [activeTab, setActiveTab] = useState<'doctors' | 'appointments' | 'leads' | 'database'>('doctors');

  // Test connection state
  const [testResult, setTestResult] = useState<{
    success?: boolean;
    message?: string;
    timestamp?: string;
    databaseId?: string;
  } | null>(null);
  const [testingDb, setTestingDb] = useState(false);

  // Doctor Form State
  const [editingDoctor, setEditingDoctor] = useState<ExtendedDoctor | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [doctorForm, setDoctorForm] = useState<ExtendedDoctor>({
    id: '',
    name: '',
    role: '',
    experienceYears: 10,
    bio: '',
    education: '',
    specialties: [],
    credentials: [],
    casesCompleted: '1,000+ Cases',
    signatureTechnique: '',
    locationPreference: 'Aventura Flagship',
    availabilityStatus: 'Available Today',
    image: PRESET_DOCTOR_PORTRAITS[0].url,
  });

  const [specialtiesInput, setSpecialtiesInput] = useState('');
  const [credentialsInput, setCredentialsInput] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Live Appointments & Leads from Firestore
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [leads, setLeads] = useState<ConciergeLead[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    // Listen to real-time appointments collection
    const unsubAppts = onSnapshot(collection(db, 'appointments'), (snapshot) => {
      const list: Appointment[] = [];
      snapshot.forEach((docSnap) => {
        list.push({ ...docSnap.data(), id: docSnap.id } as Appointment);
      });
      setAppointments(list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    });

    // Listen to real-time diagnostic_leads collection
    const unsubLeads = onSnapshot(collection(db, 'diagnostic_leads'), (snapshot) => {
      const list: ConciergeLead[] = [];
      snapshot.forEach((docSnap) => {
        list.push({ ...docSnap.data(), id: docSnap.id } as ConciergeLead);
      });
      setLeads(list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    });

    return () => {
      unsubAppts();
      unsubLeads();
    };
  }, [isOpen]);

  const handleRunDbTest = async () => {
    setTestingDb(true);
    const result = await testBackendConnection();
    setTestResult(result);
    setTestingDb(false);
  };

  const handleOpenAddDoctor = () => {
    const newId = `dr-${Date.now().toString().slice(-6)}`;
    setDoctorForm({
      id: newId,
      name: '',
      role: 'Cosmetic Dentist & Ceramist',
      experienceYears: 10,
      bio: '',
      education: 'DDS / DMD Specialist',
      specialties: ['Porcelain Veneers', 'Smile Design'],
      credentials: ['AACD Specialist'],
      casesCompleted: '1,000+ Restorations',
      signatureTechnique: 'Biomimetic Enamel Sculpting',
      locationPreference: 'Aventura Flagship',
      availabilityStatus: 'Available Today',
      image: PRESET_DOCTOR_PORTRAITS[0].url,
    });
    setSpecialtiesInput('Porcelain Veneers, Smile Design');
    setCredentialsInput('AACD Specialist');
    setEditingDoctor(null);
    setIsAddingNew(true);
    setSaveSuccessMsg(null);
  };

  const handleEditDoctor = (docItem: ExtendedDoctor) => {
    setDoctorForm({
      ...docItem,
      image: resolveDoctorImage(docItem.image, docItem.id, docItem.name),
    });
    setSpecialtiesInput((docItem.specialties || []).join(', '));
    setCredentialsInput((docItem.credentials || []).join(', '));
    setEditingDoctor(docItem);
    setIsAddingNew(false);
    setSaveSuccessMsg(null);
  };

  const handleSaveDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorForm.name) return;

    const formattedSpecialties = specialtiesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const formattedCredentials = credentialsInput
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const doctorToSave: ExtendedDoctor = {
      ...doctorForm,
      image: resolveDoctorImage(doctorForm.image, doctorForm.id, doctorForm.name),
      specialties: formattedSpecialties.length > 0 ? formattedSpecialties : ['Cosmetic Dentistry'],
      credentials: formattedCredentials.length > 0 ? formattedCredentials : ['Certified Specialist'],
    };

    await saveDoctor(doctorToSave);
    setSaveSuccessMsg(`Successfully saved ${doctorToSave.name} to Firestore database!`);

    setTimeout(() => {
      setIsAddingNew(false);
      setEditingDoctor(null);
      setSaveSuccessMsg(null);
    }, 1200);
  };

  const handleDeleteDoctorConfirm = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name} from Firestore database?`)) {
      await deleteDoctor(id);
      if (editingDoctor?.id === id) {
        setEditingDoctor(null);
        setIsAddingNew(false);
      }
    }
  };

  const handleResetDoctorsConfirm = async () => {
    if (window.confirm('Reset doctors list in Firestore to default initial team members?')) {
      await resetDoctors();
      setSaveSuccessMsg('Doctors reset to default in Firestore!');
      setTimeout(() => setSaveSuccessMsg(null), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Glass Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0A0B0D]/85 backdrop-blur-2xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-5xl bg-[#121417] text-[#F9F8F6] rounded-[2.5rem] border border-white/20 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="bg-[#181A1F] border-b border-white/10 p-6 sm:p-8 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <Database className="h-5 w-5 text-[#8C8C6B]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8C8C6B] font-bold">
                      Aventura Dental Arts CMS
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                        dbConnected
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          dbConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                        }`}
                      />
                      {dbConnected ? 'Firestore Connected' : 'Local Fallback'}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-white">
                    Clinic Management & Database Portal
                  </h3>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-[#15171B] border-b border-white/10 px-6 pt-3 flex flex-wrap items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-2 overflow-x-auto pb-3">
                <button
                  onClick={() => setActiveTab('doctors')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                    activeTab === 'doctors'
                      ? 'bg-white text-slate-950 border-white shadow-md'
                      : 'bg-white/5 text-white/70 hover:text-white border-white/10'
                  }`}
                >
                  <Users className="h-3.5 w-3.5" />
                  <span>Doctors CMS ({doctors.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                    activeTab === 'appointments'
                      ? 'bg-white text-slate-950 border-white shadow-md'
                      : 'bg-white/5 text-white/70 hover:text-white border-white/10'
                  }`}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Appointments ({appointments.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('leads')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                    activeTab === 'leads'
                      ? 'bg-white text-slate-950 border-white shadow-md'
                      : 'bg-white/5 text-white/70 hover:text-white border-white/10'
                  }`}
                >
                  <UserCheck className="h-3.5 w-3.5" />
                  <span>Concierge Leads ({leads.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('database')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                    activeTab === 'database'
                      ? 'bg-white text-slate-950 border-white shadow-md'
                      : 'bg-white/5 text-white/70 hover:text-white border-white/10'
                  }`}
                >
                  <Activity className="h-3.5 w-3.5" />
                  <span>Live DB Status</span>
                </button>
              </div>

              {activeTab === 'doctors' && (
                <div className="flex items-center gap-2 pb-3">
                  <button
                    onClick={handleResetDoctorsConfirm}
                    className="px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    Reset Defaults
                  </button>
                  <button
                    onClick={handleOpenAddDoctor}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-[#8C8C6B] text-slate-950 hover:bg-stone-200 transition-colors flex items-center gap-1.5 shadow-md"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add New Doctor</span>
                  </button>
                </div>
              )}
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
              {saveSuccessMsg && (
                <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              {/* TAB 1: DOCTORS MANAGEMENT */}
              {activeTab === 'doctors' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Doctor List */}
                  <div
                    className={
                      isAddingNew || editingDoctor ? 'lg:col-span-5 space-y-4' : 'lg:col-span-12 space-y-4'
                    }
                  >
                    <div className="flex items-center justify-between font-mono text-xs text-white/60 uppercase tracking-wider border-b border-white/10 pb-2">
                      <span>Firestore 'doctors' Collection ({doctors.length})</span>
                      <span>Real-time Sync Active</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 max-h-[500px] overflow-y-auto pr-1">
                      {doctors.map((docItem) => {
                        const isSelected = editingDoctor?.id === docItem.id;
                        const portraitImg = resolveDoctorImage(docItem.image, docItem.id, docItem.name);

                        return (
                          <div
                            key={docItem.id}
                            className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                              isSelected
                                ? 'bg-white/15 border-white text-white shadow-lg'
                                : 'bg-white/5 border-white/10 hover:border-white/20 text-white'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 shrink-0 bg-black">
                                <img
                                  src={portraitImg}
                                  alt={docItem.name}
                                  className="w-full h-full object-cover object-center"
                                  onError={(e) => {
                                    // Fallback if image fails
                                    (e.target as HTMLImageElement).src = PRESET_DOCTOR_PORTRAITS[0].url;
                                  }}
                                />
                              </div>
                              <div className="min-w-0">
                                <div className="font-serif font-semibold text-base text-white truncate">
                                  {docItem.name}
                                </div>
                                <div className="text-xs text-stone-300 truncate">{docItem.role}</div>
                                <div className="text-[10px] font-mono text-white/50 mt-0.5">
                                  ID: {docItem.id} • {docItem.experienceYears} Yrs Exp
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => handleEditDoctor(docItem)}
                                className="p-2 rounded-lg bg-white/10 hover:bg-white text-white hover:text-slate-950 transition-colors"
                                title="Edit Doctor Profile & Image"
                              >
                                <Edit2 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteDoctorConfirm(docItem.id, docItem.name)}
                                className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-colors"
                                title="Delete Doctor"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Doctor Add / Edit Form */}
                  {(isAddingNew || editingDoctor) && (
                    <div className="lg:col-span-7 bg-[#17191E] border border-white/15 p-6 sm:p-8 rounded-3xl space-y-5">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8C6B] font-bold">
                            {isAddingNew ? 'Create New Doctor Profile' : 'Edit Doctor Profile & Imagery'}
                          </span>
                          <h4 className="font-serif text-xl font-medium text-white">
                            {doctorForm.name || 'New Specialist'}
                          </h4>
                        </div>

                        <button
                          onClick={() => {
                            setIsAddingNew(false);
                            setEditingDoctor(null);
                          }}
                          className="text-xs font-mono text-white/60 hover:text-white underline"
                        >
                          Cancel
                        </button>
                      </div>

                      <form onSubmit={handleSaveDoctorSubmit} className="space-y-4">
                        {/* VISUAL DENTIST PORTRAIT SELECTOR */}
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                          <label className="block text-[11px] font-mono uppercase tracking-widest text-stone-200 font-bold flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <ImageIcon className="h-4 w-4 text-[#8C8C6B]" />
                              <span>Select Dentist Portrait Imagery *</span>
                            </span>
                            <span className="text-[10px] text-white/50 font-normal">Click thumbnail to select</span>
                          </label>

                          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                            {PRESET_DOCTOR_PORTRAITS.map((preset) => {
                              const isSelected =
                                doctorForm.image === preset.url ||
                                doctorForm.id === preset.id ||
                                doctorForm.name === preset.name;

                              return (
                                <button
                                  type="button"
                                  key={preset.id}
                                  onClick={() =>
                                    setDoctorForm({
                                      ...doctorForm,
                                      image: preset.url,
                                      name: doctorForm.name || preset.name,
                                      role: doctorForm.role || preset.role,
                                    })
                                  }
                                  className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                                    isSelected
                                      ? 'border-[#8C8C6B] ring-2 ring-[#8C8C6B]/50 scale-105 shadow-lg'
                                      : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                                  }`}
                                  title={preset.name}
                                >
                                  <img
                                    src={preset.url}
                                    alt={preset.name}
                                    className="w-full h-full object-cover object-center"
                                  />
                                  {isSelected && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                      <Check className="h-4 w-4 text-emerald-400 stroke-[3]" />
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          <div className="pt-2">
                            <label className="block text-[10px] font-mono uppercase tracking-widest text-white/60 mb-1">
                              Or Custom Portrait Image URL (HTTPS / Unsplash)
                            </label>
                            <input
                              type="text"
                              placeholder="https://images.unsplash.com/photo-..."
                              value={doctorForm.image}
                              onChange={(e) => setDoctorForm({ ...doctorForm, image: e.target.value })}
                              className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2 text-xs text-white placeholder-white/30 focus:border-white focus:outline-none font-mono"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono uppercase tracking-widest text-white/70 mb-1">
                              Doctor Name *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Dr. Julian Vance"
                              value={doctorForm.name}
                              onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-white focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono uppercase tracking-widest text-white/70 mb-1">
                              Role / Title *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Lead Esthetic Dentist"
                              value={doctorForm.role}
                              onChange={(e) => setDoctorForm({ ...doctorForm, role: e.target.value })}
                              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-white focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono uppercase tracking-widest text-white/70 mb-1">
                              Years Experience
                            </label>
                            <input
                              type="number"
                              min={1}
                              max={50}
                              value={doctorForm.experienceYears}
                              onChange={(e) =>
                                setDoctorForm({ ...doctorForm, experienceYears: parseInt(e.target.value) || 1 })
                              }
                              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-white focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono uppercase tracking-widest text-white/70 mb-1">
                              Location
                            </label>
                            <select
                              value={doctorForm.locationPreference}
                              onChange={(e) => setDoctorForm({ ...doctorForm, locationPreference: e.target.value })}
                              className="w-full bg-[#181A1F] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:border-white focus:outline-none"
                            >
                              <option value="Aventura Flagship">Aventura Flagship</option>
                              <option value="Bay Harbor Islands">Bay Harbor Islands</option>
                              <option value="Coral Gables Suite">Coral Gables Suite</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono uppercase tracking-widest text-white/70 mb-1">
                              Availability
                            </label>
                            <select
                              value={doctorForm.availabilityStatus}
                              onChange={(e) =>
                                setDoctorForm({ ...doctorForm, availabilityStatus: e.target.value as any })
                              }
                              className="w-full bg-[#181A1F] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:border-white focus:outline-none"
                            >
                              <option value="Available Today">Available Today</option>
                              <option value="Next Week">Next Week</option>
                              <option value="By Appointment">By Appointment</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-white/70 mb-1">
                            Education & Alma Mater
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. DDS, Columbia University School of Dental Medicine"
                            value={doctorForm.education}
                            onChange={(e) => setDoctorForm({ ...doctorForm, education: e.target.value })}
                            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-white/70 mb-1">
                            Clinical Biography
                          </label>
                          <textarea
                            rows={3}
                            value={doctorForm.bio}
                            onChange={(e) => setDoctorForm({ ...doctorForm, bio: e.target.value })}
                            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-white focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono uppercase tracking-widest text-white/70 mb-1">
                              Specialties (comma-separated)
                            </label>
                            <input
                              type="text"
                              value={specialtiesInput}
                              onChange={(e) => setSpecialtiesInput(e.target.value)}
                              placeholder="Veneers, Smile Architecture, Implants"
                              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-white focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono uppercase tracking-widest text-white/70 mb-1">
                              Signature Technique
                            </label>
                            <input
                              type="text"
                              value={doctorForm.signatureTechnique || ''}
                              onChange={(e) => setDoctorForm({ ...doctorForm, signatureTechnique: e.target.value })}
                              placeholder="Facial-Guided Phi Ratio Enamel Sculpting"
                              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-white focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddingNew(false);
                              setEditingDoctor(null);
                            }}
                            className="px-4 py-2 rounded-xl text-xs font-mono uppercase text-white/70 hover:text-white"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-white text-slate-950 font-mono text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl hover:bg-stone-200 transition-colors flex items-center gap-2 shadow-lg"
                          >
                            <Save className="h-4 w-4" />
                            <span>Save Doctor to Firestore</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: APPOINTMENTS MANAGEMENT */}
              {activeTab === 'appointments' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs text-white/60 uppercase tracking-wider border-b border-white/10 pb-2">
                    <span>Firestore 'appointments' Collection ({appointments.length})</span>
                    <span>Live Booking Records</span>
                  </div>

                  {appointments.length === 0 ? (
                    <div className="text-center py-12 text-white/40 font-mono text-xs">
                      No appointments scheduled yet in Firestore.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {appointments.map((appt) => (
                        <div
                          key={appt.id}
                          className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-serif font-bold text-base text-white">{appt.patientName}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-stone-300">
                                #{appt.id}
                              </span>
                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                                  appt.status === 'Confirmed'
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : appt.status === 'Completed'
                                    ? 'bg-blue-500/20 text-blue-400'
                                    : appt.status === 'Cancelled'
                                    ? 'bg-rose-500/20 text-rose-400'
                                    : 'bg-amber-500/20 text-amber-400'
                                }`}
                              >
                                {appt.status}
                              </span>
                            </div>

                            <div className="text-xs text-stone-300 mt-1 flex flex-wrap items-center gap-3 font-mono">
                              <span>
                                Treatment: <strong>{appt.treatment}</strong>
                              </span>
                              <span>•</span>
                              <span>
                                Date: <strong>{appt.date} ({appt.timeSlot})</strong>
                              </span>
                              <span>•</span>
                              <span>
                                Doctor: <strong>{appt.doctorPreference || (appt as any).specialist}</strong>
                              </span>
                            </div>

                            <div className="text-[11px] text-white/50 mt-1 font-mono">
                              Contact: {appt.email} | {appt.phone} | Location: {appt.location}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={appt.status}
                              onChange={(e) => updateAppointmentStatus(appt.id, e.target.value as any)}
                              className="bg-[#181A1F] border border-white/20 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>

                            <button
                              onClick={() => deleteAppointment(appt.id)}
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                              title="Delete Appointment"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: CONCIERGE LEADS */}
              {activeTab === 'leads' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs text-white/60 uppercase tracking-wider border-b border-white/10 pb-2">
                    <span>Firestore 'diagnostic_leads' Collection ({leads.length})</span>
                    <span>Digital Concierge Leads</span>
                  </div>

                  {leads.length === 0 ? (
                    <div className="text-center py-12 text-white/40 font-mono text-xs">
                      No leads recorded yet in Firestore.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {leads.map((lead) => (
                        <div
                          key={lead.id}
                          className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-serif font-bold text-base text-white">{lead.patientName}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-stone-300">
                                {lead.id}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#8C8C6B]/20 text-[#8C8C6B] font-bold">
                                {lead.status}
                              </span>
                            </div>

                            <div className="text-xs text-stone-300 mt-1 font-mono space-y-0.5">
                              <div>
                                Concern: <strong>{lead.concern || (lead as any).primaryConcern}</strong>
                              </div>
                              <div>
                                Shade Goal: <strong>{lead.shadeGoal || (lead as any).targetShade}</strong> | Budget:{' '}
                                <strong>{lead.estimatedBudget || (lead as any).budgetEstimate}</strong>
                              </div>
                              <div className="text-white/50">
                                Phone: {lead.phone} | Email: {lead.email}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                              className="bg-[#181A1F] border border-white/20 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none"
                            >
                              <option value="New Lead">New Lead</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Scheduled">Scheduled</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: DATABASE CONNECTION DIAGNOSTICS */}
              {activeTab === 'database' && (
                <div className="space-y-6">
                  <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-5">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8C6B] font-bold">
                          Firestore Live Connection Diagnostics
                        </span>
                        <h4 className="font-serif text-xl text-white font-medium">
                          Database Connection Verification
                        </h4>
                      </div>

                      <button
                        onClick={handleRunDbTest}
                        disabled={testingDb}
                        className="bg-white text-slate-950 font-mono text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-stone-200 transition-colors flex items-center gap-2 shadow-md disabled:opacity-50"
                      >
                        <RefreshCw className={`h-4 w-4 ${testingDb ? 'animate-spin' : ''}`} />
                        <span>{testingDb ? 'Testing Read & Write...' : 'Run DB Health Test'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                      <div className="p-4 bg-black/40 rounded-2xl border border-white/10 space-y-1">
                        <span className="text-white/50 text-[10px] uppercase">Connection Status</span>
                        <div className="text-emerald-400 font-bold flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{dbConnected ? 'Connected (Firestore)' : 'Offline (Local)'}</span>
                        </div>
                      </div>

                      <div className="p-4 bg-black/40 rounded-2xl border border-white/10 space-y-1">
                        <span className="text-white/50 text-[10px] uppercase">Target Firestore Database ID</span>
                        <div className="text-stone-200 font-bold break-all">
                          ai-studio-aventuradentalar-f2e50ae5-5b53-44af-ba67-b61d026bc1c7
                        </div>
                      </div>

                      <div className="p-4 bg-black/40 rounded-2xl border border-white/10 space-y-1">
                        <span className="text-white/50 text-[10px] uppercase">Live Document Counts</span>
                        <div className="text-stone-200 font-bold">
                          Doctors: {doctors.length} | Appts: {appointments.length} | Leads: {leads.length}
                        </div>
                      </div>
                    </div>

                    {testResult && (
                      <div
                        className={`p-5 rounded-2xl border ${
                          testResult.success
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold font-mono text-sm mb-1">
                          {testResult.success ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                          ) : (
                            <ShieldAlert className="h-5 w-5 text-rose-400" />
                          )}
                          <span>
                            {testResult.success
                              ? 'Live Read & Write to Firestore Verified Successfully!'
                              : 'Connection Warning'}
                          </span>
                        </div>
                        <p className="font-mono text-xs opacity-90">{testResult.message}</p>
                        <div className="text-[10px] font-mono text-white/50 mt-2">
                          Tested At: {testResult.timestamp}
                        </div>
                      </div>
                    )}

                    <div className="p-5 bg-black/30 rounded-2xl border border-white/10 text-xs text-white/70 space-y-2">
                      <div className="font-mono font-bold text-white uppercase tracking-wider text-[11px]">
                        How Admin Panel & Firestore Sync Work:
                      </div>
                      <ul className="list-disc pl-5 space-y-1 font-mono text-[11px] text-white/60">
                        <li>
                          <strong>Doctors CMS:</strong> Changes saved here write directly to the <code>doctors</code> collection in Firestore and update the website team display in real-time for all visitors.
                        </li>
                        <li>
                          <strong>Appointments & Leads:</strong> Patient bookings from the website modal write directly to <code>appointments</code> and <code>diagnostic_leads</code> collections in Firestore, visible instantly in this portal.
                        </li>
                        <li>
                          <strong>Dentist Imagery:</strong> Built-in portrait presets match local high-resolution asset modules so image links are never broken or mismatched.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
