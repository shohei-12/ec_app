import React from "react";
import { useSelector } from "react-redux";
import { State } from "../reducks/store/types";
import { getUserId, getUserName } from "../reducks/users/selectors";

const Home: React.FC = () => {
  const selector = useSelector((state: State) => state);
  const uid = getUserId(selector);
  const username = getUserName(selector);

  return (
    <div>
      <h2>Home</h2>
      <p>ユーザーID：{uid}</p>
      <p>ユーザー名：{username}</p>
    </div>
  );
};

export default Home;
