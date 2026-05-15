"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth, type UserRole } from "../contexts/AuthContext";

type SocialLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const socialLinks: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://web.facebook.com/officialKRU",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V9c0-.9.2-1.5 1.5-1.5h1.7V4.7c-.3 0-1.4-.1-2.6-.1-2.7 0-4.5 1.6-4.5 4.6v1.7H7v3.1h2.6v8h3.9Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/officialkru",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm10 1.7a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/OfficialKRU",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M18.9 3H22l-6.8 7.8L23 21h-6.8l-5.3-6.7L5 21H2l7.4-8.5L1 3h6.9l4.8 6.1L18.9 3Zm-1.2 16h1.7L7.1 4.8H5.2L17.7 19Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@KenyaRugbyTV",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M21.8 7.1a3 3 0 0 0-2.1-2.1C17.9 4.5 12 4.5 12 4.5s-5.9 0-7.7.5A3 3 0 0 0 2.2 7.1 31.8 31.8 0 0 0 2 12a31.8 31.8 0 0 0 .2 4.9 3 3 0 0 0 2.1 2.1c1.8.5 7.7.5 7.7.5s5.9 0 7.7-.5a3 3 0 0 0 2.1-2.1A31.8 31.8 0 0 0 22 12a31.8 31.8 0 0 0-.2-4.9ZM10 15.2V8.8L15.6 12 10 15.2Z" />
      </svg>
    ),
  },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, logout, setRole, clearRoleSwitch } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [pendingRoleRoute, setPendingRoleRoute] = useState<UserRole | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const currentPanelTitle = useMemo(() => {
    if (pathname.startsWith("/coach")) return "Coach Panel";
    if (pathname.startsWith("/player")) return "Player Panel";
    if (pathname.startsWith("/fan")) return "Fan Panel";
    return "Admin Panel";
  }, [pathname]);

  const isAdminPage = pathname.startsWith("/admin");

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    if (!pendingRoleRoute || user?.role !== pendingRoleRoute) {
      return;
    }

    router.push(`/${pendingRoleRoute}`);
  }, [pendingRoleRoute, router, user?.role]);

  useEffect(() => {
    if (pendingRoleRoute && pathname === `/${pendingRoleRoute}`) {
      setPendingRoleRoute(null);
      clearRoleSwitch();
    }
  }, [clearRoleSwitch, pathname, pendingRoleRoute]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) {
        return;
      }

      if (menuRef.current?.contains(target) || menuButtonRef.current?.contains(target)) {
        return;
      }

      setMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [menuOpen]);

  const handleSwitch = (role: UserRole) => {
    setRole(role);
    setMenuOpen(false);
    setPendingRoleRoute(role);
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-[linear-gradient(180deg,#f8faf8_0%,#ffffff_18%,#ffffff_82%,#f8faf8_100%)] text-slate-900">
      <header className="relative border-b border-black/10 bg-gradient-to-r from-red-700 via-green-700 to-black text-white shadow-lg">
        <button
          type="button"
          ref={menuButtonRef}
          onClick={() => setMenuOpen((current) => !current)}
          className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20 sm:left-6 sm:top-6"
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          aria-label="Open menu"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>

        {menuOpen && (
          <div
            ref={menuRef}
            role="menu"
            className="absolute left-4 top-16 z-20 w-72 rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-[0_24px_70px_rgba(15,23,42,0.22)] backdrop-blur sm:left-6 sm:top-18"
          >
            <div className="space-y-2 border-b border-slate-200 pb-3">
              <p className="text-sm font-semibold text-slate-900">{currentPanelTitle}</p>
              {isAdminPage && <p className="text-xs text-slate-500">Manage access and switch views</p>}
            </div>

            <div className="mt-3 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 text-left text-sm font-medium text-slate-800 transition hover:border-slate-300 hover:bg-slate-100"
              >
                Logout
              </button>

              {isAdminPage && (
                <div className="mt-2 border-t border-slate-100 pt-3">
                  <p className="mb-2 text-xs uppercase tracking-[0.3em] text-slate-500">View as</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleSwitch("admin")}
                      className="rounded-lg border border-slate-200 bg-white py-2 text-center text-sm font-medium text-slate-800 transition hover:border-emerald-300 hover:bg-emerald-50"
                    >
                      Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSwitch("coach")}
                      className="rounded-lg border border-slate-200 bg-white py-2 text-center text-sm font-medium text-slate-800 transition hover:border-emerald-300 hover:bg-emerald-50"
                    >
                      Coach
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSwitch("player")}
                      className="rounded-lg border border-slate-200 bg-white py-2 text-center text-sm font-medium text-slate-800 transition hover:border-emerald-300 hover:bg-emerald-50"
                    >
                      Player
                    </button>
                  </div>
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={() => handleSwitch("fan")}
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-white py-2 text-center text-sm font-medium text-slate-800 transition hover:border-emerald-300 hover:bg-emerald-50"
                    >
                      Fan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

          <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-2 px-4 py-4 text-center sm:px-6 sm:py-5 lg:px-8 lg:py-6">
          <img
            src="https://www.kru.co.ke/logo-lion.svg"
            alt="Kenya Rugby Union"
            className="h-12 w-12 shrink-0 object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)] sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          />
          <h1 className="max-w-full text-xl font-extrabold tracking-[0.16em] text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.85)] sm:text-2xl lg:text-3xl">
            Kenya Rugby Analytics
          </h1>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
        <main className="flex-1 overflow-y-auto rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.93)_10%,rgba(255,255,255,0.92)_90%,rgba(255,255,255,0.96)_100%),linear-gradient(180deg,rgba(185,28,28,0.06)_0%,rgba(21,128,61,0.03)_50%,rgba(17,24,39,0.05)_100%)] bg-blend-normal px-4 py-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="mx-auto w-full max-w-none min-w-0">{children}</div>
        </main>

        <footer className="border-t border-black/10 bg-gradient-to-r from-black via-green-800 to-red-700 text-white shadow-[0_-12px_40px_rgba(0,0,0,0.2)]">
          <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-white/65">Kenya Rugby Union</p>
              <p className="mt-1 text-sm text-white/80">Connect with us on social media</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-white/20"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}