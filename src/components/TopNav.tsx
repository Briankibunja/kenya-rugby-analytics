"use client";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import RoleSwitcher from "./RoleSwitcher";

export default function TopNav({ title }: { title?: string }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="flex w-full items-center justify-between border-b border-slate-200 bg-white p-4 text-slate-900">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">{title || "Dashboard"}</h1>
        {user && <div className="mt-1 text-xs text-slate-600">Welcome, {user.name}</div>}
      </div>
      <div className="flex items-center gap-4">
        <RoleSwitcher />
        <button
          onClick={handleLogout}
          className="rounded-full border border-slate-200 px-3 py-2 text-xs uppercase tracking-widest transition hover:bg-slate-50"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
