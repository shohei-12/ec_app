import React from "react";
import { useSelector } from "react-redux";
import { State } from "../reducks/store/types";
import { getUserId } from "../reducks/users/selectors";

const Home: React.FC = () => {
  const selector = useSelector((state: State) => state);
  const uid = getUserId(selector);

  return (
    <div>
      <h2>Home</h2>
      <p>{uid}</p>
    </div>
  );
};

export default Home;
