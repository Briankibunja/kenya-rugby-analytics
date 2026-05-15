"use client";
import React from "react";
import { Filter, X } from "lucide-react";

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
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={18} className="text-emerald-500" />
        <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Time Period Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Match Period</label>
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
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-slate-50 text-slate-700 border border-slate-100 hover:bg-slate-100"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Player Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Player Focus</label>
          <div className="flex gap-2">
            <select
              value={playerFilter}
              onChange={(e) => onPlayerFilterChange(e.target.value)}
              className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none transition"
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
                className="p-2 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 transition"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-600 mt-3">
        Applied filters: {timeFilter === "all" ? "Full Match" : timeFilter === "first-half" ? "First Half" : "Second Half"}
        {playerFilter && ` • Player: ${playerFilter}`}
      </p>
    </div>
  );
}
