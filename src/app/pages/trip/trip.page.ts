import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { ToastController } from '@ionic/angular';
import { addHours, addMinutes, format, parseISO } from 'date-fns';
import { Trip } from 'src/app/model/trip/Trip';
import { UserRegister } from 'src/app/model/user/UserRegister';
import { BackendService } from 'src/app/services/backend/backend.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {

  editable: boolean;
  showBookButton: boolean;
  trip: Trip;
  username: string;
  bookedUsers: UserRegister[] = [];
  formattedHour: string;
  formattedHourReach: string;
  showMap: boolean = true;

  newMap: GoogleMap;

  @ViewChild('map') mapRef: ElementRef<HTMLElement>;

  constructor(private route: ActivatedRoute, private backEndService: BackendService, private router: Router,
            private toastController: ToastController) {
    this.route.params.subscribe(param => {
      this.trip = JSON.parse(param['tripData']);
      this.initializeBookedUsers(this.trip.bookedBy);
    });
  }

  ngOnInit() {
    this.getUserNameFromId();
    this.isTripEditable();
    this.shouldShowBookButton();

    this.formattedHour = format(parseISO(this.trip.time), 'HH:mm');
    const date = new Date(this.trip.time);
    this.formattedHourReach = format(addMinutes(addHours(date, this.trip.duration.hours), this.trip.duration.minutes), 'HH:mm');
  }

  ionViewDidEnter() {
    
  }

  ionViewDidLeave() {

  }

  ngAfterViewInit() {
    this.createMap();
  }

  initializeBookedUsers(bookedBy: string[]) {
    if (bookedBy !== undefined) {
      this.bookedUsers = [];
      bookedBy.forEach(userID => this.getUser(userID));
    }
  }

  getUserNameFromId() {
    this.backEndService.getUser(this.trip.username).subscribe(user => {
      this.username = user.name;
    });
  }

  goToChatPage() {
    const loggedInUserID = JSON.parse(localStorage.getItem('loggedInUser')).user.id;
    if ((this.trip.bookedBy !== undefined && this.trip.bookedBy.includes(loggedInUserID)) || this.trip.username === loggedInUserID) {
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
      if (this.trip.username === user.uid) {
        this.editable = true;
      } else {
        this.editable = false;
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

  goToUserProfile() {
    this.router.navigate(['/user-profile', {userID: JSON.stringify(this.trip.username)}]);
  }

  triggerMap() {
    this.showMap = !this.showMap;
  }

  async createMap() {
    try {
      this.newMap = await GoogleMap.create({
        id: 'my-map',
        element: this.mapRef.nativeElement,
        apiKey: environment.firebaseConfig.apiKey,
        config: {
          center: {
            lat: this.trip.fromObject.geometry.location.lat,
            lng: this.trip.fromObject.geometry.location.lng
          },
          zoom: 8,
        },
      });

      this.addMarker(
        this.trip.fromObject.geometry.location.lat,
        this.trip.fromObject.geometry.location.lng
      );

      this.addMarker(
        this.trip.toObject.geometry.location.lat,
        this.trip.toObject.geometry.location.lng
      );
    } catch (error) {
      console.log(error);
    }
  }

  async addMarker(lat, lng) {
    await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng
      },
      draggable: false
    });
  }

  completeTrip() {
    this.backEndService.completeTrip(this.trip.id).subscribe();
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
