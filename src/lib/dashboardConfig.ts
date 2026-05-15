export const dashboardRoles = ["admin", "coach", "player", "fan"] as const;

export const roleDescriptions = {
  admin: "System control, event validation, and user management",
  coach: "Tactical analysis, video breakdown, and opponent scouting",
  player: "Personal performance, clips, and development insights",
  fan: "Highlights, summaries, and simple visual stats",
} as const;

export const dashboardRoutes = {
  admin: "/admin",
  coach: "/coach",
  player: "/player",
  fan: "/fan",
} as const;
