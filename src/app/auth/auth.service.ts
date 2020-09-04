import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';


import { User }  from './user.model';
import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';



@Injectable()
export class AuthService{
    private user: User;
    authChange= new Subject<boolean>();
    private authenticated=false;
    private snackBar: MatSnackBar;

    constructor(private router: Router, 
        private afAuth: AngularFireAuth, 
        private trainingService: TrainingService,
        private uiService: UIService){

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
        this.uiService.loadingStateChanged.next(true);
      this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result=>{
        this.uiService.loadingStateChanged.next(false);

      })
      .catch(error=>{
        this.uiService.loadingStateChanged.next(false);
          
          alert(error.message);
      });
    }

    //for logging in
    loginUser(authData: AuthData){
        this.uiService.loadingStateChanged.next(true);
       this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
       .then(result=>{
        this.uiService.loadingStateChanged.next(false);

       })
       .catch(error=>{
        this.uiService.loadingStateChanged.next(false);

        alert(error.message);
       });
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