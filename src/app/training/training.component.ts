import { Component, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  onGoingTraining : boolean= false;

  trainingSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingSubscription=this.trainingService.excerceiseChanged.subscribe(
      excercise=>{
        if(excercise){
          this.onGoingTraining=true;
        }else{
          this.onGoingTraining=false;
        }
      }
    )
  }

}
