import {Component, OnInit} from '@angular/core';
import {JobServiceService} from '../../../../services/job-service/job-service.service';
import {Job} from '../../../../model/Job';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-jobs-list',
  standalone : true,
  imports: [CommonModule],
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {

  protected jobs : Job[] = [] ;
  totalJobs : number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 99;


  constructor(private jobService : JobServiceService,private router : Router, private route: ActivatedRoute) {

  }


  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.currentPage = parseInt(params['page']);
      this.getJobsPaginated();

    })


  }


  getJobsPaginated() : void
  {
    this.jobService.getJobsPaginated(this.currentPage).subscribe(data => {
      this.totalJobs = data.total;
      this.jobs = data.results;
    })
  }

  nextPage() {
    if(this.currentPage < this.totalPages) {
      this.router.navigate([], {
        queryParams: {page: this.currentPage + 1, queryParamsHandling: 'merge'}
      });
    }
  }

  previousPage()
  {
    if(this.currentPage > 1)
    {
      this.router.navigate(['/jobs'],{queryParams: {page: this.currentPage - 1}});}


  }





}
