import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import {
  FreelancerRole,
  ROLE_LABELS,
  TYPE_RATINGS,
  LICENSES,
  LANGUAGES,
  EUROPEAN_COUNTRIES,
  EUROPEAN_CITIES
} from '../../models/models';

@Component({
  selector: 'app-freelancer-form',
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
          <h1 class="text-3xl font-bold text-white mb-2">Loo oma profiil</h1>
          <p class="text-slate-400">Täida andmed ja hakka kohe tööpakkumisi nägema</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Basic Info -->
          <div class="glass rounded-2xl p-6">
            <h2 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              Põhiandmed
            </h2>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-slate-400 mb-1">Täisnimi *</label>
                <input
                  type="text"
                  [(ngModel)]="form.name"
                  name="name"
                  required
                  class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                  placeholder="Ees- ja perekonnanimi">
              </div>

              <div>
                <label class="block text-sm text-slate-400 mb-1">Roll *</label>
                <select
                  [(ngModel)]="form.role"
                  name="role"
                  required
                  class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors">
                  <option value="" disabled>Vali roll</option>
                  <option *ngFor="let role of roleOptions" [value]="role.value">{{ role.label }}</option>
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

              <div>
                <label class="block text-sm text-slate-400 mb-1">Kogemus (aastad)</label>
                <input
                  type="number"
                  [(ngModel)]="form.yearsExperience"
                  name="yearsExperience"
                  min="0"
                  max="50"
                  class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                  placeholder="0">
              </div>

              <div>
                <label class="block text-sm text-slate-400 mb-1">Tunnitasu (EUR)</label>
                <input
                  type="text"
                  [(ngModel)]="form.hourlyRate"
                  name="hourlyRate"
                  class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                  placeholder="nt. 45-55">
              </div>

              <div class="md:col-span-2">
                <label class="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    [(ngModel)]="form.willingToTravel"
                    name="willingToTravel"
                    class="w-5 h-5 rounded border-slate-600 bg-slate-800 text-sky-500 focus:ring-sky-500 focus:ring-offset-0">
                  <span class="text-slate-300">Olen valmis reisima teistesse riikidesse</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Qualifications -->
          <div class="glass rounded-2xl p-6">
            <h2 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
              </svg>
              Kvalifikatsioonid
            </h2>

            <div class="space-y-4">
              <div>
                <label class="block text-sm text-slate-400 mb-2">Type Ratings</label>
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
                <label class="block text-sm text-slate-400 mb-2">Litsentsid ja sertifikaadid</label>
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
                <label class="block text-sm text-slate-400 mb-2">Keeled</label>
                <div class="flex flex-wrap gap-2">
                  <button
                    *ngFor="let lang of languages"
                    type="button"
                    (click)="toggleLanguage(lang)"
                    [class]="'px-3 py-1.5 rounded-lg text-sm transition-all ' +
                      (form.languages.includes(lang)
                        ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50'
                        : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:border-slate-600')">
                    {{ lang }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Availability Calendar -->
          <div class="glass rounded-2xl p-6">
            <h2 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              Saadavus
            </h2>

            <div class="flex items-center justify-between mb-4">
              <button type="button" (click)="prevMonth()" class="p-2 text-slate-400 hover:text-white transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <span class="text-white font-medium">{{ currentMonthName }} {{ currentYear }}</span>
              <button type="button" (click)="nextMonth()" class="p-2 text-slate-400 hover:text-white transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

            <div class="grid grid-cols-7 gap-1 text-center mb-2">
              <div *ngFor="let day of weekDays" class="text-xs text-slate-500 py-2">{{ day }}</div>
            </div>

            <div class="grid grid-cols-7 gap-1">
              <div *ngFor="let day of calendarDays"
                   (click)="day.date && toggleAvailability(day.date)"
                   [class]="'calendar-day aspect-square rounded-lg flex items-center justify-center text-sm cursor-pointer ' +
                     (!day.date ? 'invisible' :
                       day.isPast ? 'text-slate-600 cursor-not-allowed' :
                       form.availability[day.date] ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50' :
                       'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50')">
                {{ day.day }}
              </div>
            </div>

            <div class="flex items-center gap-4 mt-4 text-sm">
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded bg-emerald-500/30 border border-emerald-500/50"></div>
                <span class="text-slate-400">Saadaval</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded bg-slate-800/50"></div>
                <span class="text-slate-400">Pole saadaval</span>
              </div>
            </div>
          </div>

          <!-- Bio & Contact -->
          <div class="glass rounded-2xl p-6">
            <h2 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Bio ja kontakt
            </h2>

            <div class="space-y-4">
              <div>
                <label class="block text-sm text-slate-400 mb-1">Lühike enesetutvustus</label>
                <textarea
                  [(ngModel)]="form.bio"
                  name="bio"
                  rows="4"
                  class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors resize-none"
                  placeholder="Kirjelda oma kogemust, spetsialiseerumist ja mida otsid..."></textarea>
              </div>

              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm text-slate-400 mb-1">Email *</label>
                  <input
                    type="email"
                    [(ngModel)]="form.email"
                    name="email"
                    required
                    class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                    placeholder="sinu@email.com">
                </div>

                <div>
                  <label class="block text-sm text-slate-400 mb-1">Telefon</label>
                  <input
                    type="tel"
                    [(ngModel)]="form.phone"
                    name="phone"
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
              Loo profiil
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
        <h3 class="text-xl font-semibold text-white mb-2">Profiil loodud!</h3>
        <p class="text-slate-400 mb-6">Sinu profiil on nüüd nähtav ettevõtetele. Alusta tööpakkumiste sirvimist!</p>
        <button (click)="navigateTo('/jobs')" class="btn-primary px-6 py-3 rounded-lg text-white font-medium">
          Vaata tööpakkumisi
        </button>
      </div>
    </div>
  `
})
export class FreelancerFormComponent {
  form = {
    name: '',
    role: '' as FreelancerRole | '',
    country: '',
    location: '',
    willingToTravel: true,
    yearsExperience: 0,
    hourlyRate: '',
    typeRatings: [] as string[],
    licenses: [] as string[],
    languages: ['Inglise'] as string[],
    availability: {} as { [key: string]: boolean },
    bio: '',
    email: '',
    phone: ''
  };

  roleOptions = Object.entries(ROLE_LABELS).map(([value, label]) => ({ value, label }));
  countries = EUROPEAN_COUNTRIES;
  availableCities: string[] = [];
  typeRatings = TYPE_RATINGS;
  licenses = LICENSES;
  languages = LANGUAGES;
  weekDays = ['E', 'T', 'K', 'N', 'R', 'L', 'P'];

  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  calendarDays: { day: number; date: string; isPast: boolean }[] = [];

  showSuccess = false;

  constructor(
    private router: Router,
    private dataService: DataService
  ) {
    this.generateCalendar();
  }

  get currentMonthName(): string {
    const months = ['Jaanuar', 'Veebruar', 'Märts', 'Aprill', 'Mai', 'Juuni',
                    'Juuli', 'August', 'September', 'Oktoober', 'November', 'Detsember'];
    return months[this.currentMonth];
  }

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
    const index = this.form.languages.indexOf(lang);
    if (index > -1) {
      this.form.languages.splice(index, 1);
    } else {
      this.form.languages.push(lang);
    }
  }

  generateCalendar(): void {
    this.calendarDays = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let startDay = firstDay.getDay() - 1;
    if (startDay < 0) startDay = 6;

    for (let i = 0; i < startDay; i++) {
      this.calendarDays.push({ day: 0, date: '', isPast: false });
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(this.currentYear, this.currentMonth, day);
      const dateStr = date.toISOString().split('T')[0];
      const isPast = date < today;
      this.calendarDays.push({ day, date: dateStr, isPast });
    }
  }

  prevMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }

  toggleAvailability(date: string): void {
    const day = this.calendarDays.find(d => d.date === date);
    if (day?.isPast) return;

    this.form.availability[date] = !this.form.availability[date];
  }

  isFormValid(): boolean {
    return !!(
      this.form.name &&
      this.form.role &&
      this.form.country &&
      this.form.location &&
      this.form.email
    );
  }

  onSubmit(): void {
    if (!this.isFormValid()) return;

    this.dataService.addFreelancer({
      name: this.form.name,
      location: this.form.location,
      country: this.form.country,
      willingToTravel: this.form.willingToTravel,
      role: this.form.role as FreelancerRole,
      qualifications: {
        typeRatings: this.form.typeRatings,
        licenses: this.form.licenses,
        certifications: []
      },
      languages: this.form.languages,
      availability: this.form.availability,
      bio: this.form.bio,
      email: this.form.email,
      phone: this.form.phone,
      hourlyRate: this.form.hourlyRate,
      yearsExperience: this.form.yearsExperience
    });

    this.showSuccess = true;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
