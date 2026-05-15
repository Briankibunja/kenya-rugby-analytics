import React from "react";
import PieChart from "./PieChart";

type Slice = { label: string; value: number; color?: string };

type MetricCardProps = {
  label: string;
  value: string;
  detail?: string;
  accent?: string;
  surface?: string;
  pie?: { data: Slice[]; size?: number; innerRadius?: number; showLegend?: boolean };
};

export default function MetricCard({ label, value, detail, accent = "emerald", surface, pie }: MetricCardProps) {
  const accentClasses: Record<string, string> = {
    emerald: "ring-1 ring-emerald-100/40",
    amber: "ring-1 ring-amber-100/40",
    rose: "ring-1 ring-rose-100/40",
    sky: "ring-1 ring-sky-100/40",
    teal: "ring-1 ring-teal-100/40",
    indigo: "ring-1 ring-indigo-100/40",
    violet: "ring-1 ring-violet-100/40",
    lime: "ring-1 ring-lime-100/40",
  };

  const surfaceClasses: Record<string, string> = {
    emerald: "bg-gradient-to-br from-emerald-200 via-emerald-100 to-emerald-50 border-emerald-400 text-emerald-950 shadow-emerald-200/60",
    amber: "bg-gradient-to-br from-amber-200 via-amber-100 to-amber-50 border-amber-400 text-amber-950 shadow-amber-200/60",
    rose: "bg-gradient-to-br from-rose-200 via-rose-100 to-rose-50 border-rose-400 text-rose-950 shadow-rose-200/60",
    sky: "bg-gradient-to-br from-sky-200 via-sky-100 to-sky-50 border-sky-400 text-sky-950 shadow-sky-200/60",
    teal: "bg-gradient-to-br from-teal-200 via-teal-100 to-teal-50 border-teal-400 text-teal-950 shadow-teal-200/60",
    indigo: "bg-gradient-to-br from-indigo-200 via-indigo-100 to-indigo-50 border-indigo-400 text-indigo-950 shadow-indigo-200/60",
    violet: "bg-gradient-to-br from-violet-200 via-violet-100 to-violet-50 border-violet-400 text-violet-950 shadow-violet-200/60",
    lime: "bg-gradient-to-br from-lime-200 via-lime-100 to-lime-50 border-lime-400 text-lime-950 shadow-lime-200/60",
  };

  const selectedSurface = surface ?? accent;

  return (
    <article className={`relative rounded-2xl border p-4 shadow-md ${surfaceClasses[selectedSurface] ?? surfaceClasses.emerald} ${accentClasses[accent] ?? accentClasses.emerald}`}>
      <div className="flex items-start justify-between">
        <div className="text-xs uppercase tracking-[0.24em] text-slate-700/80">{label}</div>
        {pie ? (
          <div className="ml-3 -mt-2">
            <PieChart data={pie.data} size={pie.size ?? 72} innerRadius={pie.innerRadius ?? 20} showLegend={false} />
          </div>
        ) : null}
      </div>

      <div className="mt-3 text-3xl font-semibold text-slate-950">{value}</div>
      {detail ? <p className="mt-2 text-sm leading-6 text-slate-700">{detail}</p> : null}
    </article>
  );
}
