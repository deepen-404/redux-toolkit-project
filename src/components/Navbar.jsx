import { CartIcon } from "../icons";
import { useSelector } from "react-redux";

import React from "react";

const Navbar = () => {
  // extracting the cart reducer from the store which gives all the value stored in our cartItem
  //   const amount = useSelector((store) => store.cart.amount);
  const { amount } = useSelector((store) => store.cart);
//   console.log(amount);
  return (
    <nav>
      <div className="nav-center">
        <h3>Redux Toolkit</h3>
        <div className="nav-container">
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
