import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AppBootstrapModule } from './modules/app-bootstrap.module';
import { ModalComponent } from "./components/modal/modal.component";
import { AppFormsModule } from './modules/app-forms.module';
import { AppCalendarModule } from './modules/app-calendar.module';
import { ModalController } from './components/modal/modalController';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CalendarComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppBootstrapModule,
    AppFormsModule,
    AppCalendarModule
  ],
  providers: [{ provide: ModalController, useExisting: ModalComponent }],
  bootstrap: [AppComponent]
})
export class AppModule { }
