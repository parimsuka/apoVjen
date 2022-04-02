import { Injectable } from '@angular/core';
import { ProcessItem } from 'src/app/components/proces-item';
import { TripComponent } from 'src/app/components/trip/trip.component';
import { Trip } from 'src/app/model/trip/Trip';
import { CreateTripBackendService } from '../create-trip-backend/create-trip-backend.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  trips: Trip[] = [];

  ngOnInit() {
  }

  private dummyJSONResponse = {
    items: [
      {
        time: "123",
        username: "asfd",
        from: "a",
        to: "b",
        availablePlaces: '3'
      },
      {
        time: "321",
        username: "dsas",
        from: "c",
        to: "d",
        availablePlaces: '4'
      }
    ],
  }

  constructor(private createTripBackEnd: CreateTripBackendService) { }

  getTrips() : ProcessItem[] {
    let result: ProcessItem[] = [];

    for(let item of this.dummyJSONResponse.items) {
      let newItem = new ProcessItem(TripComponent, item);

      result.push(newItem);
    }
    return result;
  }

}
