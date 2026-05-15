"use client";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function RoleSwitcher() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs uppercase tracking-widest text-slate-700">
      {user.role}
    </div>
  );
}
