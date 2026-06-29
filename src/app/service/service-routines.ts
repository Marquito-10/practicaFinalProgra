import { Injectable, signal } from '@angular/core';
import { RoutineModel, NewRoutineModel } from '../model/routine-model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceRoutines {

  private apiURL = 'http://localhost:4200/';
  private stateRoutines = signal<RoutineModel[]>([]);
  public routines = this.stateRoutines.asReadonly();

  constructor(private http: HttpClient){
    this.getRoutines();
  }

  getRoutines(){
    this.http.get<RoutineModel[]>(this.apiURL).subscribe(
      data => {
        this.stateRoutines.set(data);
      }
    )
  }

  postRoutines(NewData : NewRoutineModel):Observable<RoutineModel>{
    return this.http.post<RoutineModel>(this.apiURL, NewData).pipe(
      tap(
        NewRoutine => {
          this.stateRoutines.update(currentsRoutines => [...currentsRoutines, NewRoutine])
        }
      )
    )
  }

  deleteRoutines(id : String):Observable<RoutineModel>{
    return this.http.delete<RoutineModel>(`${this.apiURL}/${id}`).pipe(
      tap(
        () => {
          this.stateRoutines.update(currentsEvents => [...currentsEvents.filter(routines => (routines.Id !== id))])
        }
      )
    )
  }

  getById(id : String){
    return this.http.get<RoutineModel[]>(`${this.apiURL}/${id}`).subscribe(
      data => {
        this.stateRoutines.set(data);
      }
    )
  }

  updateRoutines(id:String, updatedData:RoutineModel):Observable<RoutineModel>{
    return this.http.put<RoutineModel>(`${this.apiURL}/${id}`, updatedData).pipe(
      tap(
        updatedRoutine => {
          this.stateRoutines.update(currentsRoutines => currentsRoutines.map(routines => routines.Id === id ? updatedRoutine : routines))
        }
      )
    )
  }

}


