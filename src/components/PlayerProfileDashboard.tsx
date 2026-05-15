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
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Profile dashboard</h3>
          <p className="mt-1 text-sm text-slate-600">Personal identity and current AI performance pulse.</p>
        </div>
        <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
          AI Score {latestRating.toFixed(1)}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
          <div className="text-xs uppercase tracking-wide text-slate-500">Name</div>
          <div className="mt-1 font-medium text-slate-900">{profile.name}</div>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
          <div className="text-xs uppercase tracking-wide text-slate-500">Position</div>
          <div className="mt-1 font-medium text-slate-900">{profile.position}</div>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
          <div className="text-xs uppercase tracking-wide text-slate-500">Jersey</div>
          <div className="mt-1 font-medium text-slate-900">#{profile.jerseyNumber}</div>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
          <div className="text-xs uppercase tracking-wide text-slate-500">Team</div>
          <div className="mt-1 font-medium text-slate-900">{profile.team}</div>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
          <div className="text-xs uppercase tracking-wide text-slate-500">Dominant Side</div>
          <div className="mt-1 font-medium text-slate-900">{profile.dominantSide}</div>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
          <div className="text-xs uppercase tracking-wide text-slate-500">Age</div>
          <div className="mt-1 font-medium text-slate-900">{profile.age}</div>
        </div>
      </div>
    </section>
  );
}