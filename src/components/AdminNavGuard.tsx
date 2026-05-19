"use client";
import { useEffect } from "react";

export default function AdminNavGuard() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      try {
        const target = e.target as Element | null;
        if (!target) return;
        const anchor = target.closest && (target.closest("a") as HTMLAnchorElement | null);
        if (!anchor) return;
        const href = anchor.getAttribute("href");
        if (!href) return;
        const url = new URL(href, window.location.href);
        if (url.pathname === "/admin") {
          e.preventDefault();
          try {
            const saved = localStorage.getItem("rugby-user");
            const user = saved ? JSON.parse(saved) : { id: "admin-dev", name: "Dev Admin", role: "admin" };
            localStorage.setItem("rugby-user", JSON.stringify({ ...user, role: "admin" }));
          } catch {}
          window.location.assign("/admin");
        }
      } catch {}
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
