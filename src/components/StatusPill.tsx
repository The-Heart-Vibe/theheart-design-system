import { StatusKey, statusToClass } from "./types";

export interface StatusPillProps {
  status: StatusKey;
  label?: string;
}

const defaultLabels: Record<StatusKey, string> = {
  done:        "Done",
  on_track:    "On track",
  in_progress: "In progress",
  at_risk:     "At risk",
  blocked:     "Blocked",
  off_track:   "Off track",
  planned:     "Planned",
};

export function StatusPill({ status, label }: StatusPillProps) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-th-caption font-heading font-semibold uppercase tracking-wide text-white ${statusToClass[status]}`}
    >
      {label ?? defaultLabels[status]}
    </span>
  );
}
