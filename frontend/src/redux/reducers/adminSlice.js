// redux/reducers/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:9080/api/admin"

// Thunk for creating a product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}`, // Backend endpoint
        formData,
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
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}`, // Backend endpoint
        formData,
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

// Thunk for geting all users
export const getAllUsers = createAsyncThunk(
  "products/getallusers",
  async ( { rejectWithValue }) => {
    try {
      const response = await axios.get( `${API_URL}/users`);
      return response.data.product; // Return the created product
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Thunk for geting all users
export const getUsersDetails = createAsyncThunk(
  "products/getallusers",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get( `${API_URL}/users/${userId}`);
      return response.data.product; // Return the created product
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Thunk for geting all users
export const getUsersActivitys = createAsyncThunk(
  "products/getallusers",
  async ( userId,{ rejectWithValue }) => {
    try {
      const response = await axios.get( `${API_URL}/users/${userId}`);
      return response.data.product; // Return the created product
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Thunk for geting all users
export const adminRoleChange = createAsyncThunk(
  "products/getallusers",
  async ( role,{ rejectWithValue }) => {
    try {
      const response = await axios.put( `${API_URL}/users/${userId}/role`);
      return response.data.product; // Return the created product
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload); // Add new product to state
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;

