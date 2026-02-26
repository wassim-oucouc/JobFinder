import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobServiceService } from '../../../../services/job-service/job-service.service';
import { Job } from '../../../../model/Job';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobsFilterComponent } from '../jobs-filter/jobs-filter.component';
import { JobsHeroSectionComponent } from '../jobs-hero-section/jobs-hero-section.component';
import { LocalStorageService } from '../../../../services/localstorage-service/local-storage.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as FavoritesActions from '../../../../../store/favorites/favorites.actions';
import { selectAllFavorites } from '../../../../../store/favorites/favorites.selectors';
import { FavoritesOffers } from '../../../../model/FavoritesOffers';

@Component({
  selector: 'app-jobs-list',
  standalone: true,
  imports: [CommonModule, JobsFilterComponent, JobsHeroSectionComponent],
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit, OnDestroy {

  protected jobs: Job[] = [];
  protected alljobs: Job[] = [];
  companies: any = [];
  localisations: any = [];
  totalJobs: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 99;

  private favorites: FavoritesOffers[] = [];
  private sub: Subscription = new Subscription();

  constructor(
    private jobService: JobServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService,
    private store: Store
  ) { }

  ngOnInit() {
    // Load state
    const user = this.localStorage.getUser();
    if (user) {
      this.store.dispatch(FavoritesActions.loadFavorites({ userId: user.id }));
    }

    // Subscribe to favorites for local lookup in template
    this.sub.add(this.store.select(selectAllFavorites).subscribe(favs => {
      this.favorites = favs;
    }));

    this.route.queryParams.subscribe(params => {
      this.currentPage = parseInt(params['page']) || 1;
      this.getJobsPaginated();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getJobsPaginated(): void {
    this.jobService.getJobsPaginated(this.currentPage).subscribe(data => {
      this.totalJobs = data.total;
      this.jobs = data.results;
      this.alljobs = data.results;

      this.companies = Array.from(new Set(this.jobs.map((job: Job) => job.company.name)));
      this.localisations = Array.from(new Set(
        this.jobs.flatMap((job: Job) => job.locations.map(loc => loc.name))
      ));
    });
  }


  toggleFavorite(job: Job): void {
    if (this.isFavorite(job.id)) {
      this.store.dispatch(FavoritesActions.removeFavorite({ offerId: job.id }));
    } else {
      this.store.dispatch(FavoritesActions.addFavorite({ job }));
    }
  }

  isFavorite(jobId: number): boolean {
    return this.favorites.some(f => f.offerId === jobId);
  }




  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.router.navigate([], {
        queryParams: { page: this.currentPage + 1 },
        queryParamsHandling: 'merge'
      });
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.router.navigate([], {
        queryParams: { page: this.currentPage - 1 },
        queryParamsHandling: 'merge'
      });
    }
  }


  receiveSelectedOptions(filtersValid: { company: string; location: string; level: string }) {
    if (
      (!filtersValid.company || filtersValid.company === '') &&
      (!filtersValid.location || filtersValid.location === '') &&
      (!filtersValid.level || filtersValid.level === '')
    ) {
      this.getJobsPaginated();
      return;
    }

    this.jobs = this.alljobs.filter(job => {
      return job.locations[0].name.toLowerCase().includes(<string>filtersValid.location.toLowerCase()) &&
        job.company.name.toLowerCase().includes(<string>filtersValid.company.toLowerCase()) &&
        job.levels[0].name.toLowerCase().includes(<string>filtersValid.level.toLowerCase());
    });

    this.totalJobs = this.jobs.length;
  }

  receiveDataInput(searchValue: string) {
    const value = (searchValue || '').toLowerCase().trim();
    if (!value || value.length < 1) {
      this.jobs = this.alljobs;
      this.getJobsPaginated();
    }

    this.jobs = this.alljobs.filter(job => {
      return job.name.toLowerCase().includes(value);
    });

    this.totalJobs = this.jobs.length;
  }

  getAuthenticated(): boolean {
    return this.localStorage.getAuthenticated();
  }
}
