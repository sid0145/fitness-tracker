import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate;
  isLoading=false;
  loadingSubs: Subscription;

  constructor(private authService: AuthService, private uiService:UIService) { }

  ngOnInit() {
    this.loadingSubs= this.uiService.loadingStateChanged.subscribe(isLoading=>{
      this.isLoading=isLoading;
    })
    this.maxDate=new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }


  //resistering the new user 
  onSubmit(form: NgForm){
   this.authService.resisterUser({
     email: form.value.email,
     password: form.value.password
   });
  }

  ngOnDestroy(){
    if(this.loadingSubs){
      this.loadingSubs.unsubscribe();
    }
  }

}
