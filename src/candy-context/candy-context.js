import React from "react";

const CandyContext = React.createContext({});

const stockReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        stock: [...state.stock, action.item],
      };

    case "LOAD_STOCK":
      return {
        ...state,
        stock: action.item,
      };

    default:
      return state;
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const { item } = action;
      const existingCandyIndex = state.cart.findIndex(
        (candy) => candy.candyName === item.candyName
      );

      if (existingCandyIndex !== -1) {
        const updatedCart = [...state.cart];
        const updatedCandy = {
          ...updatedCart[existingCandyIndex],
          candyQuantity:
            updatedCart[existingCandyIndex].candyQuantity + item.candyQuantity,
        };
        updatedCart[existingCandyIndex] = updatedCandy;

        // Update candy quantity in the CRUD API
        updateCandyQuantityInApi(updatedCandy);

        return {
          ...state,
          cart: updatedCart,
          totalCandiesInCart: state.totalCandiesInCart + item.candyQuantity,
        };
      } else {
        // Add new candy to the CRUD API
        addNewCandyToApi(item);

        return {
          ...state,
          cart: [...state.cart, item],
          totalCandiesInCart: state.totalCandiesInCart + item.candyQuantity,
        };
      }

    case "LOAD_CART":
      return {
        ...state,
        cart: action.item,
      };

    default:
      return state;
  }
};

const updateCandyQuantityInApi = async (candy) => {
  try {
    const response = await fetch(
      `https://crudcrud.com/api/6edc701a287f4826a6305ffd15b8dbf9/candycart/${candy._id}`,
      {
        method: "PUT",
        body: JSON.stringify(candy),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update candy quantity");
    }
  } catch (error) {
    alert(error);
  }
};

const addNewCandyToApi = async (candy) => {
  try {
    const response = await fetch(
      "https://crudcrud.com/api/6edc701a287f4826a6305ffd15b8dbf9/candycart",
      {
        method: "POST",
        body: JSON.stringify(candy),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add candy to cart");
    }

    const addedCandy = await response.json();
    candy._id = addedCandy._id; // Update the candy object with the assigned ID
  } catch (error) {
    alert(error);
  }
};

export const CandyContextWrapper = (props) => {
  const [cartModalOpen, setCartModalOpen] = React.useState(false);

  const openCartModal = () => {
    setCartModalOpen(true);
  };

  const closeCartModal = () => {
    setCartModalOpen(false);
  };

  const handleAddToStock = (candy) => {
    stockDispatch({ type: "ADD", item: candy });
  };

  const handleAddToCart = (candy) => {
    cartDispatch({ type: "ADD", item: candy });
  };

  const handleRemoveFromCart = (candy) => {
    cartDispatch({ type: "REMOVE", item: candy });
  };

  const [stockState, stockDispatch] = React.useReducer(stockReducer, {
    stock: [],
    addToStock: handleAddToStock,
  });

  const [cartState, cartDispatch] = React.useReducer(cartReducer, {
    cart: [],
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    totalCandiesInCart: 0,
    totalCostOfCandiesInCart: 0,
  });

  React.useEffect(() => {
    const loadStock = async () => {
      const response = await fetch(
        "https://crudcrud.com/api/6edc701a287f4826a6305ffd15b8dbf9/candystock"
      );
      const data = await response.json();
      const cartItems = data.map((candy) => ({
        _id: candy._id,
        candyName: candy.candyName,
        candyDescription: candy.candyDescription,
        candyPrice: candy.candyPrice,
      }));

      stockDispatch({ type: "LOAD_STOCK", item: cartItems });
    };

    loadStock();
  }, []);

  return (
    <CandyContext.Provider
      value={{
        stockState,
        cartState,
        cartModalOpen,
        openCartModal,
        closeCartModal,
      }}
    >
      {props.children}
    </CandyContext.Provider>
  );
};

export default CandyContext;
