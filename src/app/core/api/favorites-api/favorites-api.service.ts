import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment';
import { FavoritesOffers } from '../../model/FavoritesOffers';

@Injectable({
  providedIn: 'root'
})
export class FavoritesApiService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiLocal + '/favoritesOffers';
  }

  getAll(userId: number): Observable<FavoritesOffers[]> {
    return this.http.get<FavoritesOffers[]>(`${this.apiUrl}?userId=${userId}`);
  }

  add(favorite: Omit<FavoritesOffers, 'id'>): Observable<FavoritesOffers> {
    return this.http.post<FavoritesOffers>(this.apiUrl, favorite);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
