import { Component } from '@angular/core';
import {JobsListComponent} from '../../components/jobs-list/jobs-list.component';

@Component({
  selector: 'app-jobs',
  imports: [JobsListComponent],
  standalone : true,
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent {

}
