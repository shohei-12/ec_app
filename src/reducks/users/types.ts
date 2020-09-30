export interface UserState {
  isSignedIn?: boolean;
  uid: string;
  username: string;
}

export interface UserAction {
  type: string;
  payload: UserState;
}
