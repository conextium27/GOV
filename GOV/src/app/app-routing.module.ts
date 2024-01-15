import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrderComponent } from './views/create-order/create-order.component';
import { ConsultOrdersComponent } from './views/consult-orders/consult-orders.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'createOrder', component: CreateOrderComponent },
      { path: 'consultOrders', component: ConsultOrdersComponent },
      { path: '', redirectTo: '/createOrder', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
