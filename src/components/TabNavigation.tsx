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
    <div className="flex gap-2 border-b border-white/10">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-3 font-medium text-sm transition-all border-b-2 ${
            activeTab === tab.id
              ? "border-emerald-400 text-emerald-200"
              : "border-transparent text-white/55 hover:text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
