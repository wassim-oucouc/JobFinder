import { Injectable } from '@angular/core';
import {CandidatureApi} from '../../api/candidature-api/candidature-api.service';
import {Candidature} from '../../model/Candidature';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatureServiceService {

  constructor(private candidatureApi: CandidatureApi) {
  }


  followCandidature(candidature: Candidature): Observable<Candidature> {
    return this.candidatureApi.add(candidature);
  }

  getFollowedCandidatures(): Observable<Candidature[]> {
    return this.candidatureApi.getAll();
  }

  addNotes(id: number, notes: string): Observable<Candidature> {
    return this.candidatureApi.updateNotes(id, notes);
  }

  removeCandidature(id: number): Observable<void> {
    return this.candidatureApi.delete(id);
  }

  updateStatus(id: number, status: string) {
    return this.candidatureApi.updateStatus(id, status);
  }
}
