import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:9080/api/users"

// Register User Thunk
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
)

// loginUser thunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData,
        { withCredentials: true }
      );
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)
// deleteUser thunk
export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await axios.delete(`${API_URL}/delete`, {
        withCredentials: true
      });
      localStorage.removeItem("auth");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete account");
    }
  }
);

// forget-password thunk
export const forgetPassword = createAsyncThunk(
  'user/forgetPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/forget-password`,
        { email }
      );
      return response.data; // Return success message from the backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Reset Password Thunk
export const resetPassword = createAsyncThunk(
  "/user/reset-password",
  async (resetData) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password`, resetData);
      return response.data
    } catch (error) {
      console.error(error.response?.data?.message || "Password reset failed")
    }
  })

// get user profile
export const fetchProfile = createAsyncThunk("auth/fetchProfile", async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error?.message)
  }
});

// update profile data with image
export const updatedUser = createAsyncThunk("auth/updateUser", async ({ userId, formData }) => {
  const response = await axios.put(`${API_URL}/profile/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      withCredentials: true
    },
    withCredentials: true,
  });
  return response.data;
});

// Initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// User Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Logout action
    logout: (state) => {
      state.user = null;
      state.token = null; // Remove the token
      localStorage.removeItem("auth");
    }
  }, extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("auth", JSON.stringify(action.payload))
        state.loading = false;
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(forgetPassword.pending((state) => {
        state.loading = true
      }))
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = action.payload
      })
      .addCase(updatedUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = action.payload
      })

  }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;


/*
// src/redux/reducers/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Register User Thunk
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:9080/api/users/register', 
        userData,
        { withCredentials: true } // Include credentials if necessary
      );
      return response.data; // Return the user data after successful registration
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message); // Error handling
    }
  }
);

// Login User Thunk
export const loginUser = createAsyncThunk(
  'user/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:9080/api/users/login',
        loginData,
        { withCredentials: true }
      );
      return response.data; // Return login data (such as a token or user info)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Forget Password Thunk
export const forgetPassword = createAsyncThunk(
  'user/forgetPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:9080/api/users/forget-password', 
        { email }
      );
      return response.data; // Return success message from the backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Reset Password Thunk
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (resetData, { rejectWithValue }) => {
    try {
      const { token, password } = resetData;
      const response = await axios.post(
        'http://localhost:9080/api/users/reset-password', 
        { token, password }
      );
      return response.data; // Return success message from backend after resetting password
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Logout Thunk
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('http://localhost:9080/api/users/logout', {}, { withCredentials: true });
      return; // Nothing needs to be returned on successful logout
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Initial State
const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

// Create user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null; // Clear user info when logging out
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User Reducers
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login User Reducers
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Forget Password Reducers
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reset Password Reducers
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout User Reducers
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.userInfo = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { logout } = userSlice.actions;

// Export reducer
export default userSlice.reducer;


export const registerUser1 = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const response = await axios.post("http://localhost:9080/api/users/register", userData, {
      withCredentials: true, // Automatically send cookies with requests
    });
    // Check if the response contains the user data
    const { user } = response.data;  // Assuming response contains both 'user' and 'token'
    // Dispatch registerSuccess with user and token
    dispatch(registerSuccess({ user }));
    console.log(user);
    return user;
  } catch (error) {
    dispatch(registerFail(error.response?.data?.message || "Registration failed"));
  }
};

export const loginUser = (loginData) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const response = await axios.post("http://localhost:9080/api/users/login", loginData, {
      withCredentials: true, // Automatically send cookies with requests
    });
    const { user } = response.data;  // Ensure the response contains both user and token
    dispatch(loginSuccess({ user }));  // Store user and token in the state
    return user;
  } catch (error) {
    dispatch(loginFail(error.response?.data?.message || "Login failed"));
  }
};

*/
