import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../reducks/users/operations";
import { State } from "../reducks/store/types";
import { getUserId, getUserName } from "../reducks/users/selectors";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const uid = getUserId(selector);
  const username = getUserName(selector);

  return (
    <div>
      <h2>Home</h2>
      <p>ユーザーID：{uid}</p>
      <p>ユーザー名：{username}</p>
      <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
    </div>
  );
};

export default Home;
