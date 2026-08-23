import { useCallback, useEffect, useState } from "react";
export interface AuthUser { id: string; email: string | null; firstName: string | null; lastName: string | null; profileImageUrl: string | null; }
export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => { fetch("/api/auth/user", { credentials: "include" }).then(r => r.json()).then(data => setUser(data.user ?? null)).catch(() => setUser(null)).finally(() => setLoading(false)); }, []);
  const login = useCallback(() => { window.location.href = `/api/login?returnTo=${encodeURIComponent(window.location.pathname || "/")}`; }, []);
  const logout = useCallback(() => { window.location.href = `/api/logout?returnTo=${encodeURIComponent(window.location.pathname || "/")}`; }, []);
  return { user, isLoading, isAuthenticated: Boolean(user), login, logout };
}