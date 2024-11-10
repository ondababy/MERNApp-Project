import { createSlice } from '@reduxjs/toolkit';
const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false,
    activeRequests: 0,
  },
  reducers: {
    startLoading: (state) => {
      state.activeRequests++;
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.activeRequests--;
      if (state.activeRequests === 0) {
        state.isLoading = false;
      }
    },
  },
});

export const { startLoading, stopLoading } = loadingSlice.actions;
const loadingReducer = loadingSlice.reducer;
export default loadingReducer;