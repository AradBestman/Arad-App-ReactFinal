// darkThemeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialTheme = localStorage.getItem("theme") === "dark" ? "dark" : "light";

const initialState = {
  isDarkTheme: initialTheme === "dark",
};

const darkThemeSlice = createSlice({
  name: "light",
  initialState,
  reducers: {
    changeTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
      // Save the updated theme preference to localStorage
      localStorage.setItem("theme", state.isDarkTheme ? "dark" : "light");
    },
  },
});

export const darkThemeActions = darkThemeSlice.actions;

export default darkThemeSlice.reducer;
