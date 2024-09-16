/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFullscreen: false,
};

export const fullScreenSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleFullscreen: (state) => {
      state.isFullscreen = !state.isFullscreen;
    },
  },
});

export const { toggleFullscreen } = fullScreenSlice.actions;
export default fullScreenSlice.reducer;
