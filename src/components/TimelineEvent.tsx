import { StatusKey, statusToClass } from "./types";

export interface TimelineEventProps {
  date: string;
  label: string;
  status?: StatusKey;
}

export function TimelineEvent({ date, label, status = "planned" }: TimelineEventProps) {
  return (
    <div className="flex flex-col items-center text-center gap-2 max-w-[180px]">
      <span className={`block h-4 w-4 rounded-full ${statusToClass[status]}`} />
      <div className="text-th-caption font-heading font-semibold text-th-gray-1">{date}</div>
      <div className="text-th-supporting font-body text-th-black">{label}</div>
    </div>
  );
}
