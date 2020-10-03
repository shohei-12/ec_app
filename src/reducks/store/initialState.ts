import { Products } from "../products/types";

const initialProducts: Products = [];

const initialState = {
  products: {
    list: initialProducts,
  },
  users: {
    isSignedIn: false,
    role: "",
    uid: "",
    username: "",
  },
};

export default initialState;
