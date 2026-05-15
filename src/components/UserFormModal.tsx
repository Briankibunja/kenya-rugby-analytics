"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { User } from "./UserManagementTable";

interface UserFormModalProps {
  isOpen: boolean;
  user: User | null;
  teams: string[];
  onClose: () => void;
  onSubmit: (user: Omit<User, "id"> & { id?: string }) => void;
}

export default function UserFormModal({
  isOpen,
  user,
  teams,
  onClose,
  onSubmit,
}: UserFormModalProps) {
  const [formData, setFormData] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    role: "player",
    team: null as string | null,
    status: "active",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        team: user.team,
        status: user.status,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        role: "player",
        team: null,
        status: "active",
      });
    }
  }, [user, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: user?.id,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="rounded-3xl border border-slate-200 bg-white shadow-2xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            {user ? "Edit User" : "Create New User"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none transition"
              placeholder="John Kipchoge"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none transition"
              placeholder="john@kcbrugby.com"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as User["role"] })}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 focus:border-emerald-500 focus:outline-none transition"
            >
              <option value="admin">Admin</option>
              <option value="coach">Coach</option>
              <option value="player">Player</option>
              <option value="fan">Fan</option>
            </select>
          </div>

          {/* Team - only show for coach and player */}
          {(formData.role === "coach" || formData.role === "player") && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Team
              </label>
              <select
                value={formData.team || ""}
                onChange={(e) => setFormData({ ...formData, team: e.target.value || null })}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 focus:border-emerald-500 focus:outline-none transition"
              >
                <option value="">Select a team</option>
                {teams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Status */}
          <div>
            <label className="block text-sm font.medium text-slate-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 focus:border-emerald-500 focus:outline-none transition"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-700 px-4 py-2 transition font-medium"
            >
              {user ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
