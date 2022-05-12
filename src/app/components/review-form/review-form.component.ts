import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Review } from 'src/app/model/review/Review';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.actions';
import { review } from 'src/store/review/review.actions';
import { ReviewState } from 'src/store/review/ReviewState';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
})
export class ReviewFormComponent implements OnInit {

  reviewStateSubscription: Subscription;

  ishidden = false;

  constructor(public modalController: ModalController, private store: Store<AppState>, private toastController: ToastController) { }

  ngOnInit() {
    this.reviewStateSubscription = this.store.select('review').subscribe(reviewState => {
      this.onReviewed(reviewState);
      this.onError(reviewState);

      this.toggleLoading(reviewState);
    })
  }

  ngOnDestroy() {
    if(this.reviewStateSubscription) {
      this.reviewStateSubscription.unsubscribe();
    }
  }


  close() {
    this.modalController.dismiss({
      'dismissed': true
    }).then(() => console.log('closed'))
    .catch(error => console.log('error'));
  }

  addReview() {
    this.store.dispatch(review({review: new Review()}));
  }

  private toggleLoading(reviewState: ReviewState) {
    if(reviewState.isReviewing) {
      this.store.dispatch(show());
      this.ishidden = true;
    } else {
      this.store.dispatch(hide());
    }
  }

  private onReviewed(reviewState: ReviewState) {
    if(reviewState.isReviewed) {
      console.log('Reviewed');
      this.close();
    }
  }

  private onError(reviewState: ReviewState) {
    if(reviewState.error) {
      console.log('here');
      this.toastController.create({
        message: reviewState.error.code,
        duration: 2000,
        header: 'Could not complete review'
      }).then(toast => toast.present().then(() => {
        this.close();
      }));
    }
  }

}
