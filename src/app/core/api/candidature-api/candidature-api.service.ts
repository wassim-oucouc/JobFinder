import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Candidature} from '../../model/Candidature';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environment';
import {LocalStorageService} from '../../services/localstorage-service/local-storage.service';
import {User} from '../../model/User';

@Injectable({
  providedIn: 'root'
})
export class CandidatureApi {

  apiUrl: string;

  constructor(private http: HttpClient,private localStorage: LocalStorageService) {
    this.apiUrl = environment.apiLocal + '/candidature';
  }

  getUserId(): number {
    const user : User = this.localStorage.getUser();
  return   user.id
  }

  add(candidature: Candidature): Observable<Candidature> {
    return this.http.post<Candidature>(this.apiUrl, candidature);
  }

  getAll(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(`${this.apiUrl}?userId=${this.getUserId()}`);
  }

  updateNotes(id: number, notes: string): Observable<Candidature> {
    return this.http.patch<Candidature>(`${this.apiUrl}/${id}`, { notes });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  updateStatus(id: number, status: string) {
    return this.http.patch<Candidature>(`${this.apiUrl}/${id}`, { status });
  }
}
