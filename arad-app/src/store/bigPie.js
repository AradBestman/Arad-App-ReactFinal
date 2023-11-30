import { configureStore } from "@reduxjs/toolkit";
import darkThemeSlice from "./darkThemeSlice";
import authSlice from "./authSlice";




const store=configureStore({
    reducer:{
        darkThemeSlice,
        authSlice,
        
    },
});

export default store;