import { NgForm } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';



import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  @Output() trainingStart =new EventEmitter<void>();

  excercises: Exercise[];
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
   this.exerciseSubscription=this.trainingService.exeChanged
   .subscribe(excercises=>{
     this.excercises=excercises;
   });
    this.trainingService.fetchAvailableExercises();
  }

  onTrainingStart(form: NgForm){
   this.trainingService.startExcercise(form.value.excercise);
  } 

  ngOnDestroy(){
    this.exerciseSubscription.unsubscribe();
  }

}
