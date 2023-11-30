import {configureStore} from "@reduxjs/toolkit"


import { productReducer } from "./src/slices/productsSlice"

export const store = configureStore({
    reducer:{
        products:productReducer
    }
})