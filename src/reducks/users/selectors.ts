import { createSelector } from "reselect";
import { State } from "../store/types";

const usersSelector = (state: State) => state.users;

export const getUserId = createSelector([usersSelector], (state) => state.uid);
export const getUserName = createSelector(
  [usersSelector],
  (state) => state.username
);
