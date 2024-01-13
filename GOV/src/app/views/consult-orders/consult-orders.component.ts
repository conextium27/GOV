import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-consult-orders',
  templateUrl: './consult-orders.component.html',
  styleUrls: ['./consult-orders.component.scss']
})
export class ConsultOrdersComponent {
  

  creationDateFrom:       string = '';
  creationDateTo:         string = '';
  CancellationDateFrom:   string = '';
  CancellationDateTo:     string = '';

  datos = [
    { id: 1 },
    { id: 2 },
  ];
  filaExpandida: number | null = null;

  searchCreateSales(){

  }
  searchCancelSales(){

  }

  toggleFila(index: number) {
    this.filaExpandida = (this.filaExpandida === index) ? null : index;
  }
}
