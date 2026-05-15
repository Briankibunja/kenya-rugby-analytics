"use client";
import React, { useState } from "react";
import MetricCard from "../../components/MetricCard";
import PitchMap from "../../components/PitchMap";
import StatsBarChart from "../../components/StatsBarChart";
import PieChart from "../../components/PieChart";
import TabNavigation from "../../components/TabNavigation";
import FilterControls from "../../components/FilterControls";
import AdvancedStatsPanel from "../../components/AdvancedStatsPanel";
import OpponentAnalysis from "../../components/OpponentAnalysis";
import VideoBreakdownSection from "../../components/VideoBreakdownSection";
import { mockCoachMetrics, mockCoachAttackData, mockCoachAdvancedStats, mockCoachVideoClips, mockOpponentAnalysis } from "../../lib/mockData";

type TabType = "overview" | "analysis" | "video";

const PLAYERS = ["All Players", "10 (Fly-half)", "12 (Inside center)", "13 (Outside center)", "8 (Number 8)", "7 (Flanker)"];

export default function CoachPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [timeFilter, setTimeFilter] = useState<"all" | "first-half" | "second-half">("all");
  const [playerFilter, setPlayerFilter] = useState("");

  const advancedStats = [
    { label: "Tackles Made", value: mockCoachAdvancedStats.tacklesMadeFullMatch, detail: "12 first half, 16 second half", trend: "up" as const },
    { label: "Missed Tackles", value: mockCoachAdvancedStats.missedTacklesFullMatch, detail: "High accuracy rate", trend: "down" as const },
    { label: "Turnovers Won", value: mockCoachAdvancedStats.turnoversWon, detail: "Dominant breakdown play", trend: "up" as const },
    { label: "Turnovers Lost", value: mockCoachAdvancedStats.turnoversLost, detail: "4 from poor ball security", trend: "neutral" as const },
    { label: "Ruck Success Rate", value: `${mockCoachAdvancedStats.ruckSuccessRate}%`, detail: "Above competition average", trend: "up" as const },
    { label: "Ball Retention", value: `${mockCoachAdvancedStats.ballRetention}%`, detail: "Strong possession control", trend: "up" as const },
  ];

  return (
    <section className="space-y-6 text-slate-900">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Tactical intelligence</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Translate raw match data into selection decisions, opposition plans, and phase-by-phase improvements.
        </p>
      </div>

      {/* Match Overview - Always visible */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px] items-start">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <MetricCard
            label="Possession"
            value={`${mockCoachMetrics.possession}%`}
            detail="Territory control"
            surface="emerald"
            pie={{ data: [{ label: "Possession", value: mockCoachMetrics.possession, color: "#60a5fa" }, { label: "Opposition", value: 100 - mockCoachMetrics.possession, color: "#facc15" }], size: 72, innerRadius: 18 }}
          />

          <MetricCard
            label="Territory"
            value={`${mockCoachMetrics.territory}%`}
            detail="Field position advantage"
            accent="sky"
            surface="sky"
            pie={{ data: [{ label: "Territory", value: mockCoachMetrics.territory, color: "#34d399" }, { label: "Opposition", value: 100 - mockCoachMetrics.territory, color: "#f97316" }], size: 72, innerRadius: 18 }}
          />

          <MetricCard
            label="Tackle success"
            value={`${mockCoachMetrics.tackleSuccess}%`}
            detail="High accuracy"
            accent="emerald"
            surface="teal"
            pie={{ data: [{ label: "Success", value: mockCoachMetrics.tackleSuccess, color: "#10b981" }, { label: "Missed", value: 100 - mockCoachMetrics.tackleSuccess, color: "#ef4444" }], size: 72, innerRadius: 18 }}
          />

          <MetricCard label="Ruck speed" value={mockCoachMetrics.ruckSpeed} detail="Faster avg" accent="amber" surface="amber" />

          <MetricCard
            label="Lineout eff."
            value={`${mockCoachMetrics.lineoutEfficiency}%`}
            detail="Set-piece control"
            accent="rose"
            surface="rose"
            pie={{ data: [{ label: "Efficient", value: mockCoachMetrics.lineoutEfficiency, color: "#fb7185" }, { label: "Inefficient", value: 100 - mockCoachMetrics.lineoutEfficiency, color: "#94a3b8" }], size: 72, innerRadius: 18 }}
          />

          <MetricCard
            label="Turnovers"
            value={`${mockCoachMetrics.turnoversWon}/${mockCoachMetrics.turnoversLost}`}
            detail="Won/Lost"
            accent="sky"
            surface="indigo"
            pie={{ data: [{ label: "Won", value: mockCoachMetrics.turnoversWon, color: "#60a5fa" }, { label: "Lost", value: mockCoachMetrics.turnoversLost, color: "#f97316" }], size: 72, innerRadius: 18 }}
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="rounded-t-3xl border-l border-r border-t border-slate-200 bg-white overflow-hidden">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
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
        <div className="space-y-6">
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
        <div className="space-y-6">
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
