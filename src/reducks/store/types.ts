import { ProductState } from "../products/types";
import { UserState } from "../users/types";

export interface State {
  products: ProductState;
  users: UserState;
}
