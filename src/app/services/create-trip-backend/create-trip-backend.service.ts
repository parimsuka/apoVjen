import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from 'src/app/model/trip/Trip';

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

}
