import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
  
})
export class SignupComponent implements OnInit {
  msg='';
  isSignedIn = false;
  constructor(public firebase: FirebaseService, public router: Router) { }

  ngOnInit(): void {
  }
async onSignup(email:string,password:string){
  await this.firebase.singup(email,password)
  if(this.firebase.isLoggedIn){
    this.isSignedIn = true;
    alert("You have succesfully created an account! Welcome!");
    this.firebase.logout();
    this.router.navigate(['login']);
  }
 

}
}
