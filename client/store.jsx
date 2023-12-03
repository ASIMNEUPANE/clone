import {configureStore} from "@reduxjs/toolkit"


import { productReducer } from "./src/slices/productsSlice"
import { carReducer } from "./src/slices/cartSlice"

export const store = configureStore({
    reducer:{
        products:productReducer,
        cart:carReducer
    }
})