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

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setSelected: (state, action) => {
      const {selectedItem = null} = action.payload;
      if (!selectedItem) return;
      state.items = state.items.map((item) => {
    
        if (item.id === selectedItem.id) {
          return {...item, selected: !selectedItem?.selected};
        }
        return item;
      });

    },
    setItems: (state, action) => {
      state.items = action.payload;
      state.subTotal = calculateSubTotal(state.items);
    },
    setShipping: (state, action) => {
      state.shipping = action.payload;
    },
    setTotal: (state, action) => {
      let {subTotal, shipping, taxTotal} = action.payload;      
      state.total = calculateTotal(subTotal, shipping, taxTotal);
    },
    addItem: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index].quantity += 1;
      } else {
        state.items.push(action.payload);
      }
    state.subTotal = calculateSubTotal(state.items);
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        state.subTotal = calculateSubTotal(state.items);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.subTotal = calculateSubTotal(state.items);
    },
    clearCart: (state) => {
      state = initialState;
    }
  },
});

export const { 
  setItems, 
  addItem, 
  updateItem, 
  removeItem, 
  clearCart,
  setSelected
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
