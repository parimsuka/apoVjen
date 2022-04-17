import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/User';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from '../../../../node_modules/firebase/compat';
import { UserRegister } from 'src/app/model/user/UserRegister';
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

    changePassword(password: {currentPassword: string, newPassword: string}) {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')).user;
      return new Observable<void>(observer => {
        setTimeout(() => {
          const credential = firebase.default
                                      .auth
                                      .EmailAuthProvider
                                      .credential(loggedInUser.email, password.currentPassword);

            console.log('current pass', password.currentPassword, 'pass', password.newPassword);
            firebase.default.auth().currentUser.reauthenticateWithCredential(credential).then(cred => {
                  this.backEndService.changeUserPassword(loggedInUser.id, password).toPromise().then(() => {
                    this.signOut().toPromise().then(() => {
                      this.login(loggedInUser.email, password.newPassword).toPromise().then(() => {
                        console.log('changed successfully');
                        observer.next();
                        observer.complete();
                      })
                    })
                  });
              }
            ).catch(error => {
              console.log('error', error);
              observer.error(error);
              observer.complete();
            });
          }, 3000);
        })
    }

    changeProfilePicture(file: {img: File}) {
      const loggedInUserID = JSON.parse(localStorage.getItem('loggedInUser')).user.id;
      return new Observable<void>(observer => {
        firebase.default.storage().ref('/users/' + loggedInUserID + '/profile.jpg').put(file.img).then(() => {
          observer.next();
          observer.complete();
        }).catch(error => {
          observer.error(error);
          observer.complete();
        })
      })

      // const loggedInUserID = JSON.parse(localStorage.getItem('loggedInUser')).user.id;
      // return new Observable<void>(observer => {
      //   this.backEndService.changeProfilePic(loggedInUserID, file).toPromise().then(() => {
      //     setTimeout(() => {
      //       observer.next();
      //       observer.complete();
      //     }, 2000)
      //   }).catch(error => {
      //     observer.error(error);
      //     observer.complete();
      //   })
      // })
    }



    //To be used later
    checkUserLoggedin() {
      firebase.default.auth().onAuthStateChanged(function(user) {
        console.log(user);
      });
    }
}
