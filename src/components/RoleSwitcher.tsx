"use client";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function RoleSwitcher() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-xs uppercase tracking-widest text-emerald-200">
      {user.role}
    </div>
  );
}
