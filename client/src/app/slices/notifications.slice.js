import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export const { addNotification, clearNotifications } = notificationsSlice.actions;
export const notifReducer = notificationsSlice.reducer;