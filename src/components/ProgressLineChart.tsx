"use client";
import React, { useEffect, useState } from "react";
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Datum = {
  name: string;
  value: number;
};

export default function ProgressLineChart({
  title,
  subtitle,
  data,
  stroke = "#86efac",
}: {
  title: string;
  subtitle?: string;
  data: Datum[];
  stroke?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {subtitle ? <p className="mt-1 text-sm text-white/60">{subtitle}</p> : null}
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
              <Line type="monotone" dataKey="value" stroke={stroke} strokeWidth={3} dot={{ r: 4 }} />
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
