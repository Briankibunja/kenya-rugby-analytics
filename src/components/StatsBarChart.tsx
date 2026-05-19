"use client";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type ChartDatum = {
  name: string;
  value: number;
};

export default function StatsBarChart({
  title,
  subtitle,
  data,
  barColor = "#34d399",
}: {
  title: string;
  subtitle?: string;
  data: ChartDatum[];
  barColor?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle ? <p className="mt-1 text-sm text-white/60">{subtitle}</p> : null}
        </div>
      </div>

      <div className="mt-6 h-64">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={280} minHeight={240}>
            <BarChart data={data} margin={{ top: 8, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.45)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.45)" fontSize={12} />
              <Tooltip
                contentStyle={{ background: "#090909", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, color: "#ffffff" }}
                labelStyle={{ color: "#ffffff" }}
              />
              <Bar dataKey="value" fill={barColor} radius={[10, 10, 0, 0]} />
            </BarChart>
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
