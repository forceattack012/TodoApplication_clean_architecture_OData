import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../components/modal/modal.component';

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
    this.bsModalRef = this.modalService.show(ModalComponent, initialState);
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
