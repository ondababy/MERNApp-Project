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

const calculateSubTotal = (items) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const calculateTotal = (subTotal, shipping, taxTotal) => {
  return subTotal + shipping.fee + taxTotal;
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action) => {
      return action.payload;
    },
    updateOrder: (state, action) => {
      return action.payload
    },
    setShipping: (state, action) => {
      state.shipping = action.payload;
    },
  },
});

