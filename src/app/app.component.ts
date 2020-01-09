import { Component } from '@angular/core';

import {Router} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'activeAi';
  constructor(private router: Router){

  }

  routeHomepage(){
    this.router.navigate(['/home']);
  }
  routeModule(){
    this.router.navigate(['/module']);
  }
}
