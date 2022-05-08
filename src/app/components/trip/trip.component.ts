import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from 'src/app/model/trip/Trip';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {
  
  @Input() data: Trip;
  username: string;

  constructor(private router: Router, private backEndService: BackendService) { }

  ngOnInit() {
    this.getUserNameFromId();
  }

  getUserNameFromId() {
    this.backEndService.getUser(this.data.username).subscribe(user => {
      this.username = user.name;
    });
  }

  goToTripDetails() {
    this.router.navigate(['/tabs/trip', {tripData: JSON.stringify(this.data)}]);
  }
}
