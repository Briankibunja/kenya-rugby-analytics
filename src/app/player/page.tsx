"use client";

import React from "react";
import MetricCard from "../../components/MetricCard";
import PlayerClipGallery from "../../components/PlayerClipGallery";
import PlayerProfileDashboard from "../../components/PlayerProfileDashboard";
import ProgressLineChart from "../../components/ProgressLineChart";
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

export default function PlayerPage() {
  const { user } = useAuth();
  const progressData = mockProgressData;
  const latestRating = mockPlayerMatchRatings[mockPlayerMatchRatings.length - 1]?.rating ?? 0;
  const allowFullStats = canViewFullStats(user?.role ?? "player");

  return (
    <section className="space-y-6 text-slate-900">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Your performance</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Track individual growth, review clips, and identify the specific habits that improve your game.
        </p>
      </div>

      <PlayerProfileDashboard profile={mockPlayerProfile} latestRating={latestRating} />

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-900">Access level</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Player access is limited to personal performance, development trends, and your own clips.
          Full match stats and team-level analysis remain coach/admin views.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px] items-start">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Tackles made"
            value={mockPlayerMetrics.tacklesMade.toString()}
            detail="Best output in the last five matches"
            surface="teal"
            pie={{ data: [{ label: "Completed", value: mockPlayerMetrics.tacklesMade, color: "#10b981" }, { label: "Missed", value: mockPlayerMetrics.missedTackles, color: "#f87171" }], size: 64, innerRadius: 16 }}
          />
          <MetricCard
            label="Missed tackles"
            value={mockPlayerMetrics.missedTackles.toString()}
            detail="Mostly in open-field transition"
            accent="amber"
            surface="amber"
          />
          <MetricCard
            label="Carries"
            value={mockPlayerMetrics.carries.toString()}
            detail="Strong involvement across phases"
            accent="sky"
            surface="sky"
            pie={{ data: [{ label: "Carries", value: mockPlayerMetrics.carries, color: "#60a5fa" }, { label: "Other", value: Math.max(0, mockPlayerMetrics.metersGained - mockPlayerMetrics.carries), color: "#94a3b8" }], size: 64, innerRadius: 16 }}
          />
          <MetricCard label="Meters gained" value={mockPlayerMetrics.metersGained.toString()} detail="Consistent line-breaking threat" accent="rose" surface="rose" />
        </div>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">AI performance rating per match</h3>
            <p className="mt-1 text-sm text-slate-600">Model-generated score to track game-by-game impact.</p>
          </div>
          <div className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700">
            Last match {latestRating.toFixed(1)}
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {mockPlayerMatchRatings.map((rating) => (
            <article key={rating.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="text-sm font-medium text-slate-900">{rating.match}</div>
              <div className="mt-1 text-xs text-slate-500">{new Date(rating.date).toLocaleDateString()}</div>
              <div className="mt-3 text-2xl font-semibold text-emerald-600">{rating.rating.toFixed(1)}</div>
            </article>
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <ProgressLineChart
            title="Performance trend"
            subtitle="Match rating progression over the last five months"
            data={progressData}
            stroke="#facc15"
          />
          {allowFullStats ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
              <h3 className="text-lg font-semibold text-slate-900">Full stats access</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                This view is reserved for coaches and admins. Players keep the focused performance trend and personal clips view.
              </p>
            </div>
          ) : null}
        </div>
        <div className="space-y-6">
          <PlayerClipGallery highlights={mockPlayerHighlights} mistakes={mockPlayerMistakes} />
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900">Development insight</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              You miss 30% of tackles on your left side, but your recovery speed is improving. Focus on body angle and footwork on first contact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
