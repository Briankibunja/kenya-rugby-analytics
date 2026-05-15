"use client";
import React, { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Datum = {
  name: string;
  player: number;
  team: number;
};

export default function PlayerVsTeamChart({ data }: { data: Datum[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
      <h3 className="text-lg font-semibold text-slate-900">Player vs Team Average</h3>
      <p className="mt-1 text-sm text-slate-600">Performance trend compared to overall squad baseline.</p>
      <div className="mt-6 h-64">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={280} minHeight={240}>
            <LineChart data={data} margin={{ top: 8, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="rgba(15,23,42,0.08)" vertical={false} />
              <XAxis dataKey="name" stroke="rgba(15,23,42,0.45)" fontSize={12} />
              <YAxis stroke="rgba(15,23,42,0.45)" fontSize={12} />
              <Tooltip
                contentStyle={{ background: "#ffffff", border: "1px solid rgba(15,23,42,0.12)", borderRadius: 14, color: "#0f172a" }}
                labelStyle={{ color: "#0f172a" }}
              />
              <Legend wrapperStyle={{ color: "#334155" }} />
              <Line type="monotone" dataKey="player" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} name="Player" />
              <Line type="monotone" dataKey="team" stroke="#60a5fa" strokeWidth={3} dot={{ r: 4 }} name="Team avg" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
            Loading chart...
          </div>
        )}
      </div>
    </section>
  );
}