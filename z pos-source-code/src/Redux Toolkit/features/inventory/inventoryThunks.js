import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

export const createInventory = createAsyncThunk(
  'inventory/create',
  async (dto, { rejectWithValue }) => {
    const token = localStorage.getItem('jwt');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await api.post('/api/inventories', dto, config);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create inventory');
    }
  }
);

export const updateInventory = createAsyncThunk(
  'inventory/update',
  async ({ id, dto }, { rejectWithValue }) => {
    const token = localStorage.getItem('jwt');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await api.put(`/api/inventories/${id}`, dto, config);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update inventory');
    }
  }
);

export const deleteInventory = createAsyncThunk(
  'inventory/delete',
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem('jwt');
     const config = {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     };
    try {
      await api.delete(`/api/inventories/${id}`, config);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete inventory');
    }
  }
);

export const getInventoryById = createAsyncThunk(
  'inventory/getById',
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem('jwt');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await api.get(`/api/inventories/${id}`, config);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Inventory not found');
    }
  }
);

export const getInventoryByBranch = createAsyncThunk(
  'inventory/getByBranch',
  async (branchId, { rejectWithValue }) => {
    const token = localStorage.getItem('jwt');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await api.get(`/api/inventories/branch/${branchId}`, config);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch branch inventory');
    }
  }
);

export const getInventoryByProduct = createAsyncThunk(
  'inventory/getByProduct',
  async (productId, { rejectWithValue }) => {
    const token = localStorage.getItem('jwt');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await api.get(`/api/inventories/product/${productId}`, config);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch product inventory');
    }
  }
);
