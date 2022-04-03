import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.actions';
import { signOut } from 'src/store/login/login.actions';
import { LoginState } from 'src/store/login/LoginState';

@Component({
  selector: 'app-sign-out-button',
  templateUrl: './sign-out-button.component.html',
  styleUrls: ['./sign-out-button.component.scss'],
})
export class SignOutButtonComponent implements OnInit {

  loginStateSubscription: Subscription;

  constructor(private store: Store<AppState>, private navController: NavController) { }

  ngOnInit() {
    this.loginStateSubscription = this.store.select('login').subscribe(loginState => {
      this.onSignedOut(loginState);

      this.toggleLoading(loginState);
    })
  }

  ngOnDestroy() {
    if(this.loginStateSubscription) {
      this.loginStateSubscription.unsubscribe();
    }
  }

  private toggleLoading(loginState: LoginState) {
    if(loginState.isSigningOut) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private onSignedOut(loginState: LoginState) {
    if(!loginState.isLoggedIn) {
      this.navController.navigateRoot(['login']);
    }
  }

  signOut() {
    this.store.dispatch(signOut());
  }

}
