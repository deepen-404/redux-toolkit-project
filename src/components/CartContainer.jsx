import { useSelector } from "react-redux";

// components
import CartItem from "./CartItem";

// functionality defined in the cartItem slice
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { openModal } from "../features/modal/modalSlice";

const CartContainer = () => {
  // an instance of useDispatch() hook
  // all the actions exported from the cartItem slice can be accessed through instance of useDispatch() hook
  const dispatch = useDispatch();

  const { cartItems, amount, total } = useSelector((store) => store.cart);

  if (amount < 1) {
    return (
      <section className="cart">
        <header style={{ textAlign: "center" }}>
          <h2>Your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>Your bag</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            Total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={() => dispatch(openModal())}>
          Clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
