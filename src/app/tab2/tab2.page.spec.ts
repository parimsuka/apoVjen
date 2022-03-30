import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { createTripReducer } from 'src/store/createTrip/createTrip.reducers';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { RouterTestingModule } from '@angular/router/testing';
import { Tab2Page } from './tab2.page';

describe('Tab2Page', () => {
  let component: Tab2Page;
  let fixture: ComponentFixture<Tab2Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Tab2Page],
      imports: [
        IonicModule.forRoot(), 
        ExploreContainerComponentModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature("loading", loadingReducer),
        StoreModule.forFeature("createTrip", createTripReducer),]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
