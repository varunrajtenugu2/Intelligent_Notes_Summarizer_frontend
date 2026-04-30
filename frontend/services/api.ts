import { auth } from "./auth";

// API service for making HTTP requests
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = auth.getToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const api = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (response.status === 401) {
      auth.clearAuth();
      // Redirect to login if needed
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return response;
  },

  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      auth.clearAuth();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return response;
  },

  put: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      auth.clearAuth();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return response;
  },

  delete: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (response.status === 401) {
      auth.clearAuth();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return response;
  },
};
