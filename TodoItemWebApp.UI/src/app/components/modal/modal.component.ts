import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { title } from 'process';
import { map } from 'rxjs/operators';
import { TodoItem } from 'src/app/models/todoItem';
import { TodoItemService } from 'src/app/services/todo-item.service';
import { ModalController } from './modalController';


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
  private bsModalRef: BsModalRef;
  private eventId : string | number;
  todoItem: TodoItem;

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
       this.todoItemService.getTodoItemById(this.eventId).subscribe(result =>{
          let item: TodoItem;
          result.value.forEach((todo)=> {
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
       });
    }
  }

  createTodoItem() {
    if(this.todoItemForm.invalid){
      return;
    }
    if(this.getStartDate > this.getEndDate){
      return;
    }
    var todoItem : TodoItem = new TodoItem();
    todoItem.title = this.getTitle;
    todoItem.description = this.getDescription;
    todoItem.startSchedule = this.getStartDate;
    todoItem.endSchedule = this.getEndDate;
    todoItem.createdDate = new Date();
    this.todoItemService.addItem(todoItem);
    this.close();
  }

  get getStartDate() : Date {
    return this.todoItemForm.controls['startDate'].value;
  }

  get getTitle(): string {
    return this.todoItemForm.controls['title'].value;
  }

  get getDescription() : string {
    return this.todoItemForm.controls['description'].value;
  }

  get getEndDate() : Date {
    return this.todoItemForm.controls['endDate'].value;
  }

  setFormValue(name:string, value:any)  {
    this.todoItemForm.controls[name].setValue(value);
  }

  deleteTodoItem(id: number| string) {
    this.todoItemService.removeItem(id);
    this.close();
  }

  editTodoItem(id: number| string){
    var todoItem : TodoItem = new TodoItem();
    todoItem.title = this.getTitle;
    todoItem.description = this.getDescription;
    todoItem.startSchedule = this.getStartDate;
    todoItem.endSchedule = this.getEndDate;
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
    this.bsModalRef = this.modalService.show(ModalComponent, initialState);
  }


  close() {
    this.modalService.hide();
  }


}
