import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase';
import { Upload } from './upload';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  basePath: any;

  constructor(private db:AngularFireDatabase) { }

  private uploadTask: firebase.storage.UploadTask;

  pushUpload(upload:Upload){

      let storageRef= firebase.storage().ref();
      this.uploadTask = storageRef.child(`this.basePath/${upload.file.name}`).put(upload.file);

      this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot)=>{
          //uplod in progress
          upload.progress=(snapshot.bytesTransferred / snapshot.totalBytes) *100
        },
        (err)=>{
          console.log(err)
        },
        ()=>{
          upload.url=this.uploadTask.snapshot.downloadURL
          upload.name = upload.file.name
          this.saveFileData(upload)
        })

      
  }

  saveFileData(upload){
    console.log('upload successfully');
    
  }

  deleteUpload(upload: Upload){
    this.deleteFileData(upload.$key).then(() =>{ this.deleteFileStorage(upload.name)
    }).catch(error => console.log(error))
  }

  private deleteFileData(key : string){
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name : string){ 
    let storageRef = firebase.storage().ref();
    storageRef.child(`$(this.basePath)/${name}`).delete()
  }

}
