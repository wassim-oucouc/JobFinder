import { Component } from '@angular/core';
import {AuthFooterComponent} from "../../components/auth-footer/auth-footer.component";
import {AuthSidebarComponent} from "../../components/auth-sidebar/auth-sidebar.component";
import {LoginFormComponent} from "../../components/login-form/login-form.component";
import {RegisterFormComponent} from '../../components/register-form/register-form.component';

@Component({
  selector: 'app-register',
    imports: [
        AuthFooterComponent,
        AuthSidebarComponent,
      RegisterFormComponent
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
