"use client";
import React, { useState } from "react";
import { Upload, Edit2, Check, X } from "lucide-react";

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
    <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
      <div className="p-5 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">Match Management</h3>
        <p className="text-sm text-slate-600 mt-1">Upload videos, assign teams, and tag competitions</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-4 text-left font-semibold text-slate-700">Match</th>
              <th className="px-6 py-4 text-left font-semibold text-slate-700">Competition</th>
              <th className="px-6 py-4 text-left font-semibold text-slate-700">Date</th>
              <th className="px-6 py-4 text-left font-semibold text-slate-700">Video Status</th>
              <th className="px-6 py-4 text-left font-semibold text-slate-700">Review Status</th>
              <th className="px-6 py-4 text-left font-semibold text-slate-700">Confidence</th>
              <th className="px-6 py-4 text-center font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <React.Fragment key={match.id}>
                <tr className="border-b border-slate-200 hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-slate-900 font-medium">
                    <div className="flex flex-col">
                      <span>{match.homeTeam}</span>
                      <span className="text-slate-500 text-xs">vs {match.awayTeam}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{match.competition}</td>
                  <td className="px-6 py-4 text-slate-600">{new Date(match.date).toLocaleDateString()}</td>
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
                  <td className="px-6 py-4 text-slate-900 font-medium">{Math.round(match.confidence * 100)}%</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {match.videoStatus === "pending" && (
                        <button
                          onClick={() => onVideoUpload(match.id)}
                          className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition"
                          title="Upload video"
                        >
                          <Upload size={16} />
                        </button>
                      )}
                      {match.videoStatus === "ready" && match.status === "pending_review" && (
                        <>
                          <button
                            onClick={() => onApprove(match.id)}
                            className="p-2 rounded-lg hover:bg-emerald-400/20 text-emerald-50/80 hover:text-emerald-300 transition"
                            title="Approve"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={() => onReject(match.id)}
                            className="p-2 rounded-lg hover:bg-rose-400/20 text-emerald-50/80 hover:text-rose-300 transition"
                            title="Reject"
                          >
                            <X size={16} />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setExpandedId(expandedId === match.id ? null : match.id)}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition"
                        title="Details"
                      >
                        <Edit2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedId === match.id && (
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <td colSpan={7} className="px-6 py-4">
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-emerald-50/60 mb-2">Teams</label>
                          <input
                            type="text"
                            value={`${match.homeTeam} vs ${match.awayTeam}`}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm"
                            readOnly
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-emerald-50/60 mb-2">
                              Competition
                            </label>
                            <input
                              type="text"
                              value={match.competition}
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-emerald-50/60 mb-2">Date</label>
                            <input
                              type="date"
                              value={match.date}
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm"
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
