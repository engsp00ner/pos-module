import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './features/SideBar/SideBarSlice';
import authReducer from './features/Auth/authSlice';
import fullScreenReducer from './features/MainSlice/fullScreenSlice';
import orderReducer from './features/orders/orderSlice';
import mainCardCategoryReducer from './features/MainSlice/MainCardCategoryslice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    auth: authReducer,
    fullScreen: fullScreenReducer,
    order: orderReducer,
    mainCardCategory: mainCardCategoryReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
