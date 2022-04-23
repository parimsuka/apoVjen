import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignOutButtonComponent } from './sign-out-button.component';

describe('SignOutButtonComponent', () => {
  let component: SignOutButtonComponent;
  let fixture: ComponentFixture<SignOutButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SignOutButtonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignOutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


});
