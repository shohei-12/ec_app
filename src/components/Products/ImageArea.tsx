import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
  pointer: {
    "&:hover": {
      cursor: "pointer",
    },
  },
});

type Props = {};
const ImageArea: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div>
      <div className="u-text-right">
        <span>商品画像を登録する</span>
        <IconButton className={classes.icon}>
          <label className={classes.pointer}>
            <AddPhotoAlternateIcon />
            <input className="u-display-none" type="file" id="image" />
          </label>
        </IconButton>
      </div>
    </div>
  );
};

export default ImageArea;
