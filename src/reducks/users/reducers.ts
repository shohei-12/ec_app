import * as Actions from "./actions";
import initialState from "../store/initialState";
import { UserAction, AddedProduct } from "./types";

export const UsersReducer = (
  state = initialState.users,
  action: UserAction
) => {
  switch (action.type) {
    case Actions.FETCH_PRODUCTS_IN_CART:
      return {
        ...state,
        cart: [...(action.payload as AddedProduct[])],
      };
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.SIGN_OUT:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
