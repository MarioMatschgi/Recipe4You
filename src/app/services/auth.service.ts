import { take } from 'rxjs/operators';
import {
  AuthData,
  Role,
  emptyUserPublicData,
  UserPrivateData,
  UserPublicData,
  emptyUserPrivateData,
} from './../model/user.model';
import { RouterService } from './router.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { EventEmitter, Injectable } from '@angular/core';
import { Event, Router, RouterLink } from '@angular/router';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseService } from './database.service';
import { RecipeModel } from '../model/recipe.model';
import { Subscription } from 'rxjs';

type Error = { code: string; message: string };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // authData: AuthData;
  userPrivateData: UserPrivateData;
  userPublicData: UserPublicData;

  is_auth_setup = false;
  is_userPrivate_setup = false;
  is_userPublic_setup = false;
  setup_event = new EventEmitter();
  setup_userPrivate_event = new EventEmitter<UserPrivateData>();
  setup_userPublic_event = new EventEmitter<UserPublicData>();

  private_subscription: Subscription;

  error: { code: string; message: string } = undefined;

  isDebugUser: boolean = false;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private ar: Router,
    private router: RouterService,
    private db: DatabaseService
  ) {
    this.userPrivateData = JSON.parse(localStorage.getItem('userPrivateData'));
    this.userPublicData = JSON.parse(localStorage.getItem('userPublicData'));

    this.afAuth.authState.subscribe(async (user) => {
      // If logged out
      if (user == null) {
        this.userPrivateData = null;
        this.userPublicData = null;
        localStorage.setItem('userPrivateData', null);
        localStorage.setItem('userPublicData', null);

        this.private_subscription?.unsubscribe();
      } else {
        // user public data null (was not logged in)
        if (this.userPublicData == null) {
          const data = (await this.db.db
            .collection('users-public')
            .doc(user.uid)
            .valueChanges()
            .pipe(take(1))
            .toPromise()) as Object;

          // not in database, create new user
          if (data == undefined) {
            const data: UserPublicData = {
              ...emptyUserPublicData,
              uid: user.uid,
              email: user.email,
              photoURL: user.photoURL,
              displayName: user.displayName,
            };

            await this.db.db.collection('users-public').doc(data.uid).set(data);
          }
          this.userPublicData = { ...emptyUserPublicData, ...data };
          localStorage.setItem(
            'userPublicData',
            JSON.stringify(this.userPublicData)
          );
        } else {
          // UPDATE DATA
          this.userPublicData.uid = user.uid;

          // UPDATE USER DATA (Check for changes in email and profile image and update it in the database)
          let changes = false;
          if (!this.userPublicData.email_overridden) {
            this.userPublicData.email = user.email;
            changes = true;
          }
          if (!this.userPublicData.photoURL_overridden) {
            this.userPublicData.photoURL = user.photoURL;
            changes = true;
          }
          if (!this.userPublicData.displayName_overridden) {
            this.userPublicData.displayName = user.displayName;
            changes = true;
          }

          // Push to database
          if (changes) {
            this.db.db
              .collection('users-public')
              .doc(this.userPublicData.uid)
              .set(this.userPublicData, { merge: true });
          }
        }
      }

      //
      if (!this.is_auth_setup) this.setup_event.emit();
      this.is_auth_setup = true;
    });

    this.setup_event.subscribe(() => {
      if (this.loggedIn) {
        // userPublicData
        this.db.db
          .collection('users-public')
          .doc(this.userPublicData.uid)
          .valueChanges()
          .subscribe((data) => {
            // Return if user logged out
            // if (this.userPublicData == null) return;

            if (this.userPublicData.photoURL_overridden)
              this.userPublicData.photoURL = data['photoURL'];
            if (this.userPublicData.displayName_overridden)
              this.userPublicData.displayName = data['displayName'];

            this.userPublicData.role = data['role'];

            if (!this.is_userPublic_setup)
              this.setup_userPublic_event.emit(this.userPublicData);
            this.is_userPublic_setup = true;

            // SAVE DATA TO LOCALSTORAGE
            if (data)
              localStorage.setItem(
                'userPublicData',
                JSON.stringify(this.userPublicData)
              );
            else localStorage.setItem('userPublicData', null);
          });

        // userPrivateData
        this.private_subscription = this.db.db
          .collection('users-private')
          .doc(this.userPublicData.uid)
          .valueChanges()
          .subscribe((data: Object) => {
            // Return if user logged out
            // if (this.userPrivateData == null) return;
            this.userPrivateData = { ...emptyUserPrivateData, ...data };

            if (!this.is_userPrivate_setup)
              this.setup_userPrivate_event.emit(this.userPrivateData);
            this.is_userPrivate_setup = true;

            // SAVE DATA TO LOCALSTORAGE
            if (data)
              localStorage.setItem(
                'userPrivateData',
                JSON.stringify(this.userPrivateData)
              );
            else localStorage.setItem('userPrivateData', null);
          });
      }
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
    this.isDebugUser = this.debugUsers.includes(this.userPublicData.email);
  }

  /*
    DATA
  */

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
    return this.loggedIn && this.userPublicData.role == Role.admin;
  }

  async get_displayname_or_email(uid: string = '') {
    if (uid == '') uid = this.userPublicData.uid;

    // TODO FUNC FOR THAT
    const d = await this.db.db
      .collection('users-public')
      .doc(uid)
      .valueChanges()
      .pipe(take(1))
      .toPromise();

    return d['displayName'] || d['email'];
  }
  is_user(id: string): boolean {
    if (!this.loggedIn) return false;

    return this.userPublicData.uid === id;
  }

  get loggedIn(): boolean {
    return this.userPublicData !== null ? true : false;
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
