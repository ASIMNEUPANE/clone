import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  PAUSE,
  PERSIST,
  REGISTER,
  PURGE,
  FLUSH,
  REHYDRATE,
} from "redux-persist";
import { autoMergeLevel2 } from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";

import { productReducer } from "./src/slices/productsSlice";
import { cartReducer } from "./src/slices/cartSlice";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const cartPersistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [PAUSE, PERSIST, REGISTER, PURGE, FLUSH, REHYDRATE],
      },
    }),
});
export const newStore = persistStore(store);
