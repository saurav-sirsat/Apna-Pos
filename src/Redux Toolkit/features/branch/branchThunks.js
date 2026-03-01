import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

export const createBranch = createAsyncThunk('branch/create', async ({ dto, jwt }, { rejectWithValue }) => {
  try {
    const res = await api.post('/api/branches', dto, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Create branch failed');
  }
});

export const getBranchById = createAsyncThunk('branch/getById', async ({ id, jwt }, { rejectWithValue }) => {
  try {
    const res = await api.get(`/api/branches/${id}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Branch not found');
  }
});

export const getAllBranchesByStore = createAsyncThunk('branch/getAllByStore', async ({ storeId, jwt }, { rejectWithValue }) => {
  try {
    const res = await api.get(`/api/branches/store/${storeId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch branches');
  }
});

export const updateBranch = createAsyncThunk('branch/update', async ({ id, dto, jwt }, { rejectWithValue }) => {
  try {
    const res = await api.put(`/api/branches/${id}`, dto, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Update failed');
  }
});

export const deleteBranch = createAsyncThunk('branch/delete', async ({ id, jwt }, { rejectWithValue }) => {
  try {
    await api.delete(`/api/branches/${id}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Delete failed');
  }
});

