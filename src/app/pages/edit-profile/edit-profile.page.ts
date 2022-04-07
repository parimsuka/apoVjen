import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserRegister } from 'src/app/model/user/UserRegister';
import { BackendService } from 'src/app/services/backend/backend.service';
import { AppState } from 'src/store/AppState';
import { editProfile } from 'src/store/editProfile/editProfile.actions';
import { EditProfileState } from 'src/store/editProfile/EditProfileState';
import { hide, show } from 'src/store/loading/loading.actions';
import { EditProfilePageForm } from './form/edit-profile.page.form';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  editProfilePageForm: EditProfilePageForm;
  editProfileStateSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private toastController: ToastController,
              private router: Router, private backEnd: BackendService) { }

  ngOnInit() {
    this.createForm();

    this.watchEditProfileState();
  }

  ionViewDidEnter() {
    this.initializeLoggedInUser();
  }

  ngOnDestroy() {
      this.editProfileStateSubscription.unsubscribe();
  }

  editProfile() {
    this.editProfilePageForm.getForm().markAllAsTouched();

    if (this.editProfilePageForm.getForm().valid) {
      this.store.dispatch(editProfile({userRegister: this.editProfilePageForm.getForm().value}));
    }
  }

  private createForm() {
    this.editProfilePageForm = new EditProfilePageForm(this.formBuilder);
  }

  private watchEditProfileState() {
    this.editProfileStateSubscription = this.store.select('editProfile').subscribe(state => {
      this.toggleLoading(state);

      this.onProfileEdited(state);
      this.onError(state);
    })
  }

  private onProfileEdited(state: EditProfileState) {
    if (state.isProfileEdited) {
      this.router.navigateByUrl('tabs/tab3');
    }
  }

  private onError(state: EditProfileState) {
    if (state.error) {
      this.toastController.create({
        message: state.error.message,
        duration: 5000,
        header: 'Could not update profile'
      }).then(toast => toast.present());
    }
  }

  private toggleLoading(state: EditProfileState) {
    if(state.isEditingProfile) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private initializeLoggedInUser() {
    const loggedInUserID = JSON.parse(localStorage.getItem('loggedInUser')).user.id;
    this.backEnd.getUser(loggedInUserID).subscribe(user => {
      this.editProfilePageForm.setForm(user);
    });
  }

}
