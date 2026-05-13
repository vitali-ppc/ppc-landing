"use client";

import { useCallback, useEffect, useState } from "react";

import {
  StoredUser,
  fetchCurrentUser,
  getStoredUser,
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
} from "./auth";

type AuthState = {
  user: StoredUser | null;
  isLoading: boolean;
};

export function useAuth() {
  const [state, setState] = useState<AuthState>(() => ({
    user: getStoredUser(),
    isLoading: true,
  }));

  useEffect(() => {
    let cancelled = false;
    fetchCurrentUser().then((u) => {
      if (cancelled) return;
      setState({ user: u, isLoading: false });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const user = await apiLogin(email, password);
    setState({ user, isLoading: false });
    return user;
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    const user = await apiRegister(email, password);
    setState({ user, isLoading: false });
    return user;
  }, []);

  const logout = useCallback((redirectTo?: string) => {
    apiLogout(redirectTo);
  }, []);

  return { ...state, login, register, logout };
}
