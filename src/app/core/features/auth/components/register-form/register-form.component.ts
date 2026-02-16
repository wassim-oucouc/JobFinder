import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthServiceService} from '../../../../services/auth-service/auth-service.service';
import {Router} from '@angular/router';
import {User} from '../../../../model/User';

@Component({
  selector: 'app-register-form',
  imports: [CommonModule,ReactiveFormsModule],
  standalone : true,
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  protected registerForm: FormGroup;
  showPassword : boolean = false;
  showConfirmPassword : boolean = false
  isLoading: boolean = false;
  successMessage : String = "";
  errorMessage : String = ""

  userCreation: User = {
    id: 0,
    Nom: '',
    Prenom: '',
    Email: '',
    password: ''
  };



  constructor(private fb: FormBuilder,protected authService: AuthServiceService, protected router: Router) {

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword : ['',Validators.required],
      acceptTerms : [false]
    })
  }


  toggleConfirmPasswordVisibility()
  {
    if(!this.showConfirmPassword)
    {
      this.showConfirmPassword = true;
    }
    else
    {
      this.showConfirmPassword = false;
    }
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

  onSubmit()
  {



    if (!this.registerForm.invalid) {
      this.userCreation.Nom = this.registerForm.get("firstname")?.value;
      this.userCreation.Prenom = this.registerForm.get("lastName")?.value;
      this.userCreation.Email = this.registerForm.get("email")?.value;
      this.userCreation.password = this.registerForm.get("password")?.value;
      this.authService.registerUser(this.userCreation).subscribe({
        next: value => {
          this.isLoading = false
          this.registerForm.reset();
          this.successMessage = "inscription bien pris avec succées"
          setTimeout(() => {
            this.router.navigate(["/login"])
          }, 4000);
        },
        error: err => {
          this.errorMessage = `erreur de inscription${err}`
          console.log("erreur de inscription", err);
        }
      })
    } else {
      this.registerForm.markAllAsTouched()
    }
  }

}
