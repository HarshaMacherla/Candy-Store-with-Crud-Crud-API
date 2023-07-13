import React from "react";
import { Button, Table } from "react-bootstrap";
import CandyContext from "../candy-context/candy-context";

const CandyStock = () => {
  const { stockState, cartState } = React.useContext(CandyContext);

  const addToCart = async (candy, count) => {
    const updatedCandy = { ...candy, candyQuantity: count };

    try {
      const response = await fetch(
        "https://crudcrud.com/api/6edc701a287f4826a6305ffd15b8dbf9/candycart",
        {
          method: "POST",
          body: JSON.stringify(updatedCandy),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add candy to cart");
      }

      const addedCandy = await response.json();
      const candyId = addedCandy._id;
      cartState.addToCart({ _id: candyId, ...candy });
    } catch (error) {
      alert(error);
    }
  };

  const candiesInStock = stockState.stock.map((candy) => (
    <tr key={candy.candyName}>
      <td>{candy.candyName}</td>
      <td>{candy.candyDescription}</td>
      <td>{candy.candyPrice}</td>
      <td>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => addToCart(candy, 1)}
        >
          Add 1
        </Button>
      </td>
      <td>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => addToCart(candy, 2)}
        >
          Add 2
        </Button>
      </td>
      <td>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => addToCart(candy, 3)}
        >
          Add 3
        </Button>
      </td>
    </tr>
  ));

  return (
    <section className="text-center">
      <div className="mx-auto" style={{ maxWidth: "800px" }}>
        <Table striped hover size="sm" className="mx-5">
          <thead>
            <tr>
              <th>Candy Name</th>
              <th>Description</th>
              <th>Price</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{candiesInStock}</tbody>
        </Table>
      </div>
    </section>
  );
};

export default CandyStock;
