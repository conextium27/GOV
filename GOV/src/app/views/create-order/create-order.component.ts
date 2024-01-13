import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit{

  newOrderForm: FormGroup;
  
  // newOrderForm: FormGroup = new FormGroup({
  //   customerName: new FormControl(''),
  //   itemQuantity: new FormControl(''),
  //   itemName: new FormControl(''),
  //   itemPrice: new FormControl('')
  // });
  // submitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.newOrderForm = this.formBuilder.group({
      customerName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      itemPurchased: ['', [Validators.required, Validators.pattern(/^[0-9 ]*$/)]],
      itemName: ['', [Validators.required]],
      itemPrice: ['', [Validators.required]],
    }

    )
    
  }
  ngOnInit(): void {
    
  }

  
  addOrder(){
    if (this.newOrderForm.valid) {
      // Lógica para enviar el formulario
      console.log('Formulario válido:', this.newOrderForm.value);
    }
  }

}
