import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'edit-profile',
        loadChildren: () => import('../edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
      },
      {
        path: 'trip',
        loadChildren: () => import('../trip/trip.module').then( m => m.TripPageModule)
      },
      {
        path: 'display',
        loadChildren: () => import('../display/display.module').then( m => m.DisplayPageModule)
      },
      {
        path: 'change-language',
        loadChildren: () => import('../change-language/change-language.module').then( m => m.ChangeLanguagePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
