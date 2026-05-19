"use client";

import React from "react";
import dynamic from "next/dynamic";
import MetricCard from "../../components/MetricCard";
import { useAuth } from "../../contexts/AuthContext";
import {
  mockPlayerHighlights,
  mockPlayerMatchRatings,
  mockPlayerMetrics,
  mockPlayerMistakes,
  mockPlayerProfile,
  mockPlayerVsTeamData,
  mockProgressData,
} from "../../lib/mockData";
import { canViewFullStats } from "../../lib/permissions";

const PlayerClipGallery = dynamic(() => import("../../components/PlayerClipGallery"), {
  ssr: false,
  loading: () => <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/50">Loading clip gallery…</div>,
});
const PlayerProfileDashboard = dynamic(() => import("../../components/PlayerProfileDashboard"), {
  ssr: false,
});
const ProgressLineChart = dynamic(() => import("../../components/ProgressLineChart"), {
  ssr: false,
  loading: () => <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/50">Loading trend chart…</div>,
});

export default function PlayerPage() {
  const { user } = useAuth();
  const progressData = mockProgressData;
  const latestRating = mockPlayerMatchRatings[mockPlayerMatchRatings.length - 1]?.rating ?? 0;
  const allowFullStats = canViewFullStats(user?.role ?? "player");

  return (
    <section className="space-y-4 text-white">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Your performance</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/60">
          Track individual growth, review clips, and identify the specific habits that improve your game.
        </p>
      </div>

      <PlayerProfileDashboard profile={mockPlayerProfile} latestRating={latestRating} />

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <h3 className="text-lg font-semibold text-white">Access level</h3>
        <p className="mt-2 text-sm leading-6 text-white/60">
          Player access is limited to personal performance, development trends, and your own clips.
          Full match stats and team-level analysis remain coach/admin views.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-1 items-start">
        <div className="w-full grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Tackles made"
            value={mockPlayerMetrics.tacklesMade.toString()}
            detail="Best output in the last five matches"
            surface="teal"
            chart={{ value: mockPlayerMetrics.tacklesMade, total: 25, valueLabel: "Made", remainderLabel: "Target", colors: ["#2dd4bf", "rgba(255,255,255,0.14)"], showCenterLabel: false }}
          />
          <MetricCard
            label="Missed tackles"
            value={mockPlayerMetrics.missedTackles.toString()}
            detail="Mostly in open-field transition"
            accent="amber"
            surface="amber"
            chart={{ value: mockPlayerMetrics.missedTackles, total: 10, valueLabel: "Missed", remainderLabel: "Limit", colors: ["#f59e0b", "rgba(255,255,255,0.14)"], showCenterLabel: false }}
          />
          <MetricCard
            label="Carries"
            value={mockPlayerMetrics.carries.toString()}
            detail="Strong involvement across phases"
            accent="sky"
            surface="sky"
            chart={{ value: mockPlayerMetrics.carries, total: 40, valueLabel: "Carries", remainderLabel: "Target", colors: ["#38bdf8", "rgba(255,255,255,0.12)"], showCenterLabel: false }}
          />
          <MetricCard
            label="Meters gained"
            value={mockPlayerMetrics.metersGained.toString()}
            detail="Consistent line-breaking threat"
            accent="rose"
            surface="rose"
            chart={{ value: mockPlayerMetrics.metersGained, total: 250, valueLabel: "Meters", remainderLabel: "Target", colors: ["#fb7185", "rgba(255,255,255,0.14)"], showCenterLabel: false }}
          />
        </div>
      </div>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-white">AI performance rating per match</h3>
            <p className="mt-1 text-sm text-white/60">Model-generated score to track game-by-game impact.</p>
          </div>
          <div className="rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-sm font-semibold text-sky-200">
            Last match {latestRating.toFixed(1)}
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {mockPlayerMatchRatings.map((rating) => (
            <article key={rating.id} className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="text-sm font-medium text-white">{rating.match}</div>
              <div className="mt-1 text-xs text-white/45">{new Date(rating.date).toLocaleDateString()}</div>
              <div className="mt-3 text-2xl font-semibold text-emerald-300">{rating.rating.toFixed(1)}</div>
            </article>
          ))}
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <ProgressLineChart
            title="Performance trend"
            subtitle="Match rating progression over the last five months"
            data={progressData}
            stroke="#facc15"
          />
          {allowFullStats ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <h3 className="text-lg font-semibold text-white">Full stats access</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">
                This view is reserved for coaches and admins. Players keep the focused performance trend and personal clips view.
              </p>
            </div>
          ) : null}
        </div>
        <div className="space-y-4">
          <PlayerClipGallery highlights={mockPlayerHighlights} mistakes={mockPlayerMistakes} />
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <h3 className="text-lg font-semibold text-white">Development insight</h3>
            <p className="mt-3 text-sm leading-6 text-white/60">
              You miss 30% of tackles on your left side, but your recovery speed is improving. Focus on body angle and footwork on first contact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
