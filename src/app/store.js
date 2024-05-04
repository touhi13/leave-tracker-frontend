import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from '../features/api/apiSlice';
import authSliceReducer from '../features/auth/authSlice';
import redirectOnUnauthorized from "../features/middlewares/redirectOnUnauthorized";
import cacheKeySliceReducer from "../features/cacheKey/cacheKeySlice";
import { rtkQueryErrorLogger } from "../features/middlewares/rtkQueryErrorLogger";


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
        cacheKey: cacheKeySliceReducer,
    },
    // devTools: process.env.NODE_ENV !== "production",
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware).concat(rtkQueryErrorLogger).concat(redirectOnUnauthorized),
});
