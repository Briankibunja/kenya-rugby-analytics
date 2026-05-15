"use client";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import EditableEventList, { type EditableEvent } from "../../components/EditableEventList";
import EventTimeline from "../../components/EventTimeline";
import MetricCard from "../../components/MetricCard";
import MatchManagementTable, { type Match } from "../../components/MatchManagementTable";
import VideoPlayer from "../../components/VideoPlayer";
import UserManagementTable from "../../components/UserManagementTable";
import UserFormModal from "../../components/UserFormModal";
import { mockAdminMetrics, mockEvents, mockUsers, mockMatch } from "../../lib/mockData";
import type { User } from "../../components/UserManagementTable";
import { canEditEvents, canUploadMatch } from "../../lib/permissions";

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
    <section className="space-y-6 text-slate-900">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Match control center</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Validate AI detections, correct errors, and publish trusted match data for coaches and fans.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px] items-start">
        <div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Upload match" value={allowUploadMatch ? "Allowed" : "Blocked"} detail="Admin-only permission" surface="emerald" accent={allowUploadMatch ? "emerald" : "rose"} />
            <MetricCard label="Edit events" value={allowEditEvents ? "Allowed" : "Blocked"} detail="Admin-only permission" surface="sky" accent={allowEditEvents ? "sky" : "rose"} />
            <MetricCard label="Current role" value={user?.role ?? "admin"} detail="Protected by route and action gates" surface="amber" accent="amber" />
            <MetricCard label="Review queue" value={mockAdminMetrics.pendingReview.toString()} detail="Matches waiting for approval" surface="rose" accent="rose" pie={{ data: [{ label: 'Pending', value: mockAdminMetrics.pendingReview, color: '#fb7185' }, { label: 'Other', value: Math.max(0, mockAdminMetrics.matchesProcessed - mockAdminMetrics.pendingReview), color: '#e5e7eb' }], size: 64, innerRadius: 16 }} />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Matches processed" value={mockAdminMetrics.matchesProcessed.toString()} detail="7s and 15s fixtures this week" surface="teal" accent={"teal"} pie={{ data: [{ label: 'Processed', value: mockAdminMetrics.matchesProcessed, color: '#60a5fa' }, { label: 'Other', value: 0, color: '#e5e7eb' }], size: 64, innerRadius: 16 }} />
            <MetricCard label="Confidence avg." value={`${mockAdminMetrics.confidenceAvg}%`} detail="Across detection and event models" surface="indigo" accent="sky" />
            <MetricCard label="Pending review" value={mockAdminMetrics.pendingReview.toString()} detail="Needs human validation before publishing" surface="violet" accent="amber" />
            <MetricCard label="Auto-approved" value={`${mockAdminMetrics.autoApproved}%`} detail="Events cleared without manual edits" surface="lime" accent="rose" pie={{ data: [{ label: 'Auto-approved', value: mockAdminMetrics.autoApproved, color: '#34d399' }, { label: 'Not', value: 100 - mockAdminMetrics.autoApproved, color: '#94a3b8' }], size: 64, innerRadius: 16 }} />
          </div>
        </div>

        <div />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
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
