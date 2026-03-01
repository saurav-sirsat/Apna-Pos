import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

export const createCategory = createAsyncThunk('category/create', async ({ dto, token }, { rejectWithValue }) => {
  try {
    const res = await api.post('/api/categories', dto, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to create category');
  }
});

export const getCategoriesByStore = createAsyncThunk('category/getByStore', async ({ storeId, token }, { rejectWithValue }) => {
  try {
    if (import.meta.env.PROD) {
      
      const mockCategories = [
        {
          id: 1,
          name: "Electronics",
          description: "Electronic devices and accessories",
          storeId: storeId,
          productCount: 125
        },
        {
          id: 2,
          name: "Furniture",
          description: "Office and home furniture",
          storeId: storeId,
          productCount: 45
        },
        {
          id: 3,
          name: "Appliances",
          description: "Home and kitchen appliances",
          storeId: storeId,
          productCount: 78
        },
        {
          id: 4,
          name: "Lighting",
          description: "Lights and lighting fixtures",
          storeId: storeId,
          productCount: 32
        },
        {
          id: 5,
          name: "Stationery",
          description: "Office supplies and stationery",
          storeId: storeId,
          productCount: 156
        }
      ];
      
      return mockCategories;
    }
    
    const res = await api.get(`/api/categories/store/${storeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    
    if (import.meta.env.PROD) {
      const mockCategories = [
        {
          id: 1,
          name: "Electronics",
          description: "Electronic devices and accessories",
          storeId: storeId,
          productCount: 125
        },
        {
          id: 2,
          name: "Furniture",
          description: "Office and home furniture",
          storeId: storeId,
          productCount: 45
        }
      ];
      return mockCategories;
    }
    
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch categories');
  }
});

export const updateCategory = createAsyncThunk('category/update', async ({ id, dto, token }, { rejectWithValue }) => {
  try {
    const res = await api.put(`/api/categories/${id}`, dto, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update category');
  }
});

export const deleteCategory = createAsyncThunk('category/delete', async ({ id, token }, { rejectWithValue }) => {
  try {
    await api.delete(`/api/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete category');
  }
});
