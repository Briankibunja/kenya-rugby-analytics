"use client";
import React, { useState } from "react";

type ClipItem = {
  title: string;
  time: string;
  label: string;
};

type ClipTab = "highlights" | "mistakes";

export default function PlayerClipGallery({
  highlights,
  mistakes,
}: {
  highlights: ClipItem[];
  mistakes: ClipItem[];
}) {
  const [activeTab, setActiveTab] = useState<ClipTab>("highlights");
  const clips = activeTab === "highlights" ? highlights : mistakes;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Clip gallery</h3>
          <p className="mt-1 text-sm text-slate-600">Review key moments split into highlights and mistakes.</p>
        </div>
        <div className="inline-flex rounded-xl border border-slate-100 bg-slate-50 p-1">
          <button
            onClick={() => setActiveTab("highlights")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              activeTab === "highlights" ? "bg-emerald-50 text-emerald-700" : "text-slate-700 hover:text-slate-900"
            }`}
          >
            Highlights
          </button>
          <button
            onClick={() => setActiveTab("mistakes")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              activeTab === "mistakes" ? "bg-rose-50 text-rose-700" : "text-slate-700 hover:text-slate-900"
            }`}
          >
            Mistakes
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {clips.map((clip) => (
          <article key={`${clip.title}-${clip.time}`} className="rounded-2xl border border-slate-100 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-medium text-slate-900">{clip.title}</div>
                <div className="mt-1 text-sm text-slate-600">{clip.label}</div>
              </div>
              <span className="rounded-full border border-slate-100 bg-slate-50 px-3 py-1 text-xs text-slate-600">
                {clip.time}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}