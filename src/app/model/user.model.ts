export interface AuthData {
  readonly uid: string;
  readonly email: string;
  readonly photoURL?: string;
  readonly displayName?: string;
}

export enum Role {
  none = 'none',
  admin = 'admin',
}

export const emptyUserPrivateData: UserPrivateData = {
  bookmarks: [''],
  lang: 'auto',
  theme: 0,
};
export interface UserPrivateData {
  bookmarks: [string];
  lang: string;
  theme: number;
}
export const emptyUserPublicData: UserPublicData = {
  uid: '',
  email: '',
  photoURL: '',
  displayName: '',
  role: Role.none,
};
export interface UserPublicData {
  // AUTH
  uid: string;
  email_overridden?;
  email: string;

  //
  photoURL_overridden?;
  displayName_overridden?;
  photoURL: string;
  displayName: string;

  //
  role: Role;
}
