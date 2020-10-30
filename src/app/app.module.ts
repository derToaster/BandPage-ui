import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BandService} from './services/band.service';
import { AdminComponent } from './components/admin/admin.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './shared/material.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CustomPaginationComponent } from './pagination/components/custom-pagination/custom-pagination.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { UserProfilePageComponent } from './components/user-profile-page/user-profile-page.component';
import {AuthGuard} from './auth.guard';
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component';






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
  providers: [BandService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
