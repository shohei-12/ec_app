import React, { useState, useEffect, useCallback } from "react";
import parse from "html-react-parser";
import { db } from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Product } from "../reducks/products/types";

const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 24px auto",
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      height: 400,
      width: 400,
    },
  },
  detail: {
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 16px auto",
      height: "auto",
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      height: "auto",
      width: 400,
    },
  },
  price: {
    fontSize: 36,
  },
}));

const returnCodeToBr = (text: string) => {
  if (text === undefined) {
    return false;
  } else if (text === "") {
    return text;
  } else {
    return parse(text.replace(/\n/g, "<br />"));
  }
};

const ProductDetail: React.FC = () => {
  const classes = useStyles();
  const id = window.location.pathname.split("/")[2];
  const initialProduct: Product = {};

  const [product, setProduct] = useState(initialProduct);

  useEffect(() => {
    db.collection("products")
      .doc(id)
      .get()
      .then((doc) => {
        const data: any = doc.data();
        setProduct(data);
      });
  }, []);

  return (
    <section className="c-section-wrapin">
      {product && (
        <div className="p-grid__row">
          <div className={classes.sliderBox}></div>
          <div className={classes.detail}>
            <h2 className="u-text__headline">{product.name}</h2>
            <p className={classes.price}>
              {parseInt(product.price!, 10).toLocaleString()}
            </p>
            <div className="module-spacer--small"></div>
            <div className="module-spacer--small"></div>
            <p>{returnCodeToBr(product.description!)}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
