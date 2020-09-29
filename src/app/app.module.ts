import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BandService} from './services/band.service';
import { AdminComponent } from './components/admin/admin.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {ReactiveFormsModule} from '@angular/forms';
import { CallbackComponent } from './components/callback/callback.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './shared/material.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DataTableComponent } from './components/data-table/data-table.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    RegistrationComponent,
    CallbackComponent,
    ConfirmationDialogComponent,
    DataTableComponent,
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
    MatSortModule
  ],
  providers: [BandService],
  bootstrap: [AppComponent]
})
export class AppModule { }
