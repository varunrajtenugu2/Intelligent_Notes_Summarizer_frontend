import { useCallback } from "react";
import { auth } from "@/services/auth";

export const useAuth = () => {
  const login = useCallback(async (email: string, password: string) => {
    return auth.login(email, password);
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      return auth.register(name, email, password);
    },
    []
  );

  const logout = useCallback(() => {
    auth.logout();
  }, []);

  const getToken = useCallback(() => {
    return auth.getToken();
  }, []);

  const isAuthenticated = useCallback(() => {
    return auth.isAuthenticated();
  }, []);

  const clearAuth = useCallback(() => {
    auth.clearAuth();
  }, []);

  return {
    login,
    register,
    logout,
    getToken,
    isAuthenticated,
    clearAuth,
  };
};
