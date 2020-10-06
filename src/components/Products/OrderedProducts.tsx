import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { PrimaryButton } from "../UIkit";
import { OrderHistory } from "../../reducks/products/types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  list: {
    backgroundColor: "#fff",
    height: "auto",
  },
  image: {
    objectFit: "cover",
    margin: "8px 16px 8px 0",
    width: 96,
    heigth: 96,
  },
  text: {
    width: "100%",
  },
});

type Props = {
  products: OrderHistory[];
};
const OrderedProducts: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = props.products;

  const goToProductDetail = useCallback((id: string) => {
    dispatch(push("/product/detail/" + id));
  }, []);

  return (
    <List>
      {products.map((product, index) => (
        <>
          <ListItem key={index} className={classes.list}>
            <ListItemAvatar>
              <img
                className={classes.image}
                src={product.images[0].path}
                alt="購入した商品"
              />
            </ListItemAvatar>
            <div className={classes.text}>
              <ListItemText
                primary={product.name}
                secondary={"サイズ: " + product.size}
              />
              <ListItemText primary={"¥" + product.price.toLocaleString()} />
            </div>
            <PrimaryButton
              label="商品詳細を見る"
              onClick={() => goToProductDetail(product.id)}
            />
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  );
};

export default OrderedProducts;
