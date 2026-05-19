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
    <section className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <h3 className="text-lg font-semibold text-white">Player vs Team Average</h3>
      <p className="mt-1 text-sm text-white/60">Performance trend compared to overall squad baseline.</p>
      <div className="mt-6 h-64">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={280} minHeight={240}>
            <LineChart data={data} margin={{ top: 8, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.45)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.45)" fontSize={12} />
              <Tooltip
                contentStyle={{ background: "#090909", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, color: "#ffffff" }}
                labelStyle={{ color: "#ffffff" }}
              />
              <Legend wrapperStyle={{ color: "#ffffff" }} />
              <Line type="monotone" dataKey="player" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} name="Player" />
              <Line type="monotone" dataKey="team" stroke="#60a5fa" strokeWidth={3} dot={{ r: 4 }} name="Team avg" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 text-sm text-white/55">
            Loading chart...
          </div>
        )}
      </div>
    </section>
  );
}