import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'kvaonlineshop';


  constructor(public loginService: FirebaseService){}
  ngOnInit(){
  
    
  }

 

  

 
}


