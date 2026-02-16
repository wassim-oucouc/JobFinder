import {Component, OnInit} from '@angular/core';
import {CandidatureHeaderComponent} from '../../components/candidature-header/candidature-header.component';
import {CandidatureListComponent} from '../../components/candidature-list/candidature-list.component';
import {CandidatureServiceService} from '../../../../services/candidature-service/candidature-service.service';
import {Candidature} from '../../../../model/Candidature';

@Component({
  selector: 'app-candidature-page',
  imports: [CandidatureHeaderComponent,CandidatureListComponent],
  templateUrl: './candidature-page.component.html',
  styleUrl: './candidature-page.component.css'
})
export class CandidaturePageComponent implements OnInit {

  candidatures: Candidature[] = [];


  constructor(private candidatureService: CandidatureServiceService) {
  }


  ngOnInit() {
    this.loadCandidatures();
  }


  loadCandidatures(): void {
    this.candidatureService.getFollowedCandidatures().subscribe(data => {
      this.candidatures = data;
      console.log(data);
    });

  }
}
