import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './core/features/auth/pages/login/login.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LoginFormComponent} from './core/features/auth/components/login-form/login-form.component';
import {RegisterComponent} from './core/features/auth/pages/register/register.component';
import {JobsComponent} from './core/features/jobs/pages/jobs/jobs.component';
import {CandidaturePageComponent} from './core/features/candidature/pages/candidature-page/candidature-page.component';

export const routes: Routes = [
  {
    path :"login",
    component : LoginComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path : 'jobs',
    component : JobsComponent
  },
  {
    path : 'candidatures',
    component : CandidaturePageComponent
  }
];

