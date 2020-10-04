import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HistoryIcon from "@material-ui/icons/History";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { TextInput } from "../../components/UIkit";
import { signOut } from "../../reducks/users/operations";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up("sm")]: {
        flexShrink: 0,
        width: 256,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: 256,
    },
    searchField: {
      display: "flex",
      alignItems: "center",
      marginLeft: 32,
    },
  })
);

type Props = {
  open: boolean;
  onClose: (event: any) => void;
};
const ClosableDrawer: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");

  const inputKeyword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value);
    },
    [setKeyword]
  );

  const selectMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    path: string
  ) => {
    dispatch(push(path));
    props.onClose(event);
  };

  const menus = [
    {
      func: selectMenu,
      label: "商品登録",
      icon: <AddCircleIcon />,
      id: "register",
      value: "/product/edit",
    },
    {
      func: selectMenu,
      label: "注文履歴",
      icon: <HistoryIcon />,
      id: "history",
      value: "/order/history",
    },
    {
      func: selectMenu,
      label: "プロフィール",
      icon: <PersonIcon />,
      id: "profile",
      value: "/user/mypage",
    },
  ];

  return (
    <nav className={classes.drawer}>
      <Drawer
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={(e) => props.onClose(e)}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className={classes.searchField}>
          <TextInput
            fullWidth={false}
            label="キーワードを入力"
            multiline={false}
            required={false}
            rows="1"
            value={keyword}
            type="text"
            onChange={inputKeyword}
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {menus.map((menu, index) => (
            <ListItem
              button
              key={index}
              onClick={(e) => menu.func(e, menu.value)}
            >
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.label} />
            </ListItem>
          ))}
          <ListItem button key="logout" onClick={() => dispatch(signOut())}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </nav>
  );
};

export default ClosableDrawer;
