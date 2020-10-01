export interface UserState {
  isSignedIn?: boolean;
  role: string;
  uid: string;
  username: string;
}

export interface UserAction {
  type: string;
  payload: UserState;
}
