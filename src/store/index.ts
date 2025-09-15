import { configureStore } from '@reduxjs/toolkit';
import { superAdminApi } from './api/superAdminApi';

export const store = configureStore({
  reducer: {
    [superAdminApi.reducerPath]: superAdminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(superAdminApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
