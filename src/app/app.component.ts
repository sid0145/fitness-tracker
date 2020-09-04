import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fitness-tracker';
  openSidenav= true;

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.authService.initAuthListner();

  }

  clickMe(){
    this.openSidenav=!this.openSidenav;
  }
}
