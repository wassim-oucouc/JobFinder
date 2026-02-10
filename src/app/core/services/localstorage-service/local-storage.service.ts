import { Injectable } from '@angular/core';
import {User} from '../../model/User';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  addUser(user : User)
  {
    localStorage.setItem(String(user.Email),JSON.stringify(user));
  }

  removeUser(email : string)
  {
    localStorage.removeItem(String(email));
  }

  getUser(email : string) : any
  {
    const userJson = localStorage.getItem(String(email));
    if (!userJson) return null;

    try {
      return JSON.parse(userJson) as User;
    } catch (error) {
      console.error('Erreur lors du parsing du localStorage', error);
      return null;
    }
  }
}
