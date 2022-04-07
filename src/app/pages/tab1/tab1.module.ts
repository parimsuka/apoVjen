import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { TripsComponent } from '../../components/trips/trips.component';
import { TripComponent } from '../../components/trip/trip.component';
import { SignOutButtonComponent } from '../../components/sign-out-button/sign-out-button.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  declarations: [
    Tab1Page,
    TripComponent,
    TripsComponent,
    SignOutButtonComponent]
})
export class Tab1PageModule {}