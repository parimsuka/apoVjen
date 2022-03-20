import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {

  @Input() time: string;
  @Input() username: string;
  @Input() from: string;
  @Input() to: string;
  @Input() availablePlaces: number;

  constructor() { }

  ngOnInit() {}

}
