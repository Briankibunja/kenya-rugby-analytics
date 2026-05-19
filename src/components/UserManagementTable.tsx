"use client";
import React, { useState } from "react";
import { Edit2, Trash2, Plus } from "./Icons";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "coach" | "player" | "fan" | "admin";
  team: string | null;
  status: "active" | "inactive";
}

interface UserManagementTableProps {
  users: User[];
  onAddUser: () => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (id: string) => void;
}

const roleStyles = {
  admin: "bg-purple-400/20 text-purple-300",
  coach: "bg-emerald-400/20 text-emerald-300",
  player: "bg-sky-400/20 text-sky-300",
  fan: "bg-amber-400/20 text-amber-300",
};

const statusStyles = {
  active: "bg-emerald-400/20 text-emerald-300",
  inactive: "bg-rose-400/20 text-rose-300",
};

export default function UserManagementTable({
  users,
  onAddUser,
  onEditUser,
  onDeleteUser,
}: UserManagementTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="border-b border-white/10 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">User Management</h3>
            <p className="mt-1 text-sm text-white/60">Create roles, assign teams, and manage system access</p>
          </div>
          <button
            onClick={onAddUser}
            className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/15"
          >
            <Plus size={16} />
            Add User
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-6 py-4 text-left font-semibold text-white/70">Name</th>
              <th className="px-6 py-4 text-left font-semibold text-white/70">Email</th>
              <th className="px-6 py-4 text-left font-semibold text-white/70">Role</th>
              <th className="px-6 py-4 text-left font-semibold text-white/70">Team</th>
              <th className="px-6 py-4 text-left font-semibold text-white/70">Status</th>
              <th className="px-6 py-4 text-center font-semibold text-white/70">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-white/10 transition hover:bg-white/5">
                <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                <td className="px-6 py-4 text-white/60">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${roleStyles[user.role]}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-white/60">{user.team || "—"}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[user.status]}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEditUser(user)}
                      className="rounded-lg p-2 text-white/70 transition hover:bg-white/10"
                      title="Edit user"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDeleteUser(user.id)}
                      className="rounded-lg p-2 text-white/70 transition hover:bg-rose-500/15 hover:text-rose-200"
                      title="Delete user"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-white/60">No users yet. Click "Add User" to create one.</p>
        </div>
      )}
    </div>
  );
}
