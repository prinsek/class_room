import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  constructor( public fb:FormBuilder) {
    
   }
   selectCheck=this.fb.group({
    select:['']
  });
 
  ngOnInit(): void {
  }

  countryList(){
  }
  modelChange(event:any){
    alert('hi')
  }


}
