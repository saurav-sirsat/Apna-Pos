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

export const createRefund = createAsyncThunk(
  'refund/create',
  async (refundDTO, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.post('/api/refunds', refundDTO, { headers });
      
        refundId: res.data.id,
        orderId: res.data.orderId,
        amount: res.data.amount,
        reason: res.data.reason,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        requestData: refundDTO
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to create refund');
    }
  }
);

export const getAllRefunds = createAsyncThunk(
  'refund/getAll',
  async (_, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get('/api/refunds', { headers });
      
        refundCount: res.data.length,
        totalAmount: res.data.reduce((sum, refund) => sum + (refund.amount || 0), 0),
        refunds: res.data.map(refund => ({
          id: refund.id,
          orderId: refund.orderId,
          amount: refund.amount,
          reason: refund.reason,
          createdAt: refund.createdAt
        }))
      });
      
      return res.data;
    } catch (err) {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch refunds');
    }
  }
);

export const getRefundsByCashier = createAsyncThunk(
  'refund/getByCashier',
  async (cashierId, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/refunds/cashier/${cashierId}`, { headers });
      
        cashierId,
        refundCount: res.data.length,
        totalAmount: res.data.reduce((sum, refund) => sum + (refund.amount || 0), 0),
        refunds: res.data.map(refund => ({
          id: refund.id,
          orderId: refund.orderId,
          amount: refund.amount,
          reason: refund.reason,
          createdAt: refund.createdAt
        }))
      });
      
      return res.data;
    } catch (err) {
        cashierId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch refunds by cashier');
    }
  }
);

export const getRefundsByBranch = createAsyncThunk(
  'refund/getByBranch',
  async (branchId, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/refunds/branch/${branchId}`, { headers });
      
        branchId,
        refundCount: res.data.length,
        totalAmount: res.data.reduce((sum, refund) => sum + (refund.amount || 0), 0),
        refunds: res.data.map(refund => ({
          id: refund.id,
          orderId: refund.orderId,
          amount: refund.amount,
          reason: refund.reason,
          createdAt: refund.createdAt
        }))
      });
      
      return res.data;
    } catch (err) {
        branchId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch refunds by branch');
    }
  }
);

export const getRefundsByShift = createAsyncThunk(
  'refund/getByShift',
  async (shiftReportId, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/refunds/shift/${shiftReportId}`, { headers });
      
        shiftReportId,
        refundCount: res.data.length,
        totalAmount: res.data.reduce((sum, refund) => sum + (refund.amount || 0), 0),
        refunds: res.data.map(refund => ({
          id: refund.id,
          orderId: refund.orderId,
          amount: refund.amount,
          reason: refund.reason,
          createdAt: refund.createdAt
        }))
      });
      
      return res.data;
    } catch (err) {
        shiftReportId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch refunds by shift');
    }
  }
);

export const getRefundsByCashierAndDateRange = createAsyncThunk(
  'refund/getByCashierAndDateRange',
  async ({ cashierId, from, to }, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const formattedFrom = encodeURIComponent(from);
      const formattedTo = encodeURIComponent(to);
      const res = await api.get(`/api/refunds/cashier/${cashierId}/range?from=${formattedFrom}&to=${formattedTo}`, { headers });
      
        cashierId,
        from,
        to,
        refundCount: res.data.length,
        totalAmount: res.data.reduce((sum, refund) => sum + (refund.amount || 0), 0),
        refunds: res.data.map(refund => ({
          id: refund.id,
          orderId: refund.orderId,
          amount: refund.amount,
          reason: refund.reason,
          createdAt: refund.createdAt
        }))
      });
      
      return res.data;
    } catch (err) {
        cashierId,
        from,
        to,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch refunds by cashier and date range');
    }
  }
);

export const getRefundById = createAsyncThunk(
  'refund/getById',
  async (id, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/refunds/${id}`, { headers });
      
        refundId: res.data.id,
        orderId: res.data.orderId,
        amount: res.data.amount,
        reason: res.data.reason,
        createdAt: res.data.createdAt,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        refundId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Refund not found');
    }
  }
);

export const deleteRefund = createAsyncThunk(
  'refund/delete',
  async (id, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      await api.delete(`/api/refunds/${id}`, { headers });
      
      
      return id;
    } catch (err) {
        refundId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to delete refund');
    }
  }
); 