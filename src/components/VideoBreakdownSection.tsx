"use client";
import React from "react";
import { Play } from "lucide-react";

interface VideoClip {
  title: string;
  label: string;
  clips: number;
  time: string;
}

interface VideoBreakdownSectionProps {
  clips: VideoClip[];
  onClipClick?: (clip: VideoClip) => void;
}

export default function VideoBreakdownSection({ clips, onClipClick }: VideoBreakdownSectionProps) {
  const accentThemes = [
    {
      ring: "from-emerald-400/35 via-emerald-500/18 to-transparent",
      badge: "bg-emerald-500/15 text-emerald-100 border-emerald-400/20",
      dot: "bg-emerald-300",
      glow: "group-hover:shadow-emerald-500/25",
    },
    {
      ring: "from-sky-400/35 via-sky-500/18 to-transparent",
      badge: "bg-sky-500/15 text-sky-100 border-sky-400/20",
      dot: "bg-sky-300",
      glow: "group-hover:shadow-sky-500/25",
    },
    {
      ring: "from-amber-400/35 via-amber-500/18 to-transparent",
      badge: "bg-amber-500/15 text-amber-100 border-amber-400/20",
      dot: "bg-amber-300",
      glow: "group-hover:shadow-amber-500/25",
    },
    {
      ring: "from-rose-400/35 via-rose-500/18 to-transparent",
      badge: "bg-rose-500/15 text-rose-100 border-rose-400/20",
      dot: "bg-rose-300",
      glow: "group-hover:shadow-rose-500/25",
    },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
      <div className="border-b border-slate-200 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 px-5 py-5 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Video Analysis</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight">Video Breakdown</h3>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              Browse the highest-value clip categories and jump straight into the moments that matter.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-right backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">Clip Groups</p>
            <p className="mt-1 text-2xl font-bold text-white">{clips.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 xl:grid-cols-4">
        {clips.map((clip, idx) => (
          <button
            key={idx}
            onClick={() => onClipClick?.(clip)}
            className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-5 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-xl ${accentThemes[idx % accentThemes.length].glow}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${accentThemes[idx % accentThemes.length].ring} opacity-0 transition duration-300 group-hover:opacity-100`} />
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60" />
            <div className="absolute right-4 top-4 rounded-full border border-black/5 bg-white/80 p-2 shadow-sm transition group-hover:scale-105">
              <Play size={16} className="text-slate-900" fill="currentColor" />
            </div>

            <div className="relative space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                    <span className={`h-2.5 w-2.5 rounded-full ${accentThemes[idx % accentThemes.length].dot}`} />
                    {clip.label}
                  </div>
                  <h4 className="mt-2 text-sm font-semibold text-slate-950 transition group-hover:text-slate-900">
                    {clip.title}
                  </h4>
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Tap to inspect this segment and review the related clips.
                  </p>
                </div>
                <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap ${accentThemes[idx % accentThemes.length].badge}`}>
                  {clip.clips} clips
                </span>
              </div>

              <div className="rounded-2xl border border-white/70 bg-white/70 px-3 py-2 backdrop-blur-sm">
                <p className="text-xs font-medium text-slate-500">Match window</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{clip.time}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="border-t border-slate-200 bg-gradient-to-r from-slate-50 to-emerald-50 px-5 py-4">
        <p className="text-sm text-slate-700">
          Tip: click any statistic in the Analysis tab to filter directly to the matching clip group.
        </p>
      </div>
    </div>
  );
}
