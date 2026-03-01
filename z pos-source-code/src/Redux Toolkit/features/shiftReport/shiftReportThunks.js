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

export const startShift = createAsyncThunk(
  'shiftReport/start',
  async (branchId, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.post(`/api/shift-reports/start?branchId=${branchId}`, {}, { headers });
      
        shiftId: res.data.id,
        cashierId: res.data.cashierId,
        branchId: res.data.branchId,
        startTime: res.data.startTime,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        branchId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to start shift');
    }
  }
);

export const endShift = createAsyncThunk(
  'shiftReport/end',
  async (_, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.patch('/api/shift-reports/end', {}, { headers });
      
        shiftId: res.data.id,
        endTime: res.data.endTime,
        totalSales: res.data.totalSales,
        totalOrders: res.data.totalOrders,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to end shift');
    }
  }
);

export const getCurrentShiftProgress = createAsyncThunk(
  'shiftReport/getCurrent',
  async (_, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get('/api/shift-reports/current', { headers });
      
        shiftId: res.data.id,
        startTime: res.data.startTime,
        totalSales: res.data.totalSales,
        totalOrders: res.data.totalOrders,
        response: res.data
      });

      
      return res.data;

    } catch (err) {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data:err
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch current shift progress');
    }
  }
);

export const getShiftReportByDate = createAsyncThunk(
  'shiftReport/getByDate',
  async ({ cashierId, date }, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const formattedDate = encodeURIComponent(date);
      const res = await api.get(`/api/shift-reports/cashier/${cashierId}/by-date?date=${formattedDate}`, { headers });
      
        shiftId: res.data.id,
        cashierId: res.data.cashierId,
        date: res.data.startTime,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        cashierId,
        date,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch shift report by date');
    }
  }
);

export const getShiftsByCashier = createAsyncThunk(
  'shiftReport/getByCashier',
  async (cashierId, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/shift-reports/cashier/${cashierId}`, { headers });
      
        cashierId,
        shiftCount: res.data.length,
        shifts: res.data.map(shift => ({
          id: shift.id,
          startTime: shift.startTime,
          endTime: shift.endTime,
          totalSales: shift.totalSales
        }))
      });
      
      return res.data;
    } catch (err) {
        cashierId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch shifts by cashier');
    }
  }
);

export const getShiftsByBranch = createAsyncThunk(
  'shiftReport/getByBranch',
  async (branchId, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/shift-reports/branch/${branchId}`, { headers });
      
        branchId,
        shiftCount: res.data.length,
        totalSales: res.data.reduce((sum, shift) => sum + (shift.totalSales || 0), 0),
        shifts: res.data.map(shift => ({
          id: shift.id,
          cashierId: shift.cashierId,
          startTime: shift.startTime,
          endTime: shift.endTime,
          totalSales: shift.totalSales
        }))
      });
      
      return res.data;
    } catch (err) {
        branchId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch shifts by branch');
    }
  }
);

export const getAllShifts = createAsyncThunk(
  'shiftReport/getAll',
  async (_, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get('/api/shift-reports', { headers });
      
        shiftCount: res.data.length,
        totalSales: res.data.reduce((sum, shift) => sum + (shift.totalSales || 0), 0),
        shifts: res.data.map(shift => ({
          id: shift.id,
          cashierId: shift.cashierId,
          branchId: shift.branchId,
          startTime: shift.startTime,
          endTime: shift.endTime,
          totalSales: shift.totalSales
        }))
      });
      
      return res.data;
    } catch (err) {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch all shifts');
    }
  }
);

export const getShiftById = createAsyncThunk(
  'shiftReport/getById',
  async (id, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/shift-reports/${id}`, { headers });
      
        shiftId: res.data.id,
        cashierId: res.data.cashierId,
        branchId: res.data.branchId,
        startTime: res.data.startTime,
        endTime: res.data.endTime,
        totalSales: res.data.totalSales,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        shiftId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Shift not found');
    }
  }
);

export const deleteShift = createAsyncThunk(
  'shiftReport/delete',
  async (id, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      await api.delete(`/api/shift-reports/${id}`, { headers });
      
      
      return id;
    } catch (err) {
        shiftId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to delete shift');
    }
  }
); 