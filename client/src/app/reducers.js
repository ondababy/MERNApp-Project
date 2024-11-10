import { apiSlice } from '@app/config';
import { authReducer, cartReducer, orderReducer } from '@features';
import { combineReducers } from '@reduxjs/toolkit';
import loadingReducer from './slices/loading.slice';
import themeReducer from './slices/theme.slice';

const rootReducer = combineReducers({
  loading: loadingReducer,
  theme: themeReducer,
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
