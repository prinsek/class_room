import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'classroom';

  constructor(public authserv:AuthenticationService,private router:Router){}

  logout(){
    this.authserv.logout()
    this.router.navigate([''])
    console.log('logout successfully');
    
  }
}
