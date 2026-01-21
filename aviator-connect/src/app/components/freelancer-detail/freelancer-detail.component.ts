import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Freelancer, ROLE_LABELS } from '../../models/models';

@Component({
  selector: 'app-freelancer-detail',
  standalone: true,
  imports: [CommonModule],
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
        <button (click)="goBack()" class="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Tagasi
        </button>
      </div>
    </nav>

    <div class="pt-24 pb-12 px-4" *ngIf="freelancer">
      <div class="max-w-4xl mx-auto">
        <!-- Header Card -->
        <div class="glass rounded-2xl p-8 mb-6">
          <div class="flex flex-col md:flex-row items-start gap-6">
            <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-sky-400/20 to-indigo-500/20 flex items-center justify-center flex-shrink-0">
              <span class="text-3xl font-bold text-sky-400">{{ getInitials(freelancer.name) }}</span>
            </div>
            <div class="flex-1">
              <h1 class="text-3xl font-bold text-white mb-2">{{ freelancer.name }}</h1>
              <p class="text-xl text-sky-400 mb-4">{{ getRoleLabel(freelancer.role) }}</p>

              <div class="flex flex-wrap items-center gap-4 text-slate-400">
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {{ freelancer.location }}, {{ freelancer.country }}
                </div>
                <div *ngIf="freelancer.yearsExperience" class="flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {{ freelancer.yearsExperience }} aastat kogemust
                </div>
                <div *ngIf="freelancer.hourlyRate" class="flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {{ freelancer.hourlyRate }}
                </div>
                <span *ngIf="freelancer.willingToTravel" class="flex items-center gap-1 text-emerald-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Valmis reisima
                </span>
              </div>
            </div>
            <button
              (click)="showContact = true"
              class="btn-primary px-6 py-3 rounded-xl text-white font-medium flex items-center gap-2 flex-shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Võta ühendust
            </button>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- Bio -->
          <div class="glass rounded-2xl p-6">
            <h2 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              Enesetutvustus
            </h2>
            <p class="text-slate-300 leading-relaxed">{{ freelancer.bio || 'Bio pole lisatud.' }}</p>
          </div>

          <!-- Languages -->
          <div class="glass rounded-2xl p-6">
            <h2 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
              </svg>
              Keeled
            </h2>
            <div class="flex flex-wrap gap-2">
              <span
                *ngFor="let lang of freelancer.languages"
                class="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 rounded-lg">
                {{ lang }}
              </span>
            </div>
          </div>

          <!-- Type Ratings -->
          <div class="glass rounded-2xl p-6">
            <h2 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
              Type Ratings
            </h2>
            <div class="flex flex-wrap gap-2">
              <span
                *ngFor="let rating of freelancer.qualifications.typeRatings"
                class="px-3 py-1.5 bg-sky-500/20 text-sky-300 rounded-lg">
                {{ rating }}
              </span>
              <span *ngIf="freelancer.qualifications.typeRatings.length === 0" class="text-slate-500">
                Type ratinguid pole lisatud
              </span>
            </div>
          </div>

          <!-- Licenses -->
          <div class="glass rounded-2xl p-6">
            <h2 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
              </svg>
              Litsentsid ja sertifikaadid
            </h2>
            <div class="flex flex-wrap gap-2">
              <span
                *ngFor="let license of freelancer.qualifications.licenses"
                class="px-3 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-lg">
                {{ license }}
              </span>
              <span *ngIf="freelancer.qualifications.licenses.length === 0" class="text-slate-500">
                Litsentse pole lisatud
              </span>
            </div>
          </div>
        </div>

        <!-- Availability Calendar -->
        <div class="glass rounded-2xl p-6 mt-6">
          <h2 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            Saadavus
          </h2>

          <div class="flex items-center justify-between mb-4">
            <button (click)="prevMonth()" class="p-2 text-slate-400 hover:text-white transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <span class="text-white font-medium">{{ currentMonthName }} {{ currentYear }}</span>
            <button (click)="nextMonth()" class="p-2 text-slate-400 hover:text-white transition-colors">
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
                 [class]="'aspect-square rounded-lg flex items-center justify-center text-sm ' +
                   (!day.date ? 'invisible' :
                     day.isPast ? 'text-slate-600' :
                     freelancer.availability[day.date] ? 'bg-emerald-500/30 text-emerald-300' :
                     'bg-slate-800/50 text-slate-500')">
              {{ day.day }}
            </div>
          </div>

          <div class="flex items-center gap-4 mt-4 text-sm">
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded bg-emerald-500/30"></div>
              <span class="text-slate-400">Saadaval</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded bg-slate-800/50"></div>
              <span class="text-slate-400">Pole saadaval</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Not found -->
    <div *ngIf="!freelancer && !loading" class="pt-32 px-4 text-center">
      <h2 class="text-2xl font-bold text-white mb-4">Profiili ei leitud</h2>
      <button (click)="navigateTo('/freelancers')" class="btn-primary px-6 py-3 rounded-lg text-white">
        Tagasi otsingusse
      </button>
    </div>

    <!-- Contact Modal -->
    <div *ngIf="showContact" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="glass rounded-2xl p-8 max-w-md w-full">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-white">Kontaktandmed</h3>
          <button (click)="showContact = false" class="text-slate-400 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <div class="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl">
            <div class="w-10 h-10 rounded-lg bg-sky-500/20 flex items-center justify-center">
              <svg class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <div class="text-xs text-slate-400 mb-1">Email</div>
              <div class="text-white">{{ freelancer?.email }}</div>
            </div>
          </div>

          <div *ngIf="freelancer?.phone" class="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl">
            <div class="w-10 h-10 rounded-lg bg-sky-500/20 flex items-center justify-center">
              <svg class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            </div>
            <div>
              <div class="text-xs text-slate-400 mb-1">Telefon</div>
              <div class="text-white">{{ freelancer?.phone }}</div>
            </div>
          </div>
        </div>

        <p class="text-xs text-slate-500 mt-6 text-center">
          Võta spetsialistiga otse ühendust. AviatorConnect ei vahenda suhtlust.
        </p>
      </div>
    </div>
  `
})
export class FreelancerDetailComponent implements OnInit {
  freelancer: Freelancer | null = null;
  loading = true;
  showContact = false;

  weekDays = ['E', 'T', 'K', 'N', 'R', 'L', 'P'];
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  calendarDays: { day: number; date: string; isPast: boolean }[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const freelancer = this.dataService.getFreelancer(id);
      if (freelancer) {
        this.freelancer = freelancer;
        this.generateCalendar();
      }
    }
    this.loading = false;
  }

  get currentMonthName(): string {
    const months = ['Jaanuar', 'Veebruar', 'Märts', 'Aprill', 'Mai', 'Juuni',
                    'Juuli', 'August', 'September', 'Oktoober', 'November', 'Detsember'];
    return months[this.currentMonth];
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

  getRoleLabel(role: string): string {
    return ROLE_LABELS[role as keyof typeof ROLE_LABELS] || role;
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  goBack(): void {
    this.router.navigate(['/freelancers']);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
