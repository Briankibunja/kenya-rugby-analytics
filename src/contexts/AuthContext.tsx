"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "admin" | "coach" | "player" | "fan";

export type User = {
  id: string;
  name: string;
  role: UserRole;
  team?: string;
} | null;

type AuthContextType = {
  user: User;
  login: (u: User) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
  switchingRole: UserRole | null;
  clearRoleSwitch: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [switchingRole, setSwitchingRole] = useState<UserRole | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("rugby-user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        setUser(null);
      }
    } else {
      try {
        const params = new URL(window.location.href).searchParams;
        const devRole = params.get("devRole") as UserRole | null;
        if (devRole) {
          const devUser = { id: `${devRole}-dev`, name: `Dev ${devRole}`, role: devRole, team: "KCB Rugby" } as any;
          setUser(devUser);
          localStorage.setItem("rugby-user", JSON.stringify(devUser));
        }
      } catch {
        // ignore malformed URL or other errors in non-browser environments
      }
    }
  }, []);

  const login = (u: User) => {
    setUser(u);
    if (u) {
      localStorage.setItem("rugby-user", JSON.stringify(u));
    }
  };

  const logout = () => {
    // Helpful trace to debug unexpected logouts during role switching
    try {
      console.trace("AuthContext.logout called", { user, switchingRole });
    } catch {}
    setUser(null);
    setSwitchingRole(null);
    localStorage.removeItem("rugby-user");
  };

  const setRole = (role: UserRole) => {
    if (user) {
      setSwitchingRole(role);
      const updated = { ...user, role };
      login(updated);
    }
  };

  const clearRoleSwitch = () => {
    setSwitchingRole(null);
  };

  if (!mounted) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout, setRole, switchingRole, clearRoleSwitch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
