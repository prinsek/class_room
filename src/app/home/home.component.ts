import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UploadService } from '../uploads/upload.service';
import { Upload } from '../uploads/upload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  user:any;
  email:any;
  name:any;
  selectedFiles:FileList;
  currentUpload : Upload;
  
  constructor(public authserv: AuthenticationService,public router:Router,private db: AngularFirestore, private upSvc: UploadService) {}

  ngOnInit() {
    this.authserv.UserDetails==undefined?this.router.navigate(['']):null
    this.user = this.authserv.UserDetails;
    console.log(this.user);
    this.email=this.user.user.email;

    this.getData()
    
  }

  async getData () {

   let data = await this.db.collection('user').doc(this.email).get()

   console.log("Res",data);  
  }
  detectFiles(event){
    this.selectedFiles = event.target.files;
  }

  uploadSingle(){
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload);
  }

  uploadMulti(){
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload);


    // let files = this.selectedFiles
    // let filesIndex = _.range(files.length)_.each(filesIndex, idx)=>{
    //   this.currentUpload = new Upload(files[idx]);
    //   this.upSvc.pushUpload(this.currentUpload);
    // }
  }
  
}
