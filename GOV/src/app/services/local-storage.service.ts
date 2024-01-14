import { Injectable } from '@angular/core';
import { OrderSale } from '../models/orderSale.model'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderSaleService {
private keyLocalStorage = 'OrderSale';
private dataLocalSale = new BehaviorSubject<OrderSale[]>([]);
  constructor() { }

  getOrderSales(): OrderSale[]{
    const dataString = localStorage.getItem(this.keyLocalStorage);
    return  dataString ? JSON.parse(dataString) : [] ;
  }

  existsAttributesJSON(nameItem:string): boolean {
    const dataAttributes = this.getOrderSales();

    if (dataAttributes !== null && Array.isArray(dataAttributes)) {
      for (const object of dataAttributes) {
        if ( object.itemsPurchased.nameItem === nameItem ) {
          return true;
        }
      }
    }

    return false;
  }


  addOrderSale(orderSale: OrderSale): void {
    const ordersSales = this.getOrderSales();
    ordersSales.push(orderSale);
    localStorage.setItem(this.keyLocalStorage, JSON.stringify(ordersSales));
  }
}
