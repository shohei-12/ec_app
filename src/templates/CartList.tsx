import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { getProductsInCart } from "../reducks/users/selectors";
import { State } from "../reducks/store/types";
import { CartListItem } from "../components/Products";
import { GreyButton, PrimaryButton } from "../components/UIkit";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    margin: "0 auto",
    maxWidth: 512,
    width: "100%",
  },
});

const CartList: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const productsInCart = getProductsInCart(selector)!;

  const goToOrder = useCallback(() => {
    dispatch(push("/order/confirm"));
  }, []);

  const backToHome = useCallback(() => {
    dispatch(push("/"));
  }, []);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">ショッピングカート</h2>
      <List className={classes.root}>
        {productsInCart.length > 0 &&
          productsInCart.map((product, index) => (
            <CartListItem key={index} product={product} />
          ))}
      </List>
      <div className="module-spacer--medium" />
      <div className="p-grid__column">
        <PrimaryButton label="レジへ進む" onClick={goToOrder} />
        <div className="module-spacer--extra-small" />
        <GreyButton label="ショッピングを続ける" onClick={backToHome} />
      </div>
    </section>
  );
};

export default CartList;
