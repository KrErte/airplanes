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

    <!-- Hero Section -->
    <section class="pt-32 pb-20 px-4">
      <div class="max-w-6xl mx-auto text-center">
        <div class="animate-float mb-8">
          <div class="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-sky-400/20 to-indigo-500/20 border border-sky-400/30 flex items-center justify-center">
            <svg class="w-10 h-10 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
          </div>
        </div>
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          <span class="text-white">Euroopa lennunduse</span><br>
          <span class="gradient-text">freelance platvorm</span>
        </h1>
        <p class="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          Ühendame kvalifitseeritud lennundusspetsialistid ettevõtetega, kes vajavad ajutist tööjõudu.
          Tehnikud, piloodid, cabin crew ja ground ops.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            (click)="navigateTo('/register-freelancer')"
            class="btn-primary px-8 py-4 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Olen freelancer
          </button>
          <button
            (click)="navigateTo('/post-job')"
            class="glass-light px-8 py-4 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-3 hover:bg-slate-700/50 transition-all">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Otsin spetsialisti
          </button>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 px-4">
      <div class="max-w-5xl mx-auto">
        <div class="glass rounded-2xl p-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold gradient-text mb-2">{{ stats.freelancers }}+</div>
              <div class="text-slate-400">Spetsialisti</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold gradient-text mb-2">{{ stats.jobs }}+</div>
              <div class="text-slate-400">Aktiivset tööd</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold gradient-text mb-2">{{ stats.companies }}+</div>
              <div class="text-slate-400">Ettevõtet</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold gradient-text mb-2">{{ stats.countries }}+</div>
              <div class="text-slate-400">Riiki</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-4 text-white">Kuidas see töötab?</h2>
        <p class="text-slate-400 text-center mb-12 max-w-2xl mx-auto">Lihtne ja kiire viis leida oma järgmine projekt või ideaalne kandidaat</p>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- For Freelancers -->
          <div class="glass-card rounded-2xl p-8">
            <div class="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center mb-6">
              <svg class="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-4">Freelanceritele</h3>
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="text-sky-400 text-sm font-medium">1</span>
                </div>
                <p class="text-slate-300">Loo oma profiil kvalifikatsioonide ja saadavusega</p>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="text-sky-400 text-sm font-medium">2</span>
                </div>
                <p class="text-slate-300">Sirvi tööpakkumisi ja filtreeri oma kriteeriumite järgi</p>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="text-sky-400 text-sm font-medium">3</span>
                </div>
                <p class="text-slate-300">Võta otse ettevõttega ühendust</p>
              </div>
            </div>
            <button (click)="navigateTo('/register-freelancer')" class="mt-6 w-full btn-primary py-3 rounded-lg text-white font-medium">
              Alusta siin
            </button>
          </div>

          <!-- For Companies -->
          <div class="glass-card rounded-2xl p-8">
            <div class="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6">
              <svg class="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-4">Ettevõtetele</h3>
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="text-indigo-400 text-sm font-medium">1</span>
                </div>
                <p class="text-slate-300">Postita tööpakkumine koos nõuetega</p>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="text-indigo-400 text-sm font-medium">2</span>
                </div>
                <p class="text-slate-300">Sirvi kvalifitseeritud spetsialistide profiile</p>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="text-indigo-400 text-sm font-medium">3</span>
                </div>
                <p class="text-slate-300">Võta sobivate kandidaatidega otse ühendust</p>
              </div>
            </div>
            <button (click)="navigateTo('/post-job')" class="mt-6 w-full glass-light py-3 rounded-lg text-white font-medium hover:bg-slate-700/50 transition-all">
              Postita töö
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Role categories -->
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-4 text-white">Kõik lennunduse rollid</h2>
        <p class="text-slate-400 text-center mb-12">Leia spetsialiste igas kategoorias</p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="glass-card rounded-xl p-6 text-center cursor-pointer" (click)="navigateTo('/freelancers', 'part66-b1')">
            <div class="w-14 h-14 mx-auto rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-white mb-1">Part-66 Tehnikud</h3>
            <p class="text-sm text-slate-400">B1 & B2 litsentsid</p>
          </div>

          <div class="glass-card rounded-xl p-6 text-center cursor-pointer" (click)="navigateTo('/freelancers', 'pilot')">
            <div class="w-14 h-14 mx-auto rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </div>
            <h3 class="font-semibold text-white mb-1">Piloodid</h3>
            <p class="text-sm text-slate-400">ATPL, CPL</p>
          </div>

          <div class="glass-card rounded-xl p-6 text-center cursor-pointer" (click)="navigateTo('/freelancers', 'cabin-crew')">
            <div class="w-14 h-14 mx-auto rounded-xl bg-pink-500/20 flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-white mb-1">Cabin Crew</h3>
            <p class="text-sm text-slate-400">Pardapersonal</p>
          </div>

          <div class="glass-card rounded-xl p-6 text-center cursor-pointer" (click)="navigateTo('/freelancers', 'ground-ops')">
            <div class="w-14 h-14 mx-auto rounded-xl bg-amber-500/20 flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
            <h3 class="font-semibold text-white mb-1">Ground Ops</h3>
            <p class="text-sm text-slate-400">Maapealne teenindus</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Disclaimer -->
    <section class="py-16 px-4">
      <div class="max-w-4xl mx-auto">
        <div class="glass rounded-2xl p-8 border-l-4 border-sky-500">
          <h3 class="text-lg font-semibold text-white mb-3">Platvormi roll</h3>
          <p class="text-slate-400 text-sm leading-relaxed">
            AviatorConnect on tutvustusplatvorm, mis ühendab lennundusspetsialiste ja ettevõtteid.
            Me ei vahenda makseid, ei verifitseeri litsentse ega kvalifikatsioone, ega kanna vastutust
            osapoolte vaheliste kokkulepete eest. Kõik koostöölepingud sõlmitakse otse osapoolte vahel.
          </p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 px-4 border-t border-slate-800">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </div>
            <span class="text-slate-400">AviatorConnect</span>
          </div>
          <div class="flex items-center gap-6 text-sm text-slate-500">
            <button (click)="navigateTo('/jobs')" class="hover:text-slate-300 transition-colors">Tööd</button>
            <button (click)="navigateTo('/freelancers')" class="hover:text-slate-300 transition-colors">Spetsialistid</button>
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
