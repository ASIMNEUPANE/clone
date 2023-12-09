import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../services/auth";

const initialState = {
  user: {},
  isLoggedIn: false,
  roles: [],
  error: "",
  loading: false,
};

export const loginByEmail = createAsyncThunk(
  "auth/loginByEmail",

  async ({ email, password }) => {
    try {
      const resp = await login({ email, password });
      return resp.data;
    } catch (e) {
      if (e.response) {
        throw e;
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setLogOut: (state, action) => {
      (state.user = {}), (state.roles = []), (state.isLoggedIn = false);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginByEmail.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload.data.user;
      state.roles.push(...action.payload.data.user.roles);
    });
    builder.addCase(loginByEmail.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(loginByEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.msg || action.error.message;
    });
  },
});

export const { setIsLoggedIn, setLogOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
