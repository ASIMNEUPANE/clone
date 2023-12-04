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
      const itemsInCart = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (itemsInCart) {
        if (itemsInCart.quantity < action.payload.quantity) {
          itemsInCart.quantity++;
          state.quantity++;
        }
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
        state.quantity++;
      }
    },
    increaseQuantity: (state, action) => {
     
      const itemsInCart = state.cart.find(
        (item) => item._id === action.payload.id
      );
      const product = action.payload.products.find(
        (item) => item._id === itemsInCart._id
      );
      if (itemsInCart) {
        if (itemsInCart.quantity < product?.quantity) {
          itemsInCart.quantity++;
          state.quantity++;
        }
      }
    },
    decreaseQuantity: (state, action) => {
      const itemsInCart = state.cart.find(
        (item) => item?._id === action.payload
        
      );

      if (itemsInCart.quantity === 1) {
        itemsInCart.quantity = 1;
      } else {
        itemsInCart.quantity--;
        state.quantity--;
      }
    },
    removeAll: (state) => {
      state.cart = [];
      state.quantity = 0;
    },
    removeItems: (state, action) => {
      const removeItem = state.cart.filter(
         (item) => item._id !== action.payload
      );
      state.cart= removeItem;
      state.quantity = state.cart.reduce((acc,obj)=>{
        return acc + obj.quantity;
      },0);
    },
  },
});

export const { addToCart,increaseQuantity,decreaseQuantity,removeAll,removeItems } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
