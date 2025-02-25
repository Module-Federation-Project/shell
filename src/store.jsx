import React from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, item) => {
      console.log("addtocart ", item);
      const { payload } = item;
      const existingItem = state.cart.find((item) => item.id === payload.id);

      if (existingItem) {
        state.cart = state.cart.map((item) =>
          item.id === payload.id
            ? { ...item, quantity: item.quantity + payload.quantity }
            : item
        );
      } else {
        state.cart = [...state.cart, payload];
        console.log("state.cart", state.cart);
      }
    },
    removeFromCart: (state, item) => {
      const { payload } = item;
      state.cart = state.cart.filter((product) => product.id !== payload.id);
    },
  },
});

const { addToCart, removeFromCart } = cartSlice.actions;

const store = configureStore({
  reducer: {
    cartReducer: cartSlice.reducer,
  },
});

export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export function useStore() {
  const cart = useSelector((state) => state.cartReducer.cart);
  const dispatch = useDispatch();

  return {
    useSelector,
    cart,
    addToCart: (item) => dispatch(addToCart(item)),
    removeFromCart: (item) => dispatch(removeFromCart(item)),
  };
}
