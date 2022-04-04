import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfilePageRoutingModule } from './edit-profile-routing.module';

import { EditProfilePage } from './edit-profile.page';
import { ErrorMessageModule } from 'src/app/components/error-message/error-message.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfilePageRoutingModule,
    ReactiveFormsModule,
    ErrorMessageModule
  ],
  declarations: [
    EditProfilePage]
})
export class EditProfilePageModule {}
