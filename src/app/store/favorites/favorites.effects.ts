import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, withLatestFrom } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { FavoritesApiService } from '../../core/api/favorites-api/favorites-api.service';
import * as FavoritesActions from './favorites.actions';
import { LocalStorageService } from '../../core/services/localstorage-service/local-storage.service';
import { Store } from '@ngrx/store';
import { selectAllFavorites } from './favorites.selectors';

@Injectable()
export class FavoritesEffects {

    private actions$ = inject(Actions);
    private favoritesApi = inject(FavoritesApiService);
    private localStorageService = inject(LocalStorageService);
    private store = inject(Store);

    loadFavorites$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FavoritesActions.loadFavorites),
            switchMap(({ userId }) =>
                this.favoritesApi.getAll(userId).pipe(
                    map((favorites) => FavoritesActions.loadFavoritesSuccess({ favorites })),
                    catchError((error) => of(FavoritesActions.loadFavoritesFailure({ error })))
                )
            )
        )
    );

    addFavorite$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FavoritesActions.addFavorite),
            mergeMap(({ job }) => {
                const user = this.localStorageService.getUser();
                const favoriteData = {
                    userId: user?.id ?? 0,
                    offerId: job.id,
                    title: job.name,
                    company: job.company.name,
                    location: job.locations[0]?.name ?? 'Remote'
                };
                return this.favoritesApi.add(favoriteData).pipe(
                    map((favorite) => FavoritesActions.addFavoriteSuccess({ favorite })),
                    catchError((error) => of(FavoritesActions.addFavoriteFailure({ error })))
                );
            })
        )
    );

    removeFavorite$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FavoritesActions.removeFavorite),
            withLatestFrom(this.store.select(selectAllFavorites)),
            mergeMap(([{ offerId }, favorites]) => {
                const favorite = favorites.find((f) => f.offerId === offerId);
                if (!favorite) {
                    return of(FavoritesActions.removeFavoriteFailure({ error: 'Favorite not found' }));
                }
                return this.favoritesApi.delete(favorite.id).pipe(
                    map(() => FavoritesActions.removeFavoriteSuccess({ offerId })),
                    catchError((error) => of(FavoritesActions.removeFavoriteFailure({ error })))
                );
            })
        )
    );
}
