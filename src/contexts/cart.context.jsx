import React, { createContext, useContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
  const found = cartItems.find((item) => item.id === productToAdd.id);

  if (found) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  }
};

const subtractCartItem = (cartItems, productToSubtract) => {
  const remove = cartItems.find(
    (item) => item.id === productToSubtract.id && item.quantity === 1
  );

  if (remove) {
    return cartItems.filter((item) => item.id !== productToSubtract.id);
  } else {
    return cartItems.map((item) =>
      item.id === productToSubtract.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }
};

const removeCartItem = (cartItems, productToRemove) => {
  return cartItems.filter((item) => item.id !== productToRemove.id);
};

const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  subtractItemFromCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const CART_ACTION_TYPE = { SET_CART_ITEMS: "SET_CART_ITEMS" };

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPE.SET_CART_ITEMS:
      return { ...state, ...payload };
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartCount, cartTotal } = state;

  const setCartItems = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    updateCartItemsReducer({
      cartItems: newCartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal,
    });
  };

  const setIsCartOpen = () => {
    updateCartItemsReducer({ isCartOpen: !isCartOpen });
  };

  const updateCartItemsReducer = (newCartItems) => {
    dispatch(createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    cartCount,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("Provider not found");
  }
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    cartCount,
    cartTotal,
  } = context;

  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const subtractItemFromCart = (productToRemove) => {
    setCartItems(subtractCartItem(cartItems, productToRemove));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  return {
    isCartOpen,
    toggleIsCartOpen,
    cartItems,
    addItemToCart,
    subtractItemFromCart,
    removeItemFromCart,
    cartCount,
    cartTotal,
  };
};
