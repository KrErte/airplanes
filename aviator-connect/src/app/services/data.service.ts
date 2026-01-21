import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Freelancer, JobPosting, FreelancerRole, CompanyType } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private freelancersSubject = new BehaviorSubject<Freelancer[]>([]);
  private jobsSubject = new BehaviorSubject<JobPosting[]>([]);

  freelancers$ = this.freelancersSubject.asObservable();
  jobs$ = this.jobsSubject.asObservable();

  private readonly FREELANCERS_KEY = 'aviator_freelancers';
  private readonly JOBS_KEY = 'aviator_jobs';

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    const storedFreelancers = localStorage.getItem(this.FREELANCERS_KEY);
    const storedJobs = localStorage.getItem(this.JOBS_KEY);

    if (storedFreelancers) {
      this.freelancersSubject.next(JSON.parse(storedFreelancers));
    } else {
      this.freelancersSubject.next(this.getMockFreelancers());
      this.saveFreelancers();
    }

    if (storedJobs) {
      this.jobsSubject.next(JSON.parse(storedJobs));
    } else {
      this.jobsSubject.next(this.getMockJobs());
      this.saveJobs();
    }
  }

  private saveFreelancers(): void {
    localStorage.setItem(this.FREELANCERS_KEY, JSON.stringify(this.freelancersSubject.value));
  }

  private saveJobs(): void {
    localStorage.setItem(this.JOBS_KEY, JSON.stringify(this.jobsSubject.value));
  }

  addFreelancer(freelancer: Omit<Freelancer, 'id' | 'createdAt'>): Freelancer {
    const newFreelancer: Freelancer = {
      ...freelancer,
      id: this.generateId(),
      createdAt: new Date()
    };
    const current = this.freelancersSubject.value;
    this.freelancersSubject.next([newFreelancer, ...current]);
    this.saveFreelancers();
    return newFreelancer;
  }

  addJob(job: Omit<JobPosting, 'id' | 'createdAt'>): JobPosting {
    const newJob: JobPosting = {
      ...job,
      id: this.generateId(),
      createdAt: new Date()
    };
    const current = this.jobsSubject.value;
    this.jobsSubject.next([newJob, ...current]);
    this.saveJobs();
    return newJob;
  }

  getFreelancer(id: string): Freelancer | undefined {
    return this.freelancersSubject.value.find(f => f.id === id);
  }

  getJob(id: string): JobPosting | undefined {
    return this.jobsSubject.value.find(j => j.id === id);
  }

  searchFreelancers(filters: {
    role?: FreelancerRole;
    country?: string;
    typeRating?: string;
    language?: string;
    willingToTravel?: boolean;
  }): Freelancer[] {
    let results = this.freelancersSubject.value;

    if (filters.role) {
      results = results.filter(f => f.role === filters.role);
    }
    if (filters.country) {
      results = results.filter(f => f.country.toLowerCase().includes(filters.country!.toLowerCase()));
    }
    if (filters.typeRating) {
      results = results.filter(f => f.qualifications.typeRatings.some(tr =>
        tr.toLowerCase().includes(filters.typeRating!.toLowerCase())
      ));
    }
    if (filters.language) {
      results = results.filter(f => f.languages.some(l =>
        l.toLowerCase().includes(filters.language!.toLowerCase())
      ));
    }
    if (filters.willingToTravel !== undefined) {
      results = results.filter(f => f.willingToTravel === filters.willingToTravel);
    }

    return results;
  }

  searchJobs(filters: {
    role?: FreelancerRole;
    country?: string;
    companyType?: CompanyType;
    typeRating?: string;
    accommodationProvided?: boolean;
  }): JobPosting[] {
    let results = this.jobsSubject.value;

    if (filters.role) {
      results = results.filter(j => j.roleType === filters.role);
    }
    if (filters.country) {
      results = results.filter(j => j.country.toLowerCase().includes(filters.country!.toLowerCase()));
    }
    if (filters.companyType) {
      results = results.filter(j => j.companyType === filters.companyType);
    }
    if (filters.typeRating) {
      results = results.filter(j => j.requiredQualifications.typeRatings.some(tr =>
        tr.toLowerCase().includes(filters.typeRating!.toLowerCase())
      ));
    }
    if (filters.accommodationProvided !== undefined) {
      results = results.filter(j => j.accommodationProvided === filters.accommodationProvided);
    }

    return results;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  getStats(): { freelancers: number; jobs: number; companies: number; countries: number } {
    const freelancers = this.freelancersSubject.value;
    const jobs = this.jobsSubject.value;
    const companies = new Set(jobs.map(j => j.companyName)).size;
    const countries = new Set([
      ...freelancers.map(f => f.country),
      ...jobs.map(j => j.country)
    ]).size;

    return {
      freelancers: freelancers.length,
      jobs: jobs.length,
      companies: companies,
      countries: countries
    };
  }

  private getMockFreelancers(): Freelancer[] {
    return [
      {
        id: 'f1',
        name: 'Martin Tamm',
        location: 'Tallinn',
        country: 'Eesti',
        willingToTravel: true,
        role: 'part66-b1',
        qualifications: {
          typeRatings: ['A320', 'A320neo', 'B737'],
          licenses: ['EASA Part-66 B1.1', 'ETOPS'],
          certifications: ['IATA DGR']
        },
        languages: ['Eesti', 'Inglise', 'Vene'],
        availability: this.generateAvailability(0.7),
        bio: '15 aastat kogemust Airbus ja Boeing lennukite hoolduses. Töötanud Nordica, Estonian Air ja Lufthansa Technikus. Spetsialiseerunud A320 perekonna lennukitele.',
        email: 'martin.tamm@email.ee',
        phone: '+372 5123 4567',
        hourlyRate: '45-55 EUR',
        yearsExperience: 15,
        createdAt: new Date('2024-01-15')
      },
      {
        id: 'f2',
        name: 'Katrin Mägi',
        location: 'Helsinki',
        country: 'Soome',
        willingToTravel: true,
        role: 'part66-b2',
        qualifications: {
          typeRatings: ['A350', 'A330', 'B787'],
          licenses: ['EASA Part-66 B2'],
          certifications: ['ETOPS', 'PBN']
        },
        languages: ['Soome', 'Inglise', 'Rootsi'],
        availability: this.generateAvailability(0.6),
        bio: 'Avionikatehnik 12-aastase kogemusega. Spetsialiseerunud modern wide-body lennukite avioonikasüsteemidele. Finnair ja SAS kogemus.',
        email: 'katrin.magi@email.fi',
        phone: '+358 40 123 4567',
        hourlyRate: '50-60 EUR',
        yearsExperience: 12,
        createdAt: new Date('2024-02-20')
      },
      {
        id: 'f3',
        name: 'Johan Andersson',
        location: 'Stockholm',
        country: 'Rootsi',
        willingToTravel: true,
        role: 'pilot',
        qualifications: {
          typeRatings: ['A320', 'A321', 'E190/195'],
          licenses: ['ATPL(A)', 'ETOPS', 'PBN', 'LVO'],
          certifications: []
        },
        languages: ['Rootsi', 'Inglise', 'Norra'],
        availability: this.generateAvailability(0.5),
        bio: 'ATPL kapten 8000+ lennutunniga. Varasemalt SAS ja Norwegian. Praegu saadaval contract flying projektideks.',
        email: 'johan.andersson@email.se',
        phone: '+46 70 123 4567',
        hourlyRate: '150-180 EUR',
        yearsExperience: 18,
        createdAt: new Date('2024-03-10')
      },
      {
        id: 'f4',
        name: 'Sophie Müller',
        location: 'Frankfurt',
        country: 'Saksamaa',
        willingToTravel: true,
        role: 'cabin-crew',
        qualifications: {
          typeRatings: ['A380', 'A350', 'B747', 'B777'],
          licenses: ['EASA Cabin Crew Attestation'],
          certifications: ['IATA DGR']
        },
        languages: ['Saksa', 'Inglise', 'Prantsuse', 'Hispaania'],
        availability: this.generateAvailability(0.8),
        bio: 'Senior cabin crew 10+ aasta kogemusega long-haul lendudel. Lufthansa background. Keelteoskus võimaldab töötada erinevatel turgudel.',
        email: 'sophie.mueller@email.de',
        phone: '+49 170 1234567',
        yearsExperience: 10,
        createdAt: new Date('2024-01-25')
      },
      {
        id: 'f5',
        name: 'Piotr Kowalski',
        location: 'Varssavi',
        country: 'Poola',
        willingToTravel: true,
        role: 'part66-b1b2',
        qualifications: {
          typeRatings: ['B737', 'B737 MAX', 'E170/175'],
          licenses: ['EASA Part-66 B1.1', 'EASA Part-66 B2'],
          certifications: ['IATA DGR', 'ETOPS']
        },
        languages: ['Poola', 'Inglise', 'Saksa'],
        availability: this.generateAvailability(0.65),
        bio: 'Duaalne B1/B2 litsents. LOT Polish Airlines ja Enter Air kogemus. Boeing spetsialist heavy checks ja line maintenance.',
        email: 'piotr.kowalski@email.pl',
        phone: '+48 601 234 567',
        hourlyRate: '40-50 EUR',
        yearsExperience: 14,
        createdAt: new Date('2024-02-05')
      },
      {
        id: 'f6',
        name: 'Maria García',
        location: 'Madrid',
        country: 'Hispaania',
        willingToTravel: false,
        role: 'ground-ops',
        qualifications: {
          typeRatings: [],
          licenses: [],
          certifications: ['IATA DGR', 'ISAGO']
        },
        languages: ['Hispaania', 'Inglise', 'Portugali'],
        availability: this.generateAvailability(0.9),
        bio: 'Ground handling supervisor 8 aasta kogemusega Madrid-Barajas lennujaamas. Iberia ja Swissport taust. Ramp operations ja passenger handling.',
        email: 'maria.garcia@email.es',
        phone: '+34 612 345 678',
        yearsExperience: 8,
        createdAt: new Date('2024-03-01')
      },
      {
        id: 'f7',
        name: 'Luca Rossi',
        location: 'Milano',
        country: 'Itaalia',
        willingToTravel: true,
        role: 'part66-b1',
        qualifications: {
          typeRatings: ['A320', 'A319', 'ATR 42/72'],
          licenses: ['EASA Part-66 B1.1', 'EASA Part-66 B1.3'],
          certifications: []
        },
        languages: ['Itaalia', 'Inglise'],
        availability: this.generateAvailability(0.55),
        bio: 'Narrow-body ja turboprop spetsialist. Alitalia ja Air Dolomiti kogemus. Kiire õppija, paindlik ajakavaga.',
        email: 'luca.rossi@email.it',
        phone: '+39 333 123 4567',
        hourlyRate: '42-52 EUR',
        yearsExperience: 11,
        createdAt: new Date('2024-02-28')
      },
      {
        id: 'f8',
        name: 'Anna Johansson',
        location: 'Oslo',
        country: 'Norra',
        willingToTravel: true,
        role: 'dispatcher',
        qualifications: {
          typeRatings: [],
          licenses: [],
          certifications: ['Flight Dispatcher License', 'IATA DGR']
        },
        languages: ['Norra', 'Inglise', 'Rootsi', 'Taani'],
        availability: this.generateAvailability(0.75),
        bio: 'Lennudispetšer OCC kogemusega. Norwegian ja Widerøe taust. ETOPS dispatch ja irregular operations.',
        email: 'anna.johansson@email.no',
        phone: '+47 912 34 567',
        yearsExperience: 7,
        createdAt: new Date('2024-01-30')
      },
      {
        id: 'f9',
        name: 'Peter van der Berg',
        location: 'Amsterdam',
        country: 'Holland',
        willingToTravel: true,
        role: 'part66-b2',
        qualifications: {
          typeRatings: ['B777', 'B787', 'A330'],
          licenses: ['EASA Part-66 B2', 'FAA A&P License'],
          certifications: ['ETOPS']
        },
        languages: ['Hollandi', 'Inglise', 'Saksa'],
        availability: this.generateAvailability(0.6),
        bio: 'Wide-body avioonika spetsialist EASA ja FAA litsentsidega. KLM Engineering 16 aastat. IFE ja connectivity süsteemid.',
        email: 'peter.vanderberg@email.nl',
        phone: '+31 6 1234 5678',
        hourlyRate: '55-65 EUR',
        yearsExperience: 16,
        createdAt: new Date('2024-02-12')
      },
      {
        id: 'f10',
        name: 'Kristaps Berzins',
        location: 'Riia',
        country: 'Läti',
        willingToTravel: true,
        role: 'part66-b1',
        qualifications: {
          typeRatings: ['A220', 'Dash 8', 'CRJ'],
          licenses: ['EASA Part-66 B1.1'],
          certifications: ['IATA DGR']
        },
        languages: ['Läti', 'Inglise', 'Vene', 'Leedu'],
        availability: this.generateAvailability(0.85),
        bio: 'Regional jet ja turboprop tehnik. airBaltic ja Nordica kogemus. A220 programme early adopter.',
        email: 'kristaps.berzins@email.lv',
        phone: '+371 2912 3456',
        hourlyRate: '35-45 EUR',
        yearsExperience: 9,
        createdAt: new Date('2024-03-05')
      },
      {
        id: 'f11',
        name: 'Claire Dubois',
        location: 'Pariis',
        country: 'Prantsusmaa',
        willingToTravel: true,
        role: 'pilot',
        qualifications: {
          typeRatings: ['A350', 'A330', 'A320'],
          licenses: ['ATPL(A)', 'ETOPS', 'PBN', 'LVO'],
          certifications: []
        },
        languages: ['Prantsuse', 'Inglise'],
        availability: this.generateAvailability(0.4),
        bio: 'A350 First Officer, 4500 lennutundi. Air France background. Otsib long-term contract võimalusi.',
        email: 'claire.dubois@email.fr',
        phone: '+33 6 12 34 56 78',
        hourlyRate: '120-140 EUR',
        yearsExperience: 8,
        createdAt: new Date('2024-02-18')
      },
      {
        id: 'f12',
        name: 'Thomas Nielsen',
        location: 'Kopenhaagen',
        country: 'Taani',
        willingToTravel: true,
        role: 'cabin-crew',
        qualifications: {
          typeRatings: ['A320', 'A321', 'A330'],
          licenses: ['EASA Cabin Crew Attestation'],
          certifications: []
        },
        languages: ['Taani', 'Inglise', 'Saksa', 'Rootsi'],
        availability: this.generateAvailability(0.7),
        bio: 'Cabin crew purser kvalifikatsiooniga. SAS 6 aastat. Business class service ja crew training kogemus.',
        email: 'thomas.nielsen@email.dk',
        phone: '+45 20 12 34 56',
        yearsExperience: 6,
        createdAt: new Date('2024-01-22')
      },
      {
        id: 'f13',
        name: 'Elena Popescu',
        location: 'Bukarest',
        country: 'Rumeenia',
        willingToTravel: true,
        role: 'part66-b1b2',
        qualifications: {
          typeRatings: ['A320', 'B737', 'ATR 42/72'],
          licenses: ['EASA Part-66 B1.1', 'EASA Part-66 B2'],
          certifications: ['IATA DGR', 'ETOPS']
        },
        languages: ['Rumeenia', 'Inglise', 'Prantsuse', 'Itaalia'],
        availability: this.generateAvailability(0.8),
        bio: 'Dual license tehnik competitive rate\'iga. TAROM ja Blue Air kogemus. Valmis pikaajalisteks projektideks Lääne-Euroopas.',
        email: 'elena.popescu@email.ro',
        phone: '+40 721 234 567',
        hourlyRate: '35-42 EUR',
        yearsExperience: 10,
        createdAt: new Date('2024-03-08')
      },
      {
        id: 'f14',
        name: 'James O\'Brien',
        location: 'Dublin',
        country: 'Iirimaa',
        willingToTravel: true,
        role: 'part66-b1',
        qualifications: {
          typeRatings: ['B737', 'B737 MAX', 'A320'],
          licenses: ['EASA Part-66 B1.1'],
          certifications: ['ETOPS', 'IATA DGR']
        },
        languages: ['Inglise'],
        availability: this.generateAvailability(0.65),
        bio: 'Line maintenance spetsialist Ryanair ja Aer Lingus taustaga. Quick turnaround expert. AOG response kogemus.',
        email: 'james.obrien@email.ie',
        phone: '+353 87 123 4567',
        hourlyRate: '48-58 EUR',
        yearsExperience: 13,
        createdAt: new Date('2024-02-25')
      }
    ];
  }

  private getMockJobs(): JobPosting[] {
    return [
      {
        id: 'j1',
        companyName: 'Lufthansa Technik',
        companyType: 'mro',
        location: 'Hamburg',
        country: 'Saksamaa',
        roleType: 'part66-b1',
        requiredQualifications: {
          typeRatings: ['A320', 'A320neo'],
          licenses: ['EASA Part-66 B1.1'],
          certifications: []
        },
        requiredLanguages: ['Inglise', 'Saksa'],
        startDate: '2024-04-01',
        endDate: '2024-09-30',
        accommodationProvided: true,
        travelProvided: true,
        description: 'Otsime kogenud B1 tehnikuid A320 perekonna heavy check projektideks. 6-kuuline leping võimalusega pikendada. Töö toimub meie Hamburgi baasis.',
        contactEmail: 'recruiting@lht.de',
        contactPhone: '+49 40 5070 0',
        salary: '50-60 EUR/h',
        urgent: false,
        createdAt: new Date('2024-03-15')
      },
      {
        id: 'j2',
        companyName: 'Finnair',
        companyType: 'airline',
        location: 'Helsinki',
        country: 'Soome',
        roleType: 'part66-b2',
        requiredQualifications: {
          typeRatings: ['A350'],
          licenses: ['EASA Part-66 B2'],
          certifications: ['ETOPS']
        },
        requiredLanguages: ['Inglise'],
        startDate: '2024-04-15',
        endDate: '2024-10-15',
        accommodationProvided: false,
        travelProvided: false,
        description: 'A350 avioonika spetsialist line maintenance meeskonda. Töö Helsinki-Vantaa lennujaamas. Kohalik majutus omal käel.',
        contactEmail: 'techcareers@finnair.com',
        salary: '55-65 EUR/h',
        urgent: true,
        createdAt: new Date('2024-03-18')
      },
      {
        id: 'j3',
        companyName: 'Ryanair',
        companyType: 'airline',
        location: 'Dublin',
        country: 'Iirimaa',
        roleType: 'part66-b1',
        requiredQualifications: {
          typeRatings: ['B737', 'B737 MAX'],
          licenses: ['EASA Part-66 B1.1'],
          certifications: []
        },
        requiredLanguages: ['Inglise'],
        startDate: '2024-05-01',
        endDate: '2024-08-31',
        accommodationProvided: true,
        travelProvided: true,
        description: 'Summer season B737 line maintenance contractors. Mitmed baasid üle Euroopa. Roteeruv graafik.',
        contactEmail: 'engineering.recruitment@ryanair.com',
        salary: '45-55 EUR/h',
        urgent: false,
        createdAt: new Date('2024-03-10')
      },
      {
        id: 'j4',
        companyName: 'SR Technics',
        companyType: 'mro',
        location: 'Zürich',
        country: 'Šveits',
        roleType: 'part66-b1b2',
        requiredQualifications: {
          typeRatings: ['A330', 'A340'],
          licenses: ['EASA Part-66 B1.1', 'EASA Part-66 B2'],
          certifications: []
        },
        requiredLanguages: ['Inglise'],
        startDate: '2024-04-01',
        endDate: '2024-12-31',
        accommodationProvided: true,
        travelProvided: true,
        description: 'Wide-body C-check projekt. Otsime duaalse litsentsiga tehnikuid. Šveits pakub konkurentsivõimelist palka ja elukvaliteeti.',
        contactEmail: 'careers@srtechnics.com',
        contactPhone: '+41 43 812 12 12',
        salary: '65-80 EUR/h',
        urgent: false,
        createdAt: new Date('2024-03-12')
      },
      {
        id: 'j5',
        companyName: 'Norwegian Air',
        companyType: 'airline',
        location: 'Oslo',
        country: 'Norra',
        roleType: 'cabin-crew',
        requiredQualifications: {
          typeRatings: ['B737'],
          licenses: ['EASA Cabin Crew Attestation'],
          certifications: []
        },
        requiredLanguages: ['Inglise', 'Norra'],
        startDate: '2024-06-01',
        endDate: '2024-09-15',
        accommodationProvided: false,
        travelProvided: false,
        description: 'Summer season cabin crew Oslo baasis. Skandinaavia sisesed ja Euroopa lennud. Eelnev kogemus nõutud.',
        contactEmail: 'crewrecruitment@norwegian.com',
        salary: '35-42 EUR/h + per diem',
        urgent: true,
        createdAt: new Date('2024-03-20')
      },
      {
        id: 'j6',
        companyName: 'Iberia',
        companyType: 'airline',
        location: 'Madrid',
        country: 'Hispaania',
        roleType: 'pilot',
        requiredQualifications: {
          typeRatings: ['A320', 'A321'],
          licenses: ['ATPL(A)', 'ETOPS'],
          certifications: []
        },
        requiredLanguages: ['Inglise', 'Hispaania'],
        startDate: '2024-05-01',
        endDate: '2025-04-30',
        accommodationProvided: false,
        travelProvided: false,
        description: 'A320 First Officers 12-kuuliseks lepinguks. Madrid basing. Min 1500h total time, 500h on type.',
        contactEmail: 'flightops@iberia.es',
        salary: 'Negotiable',
        urgent: false,
        createdAt: new Date('2024-03-08')
      },
      {
        id: 'j7',
        companyName: 'Swissport',
        companyType: 'handling',
        location: 'Amsterdam',
        country: 'Holland',
        roleType: 'ground-ops',
        requiredQualifications: {
          typeRatings: [],
          licenses: [],
          certifications: ['IATA DGR']
        },
        requiredLanguages: ['Inglise', 'Hollandi'],
        startDate: '2024-04-15',
        endDate: '2024-10-31',
        accommodationProvided: false,
        travelProvided: false,
        description: 'Ramp supervisors Schiphol lennujaama. Eelnev ground handling kogemus nõutud. Vahetustega töö.',
        contactEmail: 'recruitment.ams@swissport.com',
        salary: '25-32 EUR/h',
        urgent: false,
        createdAt: new Date('2024-03-14')
      },
      {
        id: 'j8',
        companyName: 'airBaltic',
        companyType: 'airline',
        location: 'Riia',
        country: 'Läti',
        roleType: 'part66-b1',
        requiredQualifications: {
          typeRatings: ['A220'],
          licenses: ['EASA Part-66 B1.1'],
          certifications: []
        },
        requiredLanguages: ['Inglise'],
        startDate: '2024-04-01',
        endDate: '2024-11-30',
        accommodationProvided: true,
        travelProvided: true,
        description: 'A220 line maintenance Riia baasis. Otsime tehnikuid kasvavasse meeskonda. A220 type training võimalik.',
        contactEmail: 'technical.recruitment@airbaltic.lv',
        contactPhone: '+371 6700 6006',
        salary: '38-48 EUR/h',
        urgent: true,
        createdAt: new Date('2024-03-19')
      },
      {
        id: 'j9',
        companyName: 'KLM Engineering',
        companyType: 'mro',
        location: 'Amsterdam',
        country: 'Holland',
        roleType: 'part66-b2',
        requiredQualifications: {
          typeRatings: ['B787'],
          licenses: ['EASA Part-66 B2'],
          certifications: ['ETOPS']
        },
        requiredLanguages: ['Inglise'],
        startDate: '2024-05-15',
        endDate: '2024-12-15',
        accommodationProvided: true,
        travelProvided: true,
        description: 'B787 avioonika heavy maintenance projekt. 7-kuuline leping competitive package\'iga. Schipholi lennujaama lähedal.',
        contactEmail: 'careers@klm-engineering.nl',
        salary: '58-68 EUR/h',
        urgent: false,
        createdAt: new Date('2024-03-16')
      },
      {
        id: 'j10',
        companyName: 'TAP Air Portugal',
        companyType: 'airline',
        location: 'Lissabon',
        country: 'Portugal',
        roleType: 'cabin-crew',
        requiredQualifications: {
          typeRatings: ['A330', 'A321'],
          licenses: ['EASA Cabin Crew Attestation'],
          certifications: []
        },
        requiredLanguages: ['Inglise', 'Portugali'],
        startDate: '2024-06-15',
        endDate: '2024-10-15',
        accommodationProvided: false,
        travelProvided: false,
        description: 'Summer reinforcement cabin crew. Long-haul ja Euroopa lennud Lissaboni baasist. Portugali keele oskus eelistatud.',
        contactEmail: 'cabincrew@tap.pt',
        salary: '32-38 EUR/h + per diem',
        urgent: false,
        createdAt: new Date('2024-03-11')
      }
    ];
  }

  private generateAvailability(probability: number): { [key: string]: boolean } {
    const availability: { [key: string]: boolean } = {};
    const today = new Date();

    for (let i = 0; i < 90; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const key = date.toISOString().split('T')[0];
      availability[key] = Math.random() < probability;
    }

    return availability;
  }
}
