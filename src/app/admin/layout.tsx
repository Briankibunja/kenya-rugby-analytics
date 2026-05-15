"use client";
import React from "react";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import AdminShell from "../../components/AdminShell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminShell>{children}</AdminShell>
    </ProtectedRoute>
  );
}
