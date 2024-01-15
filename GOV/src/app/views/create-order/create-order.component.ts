import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { OrderSaleService } from '../../services/local-storage.service';
import { OrderSale } from '../../models/orderSale.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../../components/modal/modal.component';


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  newOrderForm: FormGroup;
  orderSales: OrderSale[];
  dateNow: string = '';
  bsModalRef!: BsModalRef;
  constructor(private formBuilder: FormBuilder,
    private orderSaleService: OrderSaleService,
    private modalService: BsModalService) {
    this.newOrderForm = this.formBuilder.group({
      customerName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      itemName: ['', [Validators.required]],
      itemPrice: ['', [Validators.required]],
      amountItem: ['', [Validators.required, Validators.pattern(/^[0-9 ]*$/)]],
    })
    this.orderSales = this.orderSaleService.getOrderSales();
  }
  ngOnInit(): void {
    const date = new Date();
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    this.dateNow = `${year}-${month}-${day}`
  }
  openModal(): void {
    this.bsModalRef = this.modalService.show(ModalComponent, {
      initialState: {
        titleModal: 'Item already purchased',
        subtitleModal: 'Item was already used in a previous purchase order,' +
          'the price of the first item must be respected, you have set a price of: ',
        infoModal: '$' + this.newOrderForm.value.itemPrice,
      },
    });
  }
  addOrder(): void {
    if (this.newOrderForm.valid) {
      let priceItem = this.newOrderForm.value.itemPrice;
      let amountItem = this.newOrderForm.value.amountItem;
      const newOrderSale: OrderSale = {
        orderSalesID: Math.floor(Math.random() * 1000000),
        dateCreate: this.dateNow,
        dateCancellation: null,
        nameCustomer: this.newOrderForm.value.customerName,
        itemsPurchased: {
          nameItem: this.newOrderForm.value.itemName,
          priceItem: priceItem,
          amountItem: amountItem
        },
        subtotal: priceItem * amountItem,
        vat: ((priceItem * amountItem) * 0.16),
        total: ((priceItem * amountItem) * 1.16)
      }
      this.orderSaleService.addOrderSale(newOrderSale);
      this.newOrderForm.reset();
      this.orderSales = this.orderSaleService.getOrderSales();
    }
  }
  verifyNewOrder(): void {
    const nameItem = this.newOrderForm.value.itemName;
    const itemExists = this.orderSaleService.existsItem(nameItem);
    const priceItem = this.newOrderForm.value.itemPrice;
    let intoIf = false;
    let showModal = false;
    for (const item of this.orderSales) {
      if (itemExists && item.itemsPurchased && item.itemsPurchased.priceItem === priceItem) {
        this.addOrder();
        intoIf = true;
      } else if (itemExists && item.itemsPurchased && item.itemsPurchased.priceItem !== priceItem) {
        if (!showModal) {
          this.openModal();
          showModal = true;
        }
        intoIf = true;
      } else if (!itemExists) {
        this.addOrder();
        intoIf = true;
      }
    }
    if (!intoIf) {
      this.addOrder();
    }
  }
}
