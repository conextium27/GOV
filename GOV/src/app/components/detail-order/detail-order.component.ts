import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss']
})
export class DetailOrderComponent {
  @Input() orden: any; // Ajusta el tipo de datos según tu modelo de órdenes de venta.
  constructor(public bsModalRef: BsModalRef) {}
}
