import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  title? : string;
  buttonName? : string;
  now: Date = new Date();
  todoItemForm: FormGroup;
  hours = Array.from(Array(17).keys()).map(x => x + 1);
  minutes = Array.from(Array(59).keys()).map(x => x + 1);

  constructor(private modalService: ModalService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoItemForm = this.fb.group({
      title : ['', Validators.required],
      description: ['', Validators.required],
      startHours : ['', Validators.required],
      startMinutes : ['', Validators.required],
      endHours : ['', Validators.required],
      endMinutes : ['', Validators.required]
    });
  }

  createTodoItem() {
    if(this.todoItemForm.invalid){
      return;
    }
    var startDate = this.now;
    var endDate = this.now;
    console.log('now :'+this.now);

    var stHr = this.now.getHours() + parseInt(this.todoItemForm.controls['startHours'].value);
    var stEm = this.now.getMinutes() + parseInt(this.todoItemForm.controls['startMinutes'].value);

    var edHr = this.now.getHours() + parseInt(this.todoItemForm.controls['endHours'].value);
    var edEm = this.now.getMinutes() + parseInt(this.todoItemForm.controls['endMinutes'].value);
    startDate.setHours(stHr+stEm);
    endDate.setHours(edHr+edEm);

    console.log('start :'+startDate);
    console.log('end :'+endDate);
  }

  deleteTodoItem() {

  }

  close() {
    this.modalService.closeModal();
  }

}
