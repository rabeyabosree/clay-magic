// redux/reducers/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:9080/api/activities"

// Thunk for creating a product
export const createActivity = createAsyncThunk(
  "products/createProduct",
  async (activitysData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}`, // Backend endpoint
        activitysData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.product; // Return the created product
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Thunk for geting all products
export const getAllProducts = createAsyncThunk(
  "products/createProduct",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}`, // Backend endpoint
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.product; // Return the created product
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);



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