import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from 'src/app/model/trip/Trip';
import { UserRegister } from 'src/app/model/user/UserRegister';
import * as firebase from '../../../../node_modules/firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  backEndURL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getAllTrips() {
    return this.httpClient.get<Trip[]>(this.backEndURL + '/create-trip/getAllTrips', {observe: 'body', responseType: 'json'});
  }

  createTrip(trip: Trip){
    return this.httpClient.post<Trip>(this.backEndURL + '/create-trip', trip, {observe: 'body', responseType: 'text' as 'json'});
  }

  deleteTrip(id: string) {
    return this.httpClient.delete<Trip>(this.backEndURL + '/create-trip/' + id, {observe: 'body', responseType: 'text' as 'json'});
  }

  editProfile(id: string, userRegister: UserRegister) {
    return this.httpClient.patch(this.backEndURL + '/users/' + id, userRegister, {observe: 'body', responseType: 'json'});
  }

  getUser(id: string) {
    return this.httpClient.get<UserRegister>(this.backEndURL + '/users/' + id, {observe: 'body', responseType: 'json'});
  }

  registerUser(userRegister: UserRegister) {
    return this.httpClient.post(this.backEndURL + '/register', userRegister, {observe: 'body', responseType: 'text' as 'json'});
  }

  changeUserPassword(id:string, password: {currentPassword: string, newPassword: string}) {
    return this.httpClient.patch(this.backEndURL + '/users/changePassword/' + id, password, {observe: 'body', responseType: 'json'});
  }

  changeProfilePic(id:string, file: {img:File}) {
    console.log(file);
    return this.httpClient.post(this.backEndURL + '/storage/' + id, file, {observe: 'body', responseType: 'json'});
  }

  getProfilePictureURL() {
    const loggedInUserID = JSON.parse(localStorage.getItem('loggedInUser')).user.id;
    if(loggedInUserID !== undefined) {
      return firebase.default.storage().ref('/users/' + loggedInUserID + '/profile.jpg').getDownloadURL();
    } else {
      return new Promise<void>((resolve, reject) => {
        
      });
    }
  }

  bookTrip(data: {userID: string, tripID: string}) {
    return this.httpClient.post(this.backEndURL + '/book-trip', data, {observe: 'body', responseType: 'text' as 'json'});
  }

  unbookTrip(data: {userID: string, tripID: string}) {
    return this.httpClient.delete(this.backEndURL + '/book-trip?tripID=' + data.tripID + '&userID=' + data.userID, {observe: 'body', responseType: 'text' as 'json'});
  }

}
