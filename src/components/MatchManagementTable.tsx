"use client";
import React, { useState } from "react";
import { Upload, Edit2, Check, X } from "./Icons";

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  competition: string;
  videoStatus: "pending" | "processing" | "ready";
  confidence: number;
  status: "pending_review" | "approved" | "published";
}

interface MatchManagementTableProps {
  matches: Match[];
  onVideoUpload: (matchId: string) => void;
  onApprove: (matchId: string) => void;
  onReject: (matchId: string) => void;
}

const statusStyles = {
  pending_review: "bg-amber-400/20 text-amber-300",
  approved: "bg-emerald-400/20 text-emerald-300",
  published: "bg-sky-400/20 text-sky-300",
};

const videoStatusStyles = {
  pending: "bg-rose-400/20 text-rose-300",
  processing: "bg-amber-400/20 text-amber-300",
  ready: "bg-emerald-400/20 text-emerald-300",
};

export default function MatchManagementTable({
  matches,
  onVideoUpload,
  onApprove,
  onReject,
}: MatchManagementTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="border-b border-white/10 p-5">
        <h3 className="text-lg font-semibold text-white">Match Management</h3>
        <p className="mt-1 text-sm text-white/60">Upload videos, assign teams, and tag competitions</p>
      </div>

      <div className="flex-1 min-h-0 overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-6 py-4 text-left font-semibold text-white/70">Match</th>
              <th className="px-6 py-4 text-left font-semibold text-white/70">Competition</th>
              <th className="px-6 py-4 text-left font-semibold text-white/70">Date</th>
              <th className="px-6 py-4 text-left font-semibold text-white/70">Video Status</th>
              <th className="px-6 py-4 text-left font-semibold text-white/70">Review Status</th>
              <th className="px-6 py-4 text-left font-semibold text-white/70">Confidence</th>
              <th className="px-6 py-4 text-center font-semibold text-white/70">Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <React.Fragment key={match.id}>
                <tr className="border-b border-white/10 transition hover:bg-white/5">
                  <td className="px-6 py-4 font-medium text-white">
                    <div className="flex flex-col">
                      <span>{match.homeTeam}</span>
                      <span className="text-xs text-white/55">vs {match.awayTeam}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/60">{match.competition}</td>
                  <td className="px-6 py-4 text-white/60">{new Date(match.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
                        videoStatusStyles[match.videoStatus]
                      }`}
                    >
                      {match.videoStatus === "ready" && <Check size={12} />}
                      {match.videoStatus === "processing" && <div className="animate-spin h-3 w-3 border border-current border-t-transparent rounded-full" />}
                      {match.videoStatus === "pending" && <Upload size={12} />}
                      {match.videoStatus.charAt(0).toUpperCase() + match.videoStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[match.status]}`}>
                      {match.status.replace("_", " ").charAt(0).toUpperCase() +
                        match.status.replace("_", " ").slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-white">{Math.round(match.confidence * 100)}%</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {match.videoStatus === "pending" && (
                        <button
                          onClick={() => onVideoUpload(match.id)}
                          className="rounded-lg p-2 text-white/70 transition hover:bg-white/10"
                          title="Upload video"
                        >
                          <Upload size={16} />
                        </button>
                      )}
                      {match.videoStatus === "ready" && match.status === "pending_review" && (
                        <>
                          <button
                            onClick={() => onApprove(match.id)}
                            className="rounded-lg p-2 text-emerald-200/80 transition hover:bg-emerald-500/15 hover:text-emerald-200"
                            title="Approve"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={() => onReject(match.id)}
                            className="rounded-lg p-2 text-emerald-200/80 transition hover:bg-rose-500/15 hover:text-rose-200"
                            title="Reject"
                          >
                            <X size={16} />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setExpandedId(expandedId === match.id ? null : match.id)}
                        className="rounded-lg p-2 text-white/70 transition hover:bg-white/10"
                        title="Details"
                      >
                        <Edit2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedId === match.id && (
                  <tr className="border-b border-white/10 bg-black/30">
                    <td colSpan={7} className="px-6 py-4">
                      <div className="space-y-3">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-white/55">Teams</label>
                          <input
                            type="text"
                            value={`${match.homeTeam} vs ${match.awayTeam}`}
                            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                            readOnly
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="mb-2 block text-xs font-semibold text-white/55">
                              Competition
                            </label>
                            <input
                              type="text"
                              value={match.competition}
                              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-xs font-semibold text-white/55">Date</label>
                            <input
                              type="date"
                              value={match.date}
                              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
