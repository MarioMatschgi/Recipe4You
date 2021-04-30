import { take } from 'rxjs/operators';
import { UserData, AuthData, Role } from './../model/user.model';
import { RouterService } from './router.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { EventEmitter, Injectable } from '@angular/core';
import { Event, Router, RouterLink } from '@angular/router';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseService } from './database.service';
import { RecipeModel } from '../model/recipe.model';

type Error = { code: string; message: string };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authData: AuthData;
  userData: UserData;

  is_auth_setup = false;
  is_user_setup = false;
  setup_event = new EventEmitter();

  error: { code: string; message: string } = undefined;

  isDebugUser: boolean = false;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private ar: Router,
    private router: RouterService,
    private db: DatabaseService
  ) {
    this.authData = JSON.parse(localStorage.getItem('authData'));
    this.userData = JSON.parse(localStorage.getItem('userData'));

    this.afAuth.authState.subscribe((user) => {
      this.authData = user;

      if (!this.is_auth_setup) this.setup_event.emit();
      this.is_auth_setup = true;

      if (user) {
        localStorage.setItem('authData', JSON.stringify(this.authData));
      } else {
        localStorage.setItem('authData', null);
        this.authData = null;
      }
    });

    if (this.loggedIn) {
      this.setup_event.subscribe(() => {
        this.db.db
          .collection('users')
          .doc(this.authData.uid)
          .valueChanges()
          .subscribe((data) => {
            this.userData = data;
            this.is_user_setup = true;

            if (data) {
              localStorage.setItem('userData', JSON.stringify(this.userData));
            } else {
              localStorage.setItem('userData', null);
              this.userData = null;
            }
          });
      });
    }
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
    this.isDebugUser = this.debugUsers.includes(this.authData.email);
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
  is_author_or_admin(author): boolean {
    return this.is_author(author) || this.is_admin();
  }
  is_author(author): boolean {
    return this.is_user(author);
  }
  is_admin(): boolean {
    return this.userData.role == Role.admin;
  }

  get_name(): string {
    return this.authData.displayName || this.authData.email;
  }
  is_user(id: string): boolean {
    if (!this.loggedIn) return false;

    return this.authData.uid === id;
  }

  get loggedIn(): boolean {
    return this.authData !== null ? true : false;
  }

  getEmptyUser(): AuthData {
    return { uid: null, email: null };
  }

  /*
    SIGNIN STUFF
   */
  private successfullySignedIn(auth: string) {
    this.error = undefined;
    // console.log('AUTH: successfully signed in with ' + auth);

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
