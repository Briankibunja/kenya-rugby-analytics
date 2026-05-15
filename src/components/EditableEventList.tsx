"use client";
import React, { useState } from "react";
import { Edit2, Trash2, Plus, Check, X } from "lucide-react";

export interface EditableEvent {
  id: string;
  time: string;
  label: string;
  confidence: number;
  status: "auto_detected" | "corrected" | "approved";
  tone?: "emerald" | "amber" | "rose" | "sky";
}

interface EditableEventListProps {
  events: EditableEvent[];
  onEditEvent: (id: string, updates: Partial<EditableEvent>) => void;
  onAddEvent: (event: Omit<EditableEvent, "id">) => void;
  onDeleteEvent: (id: string) => void;
  onApproveEvent: (id: string) => void;
}

const statusStyles = {
  auto_detected: "bg-sky-400/20 text-sky-300",
  corrected: "bg-amber-400/20 text-amber-300",
  approved: "bg-emerald-400/20 text-emerald-300",
};

const toneStyles: Record<NonNullable<EditableEvent["tone"]>, string> = {
  emerald: "bg-emerald-400 text-slate-950",
  amber: "bg-amber-300 text-slate-950",
  rose: "bg-rose-400 text-white",
  sky: "bg-sky-300 text-slate-950",
};

export default function EditableEventList({
  events,
  onEditEvent,
  onAddEvent,
  onDeleteEvent,
  onApproveEvent,
}: EditableEventListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<EditableEvent, "id">>({
    time: "",
    label: "",
    confidence: 0.95,
    status: "auto_detected",
    tone: "emerald",
  });

  const handleAddEvent = () => {
    if (newEvent.time && newEvent.label) {
      onAddEvent(newEvent);
      setNewEvent({ time: "", label: "", confidence: 0.95, status: "auto_detected", tone: "emerald" });
      setShowAddForm(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-xl">
      <div className="p-5 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">AI Output Validation</h3>
            <p className="text-sm text-slate-600 mt-1">Edit wrong detections, add missing events, and approve final stats</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-slate-900 px-4 py-2 text-sm font-medium transition"
          >
            <Plus size={16} />
            Add Event
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="border-b border-slate-200 bg-slate-50 p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Time (MM:SS)</label>
              <input
                type="text"
                placeholder="03:12"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Event Label</label>
              <input
                type="text"
                placeholder="e.g., Try scored"
                value={newEvent.label}
                onChange={(e) => setNewEvent({ ...newEvent, label: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Confidence %</label>
              <input
                type="number"
                min="0"
                max="100"
                value={Math.round(newEvent.confidence * 100)}
                onChange={(e) => setNewEvent({ ...newEvent, confidence: Number(e.target.value) / 100 })}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Category</label>
              <select
                value={newEvent.tone}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, tone: e.target.value as EditableEvent["tone"] })
                }
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm"
              >
                <option value="emerald">Positive</option>
                <option value="sky">Standard</option>
                <option value="amber">Review</option>
                <option value="rose">Critical</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-lg hover:bg-slate-100 text-slate-700 text-sm transition"
            >
              Cancel
            </button>
            <button
              onClick={handleAddEvent}
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition"
            >
              Add Event
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2 p-5">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 hover:bg-slate-100 transition"
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                toneStyles[event.tone ?? "emerald"]
              }`}
            >
              {event.time}
            </span>

            <div className="flex-1">
              <div className="flex items-center justify-between gap-3 mb-1">
                <span className="font-medium text-slate-900">{event.label}</span>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${statusStyles[event.status]}`}>
                    {event.status.replace("_", " ")}
                  </span>
                  <span className="text-xs text-slate-600">{Math.round(event.confidence * 100)}%</span>
                </div>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-emerald-400"
                  style={{ width: `${Math.max(10, event.confidence * 100)}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              {event.status !== "approved" && (
                <button
                  onClick={() => onApproveEvent(event.id)}
                  className="p-2 rounded-lg hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition"
                  title="Approve event"
                >
                  <Check size={16} />
                </button>
              )}
              {editingId !== event.id && (
                <>
                  <button
                    onClick={() => setEditingId(event.id)}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition"
                    title="Edit event"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDeleteEvent(event.id)}
                    className="p-2 rounded-lg hover:bg-rose-50 text-slate-700 hover:text-rose-700 transition"
                    title="Delete event"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              )}
            </div>

            {editingId === event.id && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setEditingId(null)}>
                <div
                  className="bg-white rounded-2xl border border-slate-200 p-6 w-96 space-y-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h4 className="text-lg font-semibold text-slate-900">Edit Event</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-2">Time (MM:SS)</label>
                      <input
                        type="text"
                        value={event.time}
                        onChange={(e) =>
                          onEditEvent(event.id, { time: e.target.value })
                        }
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-2">Label</label>
                      <input
                        type="text"
                        value={event.label}
                        onChange={(e) =>
                          onEditEvent(event.id, { label: e.target.value })
                        }
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-2">Confidence %</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={Math.round(event.confidence * 100)}
                        onChange={(e) =>
                          onEditEvent(event.id, {
                            confidence: Number(e.target.value) / 100,
                          })
                        }
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 rounded-lg hover:bg-slate-100 text-slate-700 text-sm transition"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        onApproveEvent(event.id);
                      }}
                      className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition"
                    >
                      Save & Approve
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
