import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "@/app/lib/features/book/bookSlice"
import loginReducer from '@/app/lib/features/login/loginSlice'
import cartReducer from "@/app/lib/features/cart/cartSlice"
import themeReducer from "@/app/lib/features/theme/themeSlice"

const store = configureStore({
    reducer: {
       book: bookReducer,
       login: loginReducer, 
       cart: cartReducer,
       theme: themeReducer,
    },
    devTools: true,
})       

export default store

    
