import { createSlice } from '@reduxjs/toolkit';

// hard coded shipping methods
const shippingMethods = {
  std: { fee: 100, method: 'Standard' },
  exp: { fee: 200, method: 'Express' },
  smd: { fee: 300, method: 'Same Day' }
}

const paymentMethods = {
  cod: { method: 'Cash on Delivery' },
  card: { 
    method: 'Credit Card',
    data: null
   },
  paypal: { 
    method: 'Paypal', 
    data: null 
  },
  gcash: { 
    method: 'GCash', 
    data: null 
  },
}

const initialState = {
  items: [],
  subTotal: 0,
  total: 0,
  shipping: shippingMethods.std,
  taxTotal: 0,
  currency: 'PHP',
  payment:  paymentMethods.cod,
  completed: false,
};

// const calculateTaxTotal = (subTotal) => {
  // think it through
// }

const calculateSubTotal = (items = []) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const calculateTotal = (subTotal = 0, shipping = 0, taxTotal = 0) => {
  return subTotal + shipping?.fee||0 + taxTotal;
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.items = action.payload;
      state.subTotal = calculateSubTotal(action.payload);
      state.total = calculateTotal(state.subTotal, state.shipping, state.taxTotal);
    },
    setShipping: (state, action) => {
      state.shipping = action.payload;
      state.total = calculateTotal(state.subTotal, state.shipping, state.taxTotal);
    },
    getShippingMethods: (state) => {
      return shippingMethods;
    },
    setCompleted: (state, action) => {
      state.completed = action.payload
    }

  },
});

export const { 
  setOrder,
  setShipping,
  getShippingMethods,
  setCompleted,

   } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;



