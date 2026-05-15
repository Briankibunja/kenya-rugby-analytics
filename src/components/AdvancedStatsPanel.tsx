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
    <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
      <div className="p-5 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">Advanced Match Statistics</h3>
        <p className="text-sm text-slate-600 mt-1">Detailed breakdown of key performance indicators</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
        {stats.map((stat, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 hover:bg-slate-100 transition">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-slate-600">{stat.label}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
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
                      {stat.trend === "up" ? "↑" : stat.trend === "down" ? "↓" : "→"}
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
