import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './components/admin/admin.component';
import {RegistrationComponent} from './components/registration/registration.component';

import {UserDetailsComponent} from './components/user-details/user-details.component';
import {LoginComponent} from './components/login/login.component';
import {UserProfilePageComponent} from './components/user-profile-page/user-profile-page.component';
import {AuthGuard} from './auth.guard';
import {UserProfileEditComponent} from './components/user-profile-edit/user-profile-edit.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registration',
  component: RegistrationComponent},
  {path: 'edit',
  component: UserProfileEditComponent,
  canActivate: [AuthGuard]},
  {path: 'userprofile',
  component: UserProfilePageComponent,
  canActivate: [AuthGuard]},
  {path: 'admin',
    component: AdminComponent,
  },
  {path: 'userdetails/:id',
  component: UserDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
