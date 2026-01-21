import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { FreelancerFormComponent } from './components/freelancer-form/freelancer-form.component';
import { JobFormComponent } from './components/job-form/job-form.component';
import { BrowseJobsComponent } from './components/browse-jobs/browse-jobs.component';
import { BrowseFreelancersComponent } from './components/browse-freelancers/browse-freelancers.component';
import { FreelancerDetailComponent } from './components/freelancer-detail/freelancer-detail.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'register-freelancer', component: FreelancerFormComponent },
  { path: 'post-job', component: JobFormComponent },
  { path: 'jobs', component: BrowseJobsComponent },
  { path: 'freelancers', component: BrowseFreelancersComponent },
  { path: 'freelancer/:id', component: FreelancerDetailComponent },
  { path: 'job/:id', component: JobDetailComponent },
  { path: '**', redirectTo: '' }
];
