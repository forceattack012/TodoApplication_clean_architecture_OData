import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AppBootstrapModule } from './modules/app-bootstrap.module';
import { ModalComponent } from "./components/modal/modal.component";
import { AppFormsModule } from './modules/app-forms.module';
import { AppCalendarModule } from './modules/app-calendar.module';
import { ModalController } from './components/modal/modalController';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CalendarComponent,
    ModalComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppBootstrapModule,
    AppFormsModule,
    AppCalendarModule,
    HttpClientModule
  ],
  providers: [{ provide: ModalController, useExisting: ModalComponent }],
  bootstrap: [AppComponent]
})
export class AppModule { }
