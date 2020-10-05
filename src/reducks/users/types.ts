export interface UserState {
  cart?: AddedProduct[];
  isSignedIn?: boolean;
  role: string;
  uid: string;
  username: string;
}

export interface UserAction {
  type: string;
  payload: UserState | AddedProduct[];
}

export interface AddedProduct {
  added_at: firebase.firestore.Timestamp;
  description: string;
  gender: string;
  images: { id: string; path: any }[];
  name: string;
  price: number | string;
  productId: string;
  quantity: number;
  size: string;
  cartId?: string;
}
