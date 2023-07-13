import React from "react";
import { Button, Navbar, Nav, Container, Modal } from "react-bootstrap";
import Cart from "./Cart";
import CandyContext from "../candy-context/candy-context";

const CartButton = () => {
  const { cartModalOpen, openCartModal, closeCartModal } =
    React.useContext(CandyContext);

  return (
    <Navbar bg="dark">
      <Container className="justify-content-end">
        <Nav>
          <Button variant="outline-light" onClick={openCartModal}>
            Cart
          </Button>
        </Nav>
        <Modal show={cartModalOpen} onHide={closeCartModal}>
          <Modal.Header closeButton={true}>
            <Modal.Title>Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Cart />
          </Modal.Body>
        </Modal>
      </Container>
    </Navbar>
  );
};

export default CartButton;
