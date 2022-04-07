import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../../model/trip/Trip';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class CreateTripService {

  constructor(private backEndService: BackendService) { }

  createTrip(trip: Trip) : Observable<void> {
    return new Observable<void>(observer => {
      setTimeout(() => {
        this.backEndService.createTrip(trip).subscribe();
        observer.next();
        observer.complete();
      }, 2000)
    });
  }
}
