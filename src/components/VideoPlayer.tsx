"use client";
import React from "react";

const markers = [
  { time: "03:12", label: "Tackle", tone: "bg-emerald-400" },
  { time: "11:48", label: "Ruck", tone: "bg-amber-300" },
  { time: "22:04", label: "Lineout", tone: "bg-sky-300" },
  { time: "38:20", label: "Try", tone: "bg-rose-400" },
];

export default function VideoPlayer({ src }: { src?: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
      <div className="aspect-[16/6] flex items-center justify-center bg-[linear-gradient(180deg,#f8faf6_0%,#ffffff_100%)] text-slate-900">
        <div className="text-center">
          <div className="text-lg font-semibold">Video Player</div>
          <div className="mt-1 text-sm text-slate-600">Stabilized footage, clip review, and jump-to-event controls</div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-50 px-4 py-2.5">
        <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-slate-600">
          <span>Event markers</span>
          <span>12:32 / 80:00</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {markers.map((marker) => (
            <button
              key={`${marker.time}-${marker.label}`}
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 transition hover:bg-slate-50"
            >
              <span className={`h-2.5 w-2.5 rounded-full ${marker.tone}`} />
              <span>{marker.time}</span>
              <span className="text-slate-500">{marker.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
