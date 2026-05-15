"use client";
import Link from "next/link";
import React from "react";
import { useAuth, type UserRole } from "../contexts/AuthContext";

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
  { href: "/admin", label: "Admin" },
  { href: "/coach", label: "Coach" },
  { href: "/player", label: "Player" },
  { href: "/fan", label: "Fan" },
];

const ROLE_NAV: Record<UserRole, NavItem[]> = {
  admin: [NAV[0]],
  coach: [NAV[1]],
  player: [NAV[2]],
  fan: [NAV[3]],
};

export default function Sidebar() {
  const { user } = useAuth();
  const navItems = user ? ROLE_NAV[user.role] : NAV;

  return (
    <aside className="w-full border-b border-slate-200 bg-white p-4 text-slate-900 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r lg:border-slate-200">
      <div className="brand-blend mb-4 text-xl font-bold tracking-tight">Kenya Rugby Analytics</div>
      <nav className="flex flex-row gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap rounded-full border border-slate-200 px-3 py-2 text-sm transition hover:bg-slate-50 lg:rounded-lg"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
