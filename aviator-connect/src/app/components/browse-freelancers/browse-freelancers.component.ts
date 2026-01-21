import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import {
  Freelancer,
  FreelancerRole,
  ROLE_LABELS,
  TYPE_RATINGS,
  LANGUAGES,
  EUROPEAN_COUNTRIES
} from '../../models/models';

@Component({
  selector: 'app-browse-freelancers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Navigation -->
    <nav class="glass fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3 cursor-pointer" (click)="navigateTo('/')">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
          </div>
          <span class="text-xl font-semibold gradient-text">AviatorConnect</span>
        </div>
        <div class="hidden md:flex items-center gap-6">
          <button (click)="navigateTo('/jobs')" class="text-slate-300 hover:text-white transition-colors">Tööpakkumised</button>
          <button (click)="navigateTo('/freelancers')" class="text-white font-medium">Spetsialistid</button>
        </div>
        <div class="flex items-center gap-3">
          <button (click)="navigateTo('/register-freelancer')" class="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors hidden sm:block">
            Loo profiil
          </button>
          <button (click)="navigateTo('/post-job')" class="btn-primary px-4 py-2 text-sm rounded-lg text-white font-medium">
            Postita töö
          </button>
        </div>
      </div>
    </nav>

    <div class="pt-24 pb-12 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-white mb-2">Spetsialistid</h1>
          <p class="text-slate-400">{{ filteredFreelancers.length }} profiili</p>
        </div>

        <div class="grid lg:grid-cols-4 gap-6">
          <!-- Filters Sidebar -->
          <div class="lg:col-span-1">
            <div class="glass rounded-2xl p-6 sticky top-24">
              <h3 class="text-lg font-semibold text-white mb-4">Filtrid</h3>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm text-slate-400 mb-2">Roll</label>
                  <select
                    [(ngModel)]="filters.role"
                    (ngModelChange)="applyFilters()"
                    class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-500">
                    <option value="">Kõik rollid</option>
                    <option *ngFor="let role of roleOptions" [value]="role.value">{{ role.label }}</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm text-slate-400 mb-2">Riik</label>
                  <select
                    [(ngModel)]="filters.country"
                    (ngModelChange)="applyFilters()"
                    class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-500">
                    <option value="">Kõik riigid</option>
                    <option *ngFor="let country of countries" [value]="country">{{ country }}</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm text-slate-400 mb-2">Type Rating</label>
                  <select
                    [(ngModel)]="filters.typeRating"
                    (ngModelChange)="applyFilters()"
                    class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-500">
                    <option value="">Kõik</option>
                    <option *ngFor="let rating of typeRatings" [value]="rating">{{ rating }}</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm text-slate-400 mb-2">Keel</label>
                  <select
                    [(ngModel)]="filters.language"
                    (ngModelChange)="applyFilters()"
                    class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-500">
                    <option value="">Kõik keeled</option>
                    <option *ngFor="let lang of languages" [value]="lang">{{ lang }}</option>
                  </select>
                </div>

                <div>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      [(ngModel)]="filters.willingToTravel"
                      (ngModelChange)="applyFilters()"
                      class="w-4 h-4 rounded border-slate-600 bg-slate-800 text-sky-500">
                    <span class="text-sm text-slate-300">Valmis reisima</span>
                  </label>
                </div>

                <button
                  (click)="clearFilters()"
                  class="w-full text-sm text-sky-400 hover:text-sky-300 transition-colors mt-4">
                  Tühjenda filtrid
                </button>
              </div>
            </div>
          </div>

          <!-- Freelancer Cards -->
          <div class="lg:col-span-3">
            <div class="grid md:grid-cols-2 gap-4">
              <div
                *ngFor="let freelancer of filteredFreelancers"
                (click)="viewFreelancer(freelancer.id)"
                class="glass-card rounded-xl p-6 cursor-pointer">
                <div class="flex items-start gap-4 mb-4">
                  <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-400/20 to-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <span class="text-xl font-semibold text-sky-400">{{ getInitials(freelancer.name) }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-lg font-semibold text-white truncate">{{ freelancer.name }}</h3>
                    <p class="text-sky-400 text-sm">{{ getRoleLabel(freelancer.role) }}</p>
                  </div>
                </div>

                <div class="flex flex-wrap items-center gap-3 text-sm text-slate-400 mb-4">
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    {{ freelancer.location }}, {{ freelancer.country }}
                  </div>
                  <div *ngIf="freelancer.yearsExperience" class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {{ freelancer.yearsExperience }}a kogemust
                  </div>
                </div>

                <div class="flex flex-wrap gap-1.5 mb-4">
                  <span
                    *ngFor="let rating of freelancer.qualifications.typeRatings.slice(0, 4)"
                    class="px-2 py-0.5 bg-sky-500/20 text-sky-300 text-xs rounded">
                    {{ rating }}
                  </span>
                  <span
                    *ngIf="freelancer.qualifications.typeRatings.length > 4"
                    class="px-2 py-0.5 bg-slate-700/50 text-slate-400 text-xs rounded">
                    +{{ freelancer.qualifications.typeRatings.length - 4 }}
                  </span>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      *ngFor="let lang of freelancer.languages.slice(0, 3)"
                      class="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs rounded">
                      {{ lang }}
                    </span>
                  </div>
                  <div class="flex items-center gap-2 text-xs">
                    <span *ngIf="freelancer.willingToTravel" class="text-emerald-400 flex items-center gap-1">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      Reisib
                    </span>
                    <span *ngIf="freelancer.hourlyRate" class="text-slate-400">{{ freelancer.hourlyRate }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div *ngIf="filteredFreelancers.length === 0" class="glass rounded-2xl p-12 text-center">
              <svg class="w-16 h-16 mx-auto text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <h3 class="text-lg font-medium text-white mb-2">Tulemusi ei leitud</h3>
              <p class="text-slate-400">Proovi muuta filtreid või tühjenda need</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class BrowseFreelancersComponent implements OnInit {
  freelancers: Freelancer[] = [];
  filteredFreelancers: Freelancer[] = [];

  filters = {
    role: '',
    country: '',
    typeRating: '',
    language: '',
    willingToTravel: false
  };

  roleOptions = Object.entries(ROLE_LABELS).map(([value, label]) => ({ value, label }));
  countries = EUROPEAN_COUNTRIES;
  typeRatings = TYPE_RATINGS;
  languages = LANGUAGES;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.freelancers$.subscribe(freelancers => {
      this.freelancers = freelancers;
      this.applyFilters();
    });

    this.route.queryParams.subscribe(params => {
      if (params['role']) {
        this.filters.role = params['role'];
        this.applyFilters();
      }
    });
  }

  applyFilters(): void {
    const searchFilters: any = {};

    if (this.filters.role) searchFilters.role = this.filters.role;
    if (this.filters.country) searchFilters.country = this.filters.country;
    if (this.filters.typeRating) searchFilters.typeRating = this.filters.typeRating;
    if (this.filters.language) searchFilters.language = this.filters.language;
    if (this.filters.willingToTravel) searchFilters.willingToTravel = true;

    this.filteredFreelancers = this.dataService.searchFreelancers(searchFilters);
  }

  clearFilters(): void {
    this.filters = {
      role: '',
      country: '',
      typeRating: '',
      language: '',
      willingToTravel: false
    };
    this.applyFilters();
  }

  getRoleLabel(role: FreelancerRole): string {
    return ROLE_LABELS[role] || role;
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  viewFreelancer(id: string): void {
    this.router.navigate(['/freelancer', id]);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
