import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './features/SideBar/SideBarSlice';
import authReducer from './features/Auth/authSlice';
import FullScreenReducer from './features/MainSlice/fullScreenSlice';
import orderReducer from './features/orders/orderSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    auth: authReducer,
    fullScreen: FullScreenReducer,
    order: orderReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
