"use client";
import React from "react";

const markers = [
  { time: "03:12", label: "Tackle", tone: "bg-emerald-400" },
  { time: "11:48", label: "Ruck", tone: "bg-amber-300" },
  { time: "22:04", label: "Lineout", tone: "bg-sky-300" },
  { time: "38:20", label: "Try", tone: "bg-rose-400" },
];

function VideoPlayer({ src }: { src?: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
      <div className="flex aspect-[16/6] items-center justify-center bg-[linear-gradient(180deg,#111111_0%,#050505_100%)] text-white">
        <div className="text-center">
          <div className="text-lg font-semibold">Video Player</div>
          <div className="mt-1 text-sm text-white/60">Stabilized footage, clip review, and jump-to-event controls</div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-white/5 px-4 py-2.5">
        <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-white/55">
          <span>Event markers</span>
          <span>12:32 / 80:00</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {markers.map((marker) => (
            <button
              key={`${marker.time}-${marker.label}`}
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-white transition hover:bg-white/10"
            >
              <span className={`h-2.5 w-2.5 rounded-full ${marker.tone}`} />
              <span>{marker.time}</span>
              <span className="text-white/55">{marker.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(VideoPlayer);
