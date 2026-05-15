"use client";
import React from "react";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import AdminShell from "../../components/AdminShell";

export default function FanLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["fan"]}>
      <AdminShell>{children}</AdminShell>
    </ProtectedRoute>
  );
}
