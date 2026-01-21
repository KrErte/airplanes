import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-landing',
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
          <div class="hidden md:flex items-center gap-8">
            <button (click)="navigateTo('/jobs')" class="nav-link text-sm font-medium">Tööpakkumised</button>
            <button (click)="navigateTo('/freelancers')" class="nav-link text-sm font-medium">Spetsialistid</button>
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

    <!-- Hero Section -->
    <section class="bg-white border-b border-gray-200">
      <div class="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div class="max-w-3xl">
          <h1 class="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Euroopa lennunduse freelance platvorm
          </h1>
          <p class="text-lg text-gray-600 mb-8">
            Ühendame kvalifitseeritud lennundusspetsialistid ettevõtetega, kes vajavad ajutist tööjõudu. Tehnikud, piloodid, cabin crew ja ground ops.
          </p>
          <div class="flex flex-col sm:flex-row gap-3">
            <button
              (click)="navigateTo('/register-freelancer')"
              class="btn-primary px-6 py-3 rounded text-white font-medium flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              Olen freelancer
            </button>
            <button
              (click)="navigateTo('/post-job')"
              class="btn-secondary px-6 py-3 rounded font-medium flex items-center justify-center gap-2 text-gray-700">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Otsin spetsialisti
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-12 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-3xl font-bold text-navy-900">{{ stats.freelancers }}+</div>
            <div class="text-sm text-gray-500 mt-1">Spetsialisti</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-navy-900">{{ stats.jobs }}+</div>
            <div class="text-sm text-gray-500 mt-1">Aktiivset tööd</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-navy-900">{{ stats.companies }}+</div>
            <div class="text-sm text-gray-500 mt-1">Ettevõtet</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-navy-900">{{ stats.countries }}+</div>
            <div class="text-sm text-gray-500 mt-1">Riiki</div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-navy-900 text-center mb-2">Kuidas see töötab?</h2>
        <p class="text-gray-500 text-center mb-12">Lihtne ja kiire viis leida oma järgmine projekt või kandidaat</p>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- For Freelancers -->
          <div class="card rounded-lg p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-navy-900">Freelanceritele</h3>
            </div>
            <ol class="space-y-3 text-gray-600 text-sm mb-6">
              <li class="flex gap-3">
                <span class="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">1</span>
                <span>Loo oma profiil kvalifikatsioonide ja saadavusega</span>
              </li>
              <li class="flex gap-3">
                <span class="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">2</span>
                <span>Sirvi tööpakkumisi ja filtreeri oma kriteeriumite järgi</span>
              </li>
              <li class="flex gap-3">
                <span class="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">3</span>
                <span>Võta otse ettevõttega ühendust</span>
              </li>
            </ol>
            <button (click)="navigateTo('/register-freelancer')" class="w-full btn-primary py-2.5 rounded text-white font-medium text-sm">
              Loo profiil
            </button>
          </div>

          <!-- For Companies -->
          <div class="card rounded-lg p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-green-100 rounded flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-navy-900">Ettevõtetele</h3>
            </div>
            <ol class="space-y-3 text-gray-600 text-sm mb-6">
              <li class="flex gap-3">
                <span class="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">1</span>
                <span>Postita tööpakkumine koos nõuetega</span>
              </li>
              <li class="flex gap-3">
                <span class="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">2</span>
                <span>Sirvi kvalifitseeritud spetsialistide profiile</span>
              </li>
              <li class="flex gap-3">
                <span class="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">3</span>
                <span>Võta sobivate kandidaatidega otse ühendust</span>
              </li>
            </ol>
            <button (click)="navigateTo('/post-job')" class="w-full btn-secondary py-2.5 rounded font-medium text-sm text-gray-700">
              Postita töö
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Role categories -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-navy-900 text-center mb-2">Lennunduse rollid</h2>
        <p class="text-gray-500 text-center mb-10">Leia spetsialiste igas kategoorias</p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="card rounded-lg p-5 text-center cursor-pointer" (click)="navigateTo('/freelancers', 'part66-b1')">
            <div class="w-12 h-12 mx-auto bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <h3 class="font-medium text-navy-900 text-sm">Part-66 Tehnikud</h3>
            <p class="text-xs text-gray-500 mt-1">B1 & B2 litsentsid</p>
          </div>

          <div class="card rounded-lg p-5 text-center cursor-pointer" (click)="navigateTo('/freelancers', 'pilot')">
            <div class="w-12 h-12 mx-auto bg-indigo-100 rounded-lg flex items-center justify-center mb-3">
              <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </div>
            <h3 class="font-medium text-navy-900 text-sm">Piloodid</h3>
            <p class="text-xs text-gray-500 mt-1">ATPL, CPL</p>
          </div>

          <div class="card rounded-lg p-5 text-center cursor-pointer" (click)="navigateTo('/freelancers', 'cabin-crew')">
            <div class="w-12 h-12 mx-auto bg-pink-100 rounded-lg flex items-center justify-center mb-3">
              <svg class="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <h3 class="font-medium text-navy-900 text-sm">Cabin Crew</h3>
            <p class="text-xs text-gray-500 mt-1">Pardapersonal</p>
          </div>

          <div class="card rounded-lg p-5 text-center cursor-pointer" (click)="navigateTo('/freelancers', 'ground-ops')">
            <div class="w-12 h-12 mx-auto bg-amber-100 rounded-lg flex items-center justify-center mb-3">
              <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
            <h3 class="font-medium text-navy-900 text-sm">Ground Ops</h3>
            <p class="text-xs text-gray-500 mt-1">Maapealne teenindus</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Disclaimer -->
    <section class="py-12 bg-white border-t border-gray-200">
      <div class="max-w-3xl mx-auto px-4">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold text-navy-900 mb-2">Platvormi roll</h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            AviatorConnect on tutvustusplatvorm, mis ühendab lennundusspetsialiste ja ettevõtteid.
            Me ei vahenda makseid, ei verifitseeri litsentse ega kvalifikatsioone, ega kanna vastutust
            osapoolte vaheliste kokkulepete eest. Kõik koostöölepingud sõlmitakse otse osapoolte vahel.
          </p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 bg-navy-900">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 bg-white rounded flex items-center justify-center">
              <svg class="w-4 h-4 text-navy-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </div>
            <span class="text-white text-sm">AviatorConnect</span>
          </div>
          <div class="flex items-center gap-6 text-sm text-gray-400">
            <button (click)="navigateTo('/jobs')" class="hover:text-white transition-colors">Tööd</button>
            <button (click)="navigateTo('/freelancers')" class="hover:text-white transition-colors">Spetsialistid</button>
            <span>© 2024</span>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class LandingComponent implements OnInit {
  stats = { freelancers: 0, jobs: 0, companies: 0, countries: 0 };

  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const realStats = this.dataService.getStats();
    this.stats = {
      freelancers: Math.max(realStats.freelancers, 500),
      jobs: Math.max(realStats.jobs, 120),
      companies: Math.max(realStats.companies, 50),
      countries: Math.max(realStats.countries, 25)
    };
  }

  navigateTo(path: string, filter?: string): void {
    if (filter) {
      this.router.navigate([path], { queryParams: { role: filter } });
    } else {
      this.router.navigate([path]);
    }
  }
}
