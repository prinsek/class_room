import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user$=this.authserv.currentUser;
  constructor( public authserv:AuthenticationService) {
    
   }

  ngOnInit(){
  }

}
