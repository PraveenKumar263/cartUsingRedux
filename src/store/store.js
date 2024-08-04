import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/cartSlice";

export const store = configureStore({
    //reducerName
    reducer: {
        cart: cartReducer
    }
})