"use client";

import { configureStore } from "@reduxjs/toolkit";
import storageReducer from "./slices/storageSlice";

// export const store = configureStore({
//   reducer: {
//     storage: storageReducer,
//   },
// });

export const store = configureStore({
  reducer: {
    storage: storageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
