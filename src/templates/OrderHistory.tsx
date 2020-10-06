import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../reducks/store/types";
import { getOrdersHistory } from "../reducks/users/selectors";
import { fetchOrdersHistory } from "../reducks/users/operations";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    orderList: {
      backgroundColor: theme.palette.grey["100"],
      margin: "0 auto",
      padding: 32,
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        width: 768,
      },
    },
  })
);

const OrderHistory: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const orderHistory = getOrdersHistory(selector);

  useEffect(() => {
    dispatch(fetchOrdersHistory());
  }, []);

  return (
    <section className="c-section-wrapin">
      <List className={classes.orderList}></List>
    </section>
  );
};

export default OrderHistory;
