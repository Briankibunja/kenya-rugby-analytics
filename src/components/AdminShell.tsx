"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth, type UserRole } from "../contexts/AuthContext";
import heroImg from "../../40986ec5-5d7d-462e-870e-3c96d958122b.png";

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
  const { user, logout, setRole, clearRoleSwitch, switchingRole } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
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
    router.replace("/login");
  };

  const handleReturnToAdmin = () => {
    setRole("admin");
    setMenuOpen(false);
  };

  // Ensure a direct navigation to the admin page when returning
  const handleReturnToAdminAndNavigate = () => {
    // First request the role change, then navigate, and only clear the 'switchingRole'
    // flag shortly after to avoid ProtectedRoute seeing an unauthorized state.
    handleReturnToAdmin();
    router.replace("/admin");
    setTimeout(() => {
      clearRoleSwitch();
    }, 60);
  };

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
  };

  useEffect(() => {
    ["/admin", "/coach", "/player", "/fan", "/login"].forEach((path) => {
      router.prefetch(path);
    });
  }, [router]);

  return (
    <div className="flex min-h-screen flex-1 flex-col text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="https://www.kru.co.ke/logo-lion.svg"
              alt="Kenya Rugby Union"
              width={80}
              height={80}
              priority
              className="h-14 w-14 shrink-0 object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)] sm:h-16 sm:w-16 lg:h-20 lg:w-20"
            />

            <div className="leading-tight">
              <div className="text-sm font-extrabold uppercase tracking-[0.18em] brand-blend">Kenya Rugby Analytics</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!(switchingRole !== null && user?.role !== "admin") && (
              <button
                type="button"
                ref={menuButtonRef}
                onClick={() => setMenuOpen((current) => !current)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/10"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                aria-label="Open menu"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {menuOpen && !(switchingRole !== null && user?.role !== "admin") && (
          <div
            ref={menuRef}
            role="menu"
            className="absolute right-4 top-16 z-20 w-72 rounded-2xl border border-white/10 bg-[#0b0b0b] p-4 text-white shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur sm:right-6 sm:top-18"
          >
            <div className="space-y-2 border-b border-white/10 pb-3">
              <p className="text-sm font-semibold text-white">{currentPanelTitle}</p>
              {isAdminPage && <p className="text-xs text-white/55">Manage access and switch views</p>}
            </div>

            <div className="mt-3 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-lg border border-white/10 bg-white/5 py-2 text-left text-sm font-medium text-white transition hover:bg-white/10"
              >
                Logout
              </button>

              {isAdminPage && (
                <div className="mt-2 border-t border-white/10 pt-3">
                  <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/50">View as</p>
                  <div className="grid grid-cols-3 gap-2">
                    <Link
                      href="/admin"
                      onClick={() => handleSwitch("admin")}
                      className="rounded-lg border border-white/10 bg-white/5 py-2 text-center text-sm font-medium text-white transition hover:border-emerald-400 hover:bg-emerald-400/10"
                    >
                      Admin
                    </Link>
                    <Link
                      href="/coach"
                      onClick={() => handleSwitch("coach")}
                      className="rounded-lg border border-white/10 bg-white/5 py-2 text-center text-sm font-medium text-white transition hover:border-emerald-400 hover:bg-emerald-400/10"
                    >
                      Coach
                    </Link>
                    <Link
                      href="/player"
                      onClick={() => handleSwitch("player")}
                      className="rounded-lg border border-white/10 bg-white/5 py-2 text-center text-sm font-medium text-white transition hover:border-emerald-400 hover:bg-emerald-400/10"
                    >
                      Player
                    </Link>
                  </div>
                  <div className="mt-2">
                    <Link
                      href="/fan"
                      onClick={() => handleSwitch("fan")}
                      className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 py-2 text-center text-sm font-medium text-white transition hover:border-emerald-400 hover:bg-emerald-400/10"
                    >
                      Fan
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Full-width hero image placed directly below the header */}
      <div className="w-full">
        <Image
          src={heroImg.src}
          alt="Kenya Rugby - Hero"
          width={1920}
          height={768}
          priority={false}
          sizes="100vw"
          className="h-56 w-full object-cover sm:h-72 lg:h-96"
        />
      </div>

      {switchingRole !== null && user?.role !== "admin" && (
        <div className="fixed right-4 top-4 z-[60] sm:right-6 sm:top-6 lg:right-8 lg:top-8">
          <button
            type="button"
            onClick={() => {
              try {
                console.trace("AdminShell: Return to Admin clicked", { user, switchingRole });
              } catch {}
              // Ensure role is set and perform a full page navigation to /admin
              handleReturnToAdmin();
              // Use full-nav to avoid client-side ProtectedRoute race
              window.location.assign("/admin");
            }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-100 shadow-[0_12px_30px_rgba(0,0,0,0.25)] backdrop-blur transition hover:bg-emerald-400/15"
          >
            Return to Admin
          </button>
        </div>
      )}

      <div className="flex min-h-0 flex-1 flex-col px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
        <main className="flex-1 overflow-y-auto rounded-[2rem] panel-surface px-4 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="mx-auto w-full max-w-none min-w-0">{children}</div>
        </main>

        <footer className="border-t border-white/10 bg-black">
          <div className="mx-auto grid w-full max-w-[1600px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1.1fr_0.8fr_1fr] lg:px-8">
            <div>
              <div className="text-2xl font-black uppercase tracking-[0.18em]">Kenya Rugby Union</div>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">
                The official home of Kenya rugby. Uniting communities, developing talent, inspiring a nation.
              </p>
            </div>
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.24em] text-white/80">Follow us</div>
              <div className="mt-3 flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.24em] text-white/80">Kenya Rugby Analytics</div>
              <p className="mt-3 text-sm leading-6 text-white/65">
                Live analytics, role-aware dashboards, and match control tools for every part of the game.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}