"use client";
import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import RoleSwitcher from "./RoleSwitcher";

export default function TopNav({ title }: { title?: string }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/login");
  }, [router]);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <header className="flex w-full items-center justify-between border-b border-white/10 bg-black/90 p-4 text-white backdrop-blur-md">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">{title || "Dashboard"}</h1>
        {user && <div className="mt-1 text-xs text-white/60">Welcome, {user.name}</div>}
      </div>
      <div className="flex items-center gap-4">
        <RoleSwitcher />
        <button
          onClick={handleLogout}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-widest text-white transition hover:bg-white/10"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
