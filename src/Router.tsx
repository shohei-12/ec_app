import React from "react";
import { Switch, Route } from "react-router";
import {
  CartList,
  ProductDetail,
  ProductEdit,
  ProductList,
  Reset,
  SignIn,
  SignUp,
} from "./templates";
import Auth from "./Auth";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/password/reset" component={Reset} />
      <Auth>
        <Route exact path="(/)?" component={ProductList} />
        <Route path="/product/edit(/:id)?" component={ProductEdit} />
        <Route exact path="/product/detail/:id" component={ProductDetail} />
        <Route exact path="/cart" component={CartList} />
      </Auth>
    </Switch>
  );
};

export default Router;
