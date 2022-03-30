import { Component, Input, OnInit } from '@angular/core';
import { Trip } from 'src/app/model/trip/Trip';
import { ProcessComponent } from '../process';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit, ProcessComponent {
  
  @Input() data: Trip;

  constructor() { }

  ngOnInit() {
    console.log(this.data);
  }

}
