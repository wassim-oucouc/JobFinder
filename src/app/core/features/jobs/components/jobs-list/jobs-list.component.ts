import {Component, OnInit} from '@angular/core';
import {JobServiceService} from '../../../../services/job-service/job-service.service';
import {Job} from '../../../../model/Job';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {JobsFilterComponent} from '../jobs-filter/jobs-filter.component';

@Component({
  selector: 'app-jobs-list',
  standalone : true,
  imports: [CommonModule,JobsFilterComponent],
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {

  protected jobs : Job[] = [] ;
  protected  alljobs : Job[] = [];
  companies: any = [];
  localisations: any = [];
  totalJobs : number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 99;


  constructor(private jobService : JobServiceService,private router : Router, private route: ActivatedRoute) {

  }


  ngOnInit() {


    this.route.queryParams.subscribe(params => {
      this.currentPage = parseInt(params['page']) || 1;
      this.getJobsPaginated();

    })


  }
  getJobsPaginated() : void
  {
    this.jobService.getJobsPaginated(this.currentPage).subscribe(data => {
      this.totalJobs = data.total;
      this.jobs = data.results;
      this.alljobs = data.results;

      this.companies = Array.from(new Set(this.jobs.map(job => job.company.name)));
      this.localisations = Array.from(new Set(
        this.jobs.flatMap(job => job.locations.map(loc => loc.name))
      ));
    })
  }

  nextPage() {
    if(this.currentPage < this.totalPages) {
      this.router.navigate([], {
        queryParams: {page: this.currentPage + 1},
        queryParamsHandling: 'merge'
      });
    }
  }

  receiveDataInput($event: any)
  {
    const value = $event.target.value?.toLowerCase() || '';
    if($event.target.value.empty || $event.target.value.length < 1)
    {
      this.jobs = this.alljobs;
      this.getJobsPaginated();
    }

    console.log($event.target.value);
   this.jobs = this.alljobs.filter(job => {
   return   job.name.toLowerCase().includes(value);
    });

   this.totalJobs = this.jobs.length;


    console.log("this job found", this.jobs);
  }

  previousPage()
  {
    if(this.currentPage > 1)
    {
      this.router.navigate([],{
        queryParams: {page: this.currentPage - 1},
        queryParamsHandling: 'merge'
      });

    }


  }





}
