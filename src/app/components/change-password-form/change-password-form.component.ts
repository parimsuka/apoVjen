import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { modalController } from '@ionic/core';
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

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
    this.createForm();
    
    this.changePasswordStateSubscription = this.store.select('changePassword').subscribe(changePasswordState => {
      this.onPasswordChanged(changePasswordState);

      this.toggleLoading(changePasswordState);
    })
  }

  private createForm() {
    this.changePasswordForm = new ChangePasswordForm(this.formBuilder);
  }

  close() {
    modalController.dismiss();
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

  changePassword() {
    this.changePasswordForm.getForm().markAllAsTouched();

    if (this.changePasswordForm.getForm().valid) {
      this.store.dispatch(changePassword({password: this.changePasswordForm.getForm().get('password').value}));
    }
  }

}
