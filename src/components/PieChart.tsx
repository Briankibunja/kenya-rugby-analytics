"use client";
import React, { useRef, useState } from "react";

type Slice = { label: string; value: number; color?: string };

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [`M ${cx} ${cy}`, `L ${start.x} ${start.y}`, `A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`, "Z"].join(" ");
}

export default function PieChart({ data, size = 160, innerRadius = 0, showLegend = true }: { data: Slice[]; size?: number; innerRadius?: number; showLegend?: boolean }) {
  const total = data.reduce((s, d) => s + Math.max(0, d.value), 0) || 1;
  let startAngle = 0;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState<{ i: number; label: string; value: number; percent: number; x: number; y: number } | null>(null);

  return (
    <div ref={containerRef} className="relative flex gap-4 items-start">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="Pie chart">
        {data.map((d, i) => {
          const value = Math.max(0, d.value);
          const angle = (value / total) * 360;
          const path = describeArc(cx, cy, r - 2, startAngle, startAngle + angle);
          const percent = ((value / total) * 100) || 0;
          const midAngle = startAngle + angle / 2;
          const labelRadius = innerRadius > 0 ? (innerRadius + r) / 2 : r * 0.65;
          const labelPos = polarToCartesian(cx, cy, labelRadius, midAngle);
          const showLabel = angle > 12; // avoid overcrowding tiny slices
          startAngle += angle;

          return (
            <g key={i}>
              <path
                d={path}
                fill={d.color ?? defaultColors[i % defaultColors.length]}
                stroke="#fff"
                strokeWidth={1}
                className="cursor-pointer"
                onMouseEnter={(e) => {
                  const rect = containerRef.current?.getBoundingClientRect();
                  setHover({
                    i,
                    label: d.label,
                    value: d.value,
                    percent,
                    x: rect ? e.clientX - rect.left : 0,
                    y: rect ? e.clientY - rect.top : 0,
                  });
                }}
                onMouseMove={(e) => {
                  const rect = containerRef.current?.getBoundingClientRect();
                  setHover((h) => (h ? { ...h, x: rect ? e.clientX - rect.left : 0, y: rect ? e.clientY - rect.top : 0 } : h));
                }}
                onMouseLeave={() => setHover(null)}
              />

              {showLabel && (
                <text x={labelPos.x} y={labelPos.y} fontSize={Math.max(10, size * 0.07)} fill="#fff" textAnchor="middle" alignmentBaseline="middle" pointerEvents="none">
                  {`${percent.toFixed(0)}%`}
                </text>
              )}
            </g>
          );
        })}

        {innerRadius > 0 && (
          <circle cx={cx} cy={cy} r={innerRadius} fill="white" />
        )}
      </svg>

      {showLegend && (
        <ul className="text-sm text-slate-700">
          {data.map((d, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-sm" style={{ background: d.color ?? defaultColors[i % defaultColors.length] }} />
              <span>{d.label}</span>
              <span className="ml-2 text-xs text-slate-500">{d.value}</span>
            </li>
          ))}
        </ul>
      )}

      {hover && (
        <div
          className="pointer-events-none absolute z-50 rounded-md bg-slate-900 text-white text-xs px-2 py-1 shadow-md"
          style={{ left: hover.x + 8, top: hover.y + 8 }}
        >
          <div className="font-semibold">{hover.label}</div>
          <div className="text-[11px]">{hover.value} • {hover.percent.toFixed(1)}%</div>
        </div>
      )}
    </div>
  );
}

const defaultColors = ["#60a5fa", "#34d399", "#f472b6", "#facc15", "#fb7185", "#a78bfa"];
