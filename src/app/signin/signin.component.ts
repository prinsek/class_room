import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  submitted: boolean = true;

  loginComponent = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {}
  get email() {
    return this.loginComponent.get('email');
  }

  get password() {
    return this.loginComponent.get('password');
  }

  async submit() {
    if (this.loginComponent.invalid){
      return;
    } else {
      const { email, password } = this.loginComponent.value;

      await this.authService.login(email, password).then((user)=>{
        this.authService.isUser=true
        console.log('user1',user?"true":"false");

        this.authService.UserDetails=user
        this.router.navigate(['/home'])
      }).catch((error)=>{
        error.code=="auth/user-not-found"?alert("User not found"):null;
        error.code=="auth/wrong-password"?alert("Wrong Credentials!"):null;
      })
   
  }
}
}
