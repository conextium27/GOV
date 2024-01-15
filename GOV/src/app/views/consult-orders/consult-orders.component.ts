import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QueryStorageService, IOrder } from '../../services/queryService/query-storage.service';
import { OrderSaleService } from '../../services/local-storage.service';
import { OrderSale } from '../../models/orderSale.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../../components/modal/modal.component';
import { DetailOrderComponent } from '../../components/detail-order/detail-order.component';

@Component({
  selector: 'app-consult-orders',
  templateUrl: './consult-orders.component.html',
  styleUrls: ['./consult-orders.component.scss']
})
export class ConsultOrdersComponent implements OnInit {

  dateCreateFG: FormGroup;
  orderSales: OrderSale[] = [];
  canceledSales: OrderSale[] = [];
  bsModalRef!: BsModalRef;
  dateNow: string = '';

  constructor(private formBuilder: FormBuilder,
    private OrderSaleService: OrderSaleService,
    private modalService: BsModalService) {
    this.dateCreateFG = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
    });
  }
  ngOnInit() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    this.dateNow = `${day}/${month}/${year}`.toString()

  }

  searchCreateSales() {
    this.orderSales = this.OrderSaleService.getOrderSales();
    const attributeToFilter = 'dateCancellation';
    this.orderSales = this.orderSales.filter(data => data[attributeToFilter] === null);
  }
  searchCancelSales() {
    this.canceledSales = this.OrderSaleService.getOrderSales();
    const attributeToFilter = 'dateCancellation';
    this.canceledSales = this.canceledSales.filter(data => data[attributeToFilter] !== null);
  }
  cancelOrderModal(orderSalesID: number): void {
    this.bsModalRef = this.modalService.show(ModalComponent, {
      initialState: {
        titleModal: 'Cancel Order',
        infoModal: 'order #' + orderSalesID + ' canceled',
        btnColor: 'btn-danger',
        titleButtonModal: 'Close',
      },
      class: 'modal-md',
    });
  }
  viewOrderModal(orderSalesID: number): void {
    const order: any = this.OrderSaleService.getOrdersByID(orderSalesID);
    this.bsModalRef = this.modalService.show(ModalComponent, {
      initialState: {
        titleModal: 'Detail Orders',
        showTableDetail: true,
        orderSalesID: order.orderSalesID,
        dateCreate: order.dateCreate,
        dateCancellation: order.dateCancellation,
        nameCustomer: order.nameCustomer,
        nameItem: order.itemsPurchased.nameItem,
        priceItem: order.itemsPurchased.priceItem,
        amountItem: order.itemsPurchased.amountItem,
        subtotal: order.subtotal,
        vat: order.vat,
        total: order.total,
      },
      class: 'modal-xl',
    });
  }
  canceledOrder(orderSalesID: number) {
    this.OrderSaleService.canceledOrder(orderSalesID, this.dateNow )
    this.searchCreateSales();
    this.cancelOrderModal(orderSalesID);
  }



}
