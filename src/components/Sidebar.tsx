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
    <aside className="w-full border-b border-white/10 bg-black p-4 text-white lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r lg:border-white/10">
      <div className="brand-blend mb-4 text-xl font-bold tracking-tight uppercase">Kenya Rugby Analytics</div>
      <nav className="flex flex-row gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            prefetch
            className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 lg:rounded-lg"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
