import { Injectable } from '@angular/core';
import {JobApiComponent} from '../../api/job-api/job-api.component';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobServiceService {

  constructor(private jobApi : JobApiComponent) { }



  getJobsPaginated(page : number) : Observable<any>
  {
   return  this.jobApi.getJobsPaginated(page);
  }

  getJobById(id : number) : Observable<any>
  {
    return this.jobApi.getJobById(id);
  }
}
