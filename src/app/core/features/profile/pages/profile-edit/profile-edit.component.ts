import { Component } from '@angular/core';
import {ProfileHeaderComponent} from '../../components/profile-header/profile-header.component';
import {ProfileCardHeaderComponent} from '../../components/profile-card-header/profile-card-header.component';
import {
  ProfilePasswordChangeComponent
} from '../../components/profile-password-change/profile-password-change.component';
import {
  ProfileInformationsEditComponent
} from '../../components/profile-informations-edit/profile-informations-edit.component';

@Component({
  selector: 'app-profile-edit',
  imports: [ProfileHeaderComponent,ProfileCardHeaderComponent,ProfilePasswordChangeComponent,ProfileInformationsEditComponent],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent {

}
