export interface ProductState {
  list: [];
}

export interface ProductAction {
  type: string;
  payload: ProductState;
}
