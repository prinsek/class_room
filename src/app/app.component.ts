import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'classroom';
  val: any;


  constructor(public authserv: AuthenticationService, private router: Router) {}

  ngOnInit(){
    this.authserv.currentUser.subscribe(user =>{
      this.val=user;
      // console.log('User',this.val);
      
    });
    
  }

  logout() {
    this.authserv.logout();
    this.router.navigate(['']);
    console.log('logout successfully');
  }
}
