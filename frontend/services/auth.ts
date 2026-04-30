const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const TOKEN_KEY = "auth_token";
const STORAGE_TYPE = "both"; // "cookies", "localStorage", or "both"

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

interface AuthError {
  message: string;
  status: number;
}

// Utility functions for storage
const storageUtils = {
  setToken: (token: string) => {
    // Store in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, token);
    }

    // Store in cookies
    if (typeof window !== "undefined") {
      const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds
      document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${maxAge}; samesite=strict`;
    }
  },

  getToken: (): string | null => {
    if (typeof window === "undefined") return null;

    // Try localStorage first
    const localToken = localStorage.getItem(TOKEN_KEY);
    if (localToken) return localToken;

    // Fall back to cookies
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${TOKEN_KEY}=`))
      ?.split("=")[1];

    return cookieValue || null;
  },

  removeToken: () => {
    if (typeof window === "undefined") return;

    // Remove from localStorage
    localStorage.removeItem(TOKEN_KEY);

    // Remove from cookies
    document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
  },

  hasToken: (): boolean => {
    return storageUtils.getToken() !== null;
  },
};

// Authentication API calls
export const auth = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw {
          message: error.message || "Login failed",
          status: response.status,
        } as AuthError;
      }

      const data: LoginResponse = await response.json();

      // Store token
      storageUtils.setToken(data.token);

      return data;
    } catch (error) {
      throw error;
    }
  },

  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw {
          message: error.message || "Registration failed",
          status: response.status,
        } as AuthError;
      }

      const data: LoginResponse = await response.json();

      // Optionally store token after registration
      if (data.token) {
        storageUtils.setToken(data.token);
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    storageUtils.removeToken();
  },

  getToken: (): string | null => {
    return storageUtils.getToken();
  },

  hasToken: (): boolean => {
    return storageUtils.hasToken();
  },

  clearAuth: () => {
    storageUtils.removeToken();
  },

  isAuthenticated: (): boolean => {
    return storageUtils.hasToken();
  },

  // Decode JWT to get payload (without verification)
  decodeToken: (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  },

  // Check if token is expired
  isTokenExpired: (token: string): boolean => {
    const payload = auth.decodeToken(token);
    if (!payload || !payload.exp) return true;

    return Date.now() >= payload.exp * 1000;
  },
};
