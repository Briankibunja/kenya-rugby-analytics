import type { UserRole } from "../contexts/AuthContext";

type MockUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  team: string | null;
  status: "active" | "inactive";
};

type OpponentThreat = "Low" | "Medium" | "High";

export const mockMatch = {
  id: "match-001",
  homeTeam: "KCB Rugby",
  awayTeam: "Kabras Sugar RFC",
  date: "2026-05-10",
  scoreline: { home: 24, away: 18 },
  possession: 56,
  territory: 61,
  duration: 80,
};

export const mockEvents = [
  { id: "1", time: "03:12", label: "Early tackle detected", confidence: 0.96, tone: "emerald" as const },
  { id: "2", time: "11:48", label: "Ruck event flagged for review", confidence: 0.84, tone: "amber" as const },
  { id: "3", time: "22:04", label: "Lineout corrected by admin", confidence: 0.91, tone: "sky" as const },
  { id: "4", time: "38:20", label: "Try approved and published", confidence: 0.98, tone: "rose" as const },
];

export const mockAdminMetrics = {
  matchesProcessed: 18,
  confidenceAvg: 91,
  pendingReview: 6,
  autoApproved: 82,
};

export const mockCoachMetrics = {
  possession: 56,
  tackleSuccess: 88,
  ruckSpeed: "2.8s",
  lineoutEfficiency: 92,
  territory: 61,
  tacklesMade: 32,
  missedTackles: 4,
  turnoversWon: 8,
  turnoversLost: 5,
  ruckSuccessRate: 86,
};

export const mockCoachAttackData = [
  { name: "Left", value: 38 },
  { name: "Center", value: 24 },
  { name: "Right", value: 52 },
];

export const mockCoachAdvancedStats = {
  tacklesMadeFullMatch: 32,
  missedTacklesFullMatch: 4,
  firstHalfTackles: 16,
  secondHalfTackles: 16,
  turnoversWon: 8,
  turnoversLost: 5,
  ruckSuccessRate: 86,
  phasesBeforeTry: 12,
  breakdownSpeed: "2.1s",
  ballRetention: 79,
};

export const mockCoachVideoClips = [
  { title: "Missed tackles", label: "All instances of defensive errors", clips: 4, time: "Left edge defensive break" },
  { title: "Ruck dominance", label: "Strong ground control sequences", clips: 7, time: "Second half progression" },
  { title: "Attack efficiency", label: "Successful try-scoring moves", clips: 3, time: "Pattern breakdown" },
  { title: "Set-piece accuracy", label: "Lineout and scrum executions", clips: 6, time: "Technical analysis" },
];

export const mockOpponentAnalysis = {
  preferredAttackSide: "Right",
  preferredAttackPercentage: 62,
  weakDefensiveZones: ["Left flank edge", "Open side ruck", "Short lineout throw"],
  strongAreas: ["Right pod attack", "Maul setup", "First-phase execution"],
  patterns: [
    { phase: "First 20 mins", pattern: "Conservative possession play", threat: "Medium" },
    { phase: "Middle 40 mins", pattern: "Aggressive wide attack", threat: "High" },
    { phase: "Final 20 mins", pattern: "Set-piece focus", threat: "Medium" },
  ],
  keyPlayers: ["No. 12 (Center) - Creative distributor", "No. 8 (Flanker) - Breakdown beast", "No. 9 (Scrum-half) - Quick service"],
} satisfies {
  preferredAttackSide: string;
  preferredAttackPercentage: number;
  weakDefensiveZones: string[];
  strongAreas: string[];
  patterns: { phase: string; pattern: string; threat: OpponentThreat }[];
  keyPlayers: string[];
};

export const mockPhaseAnalysis = [
  { name: "1-3 phases", value: 28, tries: 1 },
  { name: "4-6 phases", value: 35, tries: 2 },
  { name: "7-10 phases", value: 24, tries: 1 },
  { name: "11+ phases", value: 13, tries: 0 },
];

export const mockPlayerMetrics = {
  tacklesMade: 18,
  missedTackles: 5,
  carries: 27,
  metersGained: 214,
};

export const mockPlayerProfile = {
  name: "Mike Player",
  position: "Flanker",
  jerseyNumber: 7,
  team: "KCB Rugby",
  dominantSide: "Left",
  age: 24,
};

export const mockPlayerMatchRatings = [
  { id: "r1", match: "vs Kabras Sugar RFC", date: "2026-01-14", rating: 6.9 },
  { id: "r2", match: "vs Menengai Oilers", date: "2026-02-03", rating: 7.2 },
  { id: "r3", match: "vs Nondescripts", date: "2026-03-08", rating: 7.6 },
  { id: "r4", match: "vs Kenya Harlequin", date: "2026-04-17", rating: 7.8 },
  { id: "r5", match: "vs Kabras Sugar RFC", date: "2026-05-10", rating: 8.1 },
];

export const mockPlayerVsTeamData = [
  { name: "Jan", player: 61, team: 58 },
  { name: "Feb", player: 64, team: 60 },
  { name: "Mar", player: 68, team: 63 },
  { name: "Apr", player: 72, team: 66 },
  { name: "May", player: 75, team: 69 },
];

export const mockProgressData = [
  { name: "Jan", value: 61 },
  { name: "Feb", value: 64 },
  { name: "Mar", value: 68 },
  { name: "Apr", value: 72 },
  { name: "May", value: 75 },
];

export const mockPlayerClips = [
  { title: "Positive carry", label: "Clean line break and support play", time: "02:14" },
  { title: "Missed tackle", label: "Track shoulder positioning on the left side", time: "18:40" },
  { title: "Defensive stop", label: "Strong read on the inside channel", time: "41:09" },
];

export const mockPlayerHighlights = [
  { title: "Break line carry", label: "Beat first defender and created offload lane", time: "07:32" },
  { title: "Dominant tackle", label: "Stopped momentum on outside channel", time: "19:05" },
  { title: "Turnover won", label: "Clean jackal under pressure", time: "43:11" },
];

export const mockPlayerMistakes = [
  { title: "Missed tackle", label: "Late footwork and high body position", time: "12:48" },
  { title: "Penalty conceded", label: "Hands in ruck after tackle", time: "27:10" },
  { title: "Handling error", label: "Knock-on in contact", time: "58:26" },
];

export const mockFanSummaryData = [
  { name: "Tries", value: 4 },
  { name: "Tackles", value: 32 },
  { name: "Rucks", value: 41 },
  { name: "Breaks", value: 9 },
];

export const mockFanHighlights = [
  { title: "Try: Early break", label: "Automatically surfaced from the opening phases", time: "03:21" },
  { title: "Big tackle", label: "Momentum-shifting defensive stop", time: "17:54" },
  { title: "Line break", label: "Speed through the middle channel", time: "27:40" },
  { title: "Winning try", label: "Final score that sealed the game", time: "39:08" },
];

export const mockUsers: MockUser[] = [
  { id: "user-001", name: "John Kipchoge", email: "john@kcbrugby.com", role: "coach", team: "KCB Rugby", status: "active" as const },
  { id: "user-002", name: "Sarah Mwangi", email: "sarah@kabras.com", role: "coach", team: "Kabras Sugar RFC", status: "active" as const },
  { id: "user-003", name: "David Ochieng", email: "david@kcbrugby.com", role: "player", team: "KCB Rugby", status: "active" as const },
  { id: "user-004", name: "James Kariuki", email: "james@kabras.com", role: "player", team: "Kabras Sugar RFC", status: "active" as const },
  { id: "user-005", name: "Emma Kipchoge", email: "emma@rugby.ke", role: "fan", team: null, status: "active" as const },
  { id: "user-006", name: "Michael Kipkemboi", email: "michael@kcbrugby.com", role: "player", team: "KCB Rugby", status: "inactive" as const },
];
