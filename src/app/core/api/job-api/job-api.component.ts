import {Component, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environment';
import {Observable} from 'rxjs';
import {Job} from '../../model/Job';

@Injectable({
  providedIn : "root"
})

export class JobApiComponent {


  apiUrl: string;


  constructor(private httpClient : HttpClient) {
    this.apiUrl = environment.apiPublic
  }


  getJobsPaginated(page : number) : Observable<any>
  {
   return  this.httpClient.get<Job[]>(`${this.apiUrl}/jobs?page=${page}`)
  }


  getJobById(id : number) : Observable<any>
  {
    return  this.httpClient.get<Job[]>(`${this.apiUrl}/jobs/${id}`)
  }

}
