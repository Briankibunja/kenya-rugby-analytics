import type { UserRole } from "../contexts/AuthContext";

export function canUploadMatch(role: UserRole) {
  return role === "admin";
}

export function canEditEvents(role: UserRole) {
  return role === "admin";
}

export function canViewFullStats(role: UserRole) {
  return role === "admin" || role === "coach";
}

export function canViewVideoClips(role: UserRole) {
  return role === "admin" || role === "coach" || role === "player";
}

export function canViewTacticalInsights(role: UserRole) {
  return role === "coach";
}
