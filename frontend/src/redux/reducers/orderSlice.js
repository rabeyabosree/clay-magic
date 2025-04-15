import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:9080/api/orders';

// 🚀 FETCH user orders
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      if (response.status === 200 && Array.isArray(response.data)) {
        return response.data;
      } else {
        return rejectWithValue("Unexpected response format");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 🔄 UPDATE order status
export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async (statusData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/status`, statusData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ➕ CREATE a new order
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/create`, orderData); // 🛠️ Make sure this route exists in backend
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    status: 'idle', // 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH ORDERS
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // CREATE ORDER
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload); // Add new order
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.payload;
      })

      // UPDATE ORDER STATUS
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.orders.findIndex(order => order._id === updated._id);
        if (index !== -1) {
          state.orders[index] = updated;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export default orderSlice.reducer;

