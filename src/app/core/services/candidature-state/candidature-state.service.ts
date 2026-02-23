import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Candidature } from '../../model/Candidature';
import { CandidatureServiceService } from '../candidature-service/candidature-service.service';
import { LocalStorageService } from '../localstorage-service/local-storage.service';
import { Job } from '../../model/Job';

@Injectable({
    providedIn: 'root'
})
export class CandidatureStateService {

    private _candidatures$ = new BehaviorSubject<Candidature[]>([]);
    candidatures$: Observable<Candidature[]> = this._candidatures$.asObservable();

    constructor(
        private candidatureService: CandidatureServiceService,
        private localStorageService: LocalStorageService
    ) { }

    /** Charger les candidatures depuis l'API */
    loadCandidatures(force: boolean = false): void {
        if (!force && this._candidatures$.getValue().length > 0) return;

        const user = this.localStorageService.getUser();
        if (!user) return;

        this.candidatureService.getFollowedCandidatures().subscribe({
            next: (data) => this._candidatures$.next(data),
            error: (err) => console.error('Erreur chargement candidatures', err)
        });
    }

    /** Ajouter une candidature (suivre un job) */
    trackJob(job: Job): Observable<Candidature> {
        const user = this.localStorageService.getUser();
        const candidature: Omit<Candidature, 'id'> = {
            userId: user?.id ?? 0,
            offerId: job.id,
            apiSource: 'The Muse',
            title: job.name,
            company: job.company.name,
            location: job.locations[0]?.name ?? 'Distance',
            url: job.refs.landing_page,
            status: 'En attente',
            notes: '',
            dateAdded: new Date()
        };

        return this.candidatureService.followCandidature(candidature as Candidature).pipe(
            tap(saved => {
                const current = this._candidatures$.getValue();
                this._candidatures$.next([...current, saved]);
            })
        );
    }

    /** Supprimer une candidature */
    removeCandidature(id: number): void {
        this.candidatureService.removeCandidature(id).subscribe({
            next: () => {
                const updated = this._candidatures$.getValue().filter(c => c.id !== id);
                this._candidatures$.next(updated);
            },
            error: (err) => console.error('Erreur suppression candidature', err)
        });
    }

    /** Vider l'état au logout */
    clearState(): void {
        this._candidatures$.next([]);
    }

    /** Vérifier si un job est déjà suivi */
    isJobTracked(jobId: number): boolean {
        return this._candidatures$.getValue().some(c => c.offerId === jobId);
    }
}
