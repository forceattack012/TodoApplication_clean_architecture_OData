
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { TodoItem } from 'src/app/models/todoItem';
import { TodoItemService } from 'src/app/services/todo-item.service';
import { ModalController } from './modalController';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})



@Injectable({
  providedIn: 'root'
})
export class ModalComponent implements OnInit , ModalController {

  header? : string;
  buttonName? : string;
  protected now: Date = new Date();
  todoItemForm: FormGroup;
  private eventId : string | number;
  todoItem: TodoItem;
  isLoading = false;
  errorMessageDateTime? : string;
  private todoItemSub: Subscription;
  todoItems: TodoItem[] = [];

  constructor(private modalService: BsModalService, private fb: FormBuilder, private todoItemService: TodoItemService) {
  }

  ngOnInit(): void {
    this.todoItemForm = this.fb.group({
      title : ['', Validators.required],
      description: ['', Validators.required],
      startDate : ['', Validators.required],
      endDate : ['', Validators.required]
    });

    if(this.eventId !== undefined){
      this.isLoading = true;
       this.todoItemService.getTodoItemById(this.eventId).subscribe(result =>{
          let item: TodoItem;
          this.todoItem = result.value.forEach((todo)=> {
            item = {
              id: todo.Id,
              title: todo.Title,
              description: todo.Description,
              startSchedule: new Date(todo.StartSchedule),
              endSchedule: new Date(todo.EndSchedule),
              createdDate: todo.CreatedDate,
              modifyDate: todo.ModifyDate
            }
          });
          this.setFormValue('title', item.title);
          this.setFormValue('description', item.description);
          this.setFormValue('startDate', item.startSchedule);
          this.setFormValue('endDate', item.endSchedule);
          this.setTodoItem(item);
          this.isLoading = false;
       });
    }
  }

  setTodoItem(item: TodoItem){
    this.todoItem = item;
  }

  createTodoItem() {
    if(this.todoItemForm.invalid){
      this.getEndDate.markAsDirty();
      this.getStartDate.markAsDirty();
      return;
    }
    if(!this.isValidDateTime(this.getStartDate.value, this.getEndDate.value)){
      return;
    }

    this.errorMessageDateTime = '';
    this.isLoading = true;
    var todoItem : TodoItem = new TodoItem();
    todoItem.title = this.getTitle.value;
    todoItem.description = this.getDescription.value;
    todoItem.startSchedule = this.getStartDate.value;
    todoItem.endSchedule = this.getEndDate.value;
    todoItem.createdDate = new Date();
    this.todoItemService.addItem(todoItem);
  }

  get getStartDate() {
    return this.todoItemForm.get('startDate');
  }

  get getTitle() {
    return this.todoItemForm.get('title');
  }

  get getDescription()  {
    return this.todoItemForm.get('description');
  }

  get getEndDate()  {
    return this.todoItemForm.get('endDate');
  }

  setFormValue(name:string, value:any)  {
    this.todoItemForm.controls[name].setValue(value);
  }

  deleteTodoItem(id: number| string) {
    this.isLoading = true;
    this.todoItemService.removeItem(id);
  }

  editTodoItem(id: number| string){
    if(!this.isValidDateTime(this.getStartDate.value, this.getEndDate.value)){
      return;
    }
    this.isLoading = true;
    var todoItem : TodoItem = new TodoItem();
    todoItem.title = this.getTitle.value;
    todoItem.description = this.getDescription.value;
    todoItem.startSchedule = this.getStartDate.value;
    todoItem.endSchedule = this.getEndDate.value;
    todoItem.modifyDate = new Date();

    this.todoItemService.editItem(id, todoItem);
    this.close();
  }

  open(title: string, buttonName: string, id?: number| string) {
    const initialState: ModalOptions = {
      initialState: {
        header: title,
        buttonName: buttonName,
        eventId: id
      }
    };
    this.modalService.show(ModalComponent, initialState);
  }


  close() {
    this.modalService.hide();
  }

  isValidDateTime(start: Date, end: Date) {
    if(start > end || this.isSameDate(start, end)){
      this.errorMessageDateTime = 'Start date must be less more than end date';
      return false;
    }
    return true;
  }

  isSameDate(start: Date, end: Date){
    return (start.getDay() == end.getDay() && start.getMonth() == end.getMonth() &&
      start.getFullYear() == end.getFullYear() && start.getHours() == end.getHours() &&
      start.getMinutes() == end.getMinutes())
  }
}
