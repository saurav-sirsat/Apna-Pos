import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";
import { mockSignup, mockLogin } from "../../../utils/mockAuth";

// Signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      // Check if we're in production and use mock API
      if (import.meta.env.PROD) {
        console.log("Using mock signup for production");
        const responseData = await mockSignup(userData);
        if (responseData.data && responseData.data.jwt) {
          localStorage.setItem("jwt", responseData.data.jwt);
          console.log("Mock JWT token saved:", responseData.data.jwt);
        }
        return responseData.data;
      }
      
      // Use real API for development
      const res = await api.post("/auth/signup", userData);
      console.log("Signup response:", res.data);
      
      // Handle the nested response structure
      const responseData = res.data.data;
      if (responseData && responseData.jwt) {
        localStorage.setItem("jwt", responseData.jwt);
        console.log("JWT token saved:", responseData.jwt);
      }
      
      return responseData;
    } catch (err) {
      console.error("Signup error:", err);
      
      // If real API fails in production, fallback to mock
      if (import.meta.env.PROD) {
        console.log("Falling back to mock signup");
        const responseData = await mockSignup(userData);
        if (responseData.data && responseData.data.jwt) {
          localStorage.setItem("jwt", responseData.data.jwt);
        }
        return responseData.data;
      }
      
      // Extract more specific error message
      let errorMessage = "Signup failed";
      
      if (err.response) {
        // Server responded with error status
        if (err.response.status === 400) {
          errorMessage = "Invalid input data. Please check your information";
        } else if (err.response.status === 409) {
          errorMessage = "Email already exists";
        } else if (err.response.status >= 500) {
          errorMessage = "Server error. Please try again later";
        } else {
          errorMessage = err.response.data?.message || "Signup failed";
        }
      } else if (err.request) {
        // Network error
        errorMessage = "Network error. Please check your connection";
      } else {
        // Other error
        errorMessage = err.message || "Signup failed";
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue, dispatch }) => {
    console.log("Credentials:", credentials);
    try {
      // Check if we're in production and use mock API
      if (import.meta.env.PROD) {
        console.log("Using mock login for production");
        const responseData = await mockLogin(credentials);
        if (responseData.data && responseData.data.jwt) {
          localStorage.setItem("jwt", responseData.data.jwt);
          console.log("Mock JWT token saved:", responseData.data.jwt);
          
          // Store user profile in Redux immediately
          dispatch({
            type: 'user/getProfile/fulfilled',
            payload: responseData.data.user
          });
        }
        return responseData.data;
      }
      
      // Use real API for development
      const res = await api.post("/auth/login", credentials);
      const data = res.data;
      console.log("Login success:", data);
      
      // Handle the nested response structure
      const responseData = data.data;
      if (responseData && responseData.jwt) {
        localStorage.setItem("jwt", responseData.jwt);
        console.log("Login JWT token saved:", responseData.jwt);
        
        // Store user profile in Redux immediately
        dispatch({
          type: 'user/getProfile/fulfilled',
          payload: responseData.user
        });
      }

      // Return data in format frontend expects
      return responseData;
    } catch (err) {
      console.error("Login error:", err);
      
      // If real API fails in production, fallback to mock
      if (import.meta.env.PROD) {
        console.log("Falling back to mock login");
        const responseData = await mockLogin(credentials);
        if (responseData.data && responseData.data.jwt) {
          localStorage.setItem("jwt", responseData.data.jwt);
          
          // Store user profile in Redux immediately
          dispatch({
            type: 'user/getProfile/fulfilled',
            payload: responseData.data.user
          });
        }
        return responseData.data;
      }
      
      // Extract more specific error message
      let errorMessage = "Login failed";
      
      if (err.response) {
        // Server responded with error status
        if (err.response.status === 401) {
          errorMessage = "Invalid email or password";
        } else if (err.response.status === 403) {
          errorMessage = "Account is disabled or blocked";
        } else if (err.response.status === 404) {
          errorMessage = "User not found";
        } else if (err.response.status >= 500) {
          errorMessage = "Server error. Please try again later";
        } else {
          errorMessage = err.response.data?.message || "Login failed";
        }
      } else if (err.request) {
        // Network error
        errorMessage = "Network error. Please check your connection";
      } else {
        // Other error
        errorMessage = err.message || "Login failed";
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/forgot-password", { email });
      console.log("Forgot password success:", res.data);
      return res.data;
    } catch (err) {
      console.error("Forgot password error:", err);
      return rejectWithValue(err.response?.data?.message || "Failed to send reset email");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/reset-password", { token, password });
      console.log("Reset password success:", res.data);
      return res.data;
    } catch (err) {
      console.error("Reset password error:", err);
      return rejectWithValue(err.response?.data?.message || "Failed to reset password");
    }
  }
);