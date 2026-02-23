import { createAction, props } from '@ngrx/store';
import { FavoritesOffers } from '../../core/model/FavoritesOffers';
import { Job } from '../../core/model/Job';

// Load Favorites
export const loadFavorites = createAction(
    '[Favorites] Load Favorites',
    props<{ userId: number }>()
);

export const loadFavoritesSuccess = createAction(
    '[Favorites] Load Favorites Success',
    props<{ favorites: FavoritesOffers[] }>()
);

export const loadFavoritesFailure = createAction(
    '[Favorites] Load Favorites Failure',
    props<{ error: any }>()
);

export const addFavorite = createAction(
    '[Favorites] Add Favorite',
    props<{ job: Job }>()
);

export const addFavoriteSuccess = createAction(
    '[Favorites] Add Favorite Success',
    props<{ favorite: FavoritesOffers }>()
);

export const addFavoriteFailure = createAction(
    '[Favorites] Add Favorite Failure',
    props<{ error: any }>()
);

export const removeFavorite = createAction(
    '[Favorites] Remove Favorite',
    props<{ offerId: number }>()
);

export const removeFavoriteSuccess = createAction(
    '[Favorites] Remove Favorite Success',
    props<{ offerId: number }>()
);

export const removeFavoriteFailure = createAction(
    '[Favorites] Remove Favorite Failure',
    props<{ error: any }>()
);

export const clearFavorites = createAction(
    '[Favorites] Clear Favorites'
);
