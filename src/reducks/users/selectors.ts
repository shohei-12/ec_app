import { createSelector } from "reselect";
import { State } from "../store/types";

const usersSelector = (state: State) => state.users;

export const getOrdersHistory = createSelector(
  [usersSelector],
  (state) => state.order
);

export const getProductsInCart = createSelector(
  [usersSelector],
  (state) => state.cart
);

export const getIsSignedIn = createSelector(
  [usersSelector],
  (state) => state.isSignedIn
);

export const getUserId = createSelector([usersSelector], (state) => state.uid);

export const getUserName = createSelector(
  [usersSelector],
  (state) => state.username
);
