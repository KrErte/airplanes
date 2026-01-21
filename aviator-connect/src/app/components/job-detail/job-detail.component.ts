import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { JobPosting, ROLE_LABELS } from '../../models/models';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule],
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
          <button (click)="goBack()" class="text-gray-500 hover:text-navy-900 transition-colors flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Tagasi
          </button>
        </div>
      </div>
    </nav>

    <div class="py-8 px-4 bg-gray-50 min-h-screen" *ngIf="job">
      <div class="max-w-4xl mx-auto">
        <!-- Header Card -->
        <div class="bg-white border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
          <div class="flex flex-col md:flex-row items-start gap-6">
            <div class="w-16 h-16 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h1 class="text-2xl font-bold text-navy-900">{{ getRoleLabel(job.roleType) }}</h1>
                <span *ngIf="job.urgent" class="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded font-medium">
                  Kiire
                </span>
              </div>
              <p class="text-lg text-blue-600 mb-1">{{ job.companyName }}</p>

              <div class="flex flex-wrap items-center gap-4 text-gray-500 text-sm mt-4">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {{ job.location }}, {{ job.country }}
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  {{ formatDate(job.startDate) }}{{ job.endDate ? ' - ' + formatDate(job.endDate) : '' }}
                </div>
                <div *ngIf="job.salary" class="flex items-center gap-2 text-green-600 font-medium">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {{ job.salary }}
                </div>
              </div>
            </div>
            <button
              (click)="showContact = true"
              class="btn-primary px-6 py-3 rounded text-white font-medium flex items-center gap-2 flex-shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Kandideeri
            </button>
          </div>
        </div>

        <!-- Benefits row -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div [class]="'w-10 h-10 mx-auto rounded-lg flex items-center justify-center mb-2 ' +
              (job.accommodationProvided ? 'bg-green-100' : 'bg-gray-100')">
              <svg [class]="'w-5 h-5 ' + (job.accommodationProvided ? 'text-green-600' : 'text-gray-400')" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
            </div>
            <div class="text-sm font-medium" [class]="job.accommodationProvided ? 'text-navy-900' : 'text-gray-400'">Majutus</div>
            <div class="text-xs" [class]="job.accommodationProvided ? 'text-green-600' : 'text-gray-400'">
              {{ job.accommodationProvided ? 'Tagatud' : 'Pole tagatud' }}
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div [class]="'w-10 h-10 mx-auto rounded-lg flex items-center justify-center mb-2 ' +
              (job.travelProvided ? 'bg-green-100' : 'bg-gray-100')">
              <svg [class]="'w-5 h-5 ' + (job.travelProvided ? 'text-green-600' : 'text-gray-400')" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </div>
            <div class="text-sm font-medium" [class]="job.travelProvided ? 'text-navy-900' : 'text-gray-400'">Reisikulud</div>
            <div class="text-xs" [class]="job.travelProvided ? 'text-green-600' : 'text-gray-400'">
              {{ job.travelProvided ? 'Kaetud' : 'Pole kaetud' }}
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div class="w-10 h-10 mx-auto rounded-lg bg-blue-100 flex items-center justify-center mb-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <div class="text-sm font-medium text-navy-900">Kestus</div>
            <div class="text-xs text-blue-600">{{ calculateDuration() }}</div>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div class="w-10 h-10 mx-auto rounded-lg bg-indigo-100 flex items-center justify-center mb-2">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div class="text-sm font-medium text-navy-900">Asukoht</div>
            <div class="text-xs text-indigo-600">{{ job.location }}</div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- Description -->
          <div class="bg-white border border-gray-200 rounded-lg p-6 md:col-span-2">
            <h2 class="text-lg font-semibold text-navy-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Töö kirjeldus
            </h2>
            <p class="text-gray-600 leading-relaxed whitespace-pre-line">{{ job.description }}</p>
          </div>

          <!-- Required Type Ratings -->
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-lg font-semibold text-navy-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
              Nõutavad Type Ratings
            </h2>
            <div class="flex flex-wrap gap-2">
              <span
                *ngFor="let rating of job.requiredQualifications.typeRatings"
                class="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-sm">
                {{ rating }}
              </span>
              <span *ngIf="job.requiredQualifications.typeRatings.length === 0" class="text-gray-400 text-sm">
                Pole spetsifitseeritud
              </span>
            </div>
          </div>

          <!-- Required Licenses -->
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-lg font-semibold text-navy-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
              </svg>
              Nõutavad litsentsid
            </h2>
            <div class="flex flex-wrap gap-2">
              <span
                *ngFor="let license of job.requiredQualifications.licenses"
                class="px-3 py-1.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded text-sm">
                {{ license }}
              </span>
              <span *ngIf="job.requiredQualifications.licenses.length === 0" class="text-gray-400 text-sm">
                Pole spetsifitseeritud
              </span>
            </div>
          </div>

          <!-- Required Languages -->
          <div class="bg-white border border-gray-200 rounded-lg p-6 md:col-span-2">
            <h2 class="text-lg font-semibold text-navy-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
              </svg>
              Nõutavad keeled
            </h2>
            <div class="flex flex-wrap gap-2">
              <span
                *ngFor="let lang of job.requiredLanguages"
                class="px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded text-sm">
                {{ lang }}
              </span>
              <span *ngIf="job.requiredLanguages.length === 0" class="text-gray-400 text-sm">
                Pole spetsifitseeritud
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Not found -->
    <div *ngIf="!job && !loading" class="py-32 px-4 text-center bg-gray-50 min-h-screen">
      <h2 class="text-2xl font-bold text-navy-900 mb-4">Tööpakkumist ei leitud</h2>
      <button (click)="navigateTo('/jobs')" class="btn-primary px-6 py-3 rounded text-white">
        Tagasi otsingusse
      </button>
    </div>

    <!-- Contact Modal -->
    <div *ngIf="showContact" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-navy-900">Kontaktandmed</h3>
          <button (click)="showContact = false" class="text-gray-400 hover:text-navy-900 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="mb-4">
          <div class="text-gray-500 text-sm mb-1">Ettevõte</div>
          <div class="text-navy-900 font-medium">{{ job?.companyName }}</div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <div class="text-xs text-gray-500 mb-1">Email</div>
              <div class="text-navy-900">{{ job?.contactEmail }}</div>
            </div>
          </div>

          <div *ngIf="job?.contactPhone" class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            </div>
            <div>
              <div class="text-xs text-gray-500 mb-1">Telefon</div>
              <div class="text-navy-900">{{ job?.contactPhone }}</div>
            </div>
          </div>
        </div>

        <p class="text-xs text-gray-400 mt-6 text-center">
          Võta ettevõttega otse ühendust. AviatorConnect ei vahenda suhtlust ega kandideerimiski protsessi.
        </p>
      </div>
    </div>
  `
})
export class JobDetailComponent implements OnInit {
  job: JobPosting | null = null;
  loading = true;
  showContact = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const job = this.dataService.getJob(id);
      if (job) {
        this.job = job;
      }
    }
    this.loading = false;
  }

  getRoleLabel(role: string): string {
    return ROLE_LABELS[role as keyof typeof ROLE_LABELS] || role;
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('et-EE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  calculateDuration(): string {
    if (!this.job) return '';
    const start = new Date(this.job.startDate);

    if (!this.job.endDate) {
      return 'Tähtajatu';
    }

    const end = new Date(this.job.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffDays / 30);
    if (months > 0) {
      return `~${months} kuud`;
    }
    return `${diffDays} päeva`;
  }

  goBack(): void {
    this.router.navigate(['/jobs']);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
