import { OrderHistory } from "../products/types";

export type Order = {
  amount: number;
  created_at: firebase.firestore.Timestamp;
  id: string;
  products: OrderHistory[];
  shippingDate: firebase.firestore.Timestamp;
  updated_at: firebase.firestore.Timestamp;
};

export interface UserState {
  cart?: AddedProduct[];
  isSignedIn?: boolean;
  order?: Order[];
  role: string;
  uid: string;
  username: string;
}

export interface UserAction {
  type: string;
  payload: UserState | AddedProduct[] | Order[];
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
