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
  getOrdersByID(orderSalesID: number){
    const data = this.getOrderSales();
    return data.find(data => data.orderSalesID === orderSalesID)
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
    const orderCanceledId = data.find(data => data.orderSalesID === orderSalesID);
    if(orderCanceledId){
      orderCanceledId.dateCancellation = dateCancellation
      localStorage.setItem(this.keyLocalStorage, JSON.stringify(data))
    }
  }
  findDateCreateOrders(startDate:Date, endDate:Date){
    const data = this.getOrderSales();
    return data.filter(data => {
      const dataDate = new Date(data.dateCreate);
      return dataDate >= startDate && dataDate <= endDate;
    })
  }
  
  addOrderSale(orderSale: OrderSale): void {
    const ordersSales = this.getOrderSales();
    ordersSales.push(orderSale);
    localStorage.setItem(this.keyLocalStorage, JSON.stringify(ordersSales));
  }
}
