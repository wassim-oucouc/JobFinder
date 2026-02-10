import { Component } from '@angular/core';
import {CommonJsUsageWarnPlugin} from '@angular-devkit/build-angular/src/tools/webpack/plugins';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-auth-sidebar',
  imports: [CommonModule],
  standalone : true,
  templateUrl: './auth-sidebar.component.html',
  styleUrl: './auth-sidebar.component.css'
})
export class AuthSidebarComponent {

}
