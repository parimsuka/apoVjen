import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from 'src/app/model/trip/Trip';
import { UserRegister } from 'src/app/model/user/UserRegister';

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
    return this.httpClient.delete<Trip>(this.backEndURL + '/create-trip/' + id, null);
  }

  editProfile(id: string, userRegister: UserRegister) {
    return this.httpClient.patch(this.backEndURL + '/users/' + id, userRegister, {observe: 'body', responseType: 'json'});
  }

  getLoggedInUser(id: string) {
    return this.httpClient.get<UserRegister>(this.backEndURL + '/users/' + id, {observe: 'body', responseType: 'json'});
  }

  registerUser(userRegister: UserRegister) {
    return this.httpClient.post(this.backEndURL + '/register', userRegister, {observe: 'body', responseType: 'text' as 'json'});
  }

  changeUserPassword(id:string, password: {password: string}) {
    console.log('id: ', id, password);
    return this.httpClient.patch(this.backEndURL + '/users/changePassword/' + id, password, {observe: 'body', responseType: 'json'});
  }

}
