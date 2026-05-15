"use client";
import React from "react";

export type TimelineEvent = {
  id: string;
  time: string;
  label: string;
  confidence: number;
  tone?: "emerald" | "amber" | "rose" | "sky";
};

const toneStyles: Record<NonNullable<TimelineEvent["tone"]>, string> = {
  emerald: "bg-emerald-400 text-slate-950",
  amber: "bg-amber-300 text-slate-950",
  rose: "bg-rose-400 text-white",
  sky: "bg-sky-300 text-slate-950",
};

export default function EventTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Event timeline</h3>
          <p className="text-sm text-slate-600">Click markers to jump to key match moments.</p>
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600">
          AI + manual review
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {events.map((event) => (
          <button
            key={event.id}
            type="button"
            className="flex w-full items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-left transition hover:bg-slate-100"
          >
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${toneStyles[event.tone ?? "emerald"]}`}>
              {event.time}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <span className="truncate font-medium text-slate-900">{event.label}</span>
                <span className="text-xs text-slate-600">{Math.round(event.confidence * 100)}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-400"
                  style={{ width: `${Math.max(10, event.confidence * 100)}%` }}
                />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
