import React from "react";
import { Table } from "react-bootstrap";
import CandyContext from "../candy-context/candy-context";

const Cart = () => {
  const { cartState } = React.useContext(CandyContext);

  const candiesInCart = cartState.cart.map((candy) => (
    <tr key={candy.candyName}>
      <td>{candy.candyName}</td>
      <td>X{candy.candyQuantity}</td>
      <td>Rs. {candy.candyPrice}</td>
    </tr>
  ));

  return (
    <Table hover size="sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{candiesInCart}</tbody>
    </Table>
  );
};

export default Cart;
