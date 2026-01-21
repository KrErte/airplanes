export interface Freelancer {
  id: string;
  name: string;
  location: string;
  country: string;
  willingToTravel: boolean;
  role: FreelancerRole;
  qualifications: Qualifications;
  languages: string[];
  availability: { [key: string]: boolean };
  bio: string;
  email: string;
  phone: string;
  hourlyRate?: string;
  yearsExperience: number;
  profileImage?: string;
  cvFileName?: string;
  cvData?: string;
  createdAt: Date;
}

export type FreelancerRole = 'technician' | 'pilot' | 'cabin-crew' | 'ground-ops';

export interface Qualifications {
  typeRatings: string[];
  licenses: string[];
  certifications: string[];
}

export interface JobPosting {
  id: string;
  companyName: string;
  location: string;
  country: string;
  roleType: FreelancerRole;
  requiredQualifications: Qualifications;
  requiredLanguages: string[];
  startDate: string;
  endDate?: string;
  accommodationProvided: boolean;
  travelProvided: boolean;
  description: string;
  contactEmail: string;
  contactPhone?: string;
  salary?: string;
  urgent: boolean;
  createdAt: Date;
}

export const ROLE_LABELS: { [key in FreelancerRole]: string } = {
  'technician': 'Tehnik (Part-66)',
  'pilot': 'Piloot',
  'cabin-crew': 'Cabin Crew',
  'ground-ops': 'Ground Operations'
};

export const TYPE_RATINGS = [
  'A320', 'A320neo', 'A330', 'A340', 'A350', 'A380',
  'B737', 'B737 MAX', 'B747', 'B757', 'B767', 'B777', 'B787',
  'E170/175', 'E190/195', 'CRJ', 'ATR 42/72', 'Dash 8',
  'Cessna Citation', 'Gulfstream', 'Bombardier Global'
];

// Licenses by role
export const TECHNICIAN_LICENSES = [
  'EASA Part-66 B1.1',
  'EASA Part-66 B1.2',
  'EASA Part-66 B1.3',
  'EASA Part-66 B1.4',
  'EASA Part-66 B2',
  'EASA Part-66 B3',
  'EASA Part-66 C',
  'FAA A&P License'
];

export const PILOT_LICENSES = [
  'ATPL(A)',
  'CPL(A)',
  'MPL',
  'PPL(A)',
  'IR(A)',
  'ATPL(H)',
  'CPL(H)',
  'PPL(H)'
];

export const CABIN_CREW_LICENSES = [
  'EASA Cabin Crew Attestation',
  'SEP (Safety Equipment & Procedures)',
  'First Aid Certificate',
  'CRM Training'
];

export const GROUND_OPS_LICENSES = [
  'IATA DGR',
  'Ramp Agent Certificate',
  'Load Control Certificate',
  'Passenger Handling Certificate',
  'Baggage Handling Certificate'
];

export const LANGUAGES = [
  'Eesti', 'Inglise', 'Saksa', 'Prantsuse', 'Hispaania',
  'Itaalia', 'Portugali', 'Hollandi', 'Poola', 'Rootsi',
  'Soome', 'Norra', 'Taani', 'Vene', 'Leedu', 'Läti'
];

export const EUROPEAN_COUNTRIES = [
  'Eesti', 'Soome', 'Rootsi', 'Norra', 'Taani',
  'Saksamaa', 'Prantsusmaa', 'Hispaania', 'Itaalia', 'Portugal',
  'Holland', 'Belgia', 'Austria', 'Šveits', 'Poola',
  'Tšehhi', 'Ungari', 'Kreeka', 'Iirimaa', 'Ühendkuningriik',
  'Leedu', 'Läti', 'Sloveenia', 'Horvaatia', 'Rumeenia'
];

export const EUROPEAN_CITIES: { [country: string]: string[] } = {
  'Eesti': ['Tallinn', 'Tartu'],
  'Soome': ['Helsinki', 'Tampere', 'Turku'],
  'Rootsi': ['Stockholm', 'Göteborg', 'Malmö'],
  'Norra': ['Oslo', 'Bergen', 'Stavanger'],
  'Taani': ['Kopenhaagen', 'Billund'],
  'Saksamaa': ['Frankfurt', 'München', 'Hamburg', 'Berliin', 'Düsseldorf'],
  'Prantsusmaa': ['Pariis', 'Lyon', 'Nice', 'Toulouse', 'Marseille'],
  'Hispaania': ['Madrid', 'Barcelona', 'Valencia', 'Malaga', 'Palma'],
  'Itaalia': ['Rooma', 'Milano', 'Napoli', 'Veneetsia'],
  'Portugal': ['Lissabon', 'Porto', 'Faro'],
  'Holland': ['Amsterdam', 'Rotterdam', 'Eindhoven'],
  'Belgia': ['Brüssel', 'Liege'],
  'Austria': ['Viin', 'Salzburg', 'Innsbruck'],
  'Šveits': ['Zürich', 'Genf', 'Basel'],
  'Poola': ['Varssavi', 'Krakow', 'Gdansk'],
  'Tšehhi': ['Praha', 'Brno'],
  'Ungari': ['Budapest'],
  'Kreeka': ['Ateena', 'Thessaloniki'],
  'Iirimaa': ['Dublin', 'Cork', 'Shannon'],
  'Ühendkuningriik': ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Glasgow'],
  'Leedu': ['Vilnius', 'Kaunas'],
  'Läti': ['Riia'],
  'Sloveenia': ['Ljubljana'],
  'Horvaatia': ['Zagreb', 'Split', 'Dubrovnik'],
  'Rumeenia': ['Bukarest', 'Cluj-Napoca']
};

// Helper to get licenses by role
export function getLicensesByRole(role: FreelancerRole): string[] {
  switch (role) {
    case 'technician': return TECHNICIAN_LICENSES;
    case 'pilot': return PILOT_LICENSES;
    case 'cabin-crew': return CABIN_CREW_LICENSES;
    case 'ground-ops': return GROUND_OPS_LICENSES;
    default: return [];
  }
}
