import { auth } from "@/services/auth";

/**
 * Check if user is authenticated
 * Use this in client components to check auth status
 */
export const checkAuthentication = (): boolean => {
  if (typeof window === "undefined") return false;
  return auth.isAuthenticated();
};

/**
 * Get current auth token
 */
export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return auth.getToken();
};

/**
 * Get user info from token (basic decode, no verification)
 */
export const getCurrentUser = () => {
  if (typeof window === "undefined") return null;

  const token = auth.getToken();
  if (!token) return null;

  const payload = auth.decodeToken(token);
  return payload
    ? {
        id: payload.sub || payload.id,
        email: payload.email,
        name: payload.name,
        exp: payload.exp,
      }
    : null;
};

/**
 * Check if token is valid and not expired
 */
export const isTokenValid = (): boolean => {
  if (typeof window === "undefined") return false;

  const token = auth.getToken();
  if (!token) return false;

  return !auth.isTokenExpired(token);
};
