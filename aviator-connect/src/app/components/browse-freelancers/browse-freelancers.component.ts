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
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 cursor-pointer" (click)="navigateTo('/')">
            <div class="w-8 h-8 bg-navy-900 rounded flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </div>
            <span class="text-lg font-semibold text-navy-900">AviatorConnect</span>
          </div>
          <div class="hidden md:flex items-center gap-8">
            <button (click)="navigateTo('/jobs')" class="nav-link text-sm font-medium">Tööpakkumised</button>
            <button (click)="navigateTo('/freelancers')" class="text-navy-900 text-sm font-medium">Spetsialistid</button>
          </div>
          <div class="flex items-center gap-3">
            <button (click)="navigateTo('/register-freelancer')" class="btn-secondary px-4 py-2 text-sm rounded font-medium text-gray-700 hidden sm:block">
              Loo profiil
            </button>
            <button (click)="navigateTo('/post-job')" class="btn-primary px-4 py-2 text-sm rounded text-white font-medium">
              Postita töö
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="py-8 px-4 bg-gray-50 min-h-screen">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-navy-900 mb-1">Spetsialistid</h1>
          <p class="text-gray-500 text-sm">{{ filteredFreelancers.length }} profiili</p>
        </div>

        <div class="grid lg:grid-cols-4 gap-6">
          <!-- Filters Sidebar -->
          <div class="lg:col-span-1">
            <div class="bg-white border border-gray-200 rounded-lg p-5 sticky top-24">
              <h3 class="font-semibold text-navy-900 mb-4">Filtrid</h3>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Roll</label>
                  <select
                    [(ngModel)]="filters.role"
                    (ngModelChange)="applyFilters()"
                    class="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-navy-900">
                    <option value="">Kõik rollid</option>
                    <option *ngFor="let role of roleOptions" [value]="role.value">{{ role.label }}</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm text-gray-600 mb-1">Riik</label>
                  <select
                    [(ngModel)]="filters.country"
                    (ngModelChange)="applyFilters()"
                    class="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-navy-900">
                    <option value="">Kõik riigid</option>
                    <option *ngFor="let country of countries" [value]="country">{{ country }}</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm text-gray-600 mb-1">Type Rating</label>
                  <select
                    [(ngModel)]="filters.typeRating"
                    (ngModelChange)="applyFilters()"
                    class="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-navy-900">
                    <option value="">Kõik</option>
                    <option *ngFor="let rating of typeRatings" [value]="rating">{{ rating }}</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm text-gray-600 mb-1">Keel</label>
                  <select
                    [(ngModel)]="filters.language"
                    (ngModelChange)="applyFilters()"
                    class="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-navy-900">
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
                      class="w-4 h-4 rounded border-gray-300 text-navy-900">
                    <span class="text-sm text-gray-700">Valmis reisima</span>
                  </label>
                </div>

                <button
                  (click)="clearFilters()"
                  class="w-full text-sm text-navy-700 hover:text-navy-900 transition-colors mt-2">
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
                class="card rounded-lg p-5 cursor-pointer">
                <div class="flex items-start gap-3 mb-3">
                  <div class="w-12 h-12 rounded-lg bg-navy-100 flex items-center justify-center flex-shrink-0">
                    <span class="text-lg font-semibold text-navy-700">{{ getInitials(freelancer.name) }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-navy-900 truncate">{{ freelancer.name }}</h3>
                    <p class="text-blue-600 text-sm">{{ getRoleLabel(freelancer.role) }}</p>
                  </div>
                </div>

                <div class="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    {{ freelancer.location }}, {{ freelancer.country }}
                  </div>
                  <div *ngIf="freelancer.yearsExperience" class="flex items-center gap-1">
                    {{ freelancer.yearsExperience }}a kogemust
                  </div>
                </div>

                <div class="flex flex-wrap gap-1.5 mb-3">
                  <span
                    *ngFor="let rating of freelancer.qualifications.typeRatings.slice(0, 3)"
                    class="badge badge-blue">
                    {{ rating }}
                  </span>
                  <span
                    *ngIf="freelancer.qualifications.typeRatings.length > 3"
                    class="badge badge-gray">
                    +{{ freelancer.qualifications.typeRatings.length - 3 }}
                  </span>
                </div>

                <div class="flex items-center justify-between text-xs">
                  <div class="flex flex-wrap gap-1">
                    <span
                      *ngFor="let lang of freelancer.languages.slice(0, 2)"
                      class="badge badge-green">
                      {{ lang }}
                    </span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span *ngIf="freelancer.willingToTravel" class="text-green-600 flex items-center gap-1">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      Reisib
                    </span>
                    <span *ngIf="freelancer.hourlyRate" class="text-gray-500">{{ freelancer.hourlyRate }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div *ngIf="filteredFreelancers.length === 0" class="bg-white border border-gray-200 rounded-lg p-12 text-center">
              <svg class="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <h3 class="font-medium text-navy-900 mb-1">Tulemusi ei leitud</h3>
              <p class="text-gray-500 text-sm">Proovi muuta filtreid</p>
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
