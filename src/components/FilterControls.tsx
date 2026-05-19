"use client";
import React from "react";
import { Filter, X } from "./Icons";

type FilterValue = "all" | "first-half" | "second-half";
type PlayerFilter = string;

interface FilterControlsProps {
  timeFilter: FilterValue;
  playerFilter: PlayerFilter;
  players: string[];
  onTimeFilterChange: (value: FilterValue) => void;
  onPlayerFilterChange: (player: PlayerFilter) => void;
}

export default function FilterControls({
  timeFilter,
  playerFilter,
  players,
  onTimeFilterChange,
  onPlayerFilterChange,
}: FilterControlsProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={18} className="text-emerald-500" />
        <h3 className="text-lg font-semibold text-white">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Time Period Filter */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white/70">Match Period</label>
          <div className="flex gap-2">
            {[
              { value: "all", label: "Full Match" },
              { value: "first-half", label: "First Half" },
              { value: "second-half", label: "Second Half" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => onTimeFilterChange(option.value as FilterValue)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
                  timeFilter === option.value
                    ? "border border-emerald-400/40 bg-emerald-500/15 text-emerald-200"
                    : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Player Filter */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white/70">Player Focus</label>
          <div className="flex gap-2">
            <select
              value={playerFilter}
              onChange={(e) => onPlayerFilterChange(e.target.value)}
              className="flex-1 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none transition"
            >
              <option value="">All Players</option>
              {players.map((player) => (
                <option key={player} value={player}>
                  {player}
                </option>
              ))}
            </select>
            {playerFilter && (
              <button
                onClick={() => onPlayerFilterChange("")}
                className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/75 transition hover:bg-white/10"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-white/55">
        Applied filters: {timeFilter === "all" ? "Full Match" : timeFilter === "first-half" ? "First Half" : "Second Half"}
        {playerFilter && ` • Player: ${playerFilter}`}
      </p>
    </div>
  );
}
