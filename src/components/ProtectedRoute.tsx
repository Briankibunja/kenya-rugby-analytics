"use client";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { UserRole } from "../contexts/AuthContext";

export function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}) {
  const { user, logout, switchingRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/login");
  }, [router]);

  useEffect(() => {
    // Use an effective role that falls back to localStorage so role-switching
    // updates applied via `setRole` (which writes to localStorage) are visible
    // immediately and avoid a race where `user` state hasn't propagated yet.
    let effectiveRole: string | null = null;

    try {
      if (user && user.role) {
        effectiveRole = user.role;
      } else {
        const saved = localStorage.getItem("rugby-user");
        if (saved) {
          const parsed = JSON.parse(saved);
          effectiveRole = parsed?.role ?? null;
        }
      }
    } catch {
      effectiveRole = user?.role ?? null;
    }

    if (!effectiveRole) {
      try {
        console.trace("ProtectedRoute: redirecting to /login because no effectiveRole", { user, switchingRole });
      } catch {}
      router.replace("/login");
      return;
    }

    if (!allowedRoles.includes(effectiveRole as any)) {
      try {
        console.trace("ProtectedRoute: unauthorized role, handling redirect", { effectiveRole, allowedRoles, user, switchingRole });
      } catch {}
      if (switchingRole) return;
      logout();
      router.replace("/login");
    }
  }, [allowedRoles, logout, router, switchingRole, user]);

  if (user === null || (!allowedRoles.includes(user.role) && !switchingRole)) {
    return null;
  }

  return <>{children}</>;
}
