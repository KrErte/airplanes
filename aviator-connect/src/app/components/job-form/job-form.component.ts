import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import {
  FreelancerRole,
  CompanyType,
  ROLE_LABELS,
  COMPANY_TYPE_LABELS,
  TYPE_RATINGS,
  LICENSES,
  LANGUAGES,
  EUROPEAN_COUNTRIES,
  EUROPEAN_CITIES
} from '../../models/models';

@Component({
  selector: 'app-job-form',
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
        <button (click)="navigateTo('/')" class="text-slate-400 hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </nav>

    <div class="pt-24 pb-12 px-4">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-white mb-2">Postita tööpakkumine</h1>
          <p class="text-slate-400">Leia kvalifitseeritud spetsialiste oma projekti jaoks</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Company Info -->
          <div class="glass rounded-2xl p-6">
            <h2 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              Ettevõtte andmed
            </h2>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-slate-400 mb-1">Ettevõtte nimi *</label>
                <input
                  type="text"
                  [(ngModel)]="form.companyName"
                  name="companyName"
                  required
                  class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                  placeholder="Ettevõtte nimi">
              </div>

              <div>
                <label class="block text-sm text-slate-400 mb-1">Ettevõtte tüüp *</label>
                <select
                  [(ngModel)]="form.companyType"
                  name="companyType"
                  required
                  class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors">
                  <option value="" disabled>Vali tüüp</option>
                  <option *ngFor="let type of companyTypes" [value]="type.value">{{ type.label }}</option>
                </select>
              </div>

              <div>
                <label class="block text-sm text-slate-400 mb-1">Riik *</label>
                <select
                  [(ngModel)]="form.country"
                  name="country"
                  required
                  (ngModelChange)="onCountryChange()"
                  class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors">
                  <option value="" disabled>Vali riik</option>
                  <option *ngFor="let country of countries" [value]="country">{{ country }}</option>
                </select>
              </div>

              <div>
                <label class="block text-sm text-slate-400 mb-1">Linn *</label>
                <select
                  [(ngModel)]="form.location"
                  name="location"
                  required
                  [disabled]="!form.country"
                  class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors disabled:opacity-50">
                  <option value="" disabled>Vali linn</option>
                  <option *ngFor="let city of availableCities" [value]="city">{{ city }}</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Position Details -->
          <div class="glass rounded-2xl p-6">
            <h2 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Positsiooni detailid
            </h2>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-slate-400 mb-1">Otsitav roll *</label>
                <select
                  [(ngModel)]="form.roleType"
                  name="roleType"
                  required
                  class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors">
                  <option value="" disabled>Vali roll</option>
                  <option *ngFor="let role of roleOptions" [value]="role.value">{{ role.label }}</option>
                </select>
              </div>

              <div>
                <label class="block text-sm text-slate-400 mb-1">Palk / Tunnitasu</label>
                <input
                  type="text"
                  [(ngModel)]="form.salary"
                  name="salary"
                  class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                  placeholder="nt. 50-60 EUR/h">
              </div>

              <div>
                <label class="block text-sm text-slate-400 mb-1">Alguskuupäev *</label>
                <input
                  type="date"
                  [(ngModel)]="form.startDate"
                  name="startDate"
                  required
                  class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors">
              </div>

              <div>
                <label class="block text-sm text-slate-400 mb-1">Lõppkuupäev *</label>
                <input
                  type="date"
                  [(ngModel)]="form.endDate"
                  name="endDate"
                  required
                  class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors">
              </div>

              <div class="md:col-span-2 flex flex-wrap gap-6">
                <label class="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    [(ngModel)]="form.accommodationProvided"
                    name="accommodationProvided"
                    class="w-5 h-5 rounded border-slate-600 bg-slate-800 text-sky-500 focus:ring-sky-500 focus:ring-offset-0">
                  <span class="text-slate-300">Majutus on tagatud</span>
                </label>

                <label class="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    [(ngModel)]="form.travelProvided"
                    name="travelProvided"
                    class="w-5 h-5 rounded border-slate-600 bg-slate-800 text-sky-500 focus:ring-sky-500 focus:ring-offset-0">
                  <span class="text-slate-300">Reisikulud kaetud</span>
                </label>

                <label class="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    [(ngModel)]="form.urgent"
                    name="urgent"
                    class="w-5 h-5 rounded border-slate-600 bg-slate-800 text-amber-500 focus:ring-amber-500 focus:ring-offset-0">
                  <span class="text-slate-300">Kiire vajadus</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Requirements -->
          <div class="glass rounded-2xl p-6">
            <h2 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
              </svg>
              Nõuded
            </h2>

            <div class="space-y-4">
              <div>
                <label class="block text-sm text-slate-400 mb-2">Nõutavad Type Ratings</label>
                <div class="flex flex-wrap gap-2">
                  <button
                    *ngFor="let rating of typeRatings"
                    type="button"
                    (click)="toggleTypeRating(rating)"
                    [class]="'px-3 py-1.5 rounded-lg text-sm transition-all ' +
                      (form.typeRatings.includes(rating)
                        ? 'bg-sky-500/30 text-sky-300 border border-sky-500/50'
                        : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:border-slate-600')">
                    {{ rating }}
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-sm text-slate-400 mb-2">Nõutavad litsentsid</label>
                <div class="flex flex-wrap gap-2">
                  <button
                    *ngFor="let license of licenses"
                    type="button"
                    (click)="toggleLicense(license)"
                    [class]="'px-3 py-1.5 rounded-lg text-sm transition-all ' +
                      (form.licenses.includes(license)
                        ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-500/50'
                        : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:border-slate-600')">
                    {{ license }}
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-sm text-slate-400 mb-2">Nõutavad keeled</label>
                <div class="flex flex-wrap gap-2">
                  <button
                    *ngFor="let lang of languages"
                    type="button"
                    (click)="toggleLanguage(lang)"
                    [class]="'px-3 py-1.5 rounded-lg text-sm transition-all ' +
                      (form.requiredLanguages.includes(lang)
                        ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50'
                        : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:border-slate-600')">
                    {{ lang }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Description & Contact -->
          <div class="glass rounded-2xl p-6">
            <h2 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Kirjeldus ja kontakt
            </h2>

            <div class="space-y-4">
              <div>
                <label class="block text-sm text-slate-400 mb-1">Töö kirjeldus *</label>
                <textarea
                  [(ngModel)]="form.description"
                  name="description"
                  required
                  rows="4"
                  class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors resize-none"
                  placeholder="Kirjelda projekti, ülesandeid, töökeskkonda..."></textarea>
              </div>

              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm text-slate-400 mb-1">Kontakt email *</label>
                  <input
                    type="email"
                    [(ngModel)]="form.contactEmail"
                    name="contactEmail"
                    required
                    class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                    placeholder="hr@ettevote.com">
                </div>

                <div>
                  <label class="block text-sm text-slate-400 mb-1">Kontakt telefon</label>
                  <input
                    type="tel"
                    [(ngModel)]="form.contactPhone"
                    name="contactPhone"
                    class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
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
              class="flex-1 glass-light py-4 rounded-xl text-white font-medium hover:bg-slate-700/50 transition-all">
              Tühista
            </button>
            <button
              type="submit"
              [disabled]="!isFormValid()"
              class="flex-1 btn-primary py-4 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
              Postita tööpakkumine
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Success Modal -->
    <div *ngIf="showSuccess" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="glass rounded-2xl p-8 max-w-md w-full text-center animate-float">
        <div class="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">Tööpakkumine lisatud!</h3>
        <p class="text-slate-400 mb-6">Sinu kuulutus on nüüd nähtav freelanceritele. Sirvi ka spetsialistide profiile!</p>
        <button (click)="navigateTo('/freelancers')" class="btn-primary px-6 py-3 rounded-lg text-white font-medium">
          Vaata spetsialiste
        </button>
      </div>
    </div>
  `
})
export class JobFormComponent {
  form = {
    companyName: '',
    companyType: '' as CompanyType | '',
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
  companyTypes = Object.entries(COMPANY_TYPE_LABELS).map(([value, label]) => ({ value, label }));
  countries = EUROPEAN_COUNTRIES;
  availableCities: string[] = [];
  typeRatings = TYPE_RATINGS;
  licenses = LICENSES;
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
      this.form.companyType &&
      this.form.country &&
      this.form.location &&
      this.form.roleType &&
      this.form.startDate &&
      this.form.endDate &&
      this.form.description &&
      this.form.contactEmail
    );
  }

  onSubmit(): void {
    if (!this.isFormValid()) return;

    this.dataService.addJob({
      companyName: this.form.companyName,
      companyType: this.form.companyType as CompanyType,
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
      endDate: this.form.endDate,
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
