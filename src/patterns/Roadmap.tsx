import { SlideShell } from "./SlideShell";
import { TimelineEvent } from "../components/TimelineEvent";
import type { StatusKey } from "../components/types";

export interface RoadmapMilestone {
  date:   string;
  label:  string;
  status?: StatusKey;
}

export interface RoadmapProps {
  title: string;
  milestones: RoadmapMilestone[];
  pageNumber?: number;
  totalPages?: number;
}

export function Roadmap({ title, milestones, pageNumber, totalPages }: RoadmapProps) {
  return (
    <SlideShell pageNumber={pageNumber} totalPages={totalPages} sectionLabel="Roadmap">
      <h2 className="text-th-h1 font-heading font-bold text-th-black">{title}</h2>
      <div className="mt-12 relative">
        <div className="absolute left-0 right-0 top-2 h-px bg-th-gray-2" />
        <div className="relative flex justify-between">
          {milestones.slice(0, 6).map((m, i) => (
            <TimelineEvent key={i} date={m.date} label={m.label} status={m.status} />
          ))}
        </div>
      </div>
    </SlideShell>
  );
}
