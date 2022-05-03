import { CART_ACTION_TYPE, CartItem } from "./cart.types";
import { CategoryItem } from "../categories/category.types";
import {
  createAction,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";

// SET CART ITEM
export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPE.SET_CART_ITEMS,
  CartItem[]
>;

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPE.SET_CART_ITEMS, cartItems)
);

// ADD ITEM =======
const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  const found = cartItems.find((item) => item.id === productToAdd.id);
  if (found) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

// SUBTRACT ITEM =====
const subtractCartItem = (
  cartItems: CartItem[],
  productToSubtract: CategoryItem
): CartItem[] => {
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

export const subtractItemFromCart = (
  cartItems: CartItem[],
  productToSubtract: CategoryItem
): SetCartItems => setCartItems(subtractCartItem(cartItems, productToSubtract));

// REMOVE/CLEAR ITEM =====
const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: CategoryItem
): CartItem[] => {
  return cartItems.filter((item) => item.id !== productToRemove.id);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  productToRemove: CartItem
): SetCartItems => setCartItems(removeCartItem(cartItems, productToRemove));

// SET CART OPEN =====
export type SetCartIsOpen = ActionWithPayload<
  CART_ACTION_TYPE.SET_CART_IS_OPEN,
  boolean
>;

export const setCartIsOpen = withMatcher((boolean: boolean): SetCartIsOpen => {
  return createAction(CART_ACTION_TYPE.SET_CART_IS_OPEN, boolean);
});
