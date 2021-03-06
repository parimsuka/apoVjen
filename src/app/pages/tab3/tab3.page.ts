import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ChangePasswordFormComponent } from 'src/app/components/change-password-form/change-password-form.component';
import { BackendService } from 'src/app/services/backend/backend.service';
import { AppState } from 'src/store/AppState';
import { changeProfilePic } from 'src/store/changeProfilePic/changeProfilePic.actions';
import { ChangeProfilePicState } from 'src/store/changeProfilePic/ChangeProfilePicState';
import { hide, show } from 'src/store/loading/loading.actions';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  img: string;
  changeProfilePicStateSubscription: Subscription;
  userName: string;
  nrOfTrips: string;

  constructor(private router: Router, private store: Store<AppState>, private backEndService: BackendService,
              public modalController: ModalController) {

  }

  ionViewDidEnter() {
    this.ngOnInit();
  }

  ngOnInit() {
    this.getProfilePicture();
    this.getLoggedInUserName();
    this.getNrOfTrips();

    this.changeProfilePicStateSubscription = this.store.select('changeProfilePic').subscribe(changeProfilePicState => {
      this.onProfilePicChanged(changeProfilePicState);

      this.toggleLoading(changeProfilePicState);
    })
  }

  ngOnDestroy() {
    if(this.changeProfilePicStateSubscription) {
      this.changeProfilePicStateSubscription.unsubscribe();
    }
  }

  private toggleLoading(changeProfilePicState: ChangeProfilePicState) {
    if(changeProfilePicState.isChangingProfilePic) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private onProfilePicChanged(changeProfilePicState: ChangeProfilePicState) {
    if(changeProfilePicState.isProfilePicChanged) {
      this.getProfilePicture();
    }
  }

  changeProfilePic(event) {
    if(event.target.files.length != 0) {
      this.store.dispatch(changeProfilePic({img: event.target.files[0]}));
    }
  }

  getProfilePicture() {
    const loggedInUserID = JSON.parse(localStorage.getItem('loggedInUser')).user.id;
    this.backEndService.getProfilePictureURL(loggedInUserID).then(imgURL => {
      this.img = imgURL;
    });
  }

  getNrOfTrips() {
    const loggedInUserID = JSON.parse(localStorage.getItem('loggedInUser')).user.id;
    this.backEndService.getTripsNumberWithIdOwner(loggedInUserID).subscribe(result => {
      this.nrOfTrips = result.toString();
    });
  }

  goToEditPage() {
    this.router.navigateByUrl('tabs/edit-profile');
  }

  goToDisplayPage() {
    this.router.navigateByUrl('tabs/display');
  }

  goToChangeLanguagePage() {
    this.router.navigateByUrl('tabs/change-language');
  }

  private getLoggedInUserName() {
    const loggedInUserID = JSON.parse(localStorage.getItem('loggedInUser')).user.id;
    this.backEndService.getUser(loggedInUserID).subscribe(user => {
      this.userName = user.name;
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ChangePasswordFormComponent
    });
    return await modal.present();
  }
}

