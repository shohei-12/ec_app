import { Products } from "../products/types";
import { AddedProduct } from "../users/types";

const initialProducts: Products = [];
const initialCart: AddedProduct[] = [];

const initialState = {
  products: {
    list: initialProducts,
  },
  users: {
    cart: initialCart,
    isSignedIn: false,
    role: "",
    uid: "",
    username: "",
  },
};

export default initialState;
