import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  titleModal: string = '';
  subtitleModal?: any = '';
  infoModal?: string = '';
  btnColor?: string = 'btn-secondary';
  titleButtonModal?: string = 'Close'
  showTableDetail: boolean = false;
  showButtonCancel?: boolean = false;
  orderSalesID?: number ;
  dateCreate?: Date;
  dateCancellation?: Date;
  nameCustomer?: string = '';
  nameItem?: string = '';
  priceItem?: number = 0;
  amountItem?: number = 0;
  subtotal?: number = 0;
  vat?: number = 0;
  total?: number = 0;

  constructor(public bsModalRef: BsModalRef) {
    this.orderSalesID =  this.orderSalesID;
  }

}
