import React from "react";

export type ClipItem = {
  title: string;
  time: string;
  label: string;
};

function ClipList({ title, clips }: { title: string; clips: ClipItem[] }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">Fan feed</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{title}</h3>
        </div>
        <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
          {clips.length} clips
        </span>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {clips.map((clip) => (
          <article
            key={`${clip.title}-${clip.time}`}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="text-sm font-semibold text-white">{clip.title}</div>
                <div className="text-sm leading-6 text-white/60">{clip.label}</div>
              </div>
              <span className="shrink-0 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-semibold text-white/70 shadow-sm">
                {clip.time}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default React.memo(ClipList);
