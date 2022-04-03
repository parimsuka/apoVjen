import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.actions';
import { signOut } from 'src/store/signout/signout.actions';
import { SignOutState } from 'src/store/signout/SignOutState';

@Component({
  selector: 'app-sign-out-button',
  templateUrl: './sign-out-button.component.html',
  styleUrls: ['./sign-out-button.component.scss'],
})
export class SignOutButtonComponent implements OnInit {

  signOutStateSubscription: Subscription;

  constructor(private store: Store<AppState>, private navController: NavController) { }

  ngOnInit() {
    this.signOutStateSubscription = this.store.select('signOut').subscribe(signOutState => {
      this.onSignedOut(signOutState);

      this.toggleLoading(signOutState);
    })
  }

  ngOnDestroy() {
    if(this.signOutStateSubscription) {
      this.signOutStateSubscription.unsubscribe();
    }
  }

  private toggleLoading(signOutState: SignOutState) {
    if(signOutState.isSigningOut) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private onSignedOut(signOutState: SignOutState) {
    if(signOutState.isSignedOut && localStorage.getItem('loggedInUser') === null) {
      this.navController.navigateRoot(['login']);
    }
  }

  signOut() {
    this.store.dispatch(signOut());
  }

}
