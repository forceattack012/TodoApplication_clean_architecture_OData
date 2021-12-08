import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  bsModalRef?: BsModalRef;
  constructor(private modalService: BsModalService) {

  }

  openModal(title: string, buttonName: string) {
    const initialState: ModalOptions = {
      initialState: {
        title: title,
        buttonName: buttonName
      }
    };
    this.modalService
    // var x  = this.modalService.show(ModalComponent, initialState);
    // console.log(x);
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
