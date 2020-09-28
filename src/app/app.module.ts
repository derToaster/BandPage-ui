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


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    RegistrationComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [BandService],
  bootstrap: [AppComponent]
})
export class AppModule { }
