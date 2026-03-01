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

export const subscribeToPlan = createAsyncThunk(
  'subscription/subscribe',
  async ({ storeId, planId, gateway = 'RAZORPAY', transactionId }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const params = { storeId, planId, gateway };
      if (transactionId) params.transactionId = transactionId;
      const search = new URLSearchParams(params).toString();
      const res = await api.post(`/api/subscriptions/subscribe?${search}`, {}, { headers });
      if(res.data){
      }
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to subscribe to plan');
    }
  }
);

export const upgradeSubscription = createAsyncThunk(
  'subscription/upgrade',
  async ({ storeId, planId, gateway = 'RAZORPAY', transactionId }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const params = { storeId, planId, gateway };
      if (transactionId) params.transactionId = transactionId;
      const search = new URLSearchParams(params).toString();
      const res = await api.post(`/api/subscriptions/upgrade?${search}`, {}, { headers });
      if(res.data){
      }
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to upgrade subscription');
    }
  }
);

export const activateSubscription = createAsyncThunk(
  'subscription/activate',
  async (subscriptionId, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.put(`/api/subscriptions/${subscriptionId}/activate`, {}, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to activate subscription');
    }
  }
);

export const cancelSubscription = createAsyncThunk(
  'subscription/cancel',
  async (subscriptionId, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.put(`/api/subscriptions/${subscriptionId}/cancel`, {}, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to cancel subscription');
    }
  }
);

export const updatePaymentStatus = createAsyncThunk(
  'subscription/updatePaymentStatus',
  async ({ subscriptionId, status }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.put(`/api/subscriptions/${subscriptionId}/payment-status?status=${status}`, {}, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update payment status');
    }
  }
);

export const getStoreSubscriptions = createAsyncThunk(
  'subscription/getStoreSubscriptions',
  async ({ storeId, status }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      let url = `/api/subscriptions/store/${storeId}`;
      if (status) url += `?status=${status}`;
      const res = await api.get(url, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch store subscriptions');
    }
  }
);

export const getAllSubscriptions = createAsyncThunk(
  'subscription/getAllSubscriptions',
  async (status, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      let url = '/api/subscriptions/admin';
      if (status) url += `?status=${status}`;
      const res = await api.get(url, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch all subscriptions');
    }
  }
);

export const getExpiringSubscriptions = createAsyncThunk(
  'subscription/getExpiringSubscriptions',
  async (days = 7, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get(`/api/subscriptions/admin/expiring?days=${days}`, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch expiring subscriptions');
    }
  }
);

export const countSubscriptionsByStatus = createAsyncThunk(
  'subscription/countByStatus',
  async (status, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get(`/api/subscriptions/admin/count?status=${status}`, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to count subscriptions');
    }
  }
); 