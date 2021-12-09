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
  isLoading = false;

  constructor(private modalController: ModalController, private todoItemService: TodoItemService) { }

  ngOnInit(): void {
    this.todoItemService.getItem();
    this.todoItemSub = this.todoItemService.getItemUpdateListener().subscribe(item => {
      this.isLoading = true;
      this.todoItems = item;
      if(this.todoItems.length > 0) {
        this.events = this.todoItems.map(r => {
          return {
            id: r.id,
            start: r.startSchedule,
            end : r.endSchedule,
            title : r.title
          }
        });
        this.refresh.next();
      }
      this.isLoading = false;
    });
  }

  openModalTodoItem() : void {
    var title = 'Create Todo Item';
    var buttonName = 'Create';
    this.modalController.open(title, buttonName)
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    // var title = 'Create Todo Item';
    // var buttonName = 'Create';
    // this.modalController.open(title, buttonName)
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
    this.modalController.open('Edit Todo Item','Edit',event.id);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  ngOnDestroy(){
    this.todoItemSub.unsubscribe();
  }
}
