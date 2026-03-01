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

export const createCustomer = createAsyncThunk(
  'customer/create',
  async (customer, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.post('/api/customers', customer, { headers });
      
        customerId: res.data.id,
        name: res.data.name,
        email: res.data.email,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        requestData: customer
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to create customer');
    }
  }
);

export const updateCustomer = createAsyncThunk(
  'customer/update',
  async ({ id, customer }, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.put(`/api/customers/${id}`, customer, { headers });
      
        customerId: res.data.id,
        name: res.data.name,
        email: res.data.email,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        customerId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        requestData: customer
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to update customer');
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  'customer/delete',
  async (id, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      await api.delete(`/api/customers/${id}`, { headers });
      
      
      return id;
    } catch (err) {
        customerId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to delete customer');
    }
  }
);

export const getCustomerById = createAsyncThunk(
  'customer/getById',
  async (id, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/customers/${id}`, { headers });
      
      
      return res.data;
    } catch (err) {
        customerId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Customer not found');
    }
  }
);

export const getAllCustomers = createAsyncThunk(
  'customer/getAll',
  async (_, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get('/api/customers', { headers });
      
        customerCount: res.data.length,
        customers:res.data
      });
      
      return res.data;
    } catch (err) {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch customers');
    }
  }
); 