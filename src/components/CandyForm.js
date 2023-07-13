import React from "react";
import CandyContext from "../candy-context/candy-context";
import { Button, Form, Container } from "react-bootstrap";

const CandyForm = () => {
  const nameRef = React.useRef();
  const descriptionRef = React.useRef();
  const priceRef = React.useRef();

  const { stockState } = React.useContext(CandyContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const candyName = nameRef.current.value;
    const candyDescription = descriptionRef.current.value;
    const candyPrice = parseInt(priceRef.current.value);

    const candy = {
      candyName,
      candyDescription,
      candyPrice,
    };

    try {
      const response = await fetch(
        "https://crudcrud.com/api/6edc701a287f4826a6305ffd15b8dbf9/candystock",
        {
          method: "POST",
          body: JSON.stringify(candy),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add candy");
      }

      const addedCandy = await response.json();
      const candyId = addedCandy._id;
      stockState.addToStock({ _id: candyId, ...candy });
    } catch (error) {
      alert(error);
    }

    nameRef.current.value = "";
    descriptionRef.current.value = "";
    priceRef.current.value = "";
  };

  return (
    <section>
      <Form
        className="mx-5 my-5 p-4 border border-dark rounded"
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="candyForm.candyName">
          <Form.Label>Candy Name</Form.Label>
          <Form.Control type="text" placeholder="Melody" ref={nameRef} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="candyForm.candyDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            rows={3}
            placeholder="Candy Descritption"
            ref={descriptionRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="candyForm.candyPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter the price"
            ref={priceRef}
          />
        </Form.Group>
        <Container className="text-center">
          <Button type="submit" variant="dark">
            Add Candy
          </Button>
        </Container>
      </Form>
    </section>
  );
};

export default CandyForm;
