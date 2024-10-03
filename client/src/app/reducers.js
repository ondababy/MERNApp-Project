import { apiSlice } from '@app/config';
import { authReducer } from '@features';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
