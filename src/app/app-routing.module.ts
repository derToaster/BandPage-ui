import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './components/admin/admin.component';
import {RegistrationComponent} from './components/registration/registration.component';

import {UserDetailsComponent} from './components/user-details/user-details.component';
import {LoginComponent} from './components/login/login.component';
import {UserProfilePageComponent} from './components/user-profile-page/user-profile-page.component';
import {AuthGuard} from './guards/auth.guard';
import {UserProfileEditComponent} from './components/user-profile-edit/user-profile-edit.component';
import {BandPageComponent} from './components/band-page/band-page.component';
import {BandEditPageComponent} from './components/band-edit-page/band-edit-page.component';
import {AdminGuard} from './guards/admin.guard';
import {BandManagementComponent} from './components/band-management/band-management.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'band',
    component: BandPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bandedit', component: BandEditPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'edit',
    component: UserProfileEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'userprofile',
    component: UserProfilePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'bandmanagement',
    component: BandManagementComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'userdetails/:id',
    component: UserDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
