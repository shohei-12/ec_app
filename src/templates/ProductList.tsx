import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../components/Products";
import { fetchProducts } from "../reducks/products/operations";
import { getProducts } from "../reducks/products/selectors";
import { State } from "../reducks/store/types";

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const products = getProducts(selector);

  const query = selector.router.location.search;
  const gender: string = /^\?gender=/.test(query)
    ? query.split("?gender=")[1]
    : "";
  const category: string = /^\?category=/.test(query)
    ? query.split("?category=")[1]
    : "";

  useEffect(() => {
    dispatch(fetchProducts(gender, category));
  }, [query]);

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        {products.length > 0 &&
          products.map((product, index) => (
            <ProductCard
              key={index}
              id={product.id}
              name={product.name}
              images={product.images}
              price={product.price}
            />
          ))}
      </div>
    </section>
  );
};

export default ProductList;
