import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../../assets/img/icons/logo.png";
import { State } from "../../reducks/store/types";
import { getIsSignedIn } from "../../reducks/users/selectors";
import { HeaderMenus, ClosableDrawer } from ".";

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

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback(
    (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setOpen(!open);
    },
    [setOpen, open]
  );

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
              <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  );
};

export default Header;
