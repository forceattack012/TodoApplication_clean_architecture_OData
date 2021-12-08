import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
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

  title? : string;
  buttonName? : string;
  protected now: Date = new Date();
  todoItemForm: FormGroup;
  private bsModalRef: BsModalRef;
  private _idModal : string | number;


  constructor(private modalService: BsModalService, private fb: FormBuilder, private todoItemService: TodoItemService) {
  }

  ngOnInit(): void {
    this.todoItemForm = this.fb.group({
      title : ['', Validators.required],
      description: ['', Validators.required],
      startDate : ['', Validators.required],
      endDate : ['', Validators.required]
    });
  }

  createTodoItem() {
    if(this.todoItemForm.invalid){
      return;
    }
    if(this.getStartDate > this.getEndDate){
      return;
    }
    this.todoItemService.addItem(this.todoItemForm.value);
    this.close();
  }

  get getStartDate() : Date {
    return this.todoItemForm.controls['startDate'].value;
  }

  get getEndDate() : Date {
    return this.todoItemForm.controls['endDate'].value;
  }

  deleteTodoItem() {

  }
  open(title: string, buttonName: string) {
    const initialState: ModalOptions = {
      initialState: {
        title: title,
        buttonName: buttonName
      }
    };
    this.bsModalRef = this.modalService.show(ModalComponent, initialState);
    this._idModal = this.bsModalRef.id;
  }

  close() {
    this.modalService.hide(this._idModal);
  }
  test(event) {
    console.log(event.target.value);
  }

}
