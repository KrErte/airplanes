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
  createdAt: Date;
}

export type FreelancerRole = 'part66-b1' | 'part66-b2' | 'part66-b1b2' | 'pilot' | 'cabin-crew' | 'ground-ops' | 'dispatcher';

export interface Qualifications {
  typeRatings: string[];
  licenses: string[];
  certifications: string[];
}

export interface JobPosting {
  id: string;
  companyName: string;
  companyType: CompanyType;
  location: string;
  country: string;
  roleType: FreelancerRole;
  requiredQualifications: Qualifications;
  requiredLanguages: string[];
  startDate: string;
  endDate: string;
  accommodationProvided: boolean;
  travelProvided: boolean;
  description: string;
  contactEmail: string;
  contactPhone?: string;
  salary?: string;
  urgent: boolean;
  createdAt: Date;
}

export type CompanyType = 'airline' | 'mro' | 'handling' | 'charter' | 'cargo';

export const ROLE_LABELS: { [key in FreelancerRole]: string } = {
  'part66-b1': 'Part-66 B1 Tehnik',
  'part66-b2': 'Part-66 B2 Tehnik',
  'part66-b1b2': 'Part-66 B1/B2 Tehnik',
  'pilot': 'Piloot',
  'cabin-crew': 'Cabin Crew',
  'ground-ops': 'Ground Operations',
  'dispatcher': 'Flight Dispatcher'
};

export const COMPANY_TYPE_LABELS: { [key in CompanyType]: string } = {
  'airline': 'Lennufirma',
  'mro': 'MRO',
  'handling': 'Handling',
  'charter': 'Charter',
  'cargo': 'Cargo'
};

export const TYPE_RATINGS = [
  'A320', 'A320neo', 'A330', 'A340', 'A350', 'A380',
  'B737', 'B737 MAX', 'B747', 'B757', 'B767', 'B777', 'B787',
  'E170/175', 'E190/195', 'CRJ', 'ATR 42/72', 'Dash 8',
  'Cessna Citation', 'Gulfstream', 'Bombardier Global'
];

export const LICENSES = [
  'EASA Part-66 B1.1', 'EASA Part-66 B1.3', 'EASA Part-66 B2',
  'ATPL(A)', 'CPL(A)', 'MPL', 'PPL(A)',
  'EASA Cabin Crew Attestation', 'FAA A&P License',
  'IATA DGR', 'ETOPS', 'PBN', 'LVO'
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
