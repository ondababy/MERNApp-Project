import { apiSlice } from '@app/config';
import { authReducer, cartReducer, orderReducer } from '@features';
import { combineReducers } from '@reduxjs/toolkit';
import { loadingReducer, notifReducer, themeReducer } from './slices';

const rootReducer = combineReducers({
  notifications: notifReducer,
  loading: loadingReducer,
  theme: themeReducer,
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
