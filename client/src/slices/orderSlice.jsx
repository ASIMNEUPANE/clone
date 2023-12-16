import { createSlice, createAsynThunk } from "@reduxjs/toolkit";
import * as ORDER_API from "../services/orders";

const initialState = {
  loading: false,
  error: "",
  orders: [],
  order: {},
};

export const create = createAsynThunk("/orders/create", async (payload) => {
  const res = await ORDER_API.create(payload);
  return res.data;
});

const orderSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(create.fulfilled, (state, action) => {
        state.payload = false;
        state.orders.push(action.payload.data);
      })
      .addCase(create.pending, (state, action) => {
        state.payload = true;
      })
      .addCase(create.rejected, (state, action) => {
        state.payload = false;
        state.error = action.payload.message;
      });
  },
});

export const orderReducer = orderSlice.reducer;
