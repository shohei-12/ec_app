import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import parse from "html-react-parser";
import { db, FirebaseTimestamp } from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Product } from "../reducks/products/types";
import { ImageSwiper, SizeTable } from "../components/Products";
import { addProductToCart } from "../reducks/users/operations";

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
  const dispatch = useDispatch();
  const id = window.location.pathname.split("/")[3];
  const initialProduct: Product = {
    id: "",
    name: "",
    description: "",
    category: "",
    gender: "",
    images: [],
    price: "",
    sizes: [],
  };

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

  const addProduct = useCallback(
    (selectedSize: string) => {
      const timestamp = FirebaseTimestamp.now();
      dispatch(
        addProductToCart({
          added_at: timestamp,
          description: product.description,
          gender: product.gender,
          images: product.images,
          name: product.name,
          price: product.price,
          productId: product.id,
          quantity: 1,
          size: selectedSize,
        })
      );
    },
    [product]
  );

  return (
    <section className="c-section-wrapin">
      {product.id !== "" && (
        <div className="p-grid__row">
          <div className={classes.sliderBox}>
            <ImageSwiper images={product.images} />
          </div>
          <div className={classes.detail}>
            <h2 className="u-text__headline">{product.name}</h2>
            <p className={classes.price}>
              {parseInt(product.price, 10).toLocaleString()}
            </p>
            <div className="module-spacer--small"></div>
            <SizeTable sizes={product.sizes} addProduct={addProduct} />
            <div className="module-spacer--small"></div>
            <p>{returnCodeToBr(product.description)}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
