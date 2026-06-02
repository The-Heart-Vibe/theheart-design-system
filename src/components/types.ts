// Shared types for status-driven components.
export type StatusKey =
  | "done"
  | "in_progress"
  | "at_risk"
  | "blocked"
  | "planned"
  | "on_track"
  | "off_track";

export const statusToClass: Record<StatusKey, string> = {
  done:        "bg-th-status-done",
  on_track:    "bg-th-status-done",
  in_progress: "bg-th-status-in-progress",
  at_risk:     "bg-th-status-at-risk",
  blocked:     "bg-th-status-blocked",
  off_track:   "bg-th-status-blocked",
  planned:     "bg-th-status-planned",
};
