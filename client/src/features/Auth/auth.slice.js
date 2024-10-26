import { createSlice } from '@reduxjs/toolkit';

const userInfo = window.localStorage.getItem('userInfo');
const accessToken = window.localStorage.getItem('accessToken');
const initialState = {
  userInfo: userInfo ? JSON.parse(userInfo) : null,
  accessToken: accessToken || null,
  role: null,
  isChanging: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsChanging: (state, action) => {
      state.isChanging = action.payload.isChanging;
    },
    setCredentials: (state, action) => {
      const { userInfo, token } = action.payload;
      const {role, ...info} = userInfo
      state.userInfo = info;
      state.accessToken = token;
      state.role = role;
      localStorage.setItem('userInfo', JSON.stringify(info));
      localStorage.setItem('accessToken', token);
    },
    logout: (state) => {
      state.userInfo = null;
      state.accessToken = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('accessToken');
    },
  },
});

export const { setCredentials, logout, setIsChanging } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.userInfo;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectIsAuthenticated = (state) => !!state.auth.userInfo;
