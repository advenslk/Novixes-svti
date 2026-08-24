import { useCallback, useEffect, useState } from "react";

export interface AuthUser {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/user", {
        credentials: "include",
      });

      const data = await response.json();
      setUser(data.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password.");
      }

      setUser(data.user ?? null);
      return data.user;
    },
    [],
  );

  const register = useCallback(
    async (
      email: string,
      password: string,
      firstName = "",
      lastName = "",
    ) => {
      const response = await fetch("/api/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setUser(data.user ?? null);
      return data.user;
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      await fetch("/api/logout", {
        method: "GET",
        credentials: "include",
      });
    } finally {
      setUser(null);
    }
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    refresh,
  };
}
