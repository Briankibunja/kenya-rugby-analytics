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
    if (user === null) {
      router.replace("/login");
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      if (switchingRole) {
        return;
      }

      logout();
      router.replace("/login");
    }
  }, [allowedRoles, logout, router, switchingRole, user]);

  if (user === null || (!allowedRoles.includes(user.role) && !switchingRole)) {
    return null;
  }

  return <>{children}</>;
}
