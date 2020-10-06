import {
  signInAction,
  signOutAction,
  fetchProductsInCartAction,
} from "./actions";
import { push } from "connected-react-router";
import { auth, db, FirebaseTimestamp } from "../../firebase/index";
import { Order, AddedProduct } from "./types";
import { fetchOrdersHistoryAction } from "./actions";

export const fetchOrdersHistory = () => {
  return async (dispatch: any, getState: any) => {
    const uid = getState().users.uid;
    const list: Order[] = [];

    db.collection("users")
      .doc(uid)
      .collection("orders")
      .orderBy("updated_at", "desc")
      .get()
      .then((snapshots) => {
        snapshots.forEach((snapshot) => {
          const data = snapshot.data() as Order;
          list.push(data);
        });
        dispatch(fetchOrdersHistoryAction(list));
      });
  };
};

export const fetchProductsInCart = (products: AddedProduct[]) => {
  return async (dispatch: any) => {
    dispatch(fetchProductsInCartAction(products));
  };
};

export const addProductToCart = (addedProduct: AddedProduct) => {
  return async (dispatch: any, getState: any) => {
    const uid = getState().users.uid;
    const cartRef = db.collection("users").doc(uid).collection("cart").doc();
    addedProduct["cartId"] = cartRef.id;
    await cartRef.set(addedProduct);
    dispatch(push("/"));
  };
};

export const listenAuthState = () => {
  return async (dispatch: any) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;

        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data()!;

            dispatch(
              signInAction({
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );
          });
      } else {
        dispatch(push("/signin"));
      }
    });
  };
};

export const resetPassword = (email: string) => {
  return async (dispatch: any) => {
    if (email === "") {
      alert("必須項目が未入力です。");
    } else {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          alert(
            "入力されたメールアドレスにパスワードリセット用のメールを送信しました。"
          );
          dispatch(push("/signin"));
        })
        .catch(() => {
          alert(
            "入力されたメールアドレスにパスワードリセット用のメールを送信できませんでした。通信環境の良い場所で再度お試しください。"
          );
        });
    }
  };
};

export const signIn = (email: string, password: string) => {
  return async (dispatch: any) => {
    // Validation
    if (email === "" || password === "") {
      alert("必須項目が未入力です。");
      return false;
    }

    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;

        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data()!;

            dispatch(
              signInAction({
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );

            dispatch(push("/"));
          });
      }
    });
  };
};

export const signOut = () => {
  return async (dispatch: any) => {
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push("/signin"));
    });
  };
};

export const signUp = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  return async (dispatch: any) => {
    // Validation
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("必須項目が未入力です。");
      return false;
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう1度お試しください。");
      return false;
    }

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;

        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            uid: uid,
            username: username,
            email: email,
            role: "customer",
            created_at: timestamp,
            updated_at: timestamp,
          };

          db.collection("users")
            .doc(uid)
            .set(userInitialData)
            .then(() => dispatch(push("/")));
        }
      });
  };
};
