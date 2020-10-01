//import * as Actions from "./actions";
import initialState from "../store/initialState";
import { ProductAction } from "./types";

export const ProductsReducer = (
  state = initialState.products,
  action: ProductAction
) => {
  switch (action.type) {
    default:
      return state;
  }
};
