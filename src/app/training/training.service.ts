import { Exercise }  from  './exercise.model';
import { Subject, Observable, pipe, Subscription} from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class TrainingService {
   
    excerceiseChanged=new Subject<Exercise>();
    exeChanged=new Subject<Exercise[]>();
    private runningExcercise: Exercise;
    availableExcercises: Exercise[]=[];
    finishedExcercises=new Subject<Exercise[]>();

    fbSubs: Subscription[]=[];

    constructor(private db: AngularFirestore){}

    fetchAvailableExercises(){
       this.fbSubs.push(this.db.collection('availableExercises')
       .snapshotChanges()
       .pipe(map(docArray=>{
      return docArray.map(doc=>{
            const data = doc.payload.doc.data() as Exercise;
            const id = doc.payload.doc.id;
            return {id, ...data};
      });
    })).subscribe((exercises )=>{
        this.availableExcercises=exercises;
 
       this.exeChanged.next([...this.availableExcercises]);
    })) ;
    }


      startExcercise(selectedId: string){
        this.runningExcercise=this.availableExcercises.find(ex =>ex.id=== selectedId);
        this.excerceiseChanged.next({ ...this.runningExcercise });
    }

    completed(){
    this.addDataToDatabase(
        {
        ...this.runningExcercise,
        date: new Date(),
        state: 'completed'  
    }
    );
    this.runningExcercise= null;
    this.excerceiseChanged.next(null);
    }

    cancelled(progress :number){
        this.addDataToDatabase({
            ...this.runningExcercise,
            duration: this.runningExcercise.duration * (progress / 100),
            calories: this.runningExcercise.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'  
        });
        this.runningExcercise= null;
        this.excerceiseChanged.next(null);

    }


    getRunningTraining(){
        return {...this.runningExcercise};
    }


    fetchedCompletedOrCancelledExcercise(){
        this.fbSubs.push(this.db.collection('finishedExercises').valueChanges()
        .subscribe((excercises: Exercise[])=>{
            this.finishedExcercises.next(excercises);
        }));
    }

    cancelSubscription(){
        this.fbSubs.forEach(sub=>sub.unsubscribe());
    }

  private addDataToDatabase(excercise :Exercise){
      this.db.collection("finishedExercises").add(excercise);
  }


}