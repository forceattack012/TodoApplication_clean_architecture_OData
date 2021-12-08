import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  openModalTodoItem() : void {
    var title = 'Create Todo Item';
    var buttonName = 'Create';
    this.modalService.openModal(title, buttonName)
  }


  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  setView(view: CalendarView) {
    this.view = view;
  }
}
