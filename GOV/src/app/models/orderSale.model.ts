  export interface OrderSale {
    orderSalesID: number;
    dateCreate: string;
    dateCancellation: string | null;
    nameCustomer: string;
    itemsPurchased: {
        nameItem: string;
        priceItem: number;
        amountItem: number;
      }
    subtotal: number;
    vat: number;
    total: number;
  }
  
  