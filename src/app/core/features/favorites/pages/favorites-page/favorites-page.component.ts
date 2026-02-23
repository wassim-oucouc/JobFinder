import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as FavoritesActions from '../../../../../store/favorites/favorites.actions';
import { selectAllFavorites } from '../../../../../store/favorites/favorites.selectors';
import { FavoritesOffers } from '../../../../model/FavoritesOffers';

@Component({
    selector: 'app-favorites-page',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './favorites-page.component.html',
    styleUrl: './favorites-page.component.css'
})
export class FavoritesPageComponent implements OnInit {

    favorites$: Observable<FavoritesOffers[]>;

    constructor(private store: Store) {
        this.favorites$ = this.store.select(selectAllFavorites);
    }

    ngOnInit(): void {
    }

    removeFavorite(offerId: number): void {
        this.store.dispatch(FavoritesActions.removeFavorite({ offerId }));
    }
}
