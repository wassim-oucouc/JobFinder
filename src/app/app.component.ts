import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { UserNavbarComponent } from './core/layout/user-navbar/user-navbar.component';
import { LocalStorageService } from './core/services/localstorage-service/local-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, UserNavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'jobFinder';
  showNavbar: boolean = false;

  /** Routes where the navbar should NOT be shown */
  private noNavbarRoutes = ['/login', '/register'];

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateNavbarVisibility(event.urlAfterRedirects);
      });
  }

  private updateNavbarVisibility(url: string): void {
    const isAuthPage = this.noNavbarRoutes.some(route => url.startsWith(route));
    this.showNavbar = !isAuthPage && this.localStorageService.getAuthenticated();
  }
}
