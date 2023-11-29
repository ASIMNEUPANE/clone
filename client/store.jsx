import {configureStore} from "@reduxjs/toolkit"
import { PAUSE,PERSIST,REGISTER,PURGE,FLUSH,REHYDRATE } from "redux-persist";


import { productReducer } from "./src/slices/productsSlice"

export const store = configureStore({
    reducer:{
        products:productReducer
    },
    middleware:(getDefaultMiddleware)=>
  getDefaultMiddleware({
    serializableCheck:{
      ignoreActions: [PAUSE,PERSIST,REGISTER,PURGE,FLUSH,REHYDRATE ]
    }
  })
})