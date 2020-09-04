import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns=['date', 'name', 'calories', 'duration', 'state'];

  dataSource= new MatTableDataSource<Exercise>();

  excerciseChangedSubscription: Subscription;

  @ViewChild(MatSort, {static:false}) sort: MatSort;
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
   this.excerciseChangedSubscription= this.trainingService.finishedExcercises.subscribe(excersises=>{
      this.dataSource.data=excersises;

    })
    this.trainingService.fetchedCompletedOrCancelledExcercise();
  }
  ngAfterViewInit(){
    this.dataSource.sort= this.sort;
    this.dataSource.paginator= this.paginator;
  }

  onFiltering(value: string){
    this.dataSource.filter= value.trim().toLowerCase();
  }

  ngOnDestroy(){
    this.excerciseChangedSubscription.unsubscribe();
  }

}
