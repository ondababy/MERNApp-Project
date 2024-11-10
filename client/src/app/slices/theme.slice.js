import { createSlice } from '@reduxjs/toolkit';

const theme = localStorage.getItem('theme') || 'light';
const initialState = {
  theme: theme,
  sideBarToggle: false,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    toggleSideBar: (state, action) => {
      state.sideBarToggle = !state.sideBarToggle || action.payload;
    }
  }
});


export const { toggleTheme, toggleSideBar } = themeSlice.actions;
export const themeReducer =  themeSlice.reducer;
