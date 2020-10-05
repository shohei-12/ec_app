import React from "react";
import { useSelector } from "react-redux";
import { getUserId } from "../../reducks/users/selectors";
import { db } from "../../firebase";
import { State } from "../../reducks/store/types";
import { AddedProduct } from "../../reducks/users/types";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  list: {
    height: 128,
  },
  image: {
    width: 96,
    height: 96,
    objectFit: "cover",
    margin: 16,
  },
  text: {
    width: "100%",
  },
});

type Props = {
  product: AddedProduct;
};
const CartListItem: React.FC<Props> = (props) => {
  const classes = useStyles();
  const selector = useSelector((state: State) => state);
  const uid = getUserId(selector);

  const image = props.product.images[0].path;
  const name = props.product.name;
  const price = props.product.price.toLocaleString();
  const size = props.product.size;

  const removeProductFromCart = (id: string) => {
    db.collection("users").doc(uid).collection("cart").doc(id).delete();
  };

  return (
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <img className={classes.image} src={image} alt="商品画像" />
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText primary={name} secondary={"サイズ" + size} />
          <ListItemText primary={"¥" + price} />
        </div>
        <IconButton
          onClick={() => removeProductFromCart(props.product.cartId!)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
};

export default CartListItem;
