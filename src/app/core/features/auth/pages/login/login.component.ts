import { Component } from '@angular/core';
import {AuthSidebarComponent} from '../../components/auth-sidebar/auth-sidebar.component';
import {AuthFooterComponent} from '../../components/auth-footer/auth-footer.component';
import {LoginFormComponent} from '../../components/login-form/login-form.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [AuthSidebarComponent,AuthFooterComponent,LoginFormComponent],
  standalone : true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

}
