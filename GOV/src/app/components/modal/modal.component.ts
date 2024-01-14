import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { OrderSaleService } from '../../services/local-storage.service';
import { OrderSale } from '../../models/orderSale.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  titleModal: string = '';
  subtitleModal: string = '';
  infoModal?: number = 0;
  orderSales: OrderSale[];

  constructor(public bsModalRef: BsModalRef,
    private orderSaleService: OrderSaleService) {

      this.orderSales = this.orderSaleService.getOrderSales();

  }

}
