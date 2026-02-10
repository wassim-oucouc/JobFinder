import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthServiceService} from '../../../../services/auth-service/auth-service.service';
import {LoginRequest} from '../../../../model/LoginRequest';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  standalone : true,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  protected loginForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = "";
  showPassword : boolean = false;
  loginRequest: LoginRequest = {
    email: '',
    password: ''
  };


  constructor(private fb: FormBuilder, protected authService: AuthServiceService, protected router: Router) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe : [false]
    })
  }

  togglePasswordVisibility()
  {
    if(!this.showPassword)
    {
      this.showPassword = true;
    }
    else
    {
      this.showPassword = false;
    }
  }


  onSubmit() {
    this.isLoading = true;
    this.loginRequest.email = this.loginForm.get("email")?.value;
    this.loginRequest.password = this.loginForm.get("password")?.value;

    if (!this.loginForm.invalid) {
      this.authService.loginUser(this.loginRequest).subscribe({
        next: value => {
          this.isLoading = false
          if (value.success) {
            this.router.navigate(["/jobs"])
            this.errorMessage = ""
            this.loginForm.reset();
          } else {
            this.errorMessage = "Email or password incorrect"
            this.loginForm.markAllAsTouched()
            this.loginForm.invalid
          }
        },
        error: err => {
          console.log("there a error", err);
        }
      })
    } else {
      this.loginForm.markAllAsTouched()
    }
  }
}
