import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "./reducks/store/types";
import { listenAuthState } from "./reducks/users/operations";
import { getIsSignedIn } from "./reducks/users/selectors";

const Auth: React.FC = ({ children }: any) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const isSignedIn = getIsSignedIn(selector);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  }, []);

  if (!isSignedIn) {
    return <></>;
  } else {
    return children;
  }
};

export default Auth;
