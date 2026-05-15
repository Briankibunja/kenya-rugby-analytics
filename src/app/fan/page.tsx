import React from "react";
import ClipList from "../../components/ClipList";
import MetricCard from "../../components/MetricCard";
import StatsBarChart from "../../components/StatsBarChart";
import VideoPlayer from "../../components/VideoPlayer";
import { mockFanSummaryData, mockFanHighlights, mockPlayerMetrics, mockPlayerProfile } from "../../lib/mockData";

export default function FanPage() {
  const summaryData = mockFanSummaryData;

  return (
    <section className="space-y-6 text-slate-900">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Fan panel</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Mobile-first, card-based rugby storytelling with summary stats, highlight reels, and top performer callouts.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px] items-start">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Scoreline" value="KCB 24 - 18 Kabras" detail="Final result from the latest fixture" surface="emerald" />
          <MetricCard label="Key stats" value="4 tries" detail="Simple snapshot of the most important match numbers" accent="sky" surface="sky" />
          <MetricCard label="Ruck control" value="61%" detail="Team A dominated the breakdown" accent="amber" surface="amber" />
          <MetricCard label="Top performer" value={mockPlayerProfile.name} detail={`${mockPlayerProfile.position} • ${mockPlayerProfile.team}`} accent="rose" surface="rose" />
        </div>

        <div className="" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Big moments" value="7" detail="Tries, line breaks, and decisive tackles" accent="sky" surface="violet" />
        <MetricCard label="Tries" value="4" detail="Automatically pulled into the fan feed" accent="emerald" surface="lime" pie={{ data: [{ label: 'Tries', value: 4, color: '#60a5fa' }, { label: 'Other', value: Math.max(0, 10 - 4), color: '#e5e7eb' }], size: 64, innerRadius: 16 }} />
        <MetricCard label="Line breaks" value="9" detail="Quick view of attacking threat" accent="amber" surface="teal" />
        <MetricCard label="Tackles" value="32" detail="Defensive pressure in one glance" accent="rose" surface="indigo" pie={{ data: [{ label: 'Tackles', value: 32, color: '#fb7185' }, { label: 'Other', value: Math.max(0, 50 - 32), color: '#e5e7eb' }], size: 64, innerRadius: 16 }} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
        <div className="space-y-6">
          <VideoPlayer />
          <ClipList title="Auto-generated highlight reel" clips={mockFanHighlights} />

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Match summary</h3>
                <p className="mt-1 text-sm text-slate-600">Scoreline and the few stats most fans want first.</p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <MetricCard label="Scoreline" value="24 - 18" detail="KCB beat Kabras in the latest fixture" surface="emerald" />
              <MetricCard label="Dominance" value="Team A" detail="Won the breakdown and field territory" accent="sky" surface="sky" />
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Player spotlight</h3>
                <p className="mt-1 text-sm text-slate-600">Top performer card built for fans who want the story behind the score.</p>
              </div>
              <div className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-sm font-semibold text-rose-700">
                Impact 8.1
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Name</div>
                <div className="mt-1 text-lg font-semibold text-slate-900">{mockPlayerProfile.name}</div>
                <div className="mt-2 text-sm text-slate-600">{mockPlayerProfile.position} • #{mockPlayerProfile.jerseyNumber}</div>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Why it mattered</div>
                <div className="mt-1 text-sm leading-6 text-slate-600">
                  {mockPlayerMetrics.carries} carries, {mockPlayerMetrics.metersGained} meters gained, and {mockPlayerMetrics.tacklesMade} tackles made.
                </div>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Attack</div>
                <div className="mt-1 text-2xl font-semibold text-slate-900">{mockPlayerMetrics.carries}</div>
                <div className="mt-1 text-sm text-slate-600">Carries in the match</div>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Defense</div>
                <div className="mt-1 text-2xl font-semibold text-slate-900">{mockPlayerMetrics.tacklesMade}</div>
                <div className="mt-1 text-sm text-slate-600">Tackles completed</div>
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
