import { useState, useEffect } from 'react';
import { db, collection, setDoc, doc, deleteDoc, onSnapshot } from '../lib/firebase';
import { Doctor } from '../types';
import drLauraImg from '../assets/images/dr_laura_lugo_1785589401716.jpg';
import drLukeImg from '../assets/images/dr_luke_matching_1785590745201.jpg';
import drJavierImg from '../assets/images/dr_javier_matching_1785590520579.jpg';
import drMelanieImg from '../assets/images/dr_melanie_matching_1785590534724.jpg';
import drMarcusImg from '../assets/images/dr_marcus_1785142634686.jpg';
import drSophiaImg from '../assets/images/dr_sophia_1785142651022.jpg';

export interface ExtendedDoctor extends Doctor {
  credentials?: string[];
  casesCompleted?: string;
  signatureTechnique?: string;
  locationPreference?: string;
  availabilityStatus?: 'Available Today' | 'Next Week' | 'By Appointment';
}

export const PRESET_DOCTOR_PORTRAITS = [
  { id: 'dr-laura', name: 'Dr. Laura Lugo', role: 'Lead Esthetic & Biomimetic Dentist', url: drLauraImg },
  { id: 'dr-luke', name: 'Dr. Luke Grillo', role: 'Surgical Implantologist & Restorative Specialist', url: drLukeImg },
  { id: 'dr-javier', name: 'Dr. Javier Scarton', role: 'Director of Artisanal Ceramistry', url: drJavierImg },
  { id: 'dr-melanie', name: 'Dr. Melanie Silvestrini', role: 'Biological & Facial Esthetics Specialist', url: drMelanieImg },
  { id: 'dr-marcus', name: 'Dr. Marcus Vance', role: 'Senior Prosthodontics Director', url: drMarcusImg },
  { id: 'dr-sophia', name: 'Dr. Sophia Chen', role: 'Orthodontic Aligners Specialist', url: drSophiaImg },
];

export function resolveDoctorImage(rawImgUrl: string | undefined, docId?: string, docName?: string): string {
  const lowerId = (docId || '').toLowerCase();
  const lowerName = (docName || '').toLowerCase();
  const lowerImg = (rawImgUrl || '').toLowerCase();

  // Explicit mapping for the 6 master doctors to guarantee exact matching portraits
  if (lowerId.includes('laura') || lowerName.includes('laura') || lowerImg.includes('laura')) return drLauraImg;
  if (lowerId.includes('luke') || lowerName.includes('luke') || lowerImg.includes('luke')) return drLukeImg;
  if (lowerId.includes('javier') || lowerName.includes('javier') || lowerImg.includes('javier')) return drJavierImg;
  if (lowerId.includes('melanie') || lowerName.includes('melanie') || lowerImg.includes('melanie')) return drMelanieImg;
  if (lowerId.includes('marcus') || lowerName.includes('marcus') || lowerImg.includes('marcus')) return drMarcusImg;
  if (lowerId.includes('sophia') || lowerName.includes('sophia') || lowerImg.includes('sophia')) return drSophiaImg;

  // Custom uploaded base64 data URLs or specific blob/http URLs
  if (rawImgUrl && (rawImgUrl.startsWith('data:image/') || rawImgUrl.startsWith('blob:') || rawImgUrl.startsWith('/assets/'))) {
    return rawImgUrl;
  }
  if (rawImgUrl && (rawImgUrl.startsWith('http://') || rawImgUrl.startsWith('https://'))) {
    if (!rawImgUrl.includes('photo-1559839734-2b71ea197ec2')) {
      return rawImgUrl;
    }
  }

  // Fallback to one of the 6 doctor portraits deterministically
  const key = (docName || docId || 'doctor').toLowerCase();
  let charSum = 0;
  for (let i = 0; i < key.length; i++) charSum += key.charCodeAt(i);
  const fallbacks = [drLauraImg, drLukeImg, drJavierImg, drMelanieImg, drMarcusImg, drSophiaImg];
  return fallbacks[charSum % fallbacks.length];
}

export const INITIAL_DOCTORS: ExtendedDoctor[] = [
  {
    id: 'dr-laura',
    name: 'Dr. Laura Lugo',
    role: 'Lead Esthetic & Biomimetic Dentist',
    experienceYears: 14,
    bio: 'Specializing in esthetic smile design and conservative porcelain veneers, Dr. Lugo combines facial symmetry physics with hand-crafted ceramic artistry.',
    education: 'DDS, Columbia University School of Dental Medicine',
    specialties: ['Porcelain Veneers', 'Smile Architecture', 'Esthetic Care'],
    credentials: ['AACD Accredited Fellow', 'ICOI Implant Diplomate', 'Columbia Dental Medicine Alumna'],
    casesCompleted: '1,200+ Porcelain Transformations',
    signatureTechnique: 'Facial-Guided Phi Ratio Enamel Sculpting',
    locationPreference: 'Aventura Flagship',
    availabilityStatus: 'Available Today',
    image: drLauraImg,
  },
  {
    id: 'dr-luke',
    name: 'Dr. Luke Grillo',
    role: 'Surgical Implantologist & Restorative Specialist',
    experienceYears: 12,
    bio: 'Focused on advanced restorative techniques and 3D digital implantology, Dr. Grillo delivers comfortable, durable, and permanent smile reconstructions.',
    education: 'DMD, Harvard School of Dental Medicine',
    specialties: ['Dental Implants', 'Restorative Surgery', 'CBCT 3D Planning'],
    credentials: ['Board Certified Implantologist', 'Harvard School of Dental Medicine'],
    casesCompleted: '2,100+ Precision Implant Restorations',
    signatureTechnique: 'Sub-Millimeter Guided Zirconia Placement',
    locationPreference: 'Bay Harbor Islands',
    availabilityStatus: 'Available Today',
    image: drLukeImg,
  },
  {
    id: 'dr-javier',
    name: 'Dr. Javier Scarton',
    role: 'Director of Artisanal Ceramistry',
    experienceYears: 16,
    bio: 'Director of Ceramic Arts and fellow of the American College of Prosthodontists, Dr. Scarton ensures every porcelain crown and veneer meets master standards.',
    education: 'DDS, University of Pennsylvania School of Dental Medicine',
    specialties: ['Artisanal Ceramistry', 'Micro-thin Enamel Prep', 'Complex Reconstruction'],
    credentials: ['Master Guild Ceramist', 'UPenn School of Dental Medicine Fellow'],
    casesCompleted: '15,000+ Individual Ceramic Units Fired',
    signatureTechnique: '3D Multi-Layer Opalescent Staining',
    locationPreference: 'Aventura Flagship',
    availabilityStatus: 'Next Week',
    image: drJavierImg,
  },
  {
    id: 'dr-melanie',
    name: 'Dr. Melanie Silvestrini',
    role: 'Biological & Facial Esthetics Specialist',
    experienceYears: 10,
    bio: 'Known for her gentle biological dental care and facial harmony assessments, Dr. Silvestrini ensures a peaceful, reassuring environment.',
    education: 'DDS, UCLA School of Dentistry',
    specialties: ['Gentle Biological Care', 'Preventive Screenings', 'Golden Ratio Aesthetics'],
    credentials: ['UCLA School of Dentistry', 'Holistic Dental Association Fellow'],
    casesCompleted: '950+ Biological Restorations',
    signatureTechnique: 'Golden Ratio Biomimetic Polish',
    locationPreference: 'Coral Gables Suite',
    availabilityStatus: 'Available Today',
    image: drMelanieImg,
  },
  {
    id: 'dr-marcus',
    name: 'Dr. Marcus Vance',
    role: 'Senior Prosthodontics Director',
    experienceYears: 18,
    bio: 'Renowned specialist in complex prosthodontics, bite alignment, and high-precision full arch ceramic restorations.',
    education: 'DDS, UCLA School of Dentistry',
    specialties: ['Complex Prosthodontics', 'Full Arch Rehab', 'Bite Realignment'],
    credentials: ['Board Certified Prosthodontist', 'UCLA Dentistry Alumnus'],
    casesCompleted: '3,400+ Full Arch Restorations',
    signatureTechnique: 'Dynamic Occlusal Vector Reconstruction',
    locationPreference: 'Aventura Flagship',
    availabilityStatus: 'Available Today',
    image: drMarcusImg,
  },
  {
    id: 'dr-sophia',
    name: 'Dr. Sophia Chen',
    role: 'Orthodontic Aligners Specialist',
    experienceYears: 11,
    bio: 'Pioneer in invisible aligner therapy, airway-centered orthodontics, and smile arch widening with non-invasive protocols.',
    education: 'DDS, University of Michigan School of Dentistry',
    specialties: ['Clear Aligners', 'Airway Orthodontics', 'Smile Arch Expansion'],
    credentials: ['Invisalign Gold Diamond Provider', 'AAO Fellow'],
    casesCompleted: '1,800+ Aligner Transformations',
    signatureTechnique: 'Micro-Targeted Enamel Arch Widening',
    locationPreference: 'Bay Harbor Islands',
    availabilityStatus: 'Next Week',
    image: drSophiaImg,
  },
];

const STORAGE_KEY_DOCTORS = 'aventura_dental_doctors_v2';

export function getStoredDoctors(): ExtendedDoctor[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DOCTORS);
    if (!raw) {
      return INITIAL_DOCTORS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return INITIAL_DOCTORS;
    }
    return parsed;
  } catch (e) {
    return INITIAL_DOCTORS;
  }
}

export async function saveDoctor(doctorToSave: ExtendedDoctor): Promise<void> {
  // Direct Firestore write to 'doctors' collection
  try {
    await setDoc(doc(db, 'doctors', doctorToSave.id), { ...doctorToSave }, { merge: true });
  } catch (err) {
    console.error('Error saving doctor to Firestore:', err);
  }

  // Update local storage fallback as well
  const currentDoctors = getStoredDoctors();
  const existingIndex = currentDoctors.findIndex((d) => d.id === doctorToSave.id);
  let updated: ExtendedDoctor[];
  if (existingIndex >= 0) {
    updated = [...currentDoctors];
    updated[existingIndex] = doctorToSave;
  } else {
    updated = [doctorToSave, ...currentDoctors];
  }
  localStorage.setItem(STORAGE_KEY_DOCTORS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('aventura_doctors_updated', { detail: updated }));
}

export async function deleteDoctor(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'doctors', id));
  } catch (err) {
    console.error('Error deleting doctor from Firestore:', err);
  }

  const currentDoctors = getStoredDoctors();
  const updated = currentDoctors.filter((d) => d.id !== id);
  localStorage.setItem(STORAGE_KEY_DOCTORS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('aventura_doctors_updated', { detail: updated }));
}

export async function resetDoctorsToDefault(): Promise<void> {
  try {
    for (const docToSave of INITIAL_DOCTORS) {
      await setDoc(doc(db, 'doctors', docToSave.id), { ...docToSave }, { merge: true });
    }
  } catch (e) {
    console.warn('Failed to reset doctors in Firestore:', e);
  }
  localStorage.setItem(STORAGE_KEY_DOCTORS, JSON.stringify(INITIAL_DOCTORS));
  window.dispatchEvent(new CustomEvent('aventura_doctors_updated', { detail: INITIAL_DOCTORS }));
}

export function useDoctors() {
  const [doctors, setDoctors] = useState<ExtendedDoctor[]>(getStoredDoctors);
  const [loading, setLoading] = useState<boolean>(true);
  const [dbConnected, setDbConnected] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    // Real-time listener for Firestore 'doctors' collection
    const unsubscribe = onSnapshot(
      collection(db, 'doctors'),
      (snapshot) => {
        if (!isMounted) return;
        setDbConnected(true);
        setLoading(false);

        if (snapshot.empty) {
          // Database is empty for first run - seed initial doctors into Firestore
          INITIAL_DOCTORS.forEach((d) => {
            setDoc(doc(db, 'doctors', d.id), { ...d }, { merge: true }).catch(console.error);
          });
          setDoctors(INITIAL_DOCTORS);
          localStorage.setItem(STORAGE_KEY_DOCTORS, JSON.stringify(INITIAL_DOCTORS));
        } else {
          const fetchedDoctors: ExtendedDoctor[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data() as Partial<ExtendedDoctor>;
            const docId = docSnap.id || data.id || `dr-${Math.random().toString(36).substring(2, 7)}`;
            
            // Normalize specialties & credentials
            let specs: string[] = ['Cosmetic Dentistry'];
            if (Array.isArray(data.specialties)) {
              specs = data.specialties.filter(Boolean);
            } else if (typeof data.specialties === 'string') {
              specs = (data.specialties as string).split(',').map((s) => s.trim()).filter(Boolean);
            }

            let creds: string[] = ['AACD Member'];
            if (Array.isArray(data.credentials)) {
              creds = data.credentials.filter(Boolean);
            } else if (typeof data.credentials === 'string') {
              creds = (data.credentials as string).split(',').map((c) => c.trim()).filter(Boolean);
            }

            // Normalize image using resolveDoctorImage
            const imgUrl = resolveDoctorImage(data.image, docId, data.name);

            fetchedDoctors.push({
              id: docId,
              name: data.name || 'Specialist Dentist',
              role: data.role || 'Cosmetic Dentist & Ceramist',
              experienceYears: Number(data.experienceYears) || 10,
              bio: data.bio || 'Experienced dental specialist committed to natural esthetic results.',
              education: data.education || 'DDS Specialist',
              specialties: specs,
              credentials: creds,
              casesCompleted: data.casesCompleted || '1,000+ Restorations',
              signatureTechnique: data.signatureTechnique || 'Biomimetic Enamel Sculpting',
              locationPreference: data.locationPreference || 'Aventura Flagship',
              availabilityStatus: data.availabilityStatus || 'Available Today',
              image: imgUrl,
            });
          });
          setDoctors(fetchedDoctors);
          localStorage.setItem(STORAGE_KEY_DOCTORS, JSON.stringify(fetchedDoctors));
        }
      },
      (error) => {
        console.warn('Firestore doctors snapshot listener error:', error);
        if (isMounted) {
          setDbConnected(false);
          setLoading(false);
        }
      }
    );

    const handleLocalUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<ExtendedDoctor[]>;
      if (customEvent.detail && isMounted) {
        setDoctors(customEvent.detail);
      }
    };

    window.addEventListener('aventura_doctors_updated', handleLocalUpdate);

    return () => {
      isMounted = false;
      unsubscribe();
      window.removeEventListener('aventura_doctors_updated', handleLocalUpdate);
    };
  }, []);

  return {
    doctors,
    loading,
    dbConnected,
    saveDoctor: (docToSave: ExtendedDoctor) => saveDoctor(docToSave),
    deleteDoctor: (id: string) => deleteDoctor(id),
    resetDoctors: () => resetDoctorsToDefault(),
  };
}

