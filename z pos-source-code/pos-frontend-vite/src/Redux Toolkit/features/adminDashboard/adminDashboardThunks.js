import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

const getAuthToken = () => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    throw new Error('No JWT token found');
  }
  return token;
};

const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const getDashboardSummary = createAsyncThunk(
  'adminDashboard/getSummary',
  async (_, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get('/api/super-admin/dashboard/summary', { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch dashboard summary');
    }
  }
);

export const getStoreRegistrationStats = createAsyncThunk(
  'adminDashboard/getRegistrationStats',
  async (_, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get('/api/super-admin/dashboard/store-registrations', { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch store registration stats');
    }
  }
);

export const getStoreStatusDistribution = createAsyncThunk(
  'adminDashboard/getStatusDistribution',
  async (_, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get('/api/super-admin/dashboard/store-status-distribution', { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch store status distribution');
    }
  }
);