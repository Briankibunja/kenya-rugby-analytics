"use client";
import React from "react";

type Tab = "overview" | "analysis" | "video";

interface TabNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "analysis", label: "Analysis" },
    { id: "video", label: "Video Breakdown" },
  ];

  return (
    <div className="flex gap-2 border-b border-slate-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-3 font-medium text-sm transition-all border-b-2 ${
            activeTab === tab.id
              ? "border-emerald-500 text-emerald-700"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
