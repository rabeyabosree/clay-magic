import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:9080/api/notifications"

// Fetch notifications for the logged-in user
export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:9080/api/notifications/${userId}`);
      return response.data.notifications;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching notifications");
    }
  }
);

// Mark a notification as read
export const markNotificationAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      await axios.put(`http://localhost:9080/api/notifications/${notificationId}/read`);
      return notificationId; // Return the ID to update state
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error marking as read");
    }
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        state.items = state.items.map((notif) =>
          notif._id === action.payload ? { ...notif, read: true } : notif
        );
      });
  },
});

export default notificationsSlice.reducer;
