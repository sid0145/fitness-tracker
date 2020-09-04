import { Component, OnInit, Output ,EventEmitter, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';


import { AuthService } from 'src/app/auth/auth.service';



@Component({
  selector: 'app-sidnav-list',
  templateUrl: './sidnav-list.component.html',
  styleUrls: ['./sidnav-list.component.css']
})
export class SidnavListComponent implements OnInit, OnDestroy {

  isAuth=false;
  authSubscription: Subscription

  @Output() onCloseMenu=new EventEmitter<void>();

  constructor(private authSerice: AuthService) { }

  ngOnInit() {
    this.authSubscription= this.authSerice.authChange.subscribe(authStatus=>{
      this.isAuth=authStatus;
    })
  }
 onCloseSidenav(){
   this.onCloseMenu.emit();
 }

 onLogout(){
   this.onCloseSidenav();
   this.authSerice.logout();
 }

 ngOnDestroy(){
   this.authSubscription.unsubscribe();
 }

}
