import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';


import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() onToggleHeader =new EventEmitter<void>();
  isAuth= false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription=this.authService.authChange.subscribe(authStatus=>{
      this.isAuth= authStatus;

    })
  }

  onToggleSideNav(){
   this.onToggleHeader.emit();
  }


  onLogout(){
    this.authService.logout();
  }
  //unsubscribing the event
  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

}
