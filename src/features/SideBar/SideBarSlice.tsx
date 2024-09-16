import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isActive: false,
  isMouseEntered: false,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleActive: (state) => {
      state.isActive = !state.isActive;
    },
    toggleMouseEntered: (state) => {
      if (state.isActive) state.isMouseEntered = true;
    },
    toggleMouseExit: (state) => {
      state.isMouseEntered = false;
    },
  },
});

export const { toggleActive, toggleMouseEntered, toggleMouseExit } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
