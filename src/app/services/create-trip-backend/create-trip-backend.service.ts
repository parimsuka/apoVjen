import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from 'src/app/model/trip/Trip';
import { UserRegister } from 'src/app/model/user/UserRegister';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateTripBackendService {

  constructor(private httpClient: HttpClient) { }

  getAllTrips() {
    return this.httpClient.get<Trip[]>('http://localhost:3000/create-trip/getAllTrips', {observe: 'body', responseType: 'json'});
  }

  createTrip(trip: Trip){
    return this.httpClient.post<Trip>('http://localhost:3000/create-trip', trip, {observe: 'body', responseType: 'text' as 'json'});
  }

  deleteTrip(id: string) {
    this.httpClient.post<Trip>('http://localhost:3000/create-trip/' + id, null);
  }



  editProfile(userRegister: UserRegister) {
    return new Observable<void>(observer => {
      setTimeout(() => {
        observer.next();

        console.log(userRegister);
        observer.complete();
      }, 3000)
    });
  }

  getLoggedInUser(id: string) {
    return this.httpClient.get<UserRegister[]>('http://localhost:3000/users/' + id, {observe: 'body', responseType: 'json'});
  }

}
