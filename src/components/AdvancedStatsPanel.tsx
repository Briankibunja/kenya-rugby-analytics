"use client";
import React from "react";

interface AdvancedStatItem {
  label: string;
  value: string | number;
  detail?: string;
  trend?: "up" | "down" | "neutral";
}

interface AdvancedStatsPanelProps {
  stats: AdvancedStatItem[];
}

export default function AdvancedStatsPanel({ stats }: AdvancedStatsPanelProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="border-b border-white/10 p-5">
        <h3 className="text-lg font-semibold text-white">Advanced Match Statistics</h3>
        <p className="mt-1 text-sm text-white/60">Detailed breakdown of key performance indicators</p>
      </div>

      <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, idx) => (
          <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-white/60">{stat.label}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  {stat.trend && (
                    <span
                      className={`text-xs font-medium ${
                        stat.trend === "up"
                          ? "text-emerald-400"
                          : stat.trend === "down"
                          ? "text-rose-400"
                          : "text-amber-400"
                      }`}
                    >
                        <p className="mt-1 text-xs text-white/45">{stat.detail}</p>
                    </span>
                  )}
                </div>
                {stat.detail && (
                  <p className="mt-1 text-xs text-slate-500">{stat.detail}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
