import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../models/item';
import { CartService } from '../services/cart.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  items: Item[] = [];
  total: any;
  constructor(private cart: CartService,public loginService: FirebaseService,public router: Router) { }

  ngOnInit(): void {
    this.total = this.cart.bill();
  
  }

  placeOrder(){
    this.items =  this.cart.listProducts();
    this.cart.createOrder(this.items);
    this.cart.delete();
    alert('Your payment was succesfull');
    this.router.navigate(['profile']);
  }

  cancel(){
   this.router.navigate(['cart']);
  }


}
