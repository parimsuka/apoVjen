import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IonDatetime, IonInput, ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { format, parseISO } from 'date-fns';
import { Subscription } from 'rxjs';
import { BackendService } from 'src/app/services/backend/backend.service';
import { AppState } from 'src/store/AppState';
import { CreateTripState } from 'src/store/createTrip/CreateTrip';
import { hide, show } from 'src/store/loading/loading.actions';
import { CreateTripPageForm } from './form/createTrip.form';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { createTrip } from 'src/store/createTrip/createTrip.actions';

declare var google;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  newMap: GoogleMap;
  markerIDFrom: string;
  markerIDTo: string;
  center: any = {
    lat: 33.6,
    lng: -117.9,
  }

  @ViewChild('map') mapRef: ElementRef<HTMLElement>;

  @ViewChild('autocompleteFrom') autocompleteFrom: IonInput;
  @ViewChild('autocompleteTo') autocompleteTo: IonInput;

  cities: string[] = ['Prishtina', 'Prizren', 'Peja', 'Gjilan', 'Gjakova', 'Ferizaj', 'Mitrovica'];

  showPicker: boolean = false;
  dateValue: string;
  formattedDate: string;
  showMapFlag: boolean = true;

  createTripForm: CreateTripPageForm;

  createTripStateSubscription: Subscription;

  @ViewChild(IonDatetime) datetime: IonDatetime;
  constructor(private formBuilder: FormBuilder, private store: Store<AppState>,
    private toastController: ToastController, private router: Router, private backEnd: BackendService,
    public modalController: ModalController) {
  }

  ngOnInit() {
    this.createForm();

    this.watchRegisterState();
  }

  ionViewDidEnter() {
    this.addUserNameToForm();

    this.autocompleteFrom.getInputElement().then((ref: any) => {
      const autocomplete = new google.maps.places.Autocomplete(ref);
      autocomplete.addListener('place_changed', () => {
        this.moveMap(autocomplete.getPlace().geometry.location.lat(), autocomplete.getPlace().geometry.location.lng());
        this.addMarkerFrom(autocomplete.getPlace().geometry.location.lat(), autocomplete.getPlace().geometry.location.lng());

        this.createTripForm.setFrom(autocomplete.getPlace().address_components.map(address => address.long_name).join(' '));
        this.createTripForm.setFromObject(autocomplete.getPlace());
      })
    }).catch(error => {
      console.log(error);
    })

    this.autocompleteTo.getInputElement().then((ref: any) => {
      const autocomplete = new google.maps.places.Autocomplete(ref);
      autocomplete.addListener('place_changed', () => {
        this.moveMap(autocomplete.getPlace().geometry.location.lat(), autocomplete.getPlace().geometry.location.lng());
        this.addMarkerTo(autocomplete.getPlace().geometry.location.lat(), autocomplete.getPlace().geometry.location.lng());

        this.createTripForm.setTo(autocomplete.getPlace().address_components.map(address => address.long_name).join(' '));
        this.createTripForm.setToObject(autocomplete.getPlace());
      })
    }).catch(error => {
      console.log(error);
    })
  }

  ngAfterViewInit() {
    this.createMap();
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
      console.log(this.createTripForm.getForm().value);
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
    // this.backEnd.getUser(loggedInUserID).subscribe(user => {
    //   this.createTripForm.addUserName(user.name);
    // });
    this.createTripForm.addUserName(loggedInUserID);
  }

  async createMap() {
    try {
      this.newMap = await GoogleMap.create({
        id: 'my-cool-map',
        element: this.mapRef.nativeElement,
        apiKey: environment.firebaseConfig.apiKey,
        config: {
          center: this.center,
          zoom: 8,
        },
      });
  
      this.addListeners();
    } catch (error) {
      console.log(error);
    }
  }

  async moveMap(lat, lng) {
    await this.newMap.setCamera({
      coordinate: {
        lat: lat,
        lng:lng
      }
    });
  }

  async addMarkerFrom(lat, lng) {
    if (this.markerIDFrom) this.removeMarkerFrom();
    this.markerIDFrom = await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng
      },
      draggable: true
    });
  }

  async addMarkerTo(lat, lng) {
    if (this.markerIDTo) this.removeMarkerTo();
    this.markerIDTo = await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng
      },
      draggable: true
    });
  }

  async removeMarkerFrom(id?) {
    await this.newMap.removeMarker(id ? id : this.markerIDFrom);
    this.markerIDFrom = undefined;
  }

  async removeMarkerTo(id?) {
    await this.newMap.removeMarker(id ? id : this.markerIDTo);
    this.markerIDTo = undefined;
  }

  async addListeners() {
    // await this.newMap.setOnMarkerClickListener((event) => {
    //   this.removeMarker(event.markerID);
    // });

    // await this.newMap.setOnMapClickListener((event) => {
    //   this.addMarker(event.latitude, event.longitude);
    // });
  }

  showMap() {
    if (this.showMapFlag) {
      this.showMapFlag = !this.showMapFlag;
    }
  }

  hideMap() {
    if (!this.showMapFlag) {
      this.showMapFlag = !this.showMapFlag;
    }
  }
}