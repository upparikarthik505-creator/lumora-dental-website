import { Doctor, ServiceItem, Testimonial } from '../types';
import drLauraImg from '../assets/images/dr_laura_lugo_1785589401716.jpg';
import drLukeImg from '../assets/images/dr_luke_matching_1785590745201.jpg';
import drJavierImg from '../assets/images/dr_javier_matching_1785590520579.jpg';
import drMelanieImg from '../assets/images/dr_melanie_matching_1785590534724.jpg';
import drMarcusImg from '../assets/images/dr_marcus_1785142634686.jpg';
import drSophiaImg from '../assets/images/dr_sophia_1785142651022.jpg';

export const CLINIC_INFO = {
  name: 'Aventura Dental Arts',
  tagline: 'Premier esthetic dentistry & private ceramic ateliers.',
  address: '18851 NE 29th Avenue Suite 301, Aventura, FL 33180',
  phone: '(305) 682-14-14',
  email: 'concierge@aventuradentalarts.com',
  hours: [
    { days: 'Monday – Thursday', time: '8:00 AM – 6:00 PM' },
    { days: 'Friday', time: '8:00 AM – 3:00 PM' },
    { days: 'Saturday', time: 'By Appointment' },
    { days: 'Sunday', time: 'Closed' }
  ],
  credibilityMarker: 'Over 12,000 smile restorations completed with a 99.4% ten-year ceramic longevity rate.'
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'preventive',
    name: 'Preventive Care',
    category: 'Essential Wellness',
    shortDesc: 'Early detection through quick, comfortable screenings designed to safeguard your health and peace of mind.',
    fullDesc: 'Comprehensive biological dental wellness including 3D optical oral cancer screenings, gentle piezoelectric deep cleans, and remineralizing fluoride protocols.',
    duration: '45–60 minutes per session',
    idealFor: 'Routine bi-annual maintenance, early decay detection, and periodontal health.',
    startingPrice: '$320 / visit',
    solutionsList: [
      'Oral Cancer Screenings ↗',
      'Comprehensive Exams ↗',
      'Deep Cleanings ↗',
      'Prophies ↗',
      'Fluoride Treatments ↗'
    ]
  },
  {
    id: 'veneers',
    name: 'Esthetic Dentistry',
    category: 'Cosmetic Craftsmanship',
    shortDesc: 'Custom handcrafted ceramic shells that correct discoloration, minor misalignments, and worn enamel with minimal reduction.',
    fullDesc: 'Our porcelain veneers are hand-layered by master ceramists under 20x magnification to mimic the subtle translucency and light refraction of youthful natural teeth. Designed with micro-thin precision for conservative tooth preparation.',
    duration: '2 appointments over 10 days',
    idealFor: 'Chipped teeth, stubborn discoloration, gaps, or uneven tooth shapes.',
    startingPrice: '$1,850 / tooth',
    solutionsList: [
      'Porcelain Veneers ↗',
      'Micro-Layered Bonding ↗',
      'Gingival Contouring ↗',
      'Enamel Re-contouring ↗'
    ]
  },
  {
    id: 'implants',
    name: 'Restorative Dentistry',
    category: 'Biomechanical Strength',
    shortDesc: 'Permanent bio-compatible titanium and ceramic restorations that replace missing teeth with natural strength and root stability.',
    fullDesc: 'Using 3D CBCT digital guided surgical planning, our implant restorations integrate seamlessly into your jaw structure, restoring full chewing force and preserving facial bone density.',
    duration: 'Multi-stage care over 3–6 months',
    idealFor: 'Single or multiple missing teeth requiring a permanent, lifelike solution.',
    startingPrice: '$2,400 / implant',
    solutionsList: [
      '3D CBCT Guided Implants ↗',
      'Full-Arch Restoration ↗',
      'Zirconia Crowns ↗',
      'Ceramic Inlays & Onlays ↗'
    ]
  },
  {
    id: 'whitening',
    name: 'Beyond the Smile',
    category: 'Holistic Aesthetics',
    shortDesc: 'Gentle LED brightening and facial proportion harmony treatments for complete smile symmetry.',
    fullDesc: 'A dual-action gel formulated with potassium nitrate and fluoride to protect tooth nerve structure while brightening up to 8 shades in a single relaxing 60-minute session.',
    duration: '60 minutes',
    idealFor: 'Coffee, tea, or age-related enamel yellowing seeking immediate result.',
    startingPrice: '$650 / session',
    solutionsList: [
      'LED Enamel Whitening ↗',
      'Nighttime Guard Design ↗',
      'Bite Realignment ↗',
      'Phi Ratio Assessment ↗'
    ]
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-laura',
    name: 'Dr. Laura Lugo',
    role: 'Lead Esthetic & Biomimetic Dentist',
    experienceYears: 14,
    bio: 'Specializing in esthetic smile design and conservative porcelain veneers, Dr. Lugo brings precision, artistry, and care to every patient consultation.',
    education: 'DDS, Columbia University School of Dental Medicine',
    specialties: ['Porcelain Veneers', 'Smile Architecture', 'Esthetic Care'],
    image: drLauraImg
  },
  {
    id: 'dr-luke',
    name: 'Dr. Luke Grillo',
    role: 'Surgical Implantologist & Restorative Specialist',
    experienceYears: 12,
    bio: 'Focused on advanced restorative techniques and 3D digital implantology, Dr. Grillo delivers comfortable and permanent smile reconstructions.',
    education: 'DMD, Harvard School of Dental Medicine',
    specialties: ['Dental Implants', 'Restorative Surgery', 'CBCT 3D Planning'],
    image: drLukeImg
  },
  {
    id: 'dr-javier',
    name: 'Dr. Javier Scarton',
    role: 'Director of Artisanal Ceramistry',
    experienceYears: 16,
    bio: 'Director of Ceramic Arts and fellow of the American College of Prosthodontists, Dr. Scarton ensures every porcelain crown and veneer meets master standards.',
    education: 'DDS, University of Pennsylvania School of Dental Medicine',
    specialties: ['Artisanal Ceramistry', 'Micro-thin Enamel Prep', 'Complex Reconstruction'],
    image: drJavierImg
  },
  {
    id: 'dr-melanie',
    name: 'Dr. Melanie Silvestrini',
    role: 'Biological & Facial Esthetics Specialist',
    experienceYears: 10,
    bio: 'Known for her gentle biological dental care and facial harmony assessments, Dr. Silvestrini ensures a peaceful, reassuring environment.',
    education: 'DDS, UCLA School of Dentistry',
    specialties: ['Gentle Biological Care', 'Preventive Screenings', 'Golden Ratio Aesthetics'],
    image: drMelanieImg
  },
  {
    id: 'dr-marcus',
    name: 'Dr. Marcus Vance',
    role: 'Senior Prosthodontics Director',
    experienceYears: 18,
    bio: 'Renowned specialist in complex prosthodontics, bite alignment, and high-precision ceramic restorations.',
    education: 'DDS, UCLA School of Dentistry',
    specialties: ['Complex Prosthodontics', 'Full Arch Rehab', 'Bite Realignment'],
    image: drMarcusImg
  },
  {
    id: 'dr-sophia',
    name: 'Dr. Sophia Chen',
    role: 'Orthodontic Aligners Specialist',
    experienceYears: 11,
    bio: 'Pioneer in invisible aligner therapy, airway-centered orthodontics, and smile arch widening with non-invasive protocols.',
    education: 'DDS, University of Michigan School of Dentistry',
    specialties: ['Clear Aligners', 'Airway Orthodontics', 'Smile Arch Expansion'],
    image: drSophiaImg
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    patientName: 'Julian Vance',
    treatment: 'Porcelain Veneers (8 Upper Teeth)',
    location: 'Aventura Flagship Patient',
    quote: 'I was nervous about veneers looking artificial or "overly white". Dr. Lugo took two weeks studying my smile dynamics and bite. The result looks completely natural, like the teeth I was born to have.',
    year: '2025'
  },
  {
    id: 'test-2',
    patientName: 'Maya Lin-Thornton',
    treatment: 'Molar Implant & Crown Restoration',
    location: 'Coral Gables Atelier Patient',
    quote: 'After avoiding the dentist for years due to clinical anxiety, stepping into Aventura Dental Arts felt like entering a calm spa. The procedure was explained clearly, painless, and my implant feels as strong as my real teeth.',
    year: '2025'
  },
  {
    id: 'test-3',
    patientName: 'Claire Montgomery',
    treatment: 'Professional LED Whitening & Bonding',
    location: 'Bay Harbor Islands Patient',
    quote: 'The treatment estimator on their site gave me exact numbers before I walked in. No hidden fees or awkward upsells—just incredible artistry, warm staff, and total respect for my time.',
    year: '2026'
  }
];

export const HERO_HEADLINES = [
  "A Smile You'll Actually Love.",
  "Care Without Compromise.",
  "Dentistry Crafted to Endure."
];
