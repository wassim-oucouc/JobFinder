import { Injectable } from '@angular/core';
import {User} from '../../model/User';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  addUser(user : User)
  {
    localStorage.setItem('user',JSON.stringify(user));
  }

  removeUser()
  {
    localStorage.removeItem('user');
  }

  getUser() : any
  {
    const userJson = localStorage.getItem(('user'));
    if (!userJson) return null;

    try {
      return JSON.parse(userJson) as User;
    } catch (error) {
      console.error('Erreur lors du parsing du localStorage', error);
      return null;
    }
  }

}
