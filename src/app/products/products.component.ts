import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Item } from '../models/item';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CartService } from '../services/cart.service';
import { PaginationInstance } from 'ngx-pagination';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  value = '';
  maxSize = 9;
  items :Item[] = [];
  filteredItems: Item[] = [];
  SortDirection = 'asc';
  currentProductId!: string;
  item!: Item;
  page: number = 1;
  total: number = 50;
  loading: boolean = false;
  collection: any;
  itemsPerPage = 3;
  cat:any;

  public config: PaginationInstance = {
    id: 'server',
    itemsPerPage: 3,
    currentPage: this.page,
    totalItems: this.total
  };


  constructor(public productService: FirebaseService, private db: AngularFirestore, 
    private _ativatedRoute: ActivatedRoute, private apiService: ApiService,
    private router: Router, private cart: CartService ) { }
  
    
    
  ngOnInit(): void {
   this.listProducts(1);
  
   
   
  }

 

 
 listProducts(page: any){
  this.page = page;
  this.loading = true;
    this.productService.getItems().subscribe(items => {
     this.config.currentPage = page;
     this.items = items;
     this.total = items.length;
     this.loading = false;
   });
  }

 


  getOneItem(productId: string) {
    this.router.navigate(['details', productId]);
  }

  getProductProperties(product: Item){
    
    this.cart.addToCart(product);
    console.log(product);
    alert("Product has been added to the cart");
  }

  filterProducts(cat:any, page:any){
   
    this.productService.getFilteredItems(cat).subscribe(items =>{
   
    this.items = items;
   
    console.log(this.items);
    })
    
  }
 



  onSortDirectionDesc(){
    if(this.SortDirection === 'asc'){
      this.SortDirection = 'desc';
    }
  }

  onSortDirectionAsc(){
    if(this.SortDirection === 'desc'){
      this.SortDirection = 'asc';
    }
  }

  searchProduct(key: string): void{
    const results: Item[] = [];
    for (const product of this.items){
      if(product.title.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
      ){
         results.push(product);
      }
    }
    this.items = results;
    if(results.length === 0 || !key){
      this.listProducts(1);
    }
 }

 onPageChange(number: number) {
  this.config.currentPage = number;
}

onPageBoundsCorrection(number: number) {
  this.config.currentPage = number;
}

}
