import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/localstorage-service/local-storage.service';

export const authGuard: CanActivateFn = () => {
    const localStorageService = inject(LocalStorageService);
    const router = inject(Router);

    if (localStorageService.getAuthenticated()) {
        return true;
    }

    return router.createUrlTree(['/login']);
};
