import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environment';
import {Observable} from 'rxjs';
import {User} from '../../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiLocal;
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  updateUserInfo(id: number, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, userData);
  }

  updateUserPassword(id: number, passwordData: { password: string, confirmPassword: string }): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}/password`, passwordData);
  }
}
