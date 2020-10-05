import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles({
  iconCell: {
    padding: 0,
    width: 48,
    height: 48,
  },
});

type Props = {
  sizes: { size: string; quantity: number }[];
  addProduct: (selectedSize: string) => void;
};
const SizeTable: React.FC<Props> = (props) => {
  const classes = useStyles();

  const sizes = props.sizes;

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {sizes.length > 0 &&
            sizes.map((size, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {size.size}
                </TableCell>
                <TableCell>残り{size.quantity}点</TableCell>
                <TableCell className={classes.iconCell}>
                  {size.quantity > 0 ? (
                    <IconButton onClick={() => props.addProduct(size.size)}>
                      <ShoppingCartIcon />
                    </IconButton>
                  ) : (
                    <div>売り切れ</div>
                  )}
                </TableCell>
                <TableCell className={classes.iconCell}>
                  <IconButton>
                    <FavoriteBorderIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SizeTable;
