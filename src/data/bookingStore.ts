import { db, collection, addDoc, setDoc, doc, deleteDoc } from '../lib/firebase';

export interface Appointment {
  id: string;
  patientName: string;
  email: string;
  phone: string;
  treatment: string;
  consultationType: 'In-Person Atelier' | 'Virtual Video Call';
  location: string;
  doctorPreference: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
  estimatedValue?: number;
}

export interface ConciergeLead {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  concern: string;
  shadeGoal: string;
  estimatedBudget: string;
  createdAt: string;
  status: 'New Lead' | 'Contacted' | 'Scheduled';
}

const STORAGE_KEY_APPOINTMENTS = 'lumora_dental_appointments_v1';
const STORAGE_KEY_LEADS = 'lumora_dental_leads_v1';

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'LUM-9201',
    patientName: 'Sophia Montgomery',
    email: 'sophia.m@luxuryestate.com',
    phone: '(305) 938-2041',
    treatment: 'Feldspathic Porcelain Veneers',
    consultationType: 'In-Person Atelier',
    location: 'Aventura Flagship',
    doctorPreference: 'Dr. Laura Lugo',
    date: '2026-08-03',
    timeSlot: '10:30 AM',
    notes: 'Looking for 8 upper veneers to correct incisal edge asymmetry.',
    status: 'Confirmed',
    createdAt: '2026-07-28T14:20:00Z',
    estimatedValue: 24000,
  },
  {
    id: 'LUM-8812',
    patientName: 'Alexander Wright',
    email: 'alex.wright@venturecap.io',
    phone: '(305) 441-9022',
    treatment: 'Full Mouth Rehabilitation',
    consultationType: 'In-Person Atelier',
    location: 'Bay Harbor Islands',
    doctorPreference: 'Dr. Luke Grillo',
    date: '2026-08-04',
    timeSlot: '02:00 PM',
    notes: 'Referred by Dr. Miller for complex bite realignment.',
    status: 'Pending',
    createdAt: '2026-07-29T09:15:00Z',
    estimatedValue: 48000,
  },
  {
    id: 'LUM-8490',
    patientName: 'Elena Rostova',
    email: 'elena@rostovagallery.com',
    phone: '(786) 552-1109',
    treatment: '3D Enamel Shade Studio & Bonding',
    consultationType: 'Virtual Video Call',
    location: 'Aventura Flagship',
    doctorPreference: 'Any Available Specialist',
    date: '2026-08-05',
    timeSlot: '11:15 AM',
    notes: 'Interested in BL1 bleach shade preview before event.',
    status: 'Confirmed',
    createdAt: '2026-07-27T16:45:00Z',
    estimatedValue: 12500,
  },
  {
    id: 'LUM-7901',
    patientName: 'Marcus Vance',
    email: 'm.vance@architecturaldigest.com',
    phone: '(305) 880-3341',
    treatment: 'Implant Crown & Bone Architecture',
    consultationType: 'In-Person Atelier',
    location: 'Coral Gables Suite',
    doctorPreference: 'Dr. Luke Grillo',
    date: '2026-08-06',
    timeSlot: '03:30 PM',
    notes: 'Previous molar extraction site needs zirconia implant restoration.',
    status: 'Pending',
    createdAt: '2026-07-29T08:00:00Z',
    estimatedValue: 9800,
  },
];

const INITIAL_LEADS: ConciergeLead[] = [
  {
    id: 'LEAD-101',
    patientName: 'Claire DuBois',
    email: 'claire@duboisdesign.co',
    phone: '(305) 772-9102',
    concern: 'Minor chipping on upper centrals & yellowing',
    shadeGoal: 'BL1 Ultra Bleach',
    estimatedBudget: '$15,000 - $30,000',
    createdAt: '2026-07-29T07:30:00Z',
    status: 'New Lead',
  },
  {
    id: 'LEAD-102',
    patientName: 'David Sterling',
    email: 'david.sterling@globalnet.com',
    phone: '(786) 331-4820',
    concern: 'Gummy smile & worn lower incisors',
    shadeGoal: 'BL2 Natural Bleach',
    estimatedBudget: '$30,000+',
    createdAt: '2026-07-28T18:10:00Z',
    status: 'Contacted',
  },
];

export function getStoredAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_APPOINTMENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
      return INITIAL_APPOINTMENTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_APPOINTMENTS;
  }
}

function generateUniqueId(prefix: string): string {
  const uuid = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID().slice(0, 8).toUpperCase() : Math.random().toString(36).slice(2, 10).toUpperCase();
  return `${prefix}-${uuid}`;
}

export function saveAppointment(app: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Appointment {
  const appointments = getStoredAppointments();
  const id = generateUniqueId('LUM');
  const feeVal = app.treatment.includes('Veneers') ? 22000 : app.treatment.includes('Rehabilitation') ? 45000 : 12000;
  
  // Calculate day of week
  let dayOfWeek = 'Monday';
  try {
    if (app.date) {
      const d = new Date(app.date);
      dayOfWeek = d.toLocaleDateString('en-US', { weekday: 'long' });
    }
  } catch (e) {
    // fallback
  }

  const newApp: Appointment = {
    ...app,
    id,
    status: 'Pending',
    createdAt: new Date().toISOString(),
    estimatedValue: feeVal,
  };

  const updated = [newApp, ...appointments];
  localStorage.setItem(STORAGE_KEY_APPOINTMENTS, JSON.stringify(updated));
  
  // Dispatch custom event for real-time reactive sync across components
  window.dispatchEvent(new CustomEvent('lumora_appointments_updated', { detail: updated }));

  // Direct Firestore Sync to 'appointments' collection with normalized admin/website payload
  try {
    const firestorePayload = {
      ...newApp,
      specialist: app.doctorPreference || 'Dr. Laura Lugo',
      doctorPreference: app.doctorPreference || 'Dr. Laura Lugo',
      estimatedFee: feeVal,
      estimatedValue: feeVal,
      dayOfWeek,
      location: app.location || 'Aventura Flagship',
    };
    setDoc(doc(db, 'appointments', newApp.id), firestorePayload).catch((err) => {
      console.warn('Firestore setDoc failed, trying addDoc:', err);
      addDoc(collection(db, 'appointments'), firestorePayload).catch(console.error);
    });
  } catch (err) {
    console.error('Error saving appointment to Firestore:', err);
  }

  return newApp;
}

export function updateAppointmentStatus(id: string, status: Appointment['status']): Appointment[] {
  const appointments = getStoredAppointments();
  const updated = appointments.map((a) => (a.id === id ? { ...a, status } : a));
  localStorage.setItem(STORAGE_KEY_APPOINTMENTS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('lumora_appointments_updated', { detail: updated }));

  try {
    setDoc(doc(db, 'appointments', id), { status }, { merge: true }).catch(console.error);
  } catch (err) {
    console.error('Error updating appointment in Firestore:', err);
  }

  return updated;
}

export function deleteAppointment(id: string): Appointment[] {
  const appointments = getStoredAppointments();
  const updated = appointments.filter((a) => a.id !== id);
  localStorage.setItem(STORAGE_KEY_APPOINTMENTS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('lumora_appointments_updated', { detail: updated }));

  // Properly remove document from Firestore database
  try {
    deleteDoc(doc(db, 'appointments', id)).catch((err) => {
      console.warn('Error deleting appointment document from Firestore:', err);
    });
  } catch (err) {
    console.error('Error deleting appointment from Firestore:', err);
  }

  return updated;
}

export function getStoredLeads(): ConciergeLead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LEADS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_LEADS;
  }
}

export function saveLead(lead: Omit<ConciergeLead, 'id' | 'createdAt' | 'status'>): ConciergeLead {
  const leads = getStoredLeads();
  const id = generateUniqueId('LEAD');
  const timestamp = new Date().toISOString();
  const newLead: ConciergeLead = {
    ...lead,
    id,
    status: 'New Lead',
    createdAt: timestamp,
  };

  const updated = [newLead, ...leads];
  localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('lumora_leads_updated', { detail: updated }));

  // Direct Firestore Sync to 'diagnostic_leads' collection with normalized admin/website payload
  try {
    const firestoreLeadPayload = {
      ...newLead,
      targetShade: lead.shadeGoal || 'BL1 Ultra Bleach',
      shadeGoal: lead.shadeGoal || 'BL1 Ultra Bleach',
      budgetEstimate: lead.estimatedBudget || '$15,000 - $25,000',
      estimatedBudget: lead.estimatedBudget || '$15,000 - $25,000',
      primaryConcern: lead.concern || 'Esthetic Smile Consultation',
      concern: lead.concern || 'Esthetic Smile Consultation',
      submittedAt: timestamp,
      createdAt: timestamp,
      locationPreference: 'Aventura Flagship',
    };
    setDoc(doc(db, 'diagnostic_leads', newLead.id), firestoreLeadPayload).catch((err) => {
      console.warn('Firestore setDoc failed for lead, trying addDoc:', err);
      addDoc(collection(db, 'diagnostic_leads'), firestoreLeadPayload).catch(console.error);
    });
  } catch (err) {
    console.error('Error saving lead to Firestore:', err);
  }

  return newLead;
}

export function updateLeadStatus(id: string, status: ConciergeLead['status']): ConciergeLead[] {
  const leads = getStoredLeads();
  const updated = leads.map((l) => (l.id === id ? { ...l, status } : l));
  localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('lumora_leads_updated', { detail: updated }));

  try {
    setDoc(doc(db, 'diagnostic_leads', id), { status }, { merge: true }).catch(console.error);
  } catch (err) {
    console.error('Error updating lead in Firestore:', err);
  }

  return updated;
}


