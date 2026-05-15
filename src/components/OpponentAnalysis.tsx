"use client";
import React from "react";
import { AlertCircle, TrendingUp } from "lucide-react";

interface OpponentPattern {
  phase: string;
  pattern: string;
  threat: "Low" | "Medium" | "High";
}

interface OpponentAnalysisProps {
  preferredAttackSide: string;
  preferredAttackPercentage: number;
  weakDefensiveZones: string[];
  strongAreas: string[];
  patterns: OpponentPattern[];
  keyPlayers: string[];
}

const threatColors = {
  Low: "bg-emerald-400/20 text-emerald-300",
  Medium: "bg-amber-400/20 text-amber-300",
  High: "bg-rose-400/20 text-rose-300",
};

export default function OpponentAnalysis({
  preferredAttackSide,
  preferredAttackPercentage,
  weakDefensiveZones,
  strongAreas,
  patterns,
  keyPlayers,
}: OpponentAnalysisProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Attack Patterns */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-emerald-500" size={20} />
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Attack Patterns</h3>
              <p className="text-sm text-slate-600 mt-1">Opponent tendency analysis</p>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Preferred Attack Side</span>
              <span className="text-2xl font-bold text-emerald-600">{preferredAttackSide}</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full"
                style={{ width: `${preferredAttackPercentage}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">{preferredAttackPercentage}% of attacks</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-900">Match Phase Patterns</h4>
            {patterns.map((p, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 border border-slate-100">
                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${threatColors[p.threat]}`}>
                  {p.threat}
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-900">{p.phase}</p>
                  <p className="text-xs text-slate-600">{p.pattern}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weak Zones & Key Players */}
      <div className="space-y-6">
        {/* Weak Defensive Zones */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
          <div className="p-5 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <AlertCircle className="text-rose-500" size={20} />
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Defensive Weaknesses</h3>
                <p className="text-sm text-slate-600 mt-1">Zones to exploit</p>
              </div>
            </div>
          </div>

          <div className="p-5 space-y-2">
            {weakDefensiveZones.map((zone, idx) => (
              <div key={idx} className="flex items-center gap-3 rounded-lg bg-rose-50 border border-rose-100 p-3">
                <div className="w-2 h-2 rounded-full bg-rose-400" />
                <span className="text-sm text-slate-900">{zone}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Strong Areas */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
          <div className="p-5 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Strong Areas</h3>
            <p className="text-sm text-slate-600 mt-1">Areas of defensive strength</p>
          </div>

          <div className="p-5 space-y-2">
            {strongAreas.map((area, idx) => (
              <div key={idx} className="flex items-center gap-3 rounded-lg bg-emerald-50 border border-emerald-100 p-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-sm text-slate-900">{area}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Players */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
          <div className="p-5 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Key Players to Watch</h3>
            <p className="text-sm text-slate-600 mt-1">Opponent impact players</p>
          </div>

          <div className="p-5 space-y-2">
            {keyPlayers.map((player, idx) => (
              <div key={idx} className="rounded-lg bg-slate-50 border border-slate-100 p-3">
                <p className="text-sm text-slate-900">{player}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
