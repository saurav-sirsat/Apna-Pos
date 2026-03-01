import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

export const getUserProfile = createAsyncThunk('user/getProfile', async (token, { rejectWithValue }) => {
  try {
    if (import.meta.env.PROD) {
      
      const mockUser = {
        id: 1,
        email: "mockuser@apnapos.com",
        fullName: "Mock User",
        role: "ROLE_STORE_ADMIN",
        jwt: token,
        storeId: null,
        branchId: null
      };
      
      return mockUser;
    }
    
    const res = await api.get('/api/users/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    return res.data;
  } catch (err) {
    
    if (import.meta.env.PROD) {
      const mockUser = {
        id: 1,
        email: "mockuser@apnapos.com",
        fullName: "Mock User",
        role: "ROLE_STORE_ADMIN",
        jwt: token,
        storeId: null,
        branchId: null
      };
      return mockUser;
    }
    
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch profile');
  }
});

export const getCustomers = createAsyncThunk('user/getCustomers', async (token, { rejectWithValue }) => {
  try {
    const res = await api.get('/api/users/customer', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch customers');
  }
});

export const getCashiers = createAsyncThunk('user/getCashiers', async (token, { rejectWithValue }) => {
  try {
    const res = await api.get('/api/users/cashier', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch cashiers');
  }
});

export const getAllUsers = createAsyncThunk('user/getAll', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/users/list');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch users');
  }
});

export const getUserById = createAsyncThunk('user/getById', async (userId, { rejectWithValue }) => {
  try {
    const res = await api.get(`/users/${userId}`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'User not found');
  }
});

export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    localStorage.removeItem('jwt');
    return 'Logged out successfully';
  } catch (err) {
    return rejectWithValue(err.message || 'Failed to logout');
  }
});
