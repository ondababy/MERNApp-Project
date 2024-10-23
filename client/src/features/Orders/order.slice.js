import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  subTotal: 0,
  total: 0,
  shipping: {
    fee: 0,
    method: 'Standard',
  },
  taxTotal: 0,
  currency: 'PHP',
};
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action) => {
      return action.payload;
    },
    clearOrder: (state) => {
      return initialState;
    },
    updateOrder: (state, action) => {
      return action.payload
    }
  },
});

