import React from "react";
import dynamic from "next/dynamic";
import ClipList from "../../components/ClipList";
import MetricCard from "../../components/MetricCard";
import { mockFanSummaryData, mockFanHighlights, mockPlayerMetrics, mockPlayerProfile } from "../../lib/mockData";

const StatsBarChart = dynamic(() => import("../../components/StatsBarChart"), {
  ssr: false,
  loading: () => <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/50">Loading stats…</div>,
});
const VideoPlayer = dynamic(() => import("../../components/VideoPlayer"), {
  ssr: false,
  loading: () => <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/50">Loading video…</div>,
});

export default function FanPage() {
  const summaryData = mockFanSummaryData;

  return (
    <section className="space-y-6 text-white">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Fan panel</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/60">
          Mobile-first, card-based rugby storytelling with summary stats, highlight reels, and top performer callouts.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Scoreline" value="KCB 24 - 18 Kabras" detail="Final result from the latest fixture" surface="emerald" chart={{ value: 24, total: 42, valueLabel: "KCB", remainderLabel: "Kabras", colors: ["#22c55e", "rgba(255,255,255,0.12)"], showCenterLabel: false }} />
        <MetricCard label="Key stats" value="4 tries" detail="Simple snapshot of the most important match numbers" accent="sky" surface="sky" chart={{ value: 4, total: 10, valueLabel: "Tries", remainderLabel: "Other", colors: ["#38bdf8", "rgba(255,255,255,0.12)"], showCenterLabel: false }} />
        <MetricCard label="Ruck control" value="61%" detail="Team A dominated the breakdown" accent="amber" surface="amber" chart={{ value: 61, total: 100, valueLabel: "Control", remainderLabel: "Gap", colors: ["#f59e0b", "rgba(255,255,255,0.12)"], showCenterLabel: false }} />
        <MetricCard label="Top performer" value={mockPlayerProfile.name} detail={`${mockPlayerProfile.position} • ${mockPlayerProfile.team}`} accent="rose" surface="rose" chart={{ value: 81, total: 100, valueLabel: "Impact", remainderLabel: "Rest", colors: ["#fb7185", "rgba(255,255,255,0.12)"], showCenterLabel: false }} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Big moments" value="7" detail="Tries, line breaks, and decisive tackles" accent="sky" surface="violet" chart={{ value: 7, total: 12, valueLabel: "Big", remainderLabel: "Other", colors: ["#8b5cf6", "rgba(255,255,255,0.12)"], showCenterLabel: false }} />
        <MetricCard label="Tries" value="4" detail="Automatically pulled into the fan feed" accent="emerald" surface="lime" chart={{ value: 4, total: 6, valueLabel: "Tries", remainderLabel: "Other", colors: ["#84cc16", "rgba(255,255,255,0.12)"], showCenterLabel: false }} />
        <MetricCard label="Line breaks" value="9" detail="Quick view of attacking threat" accent="amber" surface="teal" chart={{ value: 9, total: 12, valueLabel: "Breaks", remainderLabel: "Other", colors: ["#14b8a6", "rgba(255,255,255,0.12)"], showCenterLabel: false }} />
        <MetricCard label="Tackles" value="32" detail="Defensive pressure in one glance" accent="rose" surface="indigo" chart={{ value: 32, total: 40, valueLabel: "Tackles", remainderLabel: "Target", colors: ["#6366f1", "rgba(255,255,255,0.12)"], showCenterLabel: false }} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
        <div className="space-y-6">
          <VideoPlayer />
          <ClipList title="Auto-generated highlight reel" clips={mockFanHighlights} />

          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Match summary</h3>
                <p className="mt-1 text-sm text-white/60">Scoreline and the few stats most fans want first.</p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <MetricCard label="Scoreline" value="24 - 18" detail="KCB beat Kabras in the latest fixture" surface="emerald" chart={{ value: 24, total: 42, valueLabel: "KCB", remainderLabel: "Kabras", colors: ["#22c55e", "rgba(255,255,255,0.12)"], showCenterLabel: false }} />
              <MetricCard label="Dominance" value="Team A" detail="Won the breakdown and field territory" accent="sky" surface="sky" chart={{ value: 61, total: 100, valueLabel: "Team A", remainderLabel: "Team B", colors: ["#38bdf8", "rgba(255,255,255,0.12)"], showCenterLabel: false }} />
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Player spotlight</h3>
                <p className="mt-1 text-sm text-white/60">Top performer card built for fans who want the story behind the score.</p>
              </div>
              <div className="rounded-full border border-rose-400/20 bg-rose-500/10 px-3 py-1 text-sm font-semibold text-rose-200">
                Impact 8.1
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-white/45">Name</div>
                <div className="mt-1 text-lg font-semibold text-white">{mockPlayerProfile.name}</div>
                <div className="mt-2 text-sm text-white/60">{mockPlayerProfile.position} • #{mockPlayerProfile.jerseyNumber}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-white/45">Why it mattered</div>
                <div className="mt-1 text-sm leading-6 text-white/60">
                  {mockPlayerMetrics.carries} carries, {mockPlayerMetrics.metersGained} meters gained, and {mockPlayerMetrics.tacklesMade} tackles made.
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-white/45">Attack</div>
                <div className="mt-1 text-2xl font-semibold text-white">{mockPlayerMetrics.carries}</div>
                <div className="mt-1 text-sm text-white/60">Carries in the match</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-white/45">Defense</div>
                <div className="mt-1 text-2xl font-semibold text-white">{mockPlayerMetrics.tacklesMade}</div>
                <div className="mt-1 text-sm text-white/60">Tackles completed</div>
              </div>
            </div>
          </section>

          <StatsBarChart
            title="Visual stats"
            subtitle="Simple charts for tries, tackles, rucks, and breaks"
            data={summaryData}
            barColor="#34d399"
          />
        </div>
      </div>
    </section>
  );
}
