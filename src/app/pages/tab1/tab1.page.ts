import { Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { TripsComponent } from '../../components/trips/trips.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  filterMytrips: boolean = false;
  
  @ViewChild('tripsContainer', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {

  }

  ionViewDidEnter() {
    this.generateTrips();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    
  }

  generateTrips() {
    const factory = this.resolver.resolveComponentFactory(TripsComponent);
    this.container.clear();
    const component: ComponentRef<TripsComponent> = this.container.createComponent(factory);
    component.instance.filterMytrips = this.filterMytrips;
  }

  triggerMyTrips() {
    this.filterMytrips = !this.filterMytrips;

    this.generateTrips();
  }
}
