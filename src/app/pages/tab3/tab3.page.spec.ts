import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Tab3Page } from './tab3.page';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { changeProfilePicReducer } from 'src/store/changeProfilePic/changeProfilePic.reducers';

import * as firebase from '../../../../node_modules/firebase/compat';
import { AppState } from 'src/store/AppState';
import { Router } from '@angular/router';
firebase.default.initializeApp(environment.firebaseConfig);

describe('Tab3Page', () => {
  let component: Tab3Page;
  let fixture: ComponentFixture<Tab3Page>;
  let router: Router;
  let httpClient: HttpClient;
  let store: Store<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Tab3Page],
      imports: [IonicModule.forRoot(),
        ExploreContainerComponentModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature("changeProfilePic", changeProfilePicReducer),
        AngularFireModule.initializeApp(environment.firebaseConfig)]
    }).compileComponents();

    router = TestBed.get(Router);
    store = TestBed.get(Store);
    httpClient = TestBed.get(HttpClient);

    //fixture = TestBed.createComponent(Tab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

});
