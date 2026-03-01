import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

export const createTransaction = createAsyncThunk('transaction/create', async ({ transactionData, token }, { rejectWithValue }) => {
  try {
    const res = await api.post('/api/transactions', transactionData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to create transaction');
  }
});

export const getTransactionById = createAsyncThunk('transaction/getById', async ({ transactionId, token }, { rejectWithValue }) => {
  try {
    const res = await api.get(`/api/transactions/${transactionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to get transaction');
  }
});

export const getAllTransactions = createAsyncThunk('transaction/getAll', async ({ storeId, token }, { rejectWithValue }) => {
  try {
    const res = await api.get(`/api/transactions?storeId=${storeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to get transactions');
  }
});

export const getTransactionsByDateRange = createAsyncThunk('transaction/getByDateRange', async ({ storeId, startDate, endDate, token }, { rejectWithValue }) => {
  try {
    const res = await api.get(`/api/transactions/date-range?storeId=${storeId}&startDate=${startDate}&endDate=${endDate}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to get transactions by date range');
  }
});

export const getTransactionsByType = createAsyncThunk('transaction/getByType', async ({ storeId, type, token }, { rejectWithValue }) => {
  try {
    const res = await api.get(`/api/transactions/type?storeId=${storeId}&type=${type}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to get transactions by type');
  }
});

export const getTransactionsByPaymentMethod = createAsyncThunk('transaction/getByPaymentMethod', async ({ storeId, paymentMethod, token }, { rejectWithValue }) => {
  try {
    const res = await api.get(`/api/transactions/payment-method?storeId=${storeId}&method=${paymentMethod}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to get transactions by payment method');
  }
});