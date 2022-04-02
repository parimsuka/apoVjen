import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/model/trip/Trip';
import { CreateTripBackendService } from 'src/app/services/create-trip-backend/create-trip-backend.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
})
export class TripsComponent implements OnInit {

  trips: Trip[];

  constructor(private createTripBackEnd: CreateTripBackendService) { }

  ngOnInit() { 
    this.initializeTrips();
  }

  initializeTrips() {
    this.createTripBackEnd.getAllTrips().subscribe(trips => {
      this.trips = trips;
    });
  }

  addTrip(trip: Trip) {
    this.createTripBackEnd.createTrip(trip).subscribe(tripID => {
      console.log(tripID);
      this.trips.push(trip);
    })
  }

}
