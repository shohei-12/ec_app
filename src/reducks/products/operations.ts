import { push } from "connected-react-router";
import { db, FirebaseTimestamp } from "../../firebase";

const productsRef = db.collection("products");

export const saveProduct = (
  id: string,
  name: string,
  description: string,
  category: string,
  gender: string,
  images: { id: string; path: any }[],
  price: string
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
      updated_at: timestamp,
    };

    if (!id) {
      const ref = productsRef.doc();
      const id = ref.id;
      data.id = id;
      data.created_at = timestamp;
    }

    return productsRef
      .doc(data.id)
      .set(data, { merge: true })
      .then(() => dispatch(push("/")))
      .catch((error) => {
        throw new Error(error);
      });
  };
};
