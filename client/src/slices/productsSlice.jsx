import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { list } from "../services/products";

const initialState = {
  currentPage: 1,
  error: "",
  loading: false,
  products: [],
  product: {},
  limit: 4,
  total: 0,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const resp = await list();
    return resp.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.data.total;
        state.products = action.payload.data.data;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {setCurrentPage, setLimit} = productSlice.actions;
export const productReducer = productSlice.reducer;