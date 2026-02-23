import { Routes } from '@angular/router';
import { LoginComponent } from './core/features/auth/pages/login/login.component';
import { RegisterComponent } from './core/features/auth/pages/register/register.component';
import { JobsComponent } from './core/features/jobs/pages/jobs/jobs.component';
import { CandidaturePageComponent } from './core/features/candidature/pages/candidature-page/candidature-page.component';
import { ProfileEditComponent } from './core/features/profile/pages/profile-edit/profile-edit.component';
import { FavoritesPageComponent } from './core/features/favorites/pages/favorites-page/favorites-page.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'jobs',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'jobs',
    component: JobsComponent
  },
  {
    path: 'candidatures',
    component: CandidaturePageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile/edit',
    component: ProfileEditComponent,
    canActivate: [authGuard]
  },
  {
    path: 'favorites',
    component: FavoritesPageComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
