import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

// Define the shape of an order item
interface OrderItem {
  id: string;
  name: string;
  sealprice: number;
  image: string;
  ItemAmount: number;
}

// Define the initial state type
interface OrderState {
  items: OrderItem[];
  customer: { id: string; name: string };
  currentBalance: number; // Add currentBalance to the state
}

// Initial state
const initialState: OrderState = {
  items: [],
  customer: { id: '0', name: 'all' },

  currentBalance: 0, // Initial balance is set to 0
};

// Create the slice
export const orderSlice: Slice<OrderState> = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // Add Item to the table
    addItem: (state, action: PayloadAction<Omit<OrderItem, 'ItemAmount'>>) => {
      const itemindex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemindex >= 0) {
        state.items[itemindex].ItemAmount += 1;
      } else {
        state.items.push({
          ...action.payload,
          ItemAmount: 1,
        });
      }
    },
    // Update the amount of an existing item
    updateItemAmount: (
      state,
      action: PayloadAction<{ id: string; newAmount: number }>
    ) => {
      const { id, newAmount } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);
      if (itemIndex >= 0 && newAmount > 0) {
        state.items[itemIndex].ItemAmount = newAmount; // Set the new amount
      }
    },
    // deleteItem action to remove an item from the order
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    // reset the order to initial state
    resetOrder: (state: OrderState) => {
      state.items = []; // Reset the items to an empty array
    },
    // Set the current balance
    setCurrentBalance: (state, action: PayloadAction<number>) => {
      state.currentBalance = action.payload; // Update the current balance
    },
    // Reset the current balance
    resetCurrentBalance: (state) => {
      state.currentBalance = 0; // Reset the current balance to 0
    },
  },
});

// Export the action
export const {
  addItem,
  updateItemAmount,
  deleteItem,
  resetOrder,
  setCurrentBalance,
  resetCurrentBalance,
} = orderSlice.actions;

// Export the reducer
export default orderSlice.reducer;
