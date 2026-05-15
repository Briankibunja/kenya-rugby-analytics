export type MatchEvent = {
  event: string;
  player: string;
  timestamp: string;
  confidence: number;
  clip_url?: string;
};

export type DashboardSummary = {
  matches: unknown;
  stats: unknown;
};
