"use client";
import React from "react";
import { AlertCircle, TrendingUp } from "./Icons";

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
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <div className="border-b border-white/10 p-5">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-emerald-500" size={20} />
            <div>
              <h3 className="text-lg font-semibold text-white">Attack Patterns</h3>
              <p className="mt-1 text-sm text-white/60">Opponent tendency analysis</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white/70">Preferred Attack Side</span>
              <span className="text-2xl font-bold text-emerald-300">{preferredAttackSide}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-emerald-400 rounded-full"
                style={{ width: `${preferredAttackPercentage}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-white/55">{preferredAttackPercentage}% of attacks</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white">Match Phase Patterns</h4>
            {patterns.map((p, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${threatColors[p.threat]}`}>
                  {p.threat}
                </span>
                <div>
                  <p className="text-sm font-medium text-white">{p.phase}</p>
                  <p className="text-xs text-white/60">{p.pattern}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weak Zones & Key Players */}
      <div className="space-y-6">
        {/* Weak Defensive Zones */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <div className="border-b border-white/10 p-5">
            <div className="flex items-center gap-2">
              <AlertCircle className="text-rose-500" size={20} />
              <div>
                <h3 className="text-lg font-semibold text-white">Defensive Weaknesses</h3>
                <p className="mt-1 text-sm text-white/60">Zones to exploit</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 p-5">
            {weakDefensiveZones.map((zone, idx) => (
              <div key={idx} className="flex items-center gap-3 rounded-lg border border-rose-400/20 bg-rose-500/10 p-3">
                <div className="w-2 h-2 rounded-full bg-rose-400" />
                <span className="text-sm text-white">{zone}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Strong Areas */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <div className="border-b border-white/10 p-5">
            <h3 className="text-lg font-semibold text-white">Strong Areas</h3>
            <p className="mt-1 text-sm text-white/60">Areas of defensive strength</p>
          </div>

          <div className="space-y-2 p-5">
            {strongAreas.map((area, idx) => (
              <div key={idx} className="flex items-center gap-3 rounded-lg border border-emerald-400/20 bg-emerald-500/10 p-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-sm text-white">{area}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Players */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <div className="border-b border-white/10 p-5">
            <h3 className="text-lg font-semibold text-white">Key Players to Watch</h3>
            <p className="mt-1 text-sm text-white/60">Opponent impact players</p>
          </div>

          <div className="space-y-2 p-5">
            {keyPlayers.map((player, idx) => (
              <div key={idx} className="rounded-lg border border-white/10 bg-white/5 p-3">
                <p className="text-sm text-white">{player}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
