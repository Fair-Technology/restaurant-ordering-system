import { configureStore } from "@reduxjs/toolkit";
import { superAdminApi } from "./api/superAdminApi";
import { itemApi } from "./api/itemApi";

export const store = configureStore({
  reducer: {
    [superAdminApi.reducerPath]: superAdminApi.reducer,
    [itemApi.reducerPath]: itemApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(superAdminApi.middleware, itemApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
