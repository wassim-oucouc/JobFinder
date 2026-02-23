import { createReducer, on } from '@ngrx/store';
import { FavoritesOffers } from '../../core/model/FavoritesOffers';
import * as FavoritesActions from './favorites.actions';

export interface FavoritesState {
    favorites: FavoritesOffers[];
    loading: boolean;
    error: any;
}

export const initialState: FavoritesState = {
    favorites: [],
    loading: false,
    error: null
};

export const favoritesReducer = createReducer(
    initialState,

    // Load
    on(FavoritesActions.loadFavorites, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(FavoritesActions.loadFavoritesSuccess, (state, { favorites }) => ({
        ...state,
        favorites,
        loading: false
    })),
    on(FavoritesActions.loadFavoritesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Add
    on(FavoritesActions.addFavorite, (state) => ({
        ...state,
        loading: true
    })),
    on(FavoritesActions.addFavoriteSuccess, (state, { favorite }) => ({
        ...state,
        favorites: [...state.favorites, favorite],
        loading: false
    })),
    on(FavoritesActions.addFavoriteFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Remove
    on(FavoritesActions.removeFavorite, (state) => ({
        ...state,
        loading: true
    })),
    on(FavoritesActions.removeFavoriteSuccess, (state, { offerId }) => ({
        ...state,
        favorites: state.favorites.filter(f => f.offerId !== offerId),
        loading: false
    })),
    on(FavoritesActions.removeFavoriteFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Clear
    on(FavoritesActions.clearFavorites, () => initialState)
);
