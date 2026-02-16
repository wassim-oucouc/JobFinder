import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LocalStorageService} from '../../../../services/localstorage-service/local-storage.service';
import {UserApiService} from '../../../../api/user-api/user-api.service';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-profile-informations-edit',
  standalone: true,
  imports : [ReactiveFormsModule,CommonModule],
  templateUrl: './profile-informations-edit.component.html',
  styleUrls: ['./profile-informations-edit.component.css']
})
export class ProfileInformationsEditComponent implements OnInit {
  personalForm!: FormGroup;
  passwordForm!: FormGroup;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private userApi: UserApiService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    const user = this.localStorageService.getUser();
    console.log(user);
    if (!user) return;

    this.userId = user.id;

    this.personalForm = this.fb.group({
      firstName: [user.firstName, [Validators.required, Validators.minLength(2)]],
      lastName: [user.lastName, [Validators.required, Validators.minLength(2)]],
      email: [user.email, [Validators.required, Validators.email]],
      phone: [user.phone, [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      about: [user.about, [Validators.required, Validators.minLength(10)]]
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  savePersonal() {
    if (this.personalForm.invalid) return;

    this.userApi.updateUserInfo(this.userId, this.personalForm.value).subscribe({
      next: updatedUser => {
        this.localStorageService.addUser(updatedUser);
        alert('Infos personnelles mises à jour !');
      },
      error: err => console.error(err)
    });
  }

  savePassword() {
    if (this.passwordForm.invalid) return;

    this.userApi.updateUserPassword(this.userId, this.passwordForm.value).subscribe({
      next: updatedUser => {
        alert('Mot de passe changé avec succès !');
      },
      error: err => console.error(err)
    });
  }
}
