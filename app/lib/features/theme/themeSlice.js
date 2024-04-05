import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false, // False means light mode is the default theme.
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // A reducer to toggle dark mode. It inverses the current boolean value of darkMode.       
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;    

export default themeSlice.reducer;
