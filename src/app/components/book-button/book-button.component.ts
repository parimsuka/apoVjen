import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Trip } from 'src/app/model/trip/Trip';
import { AppState } from 'src/store/AppState';
import { book } from 'src/store/book/book.actions';
import { BookState } from 'src/store/book/BookState';
import { hide, show } from 'src/store/loading/loading.actions';

@Component({
  selector: 'app-book-button',
  templateUrl: './book-button.component.html',
  styleUrls: ['./book-button.component.scss'],
})
export class BookButtonComponent implements OnInit {

  @Input() trip: Trip;

  bookTripSubscription: Subscription;

  constructor(private store: Store<AppState>, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.bookTripSubscription = this.store.select('bookTrip').subscribe(bookTripState => {
      this.onBookedTrip(bookTripState);

      this.toggleLoading(bookTripState);

      this.onError(bookTripState);
    })
  }
  
  ngOnDestroy() {
    if(this.bookTripSubscription) {
      this.bookTripSubscription.unsubscribe();
    }
  }

  private toggleLoading(bookTripState: BookState) {
    if(bookTripState.isBooking) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private onBookedTrip(bookTripState: BookState) {
    if(bookTripState.isBooked) {
      console.log('Booked trip');
      // this.router.navigate(['/tabs/trip', {tripData: JSON.stringify(this.trip)}]);
    }
  }

  bookTrip() {
    const loggedInUserID = JSON.parse(localStorage.getItem('loggedInUser')).user.id;
    if (!this.trip.bookedBy.includes(loggedInUserID)) {
      this.store.dispatch(book({userID: loggedInUserID, tripID: this.trip.id}));
    } else {
      this.toastController.create({
        message: '',
        duration: 3000,
        header: 'User has already booked this trip'
      }).then(toast => toast.present());
    }
    
  }

  private onError(bookTripState: BookState) {
    if (bookTripState.error) {
      this.toastController.create({
        message: bookTripState.error.message,
        duration: 5000,
        header: 'Could not book trip'
      }).then(toast => toast.present());
    }
  }

}
