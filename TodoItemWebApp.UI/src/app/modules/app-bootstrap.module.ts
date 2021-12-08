import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

@NgModule({
  imports: [
    ModalModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  exports : [ModalModule, TimepickerModule]
})
export class AppBootstrapModule { }
