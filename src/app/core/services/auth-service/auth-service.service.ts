import { Injectable } from '@angular/core';
import {AuthApiComponent} from '../../api/auth-api/auth-api.component';
import {User} from '../../model/User';
import {map, Observable} from 'rxjs';
import {LocalStorageService} from '../localstorage-service/local-storage.service';
import {LoginRequest} from '../../model/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  protected userFound : User | null = null


  constructor(protected authApi : AuthApiComponent,protected localStorageService : LocalStorageService) { }


  registerUser(userCreation : User) : Observable<any>
  {
   return this.authApi.register(userCreation);
  }


  loginUser(loginRequest : LoginRequest) : Observable<{ success: boolean, user?: User}>
  {
    return this.authApi.login(loginRequest).pipe(
      map((user: User[]) => {
        console.log(user[0])
          const userFound = user[0];

          if (!userFound || user.length === 0) {
            console.log(userFound)
            return {success: false};
          }

          if (userFound.Email == loginRequest.email &&
            userFound.password == loginRequest.password) {
            this.localStorageService.addUser(userFound);
            return {success: true, user: userFound};
          } else {
            return { success: false };
          }
        }
      ));


  }


}
