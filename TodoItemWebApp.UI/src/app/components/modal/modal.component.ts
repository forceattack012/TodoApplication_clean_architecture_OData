import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
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


  constructor(private modalService: BsModalService, private fb: FormBuilder) {
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
    // if(this.todoItemForm.invalid){
    //   return;
    // }
    // var startDate = this.now;
    // var endDate = this.now;
    // console.log('now :'+this.now);

    // var stHr = this.now.getHours() + parseInt(this.todoItemForm.controls['startHours'].value);
    // var stEm = this.now.getMinutes() + parseInt(this.todoItemForm.controls['startMinutes'].value);

    // var edHr = this.now.getHours() + parseInt(this.todoItemForm.controls['endHours'].value);
    // var edEm = this.now.getMinutes() + parseInt(this.todoItemForm.controls['endMinutes'].value);
    // startDate.setHours(stHr+stEm);
    // endDate.setHours(edHr+edEm);

    // console.log('start :'+startDate);
    // console.log('end :'+endDate);
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


}
