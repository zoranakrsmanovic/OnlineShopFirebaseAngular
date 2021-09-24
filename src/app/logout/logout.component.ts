import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor( public firebase: FirebaseService, private router: Router) { }

  ngOnInit(): void {
    this.firebase.logout();
    this.router.navigate(['login']);
  }

}
