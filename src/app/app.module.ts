import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './services/user.service';
import {AdminComponent} from './components/admin/admin.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './shared/material.module';
import {ConfirmationDialogComponent} from './components/admin/confirmation-dialog/confirmation-dialog.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {CustomPaginationComponent} from './pagination/components/custom-pagination/custom-pagination.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from './components/login/login.component';
import {UserProfilePageComponent} from './components/user-profile-page/user-profile-page.component';
import {AuthGuard} from './guards/auth.guard';
import {UserProfileEditComponent} from './components/user-profile-edit/user-profile-edit.component';
import {BandPageComponent} from './components/band-page/band-page.component';
import {BandEditPageComponent} from './components/band-edit-page/band-edit-page.component';
import {InviteDialogComponent} from './components/band-page/invite-dialog/invite-dialog.component';
import {ResetPasswordDialogComponent} from './components/login/reset-password-dialog/reset-password-dialog.component';
import { BandManagementComponent } from './components/band-management/band-management.component';
import { BandManagementDialogComponent } from './components/band-management/band-management-dialog/band-management-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    RegistrationComponent,
    ConfirmationDialogComponent,
    CustomPaginationComponent,
    UserDetailsComponent,
    LoginComponent,
    UserProfilePageComponent,
    UserProfileEditComponent,
    BandPageComponent,
    BandEditPageComponent,
    InviteDialogComponent,
    ResetPasswordDialogComponent,
    BandManagementComponent,
    BandManagementDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatSortModule,
    NgbModule
  ],
  providers: [UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
