import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/model/trip/Trip';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
})
export class TripsComponent implements OnInit {

  trips: Trip[];
  loggedInUserID = JSON.parse(localStorage.getItem('loggedInUser')).user.id;
  filterMytrips: boolean;

  constructor(private backEndService: BackendService) { }

  ngOnInit() { 
    this.initializeTrips();
  }

  initializeTrips() {
    this.backEndService.getAllTrips().subscribe(trips => {
      this.trips = trips;
    });
  }

  addTrip(trip: Trip) {
    this.backEndService.createTrip(trip).subscribe(tripID => {
      this.trips.push(trip);
    })
  }

}
