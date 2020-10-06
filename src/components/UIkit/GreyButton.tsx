import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  button: {
    backgroundColor: "#e0e0e0",
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256,
  },
});

type Props = {
  label: string;
  onClick: () => any;
};
const GreyButton: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant="contained"
      onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  );
};

export default GreyButton;