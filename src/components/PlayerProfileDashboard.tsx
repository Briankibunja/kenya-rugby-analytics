import React from "react";

type PlayerProfile = {
  name: string;
  position: string;
  jerseyNumber: number;
  team: string;
  dominantSide: string;
  age: number;
};

export default function PlayerProfileDashboard({
  profile,
  latestRating,
}: {
  profile: PlayerProfile;
  latestRating: number;
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Profile dashboard</h3>
          <p className="mt-1 text-sm text-white/60">Personal identity and current AI performance pulse.</p>
        </div>
        <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-200">
          AI Score {latestRating.toFixed(1)}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="text-xs uppercase tracking-wide text-white/45">Name</div>
          <div className="mt-1 font-medium text-white">{profile.name}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="text-xs uppercase tracking-wide text-white/45">Position</div>
          <div className="mt-1 font-medium text-white">{profile.position}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="text-xs uppercase tracking-wide text-white/45">Jersey</div>
          <div className="mt-1 font-medium text-white">#{profile.jerseyNumber}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="text-xs uppercase tracking-wide text-white/45">Team</div>
          <div className="mt-1 font-medium text-white">{profile.team}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="text-xs uppercase tracking-wide text-white/45">Dominant Side</div>
          <div className="mt-1 font-medium text-white">{profile.dominantSide}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="text-xs uppercase tracking-wide text-white/45">Age</div>
          <div className="mt-1 font-medium text-white">{profile.age}</div>
        </div>
      </div>
    </section>
  );
}