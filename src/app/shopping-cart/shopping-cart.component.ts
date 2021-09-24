import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Item } from '../models/item';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
 
  items: Item[] = [];
  cart_content = [];
  orders!: Object;
  total: any;
  empty = false;
  constructor( private cart: CartService,public loginService: FirebaseService,public router: Router) { 
    
  }

  ngOnInit()  {
   this.cartItems();
   this.total = this.cart.bill();
   this.isEmpty();
   console.log(this.empty);
  
  }
 
  cartItems(){
    this.items =  this.cart.listProducts();
  }
  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/cart']);
}

  deteteOneItem(id:any){
    this.cart.removeItem(id);
    console.log(id);
    this.reloadComponent();
  }

  updateQtyPlus(id:any, qty:number){
    qty = 1;
    this.cart.updateQty(id,qty);
    this.reloadComponent();
  }
  updateQtyMinus(id:any, qty:number){
    qty = - 1;
    this.cart.updateQty(id,qty);
    this.reloadComponent();
  }

  checkOut(){

    if(this.loginService.isUserLoggedIn()){

     this.items =  this.cart.listProducts();
     
     if(this.items.length < 1){
       alert('Your cart is empty')
       this.router.navigate(['products']);
     }
     else{
      this.router.navigate(['payment']);
     }
     
    }
    else {
      alert('You are not logged in')
      this.router.navigate(['login']);
    }
  }

  isEmpty(){
    if(this.total == 0){
      this.empty = true;
    }else{
      this.empty = false;
    }
   
  }

}
