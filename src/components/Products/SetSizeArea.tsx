import React, { useCallback, useMemo, useState } from "react";
import { TextInput } from "../UIkit";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  checkIcon: {
    float: "right",
  },
  iconCell: {
    width: 48,
    height: 48,
  },
});

type Props = {
  sizes: { size: string; quantity: number }[];
  setSizes: React.Dispatch<
    React.SetStateAction<
      {
        size: string;
        quantity: number;
      }[]
    >
  >;
};
const SetSizeArea: React.FC<Props> = (props) => {
  const classes = useStyles();

  const [index, setIndex] = useState(0),
    [size, setSize] = useState(""),
    [quantity, setQuantity] = useState(0);

  const inputSize = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setSize(event.target.value),
    [setSize]
  );

  const inputQuantity = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setQuantity(parseInt(event.target.value, 10)),
    [setQuantity]
  );

  const addSize = (index: number, size: string, quantity: number) => {
    if (size === "" || quantity === 0) {
      return false;
    } else {
      if (index === props.sizes.length) {
        props.setSizes((prevState) => [
          ...prevState,
          { size: size, quantity: quantity },
        ]);
        setIndex(index + 1);
        setSize("");
        setQuantity(0);
      } else {
        const newSizes = props.sizes;
        newSizes[index] = { size: size, quantity: quantity };
        props.setSizes(newSizes);
        setIndex(newSizes.length);
        setSize("");
        setQuantity(0);
      }
    }
  };

  const deleteSize = (index: number) => {
    const newSizes = props.sizes.filter((size, i) => i !== index);
    props.setSizes(newSizes);
  };

  const editSize = (index: number, size: string, quantity: number) => {
    setIndex(index);
    setSize(size);
    setQuantity(quantity);
  };

  const memoIndex = useMemo(() => setIndex(props.sizes.length), [
    props.sizes.length,
  ]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>サイズ</TableCell>
              <TableCell>数量</TableCell>
              <TableCell className={classes.iconCell} />
              <TableCell className={classes.iconCell} />
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sizes.length > 0 &&
              props.sizes.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <IconButton
                      className={classes.iconCell}
                      onClick={() => editSize(i, item.size, item.quantity)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      className={classes.iconCell}
                      onClick={() => deleteSize(i)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div>
          <TextInput
            fullWidth={false}
            label="サイズ"
            multiline={false}
            required={true}
            rows="1"
            value={size}
            type="text"
            onChange={inputSize}
          />
          <TextInput
            fullWidth={false}
            label="数量"
            multiline={false}
            required={true}
            rows="1"
            value={quantity}
            type="number"
            onChange={inputQuantity}
          />
        </div>
        <IconButton
          className={classes.checkIcon}
          onClick={() => addSize(index, size, quantity)}
        >
          <CheckCircleIcon />
        </IconButton>
      </TableContainer>
    </div>
  );
};

export default SetSizeArea;
