import { Injectable } from '@angular/core';
import {UserApiService} from '../../api/user-api/user-api.service';
import {Observable} from 'rxjs';
import {User} from '../../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private userApi: UserApiService) {}

  getUser(id: number): Observable<User> {
    return this.userApi.getUserById(id);
  }

  updateUserInfo(id: number, userData: Partial<User>): Observable<User> {
    return this.userApi.updateUserInfo(id, userData);
  }

  updateUserPassword(id: number, passwordData: { password: string, confirmPassword: string }): Observable<User> {
    return this.userApi.updateUserPassword(id, passwordData);
  }
}
