import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { ProcessComponent } from '../components/process';
import { Trip } from '../model/trip/Trip';
import { ProcessService } from '../services/process/process.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  @ViewChild('tripsContainer', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private processService: ProcessService, private resolver: ComponentFactoryResolver) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.generateTrips();
  }

  generateTrips() {
    let trips = this.processService.getTrips();

    console.log(trips);
    for (let trip of trips) {
      const factory = this.resolver.resolveComponentFactory(trip.component);

      const componentRef = this.container.createComponent(factory);
      (<ProcessComponent>componentRef.instance).data = trip.data;
    }
  }

  

}
