import { Products } from "../products/types";
import { Order, AddedProduct } from "../users/types";

const initialProducts: Products = [];
const initialCart: AddedProduct[] = [];
const initialOrder: Order[] = [];

const initialState = {
  products: {
    list: initialProducts,
  },
  users: {
    cart: initialCart,
    isSignedIn: false,
    order: initialOrder,
    role: "",
    uid: "",
    username: "",
  },
};

export default initialState;
