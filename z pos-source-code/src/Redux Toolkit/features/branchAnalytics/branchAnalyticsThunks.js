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

export const getDailySalesChart = createAsyncThunk(
  'branchAnalytics/getDailySalesChart',
  async ({ branchId, days = 7 }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get(`/api/branch-analytics/daily-sales?branchId=${branchId}&days=${days}`, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch daily sales chart');
    }
  }
);

export const getTopProductsByQuantity = createAsyncThunk(
  'branchAnalytics/getTopProductsByQuantity',
  async (branchId, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get(`/api/branch-analytics/top-products?branchId=${branchId}`, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch top products');
    }
  }
);

export const getTopCashiersByRevenue = createAsyncThunk(
  'branchAnalytics/getTopCashiersByRevenue',
  async (branchId, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get(`/api/branch-analytics/top-cashiers?branchId=${branchId}`, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch top cashiers');
    }
  }
);

export const getCategoryWiseSalesBreakdown = createAsyncThunk(
  'branchAnalytics/getCategoryWiseSalesBreakdown',
  async ({ branchId, date }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get(`/api/branch-analytics/category-sales?branchId=${branchId}&date=${date}`, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch category-wise sales breakdown');
    }
  }
);

export const getTodayOverview = createAsyncThunk(
  'branchAnalytics/getTodayOverview',
  async (branchId, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get(`/api/branch-analytics/today-overview?branchId=${branchId}`, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch today overview');
    }
  }
);

export const getPaymentBreakdown = createAsyncThunk(
  'branchAnalytics/getPaymentBreakdown',
  async ({ branchId, date }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get(`/api/branch-analytics/payment-breakdown?branchId=${branchId}&date=${date}`, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch payment breakdown');
    }
  }
); 