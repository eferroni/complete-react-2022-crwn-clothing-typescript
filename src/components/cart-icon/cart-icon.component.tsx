import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartOpen,
  selectCartCount,
} from "../../store/cart/cart.selector";
import { setCartIsOpen } from "../../store/cart/cart.action";

const CartIcon = () => {
  const isCartOpen = useSelector(selectCartOpen);
  const cartCount = useSelector(selectCartCount);
  const dispatch = useDispatch();

  return (
    <CartIconContainer onClick={() => dispatch(setCartIsOpen(!isCartOpen))}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
