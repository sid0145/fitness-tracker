import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loadingSubs: Subscription;
  isloading=false;

  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {
    this.loadingSubs=this.uiService.loadingStateChanged.subscribe(isloading=>{
      this.isloading=isloading;
    })
  }

  //login with user data 
onLogin(form: NgForm){
  this.authService.loginUser({
    email: form.value.email,
    password: form.value.password
  });
}

ngOnDestroy(){
  this.loadingSubs.unsubscribe();
}

}
