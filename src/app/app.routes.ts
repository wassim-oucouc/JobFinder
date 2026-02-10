import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './core/features/auth/pages/login/login.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LoginFormComponent} from './core/features/auth/components/login-form/login-form.component';
import {RegisterComponent} from './core/features/auth/pages/register/register.component';

export const routes: Routes = [
  {
    path :"login",
    component : LoginFormComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  }
];
  @NgModule({
    imports: [BrowserModule, RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class RoutingModule {}
