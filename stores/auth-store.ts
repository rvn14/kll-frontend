"use client";

import { create } from "zustand";
import { authService } from "@/services/auth.service";

export interface AuthUser {
  id: number;
  full_name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
  fetchUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: { full_name: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),

  fetchUser: async () => {
    try {
      set({ isLoading: true });
      const user = await authService.me<AuthUser>();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  login: async (email: string, password: string) => {
    // This calls the Next.js API route which proxies to backend and sets httpOnly cookies
    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.detail || "Login failed");
    }

    // Now fetch the user profile using the cookie that was just set
    await get().fetchUser();
  },

  register: async (payload) => {
    const res = await fetch("/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.detail || "Registration failed");
    }

    await get().fetchUser();
  },

  logout: async () => {
    try {
      await fetch("/api/v1/auth/logout", { method: "POST" });
    } catch {
      // silently fail
    }
    set({ user: null, isAuthenticated: false, isLoading: false });
  },
}));
