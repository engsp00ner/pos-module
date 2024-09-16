import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of an order item
interface OrderItem {
  id: number;
  name: string;
  price: number;
  image: string;
  ItemAmount: number;
}

// Define the initial state type
interface OrderState {
  items: OrderItem[];
}

// Initial state
const initialState: OrderState = {
  items: [],
};

// Create the slice
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<OrderItem, 'ItemAmount'>>) => {
      const itemindex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemindex >= 0) {
        state.items[itemindex].ItemAmount += 1;
      } else {
        state.items.push({ ...action.payload, ItemAmount: 1 });
      }
    },
  },
});

// Export the action
export const { addItem } = orderSlice.actions;

// Export the reducer
export default orderSlice.reducer;
