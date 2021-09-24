import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Item } from '../models/item';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
 
  isLoggedIn = false;
 itemsCollection: AngularFirestoreCollection<Item>;
 filteredCollection!: AngularFirestoreCollection<Item>;
 ordersCollection!: AngularFirestoreCollection<any>;
 commentsCollection!: AngularFirestoreCollection<any>;
 userCollection!: AngularFirestoreCollection<any>;
 itemByIdCollection!: AngularFirestoreCollection<any>;
 items: Observable<any>;
 comments!:Observable<any>;
  orders!: Observable<any>;
  usersDetails!: Observable<any>;
  filteredItems!: Observable<any>;
  itemById!: Observable<any>;
userEmail:any;
  user: any;
  constructor(public firebaseAuth : AngularFireAuth, public afs: AngularFirestore) {
 

// getting all items
  this.itemsCollection = this.afs.collection<Item>('items');
   this.items = this.itemsCollection.snapshotChanges().pipe(map((actions: any[]) => {
    return actions.map(a => {
      const data = a.payload.doc.data() as Item;
      const id = a.payload.doc.id;
      return { id, ...data };
    });
  }));

   }

   getItemById(id:any){
    this.itemByIdCollection = this.afs.collection<Item>('items',ref=> 
    ref.where('__name__', '==', id));
    this.itemById = this.itemByIdCollection.snapshotChanges().pipe(map((actions: any[]) => {
     return actions.map(a => {
       const data = a.payload.doc.data() as Item;
       const id = a.payload.doc.id;
       return { id, ...data };
     });
   }));
   return this.itemById;
 
   }


   getFilteredItems(cat:any){
    this.filteredCollection = this.afs.collection<Item>('items',ref=> 
    ref.where('category', '==', cat));
    this.filteredItems = this.filteredCollection.snapshotChanges().pipe(map((actions: any[]) => {
     return actions.map(a => {
       const data = a.payload.doc.data() as Item;
       const id = a.payload.doc.id;
       return { id, ...data };
     });
   }));
   return this.filteredItems;
 
   }

  getItems(){
    return this.items;
   }


   getUsersOrders(){
    this.ordersCollection = this.afs.collection('orders',ref=> 
    ref.where('user', '==', localStorage.getItem('user')));
    this.orders = this.ordersCollection.snapshotChanges().pipe(map((actions: any[]) => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
    return this.orders;
   }


  listAllComments(id:any){
    this.commentsCollection = this.afs.collection<Item>('comments',ref=> 
    ref.where('prodId', '==', id));
    this.comments = this.commentsCollection.snapshotChanges().pipe(map((actions: any[]) => {
     return actions.map(a => {
       const data = a.payload.doc.data() as Item;
       const id = a.payload.doc.id;
       return { id, ...data };
     });
   }));
   return this.comments;
  }



   example(){

    if(this.isLoggedIn = true){
    this.userCollection = this.afs.collection('users',ref=> 
    ref.where('__name__', '==',  localStorage.getItem('user')?.substr(1,28)));
    this.usersDetails = this.userCollection.snapshotChanges().pipe(map((actions: any[]) => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
    return this.usersDetails;
   } else{
    this.userCollection = this.afs.collection('users',ref=> 
    ref.where('__name__', '==', "DXcjOgeI5dzcoYRnmDQo"));
    this.usersDetails = this.userCollection.snapshotChanges().pipe(map((actions: any[]) => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
    return this.usersDetails;
   }
  }

  createComment(comment: any, prodId:any){
    let createdAt = new Date().toLocaleDateString();
    let id = this.afs.createId();
    let user = "Anonimus"
    this.afs.collection('comments').doc(id).set({
      comment, user, createdAt, prodId
    })

  }
    


  async singin(email:string, password:string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password).then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user?.uid))
    }).catch((error) => {
      const errorCode = error.code;
      alert(error.message);
      const errorMessage = error.message;
    });
  }



   
   getCurrentUserId(){
     this.firebaseAuth.user.subscribe(res=>{
      this.user = res?.uid;
      console.log(this.user);
    })
    
  }

  getCurrentUserEmail(){
    this.firebaseAuth.user.subscribe(res=>{
    return  res?.email;
    
   })
   
 }


  async singup(email:string, password:string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password).then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
    }).catch((error) => {
      const errorCode = error.code;
      alert(error.message);
      const errorMessage = error.message;
    });
    
  }
  logout(){
    this.firebaseAuth.signOut();
    localStorage.clear();
  }

  isUserLoggedIn() {
    let user = localStorage.getItem('user')
    console.log(!(user === null))
    return !(user === null)
  }



}
function id(id: any): any {
  throw new Error('Function not implemented.');
}

