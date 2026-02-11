import {Component, Injectable} from '@angular/core';
import { environment } from '../../../../../environment';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../../model/User';
import {LoginRequest} from '../../model/LoginRequest';

@Injectable({
  providedIn : "root"
})
export class AuthApiComponent {

  apiUrl: string;


  constructor(private http : HttpClient ) {
    this.apiUrl = environment.apiLocal;

  }


  register(userCreation : User) : Observable<User>
{
  return this.http.post(`${this.apiUrl}/users`,userCreation) as Observable<User>;
}


login(loginRequest : LoginRequest) : any
{

  const params = new HttpParams().set('Email', loginRequest.email);
  return this.http.get<User[]>(`${this.apiUrl}/users`,{params});

}








}
