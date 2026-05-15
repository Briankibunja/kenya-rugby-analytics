"use client";
import React from "react";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import AdminShell from "../../components/AdminShell";

export default function PlayerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["player"]}>
      <AdminShell>{children}</AdminShell>
    </ProtectedRoute>
  );
}
