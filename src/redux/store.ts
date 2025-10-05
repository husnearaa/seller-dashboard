import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./api/baseApi";
import authReducer from "./features/user/authSlice";

// Configure the Redux store
export const store = configureStore({
  reducer: {
    // Auth slice
    auth: authReducer,

    // API slice
    [baseApi.reducerPath]: baseApi.reducer,
  },

  // Middleware configuration
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Disable serialization checks for API responses
      serializableCheck: {
        ignoredActions: [baseApi.util.resetApiState.type],
        ignoredActionsPaths: ["meta.arg", "payload.timestamp"],
        ignoredPaths: [baseApi.reducerPath],
      },
    }).concat(baseApi.middleware),

  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== "production",
});

// Enable listener behavior for refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

// Export store types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Store type for use in other files
export type Store = typeof store;