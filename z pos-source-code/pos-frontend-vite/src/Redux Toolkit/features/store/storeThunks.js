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

export const createStore = createAsyncThunk(
  "store/create",
  async (storeData, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.post("/api/stores", storeData, { headers });
      
        storeId: res.data.id,
        brand: res.data.brand,
        storeType: res.data.storeType,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        requestData: storeData
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to create store"
      );
    }
  }
);

export const getStoreById = createAsyncThunk(
  "store/getById",
  async (id, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/stores/${id}`, { headers });
      
        storeId: res.data.id,
        brand: res.data.brand,
        storeType: res.data.storeType,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        storeId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Store not found"
      );
    }
  }
);

export const getAllStores = createAsyncThunk(
  "store/getAll",
  async (status, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get("/api/stores", { headers,
        params: status ? { status } : undefined,
       });
      
        storeCount: res.data.length,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch stores"
      );
    }
  }
);

export const updateStore = createAsyncThunk(
  "store/update",
  async ({ id, storeData }, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.put(`/api/stores/${id}`, storeData, { headers });
      
        storeId: res.data.id,
        brand: res.data.brand,
        storeType: res.data.storeType,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        storeId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        requestData: storeData
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to update store"
      );
    }
  }
);

export const deleteStore = createAsyncThunk(
  "store/delete",
  async (_, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.delete("/api/stores", { headers });
      
      
      return res.data;
    } catch (err) {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete store"
      );
    }
  }
);

export const getStoreByAdmin = createAsyncThunk(
  "store/getByAdmin",
  async (_, { rejectWithValue }) => {
    try {
      
      if (import.meta.env.PROD) {
        
        const mockStore = {
          id: 1,
          brand: "Apna POS Demo Store",
          name: "Main Store",
          email: "store@apnapos.com",
          phone: "+1 234 567 8900",
          address: "123 Demo Street, Demo City, DC 12345",
          storeType: "RETAIL",
          status: "ACTIVE",
          description: "Demo store for Apna POS system",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        return mockStore;
      }
      
      const headers = getAuthHeaders();
      const res = await api.get("/api/stores/admin", { headers });
      
        storeId: res.data.id,
        brand: res.data.brand,
        storeType: res.data.storeType,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      if (import.meta.env.PROD) {
        const mockStore = {
          id: 1,
          brand: "Apna POS Demo Store",
          name: "Main Store",
          email: "store@apnapos.com",
          phone: "+1 234 567 8900",
          address: "123 Demo Street, Demo City, DC 12345",
          storeType: "RETAIL",
          status: "ACTIVE",
          description: "Demo store for Apna POS system",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        return mockStore;
      }
      
      return rejectWithValue(
        err.response?.data?.message || "Not authorized"
      );
    }
  }
);

export const getStoreByEmployee = createAsyncThunk(
  "store/getByEmployee",
  async (_, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get("/api/stores/employee", { headers });
      
        storeId: res.data.id,
        brand: res.data.brand,
        storeType: res.data.storeType,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Not authorized"
      );
    }
  }
);

export const getStoreEmployees = createAsyncThunk(
  "store/getEmployees",
  async (storeId, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/stores/${storeId}/employee/list`, { headers });
      
        storeId,
        employeeCount: res.data.length,
        employees: res.data.map(employee => ({
          id: employee.id,
          name: employee.name,
          role: employee.role
        }))
      });
      
      return res.data;
    } catch (err) {
        storeId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to get employees"
      );
    }
  }
);

export const addEmployee = createAsyncThunk(
  "store/addEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.post("/api/stores/add/employee", employeeData, { headers });
      
        employeeId: res.data.id,
        name: res.data.name,
        role: res.data.role,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        requestData: employeeData
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to add employee"
      );
    }
  }
);

export const moderateStore = createAsyncThunk(
  "store/moderateStore",
  async ({ storeId, action }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.put(`/api/stores/${storeId}/moderate`, null, {
        headers,
        params: { action },
      });
        storeId: res.data.id,
        status: res.data.status,
        response: res.data
      });
      return res.data;
    } catch (err) {
        storeId,
        action,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      return rejectWithValue(
        err.response?.data?.message || 'Failed to moderate store'
      );
    }
  }
);
