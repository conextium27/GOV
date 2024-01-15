import { Injectable } from '@angular/core';
import { OrderSale } from '../models/orderSale.model'

@Injectable({
  providedIn: 'root'
})
export class OrderSaleService {
  private keyLocalStorage = 'OrderSale';
  constructor() { }

  getOrderSales(): OrderSale[] {
    const dataString = localStorage.getItem(this.keyLocalStorage);
    return dataString ? JSON.parse(dataString) : [];
  }

  existsItem(nameItem: string): boolean {
    const dataItem = this.getOrderSales();
    for (const object of dataItem) {
      if (object.itemsPurchased.nameItem === nameItem) {
        return true;
      }
    }
    return false;
  }
  canceledOrder(orderSalesID: number, dateCancellation: string){
    const data = this.getOrderSales();
    const orderCanceledId = data.find(dato => dato.orderSalesID === orderSalesID);
    if(orderCanceledId){
      orderCanceledId.dateCancellation = dateCancellation
      localStorage.setItem(this.keyLocalStorage, JSON.stringify(data))
    }
  }
  getOrdersByID(orderSalesID: number){
    const data = this.getOrderSales();
    return data.find(dato => dato.orderSalesID === orderSalesID)
  }


  addOrderSale(orderSale: OrderSale): void {
    const ordersSales = this.getOrderSales();
    ordersSales.push(orderSale);
    localStorage.setItem(this.keyLocalStorage, JSON.stringify(ordersSales));
  }


}
