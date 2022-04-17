import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Trip } from 'src/app/model/trip/Trip';
import { UserRegister } from 'src/app/model/user/UserRegister';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {

  editable: boolean;
  showBookButton: boolean;
  trip: Trip;
  bookedUsers: UserRegister[] = [];

  constructor(private route: ActivatedRoute, private backEndService: BackendService, private router: Router,
            private toastController: ToastController) {
    this.route.params.subscribe(param => {
      this.trip = JSON.parse(param['tripData']);
      this.initializeBookedUsers(this.trip.bookedBy);
    });
  }

  ngOnInit() {
    console.log('trip on trip page', this.trip);
    this.isTripEditable();
    this.shouldShowBookButton();
  }

  ionViewDidEnter() {
    
  }

  ionViewDidLeave() {

  }

  ngAfterViewInit() {
  }

  initializeBookedUsers(bookedBy: string[]) {
    if (bookedBy !== undefined) {
      this.bookedUsers = [];
      bookedBy.forEach(userID => this.getUser(userID));
    }
  }

  goToChatPage() {
    const loggedInUserID = JSON.parse(localStorage.getItem('loggedInUser')).user.id;
    if (this.trip.bookedBy !== undefined && this.trip.bookedBy.includes(loggedInUserID)) {
      this.router.navigate(['/chat', {tripID: this.trip.id}]);
    } else {
      this.toastController.create({
        message: '',
        duration: 1000,
        header: 'Cant see chat if the trip is not booked'
      }).then(toast => toast.present());
    }
  }

  isTripEditable() {
    const loggedInUserID = JSON.parse(localStorage.getItem('loggedInUser')).user.id;

    this.getUserByID(loggedInUserID).then(user => {
      if (this.trip.username === user.name) {
        this.editable = true;
      }
    })
  }
  
  shouldShowBookButton() {
    const loggedInUserID = JSON.parse(localStorage.getItem('loggedInUser')).user.id;

    if (this.trip.bookedBy !== undefined && this.trip.bookedBy.includes(loggedInUserID)) {
      this.showBookButton = false;
    } else {
      this.showBookButton = true;
    }
  }

  deleteTrip() {
    this.backEndService.deleteTrip(this.trip.id).subscribe();
    this.router.navigate(['tabs/tab1']);
  }

  private getUser(id: string) {
    this.backEndService.getUser(id).subscribe(user => {
      this.bookedUsers.push(user);
    });
  }

  private getUserByID(id: string) {
    return this.backEndService.getUser(id).toPromise();
  }

}
