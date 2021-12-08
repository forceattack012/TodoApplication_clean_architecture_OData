import { Component, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { addDays, addHours, endOfMonth, startOfDay, startOfMonth, subDays } from 'date-fns';
import { Subject, Subscription } from 'rxjs';
import { TodoItem } from 'src/app/models/todoItem';
import { TodoItemService } from 'src/app/services/todo-item.service';
import { ModalController } from '../modal/modalController';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

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

  refresh: Subject<any> = new Subject();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  events: CalendarEvent[] = [];
  event: CalendarEvent = {
    start: startOfMonth(new Date()),
    title: '',
  };

  private todoItemSub: Subscription;
  todoItems: TodoItem[] = [];

  constructor(private modalController: ModalController, private todoItemService: TodoItemService) { }

  ngOnInit(): void {
    this.todoItemSub = this.todoItemService.getItemUpdateListener().subscribe(item => {
      this.todoItems = item;
      console.log(item);
      //console.log(this.todoItems.length);
      if(this.todoItems.length > 0) {
        this.todoItems.map(r => {
          this.event.start = r.startDate;
          this.event.end = r.endDate,
          this.event.title = r.title
        });
        this.events.push(this.event);
        //this.refresh.next();
      }
    });
    //console.log(this.events)
  }

  openModalTodoItem() : void {
    var title = 'Create Todo Item';
    var buttonName = 'Create';
    this.modalController.open(title, buttonName)
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    // if (isSameMonth(date, this.viewDate)) {
    //   if (
    //     (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
    //     events.length === 0
    //   ) {
    //     this.activeDayIsOpen = false;
    //   } else {
    //     this.activeDayIsOpen = true;
    //   }
    //   this.viewDate = date;
    // }
    //console.log(events);
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(action);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  ngOnDestroy(){
    this.todoItemSub.unsubscribe();
  }
}
