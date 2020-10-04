import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../../assets/img/icons/logo.png";
import { State } from "../../reducks/store/types";
import { getIsSignedIn } from "../../reducks/users/selectors";
import { HeaderMenus } from ".";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: "#fff",
    color: "#444",
  },
  toolBar: {
    width: "100%",
    maxWidth: 1024,
    margin: "0 auto",
  },
  iconButtons: {
    margin: "0 0 0 auto",
  },
});

const Header: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const isSignedIn = getIsSignedIn(selector);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <img
            src={Logo}
            alt="Torahack Logo"
            width="128px"
            onClick={() => dispatch(push("/"))}
          />
          {isSignedIn && (
            <div className={classes.iconButtons}>
              <HeaderMenus />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
