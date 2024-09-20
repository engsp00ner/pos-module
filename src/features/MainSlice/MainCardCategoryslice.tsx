/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Category {
  type: string;
  displayName: string;
  CategoryImage: string;
}

const initialState = {
  category: {
    type: 'all',
    displayName: 'جميع المنتجات',
    CategoryImage: '/assets/itemImages/Category/AllProducts.svg',
  },
};

export const MainCardCategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category>) => {
      state.category.type = action.payload.type;
      state.category.CategoryImage = action.payload.CategoryImage;
      state.category.displayName = action.payload.displayName;
    },
  },
});

export const { setCategory } = MainCardCategorySlice.actions;
export default MainCardCategorySlice.reducer;
