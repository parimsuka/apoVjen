import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip } from 'src/app/model/trip/Trip';
import { UserRegister } from 'src/app/model/user/UserRegister';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {

  trip: Trip;
  bookedUsers: UserRegister[] = [];

  constructor(private route: ActivatedRoute, private backEndService: BackendService) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.trip = JSON.parse(param['tripData']);
      this.initializeBookedUsers(this.trip.bookedBy);
    });
  }

  ionViewDidEnter() {
  }

  ngAfterViewInit() {
  }

  initializeBookedUsers(bookedBy: string[]) {
    if (bookedBy !== undefined) {
      bookedBy.forEach(userID => this.getUser(userID));
    }
  }

  private getUser(id: string) {
    this.backEndService.getUser(id).subscribe(user => {
      this.bookedUsers.push(user);
    });
  }

}
