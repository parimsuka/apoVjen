import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ReviewFormComponent } from 'src/app/components/review-form/review-form.component';
import { Comment } from 'src/app/model/comment/Comment';
import { Review } from 'src/app/model/review/Review';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  userID: string;
  loggedInUserID: string;
  userName: string;
  loggedInUserName: string;
  img: string;
  loggedInUserImgURL: string;
  reviews: Observable<any[]>;
  comments:  Observable<any[]>;
  hasReviewed: boolean;
  newComment = '';
  nrOfTrips: string;
  averageReview: Review = {
    for: '',
    from:'',
    polite: 0,
    drivingSafe: 0,
    vehicle: 0,
    service: 0,
    helpful: 0
  };

  constructor(private route: ActivatedRoute, private backEndService: BackendService, private chatService: ChatService,
              public modalController: ModalController) {
    this.route.params.subscribe(param => {
      this.userID = JSON.parse(param['userID']);
    });

   this.loggedInUserID = JSON.parse(localStorage.getItem('loggedInUser')).user.id;
  }

  ngOnInit() {
    this.getProfilePicture();
    this.getUserNameFromId(this.userID);
    this.getReviewsByID();
    this.getReviewFromUserForUser();
    this.getCommentsByID();
    this.getNrOfTrips();
  }

  getUserNameFromId(ID: string) {
    this.backEndService.getUser(ID).subscribe(user => {
      this.userName = user.name;
    });

    this.backEndService.getUser(this.loggedInUserID).subscribe(user => {
      this.loggedInUserName = user.name;
    });
  }

  getProfilePicture() {
    this.backEndService.getProfilePictureURL(this.userID).then(imgURL => {
      this.img = imgURL;
    });

    this.backEndService.getProfilePictureURL(this.loggedInUserID).then(imgURL => {
      this.loggedInUserImgURL = imgURL;
    });
  }

  getReviewsByID() {
    this.reviews = this.chatService.getReviewsByID(this.userID);
    this.findAverageOfReviews();
  }

  getReviewFromUserForUser() {
    this.chatService.getReviewFromUserForUser(this.loggedInUserID, this.userID).subscribe(review => {
      this.hasReviewed = review.length > 0;
      console.log(review);
    });
  }

  getNrOfTrips() {
    const loggedInUserID = JSON.parse(localStorage.getItem('loggedInUser')).user.id;
    this.backEndService.getTripsNumberWithIdOwner(loggedInUserID).subscribe(result => {
      this.nrOfTrips = result.toString();
    });
  }

  findAverageOfReviews() {
    this.reviews.subscribe(item => {
      this.averageReview = item.reduce((a, b) => {
        delete b['for'];
        delete b['from'];
        for (let k in b) {
          if (b.hasOwnProperty(k))
            a[k] = (a[k] || 0) + b[k];
        }
        return a;
      }, {});


      const size = item.length;
      for(const key of Object.keys(this.averageReview)) {
        this.averageReview[key] = Math.round(this.averageReview[key] / size);
      }

      //console.log('test', this.averageReview);

    });
  }

  getCommentsByID() {
    this.comments = this.chatService.getCommentsByID(this.userID);

    //Getting profile pic of user that commented
    // this.comments = this.comments.map(comment => { 
    //   return {
    //   ...comment,
    //   img: this.backEndService.getProfilePictureURL(comment.from).then(imgURL => {
    //     return imgURL;
    //   })
    // }});
  }

  addComent() {
    this.chatService.addComent(this.userID, this.loggedInUserID, this.newComment, this.loggedInUserImgURL, this.loggedInUserName).then(() => {
      this.newComment = '';
    });
  }


  async presentReviewModal() {
    const modal = await this.modalController.create({
      component: ReviewFormComponent,
      componentProps: { 
        forUser: this.userID,
        fromUser: this.loggedInUserID
      }
    });
    return await modal.present();
  }

}
