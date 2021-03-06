import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { ChangePasswordFormComponent } from 'src/app/components/change-password-form/change-password-form.component';
import { ErrorMessageModule } from 'src/app/components/error-message/error-message.module';
import { SignOutButtonComponent } from 'src/app/components/sign-out-button/sign-out-button.component';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
    ReactiveFormsModule,
    ErrorMessageModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    Tab3Page,
    ChangePasswordFormComponent,
    SignOutButtonComponent]
})
export class Tab3PageModule {}
