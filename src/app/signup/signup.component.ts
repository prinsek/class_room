import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators,ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
export function passwordMatchValidators():ValidatorFn{
  return (control:AbstractControl):ValidationErrors | null =>{
const password=control.get('password')?.value;
const confirmpassword=control.get('confirmpassword')?.value;

if(password && confirmpassword && password!==confirmpassword){
return {
  passwordsDontMatch:true
}
}
return null
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm=new FormGroup({
    name:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.email, Validators.required]),
    password:new FormControl('',Validators.required),
    confirmpassword:new FormControl('', Validators.required)
  },{validators: passwordMatchValidators()})
  constructor(private authserv:AuthenticationService,private router:Router ) {
    
   }
 
  ngOnInit(): void {
  }
  get name(){
    return this.signupForm.get('name')
  }
  get email(){
    return this.signupForm.get('email')
  }
  get password(){
    return this.signupForm.get('password')
  }
  get confirmpassword(){
    return this.signupForm.get('confirmpassword')
  }

  submit(){
    if(this.signupForm.invalid){
      return;
    } 
    const {name , email , password}=this.signupForm.value;
    this.authserv.signUp(name,email,password)
    this.router.navigate(['']);
   
    
  }
}
