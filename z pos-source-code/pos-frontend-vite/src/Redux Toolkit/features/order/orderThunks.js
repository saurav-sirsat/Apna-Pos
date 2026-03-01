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

export const createOrder = createAsyncThunk(
  'order/create',
  async (dto, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.post('/api/orders', dto, { headers });
      
        orderId: res.data.id,
        totalAmount: res.data.totalAmount,
        customer: res.data.customer,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        requestData: dto
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to create order');
    }
  }
);

export const getOrderById = createAsyncThunk(
  'order/getById',
  async (id, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/orders/${id}`, { headers });
      
        orderId: res.data.id,
        totalAmount: res.data.totalAmount,
        customer: res.data.customer,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        orderId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Order not found');
    }
  }
);

export const getOrdersByBranch = createAsyncThunk(
  'order/getByBranch',
  async ({ branchId, customerId, cashierId, paymentType, status }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const params = [];
      if (customerId) params.push(`customerId=${customerId}`);
      if (cashierId) params.push(`cashierId=${cashierId}`);
      if (paymentType) params.push(`paymentType=${paymentType}`);
      if (status) params.push(`status=${status}`);
      const query = params.length ? `?${params.join('&')}` : '';
      const res = await api.get(`/api/orders/branch/${branchId}${query}`, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

export const getOrdersByCashier = createAsyncThunk(
  'order/getByCashier',
  async (cashierId, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/orders/cashier/${cashierId}`, { headers });
      
        cashierId,
        orderCount: res.data.length,
        orders: res.data.map(order => ({
          id: order.id,
          totalAmount: order.totalAmount,
          customer: order.customer,
          createdAt: order.createdAt
        }))
      });
      
      return res.data;
    } catch (err) {
        cashierId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

export const getTodayOrdersByBranch = createAsyncThunk(
  'order/getTodayByBranch',
  async (branchId, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/orders/today/branch/${branchId}`, { headers });
      
        branchId,
        orderCount: res.data.length,
        totalSales: res.data.reduce((sum, order) => sum + order.totalAmount, 0),
        orders: res.data.map(order => ({
          id: order.id,
          totalAmount: order.totalAmount,
          customer: order.customer,
          createdAt: order.createdAt
        }))
      });
      
      return res.data;
    } catch (err) {
        branchId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch today\'s orders');
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'order/delete',
  async (id, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      await api.delete(`/api/orders/${id}`, { headers });
      
      
      return id;
    } catch (err) {
        orderId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to delete order');
    }
  }
);

export const getOrdersByCustomer = createAsyncThunk(
  'order/getByCustomer',
  async (customerId, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/orders/customer/${customerId}`, { headers });
      
        customerId,
        orderCount: res.data.length,
        totalSpent: res.data.reduce((sum, order) => sum + order.totalAmount, 0),
        orders: res.data.map(order => ({
          id: order.id,
          totalAmount: order.totalAmount,
          customer: order.customer,
          createdAt: order.createdAt,
          paymentMethod: order.paymentMethod,
          status: order.status,
          items: order.items
        }))
      });
      
      return res.data;
    } catch (err) {
        customerId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch customer orders');
    }
  }
);

export const getRecentOrdersByBranch = createAsyncThunk(
  'order/getRecentByBranch',
  async (branchId, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get(`/api/orders/recent/${branchId}`, { headers });
        branchId,
        orderCount: res.data.length,
        orders: res.data
      });
      return res.data;
    } catch (err) {
        branchId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch recent orders');
    }
  }
);
