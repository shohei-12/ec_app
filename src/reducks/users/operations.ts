import { signInAction } from "./actions";
import { push } from "connected-react-router";
import { State } from "../store/types";

export const signIn = () => {
  return async (dispatch: any, getState: any) => {
    const state: State = getState();
    const isSignedIn = state.users.isSignedIn;

    if (!isSignedIn) {
      const url = "https://api.github.com/users/shohei-12";

      const response = await fetch(url)
        .then((res) => res.json())
        .catch(() => null);

      const username = response.login;

      dispatch(
        signInAction({
          isSignedIn: true,
          uid: "00001",
          username: username,
        })
      );
      dispatch(push("/"));
    }
  };
};
