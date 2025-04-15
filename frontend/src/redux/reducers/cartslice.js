import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.push({ ...action.payload, quantity: 1 });
    },
    removeFromCart(state, action) {
      return state.filter((item) => item._id !== action.payload); 
    },
    updateQuantity(state, action) {
      const { productId, quantity } = action.payload;
      return state.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      );
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;


