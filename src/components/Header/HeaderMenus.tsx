import React from "react";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";

type Props = {
  handleDrawerToggle: (event: any) => void;
};
const HeaderMenus: React.FC<Props> = (props) => {
  return (
    <>
      <IconButton>
        <Badge badgeContent={3} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          props.handleDrawerToggle(event)
        }
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default HeaderMenus;
