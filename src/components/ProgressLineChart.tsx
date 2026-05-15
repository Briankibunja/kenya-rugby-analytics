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
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
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
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
            Loading chart...
          </div>
        )}
      </div>
    </section>
  );
}
