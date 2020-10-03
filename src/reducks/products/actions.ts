import { Products } from "./types";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const deleteProductAction = (products: Products) => {
  return {
    type: "DELETE_PRODUCT",
    payload: products,
  };
};

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const fetchProductsAction = (
  products: firebase.firestore.DocumentData[]
) => {
  return {
    type: "FETCH_PRODUCTS",
    payload: products,
  };
};
