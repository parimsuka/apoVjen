import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IonDatetime, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { format, parseISO } from 'date-fns';
import { Subscription } from 'rxjs';
import { BackendService } from 'src/app/services/backend/backend.service';
import { AppState } from 'src/store/AppState';
import { CreateTripState } from 'src/store/createTrip/CreateTrip';
import { createTrip } from 'src/store/createTrip/createTrip.actions';
import { hide, show } from 'src/store/loading/loading.actions';
import { CreateTripPageForm } from './form/createTrip.form';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  showPicker: boolean = false;
  dateValue: string;
  formattedDate: string;

  createTripForm: CreateTripPageForm;

  createTripStateSubscription: Subscription;

  @ViewChild(IonDatetime) datetime: IonDatetime;
  constructor(private formBuilder: FormBuilder, private store: Store<AppState>,
    private toastController: ToastController, private router: Router, private backEnd: BackendService) {
  }

  ngOnInit() {
    this.createForm();

    this.watchRegisterState();
  }

  ionViewDidEnter() {
    this.addUserNameToForm();
  }

  ngOnDestroy() {
      this.createTripStateSubscription.unsubscribe();
  }

  dateChanged(value) {
    this.dateValue = value;
    this.formattedDate = format(parseISO(value), 'HH:mm, MMM d, yyyy');
    this.showPicker = false;
  }

  close() {
    this.datetime.cancel(true);
  }

  select() {
    this.datetime.confirm(true);
  }

  createTrip() {
    this.createTripForm.getForm().markAllAsTouched();

    if (this.createTripForm.getForm().valid) {
      this.store.dispatch(createTrip({trip: this.createTripForm.getForm().value}));
    }
  }

  private createForm() {
    this.createTripForm = new CreateTripPageForm(this.formBuilder);
  }

  private watchRegisterState() {
    this.createTripStateSubscription = this.store.select('createTrip').subscribe(state => {
      this.toggleLoading(state);

      this.onCreatedTrip(state);
      this.onError(state);
    })
  }

  private onCreatedTrip(state: CreateTripState) {
    if (state.isCreated) {
      this.router.navigate(['tabs/tab1']);
    }
  }

  private onError(state: CreateTripState) {
    if (state.error) {
      this.toastController.create({
        message: state.error.message,
        duration: 5000,
        header: 'Could not create trip'
      }).then(toast => toast.present());
    }
  }

  private toggleLoading(state: CreateTripState) {
    if(state.isCreating) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private addUserNameToForm() {
    const loggedInUserID = JSON.parse(localStorage.getItem('loggedInUser')).user.id;
    this.backEnd.getUser(loggedInUserID).subscribe(user => {
      this.createTripForm.addUserName(user.name);
    });
  }

}
