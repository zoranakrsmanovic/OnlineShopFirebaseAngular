import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msg = '';
  isSignedIn = false;
  constructor(public firebase:FirebaseService, private router: Router) { }

  ngOnInit(): void {
  }
  async onSignin(email:string,password:string){
    await this.firebase.singin(email,password)
    if(this.firebase.isLoggedIn){
      this.isSignedIn = true
     alert("You are successfully logged in")
    }else{
      
      this.router.navigate(['login'])
    }
    this.router.navigate(['/'])
  }
}
