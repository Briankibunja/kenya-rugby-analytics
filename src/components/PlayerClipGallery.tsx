"use client";
import React, { useState } from "react";

type ClipItem = {
  title: string;
  time: string;
  label: string;
};

type ClipTab = "highlights" | "mistakes";

function PlayerClipGallery({
  highlights,
  mistakes,
}: {
  highlights: ClipItem[];
  mistakes: ClipItem[];
}) {
  const [activeTab, setActiveTab] = useState<ClipTab>("highlights");
  const clips = activeTab === "highlights" ? highlights : mistakes;

  return (
    <section className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">Clip gallery</h3>
          <p className="mt-1 text-sm text-white/60">Review key moments split into highlights and mistakes.</p>
        </div>
        <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1">
          <button
            onClick={() => setActiveTab("highlights")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              activeTab === "highlights" ? "bg-emerald-500/15 text-emerald-200" : "text-white/65 hover:text-white"
            }`}
          >
            Highlights
          </button>
          <button
            onClick={() => setActiveTab("mistakes")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              activeTab === "mistakes" ? "bg-rose-500/15 text-rose-200" : "text-white/65 hover:text-white"
            }`}
          >
            Mistakes
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {clips.map((clip) => (
          <article key={`${clip.title}-${clip.time}`} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-medium text-white">{clip.title}</div>
                <div className="mt-1 text-sm text-white/60">{clip.label}</div>
              </div>
              <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/60">
                {clip.time}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default React.memo(PlayerClipGallery);