export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  duration: string;
  idealFor: string;
  startingPrice: string;
  solutionsList?: string[];
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  bio: string;
  education: string;
  specialties: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  treatment: string;
  location: string;
  quote: string;
  year: string;
}

export interface EstimatorOption {
  treatment: string;
  pricePerUnit: number;
  unitLabel: string;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  treatment: string;
  preferredDate: string;
  notes: string;
}
