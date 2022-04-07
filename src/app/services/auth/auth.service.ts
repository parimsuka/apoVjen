import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/User';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from '../../../../node_modules/firebase/compat';
import { UserRegister } from 'src/app/model/user/UserRegister';
import { Trip } from 'src/app/model/trip/Trip';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private backEndService: BackendService) { }

  register(userRegister: UserRegister) : Observable<void> {
    return new Observable<void>(observer => {
      this.backEndService.registerUser(userRegister).toPromise().then(() => {
        setTimeout(() => {
          observer.next();
          observer.complete();
        }, 2000)
      }).catch(error => {
        observer.error(error);
        observer.complete();
      })
    })
    
  }

  recoverEmailPassword(email: string) : Observable<void> {
    return new Observable<void>(observer => {
      this.auth.sendPasswordResetEmail(email).then(() => {
        observer.next();
        observer.complete();
      }).catch(error => {
        observer.error(error);
        observer.complete();
      })
    })
  }

  login(email: string, password: string) : Observable<User> {
    return new Observable<User>(observer => {
      this.auth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL).then(() => {
        this.auth.signInWithEmailAndPassword(email, password)
          .then((firebaseUser: firebase.default.auth.UserCredential) => {
            const user = {email, id: firebaseUser.user.uid};
            observer.next(user);
            observer.complete();
          }).catch(error => {
            observer.error(error);
            observer.complete();
          })
        })
      })
    }

    signOut(): Observable<void> {
      return new Observable<void>(observer => {
        setTimeout(() => {
            this.auth.signOut().then(() => {
              observer.next();
              observer.complete();
            }).catch(error => {
              observer.error(error);
              observer.complete();
            })
          }, 1000);
        })
    }

    editProfile(userRegister: UserRegister) {
      const loggedInUserID = JSON.parse(localStorage.getItem('loggedInUser')).user.id;
      return new Observable<void>(observer => {
        setTimeout(() => {
          this.backEndService.editProfile(loggedInUserID, userRegister).subscribe();
          observer.next();
          observer.complete();
        }, 2000)
      });
    }

    changePassword(password: {password: string}) {
      const loggedInUserID = JSON.parse(localStorage.getItem('loggedInUser')).user.id;
      return new Observable<void>(observer => {
        setTimeout(() => {
          this.backEndService.changeUserPassword(loggedInUserID, password).subscribe();
            observer.next();
            observer.complete();
          }, 3000);
        })
    }
}
