import { createSlice } from '@reduxjs/toolkit';

const fcmToken = localStorage.getItem('fcmToken');

const notificationTypes = {
  ERROR: 'error',
  SUCCESS: 'success',
  INFO: 'info',
}

const notifSchema = {
  title: '',
  message: '',
  type: notificationTypes.INFO,
  timestamp: new Date().toISOString(),
}

const initialState = {
  notifications: [],
  token: fcmToken || '',
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('fcmToken', action.payload);
    },
  },
});

export const { addNotification, clearNotifications, setToken } = notificationsSlice.actions;
export const notifReducer = notificationsSlice.reducer;