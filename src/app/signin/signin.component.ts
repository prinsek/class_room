import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  submitted:boolean=true;

  loginComponent=new FormGroup({
    email:new FormControl('' , [Validators.required, Validators.pattern(
      '^([a-zA-Z0-9+_.-]{2,})+@([a-zA-Z]{2,}).+([a-zA-Z]{2,5})$'
    )
  ],),
    password:new FormControl('',[Validators.required]),
  })

  constructor() { }

  ngOnInit(): void {
  }
  get fg_master(){
    return this.loginComponent.controls;
  }

}
