import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

export const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const endpoints = {
  matches: "/matches",
  events: "/events",
  players: "/players",
  stats: "/stats",
  clips: "/videos/clips",
} as const;

export async function fetchDashboardSummary() {
  const [{ data: matches }, { data: stats }] = await Promise.all([
    api.get(endpoints.matches),
    api.get(endpoints.stats),
  ]);

  return { matches, stats };
}
