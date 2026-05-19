"use client";
import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import MetricCard from "../../components/MetricCard";
import TabNavigation from "../../components/TabNavigation";
import { mockCoachMetrics, mockCoachAttackData, mockCoachAdvancedStats, mockCoachVideoClips, mockOpponentAnalysis } from "../../lib/mockData";

const PitchMap = dynamic(() => import("../../components/PitchMap"), {
  ssr: false,
  loading: () => <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/50">Loading pitch map…</div>,
});
const StatsBarChart = dynamic(() => import("../../components/StatsBarChart"), {
  ssr: false,
  loading: () => <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/50">Loading chart…</div>,
});
const FilterControls = dynamic(() => import("../../components/FilterControls"), {
  ssr: false,
});
const AdvancedStatsPanel = dynamic(() => import("../../components/AdvancedStatsPanel"), {
  ssr: false,
});
const OpponentAnalysis = dynamic(() => import("../../components/OpponentAnalysis"), {
  ssr: false,
});
const VideoBreakdownSection = dynamic(() => import("../../components/VideoBreakdownSection"), {
  ssr: false,
});

type TabType = "overview" | "analysis" | "video";

const PLAYERS = ["All Players", "10 (Fly-half)", "12 (Inside center)", "13 (Outside center)", "8 (Number 8)", "7 (Flanker)"];

export default function CoachPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [timeFilter, setTimeFilter] = useState<"all" | "first-half" | "second-half">("all");
  const [playerFilter, setPlayerFilter] = useState("");

  const advancedStats = useMemo(
    () => [
      { label: "Tackles Made", value: mockCoachAdvancedStats.tacklesMadeFullMatch, detail: "12 first half, 16 second half", trend: "up" as const },
      { label: "Missed Tackles", value: mockCoachAdvancedStats.missedTacklesFullMatch, detail: "High accuracy rate", trend: "down" as const },
      { label: "Turnovers Won", value: mockCoachAdvancedStats.turnoversWon, detail: "Dominant breakdown play", trend: "up" as const },
      { label: "Turnovers Lost", value: mockCoachAdvancedStats.turnoversLost, detail: "4 from poor ball security", trend: "neutral" as const },
      { label: "Ruck Success Rate", value: `${mockCoachAdvancedStats.ruckSuccessRate}%`, detail: "Above competition average", trend: "up" as const },
      { label: "Ball Retention", value: `${mockCoachAdvancedStats.ballRetention}%`, detail: "Strong possession control", trend: "up" as const },
    ],
    []
  );

  return (
    <section className="space-y-4 text-white">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Tactical intelligence</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/60">
          Translate raw match data into selection decisions, opposition plans, and phase-by-phase improvements.
        </p>
      </div>

      {/* Match Overview - Always visible */}
      <div className="grid gap-4 lg:grid-cols-1 items-start">
        <div className="w-full grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <MetricCard
            label="Possession"
            value={`${mockCoachMetrics.possession}%`}
            detail="Territory control"
            surface="emerald"
            chart={{ value: mockCoachMetrics.possession, total: 100, valueLabel: "Possession", remainderLabel: "Opposition", colors: ["#22c55e", "rgba(255,255,255,0.14)"], showCenterLabel: false }}
          />

          <MetricCard
            label="Territory"
            value={`${mockCoachMetrics.territory}%`}
            detail="Field position advantage"
            accent="sky"
            surface="sky"
            chart={{ value: mockCoachMetrics.territory, total: 100, valueLabel: "Territory", remainderLabel: "Opposition", colors: ["#38bdf8", "rgba(255,255,255,0.12)"], showCenterLabel: false }}
          />

          <MetricCard
            label="Tackle success"
            value={`${mockCoachMetrics.tackleSuccess}%`}
            detail="High accuracy"
            accent="emerald"
            surface="teal"
            chart={{ value: mockCoachMetrics.tackleSuccess, total: 100, valueLabel: "Success", remainderLabel: "Misses", colors: ["#14b8a6", "rgba(255,255,255,0.14)"], showCenterLabel: false }}
          />

          <MetricCard
            label="Ruck speed"
            value={mockCoachMetrics.ruckSpeed}
            detail="Faster avg"
            accent="amber"
            surface="amber"
            chart={{ value: 68, total: 100, valueLabel: "Fast", remainderLabel: "Room", colors: ["#f59e0b", "rgba(255,255,255,0.14)"], showCenterLabel: false }}
          />

          <MetricCard
            label="Lineout eff."
            value={`${mockCoachMetrics.lineoutEfficiency}%`}
            detail="Set-piece control"
            accent="rose"
            surface="rose"
            chart={{ value: mockCoachMetrics.lineoutEfficiency, total: 100, valueLabel: "Eff.", remainderLabel: "Gap", colors: ["#fb7185", "rgba(255,255,255,0.14)"], showCenterLabel: false }}
          />

          <MetricCard
            label="Turnovers"
            value={`${mockCoachMetrics.turnoversWon}/${mockCoachMetrics.turnoversLost}`}
            detail="Won/Lost"
            accent="sky"
            surface="indigo"
            chart={{ value: mockCoachMetrics.turnoversWon, total: mockCoachMetrics.turnoversWon + mockCoachMetrics.turnoversLost, valueLabel: "Won", remainderLabel: "Lost", colors: ["#818cf8", "rgba(255,255,255,0.14)"], showCenterLabel: false }}
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="overflow-hidden rounded-t-3xl border-l border-r border-t border-white/10 bg-black/25">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <PitchMap />
            <StatsBarChart
              title="Preferred attack side"
              subtitle="Breakdown of ball carries and strike direction"
              data={mockCoachAttackData}
              barColor="#60a5fa"
            />
          </div>
        </div>
      )}

      {/* ANALYSIS TAB */}
      {activeTab === "analysis" && (
        <div className="space-y-4">
          {/* Filters */}
          <FilterControls
            timeFilter={timeFilter}
            playerFilter={playerFilter}
            players={PLAYERS}
            onTimeFilterChange={setTimeFilter}
            onPlayerFilterChange={setPlayerFilter}
          />

          {/* Advanced Stats */}
          <AdvancedStatsPanel stats={advancedStats} />

          {/* Opponent Analysis */}
          <OpponentAnalysis
            preferredAttackSide={mockOpponentAnalysis.preferredAttackSide}
            preferredAttackPercentage={mockOpponentAnalysis.preferredAttackPercentage}
            weakDefensiveZones={mockOpponentAnalysis.weakDefensiveZones}
            strongAreas={mockOpponentAnalysis.strongAreas}
            patterns={mockOpponentAnalysis.patterns}
            keyPlayers={mockOpponentAnalysis.keyPlayers}
          />
        </div>
      )}

      {/* VIDEO BREAKDOWN TAB */}
      {activeTab === "video" && (
        <div className="space-y-4">
          {/* Filters */}
          <FilterControls
            timeFilter={timeFilter}
            playerFilter={playerFilter}
            players={PLAYERS}
            onTimeFilterChange={setTimeFilter}
            onPlayerFilterChange={setPlayerFilter}
          />

          {/* Video Breakdown */}
          <VideoBreakdownSection
            clips={mockCoachVideoClips}
            onClipClick={(clip) => console.log("Video clip clicked:", clip)}
          />
        </div>
      )}
    </section>
  );
}
