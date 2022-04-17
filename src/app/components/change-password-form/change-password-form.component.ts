import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/store/AppState';
import { changePassword } from 'src/store/changePassword/changePassword.actions';
import { ChangePasswordState } from 'src/store/changePassword/ChangePasswordState';
import { hide, show } from 'src/store/loading/loading.actions';
import { ChangePasswordForm } from './change-password-form';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss'],
})
export class ChangePasswordFormComponent implements OnInit {

  changePasswordForm: ChangePasswordForm;
  changePasswordStateSubscription: Subscription;

  ishidden = false;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private toastController: ToastController,
            public modalController: ModalController) {

  }

  ngOnInit() {
    this.createForm();
    
    this.changePasswordStateSubscription = this.store.select('changePassword').subscribe(changePasswordState => {
      this.onPasswordChanged(changePasswordState);
      this.onError(changePasswordState);

      this.toggleLoading(changePasswordState);
    })
  }

  private createForm() {
    this.changePasswordForm = new ChangePasswordForm(this.formBuilder);
  }

  close() {
    this.modalController.dismiss({
      'dismissed': true
    }).then(() => console.log('closed'))
    .catch(error => console.log('looool'));
  }

  ngOnDestroy() {
    if(this.changePasswordStateSubscription) {
      this.changePasswordStateSubscription.unsubscribe();
    }
  }

  private toggleLoading(changePasswordState: ChangePasswordState) {
    if(changePasswordState.isChangingPassword) {
      this.store.dispatch(show());
      this.ishidden = true;
    } else {
      this.store.dispatch(hide());
    }
  }

  private onPasswordChanged(changePasswordState: ChangePasswordState) {
    if(changePasswordState.isPasswordChanged) {
      console.log('Changed');
      this.close();
    }
  }

  private onError(changePasswordState: ChangePasswordState) {
    if(changePasswordState.error) {
      console.log('here');
      this.toastController.create({
        message: changePasswordState.error.code,
        duration: 2000,
        header: 'Could not change password'
      }).then(toast => toast.present().then(() => {
        this.close();
      }));
    }
  }

  changePassword() {
    this.changePasswordForm.getForm().markAllAsTouched();

    if (this.changePasswordForm.getForm().valid) {
      this.store.dispatch(changePassword({currentPassword: this.changePasswordForm.getForm().get('currentPassword').value,
                              newPassword: this.changePasswordForm.getForm().get('password').value}));
    }
  }

}
