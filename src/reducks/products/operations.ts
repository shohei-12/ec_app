import { push } from "connected-react-router";
import { db, FirebaseTimestamp } from "../../firebase";
import { deleteProductAction, fetchProductsAction } from "./actions";
import { OrderHistory, Product, Products } from "./types";
import { AddedProduct } from "../users/types";

const productsRef = db.collection("products");

export const deleteProduct = (id: string) => {
  return async (dispatch: any, getState: any) => {
    productsRef
      .doc(id)
      .delete()
      .then(() => {
        const prevProducts: Products = getState().products.list;
        const nextProducts = prevProducts.filter(
          (product) => product.id !== id
        );
        dispatch(deleteProductAction(nextProducts));
      });
  };
};

export const fetchProducts = (gender: string, category: string) => {
  return async (dispatch: any) => {
    let query = productsRef.orderBy("updated_at", "desc");
    query = gender !== "" ? query.where("gender", "==", gender) : query;
    query = category !== "" ? query.where("category", "==", category) : query;

    query.get().then((snapshots) => {
      const productList: firebase.firestore.DocumentData[] = [];
      snapshots.forEach((snapshot) => {
        const product = snapshot.data();
        productList.push(product);
      });
      dispatch(fetchProductsAction(productList));
    });
  };
};

export const orderProduct = (
  productsInCart: AddedProduct[],
  amount: number
) => {
  return async (dispatch: any, getState: any) => {
    const uid = getState().users.uid;
    const userRef = db.collection("users").doc(uid);
    const timestamp = FirebaseTimestamp.now();

    const products: OrderHistory[] = [];
    const soldOutProducts: string[] = [];

    const batch = db.batch();

    for (const product of productsInCart) {
      const snapshot = await productsRef.doc(product.productId).get();
      const sizes = (snapshot.data() as Product).sizes;

      const updatedSize = sizes.map((size) => {
        if (size.size === product.size) {
          if (size.quantity === 0) {
            soldOutProducts.push(product.name);
            return size;
          }
          return {
            size: size.size,
            quantity: size.quantity - 1,
          };
        } else {
          return size;
        }
      });

      products.push({
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size,
      });

      batch.update(productsRef.doc(product.productId), { sizes: updatedSize });
      batch.delete(userRef.collection("cart").doc(product.cartId));
    }

    if (soldOutProducts.length > 0) {
      const errorMessage =
        soldOutProducts.length > 1
          ? soldOutProducts.join("と")
          : soldOutProducts[0];
      alert(
        `大変申し訳ございません。${errorMessage}が在庫切れとなったため、注文処理を中断しました。`
      );
      return false;
    } else {
      batch
        .commit()
        .then(() => {
          const orderRef = userRef.collection("orders").doc();
          const date = timestamp.toDate();
          const shippingDate = FirebaseTimestamp.fromDate(
            new Date(date.setDate(date.getDate() + 3))
          );

          const history = {
            amount: amount,
            created_at: timestamp,
            id: orderRef.id,
            products: products,
            shippingDate: shippingDate,
            updated_at: timestamp,
          };

          orderRef.set(history);
          dispatch(push("/order/complete"));
        })
        .catch(() => {
          alert(
            "注文処理に失敗しました。通信環境をご確認のうえ、もう一度お試しください。"
          );
          return false;
        });
    }
  };
};

export const saveProduct = (
  id: string,
  name: string,
  description: string,
  category: string,
  gender: string,
  images: { id: string; path: any }[],
  price: string,
  sizes: { size: string; quantity: number }[]
) => {
  return async (dispatch: any) => {
    const timestamp = FirebaseTimestamp.now();

    const data: any = {
      name: name,
      description: description,
      category: category,
      gender: gender,
      images: images,
      price: parseInt(price, 10),
      sizes: sizes,
      updated_at: timestamp,
    };

    if (!id) {
      const ref = productsRef.doc();
      id = ref.id;
      data.id = id;
      data.created_at = timestamp;
    }

    return productsRef
      .doc(id)
      .set(data, { merge: true })
      .then(() => dispatch(push("/")))
      .catch((error) => {
        throw new Error(error);
      });
  };
};
