"use client";
import React from "react";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import AdminShell from "../../components/AdminShell";

export default function CoachLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["coach"]}>
      <AdminShell>{children}</AdminShell>
    </ProtectedRoute>
  );
}
