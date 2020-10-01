import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './components/admin/admin.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {CallbackComponent} from './components/callback/callback.component';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';


const routes: Routes = [
  {path: '',
  component: RegistrationComponent},
  {path: 'callback',
    component: CallbackComponent},
  {path: 'admin',
    component: AdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
