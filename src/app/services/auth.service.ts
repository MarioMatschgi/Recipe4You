import { User } from './../model/user.model';
import { RouterService } from './router.service';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Injectable, NgZone } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

type Error = { code: string; message: string };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: User;

  error: { code: string; message: string } = undefined;

  isDebugUser: boolean = false;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private ar: Router,
    private router: RouterService,
    private ngZone: NgZone
  ) {
    this.userData = JSON.parse(localStorage.getItem('user'));

    this.afAuth.authState.subscribe((user) => {
      this.userData = user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(this.userData));

        console.log('USER NOW SET TO ');
        console.log(this.userData);
      } else {
        localStorage.setItem('user', null);

        console.log('USER NOW UNSET');
      }
      console.log('USER DATA');
      console.log(this.userData);
    });
  }

  private debugUsers = ['mariomatschgi@gmail.com', 'marioelsnig@gmail.com'];
  private async setup() {
    this.manage_routing(undefined);
    if (!this.loggedIn) return;

    // ROUTER CALLBACKS
    this.ar.events.subscribe((event) => {
      this.manage_routing(event);
    });

    // Debug user
    this.isDebugUser = this.debugUsers.includes(this.userData.email);
  }

  /*
    INIT
  */
  manage_routing(event: Event) {
    // console.log('MANAGE ROUTING');
    // if (event instanceof NavigationStart) {
    //   console.log('Navigation start event');
    // } else if (event instanceof NavigationEnd) {
    //   console.log('Navigation start event');
    // } else if (event == undefined) {
    //   console.log('Navigation undef');
    // }
  }

  /*
    ERROR
  */
  get_error({ code, message }: Error): Error {
    return { code: code, message: this.get_error_msg(code) || message };
  }
  get_error_by_code(code: string): Error {
    return { code: code, message: this.get_error_msg(code) };
  }
  get_error_msg(code: string): string {
    let msg = undefined;
    switch (code) {
      case 'auth/too-many-requests':
        msg =
          'The login was tried too often, please try again later or reset your password!';
        break;
      case 'auth/user-not-found':
        msg = 'The username or password is wrong!';
        break;
      case 'auth/form-invalid':
        msg = 'The form is not valid!';
        break;
    }
    return msg;
  }

  /*
    USER STUFF
  */
  get loggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));

    return user !== null ? true : false;
  }

  getEmptyUser(): User {
    return { uid: null, email: null };
  }

  /*
    SIGNIN STUFF
   */
  private successfullySignedIn(auth: string) {
    this.error = undefined;
    console.log('AUTH: successfully signed in with ' + auth);

    this.router.nav_home();
  }
  async signIn_google() {
    return await this.afAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        this.successfullySignedIn('google');
      })
      .catch((error) => {
        this.error = this.get_error(error);
      });
  }

  async signIn_email(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.successfullySignedIn('email');
      })
      .catch((error) => {
        this.error = this.get_error(error);
      });
  }

  async canSignIn_email(email: string) {
    return await this.afAuth
      .fetchSignInMethodsForEmail(email)
      .then((signInMethods) => {
        return signInMethods.includes('password');
      });
  }

  /*
    SIGNUP STUFF
  */
  async signUp_email(email, password) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u) => u.sendEmailVerification())
      .then(() => {
        // this.ar.navigate(['verify-email-address']);
      });
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.nav_home();
  }
}
