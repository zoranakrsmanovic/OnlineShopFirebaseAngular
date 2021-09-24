import { getNumberOfCurrencyDigits } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from '../models/item';
import { FirebaseService } from '../services/firebase.service';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  items: any;
  comment!: any;
  item!: any;
  id!:string;
  userEmail!:"Anonimus";
  isItems: any;
  comments:any;
  
  constructor(public db : AngularFirestore, public firebaseService: FirebaseService,
     public apiService: ApiService, private _ativatedRoute: ActivatedRoute,
     public route: Router, public cart:CartService ) { }

  ngOnInit() {
    this.id = this._ativatedRoute.snapshot.params['id'];
    this.item = new Item();
    this.firebaseService.getItemById(this.id).subscribe(
      data => {
        
        this.item = data;  
        console.log(this.item);  
      }
    )

    
        
    this.getComments();
   
  }

 


  addToCart(product: Item){
    this.cart.addToCart(product);
    alert('Product has been added to the cart')
  }

 

  leaveAComment(id:any){
    if(this.firebaseService.isUserLoggedIn() == true){
      let comment = this.comment;
    this.firebaseService.createComment(comment, id);
    console.log(id);
    this.comment = "";

    }else{
      alert("You must be logged in to comment");
      this.route.navigate(['login']);
    }
    
  }

  getComments(){
    this.id = this._ativatedRoute.snapshot.params['id'];
    this.firebaseService.listAllComments(this.id).subscribe(data=>{
       this.comments = data;
        console.log(data);
    })
  }

  goBack(){
    this.route.navigate(['products']);
  }


 
 
 


 



}


