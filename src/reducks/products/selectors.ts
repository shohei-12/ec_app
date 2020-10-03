import { createSelector } from "reselect";
import { State } from "../store/types";

const productsSelector = (state: State) => state.products;

export const getProducts = createSelector(
  [productsSelector],
  (state) => state.list
);
