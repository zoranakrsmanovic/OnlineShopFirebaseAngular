import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { TOOLTIP_PANEL_CLASS } from '@angular/material/tooltip';
import { PaginationInstance } from 'ngx-pagination';
import { Item } from '../models/item';
import { Orders } from '../models/orders';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  isOrders!: boolean;
  page: number = 1;
  total: number = 50;
  loading: boolean = false;
  panelOpenState = false;
 
  


  public config: PaginationInstance = {
    id: 'server',
    itemsPerPage: 3,
    currentPage: this.page,
    totalItems: this.total
  };

  constructor(public fbs: FirebaseService) {
  
   }

    orders:any = [];

  ngOnInit(): void {
    this.getOrdersByUser(1);
   
    
   
  }


   

   
 getOrdersByUser(page: any){
  this.page = page;
  this.loading = true;
   this.fbs.getUsersOrders().subscribe(orders => {
    this.config.currentPage = page;
    this.orders = orders;
    this.total = orders.length ;
    this.loading = false;
   console.log(orders);

   })

  

   

 }


     

 


}

 
 



