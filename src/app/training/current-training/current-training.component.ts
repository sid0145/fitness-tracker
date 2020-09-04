import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';

import { StopTrainingComponent } from "./stop-training.component";
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress=0;
  timer:number; 

  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
    this.stopOrResume();
  }

stopOrResume(){
  const step=this.trainingService.getRunningTraining().duration / 100 *1000;
    this.timer =setInterval(()=>{
    this.progress=this.progress + 1;
    if(this.progress >=100){
      this.trainingService.completed();
      clearInterval(this.timer)
    }
    }, step)
}

  onStop(){
    clearInterval(this.timer);
    const dialogRef= this.dialog.open(StopTrainingComponent, {
      data:{
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
      if(result){
        this.trainingService.cancelled(this.progress);
      }
      else{
        this.stopOrResume();
      }
    })
  }

}