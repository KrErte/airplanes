import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import {
  JobPosting,
  FreelancerRole,
  CompanyType,
  ROLE_LABELS,
  COMPANY_TYPE_LABELS,
  TYPE_RATINGS,
  EUROPEAN_COUNTRIES
} from '../../models/models';

@Component({
  selector: 'app-browse-jobs',
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
          <button (click)="navigateTo('/jobs')" class="text-white font-medium">Tööpakkumised</button>
          <button (click)="navigateTo('/freelancers')" class="text-slate-300 hover:text-white transition-colors">Spetsialistid</button>
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
          <h1 class="text-3xl font-bold text-white mb-2">Tööpakkumised</h1>
          <p class="text-slate-400">{{ filteredJobs.length }} aktiivset pakkumist</p>
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
                  <label class="block text-sm text-slate-400 mb-2">Ettevõtte tüüp</label>
                  <select
                    [(ngModel)]="filters.companyType"
                    (ngModelChange)="applyFilters()"
                    class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-sky-500">
                    <option value="">Kõik tüübid</option>
                    <option *ngFor="let type of companyTypes" [value]="type.value">{{ type.label }}</option>
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
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      [(ngModel)]="filters.accommodationProvided"
                      (ngModelChange)="applyFilters()"
                      class="w-4 h-4 rounded border-slate-600 bg-slate-800 text-sky-500">
                    <span class="text-sm text-slate-300">Majutus tagatud</span>
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

          <!-- Job Cards -->
          <div class="lg:col-span-3">
            <div class="space-y-4">
              <div
                *ngFor="let job of filteredJobs"
                (click)="viewJob(job.id)"
                class="glass-card rounded-xl p-6 cursor-pointer">
                <div class="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <h3 class="text-lg font-semibold text-white">{{ getRoleLabel(job.roleType) }}</h3>
                      <span *ngIf="job.urgent" class="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full">Kiire</span>
                    </div>
                    <p class="text-sky-400 font-medium">{{ job.companyName }}</p>
                  </div>
                  <span class="px-3 py-1 bg-slate-700/50 text-slate-300 text-sm rounded-lg">
                    {{ getCompanyTypeLabel(job.companyType) }}
                  </span>
                </div>

                <div class="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-4">
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    {{ job.location }}, {{ job.country }}
                  </div>
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    {{ formatDate(job.startDate) }} - {{ formatDate(job.endDate) }}
                  </div>
                  <div *ngIf="job.salary" class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {{ job.salary }}
                  </div>
                </div>

                <div class="flex flex-wrap gap-2 mb-4">
                  <span
                    *ngFor="let rating of job.requiredQualifications.typeRatings.slice(0, 3)"
                    class="px-2 py-1 bg-sky-500/20 text-sky-300 text-xs rounded-lg">
                    {{ rating }}
                  </span>
                  <span
                    *ngIf="job.requiredQualifications.typeRatings.length > 3"
                    class="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-lg">
                    +{{ job.requiredQualifications.typeRatings.length - 3 }}
                  </span>
                </div>

                <div class="flex items-center gap-4 text-xs">
                  <span *ngIf="job.accommodationProvided" class="flex items-center gap-1 text-emerald-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Majutus
                  </span>
                  <span *ngIf="job.travelProvided" class="flex items-center gap-1 text-emerald-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Reisikulud
                  </span>
                </div>
              </div>

              <div *ngIf="filteredJobs.length === 0" class="glass rounded-2xl p-12 text-center">
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
    </div>
  `
})
export class BrowseJobsComponent implements OnInit {
  jobs: JobPosting[] = [];
  filteredJobs: JobPosting[] = [];

  filters = {
    role: '',
    country: '',
    companyType: '',
    typeRating: '',
    accommodationProvided: false
  };

  roleOptions = Object.entries(ROLE_LABELS).map(([value, label]) => ({ value, label }));
  companyTypes = Object.entries(COMPANY_TYPE_LABELS).map(([value, label]) => ({ value, label }));
  countries = EUROPEAN_COUNTRIES;
  typeRatings = TYPE_RATINGS;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.jobs$.subscribe(jobs => {
      this.jobs = jobs;
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
    if (this.filters.companyType) searchFilters.companyType = this.filters.companyType;
    if (this.filters.typeRating) searchFilters.typeRating = this.filters.typeRating;
    if (this.filters.accommodationProvided) searchFilters.accommodationProvided = true;

    this.filteredJobs = this.dataService.searchJobs(searchFilters);
  }

  clearFilters(): void {
    this.filters = {
      role: '',
      country: '',
      companyType: '',
      typeRating: '',
      accommodationProvided: false
    };
    this.applyFilters();
  }

  getRoleLabel(role: FreelancerRole): string {
    return ROLE_LABELS[role] || role;
  }

  getCompanyTypeLabel(type: CompanyType): string {
    return COMPANY_TYPE_LABELS[type] || type;
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('et-EE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  viewJob(id: string): void {
    this.router.navigate(['/job', id]);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
