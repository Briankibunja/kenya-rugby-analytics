"use client";
import React, { useState } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";

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
    <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
      <div className="p-5 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">User Management</h3>
            <p className="text-sm text-slate-600 mt-1">Create roles, assign teams, and manage system access</p>
          </div>
          <button
            onClick={onAddUser}
            className="flex items-center gap-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-slate-900 px-4 py-2 text-sm font-medium transition"
          >
            <Plus size={16} />
            Add User
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-4 text-left font-semibold text-slate-700">Name</th>
              <th className="px-6 py-4 text-left font-semibold text-slate-700">Email</th>
              <th className="px-6 py-4 text-left font-semibold text-slate-700">Role</th>
              <th className="px-6 py-4 text-left font-semibold text-slate-700">Team</th>
              <th className="px-6 py-4 text-left font-semibold text-slate-700">Status</th>
              <th className="px-6 py-4 text-center font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                <td className="px-6 py-4 text-slate-900 font-medium">{user.name}</td>
                <td className="px-6 py-4 text-slate-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${roleStyles[user.role]}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">{user.team || "—"}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[user.status]}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEditUser(user)}
                      className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition"
                      title="Edit user"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDeleteUser(user.id)}
                      className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition"
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
          <p className="text-emerald-50/60">No users yet. Click "Add User" to create one.</p>
        </div>
      )}
    </div>
  );
}
