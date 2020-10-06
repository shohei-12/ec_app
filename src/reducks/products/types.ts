export type OrderHistory = {
  id: string;
  images: {
    id: string;
    path: any;
  }[];
  name: string;
  price: string | number;
  size: string;
};

export interface ProductState {
  list: Products;
}

export type Products = {
  id: string;
  name: string;
  description: string;
  category: string;
  gender: string;
  images: { id: string; path: any }[];
  price: string;
  sizes: { size: string; quantity: number }[];
}[];

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  gender: string;
  images: { id: string; path: any }[];
  price: string;
  sizes: { size: string; quantity: number }[];
};

export interface ProductAction {
  type: string;
  payload: Products;
}
