import { Component, ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  showPicker: boolean = false;
  dateValue: string = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z';
  formattedDate: string;

  @ViewChild(IonDatetime) datetime: IonDatetime;
  constructor() {
    this.setCurrentTime();
  }

  private setCurrentTime() {
    this.formattedDate = format(parseISO(format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'), 'HH:mm, MMM d, yyyy');
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

}
