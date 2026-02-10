import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';


@Component({
  selector: 'app-root',
  imports: [RouterModule],
  standalone : true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jobFinder';
}
