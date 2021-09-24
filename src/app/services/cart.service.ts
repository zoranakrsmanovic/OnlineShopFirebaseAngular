import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { getMatInputUnsupportedTypeError } from '@angular/material/input';
import { add, total, get, exists, list, remove, update, destroy, quantity  } from 'cart-localstorage';
import { Item } from '../models/item';
import { FirebaseService } from './firebase.service';



@Injectable({
  providedIn: 'root'
})
export class CartService {
 
 item!:Item;
 items: Item[] = [];
  constructor( public firestore: AngularFirestore, public auth:AngularFireAuth ) { }

  addToCart(item: Item){
    
    console.log();
    add(item, 1);
    

  }

  delete(){
    destroy();
  }

  bill(){
    return total();
  }

  removeItem(id:any){
    remove(id);
  }

  updateQty(id:any, qty:number){
    return quantity(id,qty);
  }



  listProducts(){
    console.log(list());
    return list();
  }

  createOrder(items: Item[] = []){
    let createdAt = new Date().toLocaleDateString();
    let total = this.bill();
    let id = this.firestore.createId();
    let user =  localStorage.getItem('user');
    this.firestore.collection('orders').doc(id).set({
      items, user, total, createdAt
    })

  }
  



}
