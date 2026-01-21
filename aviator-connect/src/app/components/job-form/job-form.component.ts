import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import {
  FreelancerRole,
  ROLE_LABELS,
  TYPE_RATINGS,
  LANGUAGES,
  EUROPEAN_COUNTRIES,
  EUROPEAN_CITIES,
  getLicensesByRole
} from '../../models/models';

@Component({
  selector: 'app-job-form',
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
          <button (click)="navigateTo('/')" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <div class="py-8 px-4 bg-gray-50 min-h-screen">
      <div class="max-w-2xl mx-auto">
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-navy-900 mb-1">Postita tööpakkumine</h1>
          <p class="text-gray-500">Leia kvalifitseeritud spetsialiste oma projekti jaoks</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Company Info -->
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="font-semibold text-navy-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              Ettevõtte andmed
            </h2>

            <div class="grid md:grid-cols-2 gap-4">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Ettevõtte nimi *</label>
                <input
                  type="text"
                  [(ngModel)]="form.companyName"
                  name="companyName"
                  required
                  class="w-full bg-white border border-gray-300 rounded px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-navy-900 transition-colors"
                  placeholder="Ettevõtte nimi">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Riik *</label>
                <select
                  [(ngModel)]="form.country"
                  name="country"
                  required
                  (ngModelChange)="onCountryChange()"
                  class="w-full bg-white border border-gray-300 rounded px-4 py-3 text-gray-900 focus:outline-none focus:border-navy-900 transition-colors">
                  <option value="" disabled>Vali riik</option>
                  <option *ngFor="let country of countries" [value]="country">{{ country }}</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Linn *</label>
                <select
                  [(ngModel)]="form.location"
                  name="location"
                  required
                  [disabled]="!form.country"
                  class="w-full bg-white border border-gray-300 rounded px-4 py-3 text-gray-900 focus:outline-none focus:border-navy-900 transition-colors disabled:bg-gray-100 disabled:text-gray-500">
                  <option value="" disabled>Vali linn</option>
                  <option *ngFor="let city of availableCities" [value]="city">{{ city }}</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Position Details -->
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="font-semibold text-navy-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Positsiooni detailid
            </h2>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Otsitav roll *</label>
                <select
                  [(ngModel)]="form.roleType"
                  name="roleType"
                  required
                  (ngModelChange)="onRoleChange()"
                  class="w-full bg-white border border-gray-300 rounded px-4 py-3 text-gray-900 focus:outline-none focus:border-navy-900 transition-colors">
                  <option value="" disabled>Vali roll</option>
                  <option *ngFor="let role of roleOptions" [value]="role.value">{{ role.label }}</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Palk / Tunnitasu</label>
                <input
                  type="text"
                  [(ngModel)]="form.salary"
                  name="salary"
                  class="w-full bg-white border border-gray-300 rounded px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-navy-900 transition-colors"
                  placeholder="nt. 50-60 EUR/h">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Alguskuupäev *</label>
                <input
                  type="date"
                  [(ngModel)]="form.startDate"
                  name="startDate"
                  required
                  class="w-full bg-white border border-gray-300 rounded px-4 py-3 text-gray-900 focus:outline-none focus:border-navy-900 transition-colors">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Lõppkuupäev <span class="text-gray-400 font-normal">(valikuline)</span></label>
                <input
                  type="date"
                  [(ngModel)]="form.endDate"
                  name="endDate"
                  class="w-full bg-white border border-gray-300 rounded px-4 py-3 text-gray-900 focus:outline-none focus:border-navy-900 transition-colors">
              </div>

              <div class="md:col-span-2 flex flex-wrap gap-6">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    [(ngModel)]="form.accommodationProvided"
                    name="accommodationProvided"
                    class="w-4 h-4 rounded border-gray-300 text-navy-900">
                  <span class="text-sm text-gray-700">Majutus on tagatud</span>
                </label>

                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    [(ngModel)]="form.travelProvided"
                    name="travelProvided"
                    class="w-4 h-4 rounded border-gray-300 text-navy-900">
                  <span class="text-sm text-gray-700">Reisikulud kaetud</span>
                </label>

                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    [(ngModel)]="form.urgent"
                    name="urgent"
                    class="w-4 h-4 rounded border-gray-300 text-amber-600">
                  <span class="text-sm text-gray-700">Kiire vajadus</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Type Ratings (only for pilots) -->
          <div *ngIf="form.roleType === 'pilot'" class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="font-semibold text-navy-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
              Nõutavad Type Ratings
            </h2>

            <div class="flex flex-wrap gap-2">
              <button
                *ngFor="let rating of typeRatings"
                type="button"
                (click)="toggleTypeRating(rating)"
                [class]="'px-3 py-1.5 rounded text-sm border transition-all ' +
                  (form.typeRatings.includes(rating)
                    ? 'bg-blue-100 text-blue-800 border-blue-300'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400')">
                {{ rating }}
              </button>
            </div>
          </div>

          <!-- Licenses (based on role) -->
          <div *ngIf="form.roleType" class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="font-semibold text-navy-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
              </svg>
              Nõutavad litsentsid
            </h2>

            <div class="flex flex-wrap gap-2">
              <button
                *ngFor="let license of availableLicenses"
                type="button"
                (click)="toggleLicense(license)"
                [class]="'px-3 py-1.5 rounded text-sm border transition-all ' +
                  (form.licenses.includes(license)
                    ? 'bg-indigo-100 text-indigo-800 border-indigo-300'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400')">
                {{ license }}
              </button>
            </div>
          </div>

          <!-- Languages -->
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="font-semibold text-navy-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
              </svg>
              Nõutavad keeled
            </h2>

            <div class="flex flex-wrap gap-2">
              <button
                *ngFor="let lang of languages"
                type="button"
                (click)="toggleLanguage(lang)"
                [class]="'px-3 py-1.5 rounded text-sm border transition-all ' +
                  (form.requiredLanguages.includes(lang)
                    ? 'bg-green-100 text-green-800 border-green-300'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400')">
                {{ lang }}
              </button>
            </div>
          </div>

          <!-- Description & Contact -->
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="font-semibold text-navy-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Kirjeldus ja kontakt
            </h2>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Töö kirjeldus *</label>
                <textarea
                  [(ngModel)]="form.description"
                  name="description"
                  required
                  rows="4"
                  class="w-full bg-white border border-gray-300 rounded px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-navy-900 transition-colors resize-none"
                  placeholder="Kirjelda projekti, ülesandeid, töökeskkonda..."></textarea>
              </div>

              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Kontakt email *</label>
                  <input
                    type="email"
                    [(ngModel)]="form.contactEmail"
                    name="contactEmail"
                    required
                    class="w-full bg-white border border-gray-300 rounded px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-navy-900 transition-colors"
                    placeholder="hr@ettevote.com">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Kontakt telefon</label>
                  <input
                    type="tel"
                    [(ngModel)]="form.contactPhone"
                    name="contactPhone"
                    class="w-full bg-white border border-gray-300 rounded px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-navy-900 transition-colors"
                    placeholder="+372 ...">
                </div>
              </div>
            </div>
          </div>

          <!-- Submit -->
          <div class="flex gap-4">
            <button
              type="button"
              (click)="navigateTo('/')"
              class="flex-1 bg-white border border-gray-300 py-4 rounded text-gray-700 font-medium hover:bg-gray-50 transition-all">
              Tühista
            </button>
            <button
              type="submit"
              [disabled]="!isFormValid()"
              class="flex-1 btn-primary py-4 rounded text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed">
              Postita tööpakkumine
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Success Modal -->
    <div *ngIf="showSuccess" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-xl">
        <div class="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-navy-900 mb-2">Tööpakkumine lisatud!</h3>
        <p class="text-gray-500 mb-6">Sinu kuulutus on nüüd nähtav freelanceritele.</p>
        <button (click)="navigateTo('/freelancers')" class="btn-primary px-6 py-2.5 rounded text-white font-medium">
          Vaata spetsialiste
        </button>
      </div>
    </div>
  `
})
export class JobFormComponent {
  form = {
    companyName: '',
    country: '',
    location: '',
    roleType: '' as FreelancerRole | '',
    salary: '',
    startDate: '',
    endDate: '',
    accommodationProvided: false,
    travelProvided: false,
    urgent: false,
    typeRatings: [] as string[],
    licenses: [] as string[],
    requiredLanguages: ['Inglise'] as string[],
    description: '',
    contactEmail: '',
    contactPhone: ''
  };

  roleOptions = Object.entries(ROLE_LABELS).map(([value, label]) => ({ value, label }));
  countries = EUROPEAN_COUNTRIES;
  availableCities: string[] = [];
  typeRatings = TYPE_RATINGS;
  availableLicenses: string[] = [];
  languages = LANGUAGES;

  showSuccess = false;

  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  onCountryChange(): void {
    this.form.location = '';
    this.availableCities = EUROPEAN_CITIES[this.form.country] || [];
  }

  onRoleChange(): void {
    // Clear existing selections when role changes
    this.form.licenses = [];
    this.form.typeRatings = [];

    // Update available licenses based on role
    if (this.form.roleType) {
      this.availableLicenses = getLicensesByRole(this.form.roleType as FreelancerRole);
    } else {
      this.availableLicenses = [];
    }
  }

  toggleTypeRating(rating: string): void {
    const index = this.form.typeRatings.indexOf(rating);
    if (index > -1) {
      this.form.typeRatings.splice(index, 1);
    } else {
      this.form.typeRatings.push(rating);
    }
  }

  toggleLicense(license: string): void {
    const index = this.form.licenses.indexOf(license);
    if (index > -1) {
      this.form.licenses.splice(index, 1);
    } else {
      this.form.licenses.push(license);
    }
  }

  toggleLanguage(lang: string): void {
    const index = this.form.requiredLanguages.indexOf(lang);
    if (index > -1) {
      this.form.requiredLanguages.splice(index, 1);
    } else {
      this.form.requiredLanguages.push(lang);
    }
  }

  isFormValid(): boolean {
    return !!(
      this.form.companyName &&
      this.form.country &&
      this.form.location &&
      this.form.roleType &&
      this.form.startDate &&
      this.form.description &&
      this.form.contactEmail
    );
  }

  onSubmit(): void {
    if (!this.isFormValid()) return;

    this.dataService.addJob({
      companyName: this.form.companyName,
      location: this.form.location,
      country: this.form.country,
      roleType: this.form.roleType as FreelancerRole,
      requiredQualifications: {
        typeRatings: this.form.typeRatings,
        licenses: this.form.licenses,
        certifications: []
      },
      requiredLanguages: this.form.requiredLanguages,
      startDate: this.form.startDate,
      endDate: this.form.endDate || undefined,
      accommodationProvided: this.form.accommodationProvided,
      travelProvided: this.form.travelProvided,
      description: this.form.description,
      contactEmail: this.form.contactEmail,
      contactPhone: this.form.contactPhone,
      salary: this.form.salary,
      urgent: this.form.urgent
    });

    this.showSuccess = true;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
