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
export interface UserData {
  readonly role?: Role;
}
