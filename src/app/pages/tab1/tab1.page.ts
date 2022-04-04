import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { TripsComponent } from '../../components/trips/trips.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  @ViewChild('tripsContainer', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {

  }

  ionViewDidEnter() {
    this.generateTrips();
  }

  ngOnInit() {

  }

  onload() {

  }

  ngAfterViewInit() {
    //this.generateTrips();
  }

  generateTrips() {
    const factory = this.resolver.resolveComponentFactory(TripsComponent);
    this.container.clear();
    this.container.createComponent(factory);
  }
}
