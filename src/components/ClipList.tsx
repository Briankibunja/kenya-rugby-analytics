import React from "react";

export type ClipItem = {
  title: string;
  time: string;
  label: string;
};

export default function ClipList({ title, clips }: { title: string; clips: ClipItem[] }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Fan feed</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">{title}</h3>
        </div>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {clips.length} clips
        </span>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {clips.map((clip) => (
          <article
            key={`${clip.title}-${clip.time}`}
            className="rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-slate-50 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="text-sm font-semibold text-slate-900">{clip.title}</div>
                <div className="text-sm leading-6 text-slate-600">{clip.label}</div>
              </div>
              <span className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                {clip.time}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
