import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OrderSaleService } from '../../services/local-storage.service';
import { OrderSale } from '../../models/orderSale.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../../components/modal/modal.component';

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
  dateRange: any[] = [];
  getStartDate: Date;
  getEndDate: Date;
  startDate: Date;
  endDate: Date;

  constructor(private formBuilder: FormBuilder,
    private OrderSaleService: OrderSaleService,
    private modalService: BsModalService) {
    this.dateCreateFG = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
    });
    this.getStartDate = this.dateCreateFG.get('startDate')?.value;
    this.getEndDate = this.dateCreateFG.get('endDate')?.value;
    this.startDate = new Date(this.getStartDate);
    this.endDate = new Date(this.getEndDate);
  }
  ngOnInit() {
    const date = new Date();
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    this.dateNow = `${year}-${month}-${day}`
  }

  searchCreateSales() {
    const attributeToFilter = 'dateCancellation';
    if (this.getStartDate && this.getEndDate) {
      this.orderSales = this.OrderSaleService.findDateCreateOrders(this.startDate, this.endDate);
    } else {
      this.orderSales = this.OrderSaleService.getOrderSales();
    }
    if (this.getStartDate && this.getEndDate && this.orderSales.length > 0) {
      this.orderSales = this.orderSales.filter(data => data[attributeToFilter] === null);
    } else if (!this.getStartDate && !this.getEndDate) {
      this.orderSales = this.orderSales.filter(data => data[attributeToFilter] === null);
    }
  }
  searchCancelSales() {
    const attributeToFilter = 'dateCancellation';
    if (this.getStartDate && this.getEndDate) {
      this.orderSales = this.OrderSaleService.findDateCreateOrders(this.startDate, this.endDate);
    } else {
      this.canceledSales = this.OrderSaleService.getOrderSales();
    }
    if (this.getStartDate && this.getEndDate && this.orderSales.length > 0) {
      this.canceledSales = this.canceledSales.filter(data => data[attributeToFilter] !== null);
    } else if (!this.getStartDate && !this.getEndDate) {
      this.canceledSales = this.canceledSales.filter(data => data[attributeToFilter] !== null);
    }

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
    this.OrderSaleService.canceledOrder(orderSalesID, this.dateNow)
    this.searchCreateSales();
    this.cancelOrderModal(orderSalesID);
  }



}
