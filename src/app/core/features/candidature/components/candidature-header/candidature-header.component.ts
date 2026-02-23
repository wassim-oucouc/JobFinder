import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Candidature} from '../../../../model/Candidature';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-candidature-header',
  imports: [CommonModule],
  standalone : true,
  templateUrl: './candidature-header.component.html',
  styleUrl: './candidature-header.component.css'
})

export class CandidatureHeaderComponent {

  @Input() candidatures: Candidature[] = [];


  statistics: any = {
    total: 0,
    enAttente: 0,
    accepte: 0,
    refuse: 0
  };

  activeFilter: string = 'all';



  constructor() {}






  ngOnChanges(): void {
    this.calculateStatistics();
  }

  private calculateStatistics(): void {
    this.statistics.total = this.candidatures.length;
    this.statistics.enAttente = this.candidatures.filter(c => c.status === 'En attente').length;
    this.statistics.accepte = this.candidatures.filter(c => c.status === 'Accepté').length;
    this.statistics.refuse = this.candidatures.filter(c => c.status === 'Refusé').length;
  }



}
