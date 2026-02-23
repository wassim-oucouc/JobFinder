import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../../services/localstorage-service/local-storage.service';
import { User } from '../../model/User';
import { Store } from '@ngrx/store';
import * as FavoritesActions from '../../../store/favorites/favorites.actions';
import { selectFavoritesCount } from '../../../store/favorites/favorites.selectors';

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent implements OnInit, OnDestroy {

  userName: string = '';
  userEmail: string = '';
  userInitials: string = '';

  candidaturesCount: number = 0;
  savedJobsCount: number = 0;
  notificationsCount: number = 0;

  isUserMenuOpen: boolean = false;
  isMobileMenuOpen: boolean = false;

  private sub: Subscription = new Subscription();

  constructor(
    private localStorageService: LocalStorageService,
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Load user info
    const user: User | null = this.localStorageService.getUser();
    if (user) {
      this.userName = `${user.Prenom} ${user.Nom}`;
      this.userEmail = user.Email;
      this.userInitials = `${user.Prenom?.charAt(0) ?? ''}${user.Nom?.charAt(0) ?? ''}`.toUpperCase();

      // Load favorites if user exists
      this.store.dispatch(FavoritesActions.loadFavorites({ userId: user.id }));
    }

    // Subscribe to favorites count from NgRx Store
    this.sub.add(this.store.select(selectFavoritesCount).subscribe(count => {
      this.savedJobsCount = count;
    }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeUserMenu(): void {
    this.isUserMenuOpen = false;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout(): void {
    this.localStorageService.removeUser();
    this.store.dispatch(FavoritesActions.clearFavorites());
    this.isUserMenuOpen = false;
    this.isMobileMenuOpen = false;
    this.router.navigate(['/login']);
  }
}
