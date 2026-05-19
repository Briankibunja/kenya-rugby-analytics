"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "../../contexts/AuthContext";
import MetricCard from "../../components/MetricCard";
import type { EditableEvent } from "../../components/EditableEventList";
import type { Match } from "../../components/MatchManagementTable";
import type { User } from "../../components/UserManagementTable";
import { mockAdminMetrics, mockEvents, mockUsers, mockMatch } from "../../lib/mockData";
import { canEditEvents, canUploadMatch } from "../../lib/permissions";

const EditableEventList = dynamic(() => import("../../components/EditableEventList"), {
  ssr: false,
  loading: () => <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/50">Loading event editor…</div>,
});
const EventTimeline = dynamic(() => import("../../components/EventTimeline"), {
  ssr: false,
  loading: () => <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/50">Loading timeline…</div>,
});
const MatchManagementTable = dynamic(() => import("../../components/MatchManagementTable"), {
  ssr: false,
  loading: () => <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/50">Loading match table…</div>,
});
const VideoPlayer = dynamic(() => import("../../components/VideoPlayer"), {
  ssr: false,
  loading: () => <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/50">Loading video player…</div>,
});
const UserManagementTable = dynamic(() => import("../../components/UserManagementTable"), {
  ssr: false,
  loading: () => <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/50">Loading users…</div>,
});
const UserFormModal = dynamic(() => import("../../components/UserFormModal"), {
  ssr: false,
});

const TEAMS = ["KCB Rugby", "Kabras Sugar RFC", "Nakuru RFC", "Uasin Gishu RFC"];

const INITIAL_MATCHES: Match[] = [
  {
    ...mockMatch,
    competition: "Kenya Cup",
    videoStatus: "ready",
    confidence: 0.96,
    status: "pending_review",
  },
  {
    id: "match-002",
    homeTeam: "Kabras Sugar RFC",
    awayTeam: "Nakuru RFC",
    date: "2026-05-03",
    competition: "Kenya Cup",
    videoStatus: "processing",
    confidence: 0.88,
    status: "approved",
  },
  {
    id: "match-003",
    homeTeam: "Uasin Gishu RFC",
    awayTeam: "KCB Rugby",
    date: "2026-04-26",
    competition: "Kenya Cup",
    videoStatus: "pending",
    confidence: 0.91,
    status: "published",
  },
];

const INITIAL_EDITABLE_EVENTS: EditableEvent[] = mockEvents.map((event, index) => ({
  ...event,
  id: `editable-${index + 1}`,
  status: index === 0 ? "auto_detected" : index === 1 ? "corrected" : "approved",
}));

export default function AdminPage() {
  const { user } = useAuth();
  const timelineEvents = mockEvents;
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [events, setEvents] = useState<EditableEvent[]>(INITIAL_EDITABLE_EVENTS);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const role = user?.role ?? "admin";
  const allowUploadMatch = canUploadMatch(role);
  const allowEditEvents = canEditEvents(role);
  const reviewTotal = mockAdminMetrics.matchesProcessed + mockAdminMetrics.pendingReview;

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleSubmitUser = (formData: Omit<User, "id"> & { id?: string }) => {
    if (formData.id) {
      // Edit existing user
      setUsers(
        users.map((u) =>
          u.id === formData.id
            ? { ...u, ...formData }
            : u
        )
      );
    } else {
      // Create new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        ...formData,
      };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleVideoUpload = (matchId: string) => {
    setMatches((currentMatches) =>
      currentMatches.map((match) =>
        match.id === matchId
          ? { ...match, videoStatus: "processing", status: "pending_review" }
          : match
      )
    );
  };

  const handleApproveMatch = (matchId: string) => {
    setMatches((currentMatches) =>
      currentMatches.map((match) =>
        match.id === matchId ? { ...match, status: "approved" } : match
      )
    );
  };

  const handleRejectMatch = (matchId: string) => {
    setMatches((currentMatches) =>
      currentMatches.map((match) =>
        match.id === matchId ? { ...match, status: "pending_review" } : match
      )
    );
  };

  const handleAddEvent = (event: Omit<EditableEvent, "id">) => {
    setEvents((currentEvents) => [...currentEvents, { id: `event-${Date.now()}`, ...event }]);
  };

  const handleEditEvent = (eventId: string, updates: Partial<EditableEvent>) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) => (event.id === eventId ? { ...event, ...updates } : event))
    );
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents((currentEvents) => currentEvents.filter((event) => event.id !== eventId));
  };

  const handleApproveEvent = (eventId: string) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) => (event.id === eventId ? { ...event, status: "approved" } : event))
    );
  };

  return (
    <section className="space-y-4 text-white">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Match control center</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/60">
          Validate AI detections, correct errors, and publish trusted match data for coaches and fans.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-1 items-start">
        <div className="w-full">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Upload match"
              value={allowUploadMatch ? "Allowed" : "Blocked"}
              detail="Admin-only permission"
              surface="emerald"
              accent={allowUploadMatch ? "emerald" : "rose"}
              chart={{ value: allowUploadMatch ? 100 : 0, total: 100, valueLabel: allowUploadMatch ? "Allowed" : "Blocked", remainderLabel: allowUploadMatch ? "Blocked" : "Allowed", colors: ["#22c55e", "#1f2937"], showCenterLabel: false }}
            />
            <MetricCard
              label="Edit events"
              value={allowEditEvents ? "Allowed" : "Blocked"}
              detail="Admin-only permission"
              surface="sky"
              accent={allowEditEvents ? "sky" : "rose"}
              chart={{ value: allowEditEvents ? 100 : 0, total: 100, valueLabel: allowEditEvents ? "Allowed" : "Blocked", remainderLabel: allowEditEvents ? "Blocked" : "Allowed", colors: ["#38bdf8", "#1f2937"], showCenterLabel: false }}
            />
            <MetricCard label="Current role" value={user?.role ?? "admin"} detail="Protected by route and action gates" surface="amber" accent="amber" chart={{ value: role === "admin" ? 100 : 25, total: 100, valueLabel: role, remainderLabel: "Other", colors: ["#f59e0b", "#1f2937"], showCenterLabel: false }} />
            <MetricCard label="Review queue" value={mockAdminMetrics.pendingReview.toString()} detail="Matches waiting for approval" surface="rose" accent="rose" chart={{ value: mockAdminMetrics.pendingReview, total: reviewTotal, valueLabel: "Review", remainderLabel: "Processed", colors: ["#fb7185", "#1f2937"], showCenterLabel: false }} />
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Matches processed"
              value={mockAdminMetrics.matchesProcessed.toString()}
              detail="7s and 15s fixtures this week"
              surface="teal"
              accent="teal"
              chart={{ value: mockAdminMetrics.matchesProcessed, total: reviewTotal, valueLabel: "Processed", remainderLabel: "Queued", colors: ["#14b8a6", "#1f2937"], showCenterLabel: false }}
            />
            <MetricCard
              label="Confidence avg."
              value={`${mockAdminMetrics.confidenceAvg}%`}
              detail="Across detection and event models"
              surface="indigo"
              accent="sky"
              chart={{ value: mockAdminMetrics.confidenceAvg, total: 100, valueLabel: "Confidence", remainderLabel: "Gap", colors: ["#818cf8", "#1f2937"], showCenterLabel: false }}
            />
            <MetricCard
              label="Pending review"
              value={mockAdminMetrics.pendingReview.toString()}
              detail="Needs human validation before publishing"
              surface="violet"
              accent="amber"
              chart={{ value: mockAdminMetrics.pendingReview, total: reviewTotal, valueLabel: "Pending", remainderLabel: "Done", colors: ["#a855f7", "#1f2937"], showCenterLabel: false }}
            />
            <MetricCard
              label="Auto-approved"
              value={`${mockAdminMetrics.autoApproved}%`}
              detail="Events cleared without manual edits"
              surface="lime"
              accent="rose"
              chart={{ value: mockAdminMetrics.autoApproved, total: 100, valueLabel: "Auto", remainderLabel: "Manual", colors: ["#84cc16", "#1f2937"], showCenterLabel: false }}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <VideoPlayer />
        <EventTimeline events={timelineEvents} />
      </div>

      <MatchManagementTable
        matches={matches}
        onVideoUpload={handleVideoUpload}
        onApprove={handleApproveMatch}
        onReject={handleRejectMatch}
      />

      {allowEditEvents && (
        <EditableEventList
          events={events}
          onEditEvent={handleEditEvent}
          onAddEvent={handleAddEvent}
          onDeleteEvent={handleDeleteEvent}
          onApproveEvent={handleApproveEvent}
        />
      )}

      {/* User Management Section */}
      <UserManagementTable
        users={users}
        onAddUser={handleAddUser}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />

      {/* User Form Modal */}
      <UserFormModal
        isOpen={isModalOpen}
        user={selectedUser}
        teams={TEAMS}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={handleSubmitUser}
      />
    </section>
  );
}
