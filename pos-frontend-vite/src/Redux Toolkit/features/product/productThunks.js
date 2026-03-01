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

export const createProduct = createAsyncThunk(
  "product/create",
  async (dto, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.post("/api/products", dto, { headers });
      
      
      return res.data;
    } catch (err) {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        requestData: dto
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to create product"
      );
    }
  }
);

export const getProductById = createAsyncThunk(
  "product/getById",
  async (id, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/products/${id}`, { headers });
      
        productId: res.data.id,
        name: res.data.name,
        price: res.data.price,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        productId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Product not found"
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, dto }, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.patch(`/api/products/${id}`, dto, { headers });
      
        productId: res.data.id,
        name: res.data.name,
        price: res.data.price,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
        productId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        requestData: dto
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to update product"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      await api.delete(`/api/products/${id}`, { headers });
      
      
      return id;
    } catch (err) {
        productId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

export const getProductsByStore = createAsyncThunk(
  "product/getByStore",
  async (storeId, { rejectWithValue }) => {
    try {
      
      if (import.meta.env.PROD) {
        
        const mockProducts = [
          {
            id: 1,
            name: "Laptop Pro 15",
            price: 1299.99,
            category: "Electronics",
            description: "High-performance laptop with 16GB RAM",
            stock: 25,
            sku: "LP-001",
            brand: "TechBrand",
            images: [],
            storeId: storeId
          },
          {
            id: 2,
            name: "Wireless Mouse",
            price: 29.99,
            category: "Electronics",
            description: "Ergonomic wireless mouse",
            stock: 150,
            sku: "WM-002",
            brand: "TechBrand",
            images: [],
            storeId: storeId
          },
          {
            id: 3,
            name: "Office Chair",
            price: 299.99,
            category: "Furniture",
            description: "Comfortable office chair with lumbar support",
            stock: 10,
            sku: "OC-003",
            brand: "ComfortPlus",
            images: [],
            storeId: storeId
          },
          {
            id: 4,
            name: "Coffee Maker",
            price: 89.99,
            category: "Appliances",
            description: "Automatic coffee maker with timer",
            stock: 35,
            sku: "CM-004",
            brand: "BrewMaster",
            images: [],
            storeId: storeId
          },
          {
            id: 5,
            name: "Desk Lamp LED",
            price: 39.99,
            category: "Lighting",
            description: "Adjustable LED desk lamp",
            stock: 75,
            sku: "DL-005",
            brand: "BrightLight",
            images: [],
            storeId: storeId
          }
        ];
        
        return mockProducts;
      }
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/products/store/${storeId}`, { headers });
      
        storeId,
        productCount: res.data.length,
        products: res.data.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category
        }))
      });
      
      return res.data;
    } catch (err) {
        storeId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      if (import.meta.env.PROD) {
        const mockProducts = [
          {
            id: 1,
            name: "Laptop Pro 15",
            price: 1299.99,
            category: "Electronics",
            description: "High-performance laptop with 16GB RAM",
            stock: 25,
            sku: "LP-001",
            brand: "TechBrand",
            images: [],
            storeId: storeId
          },
          {
            id: 2,
            name: "Wireless Mouse",
            price: 29.99,
            category: "Electronics",
            description: "Ergonomic wireless mouse",
            stock: 150,
            sku: "WM-002",
            brand: "TechBrand",
            images: [],
            storeId: storeId
          }
        ];
        return mockProducts;
      }
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const searchProducts = createAsyncThunk(
  "product/search",
  async ({ query, storeId }, { rejectWithValue }) => {
    try {
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/products/store/${storeId}/search?q=${query}`, { headers });
      
        query,
        storeId,
        resultCount: res.data.length,
        results: res.data.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price
        }))
      });
      
      return res.data;
    } catch (err) {
        query,
        storeId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || "Search failed");
    }
  }
);
