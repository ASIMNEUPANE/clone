import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemsInCart = state.cart.find((item) => 
        item._id === action.payload._id
      );
      if (itemsInCart) {
        if (itemsInCart.quantity < action.payload.quantity) {
          itemsInCart.quantity++
          state.quantity++
        }} else {
          state.cart.push({ ...action.payload, quantity: 1 });
          state.quantity++;
        
      }
    },
    updatetoCart:(state,action)=>{

    }
  },
});

export const { addToCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
