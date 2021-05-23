import { take } from 'rxjs/operators';
import {
  AuthData,
  Role,
  emptyUserPublicData,
  UserPrivateData,
  UserPublicData,
  emptyUserPrivateData,
} from '../../app/model/user.model';
import { RouterService } from './router.service';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { EventEmitter, Injectable } from '@angular/core';
import { Event, Router, RouterLink } from '@angular/router';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseService } from './database.service';
import { RecipeModel } from '../../app/model/recipe.model';
import { Subscription } from 'rxjs';

type Error = { code: string; message: string };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userPrivateData: UserPrivateData;
  userPublicData: UserPublicData;
  private changed_userPrivateData = new EventEmitter<UserPrivateData>();
  private changed_userPublicData = new EventEmitter<UserPublicData>();
  doc_userPrivate: AngularFirestoreDocument<any>;
  doc_userPublic: AngularFirestoreDocument<any>;

  get displayName_or_email(): string {
    if (!this.userPublicData) return '';

    const displayName = this.userPublicData.displayName;
    const email = this.userPublicData.email;

    if (displayName == null || displayName == '') return email;
    else return displayName;
  }

  is_auth_setup = false;
  is_userPrivate_setup = false;
  is_userPublic_setup = false;
  setup_event = new EventEmitter();
  setup_userPrivate_event = new EventEmitter<UserPrivateData>();
  setup_userPublic_event = new EventEmitter<UserPublicData>();

  private_subscription: Subscription;
  public_subscription: Subscription;

  error: { code: string; message: string } = undefined;

  isDebugUser: boolean = false;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private ar: Router,
    private router: RouterService,
    private db: AngularFirestore
  ) {
    this.userPrivateData = {
      ...emptyUserPrivateData,
      ...JSON.parse(localStorage.getItem('userPrivateData')),
    };
    this.userPublicData = {
      ...emptyUserPublicData,
      ...JSON.parse(localStorage.getItem('userPublicData')),
    };

    this.changed_userPrivateData.emit(this.userPrivateData);
    this.changed_userPublicData.emit(this.userPublicData);

    if (this.loggedIn) this.set_docs(this.userPublicData.uid);

    this.afAuth.authState.subscribe(async (user) => {
      // If logged out
      if (user == null) {
        this.userPrivateData = null;
        this.userPublicData = null;
        localStorage.setItem('userPrivateData', null);
        localStorage.setItem('userPublicData', null);

        this.changed_userPrivateData.emit(this.userPrivateData);
        this.changed_userPublicData.emit(this.userPublicData);

        this.private_subscription?.unsubscribe();
        this.public_subscription?.unsubscribe();
      } else {
        // user public data null (was not logged in)
        if (this.userPublicData == null) {
          this.set_docs(user.uid);

          const data = (await this.doc_userPublic
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

            await this.doc_userPublic.set(data);
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
            this.doc_userPublic.set(this.userPublicData, { merge: true });
          }
        }
      }

      //
      if (!this.is_auth_setup) this.setup_event.emit();
      this.is_auth_setup = true;

      //

      if (this.loggedIn) {
        // userPublicData
        this.public_subscription = this.doc_userPublic
          .valueChanges()
          .subscribe((data) => {
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
        this.private_subscription = this.doc_userPrivate
          .valueChanges()
          .subscribe((data: Object) => {
            this.userPrivateData = { ...emptyUserPrivateData, ...data };

            this.changed_userPrivateData.emit(this.userPrivateData);
            this.changed_userPublicData.emit(this.userPublicData);

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
    if (!this.loggedIn) return;

    // Debug user
    this.isDebugUser = this.debugUsers.includes(this.userPublicData.email);
  }

  /*
    DATA
  */
  set_docs(uid: string) {
    this.doc_userPrivate = this.db.collection('users-private').doc(uid);
    this.doc_userPublic = this.db.collection('users-public').doc(uid);
  }

  sub_userPrivateData(func: (data: UserPrivateData) => void) {
    func(this.userPrivateData);
    this.changed_userPrivateData.subscribe((data) => {
      func(data);
    });
  }
  sub_userPublicData(func: (data: UserPublicData) => void) {
    func(this.userPublicData);
    this.changed_userPublicData.subscribe((data) => {
      func(data);
    });
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

  async get_displayname_or_email(uid: string) {
    const d = await this.db
      .collection('users-public')
      .doc(uid)
      .valueChanges()
      .pipe(take(1))
      .toPromise();

    if (d['displayName'] == null || d['displayName'] == '') return d['email'];
    else return d['displayName'];
  }
  is_user(id: string): boolean {
    if (!this.loggedIn) return false;

    return this.userPublicData.uid === id;
  }

  get loggedIn(): boolean {
    return this.userPublicData !== null && this.userPublicData.uid != ''
      ? true
      : false;
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

    this.router.nav('home');
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
    this.router.nav('home');
  }
}
