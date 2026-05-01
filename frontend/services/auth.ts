/**
 * Authentication Service
 * Handles user authentication, token storage, and retrieval
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

interface RegisterResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

// Token storage utilities
const TokenStorage = {
  // Store token in both localStorage and cookies
  setToken: (token: string, rememberMe: boolean = false) => {
    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
      
      // Store in cookies with expiration based on rememberMe
      const expirationDays = rememberMe ? 30 : 1;
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + expirationDays);
      
      // Set cookie
      document.cookie = `authToken=${token}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;
    }
  },

  // Get token from localStorage or cookies
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  },

  // Remove token from both storage methods
  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      // Clear cookie
      document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  },

  // Check if token exists
  hasToken: (): boolean => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }
};

export const auth = {
  /**
   * Login user with email and password
   */
  login: async (email: string, password: string, rememberMe: boolean = false): Promise<LoginResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data: LoginResponse = await response.json();
      
      // Store the JWT token
      TokenStorage.setToken(data.token, rememberMe);
      
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'An error occurred during login');
    }
  },

  /**
   * Register new user
   */
  register: async (name: string, email: string, password: string): Promise<RegisterResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data: RegisterResponse = await response.json();
      
      // Optionally store the JWT token after registration
      TokenStorage.setToken(data.token, false);
      
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'An error occurred during registration');
    }
  },

  /**
   * Logout user
   */
  logout: () => {
    TokenStorage.removeToken();
  },

  /**
   * Get stored token
   */
  getToken: (): string | null => {
    return TokenStorage.getToken();
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return TokenStorage.hasToken();
  },

  /**
   * Get authorization header for API calls
   */
  getAuthHeader: () => {
    const token = TokenStorage.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};
