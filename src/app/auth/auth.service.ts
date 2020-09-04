import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';


import { User }  from './user.model';
import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';



@Injectable()
export class AuthService{
    private user: User;
    authChange= new Subject<boolean>();
    private authenticated=false;

    constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService){

    }

    initAuthListner(){
        this.afAuth.authState.subscribe(user=>{
            if(user){
                this.authenticated=true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            }else{
                this.trainingService.cancelSubscription();
                this.router.navigate(['/login']);
                this.authChange.next(false);
                this.authenticated=false;
            }
        })
    }


    //for signup new user
    resisterUser(authData: AuthData){
      this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result=>{
      })
      .catch(err=>{
          console.log(err);
      })
    }

    //for logging in
    loginUser(authData: AuthData){
       this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
       .then(result=>{
       })
       .catch(err=>{
       })
    }

    //for logging out
    logout(){
        this.afAuth.auth.signOut();
      
    }


   //checking the user is authenticated or not

    isAuth(){
        return this.authenticated;
    }
}