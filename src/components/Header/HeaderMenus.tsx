import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";
import { State } from "../../reducks/store/types";
import { AddedProduct } from "../../reducks/users/types";
import { getUserId, getProductsInCart } from "../../reducks/users/selectors";
import { db } from "../../firebase";
import { fetchProductsInCart } from "../../reducks/users/operations";

type Props = {
  handleDrawerToggle: (event: any) => void;
};
const HeaderMenus: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const uid = getUserId(selector);
  let productsInCart = getProductsInCart(selector)!;

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(uid)
      .collection("cart")
      .onSnapshot((snapshots) => {
        snapshots.docChanges().forEach((change) => {
          const product = change.doc.data() as AddedProduct;
          const changeType = change.type;

          switch (changeType) {
            case "added":
              productsInCart.push(product);
              break;
            case "modified":
              const index = productsInCart.findIndex(
                (product) => product.cartId === change.doc.id
              );
              productsInCart[index] = product;
              break;
            case "removed":
              productsInCart = productsInCart.filter(
                (product) => product.cartId !== change.doc.id
              );
              break;
            default:
              break;
          }
        });
        dispatch(fetchProductsInCart(productsInCart));
      });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <IconButton>
        <Badge badgeContent={productsInCart.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          props.handleDrawerToggle(event)
        }
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default HeaderMenus;
