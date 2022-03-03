import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { loginReducer } from 'src/store/login/login.reducers';
import { Store, StoreModule } from "@ngrx/store";

import { LoginPage } from './login.page';
import { AppState } from 'src/store/AppState';
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page;
  let store: Store<AppState>;
  let toastController: ToastController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [IonicModule.forRoot(),
              AppRoutingModule,
              ReactiveFormsModule,
              StoreModule.forRoot([]),
              StoreModule.forFeature("loading", loadingReducer),
              StoreModule.forFeature("login", loginReducer)]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    toastController = TestBed.get(ToastController);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  }));

  it('should create a form on init', () => {
    component.ngOnInit();

    expect(component.form).not.toBeUndefined();
})

  it('should go to home page on login', () => {
    spyOn(router, 'navigate');

    component.login();

    expect(router.navigate).toHaveBeenCalledWith(['tabs']);
  });

  it('should go to register page on register', () => {
    spyOn(router, 'navigate');

    component.register();

    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should recover email/password on forgot email/password', () => {
    fixture.detectChanges();

    component.form.get('email').setValue('valid@email.com');

    page.querySelector("#recoverPasswordButton").click();

    store.select('login').subscribe(loginState => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
    })
  });

  it('should show loading when recovering password', () => {
    fixture.detectChanges();

    store.dispatch(recoverPassword());

    page.querySelector("#recoverPasswordButton").click();

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    })
  });

  it('should hide loading and show success message when password is recovered', () => {
    spyOn(toastController, 'create');
    fixture.detectChanges();

    store.dispatch(recoverPassword());

    store.dispatch(recoverPasswordSuccess());

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  });

  it('should hide loading and show error message when error on password recovery', () => {
    spyOn(toastController, 'create');
    fixture.detectChanges();

    store.dispatch(recoverPassword());

    store.dispatch(recoverPasswordFail({error: "message"}));

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  });
});
