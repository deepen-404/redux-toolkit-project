import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://course-api.com/react-useReducer-cart-project";
// this is the initial state for our cartItem slice / feature
const initialState = {
  // cartItems: cartItems,
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
});
// here we are creating a new slice or a feature of our application using createSlice ( a tool from redux toolkit )
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      return { ...state, cartItems: [] };
    },
    removeItems: (state, action) => {
      const selectedItemId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== selectedItemId
      );
    },
    increase: (state, action) => {
      const selectedItemId = action.payload;
      const selectedItem = state.cartItems.find(
        (item) => item.id === selectedItemId
      );
      selectedItem.amount = selectedItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const selectedItems = state.cartItems.find((item) => item.id === payload);
      selectedItems.amount > 0 && (selectedItems.amount -= 1);
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount = amount + item.amount;
        total = total + item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { clearCart, removeItems, increase, decrease, calculateTotals } =
  cartSlice.actions;

// console.l>og(cartSlice.actions);
// we are exporting the cartItem slice to use in our store
export default cartSlice.reducer;
