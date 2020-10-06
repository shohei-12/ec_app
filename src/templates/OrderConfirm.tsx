import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsInCart } from "../reducks/users/selectors";
import { CartListItem } from "../components/Products";
import { PrimaryButton, TextDetail } from "../components/UIkit";
import { State } from "../reducks/store/types";
import { orderProduct } from "../reducks/products/operations";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    detailBox: {
      margin: "0 auto",
      [theme.breakpoints.down("sm")]: {
        width: 320,
      },
      [theme.breakpoints.up("sm")]: {
        width: 512,
      },
    },
    orderBox: {
      border: "1px solid rgba(0, 0, 0, 0.2)",
      borderRadius: 4,
      boxShadow: "0 4px 2px 2px rgba(0, 0, 0, 0.2)",
      width: 288,
      height: 256,
      padding: 16,
      margin: "24px auto 16px",
    },
  })
);

const OrderConfirm: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const productsInCart = getProductsInCart(selector)!;

  const subtotal = useMemo(() => {
    return productsInCart.reduce(
      (sum, product) => (sum += product.price as number),
      0
    );
  }, [productsInCart]);

  const postage = subtotal >= 10000 ? 0 : 210;
  const tax = subtotal * 0.1;
  const total = subtotal + postage + tax;

  const order = useCallback(() => {
    dispatch(orderProduct(productsInCart, subtotal));
  }, [productsInCart, subtotal]);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">注文の確認</h2>
      <div className="p-grid__row">
        <div className={classes.detailBox}>
          <List>
            {productsInCart.map((product, index) => (
              <CartListItem key={index} product={product} />
            ))}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail
            label="商品合計"
            value={"¥" + subtotal.toLocaleString()}
          />
          <TextDetail label="消費税" value={"¥" + tax.toLocaleString()} />
          <TextDetail label="送料" value={"¥" + postage} />
          <Divider />
          <TextDetail
            label="合計（税込）"
            value={"¥" + total.toLocaleString()}
          />
          <PrimaryButton label="注文する" onClick={order} />
        </div>
      </div>
    </section>
  );
};

export default OrderConfirm;
