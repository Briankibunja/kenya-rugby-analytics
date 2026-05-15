"use client";
import React from "react";

export default function PitchMap({ children }: { children?: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-emerald-900/10 bg-white p-5 shadow-xl">
      <div className="relative h-96 overflow-hidden rounded-2xl border border-emerald-900/10 bg-[#2d7f43]">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:100%_30px] opacity-35" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.06)_0,rgba(255,255,255,0.06)_9%,transparent_9%,transparent_18%)] opacity-35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_50%)]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/15 to-transparent" />

        <div className="absolute inset-0 px-5 py-5">
          <div className="relative h-full rounded-xl border-2 border-white/85 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.08)]">
            <div className="absolute inset-y-[10%] left-[5%] right-[5%] rounded-xl bg-white/4" />
            <div className="absolute inset-y-[10%] left-[5%] w-[6%] bg-white/4" />
            <div className="absolute inset-y-[10%] right-[5%] w-[6%] bg-white/4" />

            <div className="absolute inset-x-0 top-[10%] border-t-2 border-white/80" />
            <div className="absolute inset-x-0 top-[28%] border-t border-dashed border-white/60" />
            <div className="absolute inset-x-0 top-[40%] border-t border-dashed border-white/55" />
            <div className="absolute inset-x-0 top-1/2 border-t-2 border-white/90" />
            <div className="absolute inset-x-0 top-[60%] border-t border-dashed border-white/55" />
            <div className="absolute inset-x-0 top-[72%] border-t border-dashed border-white/60" />
            <div className="absolute inset-x-0 bottom-[10%] border-t-2 border-white/80" />

            <div className="absolute left-[5%] top-[10%] bottom-[10%] border-l border-white/70" />
            <div className="absolute right-[5%] top-[10%] bottom-[10%] border-r border-white/70" />

            <div className="absolute left-[5%] right-[5%] top-[22%] border-t border-white/28" />
            <div className="absolute left-[5%] right-[5%] top-[78%] border-t border-white/28" />

            <div className="absolute left-[5%] top-1/2 h-24 w-24 -translate-y-1/2 rounded-full border-2 border-white/80" />
            <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90" />

            <div className="absolute left-[3.8%] top-[10%] h-[80%] w-[1.8%] bg-white/20" />
            <div className="absolute right-[3.8%] top-[10%] h-[80%] w-[1.8%] bg-white/20" />

            <div className="absolute left-[4.4%] top-[31%] h-20 w-[5.5%] border-y-2 border-r-2 border-white/80" />
            <div className="absolute right-[4.4%] top-[31%] h-20 w-[5.5%] border-y-2 border-l-2 border-white/80" />

            <div className="absolute left-1/2 top-[10%] h-[80%] w-[1px] -translate-x-1/2 bg-white/35" />

            <div className="absolute left-[10%] top-[10%] bottom-[10%] border-l border-white/35 border-dashed" />
            <div className="absolute left-[22%] top-[10%] bottom-[10%] border-l border-white/35 border-dashed" />
            <div className="absolute left-[32%] top-[10%] bottom-[10%] border-l border-white/35 border-dashed" />
            <div className="absolute left-[68%] top-[10%] bottom-[10%] border-l border-white/35 border-dashed" />
            <div className="absolute left-[78%] top-[10%] bottom-[10%] border-l border-white/35 border-dashed" />
            <div className="absolute left-[90%] top-[10%] bottom-[10%] border-l border-white/35 border-dashed" />

            <div className="absolute left-[4.8%] top-[31%] h-20 w-[1.2%] rounded-r-full bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.25)]" />
            <div className="absolute left-[4.8%] top-[29.5%] h-4 w-[1.2%] rounded-full bg-white/90" />
            <div className="absolute left-[4.8%] top-[50%] h-4 w-[1.2%] rounded-full bg-white/90" />
            <div className="absolute right-[4.8%] top-[31%] h-20 w-[1.2%] rounded-l-full bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.25)]" />
            <div className="absolute right-[4.8%] top-[29.5%] h-4 w-[1.2%] rounded-full bg-white/90" />
            <div className="absolute right-[4.8%] top-[50%] h-4 w-[1.2%] rounded-full bg-white/90" />

            <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[11px] font-semibold tracking-[0.28em] text-white/90 backdrop-blur-sm">
              RUGBY PITCH
            </div>

            <div className="absolute left-[15%] top-[16%] rounded-full border border-white/20 bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-900 shadow-sm">8</div>
            <div className="absolute left-[36%] top-[34%] rounded-full border border-white/20 bg-lime-200 px-3 py-1 text-xs font-semibold text-emerald-950 shadow-sm">12</div>
            <div className="absolute right-[18%] top-[44%] rounded-full border border-white/20 bg-emerald-300 px-3 py-1 text-xs font-semibold text-emerald-950 shadow-sm">3</div>
            <div className="absolute right-[28%] bottom-[22%] rounded-full border border-white/20 bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-950 shadow-sm">7</div>

            <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/30 px-3 py-2 text-xs text-white/90 backdrop-blur-sm">
              Positional overlays and heatmaps will render here.
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
