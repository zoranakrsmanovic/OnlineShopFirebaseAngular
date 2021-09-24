import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  email:any;
  id:any;
  name:any;
  address: any;
  birthDate!: Date;
  image: any;
  user:any;
  isUser!:boolean;


  constructor( public firebseService: FirebaseService, public firebaseAuth : AngularFireAuth,public firestore:AngularFirestore, public route: Router) { }

  ngOnInit(): void {
   
      this.getCurrentUserIdEmail();
      this.getUserDetails();
  }




  async getCurrentUserIdEmail(){
     this.firebaseAuth.user.subscribe(res=>{
      this.email = res?.email;
      this.id = res?.uid;
      console.log(this.email, this.id);
    }) 
  }

  getUserDetails(){

    this.firebseService.example()?.subscribe(user => {
     this.user = user;
    console.log(user);
 
    });
  }

  AreUserFieldsFilled(){
    if(this.user.length == 0){
      this.isUser =  false;
    }
  }
 

  fillUser(){
    let id = this.id;
    let email = this.email;
    let name = this.name;
    let address = this.address;
    let birthDate = this.birthDate;
    this.firestore.collection('users').doc(id).set({
      email, name, address, birthDate
    })
  }




}
