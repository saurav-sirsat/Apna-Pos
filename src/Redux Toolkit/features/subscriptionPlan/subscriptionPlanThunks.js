import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

const getAuthToken = () => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    throw new Error("No JWT token found");
  }
  return token;
};

const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const createSubscriptionPlan = createAsyncThunk(
  "subscriptionPlan/create",
  async (plan, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.post("/api/super-admin/subscription-plans", plan, {
        headers,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create subscription plan"
      );
    }
  }
);

export const updateSubscriptionPlan = createAsyncThunk(
  "subscriptionPlan/update",
  async ({ id, plan }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.put(
        `/api/super-admin/subscription-plans/${id}`,
        plan,
        { headers }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update subscription plan"
      );
    }
  }
);

export const getAllSubscriptionPlans = createAsyncThunk(
  "subscriptionPlan/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get("/api/super-admin/subscription-plans", {
        headers,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch subscription plans"
      );
    }
  }
);

export const getSubscriptionPlanById = createAsyncThunk(
  "subscriptionPlan/getById",
  async (id, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get(`/api/super-admin/subscription-plans/${id}`, {
        headers,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch subscription plan"
      );
    }
  }
);

export const deleteSubscriptionPlan = createAsyncThunk(
  "subscriptionPlan/delete",
  async (id, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      await api.delete(`/api/super-admin/subscription-plans/${id}`, {
        headers,
      });
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete subscription plan"
      );
    }
  }
);
