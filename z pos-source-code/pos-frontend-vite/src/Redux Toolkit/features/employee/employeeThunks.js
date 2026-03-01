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

export const createStoreEmployee = createAsyncThunk(
  "employee/createStoreEmployee",
  async ({ employee, storeId, token }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/api/employees/store/${storeId}`, employee, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
        "createStoreEmployee rejected:",
        err.response?.data?.message || "Failed to create store employee"
      );
      return rejectWithValue(
        err.response?.data?.message || "Failed to create store employee"
      );
    }
  }
);

export const createBranchEmployee = createAsyncThunk(
  "employee/createBranchEmployee",
  async ({ employee, branchId, token }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/api/employees/branch/${branchId}`, employee, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
        "createBranchEmployee rejected:",
        err.response?.data?.message || "Failed to create branch employee"
      );
      return rejectWithValue(
        err.response?.data?.message || "Failed to create branch employee"
      );
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async ({ employeeId, employeeDetails, token }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/api/employees/${employeeId}`, employeeDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
        "updateEmployee rejected:",
        err.response?.data?.message || "Failed to update employee"
      );
      return rejectWithValue(
        err.response?.data?.message || "Failed to update employee"
      );
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async ({ employeeId, token }, { rejectWithValue }) => {
    try {
      await api.delete(`/api/employees/${employeeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return employeeId;
    } catch (err) {
        "deleteEmployee rejected:",
        err.response?.data?.message || "Failed to delete employee"
      );
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete employee"
      );
    }
  }
);

export const findEmployeeById = createAsyncThunk(
  "employee/findEmployeeById",
  async ({ employeeId, token }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/employees/${employeeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
        "findEmployeeById rejected:",
        err.response?.data?.message || "Employee not found"
      );
      return rejectWithValue(
        err.response?.data?.message || "Employee not found"
      );
    }
  }
);

export const findStoreEmployees = createAsyncThunk(
  "employee/findStoreEmployees",
  async ({ storeId, token }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/employees/store/${storeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
        "findStoreEmployees rejected:",
        err.response?.data?.message || "Failed to fetch store employees"
      );
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch store employees"
      );
    }
  }
);

export const findBranchEmployees = createAsyncThunk(
  "employee/findBranchEmployees",
  async ({ branchId, role }, { rejectWithValue }) => {
    const params = [];
    if(role) params.push(`role=${role}`);
    const query = params.length ? `?${params.join('&')}` : '';

    try {
      const headers=getAuthHeaders();
      const res = await api.get(`/api/employees/branch/${branchId}${query}`, {headers},
      );
      return res.data;
    } catch (err) {
        "findBranchEmployees rejected:",
        err.response?.data?.message || "Failed to fetch branch employees"
      );
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch branch employees"
      );
    }
  }
);