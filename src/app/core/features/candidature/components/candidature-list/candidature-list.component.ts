import {Component, OnInit} from '@angular/core';
import {Candidature} from '../../../../model/Candidature';
import {CandidatureServiceService} from '../../../../services/candidature-service/candidature-service.service';
import {CandidatureCardComponent} from '../candidature-card/candidature-card.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-candidature-list',
  imports: [
    CandidatureCardComponent,
    CommonModule
  ],
  standalone : true,
  templateUrl: './candidature-list.component.html',
  styleUrl: './candidature-list.component.css'
})
export class CandidatureListComponent implements OnInit {


  candidatures: Candidature[] = [];
  filteredCandidatures: Candidature[] = [];
  searchTerm: string = '';
  sortBy: string = 'date_desc';
  showSortDropdown: boolean = false;



  constructor(private candidatureService: CandidatureServiceService) {}


  ngOnInit(): void {
    this.loadCandidatures();
  }


  loadCandidatures(): void {
    this.candidatureService.getFollowedCandidatures().subscribe(data => {
      this.candidatures = data;
      console.log(data);
    });
  }

  toggleSortDropdown(): void {
    this.showSortDropdown = !this.showSortDropdown;
  }

  onSortChange(sortKey: string): void {
    this.sortBy = sortKey;
    this.showSortDropdown = false;
  }

  onCandidatureDeleted(id: number): void {
    this.candidatures = this.candidatures.filter(c => c.id !== id);
    this.loadCandidatures();
  }

}
