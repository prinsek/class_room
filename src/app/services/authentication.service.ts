import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, from } from 'rxjs';
import { Alert } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentUser: BehaviorSubject<any> = new BehaviorSubject<object>({});
  isUser:Boolean = false;
  UserDetails:any = undefined

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {}
  ngOnInit() {
    this.currentUser.next(this.auth);
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signUp(name: string, email: string, password: string) {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.registration(name, email);
      })
      .catch((e) => console.log('ER', e));
  }

  registration(name: string, email: string) {
    this.db
      .collection('user')
      .doc(email)
      .set({
        Name: name,
        Email: email,
      })
      .then(() => {
        alert('Registration Successful');
      })
      .catch((e) => console.log('ERR', e));
  }

  readData( email: string) {
       return this.db.collection('user').doc(email)
  }

  logout() {
    return from(this.auth.signOut());
  }
}
