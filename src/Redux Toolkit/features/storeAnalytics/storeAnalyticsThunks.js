import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

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

export const getStoreOverview = createAsyncThunk(
  "storeAnalytics/getStoreOverview",
  async (storeAdminId, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/store/analytics/${storeAdminId}/overview`, { headers });
      
        storeAdminId,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        storeAdminId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch store overview"
      );
    }
  }
);

export const getSalesTrends = createAsyncThunk(
  "storeAnalytics/getSalesTrends",
  async ({ storeAdminId, period }, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/store/analytics/${storeAdminId}/sales-trends?period=${period}`, { headers });
      
        storeAdminId,
        period,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        storeAdminId,
        period,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch sales trends"
      );
    }
  }
);

export const getMonthlySales = createAsyncThunk(
  "storeAnalytics/getMonthlySales",
  async (storeAdminId, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/store/analytics/${storeAdminId}/sales/monthly`, { headers });
      
        storeAdminId,
        dataPoints: res.data.length,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        storeAdminId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch monthly sales"
      );
    }
  }
);

export const getDailySales = createAsyncThunk(
  "storeAnalytics/getDailySales",
  async (storeAdminId, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/store/analytics/${storeAdminId}/sales/daily`, { headers });
      
        storeAdminId,
        dataPoints: res.data.length,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        storeAdminId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch daily sales"
      );
    }
  }
);

export const getSalesByCategory = createAsyncThunk(
  "storeAnalytics/getSalesByCategory",
  async (storeAdminId, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/store/analytics/${storeAdminId}/sales/category`, { headers });
      
        storeAdminId,
        categories: res.data.length,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        storeAdminId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch sales by category"
      );
    }
  }
);

export const getSalesByPaymentMethod = createAsyncThunk(
  "storeAnalytics/getSalesByPaymentMethod",
  async (storeAdminId, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/store/analytics/${storeAdminId}/sales/payment-method`, { headers });
      
        storeAdminId,
        paymentMethods: res.data.length,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        storeAdminId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch sales by payment method"
      );
    }
  }
);

export const getSalesByBranch = createAsyncThunk(
  "storeAnalytics/getSalesByBranch",
  async (storeAdminId, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/store/analytics/${storeAdminId}/sales/branch`, { headers });
      
        storeAdminId,
        branches: res.data.length,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        storeAdminId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch sales by branch"
      );
    }
  }
);

export const getPaymentBreakdown = createAsyncThunk(
  "storeAnalytics/getPaymentBreakdown",
  async (storeAdminId, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/store/analytics/${storeAdminId}/payments`, { headers });
      
        storeAdminId,
        paymentTypes: res.data.length,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        storeAdminId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch payment breakdown"
      );
    }
  }
);

export const getBranchPerformance = createAsyncThunk(
  "storeAnalytics/getBranchPerformance",
  async (storeAdminId, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/store/analytics/${storeAdminId}/branch-performance`, { headers });
      
        storeAdminId,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        storeAdminId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch branch performance"
      );
    }
  }
);

export const getStoreAlerts = createAsyncThunk(
  "storeAnalytics/getStoreAlerts",
  async (storeAdminId, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/store/analytics/${storeAdminId}/alerts`, { headers });
      
        storeAdminId,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        storeAdminId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch store alerts"
      );
    }
  }
); 