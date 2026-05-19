import React from "react";
import dynamic from "next/dynamic";

type MetricCardProps = {
  label: string;
  value: string;
  detail?: string;
  accent?: string;
  surface?: string;
  chart?: {
    value: number;
    total: number;
    valueLabel?: string;
    remainderLabel?: string;
    colors?: [string, string];
    showCenterLabel?: boolean;
  };
};

function MetricCard({ label, value, detail, accent = "emerald", surface, chart }: MetricCardProps) {
  const accentClasses: Record<string, string> = {
    emerald: "ring-1 ring-emerald-400/25",
    amber: "ring-1 ring-amber-400/25",
    rose: "ring-1 ring-rose-400/25",
    sky: "ring-1 ring-sky-400/25",
    teal: "ring-1 ring-teal-400/25",
    indigo: "ring-1 ring-indigo-400/25",
    violet: "ring-1 ring-violet-400/25",
    lime: "ring-1 ring-lime-400/25",
  };

  const surfaceClasses: Record<string, string> = {
    emerald: "bg-[linear-gradient(180deg,rgba(17,131,74,0.25),rgba(5,5,5,0.92))] border-emerald-400/40 text-white shadow-emerald-500/20",
    amber: "bg-[linear-gradient(180deg,rgba(245,158,11,0.2),rgba(5,5,5,0.92))] border-amber-400/40 text-white shadow-amber-500/20",
    rose: "bg-[linear-gradient(180deg,rgba(200,31,31,0.25),rgba(5,5,5,0.92))] border-rose-400/40 text-white shadow-rose-500/20",
    sky: "bg-[linear-gradient(180deg,rgba(14,165,233,0.2),rgba(5,5,5,0.92))] border-sky-400/40 text-white shadow-sky-500/20",
    teal: "bg-[linear-gradient(180deg,rgba(20,184,166,0.22),rgba(5,5,5,0.92))] border-teal-400/40 text-white shadow-teal-500/20",
    indigo: "bg-[linear-gradient(180deg,rgba(99,102,241,0.22),rgba(5,5,5,0.92))] border-indigo-400/40 text-white shadow-indigo-500/20",
    violet: "bg-[linear-gradient(180deg,rgba(139,92,246,0.22),rgba(5,5,5,0.92))] border-violet-400/40 text-white shadow-violet-500/20",
    lime: "bg-[linear-gradient(180deg,rgba(132,204,22,0.2),rgba(5,5,5,0.92))] border-lime-400/40 text-white shadow-lime-500/20",
  };

  const selectedSurface = surface ?? accent;
  const chartValue = chart ? Math.max(0, Math.min(chart.value, chart.total)) : 0;
  const chartRemainder = chart ? Math.max(0, chart.total - chartValue) : 0;
  const chartData = chart
    ? [
        { name: chart.valueLabel ?? label, value: chartValue },
        { name: chart.remainderLabel ?? "Rest", value: chartRemainder },
      ]
    : [];

  const defaultChartPalettes: Record<string, [string, string]> = {
    emerald: ["#10B981", "rgba(255,255,255,0.12)"],
    amber: ["#F59E0B", "rgba(255,255,255,0.12)"],
    rose: ["#E11D48", "rgba(255,255,255,0.12)"],
    sky: ["#0EA5E9", "rgba(255,255,255,0.12)"],
    teal: ["#14B8A6", "rgba(255,255,255,0.12)"],
    indigo: ["#6366F1", "rgba(255,255,255,0.12)"],
    violet: ["#8B5CF6", "rgba(255,255,255,0.12)"],
    lime: ["#84CC16", "rgba(255,255,255,0.12)"],
  };

  const fillColors: [string, string] = chart?.colors ?? defaultChartPalettes[accent] ?? ["#10B981", "rgba(255,255,255,0.12)"];

  return (
    <article className={`relative flex min-h-[136px] flex-col justify-between overflow-hidden rounded-2xl border p-4 shadow-md sm:p-5 ${surfaceClasses[selectedSurface] ?? surfaceClasses.emerald} ${accentClasses[accent] ?? accentClasses.emerald}`}>
      <div className="relative z-10 flex h-full flex-col justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">{label}</div>
          <div className="mt-2 text-3xl font-bold leading-none tracking-tight text-white">{value}</div>
          {detail ? <p className="mt-2 max-w-[30ch] text-sm leading-5 text-white/72">{detail}</p> : null}
        </div>

        {chart && (
          <div className="relative mt-1 flex justify-end">
            <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24">
              {/* Simple SVG donut fallback so charts render without recharts */}
              <svg viewBox="0 0 36 36" className="h-full w-full">
                <defs>
                  <linearGradient id={`g-${label.replace(/\s+/g, "-")}`} x1="0%" x2="100%">
                    <stop offset="0%" stopColor={fillColors[0]} />
                    <stop offset="100%" stopColor={fillColors[0]} />
                  </linearGradient>
                </defs>
                <circle cx="18" cy="18" r="15" fill="none" stroke={fillColors[1]} strokeWidth="6" />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke={`url(#g-${label.replace(/\s+/g, "-")}`}
                  strokeWidth="6"
                  strokeDasharray={`${(chartValue / (chart?.total || 1)) * 94} 94`}
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
              </svg>
              {chart.showCenterLabel !== false && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-center">
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
                    {chart.valueLabel ?? label}
                    <div className="mt-1 text-sm font-black tracking-tight text-white">{Math.round((chartValue / (chart.total || 1)) * 100)}%</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default React.memo(MetricCard);
