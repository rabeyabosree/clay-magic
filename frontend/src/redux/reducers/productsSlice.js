import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:9080/api/products';

// fetch all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (productsData, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, productsData);
      return response.data
    } catch (err) {
      // Improved error logging
      console.error('Fetch Error:', err.response?.data || err.message);
      // Return specific error message if available
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch products');
    }
  }
);

// Fetch single product
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch product details");
    }
  }
);

// Add review
export const addReview = createAsyncThunk(
  "products/addReview",
  async ({ id, user, comment, rating }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/${id}/review`, {
        user,
        comment,
        rating
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to add review");
    }
  }
);

export const updateReview = createAsyncThunk(
  'products/updateReview',
  async ({ productId, reviewId, comment, rating }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${productId}/review/${reviewId}`, {
        comment,
        rating
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update review');
    }
  }
);

export const deleteReview = createAsyncThunk(
  'products/deleteReview',
  async ({ id, reviewId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}/review/${reviewId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete review');
    }
  }
);

// Track product view
export const trackView = createAsyncThunk(
  'products/trackView',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/${id}/view`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to track view');
    }
  }
);

export const toggleLove = createAsyncThunk(
  "products/toggleLove",
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/${id}/love`, { userId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to toggle love");
    }
  }
);

// Async thunk for updating share count
export const addShare = createAsyncThunk("products/addShare", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/${id}/share`);
    return response.data; // Return the updated product data with share count
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to update share count");
  }
});

// View Count
export const addView = createAsyncThunk("products/addView", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/${id}/view`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to update view count");
  }
});

// Product Slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    selectedProduct: null,  // Store single product for UI updates
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; 
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p._id === action.payload.product._id);
        if (index !== -1) {
          state.items[index].reviews = action.payload.product.reviews;
        }
      })
      .addCase(trackView.fulfilled, (state, action) => {
        const updatedProduct = action.payload.product;
        const index = state.items.findIndex((item) => item._id === updatedProduct._id);
        if (index !== -1) state.items[index] = updatedProduct;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        const product = state.items.find((p) => p._id === action.payload.product._id);
        if (product) {
          product.reviews = action.payload.product.reviews; // Update the reviews array
        }
      })
    .addCase(toggleLove.fulfilled, (state, action) => {
      const product = state.items.find((p) => p._id === action.payload._id);
      if (product) {
        product.loveCount = action.payload.loveCount;
        product.lovedUsers = action.payload.lovedUsers; // Update loved users list
      }
    })
      .addCase(addShare.fulfilled, (state, action) => {
        const updatedProduct = action.payload; // Updated product data
        const index = state.items.findIndex(item => item._id === updatedProduct._id);
        if (index !== -1) {
          state.items[index] = updatedProduct; // Update the product in the state
        }
        state.loading = false;
      })
      .addCase(addView.fulfilled, (state, action) => {
        const product = state.items.find((p) => p._id === action.payload._id);
        if (product) product.viewCount = action.payload.viewCount;
      });
  },
});

export default productsSlice.reducer;
